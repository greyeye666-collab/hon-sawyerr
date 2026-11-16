import React, { useState, useEffect } from 'react';
import type { GalleryItem, PageView } from '../types';
import { GALLERY_ITEMS } from '../data/mockData';
import {
  CloseIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  MaximizeIcon,
  MapPinIcon,
  CalendarIcon,
} from './Icons';

interface GallerySectionProps {
  onNavigate: (page: PageView) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Education', 'Community', 'Parliament', 'Healthcare', 'Festivals'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'Escape') {
        setActiveItem(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  };

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: 'var(--bg-warm-gray)',
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
        position: 'relative',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ width: '12px', height: '2px', backgroundColor: '#006B3F' }} />
            <span>Moments of Leadership &amp; Community</span>
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
            Gallery
          </h2>

          <p style={{ maxWidth: '620px', margin: '0.75rem auto 0', color: '#5C5751', fontSize: '1.05rem' }}>
            A photographic chronicle of grassroots engagements, school durbars, healthcare interventions, and traditional celebrations across Agona East.
          </p>

          <div className="ndc-accent-ribbon" style={{ margin: '1rem auto 0', maxWidth: '100px' }}>
            <div className="ribbon-green" />
            <div className="ribbon-gold" />
            <div className="ribbon-red" />
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap',
              marginTop: '2.5rem',
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.6rem 1.35rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    transition: 'var(--transition-smooth)',
                    backgroundColor: isSelected ? 'var(--ndc-green)' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#4A4643',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: isSelected ? 'var(--ndc-green)' : 'var(--border-light)',
                    boxShadow: isSelected ? '0 4px 14px rgba(0, 107, 63, 0.25)' : 'var(--shadow-sm)',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Refined Photo Grid with Soft Hover Effects */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                height: '290px',
                backgroundColor: '#1A1A1A',
                border: '1px solid var(--border-light)',
              }}
              className="gallery-card-item img-zoom-container"
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Soft Dark Overlay on Hover with Clean Typography */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.05) 0%, rgba(17, 17, 17, 0.88) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  color: '#FFFFFF',
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.category}
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaximizeIcon size={16} />
                  </div>
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      marginBottom: '0.35rem',
                      color: '#FFFFFF',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.78rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    <span>{item.location}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Dedicated Gallery Page CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.75rem' }}>
          <button
            onClick={() => {
              onNavigate('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-outline-green"
            style={{ padding: '0.9rem 2.4rem' }}
          >
            <span>Open Dedicated Media Archive</span>
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {activeItem && (
        <div
          className="lightbox-backdrop"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '920px',
              width: '100%',
              backgroundColor: '#141414',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Top Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="pill-category">{activeItem.category}</span>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  {filteredItems.findIndex((i) => i.id === activeItem.id) + 1} of {filteredItems.length}
                </span>
              </div>

              <button
                onClick={() => setActiveItem(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  color: '#FFFFFF',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                aria-label="Close Lightbox"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            {/* Modal Image Display */}
            <div
              style={{
                position: 'relative',
                maxHeight: '65vh',
                backgroundColor: '#0A0A0A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={activeItem.image}
                alt={activeItem.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />

              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(17, 17, 17, 0.8)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                aria-label="Previous image"
              >
                <ArrowLeftIcon size={20} />
              </button>

              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(17, 17, 17, 0.8)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                aria-label="Next image"
              >
                <ArrowRightIcon size={20} />
              </button>
            </div>

            {/* Modal Footer Caption */}
            <div style={{ padding: '1.5rem', backgroundColor: '#141414', color: '#FFFFFF' }}>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  marginBottom: '0.4rem',
                  color: '#FFFFFF',
                }}
              >
                {activeItem.title}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', margin: '0 0 0.85rem 0' }}>
                {activeItem.caption}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.8rem', color: '#E7D5B0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPinIcon size={14} />
                  <span>{activeItem.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CalendarIcon size={14} />
                  <span>{activeItem.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
