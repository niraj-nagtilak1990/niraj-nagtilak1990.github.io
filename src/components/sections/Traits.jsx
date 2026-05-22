import { FiEye, FiCode, FiZap, FiRepeat, FiTarget, FiUsers, FiLayers, FiGitMerge, FiPackage, FiRefreshCw, FiTrendingUp } from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection.jsx';

const TRAITS = [
  {
    icon: FiEye,
    title: 'Detail Oriented',
    description: 'Catches edge cases others miss before they reach production.',
  },
  {
    icon: FiCode,
    title: 'Clean Coder',
    description: 'Treats code as a craft: readable, purposeful, and built to last.',
  },
  {
    icon: FiZap,
    title: 'Innovator',
    description: 'Finds simpler, smarter ways to solve problems, not just faster ways to do the same thing.',
  },
  {
    icon: FiRepeat,
    title: 'Process Champion',
    description: 'Builds engineering processes that make teams faster, consistent, and confident to ship.',
  },
  {
    icon: FiTarget,
    title: 'Requirement Challenger',
    description: 'Questions assumptions early to build the right thing, not just the requested thing.',
  },
  {
    icon: FiUsers,
    title: 'Mentor & Knowledge Sharer',
    description: 'Invests in people as much as in architecture. Has interviewed and grown 200+ engineers.',
  },
  {
    icon: FiLayers,
    title: 'Systems Thinker',
    description: 'Sees how the pieces connect before writing a single line of code.',
  },
  {
    icon: FiGitMerge,
    title: 'Bridge Builder',
    description: 'Translates between engineers, product, and business so everyone moves in the same direction.',
  },
  {
    icon: FiPackage,
    title: 'Delivery Focused',
    description: 'Ships production systems with low defect rates, high confidence, and on time.',
  },
  {
    icon: FiRefreshCw,
    title: 'Adaptable',
    description: 'Has delivered across 10+ countries, tech stacks, and domains without missing a beat.',
  },
  {
    icon: FiTrendingUp,
    title: 'Business Mindset',
    description: 'Comes from a business background — understands commercial context, speaks the language of stakeholders, and builds technology that solves real problems for real people.',
  },
];

export default function Traits() {
  return (
    <section id="traits" className="py-24" style={{ background: 'var(--surface-alt, var(--background))' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold mb-4 section-heading"
            style={{ color: 'var(--foreground)' }}
          >
            How I Work
          </h2>
          <p className="mb-12 text-base max-w-xl" style={{ color: 'var(--muted)' }}>
            The qualities I bring to every team, project, and problem.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {TRAITS.map((trait, i) => {
            const Icon = trait.icon;
            return (
              <AnimatedSection key={trait.title} delay={i * 0.05}>
                <div
                  className="glass rounded-2xl p-5 h-full flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--primary-subtle, rgba(200,169,110,0.12))', color: 'var(--primary)' }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-sm mb-1"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {trait.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {trait.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
