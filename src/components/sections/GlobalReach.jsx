import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { feature } from 'topojson-client';
import AnimatedSection from '../ui/AnimatedSection.jsx';

const Globe = lazy(() => import('react-globe.gl'));

// ISO numeric IDs (world-atlas) for large enough countries
const DELIVERED_IDS = new Set(['554','36','356','328','84','196','52']);
// 554=NZ, 36=AUS, 356=India, 328=Guyana, 84=Belize, 196=Cyprus, 52=Barbados

const LOCATIONS = [
  { name: 'New Zealand',     lat: -41.0, lng: 174.9, type: 'delivered',
    work: 'Capgemini · DataTorque · ANZ · MoE NZ · MBIE · NZ Police · Auckland Council\nPre-sales: Toyota NZ · FENZ · Perpetual Guardian' },
  { name: 'Australia',       lat: -25.3, lng: 133.8, type: 'delivered',
    work: 'Capgemini AU: ANZ Bank Banker Workbench (Sydney)\nLevo NZ: SmartGroup Australia Government Customer Portal' },
  { name: 'India',           lat:  20.6, lng:  78.9, type: 'delivered',
    work: 'Mastercard: Transaction Investigator\nParagyte Technologies · Aretove Software' },
  { name: 'Bhutan',          lat:  27.5, lng:  90.4, type: 'delivered',
    work: 'Bhutan Integrated Tax System (BITS)\n4 onsite trips · GST & Excise Tax' },
  { name: 'Guyana',          lat:   4.9, lng: -58.9, type: 'delivered',
    work: 'Revenue Management System, DataTorque' },
  { name: 'Belize',          lat:  17.2, lng: -88.5, type: 'delivered',
    work: 'Tax Administration IRIS, DataTorque' },
  { name: 'Cyprus',          lat:  35.1, lng:  33.4, type: 'delivered',
    work: 'TaxForAll platform, DataTorque' },
  { name: 'Barbados',        lat:  13.2, lng: -59.5, type: 'delivered',
    work: 'Barbados Revenue Authority (TAMIS), DataTorque' },
  { name: 'Cook Islands',    lat: -21.2, lng:-159.8, type: 'delivered',
    work: 'Revenue Management System, DataTorque' },
  { name: 'Isle of Man',     lat:  54.2, lng:  -4.5, type: 'delivered',
    work: 'Customs & Immigration system, DataTorque' },
  { name: 'Palau',           lat:   7.5, lng: 134.6, type: 'pricing',
    work: 'Tax system pricing & scoping' },
  { name: 'Marshall Islands',lat:   7.1, lng: 171.2, type: 'pricing',
    work: 'Tax system pricing & scoping' },
];

const DELIVERED_LOCS = LOCATIONS.filter(l => l.type === 'delivered');

const STATS = [
  { v: '12+', l: 'Countries' },
  { v: '7',   l: 'Nations\' tax systems' },
  { v: '10+', l: 'Proposals converted' },
  { v: '2',   l: 'Pricing exercises' },
];

