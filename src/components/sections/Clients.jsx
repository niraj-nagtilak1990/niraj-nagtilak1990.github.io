import AnimatedSection from '../ui/AnimatedSection.jsx';
import { clientSprite, SLOT_W, SLOT_H, SPRITE_TOTAL_W } from '../../data/clientSprite.js';

function SpriteCard({ client }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      title={client.name}
      className="client-card flex-shrink-0 flex flex-col items-center justify-center gap-3 p-4 rounded-2xl glass cursor-pointer"
      style={{ width: '150px', height: '150px', border: '1px solid var(--border)' }}
    >
      <div
        style={{
          width: `${SLOT_W}px`,
          height: `${SLOT_H}px`,
          backgroundImage: 'url(/images/client-sprite.png)',
          backgroundPosition: `-${client.x}px 0`,
          backgroundSize: `${SPRITE_TOTAL_W}px ${SLOT_H}px`,
          backgroundRepeat: 'no-repeat',
          borderRadius: '10px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
        role="img"
        aria-label={client.name}
      />
      <span
        className="text-xs font-medium text-center leading-tight"
        style={{ color: 'var(--muted)', maxWidth: '100px' }}
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
      style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', paddingTop: '12px', marginTop: '-12px' }}
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
            Clients & Employers
          </h2>
          <p className="text-base max-w-xl mb-4" style={{ color: 'var(--muted)' }}>
            Organisations I have built and shipped production systems for across 10+ countries.
          </p>
          <p className="text-xs max-w-2xl" style={{ color: 'var(--muted)', opacity: 0.6 }}>
            All logos and trademarks are the property of their respective owners and are used here solely
            to identify organisations I have professionally worked for or with. This portfolio is a personal
            website — I am not affiliated with, endorsed by, or competing with any of these organisations,
            and no commercial relationship is implied.
          </p>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.1}>
        <div className="flex flex-col" style={{ gap: '24px' }}>
          <MarqueeRow items={row1} reverse={false} />
          <MarqueeRow items={row2} reverse={true} />
        </div>
      </AnimatedSection>
    </section>
  );
}
