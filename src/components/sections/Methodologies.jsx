import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '../ui/AnimatedSection.jsx';

const METHODS = [
  {
    icon: '🔄',
    name: 'Agile',
    tag: 'Core Practice',
    years: 10,
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #1a3a2a 0%, #0d2018 100%)',
    description: 'Core delivery approach across most of my career — iterating fast, responding to change, and prioritising working software over heavy documentation.',
    practices: ['Iterative Delivery', 'Continuous Feedback', 'Adaptive Planning', 'Retrospectives'],
  },
  {
    icon: '🏃',
    name: 'Scrum',
    tag: 'Framework',
    years: 9,
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #3b1f6e 0%, #1e0f40 100%)',
    description: 'Led and participated in Scrum teams at ANZ, Capgemini, and DataTorque — running ceremonies, grooming backlogs with product owners, and driving sprint commitments.',
    practices: ['Sprint Planning', 'Daily Standups', 'Backlog Grooming', 'Sprint Reviews'],
  },
  {
    icon: '📌',
    name: 'Kanban',
    tag: 'Flow-based',
    years: 6,
    color: '#fb7185',
    gradient: 'linear-gradient(135deg, #2a1a1a 0%, #180d0d 100%)',
    description: 'Used Kanban for operational and BAU work — visualising flow, limiting WIP, and continuously improving throughput without fixed sprint boundaries.',
    practices: ['WIP Limits', 'Flow Visualisation', 'Pull System', 'Continuous Improvement'],
  },
  {
    icon: '📋',
    name: 'Waterfall',
    tag: 'Traditional',
    years: 5,
    color: '#4e9af1',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0f2340 100%)',
    description: 'Delivered structured, phase-gated projects for government and enterprise clients where requirements were fixed upfront and formal regulatory sign-off was required.',
    practices: ['Phase-gate Reviews', 'Requirements Analysis', 'Change Control', 'Formal Sign-offs'],
  },
  {
    icon: '🏗',
    name: 'SAFe',
    tag: 'Scaled Agile',
    years: 3,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #3d2800 0%, #1f1400 100%)',
    description: 'Worked within SAFe at large enterprise engagements — aligning multiple Agile teams across program increments and coordinating cross-team dependencies at scale.',
    practices: ['PI Planning', 'Program Increments', 'Agile Release Trains', 'Cross-team Sync'],
  },
  {
    icon: '🚀',
    name: 'CI/CD Driven',
    tag: 'DevOps Culture',
    years: 8,
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #1a2535 0%, #0d1520 100%)',
    description: 'Championed CI/CD as a delivery discipline — eliminating manual releases, shifting testing left, and building team confidence through automation at ANZ, Capgemini, and DataTorque.',
    practices: ['Automated Pipelines', 'Trunk-based Dev', 'Shift-left Testing', 'Zero-downtime Deploys'],
  },
];

function MethodCard({ method, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const pct = Math.min((method.years / 10) * 100, 100);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div
        className="rounded-2xl p-6 h-full flex flex-col gap-4 relative overflow-hidden"
        style={{ background: method.gradient, border: `1px solid ${method.color}25` }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 24px ${method.color}30`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        {/* Background glow orb */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-15 pointer-events-none"
          style={{ background: method.color, filter: 'blur(24px)' }} />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{method.icon}</span>
            <div>
              <h3 className="font-display text-lg font-bold" style={{ color: '#e6edf3' }}>{method.name}</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${method.color}20`, color: method.color }}>
                {method.tag}
              </span>
            </div>
          </div>
          <span className="text-xs font-medium" style={{ color: `${method.color}cc` }}>
            {method.years}+ yrs
          </span>
        </div>

        {/* Experience bar */}
        <div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: method.color }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${pct}%` } : { width: 0 }}
              transition={{ duration: 0.9, delay: index * 0.07 + 0.3, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs mt-1 text-right" style={{ color: `${method.color}88` }}>
            {pct === 100 ? 'Expert' : pct >= 70 ? 'Advanced' : 'Proficient'}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(230,237,243,0.72)' }}>
          {method.description}
        </p>

        {/* Practice chips */}
        <div className="flex flex-wrap gap-1.5">
          {method.practices.map(p => (
            <span key={p} className="text-xs px-2 py-1 rounded-full"
              style={{ background: `${method.color}15`, color: `${method.color}cc`, border: `1px solid ${method.color}25` }}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Methodologies() {
  return (
    <section id="methodologies" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 section-heading"
            style={{ color: 'var(--foreground)' }}>
            Delivery Methodologies
          </h2>
          <p className="mb-12 text-base max-w-xl" style={{ color: 'var(--muted)' }}>
            Having worked in startups, enterprises, government, and consulting — I have delivered in every major methodology and know when to apply each one.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {METHODS.map((m, i) => <MethodCard key={m.name} method={m} index={i} />)}
        </div>
      </div>
    </section>
  );
}
