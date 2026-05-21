import { FiExternalLink, FiThumbsUp } from 'react-icons/fi';
import AnimatedSection from '../ui/AnimatedSection.jsx';
import { linkedinPosts } from '../../data/linkedinPosts.js';

const TYPE_BADGE = {
  milestone: { label: 'Milestone', color: 'var(--primary)' },
  insight:   { label: 'Insight',   color: 'var(--accent)' },
  thought:   { label: 'Thought',   color: 'var(--muted)' },
};

export default function LinkedInPosts() {
  return (
    <section id="posts" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold section-heading"
                  style={{ color: 'var(--foreground)' }}>
                LinkedIn Posts
              </h2>
              <p className="mt-4 text-sm" style={{ color: 'var(--muted)' }}>
                Latest thoughts on engineering, architecture, and leadership
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/niraj-nagtilak/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--primary)' }}
            >
              Follow on LinkedIn <FiExternalLink size={14} />
            </a>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {linkedinPosts.map((post, i) => {
            const badge = TYPE_BADGE[post.type] || TYPE_BADGE.thought;
            return (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: badge.color + '22', color: badge.color, border: `1px solid ${badge.color}44` }}
                    >
                      {badge.label}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>{post.date}</span>
                  </div>

                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>
                    {post.text}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4"
                       style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                      <FiThumbsUp size={12} />
                      <span>{post.likes}</span>
                    </div>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs flex items-center gap-1"
                      style={{ color: 'var(--primary)' }}
                    >
                      View post <FiExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
