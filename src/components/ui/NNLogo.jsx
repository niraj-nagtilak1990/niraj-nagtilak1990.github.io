export default function NNLogo({ size = 36 }) {
  const h = Math.round(size * 80 / 70);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 70 80"
      fill="none"
      aria-label="Niraj Nagtilak"
    >
      {/* Shield body */}
      <path
        d="M35 4 L64 16 L64 44 Q64 62 35 76 Q6 62 6 44 L6 16 Z"
        fill="var(--card)"
        stroke="var(--primary)"
        strokeWidth="2.5"
      />
      {/* Subtle inner guide */}
      <path
        d="M35 11 L57 21 L57 43 Q57 57 35 68 Q13 57 13 43 L13 21 Z"
        stroke="var(--primary)"
        strokeWidth="0.6"
        fill="none"
        opacity="0.2"
      />
      {/* Red accent cap */}
      <rect x="28" y="4" width="14" height="4" rx="2" fill="var(--accent)" />
      {/* NN strokes */}
      <line x1="16" y1="24" x2="16" y2="56" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" />
      <line x1="16" y1="24" x2="30" y2="56" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" />
      <line x1="30" y1="24" x2="30" y2="56" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" />
      <line x1="30" y1="24" x2="44" y2="56" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" />
      <line x1="44" y1="24" x2="44" y2="56" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
