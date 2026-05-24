import { useState } from 'react';
import {
  SiDotnet, SiTypescript, SiJavascript, SiReact, SiVuedotjs, SiRedux,
  SiKubernetes, SiDocker, SiJenkins, SiGit, SiJest,
  SiAngular, SiJquery, SiVite,
  SiJira, SiConfluence, SiPostman, SiSwagger, SiSonarqubeserver,
} from 'react-icons/si';
import {
  FiCloud, FiDatabase, FiTerminal, FiGitBranch, FiCode, FiServer, FiPlay,
  FiRefreshCw, FiRotateCw, FiLayout, FiArrowDown, FiLayers, FiGitMerge,
  FiZap, FiGrid, FiArrowRight, FiCircle, FiInbox, FiSliders,
  FiColumns, FiShield, FiShare2,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../ui/AnimatedSection.jsx';
import { skillCategories } from '../../data/skills.js';
import { track } from '../../utils/analytics.js';

const ICON_MAP = {
  SiDotnet: SiDotnet, SiTypescript: SiTypescript, SiJavascript: SiJavascript,
  SiReact: SiReact, SiVuedotjs: SiVuedotjs, SiRedux: SiRedux,
  SiMicrosoftazure: FiCloud, SiAzuredevops: FiGitBranch,
  SiKubernetes: SiKubernetes, SiDocker: SiDocker, SiJenkins: SiJenkins, SiGit: SiGit,
  SiPowershell: FiTerminal, SiGithubactions: FiGitBranch,
  SiMicrosoftsqlserver: FiDatabase, SiOracle: FiDatabase,
  SiJest: SiJest, SiCypress: FiCode, SiPlaywright: FiPlay,
  SiAngular: SiAngular, SiJquery: SiJquery, SiVite: SiVite,
  SiJira: SiJira, SiConfluence: SiConfluence, SiPostman: SiPostman,
  SiSwagger: SiSwagger, SiSonarqubeserver: SiSonarqubeserver,
  FiZap: FiZap, FiGrid: FiGrid, FiArrowRight: FiArrowRight,
  FiCircle: FiCircle, FiInbox: FiInbox, FiSliders: FiSliders,
  FiLayers: FiLayers, FiGitMerge: FiGitMerge, FiRefreshCw: FiRefreshCw,
  FiCode: FiCode, FiServer: FiServer,
};

const METHODS = [
  {
    icon: '🔄', name: 'Agile', tag: 'Core Practice', years: 10, color: '#34d399',
    gradient: 'linear-gradient(135deg, #1a3a2a, #0d2018)',
    practices: ['Iterative Delivery', 'Continuous Feedback', 'Adaptive Planning', 'Retrospectives'],
  },
  {
    icon: '🏃', name: 'Scrum', tag: 'Framework', years: 9, color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #3b1f6e, #1e0f40)',
    practices: ['Sprint Planning', 'Daily Standups', 'Backlog Grooming', 'Sprint Reviews'],
  },
  {
    icon: '📌', name: 'Kanban', tag: 'Flow-based', years: 6, color: '#fb7185',
    gradient: 'linear-gradient(135deg, #2a1a1a, #180d0d)',
    practices: ['WIP Limits', 'Flow Visualisation', 'Pull System', 'Continuous Improvement'],
  },
  {
    icon: '📋', name: 'Waterfall', tag: 'Traditional', years: 5, color: '#4e9af1',
    gradient: 'linear-gradient(135deg, #1e3a5f, #0f2340)',
    practices: ['Phase-gate Reviews', 'Requirements Analysis', 'Change Control', 'Formal Sign-offs'],
  },
  {
    icon: '🏗', name: 'SAFe', tag: 'Scaled Agile', years: 3, color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #3d2800, #1f1400)',
    practices: ['PI Planning', 'Program Increments', 'Agile Release Trains', 'Cross-team Sync'],
  },
  {
    icon: '🚀', name: 'CI/CD Driven', tag: 'DevOps Culture', years: 8, color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #1a2535, #0d1520)',
    practices: ['Automated Pipelines', 'Trunk-based Dev', 'Shift-left Testing', 'Zero-downtime Deploys'],
  },
];

function MethodCard({ method, index }) {
  const pct = Math.min((method.years / 10) * 100, 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
      style={{ background: method.gradient, border: `1px solid ${method.color}25` }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.4), 0 0 20px ${method.color}25`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-15 pointer-events-none"
        style={{ background: method.color, filter: 'blur(20px)' }} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{method.icon}</span>
          <div>
            <h3 className="font-semibold text-sm" style={{ color: '#e6edf3' }}>{method.name}</h3>
            <span className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: `${method.color}20`, color: method.color }}>{method.tag}</span>
          </div>
        </div>
        <span className="text-xs font-medium" style={{ color: `${method.color}cc` }}>{method.years}+ yrs</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <motion.div className="h-full rounded-full" style={{ background: method.color }}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: index * 0.06 + 0.2 }} />
      </div>
      <div className="flex flex-wrap gap-1">
        {method.practices.map(p => (
          <span key={p} className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: `${method.color}15`, color: `${method.color}cc`, border: `1px solid ${method.color}20` }}>
            {p}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [tab, setTab] = useState('skills');

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 section-heading"
              style={{ color: 'var(--foreground)' }}>
            Skills
          </h2>
          <p className="mb-8 text-base" style={{ color: 'var(--muted)' }}>
            Production-hardened across the full stack, from cloud infrastructure to browser UI.
          </p>

          {/* Tab switcher */}
          <div className="flex gap-2 mb-10 p-1 rounded-xl w-fit"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {[
              { key: 'skills', label: 'Technical Skills' },
              { key: 'methodologies', label: 'Delivery Methodologies' },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  background: tab === t.key ? 'var(--primary)' : 'transparent',
                  color: tab === t.key ? 'var(--background)' : 'var(--muted)',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {tab === 'skills' && (
            <motion.div key="skills"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {skillCategories.map((cat, ci) => (
                <AnimatedSection key={cat.label} delay={ci * 0.08}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <h3 className="font-display font-bold text-sm uppercase tracking-widest mb-4"
                      style={{ color: 'var(--primary)' }}>
                      {cat.label}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {cat.skills.map(skill => {
                        const Icon = ICON_MAP[skill.icon];
                        return (
                          <div key={skill.name}
                            className="skill-badge flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
                            style={{ background: 'var(--surface)', color: 'var(--foreground)', border: '1px solid var(--border)', cursor: 'default' }}
                            onClick={() => track('skill_click', { skill_name: skill.name, category: cat.label })}>
                            {Icon && <Icon size={14} style={{ color: 'var(--primary)' }} aria-hidden="true" />}
                            {skill.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </motion.div>
          )}

          {tab === 'methodologies' && (
            <motion.div key="methodologies"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {METHODS.map((m, i) => <MethodCard key={m.name} method={m} index={i} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
