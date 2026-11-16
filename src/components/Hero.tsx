import React, { useState, useEffect, useRef } from 'react';
import type { PageView } from '../types';
import { ArrowRightIcon, ArrowLeftIcon, EyeIcon, EyeOffIcon } from './Icons';

// User provided images 1 to 15 & H2
import img1 from '../assets/hero-slider/1jpg.jpg';
import img2 from '../assets/hero-slider/2.jpg';
import img3 from '../assets/hero-slider/3.jpg';
import img4 from '../assets/hero-slider/4.jpg';
import img5 from '../assets/hero-slider/5.jpg';
import img6 from '../assets/hero-slider/6.jpg';
import img7 from '../assets/hero-slider/7.jpg';
import img8 from '../assets/hero-slider/8.jpg';
import img9 from '../assets/hero-slider/9.jpg';
import img10 from '../assets/hero-slider/10.jpg';
import img11 from '../assets/hero-slider/11.jpg';
import img12 from '../assets/hero-slider/12.jpg';
import img13 from '../assets/hero-slider/13.jpg';
import img14 from '../assets/hero-slider/14.jpg';
import img15 from '../assets/hero-slider/15.jpg';
import h2Img from '../assets/H2.jpg';

interface HeroProps {
  onNavigate: (page: PageView) => void;
  onExploreProjects: () => void;
}

