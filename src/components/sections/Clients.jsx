import { useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection.jsx';
import { clientSprite, SLOT_W, SLOT_H, SPRITE_TOTAL_W } from '../../data/clientSprite.js';
import useIsMobile from '../../hooks/useIsMobile.js';

const sorted = [...clientSprite].sort((a, b) => a.name.localeCompare(b.name));
const N      = sorted.length;
const ANGLE  = 360 / N;

/* ── Shared sprite card ─────────────────────────────────────────── */
function SpriteCard({ client, scale, cardSize, showLabel, style = {}, className = '' }) {
  const spriteW = Math.round(SLOT_W * scale);
  const spriteH = Math.round(SLOT_H * scale);
  const totalW  = Math.round(SPRITE_TOTAL_W * scale);
  const posX    = Math.round(client.x * scale);

  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      title={client.name}
      className={`client-card flex-shrink-0 flex flex-col items-center justify-center rounded-2xl glass cursor-pointer ${className}`}
      style={{
        width: `${cardSize}px`,
        height: `${cardSize}px`,
        border: '1px solid var(--border)',
        padding: '0.75rem',
        gap: '0.5rem',
        ...style,
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
          borderRadius: '6px',
          flexShrink: 0,
        }}
        role="img"
        aria-label={client.name}
        className="client-sprite"
      />
      {showLabel && (
        <span style={{ fontSize: '0.6rem', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.3, maxWidth: '90%' }}>
          {client.name}
        </span>
      )}
    </a>
  );
}

/* ── Desktop / Tablet: straight horizontal marquee ──────────────── */
function HorizontalMarquee() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', paddingTop: '12px', marginTop: '-12px' }}
    >
      <div
        className="clients-track animate-marquee"
        style={{ display: 'flex', gap: '1rem', width: 'max-content', animationDuration: '55s' }}
      >
        {[...sorted, ...sorted].map((client, i) => (
          <SpriteCard
            key={`${client.name}-${i}`}
            client={client}
            scale={0.67}
            cardSize={110}
            showLabel
          />
        ))}
      </div>
    </div>
  );
}

/* ── Mobile: 3D rotating carousel ───────────────────────────────── */
function Carousel3D() {
  const [paused, setPaused] = useState(false);
  const cardSize    = 40;
  const spriteScale = 0.25;
  const itemSpacing = cardSize + 10;
  const radius      = Math.round((N * itemSpacing) / (2 * Math.PI));
  const perspective = Math.round(radius * 1.8);
  const containerH  = cardSize + 24;

  return (
    <div
      style={{ perspective: `${perspective}px`, height: `${containerH}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div style={{ transformStyle: 'preserve-3d' }}>
        <div style={{
          width: `${cardSize}px`,
          height: `${cardSize}px`,
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: 'carousel3d 55s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}>
          {sorted.map((client, i) => {
            const spriteW = Math.round(SLOT_W * spriteScale);
            const spriteH = Math.round(SLOT_H * spriteScale);
            const totalW  = Math.round(SPRITE_TOTAL_W * spriteScale);
            const posX    = Math.round(client.x * spriteScale);
            return (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                title={client.name}
                className="client-card"
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.625rem',
                  cursor: 'pointer',
                  backfaceVisibility: 'hidden',
                  transform: `rotateY(${i * ANGLE}deg) translateZ(${radius}px)`,
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
                    borderRadius: '4px',
                  }}
                  role="img"
                  aria-label={client.name}
                  className="client-sprite"
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────── */
export default function Clients() {
  const isMobile = useIsMobile();

  return (
    <section id="clients" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
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
            to identify organisations I have professionally worked for or with. This is a personal portfolio
            and no commercial relationship is implied.
          </p>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.1}>
        {isMobile
          ? <div className="px-4"><Carousel3D /></div>
          : <div style={{ paddingLeft: '20%', paddingRight: '20%' }}><HorizontalMarquee /></div>
        }
      </AnimatedSection>

      <style>{`
        @keyframes carousel3d {
          from { transform: rotateY(0deg);   }
          to   { transform: rotateY(360deg); }
        }
      `}</style>
    </section>
  );
}
