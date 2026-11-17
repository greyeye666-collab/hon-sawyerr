import React, { useState } from 'react';
import type { NewsArticle, PageView } from '../types';
import { useSiteData } from '../hooks/useSiteData';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  QuoteIcon,
  ShareIcon,
  FacebookIcon,
  TwitterIcon,
  CheckIcon,
} from './Icons';

interface ArticleDetailPageProps {
  article: NewsArticle;
  onBack: () => void;
  onSelectArticle: (a: NewsArticle) => void;
  onNavigate: (page: PageView) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onBack,
  onSelectArticle,
  onNavigate,
}) => {
  const { newsArticles } = useSiteData();
  const [copied, setCopied] = useState(false);

  const relatedArticles = newsArticles.filter((a) => a.id !== article.id).slice(0, 3);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-cream)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Top Banner Navigation Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-light)',
          padding: '1rem 0',
        }}
      >
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
            <span>Back to All Updates</span>
          </button>

          <span className="pill-category">{article.category}</span>
        </div>
      </div>

      {/* Article Header Container */}
      <div className="container-custom" style={{ paddingTop: '3.5rem', maxWidth: '900px' }}>
        {/* Meta badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#77726C', fontSize: '0.85rem' }}>
            <CalendarIcon size={15} className="text-[#006B3F]" />
            <span>{article.date}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#77726C', fontSize: '0.85rem' }}>
            <ClockIcon size={15} className="text-[#006B3F]" />
            <span>{article.readTime}</span>
          </div>
          <span style={{ color: '#C5A059', fontWeight: 600, fontSize: '0.85rem' }}>
            By {article.author}
          </span>
        </div>

        {/* Article Title */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 800,
            lineHeight: 1.25,
            color: 'var(--rich-black)',
            marginBottom: '1.5rem',
          }}
        >
          {article.title}
        </h1>

        <div className="ndc-accent-ribbon" style={{ maxWidth: '120px', height: '4px', marginBottom: '2.5rem' }}>
          <div className="ribbon-green" />
          <div className="ribbon-gold" />
          <div className="ribbon-red" />
        </div>

        {/* Hero Featured Photo */}
        <div
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            border: '4px solid #FFFFFF',
            backgroundColor: '#FFFFFF',
            marginBottom: '3rem',
          }}
        >
          <img
            src={article.thumbnail}
            alt={article.title}
            style={{ width: '100%', height: 'auto', maxHeight: '520px', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ padding: '0.85rem 1.5rem', fontSize: '0.82rem', color: '#88827C', fontStyle: 'italic', backgroundColor: '#FFFFFF' }}>
            Official Press Coverage • Hon. Queenstar Maame Pokua Sawyerr in Agona East
          </div>
        </div>

        {/* Main Article Body Text */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
          }}
        >
          {article.content.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p
                style={{
                  fontSize: '1.15rem',
                  lineHeight: 1.85,
                  color: '#383431',
                  margin: 0,
                }}
              >
                {paragraph}
              </p>

              {/* Injected Pull-Quote at paragraph 2 */}
              {index === 1 && (
                <div
                  style={{
                    margin: '1.5rem 0',
                    padding: '2rem',
                    backgroundColor: 'rgba(0, 107, 63, 0.04)',
                    borderLeft: '4px solid var(--ndc-green)',
                    borderRadius: '0 16px 16px 0',
                  }}
                >
                  <QuoteIcon size={30} className="text-[#C5A059]" />
                  <blockquote
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontStyle: 'italic',
                      color: 'var(--rich-black)',
                      lineHeight: 1.6,
                      margin: '0.5rem 0 0 0',
                    }}
                  >
                    &quot;Our priority has always been to build people first—empowering the student, the farmer, and the mother.&quot;
                  </blockquote>
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Tags */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#88827C', textTransform: 'uppercase' }}>
                Tags:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: 'var(--bg-cream)',
                    color: 'var(--ndc-green)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(0, 107, 63, 0.15)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Social Share Bar */}
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              backgroundColor: 'var(--bg-cream)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem' }}>
              <ShareIcon size={18} className="text-[#006B3F]" />
              <span>Share This Story</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleCopyLink}
                className="btn-subtle"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
              >
                {copied ? <CheckIcon size={16} className="text-[#006B3F]" /> : null}
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-subtle"
                style={{ padding: '0.45rem 0.85rem' }}
                aria-label="Share on X"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-subtle"
                style={{ padding: '0.45rem 0.85rem' }}
                aria-label="Share on Facebook"
              >
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        <div style={{ marginTop: '4rem' }}>
          <h2
            style={{
              fontSize: '1.65rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--rich-black)',
              marginBottom: '1.5rem',
            }}
          >
            Related Updates from Agona East
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                className="luxury-card"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onSelectArticle(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="img-zoom-container" style={{ height: '160px' }}>
                  <img src={rel.thumbnail} alt={rel.title} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#88827C', marginBottom: '0.35rem' }}>
                    {rel.date}
                  </div>
                  <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', lineHeight: 1.35, margin: 0 }}>
                    {rel.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => onNavigate('news')}
              className="btn-outline-gold"
              style={{ padding: '0.8rem 2rem' }}
            >
              Browse All Press Releases &amp; News
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
