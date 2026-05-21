import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection.jsx';
import { recommendations } from '../../data/recommendations.js';

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

export default function Recommendations() {
  const [page, setPage] = useState(0);
  const PER_PAGE = 3;
  const totalPages = Math.ceil(recommendations.length / PER_PAGE);
  const visible = recommendations.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

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
            >
              View on LinkedIn <FiExternalLink size={14} />
            </a>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 min-h-[340px]">
          {visible.map((rec, i) => (
            <AnimatedSection key={rec.id} delay={i * 0.1}>
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
            </AnimatedSection>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <AnimatedSection delay={0.3}>
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                className="p-2 rounded-lg transition-colors disabled:opacity-30"
                style={{ background: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                <FiChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ background: i === page ? 'var(--primary)' : 'var(--border)' }}
                    onClick={() => setPage(i)}
                  />
                ))}
              </div>

              <button
                className="p-2 rounded-lg transition-colors disabled:opacity-30"
                style={{ background: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--border)' }}
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
              >
                <FiChevronRight size={18} />
              </button>

              <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>
                {page + 1} / {totalPages}
              </span>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
