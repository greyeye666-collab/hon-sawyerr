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
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
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
            Latest News &amp; Activity Updates
          </h2>

          <p style={{ maxWidth: '600px', margin: '0.75rem auto 0', color: '#66615C', fontSize: '1.05rem' }}>
            Stay informed with verified press releases, parliamentary speeches, and community progress across Agona East.
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
            border: '1px solid rgba(232, 227, 220, 0.9)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            marginBottom: '3rem',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)',
          }}
          className="luxury-card"
        >
          <div className="img-zoom-container" style={{ minHeight: '320px', position: 'relative' }}>
            <img src={featuredArticle.thumbnail} alt={featuredArticle.title} />
            <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
              <span className="pill-red">Featured Headline</span>
            </div>
          </div>

          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#88827C', fontSize: '0.82rem' }}>
                <CalendarIcon size={14} className="text-[#006B3F]" />
                <span>{featuredArticle.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#88827C', fontSize: '0.82rem' }}>
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
            gap: '2rem',
          }}
        >
          {regularArticles.map((article) => (
            <div
              key={article.id}
              className="luxury-card"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectArticle(article)}
            >
              <div className="img-zoom-container" style={{ height: '210px', position: 'relative' }}>
                <img src={article.thumbnail} alt={article.title} />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span className="pill-category" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                    {article.category}
                  </span>
                </div>
              </div>

              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#88827C', fontSize: '0.78rem' }}>
                    <CalendarIcon size={14} className="text-[#006B3F]" />
                    <span>{article.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#88827C', fontSize: '0.78rem' }}>
                    <ClockIcon size={14} className="text-[#006B3F]" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
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
                    fontSize: '0.88rem',
                    color: '#66615C',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    flex: 1,
                  }}
                >
                  {article.excerpt}
                </p>

                <div style={{ borderTop: '1px solid rgba(232, 227, 220, 0.8)', paddingTop: '1rem' }}>
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
                      fontSize: '0.88rem',
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
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={() => {
              onNavigate('news');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-outline-gold"
            style={{ padding: '0.85rem 2.2rem' }}
          >
            <span>View Full Press &amp; Media Archive</span>
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
