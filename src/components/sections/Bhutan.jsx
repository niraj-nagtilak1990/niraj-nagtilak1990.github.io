import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiCalendar, FiCamera, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection.jsx';
import { bhutanTrips } from '../../data/bhutan.js';

function PhotoGrid({ photos, tripId }) {
  const [lightbox, setLightbox] = useState(null);

  if (!photos || photos.length === 0) {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{ background: 'var(--surface)', border: '2px dashed var(--border)' }}
      >
        <FiCamera size={32} className="mx-auto mb-3 opacity-40" style={{ color: 'var(--muted)' }} />
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Photos coming soon — drop images into{' '}
          <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--card)' }}>
            /public/bhutan/trip-{tripId}/
          </code>
          {' '}and update the trip data file.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((src, i) => (
          <button
            key={i}
            className="aspect-square overflow-hidden rounded-xl group"
            onClick={() => setLightbox(i)}
          >
            <img
              src={src}
              alt={`Bhutan trip ${tripId} photo ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="photo-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white"
              onClick={() => setLightbox(null)}
            >
              <FiX size={20} />
            </button>
            <button
              className="absolute left-4 p-2 rounded-full bg-white/10 text-white disabled:opacity-30"
              onClick={e => { e.stopPropagation(); setLightbox(l => Math.max(0, l - 1)); }}
              disabled={lightbox === 0}
            >
              <FiChevronLeft size={20} />
            </button>
            <img
              src={photos[lightbox]}
              alt="Bhutan"
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute right-4 p-2 rounded-full bg-white/10 text-white disabled:opacity-30"
              onClick={e => { e.stopPropagation(); setLightbox(l => Math.min(photos.length - 1, l + 1)); }}
              disabled={lightbox === photos.length - 1}
            >
              <FiChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 text-white/60 text-sm">
              {lightbox + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Bhutan() {
  const [active, setActive] = useState(0);
  const trip = bhutanTrips[active];

  return (
    <section
      id="bhutan"
      className="py-24"
      style={{ background: 'var(--surface)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 section-heading"
              style={{ color: 'var(--foreground)' }}>
            Bhutan Adventures
          </h2>
          <p className="mb-10 text-base max-w-2xl" style={{ color: 'var(--muted)' }}>
            The Land of the Thunder Dragon holds a very special place in my heart, both as the
            country whose national tax system I had the privilege of architecting, and as a place of
            breathtaking beauty I have explored four times.
          </p>
        </AnimatedSection>

        {/* Trip selector tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-8">
            {bhutanTrips.map((t, i) => (
              <button
                key={t.id}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: active === i ? 'var(--primary)' : 'var(--card)',
                  color: active === i ? 'var(--background)' : 'var(--muted)',
                  border: `1px solid ${active === i ? 'var(--primary)' : 'var(--border)'}`,
                }}
                onClick={() => setActive(i)}
              >
                {t.year} — {t.title.split(' ').slice(0, 3).join(' ')}…
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Story side */}
              <div>
                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background: trip.coverColor + '22',
                    border: `1px solid ${trip.coverColor}44`,
                  }}
                >
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--foreground)' }}>
                    {trip.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm mb-4" style={{ color: 'var(--muted)' }}>
                    <span className="flex items-center gap-1">
                      <FiCalendar size={13} style={{ color: 'var(--primary)' }} />
                      {trip.year} · {trip.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin size={13} style={{ color: 'var(--primary)' }} />
                      {trip.route}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {trip.story}
                  </p>
                </div>

                <h4 className="font-semibold text-sm mb-3" style={{ color: 'var(--foreground)' }}>
                  Highlights
                </h4>
                <ul className="space-y-2">
                  {trip.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: 'var(--primary)' }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photos side */}
              <div>
                <h4 className="font-semibold text-sm mb-3" style={{ color: 'var(--foreground)' }}>
                  Photos
                </h4>
                <PhotoGrid photos={trip.photos} tripId={trip.id} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
