import { motion } from 'framer-motion';
import { FiArrowDown, FiLinkedin, FiGithub } from 'react-icons/fi';
import { FiMapPin } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext.jsx';
import { yearsExp } from '../../utils/yearsExperience.js';
import ShieldPhoto from '../ui/ShieldPhoto.jsx';

const TITLES = ['Software Architect', 'Engineering Leader', '.NET & Azure Specialist', 'Web Expert', 'Team Builder'];

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center hero-bg"
    >
      {/* Animated blobs (gradient-dark theme only) — overflow clipped by their own wrapper */}
      {theme === 'gradient-dark' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="blob-1 animate-blob absolute w-96 h-96 rounded-full opacity-30 top-0 right-0 translate-x-1/4 -translate-y-1/4" />
          <div className="blob-2 animate-blob animation-delay-2000 absolute w-80 h-80 rounded-full opacity-20 bottom-20 left-0 -translate-x-1/4" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Text side */}
          <div className="lg:col-span-3 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-medium tracking-widest uppercase"
              style={{ color: 'var(--primary)' }}
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold pb-3"
              style={{ lineHeight: 1.15, color: 'var(--foreground)' }}
            >
              Niraj{' '}
              <span className="gradient-text">Nagtilak</span>
            </motion.h1>

            {/* Photo — mobile only, shown right after name */}
            <motion.div
              className="flex lg:hidden justify-center py-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative">
                <ShieldPhoto
                  src="/images/niraj-nagtilak-profile.jpg"
                  alt="Niraj Nagtilak"
                  size={230}
                />
                <div
                  className="absolute -bottom-2 -right-2 z-20 glass rounded-xl px-3 py-2 text-xs font-medium shadow-lg"
                  style={{ color: 'var(--foreground)' }}
                >
                  <span style={{ color: 'var(--primary)' }}>{yearsExp}+</span> years
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-2"
            >
              {TITLES.map((t, i) => (
                <span
                  key={t}
                  className="text-sm font-medium px-3 py-1 rounded-full glass"
                  style={{ color: 'var(--muted)', animationDelay: `${i * 0.1}s` }}
                >
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-lg max-w-xl leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              {yearsExp}+ years architecting and building integration platforms and tax revenue systems for national
              governments and tier-1 banks. Shipped production systems for{' '}
              <span style={{ color: 'var(--foreground)' }}>Bhutan, ANZ Bank, Mastercard,</span>{' '}
              Auckland Council, NZ Police and more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--muted)' }}
            >
              <FiMapPin size={14} style={{ color: 'var(--primary)' }} aria-hidden="true" />
              Wellington, New Zealand · NZ Permanent Resident
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="grid grid-cols-2 gap-3 pt-2 sm:flex sm:flex-wrap"
            >
              <a href="#experience" className="btn-primary justify-center sm:justify-start">
                View My Work
              </a>
              <a href="#contact" className="btn-outline justify-center sm:justify-start">
                Get In Touch
              </a>
              <a
                href="https://www.linkedin.com/in/niraj-nagtilak/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline justify-center sm:justify-start"
              >
                <FiLinkedin size={16} aria-hidden="true" /> LinkedIn
              </a>
              <a
                href="https://github.com/niraj-nagtilak1990"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline justify-center sm:justify-start"
              >
                <FiGithub size={16} aria-hidden="true" /> GitHub
              </a>
            </motion.div>
          </div>

          {/* Photo side — desktop only */}
          <motion.div
            className="hidden lg:flex lg:col-span-2 justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative">
              <ShieldPhoto
                src="/images/niraj-nagtilak-profile.jpg"
                alt="Niraj Nagtilak"
                size={384}
              />
              {/* Floating badge */}
              <div
                className="absolute -bottom-2 -right-2 z-20 glass rounded-xl px-3 py-2 text-xs font-medium shadow-lg"
                style={{ color: 'var(--foreground)' }}
              >
                <span style={{ color: 'var(--primary)' }}>{yearsExp}+</span> years
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <a href="#about" aria-label="Scroll down" className="animate-bounce">
            <FiArrowDown size={20} style={{ color: 'var(--muted)' }} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
