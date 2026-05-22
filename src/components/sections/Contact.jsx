import { useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiInstagram, FiSend } from 'react-icons/fi';
import { FaTwitter, FaBlog } from 'react-icons/fa';
import AnimatedSection from '../ui/AnimatedSection.jsx';

const SOCIAL = [
  { icon: FiLinkedin,  href: 'https://www.linkedin.com/in/niraj-nagtilak/',  label: 'LinkedIn',  handle: 'niraj-nagtilak' },
  { icon: FiGithub,    href: 'https://github.com/niraj-nagtilak1990',        label: 'GitHub',    handle: 'niraj-nagtilak1990' },
  { icon: FiMail,      href: 'mailto:niraj.nagtilak@gmail.com',               label: 'Email',     handle: 'niraj.nagtilak@gmail.com' },
  { icon: FaTwitter,   href: 'https://twitter.com/prem_nagtilak',            label: 'Twitter',   handle: '@prem_nagtilak' },
  { icon: FiInstagram, href: 'https://www.instagram.com/iampremnagtilak/',   label: 'Instagram', handle: '@iampremnagtilak' },
  { icon: FaBlog,      href: 'https://nirajnagtilak.home.blog/',             label: 'Blog',      handle: 'nirajnagtilak.home.blog' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Replace YOUR_FORM_ID with your Formspree form ID from formspree.io
      const res = await fetch('https://formspree.io/f/mvzyaygp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 section-heading"
              style={{ color: 'var(--foreground)' }}>
            Get In Touch
          </h2>
          <p className="mb-12 text-base max-w-xl" style={{ color: 'var(--muted)' }}>
            Whether it's a new opportunity, a technical question, or just a chat about Bhutan,
            I'd love to hear from you.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <AnimatedSection delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Email
                </label>
                <input
                  className="form-input"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                  Message
                </label>
                <textarea
                  className="form-input"
                  rows={5}
                  required
                  placeholder="What would you like to discuss?"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : (
                  <><FiSend size={15} /> Send Message</>
                )}
              </button>

              {status === 'sent' && (
                <p className="text-sm text-center" style={{ color: 'var(--primary)' }}>
                  Message sent! I'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-center" style={{ color: 'var(--accent)' }}>
                  Something went wrong. Please try emailing me directly.
                </p>
              )}
            </form>
          </AnimatedSection>

          {/* Social links */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-4">
              {SOCIAL.map(({ icon: Icon, href, label, handle }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 glass rounded-xl group transition-all"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: 'var(--surface)' }}
                  >
                    <Icon size={18} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{label}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
