import React, { useState } from 'react';
import type { NewsArticle, PageView } from '../types';
import { useSiteData } from '../hooks/useSiteData';
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ClockIcon } from './Icons';

interface DedicatedNewsPageProps {
  onBack: () => void;
  onSelectArticle: (a: NewsArticle) => void;
  onNavigate: (page: PageView) => void;
}

export const DedicatedNewsPage: React.FC<DedicatedNewsPageProps> = ({
  onBack,
  onSelectArticle,
  onNavigate,
}) => {
  const { newsArticles } = useSiteData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Press Release', 'Education', 'Healthcare', 'Parliament', 'Community'];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-cream)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Top Banner Navigation */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-light)', padding: '1rem 0' }}>
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--ndc-green)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              padding: '0.4rem 0',
            }}
          >
            <ArrowLeftIcon size={18} />
            <span>Back to Home</span>
          </button>

          <span className="pill-category">Press &amp; Media Center</span>
        </div>
      </div>

      {/* Hero Header */}
      <div
        style={{
          backgroundColor: '#111111',
          color: '#FFFFFF',
          padding: '4.5rem 0 4rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 80% 30%, rgba(0, 107, 63, 0.35) 0%, #111111 85%)',
            zIndex: 1,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#006B3F' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CE1126' }} />
              <span style={{ color: '#C5A059', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Verified News &amp; Updates
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '1rem',
              }}
            >
              Constituency Press Center &amp; Speeches
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              Official releases, parliamentary statements, community development briefings, and news bulletins from the
              Office of Hon. Queenstar Maame Pokua Sawyerr.
            </p>

            <div className="ndc-accent-ribbon" style={{ maxWidth: '140px', height: '4px' }}>
              <div className="ribbon-green" />
              <div className="ribbon-gold" />
              <div className="ribbon-red" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="container-custom" style={{ marginTop: '3.5rem' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search news, speeches, statements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: '260px',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-cream)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="btn-subtle"
            >
              Reset
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  backgroundColor: selectedCategory === cat ? '#006B3F' : 'transparent',
                  color: selectedCategory === cat ? '#FFFFFF' : '#55504A',
                  borderColor: selectedCategory === cat ? '#006B3F' : 'var(--border-light)',
                  transition: 'var(--transition-smooth)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '2.5rem',
          }}
        >
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="luxury-card"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectArticle(article)}
            >
              <div className="img-zoom-container" style={{ height: '220px', position: 'relative' }}>
                <img src={article.thumbnail} alt={article.title} />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(17, 20, 18, 0.45) 0%, transparent 60%)',
                  }}
                />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem' }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--rich-black)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '0.28rem 0.75rem',
                      borderRadius: '999px',
                      border: '1px solid rgba(17, 20, 18, 0.08)',
                    }}
                  >
                    {article.category}
                  </span>
                </div>
              </div>

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
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
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    marginBottom: '0.85rem',
                    color: 'var(--rich-black)',
                    lineHeight: 1.35,
                  }}
                >
                  {article.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#55504A', lineHeight: 1.65, marginBottom: '1.5rem', flex: 1 }}>
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
                      gap: '0.5rem',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Read Full Story</span>
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press Desk Inquiries */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button
            onClick={() => onNavigate('contact')}
            className="btn-primary-green"
            style={{ padding: '0.85rem 2.2rem' }}
          >
            Media &amp; Press Interview Requests
          </button>
        </div>
      </div>
    </div>
  );
};
