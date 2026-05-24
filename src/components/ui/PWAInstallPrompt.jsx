import { useState, useEffect } from 'react';
import { FiDownload, FiX, FiShare } from 'react-icons/fi';
import { track } from '../../utils/analytics.js';

const LS_INSTALLED = 'pwa-installed';
const LS_DISMISSED = 'pwa-prompt-dismissed';

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
}
function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true;
}
function isAlreadyInstalled() {
  return isStandalone() || localStorage.getItem(LS_INSTALLED) === '1';
}
function wasDismissed() {
  return localStorage.getItem(LS_DISMISSED) === '1';
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIOS,        setShowIOS]        = useState(false);
  const [hidden,         setHidden]         = useState(false);

  useEffect(() => {
    // Never show if already installed or user permanently dismissed
    if (isAlreadyInstalled() || wasDismissed()) return;

    // Mark installed whenever the app is installed in this session
    const onInstalled = () => {
      localStorage.setItem(LS_INSTALLED, '1');
      track('pwa_install_completed');
      setDeferredPrompt(null);
      setHidden(true);
    };
    window.addEventListener('appinstalled', onInstalled);

    if (isIOS()) {
      const t = setTimeout(() => {
        setShowIOS(true);
        track('pwa_prompt_shown', { platform: 'ios' });
      }, 3000);
      return () => {
        clearTimeout(t);
        window.removeEventListener('appinstalled', onInstalled);
      };
    }

    // Android / Chrome — beforeinstallprompt only fires when NOT yet installed
    const onPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      track('pwa_prompt_shown', { platform: 'android' });
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  function dismiss() {
    track('pwa_prompt_dismissed', { permanent: false });
    sessionStorage.setItem(LS_DISMISSED, '1');
    setDeferredPrompt(null);
    setShowIOS(false);
    setHidden(true);
  }

  function dismissForever() {
    track('pwa_prompt_dismissed', { permanent: true });
    localStorage.setItem(LS_DISMISSED, '1');
    setDeferredPrompt(null);
    setShowIOS(false);
    setHidden(true);
  }

  async function installAndroid() {
    if (!deferredPrompt) return;
    track('pwa_install_clicked');
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    track('pwa_install_outcome', { outcome });   // 'accepted' or 'dismissed'
    if (outcome === 'accepted') {
      localStorage.setItem(LS_INSTALLED, '1');
    }
    setDeferredPrompt(null);
    setHidden(true);
  }

  if (hidden) return null;

  const bannerStyle = {
    position: 'fixed', bottom: '1rem',
    left: '0.75rem', right: '0.75rem',
    zIndex: 9999, maxWidth: '420px', margin: '0 auto',
    background: 'var(--card)', border: '1px solid var(--border)',
    borderRadius: '1rem', padding: '1rem 1.25rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
  };

  // ── Android install button ─────────────────────────────────────
  if (deferredPrompt) {
    return (
      <div style={{ ...bannerStyle, display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '1.75rem', flexShrink: 0 }}>📱</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'var(--foreground)' }}>
            Install Portfolio App
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.1rem' }}>
            Add to your home screen for quick access
          </div>
        </div>
        <button
          onClick={installAndroid}
          style={{
            background: 'var(--primary)', color: 'var(--background)',
            border: 'none', borderRadius: '0.5rem',
            padding: '0.5rem 0.875rem', fontWeight: 700,
            fontSize: '0.78rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            flexShrink: 0, fontFamily: 'Inter, sans-serif',
          }}
        >
          <FiDownload size={13} /> Install
        </button>
        <button
          onClick={dismissForever}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', flexShrink: 0, padding: '0.25rem' }}
          aria-label="Dismiss"
        >
          <FiX size={16} />
        </button>
      </div>
    );
  }

  // ── iOS share instruction ──────────────────────────────────────
  if (showIOS) {
    return (
      <div style={{ ...bannerStyle, position: 'fixed' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '1.75rem', flexShrink: 0 }}>📱</div>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'var(--foreground)', marginBottom: '0.4rem' }}>
                Install Portfolio App
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Tap{' '}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: '0.35rem', padding: '0.1rem 0.4rem',
                  color: 'var(--foreground)', fontWeight: 600,
                }}>
                  <FiShare size={11} /> Share
                </span>
                {' '}then{' '}
                <strong style={{ color: 'var(--foreground)' }}>"Add to Home Screen"</strong>
              </div>
            </div>
          </div>
          <button
            onClick={dismissForever}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', flexShrink: 0, padding: '0.25rem' }}
            aria-label="Dismiss"
          >
            <FiX size={16} />
          </button>
        </div>
        <div style={{
          position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
          borderTop: '8px solid var(--border)',
        }} />
      </div>
    );
  }

  return null;
}
