import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import ThemeSwitcher from '../ui/ThemeSwitcher.jsx';

const NAV_GROUPS = [
  {
    label: 'About',
    children: [
      { label: 'About Me',   href: '#about' },
      { label: 'How I Work', href: '#traits' },
    ],
  },
  {
    label: 'Experience',
    children: [
      { label: 'Experience', href: '#experience' },
      // { label: 'Journey',    href: '#timeline' },
    ],
  },
  {
    label: 'Skills',
    children: [
      { label: 'Skills',  href: '#skills' },
    ],
  },
  {
    label: 'My Work',
    children: [
      { label: 'Clients',  href: '#clients' },
      { label: 'Domains',  href: '#domains' },
    ],
  },
  {
    label: 'Achievements',
    children: [
      { label: 'Achievements',    href: '#achievements' },
      { label: 'Recommendations', href: '#recommendations' },
    ],
  },
  {
    label: 'Contact',
    children: [
      { label: 'Contact', href: '#contact' },
    ],
  },
];

// Flat list of all section IDs for the observer
const ALL_SECTIONS = NAV_GROUPS.flatMap(g => g.children.map(c => c.href.slice(1)));

function findActiveGroup(activeId) {
  return NAV_GROUPS.find(g => g.children.some(c => c.href.slice(1) === activeId));
}

function findActiveChild(activeId) {
  for (const g of NAV_GROUPS) {
    const child = g.children.find(c => c.href.slice(1) === activeId);
    if (child) return child;
  }
  return null;
}

function DropdownGroup({ group, activeId, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isGroupActive = group.children.some(c => c.href.slice(1) === activeId);
  const activeChild = isGroupActive ? findActiveChild(activeId) : null;
  const isSingle = group.children.length === 1;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (isSingle) {
    return (
      <a
        href={group.children[0].href}
        onClick={onNavigate}
        className="nav-link text-sm font-medium whitespace-nowrap"
        style={isGroupActive ? { color: 'var(--foreground)' } : {}}
      >
        {group.label}
      </a>
    );
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(v => !v)}
        className="nav-link flex items-center gap-1 text-sm font-medium whitespace-nowrap"
        style={isGroupActive ? { color: 'var(--foreground)' } : {}}
      >
        <span>{group.label}</span>

        {/* Show active sub-section label when inside this group */}
        {isGroupActive && activeChild && (
          <span
            className="text-xs px-1.5 py-0.5 rounded-full font-semibold ml-0.5"
            style={{ background: 'var(--primary)', color: 'var(--background)', fontSize: '0.65rem' }}
          >
            {activeChild.label}
          </span>
        )}

        <FiChevronDown
          size={13}
          className="transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', marginTop: '1px' }}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute top-full left-0 mt-2 rounded-xl py-1.5 min-w-max z-50"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
          }}
        >
          {group.children.map(child => {
            const isActive = child.href.slice(1) === activeId;
            return (
              <a
                key={child.href}
                href={child.href}
                onClick={() => { setOpen(false); onNavigate?.(); }}
                className="flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-150"
                style={{
                  color: isActive ? 'var(--primary)' : 'var(--muted)',
                  background: isActive ? 'var(--primary)15' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--foreground)'; e.currentTarget.style.background = 'var(--surface)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = isActive ? 'var(--primary)' : 'var(--muted)'; e.currentTarget.style.background = isActive ? 'var(--primary)15' : 'transparent'; }}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--primary)' }} />}
                {!isActive && <span className="w-1.5 h-1.5" />}
                {child.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    ALL_SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group flex-shrink-0">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-sm transition-transform group-hover:scale-105"
            style={{ background: 'var(--primary)', color: 'var(--background)' }}
          >
            NN
          </div>
          <span className="font-display font-bold hidden sm:block" style={{ color: 'var(--foreground)' }}>
            Niraj Nagtilak
          </span>
        </a>

        {/* Desktop grouped nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_GROUPS.map(group => (
            <li key={group.label}>
              <DropdownGroup group={group} activeId={activeId} />
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <ThemeSwitcher />
          <button
            className="lg:hidden p-2 rounded"
            style={{ color: 'var(--muted)' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — flat list grouped */}
      {menuOpen && (
        <div className="mobile-menu lg:hidden">
          <ul className="px-4 py-3 flex flex-col gap-0">
            {NAV_GROUPS.map(group => (
              <li key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-widest pt-3 pb-1"
                  style={{ color: 'var(--primary)' }}>
                  {group.label}
                </p>
                {group.children.map(child => (
                  <a
                    key={child.href}
                    href={child.href}
                    className="block py-1.5 pl-3 text-sm"
                    style={{ color: child.href.slice(1) === activeId ? 'var(--foreground)' : 'var(--muted)' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {child.label}
                  </a>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
