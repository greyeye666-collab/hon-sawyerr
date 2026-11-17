import React, { useState } from 'react';
import type { BlogPost, PageView } from '../types';
import { useSiteData } from '../hooks/useSiteData';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  ShareIcon,
  CheckIcon,
  BookIcon,
} from './Icons';

interface BlogDetailPageProps {
  post: BlogPost;
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  onNavigate: (page: PageView) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  post,
  onBack,
  onSelectPost,
  onNavigate,
}) => {
  const { blogPosts, mpDetails } = useSiteData();
  const [copied, setCopied] = useState(false);

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const shareText = encodeURIComponent(`${post.title} — By ${post.author.name}`);
  const currentUrl = encodeURIComponent(window.location.href);

  return (
    <article style={{ minHeight: '100vh', backgroundColor: 'var(--bg-cream)' }}>
      {/* Top Reading Navigation Bar */}
      <div
        style={{
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: '#FFFFFF',
          padding: '1rem 0',
          position: 'sticky',
          top: '72px',
          zIndex: 30,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="container-custom"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <button
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--rich-black)',
              fontWeight: 600,
              fontSize: '0.88rem',
              padding: '0.35rem 0.6rem',
              borderRadius: '8px',
              transition: 'color 180ms ease, background-color 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--ndc-green)';
              e.currentTarget.style.backgroundColor = 'rgba(0, 122, 67, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--rich-black)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <ArrowLeftIcon size={16} />
            <span>Return to Dispatches &amp; Blog</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--muted-gray)' }}>
              Share Dispatch:
            </span>
            <button
              onClick={handleCopyLink}
              title="Copy page link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: copied ? 'rgba(0, 122, 67, 0.12)' : 'var(--bg-warm-gray)',
                border: '1px solid var(--border-light)',
                borderRadius: '999px',
                padding: '0.35rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: copied ? 'var(--ndc-green-dark)' : 'var(--rich-black)',
                cursor: 'pointer',
                transition: 'all 160ms ease',
              }}
            >
              {copied ? <CheckIcon size={13} /> : <ShareIcon size={13} />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Article Header */}
      <header
        style={{
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(2rem, 4vw, 3rem)',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div className="container-custom" style={{ maxWidth: '840px' }}>
          {/* Category & Meta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ndc-green)',
                backgroundColor: 'rgba(0, 122, 67, 0.08)',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
              }}
            >
              {post.category}
            </span>
            <span style={{ color: 'var(--border-light)' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted-gray)', fontSize: '0.84rem' }}>
              <CalendarIcon size={13} />
              <span>{post.publishDate}</span>
            </div>
            <span style={{ color: 'var(--border-light)' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted-gray)', fontSize: '0.84rem' }}>
              <ClockIcon size={13} />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              color: 'var(--rich-black)',
              lineHeight: 1.18,
              letterSpacing: '-0.024em',
              marginBottom: '1.5rem',
            }}
          >
            {post.title}
          </h1>

          {/* Excerpt Lead */}
          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.25rem)',
              color: '#3A423D',
              lineHeight: 1.65,
              marginBottom: '2rem',
              fontWeight: 400,
            }}
          >
            {post.excerpt}
          </p>

          {/* Author Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-light)',
            }}
          >
            <img
              src={post.author.avatar || mpDetails.portraitAbout}
              alt={post.author.name}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--ndc-green)',
              }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--rich-black)' }}>
                {post.author.name}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted-gray)' }}>
                {post.author.role}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Cover Media */}
      <div className="container-custom" style={{ maxWidth: '980px', marginTop: '2.5rem', marginBottom: '3rem' }}>
        <div
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-light)',
            position: 'relative',
          }}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            style={{
              width: '100%',
              maxHeight: '520px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div
            style={{
              padding: '0.85rem 1.25rem',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid var(--border-light)',
              fontSize: '0.78rem',
              color: 'var(--muted-gray)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <span>Photo Archive: Office of the MP for Agona East</span>
            <span style={{ fontWeight: 600, color: 'var(--ndc-green-dark)' }}>{post.category}</span>
          </div>
        </div>
      </div>

      {/* Main Editorial Text Measure */}
      <div className="container-custom" style={{ maxWidth: '780px', paddingBottom: '5rem' }}>
        {/* Pull Quote Box */}
        {post.featuredQuote && (
          <aside
            style={{
              backgroundColor: '#FFFFFF',
              borderLeft: '4px solid var(--ndc-green)',
              padding: '1.75rem 2rem',
              borderRadius: '0 16px 16px 0',
              marginBottom: '2.75rem',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                color: 'var(--rich-black)',
                lineHeight: 1.58,
                marginBottom: '0.75rem',
              }}
            >
              &ldquo;{post.featuredQuote}&rdquo;
            </p>
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--ndc-green-dark)' }}>
              — {post.author.name}
            </div>
          </aside>
        )}

        {/* Editorial Paragraphs with Dropcap on Paragraph 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.65rem' }}>
          {post.content.map((paragraph, index) => {
            if (index === 0) {
              const firstLetter = paragraph.charAt(0);
              const restOfParagraph = paragraph.slice(1);
              return (
                <p
                  key={index}
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.82,
                    color: '#2E3530',
                  }}
                >
                  <span
                    style={{
                      float: 'left',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '3.6rem',
                      lineHeight: '0.8',
                      paddingTop: '4px',
                      paddingRight: '12px',
                      paddingBottom: '2px',
                      color: 'var(--ndc-green)',
                      fontWeight: 700,
                    }}
                  >
                    {firstLetter}
                  </span>
                  {restOfParagraph}
                </p>
              );
            }

            return (
              <p
                key={index}
                style={{
                  fontSize: '1.08rem',
                  lineHeight: 1.82,
                  color: '#2E3530',
                }}
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Article Tags */}
        <div
          style={{
            marginTop: '3rem',
            paddingTop: '1.75rem',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted-gray)', marginRight: '0.5rem' }}>
            Topics:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.78rem',
                color: 'var(--rich-black)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-light)',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Social Share Bar */}
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShareIcon size={16} className="text-[#007A43]" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--rich-black)' }}>
              Share this parliamentary dispatch
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#FFFFFF',
                backgroundColor: '#1DA1F2',
                textDecoration: 'none',
              }}
            >
              X (Twitter)
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#FFFFFF',
                backgroundColor: '#1877F2',
                textDecoration: 'none',
              }}
            >
              Facebook
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#FFFFFF',
                backgroundColor: '#25D366',
                textDecoration: 'none',
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Author In-Depth Bio Card */}
        <div
          style={{
            marginTop: '3.5rem',
            padding: '2.25rem',
            backgroundColor: '#0F1813',
            color: '#FFFFFF',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1.75rem',
            flexWrap: 'wrap',
          }}
        >
          <img
            src={post.author.avatar || mpDetails.portraitAbout}
            alt={post.author.name}
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2.5px solid var(--gold-accent)',
            }}
          />
          <div style={{ flex: '1 1 280px' }}>
            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F3E5C2', marginBottom: '0.25rem' }}>
              About the Author
            </div>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: '#FFFFFF', marginBottom: '0.45rem' }}>
              {post.author.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#C2CBC5', lineHeight: 1.6, marginBottom: '1rem' }}>
              Member of Parliament for Agona East (NDC Caucus) and former Deputy Central Regional Minister. Passionate grassroots advocate for education, maternal healthcare, and women’s economic emancipation.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('about')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#F3E5C2',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                Read Official Biography →
              </button>
              <button
                onClick={() => onNavigate('contact')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                Constituency Secretariat Office →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Essays Carousel / Grid */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '4rem',
          paddingBottom: '5rem',
        }}
      >
        <div className="container-custom">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-tag">
                <BookIcon size={14} className="text-[#007A43]" />
                <span>Continued Reading</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontFamily: 'var(--font-serif)', color: 'var(--rich-black)' }}>
                More from the MP&apos;s Notebook
              </h2>
            </div>

            <button
              onClick={onBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: 'var(--ndc-green)',
                fontWeight: 600,
                fontSize: '0.92rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span>View All Essays</span>
              <ArrowRightIcon size={14} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '2rem',
            }}
          >
            {relatedPosts.map((related) => (
              <div
                key={related.id}
                onClick={() => {
                  onSelectPost(related);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  backgroundColor: 'var(--bg-cream)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(0, 122, 67, 0.25)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img
                    src={related.coverImage}
                    alt={related.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--ndc-green)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {related.category}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', color: 'var(--rich-black)', lineHeight: 1.35, marginBottom: '0.65rem' }}>
                    {related.title}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#525B55', lineHeight: 1.6, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {related.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--muted-gray)' }}>{related.readTime}</span>
                    <span style={{ color: 'var(--ndc-green)', fontSize: '0.84rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span>Read</span>
                      <ArrowRightIcon size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};
