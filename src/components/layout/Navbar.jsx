import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeSwitcher from '../ui/ThemeSwitcher.jsx';

const NAV_LINKS = [
  { label: 'About',           href: '#about' },
  { label: 'How I Work',      href: '#traits' },
  { label: 'Clients',         href: '#clients' },
  { label: 'Domains',         href: '#domains' },
  { label: 'Experience',      href: '#experience' },
  { label: 'Skills',          href: '#skills' },
  { label: 'Achievements',    href: '#achievements' },
  { label: 'Recommendations', href: '#recommendations' },
  { label: 'Contact',         href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach(id => {
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
        <a href="#" className="flex items-center gap-2 group">
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

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link text-sm font-medium ${active === link.href.slice(1) ? 'active' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4">
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu lg:hidden">
          <ul className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-sm font-medium"
                  style={{ color: 'var(--muted)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
