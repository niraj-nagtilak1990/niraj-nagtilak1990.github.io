import { useState, useEffect } from 'react';
import { FiDownload, FiX, FiShare } from 'react-icons/fi';

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
}
function isInStandaloneMode() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);  // Android
  const [showIOS, setShowIOS]               = useState(false); // iOS
  const [dismissed, setDismissed]           = useState(false);

  useEffect(() => {
    // Don't show if already installed
    if (isInStandaloneMode()) return;
    // Don't show if user already dismissed
    if (sessionStorage.getItem('pwa-prompt-dismissed')) return;

    if (isIOS()) {
      // Show iOS instruction banner after 3 s
      const t = setTimeout(() => setShowIOS(true), 3000);
      return () => clearTimeout(t);
    }

    // Android / Chrome — capture the install event
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  function dismiss() {
    sessionStorage.setItem('pwa-prompt-dismissed', '1');
    setDismissed(true);
    setDeferredPrompt(null);
    setShowIOS(false);
  }

  async function installAndroid() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
    dismiss();
  }

  if (dismissed) return null;

  // ── Android install button ───────────────────────────────────────
  if (deferredPrompt) {
    return (
      <div
        style={{
          position: 'fixed', bottom: '1rem',
          left: '0.75rem', right: '0.75rem',
          zIndex: 9999, maxWidth: '420px', margin: '0 auto',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: '1rem', padding: '1rem 1.25rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}
      >
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
          onClick={dismiss}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', flexShrink: 0, padding: '0.25rem' }}
          aria-label="Dismiss"
        >
          <FiX size={16} />
        </button>
      </div>
    );
  }

  // ── iOS share instruction ────────────────────────────────────────
  if (showIOS) {
    return (
      <div
        style={{
          position: 'fixed', bottom: '1rem',
          left: '0.75rem', right: '0.75rem',
          zIndex: 9999, maxWidth: '420px', margin: '0 auto',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: '1rem', padding: '1rem 1.25rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        }}
      >
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
            onClick={dismiss}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', flexShrink: 0, padding: '0.25rem' }}
            aria-label="Dismiss"
          >
            <FiX size={16} />
          </button>
        </div>
        {/* Arrow pointing down toward Safari toolbar */}
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
