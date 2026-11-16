import React from 'react';
import { motion } from 'motion/react';
import type { NewsArticle, PageView } from '../types';
import { NEWS_ARTICLES } from '../data/mockData';
import { ArrowRightIcon, CalendarIcon, ClockIcon, BookIcon } from './Icons';

interface NewsSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
  onNavigate: (page: PageView) => void;
}

const APPLE_SPRING = { type: 'spring' as const, bounce: 0, duration: 0.42 };

export const NewsSection: React.FC<NewsSectionProps> = ({ onSelectArticle, onNavigate }) => {
  const featuredArticle = NEWS_ARTICLES.find((a) => a.featured) || NEWS_ARTICLES[0];
  const dispatchArticles = NEWS_ARTICLES.filter((a) => a.id !== featuredArticle.id).slice(0, 3);

  return (
    <section
      id="news"
      style={{
        backgroundColor: 'var(--bg-cream)',
        paddingTop: 'clamp(4.5rem, 7vw, 6.5rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 6.5rem)',
        position: 'relative',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={APPLE_SPRING}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ width: '12px', height: '2px', backgroundColor: 'var(--ndc-green)' }} />
            <span>Official Parliamentary &amp; Constituency Dispatch</span>
            <span style={{ width: '12px', height: '2px', backgroundColor: 'var(--ndc-red)' }} />
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontFamily: 'var(--font-serif)',
              marginTop: '0.5rem',
              color: 'var(--rich-black)',
              letterSpacing: '-0.024em',
            }}
          >
            Dispatches &amp; Press Releases
          </h2>

          <p style={{ maxWidth: '640px', margin: '0.85rem auto 0', color: '#525A55', fontSize: '1.04rem', lineHeight: 1.68 }}>
            Authoritative statements, legislative contributions, and official updates from the Office of Hon. Queenstar Maame Pokua Sawyerr.
          </p>

          <div className="ndc-accent-ribbon" style={{ margin: '1.25rem auto 0' }}>
            <div className="ribbon-green" />
            <div className="ribbon-gold" />
            <div className="ribbon-red" />
          </div>
        </motion.div>

        {/* Editorial Broadsheet Layout (Asymmetric 7:5 Grid) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Lead Dispatch Story */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={APPLE_SPRING}
            onClick={() => onSelectArticle(featuredArticle)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid rgba(17, 20, 18, 0.09)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 240ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1), border-color 240ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'rgba(0, 122, 67, 0.28)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(17, 20, 18, 0.09)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            <div style={{ height: '320px', position: 'relative', overflow: 'hidden' }}>
              <img
                src={featuredArticle.thumbnail}
                alt={featuredArticle.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 24, 19, 0.72) 0%, transparent 55%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', right: '1.5rem' }}>
                <span
                  style={{
                    backgroundColor: 'var(--ndc-red)',
                    color: '#FFFFFF',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '999px',
                  }}
                >
                  Featured Headline
                </span>
              </div>
            </div>

            <div style={{ padding: 'clamp(1.75rem, 3.5vw, 2.5rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--ndc-green)',
                  }}
                >
                  {featuredArticle.category}
                </span>
                <span style={{ color: 'var(--border-light)' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted-gray)', fontSize: '0.82rem' }}>
                  <CalendarIcon size={13} />
                  <span>{featuredArticle.date}</span>
                </div>
                <span style={{ color: 'var(--border-light)' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted-gray)', fontSize: '0.82rem' }}>
                  <ClockIcon size={13} />
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  color: 'var(--rich-black)',
                  lineHeight: 1.25,
                  marginBottom: '1rem',
                  letterSpacing: '-0.018em',
                }}
              >
                {featuredArticle.title}
              </h3>

              <p style={{ fontSize: '0.96rem', color: '#4E5752', lineHeight: 1.68, marginBottom: '1.75rem', flex: 1 }}>
                {featuredArticle.excerpt}
              </p>

              <div
                style={{
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '0.82rem', color: 'var(--muted-gray)' }}>
                  By {featuredArticle.author}
                </span>
                <span
                  style={{
                    color: 'var(--ndc-green)',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                >
                  <span>Read Official Statement</span>
                  <ArrowRightIcon size={15} />
                </span>
              </div>
            </div>
          </motion.article>

          {/* Right: The Parliamentary Gazette Wire */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ ...APPLE_SPRING, delay: 0.1 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid rgba(17, 20, 18, 0.09)',
              padding: 'clamp(1.75rem, 3vw, 2.25rem)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--ndc-green)' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--rich-black)' }}>
                  Gazette News Wire
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted-gray)' }}>
                Official Releases
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {dispatchArticles.map((article, index) => (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start',
                    paddingBottom: index < dispatchArticles.length - 1 ? '1.75rem' : '0',
                    borderBottom: index < dispatchArticles.length - 1 ? '1px solid var(--border-light)' : 'none',
                    transition: 'all 180ms ease',
                  }}
                  onMouseEnter={(e) => {
                    const titleEl = e.currentTarget.querySelector('h4');
                    if (titleEl) titleEl.style.color = 'var(--ndc-green)';
                  }}
                  onMouseLeave={(e) => {
                    const titleEl = e.currentTarget.querySelector('h4');
                    if (titleEl) titleEl.style.color = 'var(--rich-black)';
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: index % 2 === 0 ? 'var(--ndc-green-dark)' : 'var(--ndc-red-dark)',
                        }}
                      >
                        {article.category}
                      </span>
                      <span style={{ color: 'var(--border-light)' }}>•</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted-gray)' }}>
                        {article.date}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontSize: '1.08rem',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 700,
                        color: 'var(--rich-black)',
                        lineHeight: 1.34,
                        marginBottom: '0.45rem',
                        transition: 'color 160ms ease',
                      }}
                    >
                      {article.title}
                    </h4>

                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: '#555E58',
                        lineHeight: 1.58,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Thumbnail */}
                  <div
                    style={{
                      width: '88px',
                      height: '88px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Link to Dedicated News Page */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
              <button
                onClick={() => {
                  onNavigate('news');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  width: '100%',
                  background: 'var(--bg-warm-gray)',
                  border: '1px solid var(--border-light)',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  color: 'var(--rich-black)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer',
                  transition: 'all 180ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--ndc-green)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'var(--ndc-green)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-warm-gray)';
                  e.currentTarget.style.color = 'var(--rich-black)';
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                }}
              >
                <span>View All Press Statements</span>
                <ArrowRightIcon size={14} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* The MP's Notebook (Blog Callout Bar) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={APPLE_SPRING}
          style={{
            marginTop: '3.5rem',
            backgroundColor: '#0F1813',
            color: '#FFFFFF',
            borderRadius: '20px',
            padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
              <BookIcon size={14} className="text-[#F3E5C2]" />
              <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F3E5C2', fontWeight: 700 }}>
                The MP\'s Notebook &amp; Essays
              </span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', fontFamily: 'var(--font-serif)', color: '#FFFFFF', marginBottom: '0.45rem' }}>
              Deep Perspectives on Rural Education, Decentralisation &amp; Governance
            </h3>
            <p style={{ color: '#BAC3BC', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Read long-form editorial essays and reflections authored by Hon. Queenstar Maame Pokua Sawyerr.
            </p>
          </div>

          <button
            onClick={() => {
              onNavigate('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-primary-green"
            style={{ padding: '0.82rem 1.75rem', fontSize: '0.92rem' }}
          >
            <span>Read The MP\'s Notebook</span>
            <ArrowRightIcon size={15} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
