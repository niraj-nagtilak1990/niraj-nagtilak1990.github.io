import { useId } from 'react';

const SHIELD = 'M35 4 L64 16 L64 44 Q64 62 35 76 Q6 62 6 44 L6 16 Z';

export default function ShieldPhoto({ src, alt, size = 280 }) {
  const uid    = useId().replace(/:/g, '');
  const clipId = `sp-clip-${uid}`;
  const w      = Math.round(size * 70 / 80);   // 70:80 aspect ratio
  const h      = size;

  // 20% zoom: expand image beyond viewBox, centred
  const imgW = Math.round(70 * 1.2);
  const imgH = Math.round(80 * 1.2);
  const imgX = -Math.round((imgW - 70) / 2);   // ≈ -7
  const imgY = -Math.round((imgH - 80) / 2);   // ≈ -8

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 70 80"
      fill="none"
      aria-label={alt}
      style={{
        filter: 'drop-shadow(0 0 24px rgba(200,169,110,0.25))',
        overflow: 'visible',
      }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={SHIELD} />
        </clipPath>
      </defs>

      {/* Outer decorative shield glow ring */}
      <path
        d={SHIELD}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1"
        opacity="0.2"
        transform="translate(35,40) scale(1.12) translate(-35,-40)"
      />

      {/* Photo clipped to shield */}
      <g clipPath={`url(#${clipId})`}>
        <image
          href={src}
          x={imgX}
          y={imgY}
          width={imgW}
          height={imgH}
          preserveAspectRatio="xMidYTop slice"
        />
      </g>

      {/* Shield border overlay */}
      <path d={SHIELD} fill="none" stroke="var(--primary)" strokeWidth="2.5" />

    </svg>
  );
}
