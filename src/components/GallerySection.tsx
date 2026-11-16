import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
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

function project(initialVelocityPxPerSec: number, decelerationRate = 0.996): number {
  return ((initialVelocityPxPerSec / 1000) * decelerationRate) / (1 - decelerationRate);
}

function rubberband(overshoot: number, dimension = 320, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const sheetY = useMotionValue(0);
  const backdropOpacity = useTransform(sheetY, [0, 320], [1, 0.2]);
  const dragRef = useRef({
    active: false,
    startY: 0,
    startOffset: 0,
    samples: [] as Array<{ y: number; t: number }>,
  });

  const categories = ['All', 'Education', 'Community', 'Parliament', 'Healthcare', 'Festivals'];

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleNext = useCallback(() => {
    if (!activeItem || filteredItems.length === 0) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  }, [activeItem, filteredItems]);

  const handlePrev = useCallback(() => {
    if (!activeItem || filteredItems.length === 0) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  }, [activeItem, filteredItems]);

  useEffect(() => {
    if (!activeItem) return;
    sheetY.set(0);
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null);
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, handleNext, handlePrev, sheetY]);

  const handleSheetPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      startY: e.clientY,
      startOffset: sheetY.get(),
      samples: [{ y: e.clientY, t: performance.now() }],
    };
  };

  const handleSheetPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    const rawDelta = e.clientY - d.startY + d.startOffset;
    const nextY = rawDelta < 0 ? -rubberband(Math.abs(rawDelta)) : rawDelta;
    sheetY.set(nextY);

    d.samples.push({ y: e.clientY, t: performance.now() });
    if (d.samples.length > 5) d.samples.shift();
  };

  const handleSheetPointerRelease = () => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;

    let velocity = 0;
    if (d.samples.length >= 2) {
      const first = d.samples[0];
      const last = d.samples[d.samples.length - 1];
      const dt = (last.t - first.t) / 1000;
      if (dt > 0.005) velocity = (last.y - first.y) / dt;
    }

    const currentY = sheetY.get();
    const projected = currentY + project(velocity, 0.996);

    if (projected > 150 || (velocity > 420 && currentY > 24)) {
      animate(sheetY, 540, {
        type: 'spring',
        bounce: 0,
        duration: 0.32,
        velocity,
        onComplete: () => setActiveItem(null),
      });
    } else {
      animate(sheetY, 0, {
        type: 'spring',
        bounce: Math.abs(velocity) > 350 ? 0.14 : 0,
        duration: 0.36,
        velocity,
      });
    }
  };

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: 'var(--bg-warm-gray)',
        paddingTop: 'clamp(4.5rem, 7vw, 6.5rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 6.5rem)',
        position: 'relative',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.42 }}
          style={{ textAlign: 'center', marginBottom: '3.25rem' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ width: '12px', height: '2px', backgroundColor: 'var(--ndc-green)' }} />
            <span>Moments of Leadership &amp; Community</span>
            <span style={{ width: '12px', height: '2px', backgroundColor: 'var(--ndc-red)' }} />
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

          <p style={{ maxWidth: '620px', margin: '0.85rem auto 0', color: '#525A55', fontSize: '1.03rem' }}>
            A photographic chronicle of grassroots engagements, school durbars, healthcare interventions, and traditional celebrations across Agona East.
          </p>

          <div className="ndc-accent-ribbon" style={{ margin: '1.15rem auto 0' }}>
            <div className="ribbon-green" />
            <div className="ribbon-gold" />
            <div className="ribbon-red" />
          </div>

          {/* Apple Segmented Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter Gallery by Category"
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              gap: '0.35rem',
              flexWrap: 'wrap',
              marginTop: '2.25rem',
              padding: '0.38rem',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              borderRadius: '999px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
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
                    padding: '0.55rem 1.2rem',
                    minHeight: '40px',
                    borderRadius: '999px',
                    fontSize: '0.84rem',
                    fontWeight: isSelected ? 600 : 500,
                    backgroundColor: 'transparent',
                    color: isSelected ? '#FFFFFF' : '#434A46',
                    zIndex: 1,
                    transition: 'color 180ms ease, transform 100ms ease-out',
                  }}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="gallery-category-pill"
                      transition={{ type: 'spring', bounce: 0, duration: 0.34 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '999px',
                        backgroundColor: 'var(--ndc-green)',
                        boxShadow: '0 3px 10px rgba(0, 122, 67, 0.25)',
                        zIndex: -1,
                      }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.65rem',
          }}
        >
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.36 }}
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
                  background: 'linear-gradient(180deg, rgba(17, 17, 17, 0.04) 0%, rgba(17, 17, 17, 0.84) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.35rem',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      padding: '0.26rem 0.78rem',
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
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
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaximizeIcon size={15} />
                  </div>
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: '1.08rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      marginBottom: '0.32rem',
                      color: '#FFFFFF',
                      lineHeight: 1.28,
                    }}
                  >
                    {item.title}
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      fontSize: '0.78rem',
                      color: 'rgba(255, 255, 255, 0.78)',
                    }}
                  >
                    <span>{item.location}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={() => {
              onNavigate('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-outline-green"
          >
            <span>Open Dedicated Media Archive</span>
            <ArrowRightIcon size={17} />
          </button>
        </div>
      </div>

      {/* Apple 1:1 Pointer-Draggable Lightbox Sheet */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.22 }}
            style={{ opacity: prefersReducedMotion ? undefined : backdropOpacity }}
            onClick={() => setActiveItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.96 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.96 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.38 }}
              style={{
                y: sheetY,
                position: 'relative',
                maxWidth: '900px',
                width: '100%',
                backgroundColor: 'rgba(20, 22, 21, 0.94)',
                backdropFilter: 'blur(24px) saturate(180%)',
                borderRadius: '26px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                boxShadow: '0 32px 84px rgba(0, 0, 0, 0.72)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Drag Grabber Handle */}
              <div
                onPointerDown={handleSheetPointerDown}
                onPointerMove={handleSheetPointerMove}
                onPointerUp={handleSheetPointerRelease}
                onPointerCancel={handleSheetPointerRelease}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '0.65rem',
                  cursor: 'grab',
                  touchAction: 'none',
                }}
                title="Drag down to close"
              >
                <span
                  style={{
                    width: '40px',
                    height: '4.5px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.28)',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1.4rem 0.9rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="pill-category" style={{ backgroundColor: 'rgba(0, 158, 82, 0.22)', color: '#86EFAC' }}>
                    {activeItem.category}
                  </span>
                  <span style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {filteredItems.findIndex((i) => i.id === activeItem.id) + 1} of {filteredItems.length}
                  </span>
                </div>

                <button
                  onClick={() => setActiveItem(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: '50%',
                    color: '#FFFFFF',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Close Lightbox"
                >
                  <CloseIcon size={18} />
                </button>
              </div>

              <div
                style={{
                  position: 'relative',
                  maxHeight: '62vh',
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
                    maxHeight: '62vh',
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
                    backgroundColor: 'rgba(17, 17, 17, 0.72)',
                    backdropFilter: 'blur(12px)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
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
                  <ArrowLeftIcon size={19} />
                </button>

                <button
                  onClick={handleNext}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(17, 17, 17, 0.72)',
                    backdropFilter: 'blur(12px)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
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
                  <ArrowRightIcon size={19} />
                </button>
              </div>

              <div style={{ padding: '1.4rem 1.65rem', color: '#FFFFFF' }}>
                <h3
                  style={{
                    fontSize: '1.22rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    marginBottom: '0.35rem',
                    color: '#FFFFFF',
                  }}
                >
                  {activeItem.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.94rem', margin: '0 0 0.85rem 0' }}>
                  {activeItem.caption}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.8rem', color: '#F3E5C2' }}>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
