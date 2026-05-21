import AnimatedSection from '../ui/AnimatedSection.jsx';
import { clientSprite, SLOT_W, SLOT_H, SPRITE_TOTAL_W } from '../../data/clientSprite.js';

function SpriteCard({ client }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      title={client.name}
      className="flex-shrink-0 flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-2xl glass
                 hover:scale-105 transition-all duration-200 cursor-pointer"
      style={{ minWidth: `${SLOT_W + 16}px`, border: '1px solid var(--border)' }}
    >
      <div
        style={{
          width: `${SLOT_W}px`,
          height: `${SLOT_H}px`,
          backgroundImage: 'url(/images/client-sprite.png)',
          backgroundPosition: `-${client.x}px 0`,
          backgroundSize: `${SPRITE_TOTAL_W}px ${SLOT_H}px`,
          backgroundRepeat: 'no-repeat',
          filter: 'var(--logo-filter)',
        }}
        role="img"
        aria-label={client.name}
      />
      <span
        className="text-xs font-medium text-center leading-tight"
        style={{ color: 'var(--muted)', maxWidth: `${SLOT_W}px` }}
      >
        {client.name}
      </span>
    </a>
  );
}

function MarqueeRow({ items, reverse = false }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
    >
      <div
        className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}
        style={{ display: 'flex', gap: '1rem', width: 'max-content' }}
      >
        {[...items, ...items].map((client, i) => (
          <SpriteCard key={`${client.name}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const mid = Math.ceil(clientSprite.length / 2);
  const row1 = clientSprite.slice(0, mid);
  const row2 = clientSprite.slice(mid);

  return (
    <section id="clients" className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <AnimatedSection>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold mb-4 section-heading"
            style={{ color: 'var(--foreground)' }}
          >
            Notable Clients & Employers
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'var(--muted)' }}>
            Organisations I have built and shipped production systems for across 10+ countries.
          </p>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.1}>
        <div className="flex flex-col gap-4">
          <MarqueeRow items={row1} reverse={false} />
          <MarqueeRow items={row2} reverse={true} />
        </div>
      </AnimatedSection>
    </section>
  );
}
