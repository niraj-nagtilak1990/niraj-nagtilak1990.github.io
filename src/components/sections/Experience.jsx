import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiCalendar, FiChevronDown, FiChevronUp, FiAward } from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection.jsx';
import { experience, education } from '../../data/experience.js';

function ExperienceCard({ job, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <AnimatedSection delay={index * 0.08}>
      <div
        className="relative pl-5 sm:pl-8 pb-10"
        style={{ borderLeft: '2px solid var(--border)' }}
      >
        {/* Timeline dot */}
        <div
          className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2"
          style={{
            background: job.current ? 'var(--primary)' : 'var(--card)',
            borderColor: job.current ? 'var(--primary)' : 'var(--border)',
            boxShadow: job.current ? '0 0 0 4px rgba(var(--primary-rgb), 0.15)' : 'none',
          }}
        />

        <div className="glass rounded-2xl overflow-hidden">
          {/* Header — always visible */}
          <button
            className="w-full text-left p-5 flex items-start justify-between gap-4"
            onClick={() => setOpen(v => !v)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-display font-bold text-lg" style={{ color: 'var(--foreground)' }}>
                  {job.role}
                </h3>
                {job.current && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--primary)', color: 'var(--background)' }}
                  >
                    Current
                  </span>
                )}
                {job.awards?.map(a => (
                  <span
                    key={a.title}
                    className="text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{ background: 'var(--surface)', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                  >
                    <FiAward size={10} aria-hidden="true" /> {a.title}
                  </span>
                ))}
              </div>
              <p className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>{job.company}</p>
              <p className="text-sm italic mt-0.5" style={{ color: 'var(--muted)' }}>{job.project}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-xs" style={{ color: 'var(--muted)' }}>
                <span className="flex items-center gap-1"><FiCalendar size={11} aria-hidden="true" /> {job.period}</span>
                <span className="flex items-center gap-1"><FiMapPin size={11} aria-hidden="true" /> {job.location}</span>
              </div>
            </div>
            <div style={{ color: 'var(--muted)', flexShrink: 0, marginTop: 4 }}>
              {open ? <FiChevronUp size={18} aria-hidden="true" /> : <FiChevronDown size={18} aria-hidden="true" />}
            </div>
          </button>

          {/* Expandable body */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="px-5 pb-5 space-y-4">
                  {/* Stack badges */}
                  <div className="flex flex-wrap gap-2">
                    {job.stack.map(s => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {/* Highlights */}
                  <ul className="space-y-2">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--primary)' }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24" style={{ background: 'var(--surface)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12 section-heading"
              style={{ color: 'var(--foreground)' }}>
            Experience
          </h2>
        </AnimatedSection>

        <div>
          {experience.map((job, i) => (
            <ExperienceCard key={job.id} job={job} index={i} />
          ))}
        </div>

        {/* Education */}
        <AnimatedSection delay={0.2}>
          <h3 className="font-display text-2xl font-bold mt-8 mb-6" style={{ color: 'var(--foreground)' }}>
            Education
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {education.map(e => (
              <div key={e.degree} className="glass rounded-xl p-5">
                <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{e.degree}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{e.institution}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--primary)' }}>{e.year}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
