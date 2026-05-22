import { FiGithub, FiLinkedin, FiMail, FiInstagram } from 'react-icons/fi';
import { FaTwitter, FaBlog } from 'react-icons/fa';

const SOCIAL = [
  { icon: FiLinkedin,  href: 'https://www.linkedin.com/in/niraj-nagtilak/',         label: 'LinkedIn' },
  { icon: FiGithub,    href: 'https://github.com/niraj-nagtilak1990',               label: 'GitHub' },
  { icon: FiMail,      href: 'mailto:niraj.nagtilak@gmail.com',                       label: 'Email' },
  { icon: FaTwitter,   href: 'https://twitter.com/prem_nagtilak',                   label: 'Twitter' },
  { icon: FiInstagram, href: 'https://www.instagram.com/iampremnagtilak/',          label: 'Instagram' },
  { icon: FaBlog,      href: 'https://nirajnagtilak.home.blog/',                    label: 'Blog' },
];

export default function Footer() {
  return (
    <footer
      className="py-10 mt-24"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          © {new Date().getFullYear()} Niraj Nagtilak · Wellington, NZ
        </p>

        <div className="flex items-center gap-4">
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              <Icon size={18} aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="text-xs" style={{ color: 'var(--muted)' }}>
          Built with React · Deployed on GitHub Pages
        </p>
      </div>
    </footer>
  );
}