interface HeroSlide {
  id: number;
  type: 'landscape' | 'paired-portrait';
  tag: string;
  badgeColor: 'green' | 'red';
  title: string;
  titleHighlight: string;
  description: string;
  landscapeImage?: string;
  portraitImages?: {
    src: string;
    caption: string;
  }[];
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onExploreProjects }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isCardMinimized, setIsCardMinimized] = useState(false);
  const slideTimerRef = useRef<number | null>(null);

  const slides: HeroSlide[] = [
    // Slide 1: Single Landscape (Grand Community Gathering)
    {
      id: 1,
      type: 'landscape',
      tag: 'Leadership with the People',
      badgeColor: 'green',
      title: 'Leadership with Integrity.',
      titleHighlight: 'Service with Impact.',
      description:
        'Serving the good people of Agona East with steadfast compassion, educational empowerment, and sustainable community development.',
      landscapeImage: img1,
    },
    // Slide 2: Paired 2 Portraits Side by Side (50% / 50%)
    {
      id: 2,
      type: 'paired-portrait',
      tag: 'Servant Leadership & Passion',
      badgeColor: 'red',
      title: 'Mama Pokua: A Mother for All,',
      titleHighlight: 'A Champion for the Youth.',
      description:
        'Affectionately called "Mama Pokua", Hon. Sawyerr is renowned across the Central Region for putting the people first in every legislative decision.',
      portraitImages: [
        { src: img2, caption: 'Grassroots Warmth' },
        { src: img3, caption: 'Mama Pokua in Agona East' },
      ],
    },
    // Slide 3: Single Landscape (Project Commissioning & Delivery)
    {
      id: 3,
      type: 'landscape',
      tag: 'Transforming Communities',
      badgeColor: 'green',
      title: 'Delivering Tangible Progress',
      titleHighlight: 'Across Agona East.',
      description:
        'From clean mechanized water boreholes to maternal health clinics and school infrastructure, delivering real development to every village.',
      landscapeImage: img4,
    },
    // Slide 4: Paired 3 Portraits Side by Side (33.3% / 33.3% / 33.3%)
    {
      id: 4,
      type: 'paired-portrait',
      tag: 'Women & Grassroots Economy',
      badgeColor: 'green',
      title: 'Empowering Mothers & Traders',
      titleHighlight: 'with Economic Dignity.',
      description:
        'Disbursing revolving seed grants and processing equipment to thousands of market women and farming cooperatives across Agona East.',
      portraitImages: [
        { src: img5, caption: 'Market Women Support' },
        { src: img6, caption: 'Grassroots Engagement' },
        { src: img7, caption: 'Economic Independence' },
      ],
    },
    // Slide 5: Single Landscape (Students & Youth Orientation)
    {
      id: 5,
      type: 'landscape',
      tag: 'Education for Every Child',
      badgeColor: 'red',
      title: 'Securing the Next Generation',
      titleHighlight: 'Through Education.',
      description:
        'Over 35,000 candidates supplied with free mathematical sets and hot nutritious lunch packages during BECE examinations across 42 schools.',
      landscapeImage: img8,
    },
    // Slide 6: Paired 3 Portraits Side by Side (33.3% / 33.3% / 33.3%)
    {
      id: 6,
      type: 'paired-portrait',
      tag: 'Parliamentary Stewardship',
      badgeColor: 'green',
      title: 'A Fierce Voice in the',
      titleHighlight: 'Parliament of Ghana.',
      description:
        'Championing rural health subventions, road maintenance, and youth employment on the floor of the 8th Parliament with integrity.',
      portraitImages: [
        { src: img9, caption: 'Parliamentary Caucus' },
        { src: img10, caption: 'Legislative Leadership' },
        { src: img11, caption: 'Public Accountability' },
      ],
    },
    // Slide 7: Paired 3 Portraits Side by Side (33.3% / 33.3% / 33.3%)
    {
      id: 7,
      type: 'paired-portrait',
      tag: 'Agona East Forward',
      badgeColor: 'red',
      title: 'United in Strength.',
      titleHighlight: 'Focused on Progress.',
      description:
        'Building a resilient, inclusive, and prosperous constituency through unity, mutual respect, and active civic participation.',
      portraitImages: [
        { src: img12, caption: 'Community Durbar' },
        { src: img13, caption: 'Cultural Heritage' },
        { src: img14, caption: 'Youth & Artisans' },
      ],
    },
    // Slide 8: Paired 2 Portraits Side by Side (50% / 50%)
    {
      id: 8,
      type: 'paired-portrait',
      tag: 'Grassroots Resilience',
      badgeColor: 'green',
      title: 'A Mother to All.',
      titleHighlight: 'A Pillar of Agona East.',
      description:
        'Standing firmly beside market women, farmers, students, and traditional leaders with unwavering compassion and accessible leadership.',
      portraitImages: [
        { src: img15, caption: 'Mama Pokua with Constituents' },
        { src: h2Img, caption: 'Servant of Agona East' },
      ],
    },
  ];

  // Smooth automatic slider: slides slowly and smoothly every 7 seconds (not too fast)
  useEffect(() => {
    slideTimerRef.current = window.setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        backgroundColor: '#0A0E0C',
        color: '#FFFFFF',
        height: '90vh',
        minHeight: '660px',
        maxHeight: '920px',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Subtle Animated Progress Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          zIndex: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          key={currentSlideIndex}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #009E52 0%, #F59E0B 50%, #EE2B42 100%)',
            animation: 'autoSlideProgress 7s linear infinite',
          }}
        />
      </div>

      {/* HORIZONTAL SLIDING CAROUSEL TRACK (Slow, silky-smooth 1.4s transition) */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          transform: `translateX(-${currentSlideIndex * 100}%)`,
          transition: 'transform 1.4s cubic-bezier(0.25, 1, 0.35, 1)',
          willChange: 'transform',
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              minWidth: '100%',
              width: '100%',
              height: '100%',
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
            }}
            className="hero-slide-item"
          >
            {/* 1. SLIDE BACKGROUND: 100% IMAGES */}

            {/* A) If Landscape: 1 full-bleed image filling 100% width and height */}
            {slide.type === 'landscape' && slide.landscapeImage && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <img
                  src={slide.landscapeImage}
                  alt={slide.title}
                  className="hero-slide-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 35%',
                    display: 'block',
                    filter: 'contrast(1.04) saturate(1.08)',
                  }}
                />
              </div>
            )}

            {/* B) If Portraits: ALL PORTRAITS PAIRED SIDE BY SIDE FILLING 100% OF SLIDER */}
            {slide.type === 'paired-portrait' && slide.portraitImages && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  display: 'grid',
                  gridTemplateColumns: `repeat(${slide.portraitImages.length}, 1fr)`,
                  width: '100%',
                  height: '100%',
                }}
              >
                {slide.portraitImages.map((pImg, pIdx) => (
                  <div
                    key={pIdx}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      borderRight:
                        pIdx < slide.portraitImages!.length - 1
                          ? '2.5px solid rgba(255, 255, 255, 0.25)'
                          : 'none',
                    }}
                  >
                    <img
                      src={pImg.src}
                      alt={pImg.caption}
                      className="hero-slide-img"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 20%',
                        display: 'block',
                        filter: 'contrast(1.04) saturate(1.08)',
                      }}
                    />

                    {/* Subtle caption tag near top/bottom */}
                    <div
                      className="portrait-caption-pill"
                      style={{
                        position: 'absolute',
                        bottom: '5.5rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(10, 14, 12, 0.72)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.85rem',
                        borderRadius: '999px',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        whiteSpace: 'nowrap',
                        zIndex: 15,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {pImg.caption}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Soft, gentle dark overlay: on desktop left-to-right; on mobile bottom-to-top only behind text so her face is 100% crystal clear */}
            <div
              className="hero-dark-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                background:
                  'linear-gradient(90deg, rgba(10, 14, 12, 0.88) 0%, rgba(10, 14, 12, 0.6) 40%, rgba(10, 14, 12, 0.15) 70%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* 2. FOREGROUND CONTENT OVERLAY */}
            <div
              className="container-custom hero-content-wrapper"
              style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                paddingTop: '2rem',
                paddingBottom: '3.5rem',
              }}
            >
              {/* Mobile "Make Way / View Full Photo" Quick Control Button */}
              <div className="mobile-view-photo-bar">
                <button
                  type="button"
                  onClick={() => setIsCardMinimized(!isCardMinimized)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: isCardMinimized ? '#009E52' : 'rgba(10, 20, 14, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#FFFFFF',
                    borderRadius: '999px',
                    padding: '0.38rem 0.95rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.45)',
                    transition: 'all 0.25s ease',
                  }}
                  aria-label={isCardMinimized ? 'Show Slide Details' : 'View Full Photo'}
                >
                  {isCardMinimized ? (
                    <>
                      <EyeIcon size={15} />
                      <span>Show Details</span>
                    </>
                  ) : (
                    <>
                      <EyeOffIcon size={15} />
                      <span>Make Way (View Photo)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Minimized Pill on Mobile when user clicked View Full Photo */}
              {isCardMinimized ? (
                <div
                  onClick={() => setIsCardMinimized(false)}
                  className="mobile-minimized-pill"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(5, 18, 12, 0.94)',
                    border: '1.5px solid rgba(0, 158, 82, 0.65)',
                    borderRadius: '999px',
                    padding: '0.65rem 1.15rem',
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.7)',
                    width: '100%',
                    maxWidth: '420px',
                    margin: '0 auto',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', overflow: 'hidden' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#009E52', flexShrink: 0 }} />
                    <span style={{ color: '#FFFFFF', fontSize: '0.84rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {slide.title}
                    </span>
                  </div>
                  <span style={{ color: '#FDE68A', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0, paddingLeft: '0.5rem' }}>
                    Show Details ↑
                  </span>
                </div>
              ) : (
                /* Floating Content Glass Card */
                <div
                  style={{
                    maxWidth: '640px',
                    backgroundColor: 'rgba(10, 14, 12, 0.55)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    border: '1.5px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 158, 82, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                  className="hero-glass-box"
                >
                  {/* Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '0.35rem 0.95rem',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                      }}
                      className="hero-badge-parliament"
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#009E52' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EE2B42' }} />
                      <span>NDC Parliamentary Caucus</span>
                    </div>

                    <span
                      style={{
                        backgroundColor:
                          slide.badgeColor === 'green' ? 'rgba(0, 158, 82, 0.32)' : 'rgba(238, 43, 66, 0.32)',
                        color: slide.badgeColor === 'green' ? '#86EFAC' : '#FCA5A5',
                        border: `1px solid ${
                          slide.badgeColor === 'green' ? 'rgba(0, 158, 82, 0.6)' : 'rgba(238, 43, 66, 0.6)'
                        }`,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.3rem 0.85rem',
                        borderRadius: '999px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {slide.tag}
                    </span>
                  </div>

                  {/* Bright Vibrant NDC Accent Line */}
                  <div className="ndc-accent-ribbon" style={{ maxWidth: '130px', height: '4px' }}>
                    <div className="ribbon-green" />
                    <div className="ribbon-gold" />
                    <div className="ribbon-red" />
                  </div>

                  {/* Headline */}
                  <h1
                    className="hero-title-text"
                    style={{
                      fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      lineHeight: 1.15,
                      color: '#FFFFFF',
                      margin: 0,
                      letterSpacing: '-0.025em',
                      textShadow: '0 4px 18px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    {slide.title}{' '}
                    <span
                      style={{
                        display: 'block',
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #FDE68A 50%, #F59E0B 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontStyle: 'italic',
                      }}
                    >
                      {slide.titleHighlight}
                    </span>
                  </h1>

                  {/* Description */}
                  <p
                    className="hero-desc-text"
                    style={{
                      fontSize: 'clamp(0.98rem, 1.5vw, 1.12rem)',
                      color: 'rgba(255, 255, 255, 0.92)',
                      lineHeight: 1.65,
                      margin: 0,
                      fontWeight: 300,
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div
                    className="hero-actions-row"
                    style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.4rem' }}
                  >
                    <button
                      onClick={onExploreProjects}
                      className="btn-primary-green hero-btn-primary"
                      style={{ fontSize: '0.95rem', padding: '0.9rem 2rem' }}
                    >
                      <span>Explore Focus Areas</span>
                      <ArrowRightIcon size={17} />
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('about');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn-outline-red hero-btn-secondary"
                      style={{ fontSize: '0.95rem', padding: '0.9rem 1.85rem' }}
                    >
                      <span>Read Mama Pokua's Story</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM SLIDER NAVIGATION BAR */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: 0,
          right: 0,
          zIndex: 30,
        }}
      >
        <div
          className="container-custom"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Indicator Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {slides.map((s, sIdx) => {
              const isCurrent = sIdx === currentSlideIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(sIdx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.25rem',
                    cursor: 'pointer',
                  }}
                  aria-label={`Go to slide ${sIdx + 1}`}
                >
                  <span
                    style={{
                      display: 'block',
                      width: isCurrent ? '34px' : '9px',
                      height: '8px',
                      borderRadius: '999px',
                      backgroundColor: isCurrent ? '#009E52' : 'rgba(255, 255, 255, 0.4)',
                      boxShadow: isCurrent ? '0 0 14px rgba(0, 158, 82, 0.7)' : 'none',
                      transition: 'all 0.4s ease',
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Slide Counter: 01 / 08 */}
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FDE68A', letterSpacing: '0.08em' }}>
            <span>0{currentSlideIndex + 1}</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)', margin: '0 0.4rem' }}>/</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>0{slides.length}</span>
          </div>

          {/* Arrows for manual navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handlePrevSlide}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(10, 14, 12, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#009E52';
                e.currentTarget.style.borderColor = '#009E52';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(10, 14, 12, 0.7)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              aria-label="Previous Slide"
            >
              <ArrowLeftIcon size={18} />
            </button>

            <button
              onClick={handleNextSlide}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(10, 14, 12, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#009E52';
                e.currentTarget.style.borderColor = '#009E52';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(10, 14, 12, 0.7)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              aria-label="Next Slide"
            >
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Keyframe and responsive CSS */}
      <style>{`
        @keyframes autoSlideProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @media (min-width: 769px) {
          .mobile-view-photo-bar {
            display: none !important;
          }
          .mobile-minimized-pill {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          #hero {
            height: 94vh !important;
            min-height: 620px !important;
            max-height: 860px !important;
            padding: 0 !important;
          }
          .hero-slide-item {
            align-items: flex-end !important;
            justify-content: flex-end !important;
          }
          .hero-slide-img {
            object-position: center 10% !important;
          }
          .portrait-caption-pill {
            bottom: auto !important;
            top: 1rem !important;
            font-size: 0.65rem !important;
            padding: 0.2rem 0.65rem !important;
          }
          .hero-dark-overlay {
            background: linear-gradient(
              to top,
              rgba(5, 14, 9, 0.95) 0%,
              rgba(5, 14, 9, 0.78) 32%,
              rgba(5, 14, 9, 0.18) 55%,
              transparent 72%
            ) !important;
          }
          .hero-content-wrapper {
            padding-top: 0 !important;
            padding-bottom: 4.8rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-end !important;
          }
          .hero-glass-box {
            padding: 1.15rem 1.25rem !important;
            border-radius: 20px !important;
            gap: 0.75rem !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            background: linear-gradient(180deg, rgba(8, 22, 14, 0.9) 0%, rgba(4, 12, 8, 0.98) 100%) !important;
            border: 1px solid rgba(0, 158, 82, 0.4) !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.65) !important;
          }
          .hero-badge-parliament {
            font-size: 0.7rem !important;
            padding: 0.25rem 0.7rem !important;
          }
          .hero-title-text {
            font-size: 1.45rem !important;
            line-height: 1.2 !important;
          }
          .hero-desc-text {
            font-size: 0.86rem !important;
            line-height: 1.45 !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .hero-actions-row {
            padding-top: 0.2rem !important;
            gap: 0.6rem !important;
          }
          .hero-btn-primary {
            padding: 0.65rem 1.15rem !important;
            font-size: 0.82rem !important;
            flex: 1 1 auto;
            justify-content: center;
          }
          .hero-btn-secondary {
            padding: 0.65rem 1.15rem !important;
            font-size: 0.82rem !important;
            flex: 1 1 auto;
            justify-content: center;
          }
          .mobile-view-photo-bar {
            display: flex !important;
            justify-content: flex-end;
            margin-bottom: 0.5rem;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
