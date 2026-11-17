import React, { useState, useEffect, useCallback } from 'react';
import type { GalleryItem, PageView } from '../types';
import { useSiteData } from '../hooks/useSiteData';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  MaximizeIcon,
  MapPinIcon,
  CalendarIcon,
} from './Icons';

interface DedicatedGalleryPageProps {
  onBack: () => void;
  onNavigate: (page: PageView) => void;
}

export const DedicatedGalleryPage: React.FC<DedicatedGalleryPageProps> = ({ onBack, onNavigate }) => {
  const { galleryItems } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Community', 'Education', 'Parliament', 'Healthcare', 'Festivals'];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const handleNext = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  }, [activeItem, filteredItems]);

  const handlePrev = useCallback(() => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  }, [activeItem, filteredItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'Escape') setActiveItem(null);
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, handleNext, handlePrev]);

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

          <span className="pill-category">Visual Archive</span>
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
                Photographic Record of Service
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
              Agona East Community &amp; Leadership Gallery
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              Relive the grassroots journeys, durbars, classroom visits, healthcare deliveries, and traditional celebrations
              alongside the good people of Agona East.
            </p>

            <div className="ndc-accent-ribbon" style={{ maxWidth: '140px', height: '4px' }}>
              <div className="ribbon-green" />
              <div className="ribbon-gold" />
              <div className="ribbon-red" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="container-custom" style={{ marginTop: '3.5rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '999px',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                backgroundColor: selectedCategory === cat ? '#006B3F' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : '#4A4643',
                borderColor: selectedCategory === cat ? '#006B3F' : 'var(--border-light)',
                boxShadow: selectedCategory === cat ? '0 4px 14px rgba(0, 107, 63, 0.25)' : 'none',
                transition: 'var(--transition-smooth)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Photo Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                height: '320px',
                position: 'relative',
                backgroundColor: '#111111',
              }}
              className="img-zoom-container"
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.15) 0%, rgba(17, 17, 17, 0.88) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.category}
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaximizeIcon size={16} />
                  </div>
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      marginBottom: '0.35rem',
                      color: '#FFFFFF',
                    }}
                  >
                    {item.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    <span>{item.location}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Media Coverage / Contact Link */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button
            onClick={() => onNavigate('contact')}
            className="btn-primary-green"
            style={{ padding: '0.85rem 2.2rem' }}
          >
            Request Event Coverage or Submit Community Photos
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="lightbox-backdrop" onClick={() => setActiveItem(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '960px',
              width: '100%',
              backgroundColor: '#141414',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
                }}
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div
              style={{
                position: 'relative',
                maxHeight: '65vh',
                backgroundColor: '#0A0A0A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={activeItem.image}
                alt={activeItem.title}
                style={{ width: '100%', height: 'auto', maxHeight: '65vh', objectFit: 'contain' }}
              />

              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(17, 17, 17, 0.75)',
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
                  backgroundColor: 'rgba(17, 17, 17, 0.75)',
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
              >
                <ArrowRightIcon size={20} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#141414', color: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: '#FFFFFF', marginBottom: '0.4rem' }}>
                {activeItem.title}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', margin: '0 0 0.85rem 0' }}>
                {activeItem.caption}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.8rem', color: '#C5A059' }}>
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
    </div>
  );
};