// Read CSS variable value (called once globe mounts, so vars are resolved)
function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function GlobeWrapper() {
  const globeRef  = useRef(null);
  const [ready, setReady]         = useState(false);
  const [countries, setCountries] = useState([]);
  const [size, setSize]           = useState({ w: 600, h: 500 });
  const [tooltip, setTooltip]     = useState(null); // { name, work, x, y, pinned }
  const hideTimer   = useRef(null);
  const resumeTimer = useRef(null);

  // Load world topology → GeoJSON features
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then(topo => setCountries(feature(topo, topo.objects.countries).features))
      .catch(() => {});
  }, []);

  // Responsive size
  useEffect(() => {
    function measure() {
      const el = document.getElementById('globe-container');
      if (el) setSize({ w: el.offsetWidth, h: Math.min(el.offsetWidth * 0.72, 520) });
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (!ready || !globeRef.current) return;
    const ctrl = globeRef.current.controls();
    ctrl.autoRotate      = true;
    ctrl.autoRotateSpeed = 0.55;
    ctrl.enableZoom      = false;
    globeRef.current.pointOfView({ lat: 10, lng: 120, altitude: 1.9 }, 0);
  }, [ready]);

  function pause() {
    clearTimeout(resumeTimer.current);
    if (globeRef.current) globeRef.current.controls().autoRotate = false;
  }
  function resume() {
    // Debounce — covers mouse briefly leaving globe on the way to the tooltip
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      if (globeRef.current) globeRef.current.controls().autoRotate = true;
    }, 500);
  }

  // Tooltip handlers
  // Hover only pauses/resumes rotation — pointLabel handles the hover display
  function handlePointHover(point) {
    if (point) pause(); else resume();
  }

  function handlePointClick(point, event) {
    if (!point) { setTooltip(null); return; }
    const isTouchEvt = !!(event?.changedTouches);
    const ex = event?.clientX
      ?? event?.changedTouches?.[0]?.clientX
      ?? window.innerWidth  / 2;
    const ey = event?.clientY
      ?? event?.changedTouches?.[0]?.clientY
      ?? window.innerHeight / 2;
    const y = isTouchEvt ? Math.max(ey - 130, 60) : ey;
    setTooltip(prev =>
      prev?.pinned && prev?.name === point.name
        ? null
        : { name: point.name, work: point.work, x: ex, y, pinned: true }
    );
  }

  const primary = '#C8A96E';
  const muted   = '#8B949E';
  const bg      = '#0D1117';

  // Built-in hover label — used as primary hover tooltip (proven to work)
  const labelHtml = d => `<div style="background:rgba(22,27,34,0.96);border:1px solid ${primary};border-radius:8px;padding:8px 12px;max-width:260px;pointer-events:none;font-family:Inter,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,0.5)"><div style="color:${primary};font-weight:700;font-size:13px;margin-bottom:4px">${d.name}</div><div style="color:${muted};font-size:11px;line-height:1.5;white-space:pre-line">${d.work}</div></div>`;

  return (
    <>
    <div
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      style={{ lineHeight: 0 }}
    >
      <Globe
        ref={globeRef}
        width={size.w}
        height={size.h}

        // ── No photo texture — solid dark ocean matching theme ──
        globeImageUrl={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%230D1117'/%3E%3C/svg%3E`}
        bumpImageUrl={null}
        backgroundImageUrl={null}
        backgroundColor="rgba(17,24,39,0)"

        // ── Gold atmosphere ──
        atmosphereColor={primary}
        atmosphereAltitude={0.14}

        // ── Country polygons — theme colours ──
        polygonsData={countries}
        polygonCapColor={d => DELIVERED_IDS.has(String(d.id))
          ? 'rgba(200,169,110,0.75)'   // gold — delivered
          : 'rgba(48,54,61,0.55)'}     // border — other
        polygonSideColor={() => 'rgba(0,0,0,0)'}
        polygonStrokeColor={() => bg}
        polygonAltitude={d => DELIVERED_IDS.has(String(d.id)) ? 0.012 : 0.003}

        // ── Pulsing rings on delivered countries ──
        ringsData={DELIVERED_LOCS}
        ringLat={d => d.lat}
        ringLng={d => d.lng}
        ringColor={() => () => primary}
        ringMaxRadius={4}
        ringPropagationSpeed={1.5}
        ringRepeatPeriod={900}
        ringAltitude={0.005}

        // ── Dots ──
        pointsData={LOCATIONS}
        pointLat={d => d.lat}
        pointLng={d => d.lng}
        pointColor={d => d.type === 'delivered' ? primary : muted}
        pointRadius={d => d.type === 'delivered' ? 1.1 : 0.8}
        pointAltitude={d => d.type === 'delivered' ? 0.08 : 0.04}
        pointLabel={labelHtml}

        onPointHover={handlePointHover}
        onPointClick={handlePointClick}
        onGlobeReady={() => setReady(true)}
      />
    </div>

    {/* Pinned tooltip — shown on click/tap only, dismissed with × */}
    {tooltip?.pinned && (
      <div
        onMouseEnter={pause}
        onMouseLeave={resume}
        style={{
          position: 'fixed',
          left:   Math.min(Math.max(tooltip.x + 14, 8), window.innerWidth  - 300),
          top:    Math.min(Math.max(tooltip.y - 10, 8), window.innerHeight - 180),
          zIndex: 9999,
          background: 'rgba(22,27,34,0.97)',
          border: `1px solid ${primary}`,
          borderRadius: '0.75rem',
          padding: '0.875rem 1rem',
          width: '270px',
          maxHeight: '160px',
          overflowY: 'auto',
          boxShadow: '0 8px 28px rgba(0,0,0,0.55)',
          fontFamily: 'Inter, sans-serif',
          pointerEvents: 'auto',
        }}
      >
        {/* Close button for pinned (mobile tap) */}
        {tooltip.pinned && (
          <button
            onClick={() => setTooltip(null)}
            style={{
              position: 'absolute', top: 6, right: 8,
              background: 'none', border: 'none', cursor: 'pointer',
              color: muted, fontSize: 16, lineHeight: 1, padding: 2,
            }}
            aria-label="Close"
          >×</button>
        )}
        <div style={{ color: primary, fontWeight: 700, fontSize: 13, marginBottom: 4, paddingRight: tooltip.pinned ? 16 : 0 }}>
          {tooltip.name}
        </div>
        <div style={{ color: muted, fontSize: 11, lineHeight: 1.55, whiteSpace: 'pre-line' }}>
          {tooltip.work}
        </div>
        {tooltip.pinned && (
          <div style={{ color: muted, fontSize: 10, marginTop: 6, opacity: 0.5 }}>
            Tap × to close
          </div>
        )}
      </div>
    )}
    </>
  );
}

export default function GlobalReach() {
  return (
    <section id="global-reach" className="py-24" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 section-heading"
              style={{ color: 'var(--foreground)' }}>
            Global Reach
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
            Drag to explore · Countries where I have delivered production systems, won pre-sales, or completed pricing exercises.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 rounded-2xl p-4 sm:p-6 text-center"
               style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            {STATS.map(s => (
              <div key={s.l}>
                <div className="font-display font-bold text-2xl sm:text-3xl" style={{ color: 'var(--primary)' }}>{s.v}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div
            id="globe-container"
            className="rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', minHeight: 380 }}
          >
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center gap-3 py-24" style={{ color: 'var(--muted)' }}>
                <div style={{
                  width: 40, height: 40,
                  border: '3px solid var(--border)',
                  borderTopColor: 'var(--primary)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <span className="text-sm">Loading globe…</span>
              </div>
            }>
              <GlobeWrapper />
            </Suspense>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap gap-6 mt-5 justify-center">
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--primary)', opacity: 0.75, display: 'inline-block' }} />
              Full delivery (elevated + pulsing ring)
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--muted)', display: 'inline-block' }} />
              Pricing / scoping
            </div>
            <p className="text-xs w-full text-center" style={{ color: 'var(--muted)', opacity: 0.5 }}>
              Hover any country or dot for details · Drag to rotate · Pauses on hover
            </p>
          </div>
        </AnimatedSection>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
