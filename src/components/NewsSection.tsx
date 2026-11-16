import React from 'react';
import type { NewsArticle, PageView } from '../types';
import { NEWS_ARTICLES } from '../data/mockData';
import { ArrowRightIcon, CalendarIcon, ClockIcon } from './Icons';

interface NewsSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
  onNavigate: (page: PageView) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onSelectArticle, onNavigate }) => {
  const featuredArticle = NEWS_ARTICLES.find((a) => a.featured) || NEWS_ARTICLES[0];
  const regularArticles = NEWS_ARTICLES.filter((a) => a.id !== featuredArticle.id).slice(0, 3);

  return (
    <section
      id="news"
      style={{
        backgroundColor: 'var(--bg-cream)',
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
        position: 'relative',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ width: '12px', height: '2px', backgroundColor: '#006B3F' }} />
            <span>Constituency &amp; Parliamentary Dispatch</span>
            <span style={{ width: '12px', height: '2px', backgroundColor: '#CE1126' }} />
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              fontFamily: 'var(--font-serif)',
              marginTop: '0.5rem',
              color: 'var(--rich-black)',
            }}
          >
            Updates &amp; News
          </h2>

          <p style={{ maxWidth: '620px', margin: '0.75rem auto 0', color: '#5C5751', fontSize: '1.05rem' }}>
            Verified press statements, parliamentary contributions, and community activities from the Office of Hon. Queenstar Maame Pokua Sawyerr.
          </p>

          <div className="ndc-accent-ribbon" style={{ margin: '1rem auto 0', maxWidth: '100px' }}>
            <div className="ribbon-green" />
            <div className="ribbon-gold" />
            <div className="ribbon-red" />
          </div>
        </div>

        {/* Featured Story Spotlight */}
        <div
          onClick={() => onSelectArticle(featuredArticle)}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            marginBottom: '3rem',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)',
          }}
          className="luxury-card"
        >
          <div className="img-zoom-container" style={{ minHeight: '340px', position: 'relative' }}>
            <img src={featuredArticle.thumbnail} alt={featuredArticle.title} />
            <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
              <span className="pill-red">Featured Headline</span>
            </div>
          </div>

          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7E7972', fontSize: '0.82rem' }}>
                <CalendarIcon size={14} className="text-[#006B3F]" />
                <span>{featuredArticle.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7E7972', fontSize: '0.82rem' }}>
                <ClockIcon size={14} className="text-[#006B3F]" />
                <span>{featuredArticle.readTime}</span>
              </div>
              <span className="pill-category">{featuredArticle.category}</span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                color: 'var(--rich-black)',
                marginBottom: '1rem',
                lineHeight: 1.3,
              }}
            >
              {featuredArticle.title}
            </h3>

            <p style={{ fontSize: '0.98rem', color: '#55504A', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {featuredArticle.excerpt}
            </p>

            <div>
              <span
                style={{
                  color: 'var(--ndc-green)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>Read Full Story</span>
                <ArrowRightIcon size={16} />
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column News Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2.25rem',
          }}
        >
          {regularArticles.map((article, index) => (
            <div
              key={article.id}
              className="luxury-card"
              style={{ cursor: 'pointer', backgroundColor: '#FFFFFF' }}
              onClick={() => onSelectArticle(article)}
            >
              <div className="img-zoom-container" style={{ height: '210px', position: 'relative' }}>
                <img src={article.thumbnail} alt={article.title} />
                
                {/* Category tag in Green or Red */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span
                    className={index % 2 === 0 ? 'pill-category' : 'pill-red'}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
                  >
                    {article.category}
                  </span>
                </div>
              </div>

              <div style={{ padding: '1.85rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#7E7972', fontSize: '0.8rem' }}>
                    <CalendarIcon size={14} className="text-[#006B3F]" />
                    <span>{article.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#7E7972', fontSize: '0.8rem' }}>
                    <ClockIcon size={14} className="text-[#006B3F]" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: 'var(--rich-black)',
                    lineHeight: 1.35,
                  }}
                >
                  {article.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#55504A',
                    lineHeight: 1.65,
                    marginBottom: '1.35rem',
                    flex: 1,
                  }}
                >
                  {article.excerpt}
                </p>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectArticle(article);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--ndc-green)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Read Article</span>
                    <ArrowRightIcon size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Dedicated News Page CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.75rem' }}>
          <button
            onClick={() => {
              onNavigate('news');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-outline-green"
            style={{ padding: '0.9rem 2.4rem' }}
          >
            <span>View Full Press &amp; Media Archive</span>
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
