import { useState, useEffect, useCallback, useRef } from 'react';
import { FiCalendar, FiMapPin, FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection.jsx';
import { bhutanTrips } from '../../data/bhutanTrips.js';
import useIsMobile from '../../hooks/useIsMobile.js';

function PhotoPane({ trip, photoIdx, onPhotoChange }) {
  const photo = trip.photos[photoIdx];
  const [imgFailed, setImgFailed] = useState(false);

  // Reset failed state when photo changes
  useEffect(() => { setImgFailed(false); }, [photo.src]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: trip.placeholderBg, minHeight: '420px', flexShrink: 0 }}
    >
      {/* Actual photo — hidden if load fails */}
      {!imgFailed && (
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.caption}
          onError={() => setImgFailed(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      {/* Placeholder emoji shown when no photo */}
      {imgFailed && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '5rem',
        }}>
          {trip.placeholderEmoji}
          <span style={{
            position: 'absolute', bottom: '3.5rem',
            fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
            textAlign: 'center',
          }}>
            Drop photos → public/bhutan/trip-{trip.id}/
          </span>
        </div>
      )}

      {/* Right-side gradient fade into info panel */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, transparent 55%, var(--card) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Trip badge */}
      <span style={{
        position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 3,
        fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--primary)',
        background: 'rgba(0,0,0,0.6)', border: '1px solid var(--primary)',
        padding: '0.2rem 0.65rem', borderRadius: '999px',
        backdropFilter: 'blur(4px)',
      }}>
        Trip {trip.num}
      </span>

      {/* Photo caption */}
      <div style={{
        position: 'absolute', bottom: '3rem', left: '1.25rem', right: '1.25rem',
        zIndex: 3, pointerEvents: 'none',
      }}>
        <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
          {photo.caption}
        </span>
        <span style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', textShadow: '0 1px 4px rgba(0,0,0,0.8)', marginTop: '0.1rem' }}>
          {photo.sub}
        </span>
      </div>

      {/* Inner photo nav bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
        padding: '0.5rem 1rem',
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
      }}>
        <button
          onClick={() => onPhotoChange((photoIdx - 1 + trip.photos.length) % trip.photos.length)}
          aria-label="Previous photo"
          style={{
            width: 26, height: 26, borderRadius: '50%', cursor: 'pointer',
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s', flexShrink: 0,
          }}
        >
          <FiChevronLeft size={13} />
        </button>

        <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
          {trip.photos.map((_, i) => (
            <div
              key={i}
              onClick={() => onPhotoChange(i)}
              style={{
                width: i === photoIdx ? 16 : 5,
                height: 5, borderRadius: 999,
                background: i === photoIdx ? 'var(--primary)' : 'rgba(255,255,255,0.35)',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
            />
          ))}
        </div>

        <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)', minWidth: 28, textAlign: 'center' }}>
          {photoIdx + 1}/{trip.photos.length}
        </span>

        <button
          onClick={() => onPhotoChange((photoIdx + 1) % trip.photos.length)}
          aria-label="Next photo"
          style={{
            width: 26, height: 26, borderRadius: '50%', cursor: 'pointer',
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s', flexShrink: 0,
          }}
        >
          <FiChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

export default function BhutanTrips() {
  const [tripIdx,  setTripIdx]  = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [paused,   setPaused]   = useState(false);
  const timerRef = useRef(null);

  const trip = bhutanTrips[tripIdx];
  const isMobile = useIsMobile();

  const goToTrip = useCallback((idx) => {
    setTripIdx((idx + bhutanTrips.length) % bhutanTrips.length);
    setPhotoIdx(0);
  }, []);

  const goToPhoto = useCallback((idx) => {
    setPhotoIdx((idx + trip.photos.length) % trip.photos.length);
  }, [trip.photos.length]);

  // Auto-advance: cycle photos then trips
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setPhotoIdx(prev => {
        if (prev + 1 < bhutanTrips[tripIdx].photos.length) return prev + 1;
        setTripIdx(t => (t + 1) % bhutanTrips.length);
        return 0;
      });
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [paused, tripIdx]);

  return (
    <section id="bhutan" className="py-24" style={{ background: 'var(--background)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 section-heading"
              style={{ color: 'var(--foreground)' }}>
            Bhutan Onsite Experience
          </h2>
          <p className="text-sm mb-10" style={{ color: 'var(--muted)' }}>
            4 trips · 2.5 months in-country · Thimphu, Bhutan · GST &amp; Tax Reform Project
          </p>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-3 gap-4 mb-10 rounded-2xl p-6 text-center"
               style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            {[
              { v: '4',      l: 'Onsite Trips' },
              { v: '2.5mo',  l: 'Time In-Country' },
              { v: '🇧🇹',    l: 'Thimphu, Bhutan' },
            ].map(s => (
              <div key={s.l}>
                <div className="font-display font-bold text-2xl sm:text-3xl" style={{ color: 'var(--primary)' }}>{s.v}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Main slideshow */}
        <AnimatedSection delay={0.15}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 400px' }}
                 className="bhutan-grid">
              {/* Photo pane */}
              <div style={{ position: 'relative' }}>
                <PhotoPane trip={trip} photoIdx={photoIdx} onPhotoChange={goToPhoto} />

                {/* Trip-level prev/next arrows */}
                <button
                  onClick={() => goToTrip(tripIdx - 1)}
                  aria-label="Previous trip"
                  style={{
                    position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)',
                    width: 36, height: 36, borderRadius: '50%', zIndex: 10, cursor: 'pointer',
                    background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)', transition: 'background 0.2s',
                  }}
                >
                  <FiChevronLeft size={16} />
                </button>
                <button
                  onClick={() => goToTrip(tripIdx + 1)}
                  aria-label="Next trip"
                  style={{
                    position: 'absolute', top: '50%', right: '0.75rem', transform: 'translateY(-50%)',
                    width: 36, height: 36, borderRadius: '50%', zIndex: 10, cursor: 'pointer',
                    background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)', transition: 'background 0.2s',
                  }}
                >
                  <FiChevronRight size={16} />
                </button>
              </div>

              {/* Info panel */}
              <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.1rem', justifyContent: 'center' }}>

                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  Trip <span style={{ color: 'var(--primary)' }}>{trip.num}</span> / {String(bhutanTrips.length).padStart(2, '0')}
                </div>

                <div>
                  <h3 className="font-display font-bold" style={{ fontSize: '1.2rem', color: 'var(--foreground)', lineHeight: 1.3 }}>
                    {trip.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--muted)' }}>
                      <FiCalendar size={12} /> {trip.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--muted)' }}>
                      <FiMapPin size={12} /> Thimphu, Bhutan
                    </span>
                  </div>
                  <span style={{
                    display: 'inline-block', marginTop: '0.625rem',
                    fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    padding: '0.2rem 0.7rem', borderRadius: '999px',
                  }}>
                    {trip.duration}
                  </span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {trip.bullets.map((b, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--muted)', alignItems: 'flex-start' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: '0.46em' }} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Progress bar */}
                <div style={{ height: 2, background: 'var(--border)', borderRadius: 1, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'var(--primary)', transition: 'width 0.4s ease', width: `${(tripIdx + 1) / bhutanTrips.length * 100}%` }} />
                </div>

                <a
                  href={trip.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ alignSelf: 'flex-start', fontSize: '0.78rem', padding: '0.4rem 0.875rem' }}
                >
                  <FiExternalLink size={13} /> View LinkedIn Post
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Thumbnail strip — 4 buttons desktop/tablet, active-only on mobile */}
        <AnimatedSection delay={0.2}>
          {isMobile ? (
            /* Mobile: single active trip indicator with prev/next */
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button
                onClick={() => goToTrip(tripIdx - 1)}
                aria-label="Previous trip"
                style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  color: 'var(--foreground)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <FiChevronLeft size={16} />
              </button>

              <div style={{
                flex: 1,
                background: 'var(--card)', border: '2px solid var(--primary)',
                borderRadius: '0.75rem', padding: '0.875rem 1rem', textAlign: 'left',
              }}>
                <div style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)' }}>
                  Trip {trip.num} of {bhutanTrips.length}
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--foreground)', margin: '0.1rem 0' }}>
                  {trip.date}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
                  {trip.duration} · {trip.title}
                </div>
              </div>

              <button
                onClick={() => goToTrip(tripIdx + 1)}
                aria-label="Next trip"
                style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  color: 'var(--foreground)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          ) : (
            /* Desktop/tablet: all 4 trip buttons */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginTop: '1.25rem' }}>
              {bhutanTrips.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => goToTrip(i)}
                  style={{
                    background: i === tripIdx ? 'var(--card)' : 'var(--surface)',
                    border: `2px solid ${i === tripIdx ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: '0.75rem', padding: '0.875rem 1rem',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'border-color 0.2s, transform 0.2s',
                    transform: i === tripIdx ? 'translateY(-2px)' : 'none',
                  }}
                >
                  <div style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)' }}>
                    Trip {t.num}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--foreground)', margin: '0.1rem 0' }}>
                    {t.date}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>
                    {t.duration} · {t.title}
                  </div>
                </button>
              ))}
            </div>
          )}
        </AnimatedSection>

      </div>

      {/* Responsive grid fix */}
      <style>{`
        .bhutan-grid { grid-template-columns: minmax(0,1fr) 400px !important; }
        @media (max-width: 860px) { .bhutan-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
