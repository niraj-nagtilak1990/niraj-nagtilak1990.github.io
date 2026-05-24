import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection.jsx';
import { recommendations } from '../../data/recommendations.js';
import useIsMobile from '../../hooks/useIsMobile.js';
import { track } from '../../utils/analytics.js';

function Avatar({ rec }) {
  const [imgError, setImgError] = useState(false);
  const initials = rec.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  if (imgError || !rec.photo) {
    return (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
        style={{ background: 'var(--primary)', color: 'var(--background)' }}
      >
        {initials}
      </div>
    );
  }
  return (
    <img
      src={rec.photo}
      alt={rec.name}
      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
      onError={() => setImgError(true)}
    />
  );
}

function RecCard({ rec }) {
  return (
    <div className="glass rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
      <div className="quote-mark select-none">"</div>
      <p className="text-sm leading-relaxed flex-1 relative z-10 mt-4"
         style={{ color: 'var(--muted)' }}>
        {rec.text.length > 280 ? rec.text.slice(0, 280) + '…' : rec.text}
      </p>
      <div className="flex items-center gap-3 mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
        <Avatar rec={rec} />
        <div className="min-w-0">
          <a
            href={rec.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sm block truncate hover:underline"
            style={{ color: 'var(--foreground)' }}
          >
            {rec.name}
          </a>
          <p className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--muted)' }}>
            {rec.title.length > 50 ? rec.title.slice(0, 50) + '…' : rec.title}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--primary)' }}>
            {rec.relationship} · {rec.date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Recommendations() {
  const isMobile = useIsMobile();
  const PER_PAGE = isMobile ? 1 : 3;
  const [page, setPage] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const cardRef      = useRef(null);

  // Reset to first page when layout changes
  useEffect(() => { setPage(0); }, [isMobile]);

  const totalPages = Math.ceil(recommendations.length / PER_PAGE);
  const visible = recommendations.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const prev = () => setPage(p => Math.max(0, p - 1));
  const next = () => setPage(p => Math.min(totalPages - 1, p + 1));

  // Non-passive touchmove so we can preventDefault and stop page scroll
  // during a horizontal swipe
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e) => {
      if (touchStartX.current === null) return;
      const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
      const dy = Math.abs(e.touches[0].clientY - (touchStartY.current ?? 0));
      if (dx > dy && dx > 8) e.preventDefault();
    };
    el.addEventListener('touchmove', onMove, { passive: false });
    return () => el.removeEventListener('touchmove', onMove);
  }, []);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) < 40) return;
    dx < 0 ? next() : prev();
  }

  return (
    <section id="recommendations" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold section-heading"
                  style={{ color: 'var(--foreground)' }}>
                Recommendations
              </h2>
              <p className="mt-4 text-sm" style={{ color: 'var(--muted)' }}>
                {recommendations.length} recommendations from colleagues, managers, and direct reports
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/niraj-nagtilak/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--primary)' }}
              onClick={() => track('recommendations_linkedin_click')}
            >
              View on LinkedIn <FiExternalLink size={14} />
            </a>
          </div>
        </AnimatedSection>

        {/* Cards */}
        <div
          ref={cardRef}
          className={`grid gap-6 min-h-[340px] ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {visible.map((rec, i) => (
            <AnimatedSection key={rec.id} delay={i * 0.1}>
              <RecCard rec={rec} />
            </AnimatedSection>
          ))}
        </div>

        {/* Swipe hint — mobile only, first page */}
        {isMobile && page === 0 && (
          <p className="text-center text-xs mt-3" style={{ color: 'var(--muted)', opacity: 0.5 }}>
            Swipe left / right to browse
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <AnimatedSection delay={0.3}>
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                aria-label="Previous recommendations"
                className="p-2 rounded-lg transition-colors disabled:opacity-30"
                style={{ background: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
                onClick={prev}
                disabled={page === 0}
              >
                <FiChevronLeft size={18} aria-hidden="true" />
              </button>

              {/* Dots — desktop only (too many on mobile) */}
              {!isMobile && (
                <div className="flex gap-2" role="tablist" aria-label="Recommendation pages">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-label={`Page ${i + 1} of ${totalPages}`}
                      aria-selected={i === page}
                      className="w-2 h-2 rounded-full transition-all"
                      style={{ background: i === page ? 'var(--primary)' : 'var(--border)' }}
                      onClick={() => setPage(i)}
                    />
                  ))}
                </div>
              )}

              <button
                aria-label="Next recommendations"
                className="p-2 rounded-lg transition-colors disabled:opacity-30"
                style={{ background: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
                onClick={next}
                disabled={page === totalPages - 1}
              >
                <FiChevronRight size={18} aria-hidden="true" />
              </button>

              <span className="text-xs" style={{ color: 'var(--muted)', minWidth: '3rem', textAlign: 'center' }}>
                {page + 1} / {totalPages}
              </span>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
