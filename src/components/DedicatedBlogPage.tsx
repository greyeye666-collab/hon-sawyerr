import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { BlogPost, PageView } from '../types';
import { BLOG_POSTS, MP_DETAILS } from '../data/mockData';
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ClockIcon, BookIcon, SparklesIcon } from './Icons';

interface DedicatedBlogPageProps {
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  onNavigate: (page: PageView) => void;
}

const APPLE_SPRING = { type: 'spring' as const, bounce: 0, duration: 0.38 };

export const DedicatedBlogPage: React.FC<DedicatedBlogPageProps> = ({
  onBack,
  onSelectPost,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Education & Youth',
    'Legislative Insights',
    'Women Empowerment',
    'Rural Development',
    'Community Reflections',
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-cream)' }}>
      {/* Editorial Header / Masthead */}
      <section
        style={{
          backgroundColor: '#0F1813',
          color: '#FFFFFF',
          paddingTop: 'clamp(5.5rem, 8vw, 7.5rem)',
          paddingBottom: 'clamp(4rem, 6vw, 5.5rem)',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0, 122, 67, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={onBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: '#C2C9C4',
                fontSize: '0.86rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem 0',
                transition: 'color 180ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#C2C9C4')}
            >
              <ArrowLeftIcon size={14} />
              <span>Return Home</span>
            </button>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>/</span>
            <button
              onClick={() => onNavigate('about')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#C2C9C4',
                fontSize: '0.86rem',
                cursor: 'pointer',
                padding: '0.25rem 0',
                transition: 'color 180ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#C2C9C4')}
            >
              About the MP
            </button>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>/</span>
            <span style={{ color: '#F3E5C2', fontSize: '0.86rem', fontWeight: 600 }}>The MP\'s Notebook</span>
          </div>

          <div style={{ maxWidth: '820px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                backgroundColor: 'rgba(0, 122, 67, 0.28)',
                border: '1px solid rgba(0, 122, 67, 0.45)',
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                marginBottom: '1.25rem',
              }}
            >
              <BookIcon size={14} className="text-[#F3E5C2]" />
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F3E5C2', fontWeight: 600 }}>
                Official Parliamentary &amp; Grassroots Essays
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.14,
                letterSpacing: '-0.025em',
                marginBottom: '1.25rem',
              }}
            >
              The MP\'s Notebook &amp; Dispatches
            </h1>

            <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)', color: '#C2CBC5', lineHeight: 1.68, maxWidth: '680px' }}>
              Personal reflections, policy deliberations, and frontline field accounts from Agona East by Hon. Queenstar Maame Pokua Sawyerr.
            </p>

            {/* Tri-Color Restrained Ribbon */}
            <div className="ndc-accent-ribbon" style={{ marginTop: '1.75rem' }}>
              <div className="ribbon-green" />
              <div className="ribbon-gold" />
              <div className="ribbon-red" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container-custom" style={{ paddingTop: 'clamp(3rem, 5vw, 4.5rem)', paddingBottom: 'clamp(4.5rem, 7vw, 6.5rem)' }}>
        {/* Search & Category Filter Navigation */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '2rem',
          }}
        >
          {/* Search Bar */}
          <div style={{ maxWidth: '480px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search essays, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                borderRadius: '999px',
                border: '1px solid var(--border-light)',
                backgroundColor: '#FFFFFF',
                fontSize: '0.94rem',
                color: 'var(--rich-black)',
                outline: 'none',
                boxShadow: 'var(--shadow-sm)',
                transition: 'border-color 180ms ease, box-shadow 180ms ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--ndc-green)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 122, 67, 0.12)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.82rem',
                  color: 'var(--muted-gray)',
                  cursor: 'pointer',
                  padding: '0.2rem',
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Segmented Category Pill Strip */}
          <div
            role="tablist"
            aria-label="Filter blog posts by category"
            style={{
              display: 'flex',
              gap: '0.45rem',
              flexWrap: 'wrap',
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    position: 'relative',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.52rem 1.15rem',
                    minHeight: '38px',
                    borderRadius: '999px',
                    fontSize: '0.84rem',
                    fontWeight: isSelected ? 600 : 500,
                    backgroundColor: isSelected ? 'var(--ndc-green)' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#47514B',
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: isSelected ? 'var(--ndc-green)' : 'var(--border-light)',
                    boxShadow: isSelected ? '0 4px 12px rgba(0, 122, 67, 0.22)' : 'var(--shadow-sm)',
                    transition: 'all 180ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  onPointerDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
                  onPointerUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  onPointerLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Editorial Cover Story (when All categories selected and no search) */}
        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={APPLE_SPRING}
            onClick={() => onSelectPost(featuredPost)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid rgba(17, 20, 18, 0.09)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              marginBottom: '3.5rem',
              cursor: 'pointer',
              transition: 'transform 240ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1), border-color 240ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'rgba(0, 122, 67, 0.28)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(17, 20, 18, 0.09)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            <div style={{ minHeight: '380px', position: 'relative', overflow: 'hidden' }}>
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 400ms ease-out',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 24, 19, 0.7) 0%, transparent 60%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    backgroundColor: 'rgba(214, 31, 51, 0.95)',
                    color: '#FFFFFF',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <SparklesIcon size={12} />
                  <span>Featured Editorial</span>
                </span>
              </div>
            </div>

            <div style={{ padding: 'clamp(2rem, 4vw, 3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--ndc-green)',
                  }}
                >
                  {featuredPost.category}
                </span>
                <span style={{ color: 'var(--border-light)' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted-gray)', fontSize: '0.82rem' }}>
                  <CalendarIcon size={13} />
                  <span>{featuredPost.publishDate}</span>
                </div>
                <span style={{ color: 'var(--border-light)' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--muted-gray)', fontSize: '0.82rem' }}>
                  <ClockIcon size={13} />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.15rem)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  color: 'var(--rich-black)',
                  lineHeight: 1.24,
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {featuredPost.title}
              </h2>

              <p style={{ fontSize: '1.02rem', color: '#4B534E', lineHeight: 1.7, marginBottom: '1.65rem' }}>
                {featuredPost.excerpt}
              </p>

              {/* Author signature line */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-light)',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={featuredPost.author.avatar || MP_DETAILS.portraitAbout}
                    alt={featuredPost.author.name}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid var(--ndc-green)',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--rich-black)' }}>
                      {featuredPost.author.name}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--muted-gray)' }}>
                      {featuredPost.author.role}
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: 'var(--ndc-green)',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                  }}
                >
                  <span>Read Full Essay</span>
                  <ArrowRightIcon size={15} />
                </span>
              </div>
            </div>
          </motion.article>
        )}

        {/* Editorial Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
            }}
          >
            <div style={{ margin: '0 auto 1rem', display: 'flex', justifyContent: 'center' }}>
              <BookIcon size={36} className="text-[#636C67]" />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--rich-black)', marginBottom: '0.5rem' }}>
              No essays match your query
            </h3>
            <p style={{ color: 'var(--muted-gray)', fontSize: '0.94rem', marginBottom: '1.5rem' }}>
              Try adjusting your search terms or selecting a different category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="btn-primary-green"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2.25rem',
            }}
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={APPLE_SPRING}
                onClick={() => onSelectPost(post)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid rgba(17, 20, 18, 0.08)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(0, 122, 67, 0.22)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(17, 20, 18, 0.08)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                {/* Image */}
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 320ms ease-out',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--rich-black)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '999px',
                        border: '1px solid rgba(17, 20, 18, 0.06)',
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Metadata line */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem', color: 'var(--muted-gray)', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <CalendarIcon size={12} />
                      <span>{post.publishDate}</span>
                    </div>
                    <span>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <ClockIcon size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      color: 'var(--rich-black)',
                      lineHeight: 1.32,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: '#515B55',
                      lineHeight: 1.65,
                      marginBottom: '1.4rem',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--ndc-green-dark)',
                          backgroundColor: 'rgba(0, 122, 67, 0.07)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read Article link */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--border-light)',
                    }}
                  >
                    <span style={{ fontSize: '0.82rem', color: 'var(--muted-gray)' }}>
                      By {post.author.name.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: 'var(--ndc-green)',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                      }}
                    >
                      <span>Read Essay</span>
                      <ArrowRightIcon size={14} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Editorial Newsletter & Direct Dispatch Callout */}
        <section
          style={{
            marginTop: '5rem',
            backgroundColor: '#0F1813',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ maxWidth: '640px', position: 'relative', zIndex: 1 }}>
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#F3E5C2',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              Parliamentary Dispatches &amp; Civic Engagement
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                fontFamily: 'var(--font-serif)',
                color: '#FFFFFF',
                lineHeight: 1.2,
                marginBottom: '0.85rem',
              }}
            >
              Stay Connected to the Agona East Movement
            </h2>
            <p style={{ color: '#BAC4BD', fontSize: '1rem', lineHeight: 1.65, marginBottom: '2rem' }}>
              Receive direct updates from the Office of Hon. Queenstar Maame Pokua Sawyerr, including constituency development reports, community durbars, and parliamentary bills.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to the Agona East Parliamentary Dispatches.');
              }}
              style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                style={{
                  flex: '1 1 280px',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  fontSize: '0.94rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="btn-primary-green"
                style={{ padding: '0.85rem 1.8rem', fontSize: '0.92rem' }}
              >
                <span>Subscribe</span>
                <ArrowRightIcon size={14} />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
