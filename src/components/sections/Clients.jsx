import AnimatedSection from '../ui/AnimatedSection.jsx';
import { clientSprite, SLOT_W, SLOT_H, SPRITE_TOTAL_W } from '../../data/clientSprite.js';
import useIsMobile from '../../hooks/useIsMobile.js';

function SpriteCard({ client, isMobile }) {
  const scale     = isMobile ? 0.55 : 1;
  const spriteW   = Math.round(SLOT_W * scale);
  const spriteH   = Math.round(SLOT_H * scale);
  const totalW    = Math.round(SPRITE_TOTAL_W * scale);
  const posX      = Math.round(client.x * scale);
  const cardSize  = isMobile ? 80 : 150;
  const padding   = isMobile ? '0.5rem' : '1rem';

  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      title={client.name}
      className="client-card flex-shrink-0 flex flex-col items-center justify-center rounded-2xl glass cursor-pointer"
      style={{
        width: `${cardSize}px`,
        height: `${cardSize}px`,
        border: '1px solid var(--border)',
        padding,
        gap: isMobile ? 0 : '0.75rem',
      }}
    >
      <div
        style={{
          width: `${spriteW}px`,
          height: `${spriteH}px`,
          backgroundImage: 'url(/images/client-sprite.png)',
          backgroundPosition: `-${posX}px 0`,
          backgroundSize: `${totalW}px ${spriteH}px`,
          backgroundRepeat: 'no-repeat',
          borderRadius: '8px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
        role="img"
        aria-label={client.name}
        className="client-sprite"
      />
      {!isMobile && (
        <span
          className="text-xs font-medium text-center leading-tight"
          style={{ color: 'var(--muted)', maxWidth: '100px' }}
        >
          {client.name}
        </span>
      )}
    </a>
  );
}

function MarqueeRow({ items, reverse, isMobile }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        paddingTop: '12px',
        marginTop: '-12px',
      }}
    >
      <div
        className={`clients-track ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ display: 'flex', gap: isMobile ? '0.625rem' : '1rem', width: 'max-content' }}
      >
        {[...items, ...items].map((client, i) => (
          <SpriteCard key={`${client.name}-${i}`} client={client} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const isMobile = useIsMobile();
  const mid  = Math.ceil(clientSprite.length / 2);
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
          <MarqueeRow items={row1} reverse={false} isMobile={isMobile} />
          <MarqueeRow items={row2} reverse={true}  isMobile={isMobile} />
        </div>
      </AnimatedSection>
    </section>
  );
}
