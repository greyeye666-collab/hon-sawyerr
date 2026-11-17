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
  initialCategory?: string;
}

const CATEGORY_META: Record<string, { title: string; subtitle: string; tag: string }> = {
  All: {
    title: 'Complete Visual Archive of Service',
    subtitle: 'Comprehensive photographic records covering education, community empowerment, infrastructure, healthcare, cultural heritage, and parliamentary representation across Agona East.',
    tag: 'All Field Records',
  },
  Community: {
    title: 'Women Economic Empowerment & Grassroots Development',
    subtitle: 'Empowering market women with seed capital grants, agro-processing equipment, and community durbars across Agona Duakwa, Nsaba, Kwanyako, and beyond.',
    tag: 'Impact Focus Area',
  },
  Education: {
    title: 'Educational Advancement & BECE Candidate Support',
    subtitle: 'Comprehensive annual mock examinations, distribution of stationery, mathematical sets, student meals, and educational infrastructure in Agona East.',
    tag: 'Impact Focus Area',
  },
  Infrastructure: {
    title: 'Clean Water Systems & Rural Feeder Road Upgrades',
    subtitle: 'Solar-powered mechanized boreholes delivering potable drinking water, coupled with farm-to-market feeder road rehabilitation and culvert works.',
    tag: 'Impact Focus Area',
  },
  Healthcare: {
    title: 'Rural Maternal Healthcare & CHPS Modernization',
    subtitle: 'Refurbished maternity blocks, vital medical supplies, and maternal health outreach ensuring safe delivery and quality rural care.',
    tag: 'Impact Focus Area',
  },
  Festivals: {
    title: 'Akwambo Festival Celebrations & Cultural Heritage',
    subtitle: 'Traditional durbars, festive pageantry, royal courtesies, and community solidarity during the annual Akwambo celebrations.',
    tag: 'Cultural Heritage',
  },
  Parliament: {
    title: 'Parliamentary Advocacy & State Representation',
    subtitle: 'Legislative debates, committee scrutiny, national policy advocacy, and official engagements representing the constituents of Agona East.',
    tag: 'Legislative Record',
  },
};

export const DedicatedGalleryPage: React.FC<DedicatedGalleryPageProps> = ({
  onBack,
  onNavigate,
  initialCategory = 'All',
}) => {
  const { galleryItems } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    'All',
    'Community',
    'Education',
    'Infrastructure',
    'Healthcare',
    'Festivals',
    'Parliament',
  ];

  const getItemCount = (cat: string) => {
    if (cat === 'All') return galleryItems.length;
    return galleryItems.filter((item) => item.category === cat).length;
  };

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
            marginBottom: '2rem',
          }}
        >
          {categories.map((cat) => {
            const count = getItemCount(cat);
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  backgroundColor: isSelected ? '#006B3F' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#4A4643',
                  borderColor: isSelected ? '#006B3F' : 'var(--border-light)',
                  boxShadow: isSelected ? '0 4px 14px rgba(0, 107, 63, 0.25)' : 'none',
                  transition: 'var(--transition-smooth)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{cat}</span>
                <span
                  style={{
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.25)' : '#F1EFE8',
                    color: isSelected ? '#FFFFFF' : '#6B655F',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '999px',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Topic Header Card */}
        {CATEGORY_META[selectedCategory] && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-light)',
              padding: '1.75rem 2rem',
              marginBottom: '2.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="pill-category" style={{ backgroundColor: '#006B3F', color: '#FFFFFF' }}>
                  {CATEGORY_META[selectedCategory].tag}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#C5A059', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {filteredItems.length} Photographs Documented
                </span>
              </div>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--ndc-green)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  View All ({galleryItems.length})
                </button>
              )}
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: '0.35rem 0 0.15rem 0',
              }}
            >
              {CATEGORY_META[selectedCategory].title}
            </h2>
            <p
              style={{
                fontSize: '0.98rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '900px',
              }}
            >
              {CATEGORY_META[selectedCategory].subtitle}
            </p>
          </div>
        )}

        {/* Masonry / Photo Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
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
