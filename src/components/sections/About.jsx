import AnimatedSection from '../ui/AnimatedSection.jsx';
import { yearsExp } from '../../utils/yearsExperience.js';
import { stats } from '../../data/achievements.js';

export default function About() {

  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12 section-heading"
              style={{ color: 'var(--foreground)' }}>
            About Me
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              <p>
                I'm a <strong style={{ color: 'var(--foreground)' }}>Technical Lead and Software Architect</strong> with{' '}
                {yearsExp}+ years shipping production systems for national governments, tier-1 banks, and large
                enterprise clients across New Zealand, Australia, India, Bhutan, Guyana, Jersey, Belize, and Cyprus.
              </p>
              <p>
                My specialty is <strong style={{ color: 'var(--foreground)' }}>event-driven architectures on Azure</strong>: Azure
                Functions, Service Bus, and APIM, combined with clean, well-tested C# / .NET backends
                and modern React or Vue.js frontends. I care deeply about CI/CD, test coverage, and engineering culture.
              </p>
              <p>
                Currently at <strong style={{ color: 'var(--foreground)' }}>DataTorque Ltd</strong> as Tech Lead on the
                Bhutan Integrated Tax System (BITS), a national taxation platform I architected from the ground up.
                The Payment API now handles 100k transactions per day for 200,000 Bhutanese taxpayers.
              </p>
              <p>
                I have delivered across <strong style={{ color: 'var(--foreground)' }}>banking, payments, government, consulting, and product-based</strong> organisations,
                and led teams through <strong style={{ color: 'var(--foreground)' }}>Waterfall, Agile, Scrum, and Kanban</strong> environments.
              </p>
              <p>
                Outside of work, I love travelling with my wife and two kids, playing table tennis and cricket.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {['C# / .NET', 'Azure', 'React', 'Vue.js', 'Microservices', 'Event-Driven', 'Bicep / IaC', 'DevOps'].map(tag => (
                <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{ background: 'var(--surface)', color: 'var(--primary)', border: '1px solid var(--border)' }}>
                  {tag}
                </span>
              ))}
            </div>

          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(s => (
                <div key={s.label} className="glass rounded-2xl p-6 text-center">
                  <div className="font-display text-4xl font-bold mb-1" style={{ color: 'var(--primary)' }}>
                    {s.value}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

      </div>
    </section>
  );
}
