import { FiEye, FiCode, FiZap, FiRepeat, FiTarget, FiUsers, FiLayers, FiGitMerge, FiPackage, FiRefreshCw, FiTrendingUp } from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection.jsx';

const TRAITS = [
  { icon: FiEye,        title: 'Detail Oriented',          desc: 'Catches edge cases before they reach production.' },
  { icon: FiCode,       title: 'Clean Coder',               desc: 'Code as a craft — readable, purposeful, built to last.' },
  { icon: FiZap,        title: 'Innovator',                 desc: 'Finds simpler, smarter solutions to old problems.' },
  { icon: FiRepeat,     title: 'Process Champion',          desc: 'Builds processes that make teams faster to ship.' },
  { icon: FiTarget,     title: 'Requirement Challenger',    desc: 'Questions assumptions to build the right thing.' },
  { icon: FiUsers,      title: 'Mentor',                    desc: 'Invests in people as much as in architecture.' },
  { icon: FiLayers,     title: 'Systems Thinker',           desc: 'Sees how pieces connect before writing a line.' },
  { icon: FiGitMerge,   title: 'Bridge Builder',            desc: 'Translates between engineers, product and business.' },
  { icon: FiPackage,    title: 'Delivery Focused',          desc: 'Ships with low defect rates and high confidence.' },
  { icon: FiRefreshCw,  title: 'Adaptable',                 desc: 'Delivered across 10+ countries and tech stacks.' },
  { icon: FiTrendingUp, title: 'Business Mindset',          desc: 'Understands commercial context, not just code.' },
];

export default function Traits() {
  return (
    <section id="traits" className="py-16" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2 section-heading"
            style={{ color: 'var(--foreground)' }}>
            How I Work
          </h2>
          <p className="mb-8 text-sm" style={{ color: 'var(--muted)' }}>
            The qualities I bring to every team, project, and problem.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {TRAITS.map(({ icon: Icon, title }, i) => (
            <AnimatedSection key={title} delay={i * 0.04}>
              <div
                className="flex items-center gap-3 p-4 rounded-xl h-full transition-all duration-200"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--primary)15', color: 'var(--primary)' }}
                >
                  <Icon size={15} aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--foreground)' }}>
                  {title}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
