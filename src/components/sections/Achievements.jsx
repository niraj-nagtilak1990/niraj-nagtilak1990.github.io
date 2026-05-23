import AnimatedSection from '../ui/AnimatedSection.jsx';
import { achievements, stats } from '../../data/achievements.js';

export default function Achievements() {
  return (
    <section id="achievements" className="py-24" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12 section-heading"
              style={{ color: 'var(--foreground)' }}>
            Awards & Achievements
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((a, i) => (
            <AnimatedSection key={a.id} delay={i * 0.1}>
              <div
                className="glass rounded-2xl p-6 h-full flex flex-col"
                style={{ borderTop: '3px solid var(--primary)' }}
              >
                <div className="text-3xl mb-3">{a.icon}</div>
                <h3 className="font-display font-bold text-base mb-1" style={{ color: 'var(--foreground)' }}>
                  {a.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>
                    {a.org}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>· {a.year}</span>
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>
                  {a.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Impact numbers */}
        <AnimatedSection delay={0.3}>
          <div
            className="rounded-2xl p-4 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            {[
              { v: '80%',    l: 'QA effort saved (Cypress)' },
              { v: '4',      l: 'Nations\' tax systems built' },
              { v: '10 min', l: 'IaC Infra provisioning (was 1 week)' },
              { v: '99.9%',  l: 'Availability SLA met (ANZ)' },
            ].map(item => (
              <div key={item.l}>
                <div className="font-display font-bold text-3xl sm:text-4xl" style={{ color: 'var(--primary)' }}>
                  {item.v}
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{item.l}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
