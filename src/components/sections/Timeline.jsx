import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from '../ui/AnimatedSection.jsx';
import { yearsExp } from '../../utils/yearsExperience.js';

const MILESTONES = [
  {
    year: '2012',
    role: 'Software Trainee',
    company: 'Paragyte Technologies',
    location: 'Pune, India',
    highlight: 'Started career as a software trainee — first professional code shipped within weeks.',
    icon: '🌱',
    color: '#34d399',
  },
  {
    year: '2013',
    role: 'Technical Lead',
    company: 'Paragyte Technologies',
    location: 'Pune, India',
    highlight: 'Promoted from trainee to Technical Lead in just 10 months — the fastest in the company.',
    icon: '⬆️',
    color: '#a78bfa',
    badge: 'Promoted in 10 months',
  },
  {
    year: '2015',
    role: 'Senior Associate Engineer → Tech Lead',
    company: 'Mastercard',
    location: 'Pune, India',
    highlight: 'Joined Mastercard, led insourcing of 3 production apps from an outsourced vendor in 5 days with zero disruption.',
    icon: '🌟',
    color: '#f59e0b',
    badge: 'H.E.A.R.T Award 2016',
  },
  {
    year: '2018',
    role: 'Lead Developer',
    company: 'Capgemini AU (ANZ Bank)',
    location: 'Sydney → Wellington, NZ',
    highlight: 'Relocated to New Zealand. Led the Banker Workbench used by 500+ ANZ relationship bankers.',
    icon: '✈️',
    color: '#4e9af1',
    badge: 'Transformer of the Month',
  },
  {
    year: '2019',
    role: 'Senior Dev / Tech Lead',
    company: 'Ministry of Education NZ',
    location: 'Wellington, NZ',
    highlight: 'Technical lead on Helios — property management platform for 2,500+ NZ public schools.',
    icon: '🏛',
    color: '#38bdf8',
  },
  {
    year: '2020',
    role: 'Practice Lead / Tech Lead',
    company: 'DataTorque Ltd',
    location: 'Wellington, NZ',
    highlight: 'Led 70–80 engineers across 4 concurrent national revenue programs spanning Guyana, Jersey, Belize, and Cyprus.',
    icon: '🌍',
    color: '#C8A96E',
    badge: '70+ engineers led',
  },
  {
    year: '2022',
    role: 'Senior → Lead Engineer',
    company: 'Capgemini NZ',
    location: 'Wellington, NZ',
    highlight: 'Promoted from Senior to Lead Engineer within 2 months. Delivered for NZ Police, Auckland Council, and Toyota NZ.',
    icon: '📈',
    color: '#fb7185',
    badge: 'Promoted in 2 months',
  },
  {
    year: '2024',
    role: 'Tech Lead',
    company: 'DataTorque Ltd',
    location: 'Wellington, NZ',
    highlight: 'Architected the Bhutan Integrated Tax System (BITS) from scratch — now processing 100k transactions/day for 200k taxpayers.',
    icon: '🚀',
    color: '#34d399',
    badge: 'Current Role',
    current: true,
  },
];

function MilestoneNode({ milestone, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-0">
      {/* Left content */}
      <div className={`flex-1 ${isLeft ? 'pr-8 text-right' : 'pr-8 opacity-0 pointer-events-none'}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="glass rounded-2xl p-5 inline-block text-left"
            style={{ border: `1px solid ${milestone.color}30` }}
          >
            <MilestoneContent milestone={milestone} />
          </motion.div>
        )}
      </div>

      {/* Centre node */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: '48px' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.06, type: 'spring' }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 flex-shrink-0"
          style={{ background: milestone.color, boxShadow: `0 0 16px ${milestone.color}50` }}
        >
          <span style={{ fontSize: '1.1rem' }}>{milestone.icon}</span>
        </motion.div>
        {!isLast && (
          <motion.div
            className="flex-1 w-0.5 mt-1"
            style={{ background: `linear-gradient(to bottom, ${milestone.color}60, transparent)`, minHeight: '60px' }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.06 + 0.3 }}
          />
        )}
      </div>

      {/* Right content */}
      <div className={`flex-1 ${!isLeft ? 'pl-8' : 'pl-8 opacity-0 pointer-events-none'}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="glass rounded-2xl p-5 inline-block text-left"
            style={{ border: `1px solid ${milestone.color}30` }}
          >
            <MilestoneContent milestone={milestone} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function MilestoneContent({ milestone }) {
  return (
    <div className="max-w-xs">
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${milestone.color}20`, color: milestone.color }}>
          {milestone.year}
        </span>
        {milestone.badge && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: 'var(--surface)', color: 'var(--primary)', border: '1px solid var(--border)' }}>
            {milestone.badge}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-sm mb-0.5" style={{ color: 'var(--foreground)' }}>
        {milestone.role}
      </h3>
      <p className="text-xs font-medium mb-2" style={{ color: milestone.color }}>
        {milestone.company} · {milestone.location}
      </p>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
        {milestone.highlight}
      </p>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="py-24" style={{ background: 'var(--surface)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 section-heading"
            style={{ color: 'var(--foreground)' }}>
            Career Journey
          </h2>
          <p className="mb-16 text-base max-w-xl" style={{ color: 'var(--muted)' }}>
            From software trainee to tech lead in {yearsExp} years — a consistent upward trajectory across 3 countries and 6 industries.
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-6">
          {MILESTONES.map((m, i) => (
            <MilestoneNode key={m.year + m.company} milestone={m} index={i} isLast={i === MILESTONES.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
