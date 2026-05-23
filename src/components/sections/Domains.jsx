import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '../ui/AnimatedSection.jsx';
import { yearsExp } from '../../utils/yearsExperience.js';

const DOMAINS = [
  {
    icon: '🏦',
    title: 'Banking',
    subtitle: 'Tier-1 Financial Institutions',
    description: 'Built core banking platforms and digital portals for ANZ Bank and Mastercard, handling millions of transactions with strict compliance and zero-downtime deployments.',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0f2340 100%)',
    glow: 'rgba(30, 100, 200, 0.3)',
    accent: '#4e9af1',
  },
  {
    icon: '💳',
    title: 'Payments',
    subtitle: 'High-Volume Transaction Systems',
    description: 'At Mastercard, built the Transaction Investigator platform and contributed to global payment infrastructure used by millions of cardholders. Gained deep experience in high-throughput, fraud-aware, compliance-first payment engineering.',
    gradient: 'linear-gradient(135deg, #3b1f6e 0%, #1e0f40 100%)',
    glow: 'rgba(124, 58, 237, 0.3)',
    accent: '#a78bfa',
  },
  {
    icon: '🏛',
    title: 'Government',
    subtitle: 'National & Public Sector',
    description: 'Delivered enterprise integrations and digital platforms for Ministry of Education NZ and MBIE, navigating complex public sector procurement, compliance, and stakeholder landscapes to ship systems that matter.',
    gradient: 'linear-gradient(135deg, #1a3a2a 0%, #0d2018 100%)',
    glow: 'rgba(16, 185, 129, 0.3)',
    accent: '#34d399',
  },
  {
    icon: '📊',
    title: 'Tax & Revenue',
    subtitle: 'Complex Fiscal Systems',
    description: 'At DataTorque, architected the Bhutan Integrated Tax System (BITS) from the ground up and delivered national tax platforms for Guyana, Belize, Cyprus, and Cook Islands — covering returns, assessments, payments, and compliance across 6 jurisdictions.',
    gradient: 'linear-gradient(135deg, #3d2800 0%, #1f1400 100%)',
    glow: 'rgba(200, 169, 110, 0.3)',
    accent: '#C8A96E',
  },
  {
    icon: '🏢',
    title: 'Consulting',
    subtitle: 'Service-Based Delivery',
    description: 'At Capgemini and SMC Global, embedded with enterprise clients across banking, retail, and public sector — bringing structure, technical leadership, and delivery discipline to complex multi-team engagements.',
    gradient: 'linear-gradient(135deg, #1a2535 0%, #0d1520 100%)',
    glow: 'rgba(56, 189, 248, 0.3)',
    accent: '#38bdf8',
  },
  {
    icon: '📦',
    title: 'Product',
    subtitle: 'End-to-End Ownership',
    description: 'Led product-focussed engineering at Smart Salary and Toyota NZ — owning the full lifecycle from requirement to release with a focus on user experience and reliability.',
    gradient: 'linear-gradient(135deg, #2a1a1a 0%, #180d0d 100%)',
    glow: 'rgba(251, 113, 133, 0.3)',
    accent: '#fb7185',
  },
];

function DomainCard({ domain, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02, rotateX: 2, rotateY: -2 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
    >
      <div
        className="relative rounded-2xl p-4 sm:p-6 h-full overflow-hidden cursor-default"
        style={{
          background: domain.gradient,
          border: `1px solid ${domain.accent}30`,
          boxShadow: `0 4px 24px rgba(0,0,0,0.4)`,
          transition: 'box-shadow 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.5), 0 0 30px ${domain.glow}`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)'}
      >
        {/* Animated floating icon */}
        <div className="animate-domain-float mb-4 select-none text-4xl sm:text-5xl" style={{ lineHeight: 1 }}>
          {domain.icon}
        </div>

        {/* Subtle background orb */}
        <div
          className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20"
          style={{ background: domain.accent, filter: 'blur(30px)' }}
        />

        <div
          className="text-xs font-semibold uppercase tracking-widest mb-1"
          style={{ color: domain.accent }}
        >
          {domain.subtitle}
        </div>

        <h3
          className="font-display text-xl font-bold mb-3"
          style={{ color: '#e6edf3' }}
        >
          {domain.title}
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: 'rgba(230,237,243,0.7)' }}>
          {domain.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Domains() {
  return (
    <section id="domains" className="py-24" style={{ background: 'var(--background)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold mb-4 section-heading"
            style={{ color: 'var(--foreground)' }}
          >
            Industry Domains
          </h2>
          <p className="mb-12 text-base max-w-xl" style={{ color: 'var(--muted)' }}>
            {yearsExp} years across six distinct industries — each one shaping how I think about architecture, risk, and delivery.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOMAINS.map((domain, i) => (
            <DomainCard key={domain.title} domain={domain} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
