import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
import type { HeroSlide, PageView } from '../types';
import { useSiteData } from '../hooks/useSiteData';
import { ArrowRightIcon, ArrowLeftIcon, EyeIcon, EyeOffIcon } from './Icons';

interface HeroProps {
  onNavigate: (page: PageView) => void;
  onExploreProjects: () => void;
}

function project(initialVelocityPxPerSec: number, decelerationRate = 0.996): number {
  return ((initialVelocityPxPerSec / 1000) * decelerationRate) / (1 - decelerationRate);
}

function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

// Gentle, editorial ease-in-out for autoplay / arrows / dots
const SLIDE_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const SLIDE_DURATION = 0.95;

export const Hero: React.FC<HeroProps> = ({ onNavigate, onExploreProjects }) => {
  const { heroSlides: SLIDES } = useSiteData();
  const SLIDE_COUNT = SLIDES.length;
  const RENDERED_SLIDES: HeroSlide[] =
    SLIDE_COUNT > 0 ? [SLIDES[SLIDE_COUNT - 1], ...SLIDES, SLIDES[0]] : [];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isCardMinimized, setIsCardMinimized] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLElement | null>(null);
  const trackX = useMotionValue(0);
  // Position within RENDERED_SLIDES (real slides live at 1..SLIDE_COUNT)
  const posRef = useRef(1);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const dragStateRef = useRef({
    active: false,
    committed: false,
    startX: 0,
    startY: 0,
    startTrackX: 0,
    startPos: 1,
    width: 1200,
    samples: [] as Array<{ x: number; t: number }>,
  });

  const getWidth = useCallback(
    () => containerRef.current?.clientWidth || window.innerWidth,
    []
  );

  // If we are sitting on (or moving toward) a clone, jump to the identical real slide.
  // Clones look exactly like their real counterparts, so the jump is invisible.
  const rebase = useCallback(() => {
    if (SLIDE_COUNT === 0) return;
    const width = getWidth();
    if (posRef.current >= SLIDE_COUNT + 1) {
      posRef.current -= SLIDE_COUNT;
      trackX.set(trackX.get() + SLIDE_COUNT * width);
    } else if (posRef.current <= 0) {
      posRef.current += SLIDE_COUNT;
      trackX.set(trackX.get() - SLIDE_COUNT * width);
    }
  }, [SLIDE_COUNT, getWidth, trackX]);

  const goToPos = useCallback(
    (pos: number, velocity?: number) => {
      if (SLIDE_COUNT === 0) return;
      const width = getWidth();
      animRef.current?.stop();
      posRef.current = pos;
      setCurrentSlideIndex((((pos - 1) % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
      const targetX = -pos * width;

      if (prefersReducedMotion) {
        trackX.set(targetX);
        rebase();
        return;
      }

      animRef.current = animate(
        trackX,
        targetX,
        velocity !== undefined
          ? { type: 'spring', bounce: 0, duration: 0.7, velocity, onComplete: rebase }
          : { type: 'tween', duration: SLIDE_DURATION, ease: SLIDE_EASE, onComplete: rebase }
      );
    },
    [SLIDE_COUNT, getWidth, prefersReducedMotion, rebase, trackX]
  );

  const goToSlide = useCallback(
    (index: number) => {
      rebase();
      goToPos(index + 1);
    },
    [goToPos, rebase]
  );

  const goNext = useCallback(() => {
    rebase();
    goToPos(posRef.current + 1);
  }, [goToPos, rebase]);

  const goPrev = useCallback(() => {
    rebase();
    goToPos(posRef.current - 1);
  }, [goToPos, rebase]);

  // Start on the first real slide (position 1) before first paint
  useLayoutEffect(() => {
    trackX.set(-posRef.current * getWidth());
  }, [getWidth, trackX]);

  // Keep track aligned on viewport resize
  useEffect(() => {
    const syncWidth = () => {
      animRef.current?.stop();
      rebase();
      trackX.set(-posRef.current * getWidth());
    };
    window.addEventListener('resize', syncWidth);
    return () => window.removeEventListener('resize', syncWidth);
  }, [getWidth, rebase, trackX]);

  // Auto-advance (always forward, wrapping seamlessly from last to first)
  useEffect(() => {
    if (isPaused || prefersReducedMotion || SLIDE_COUNT <= 1) return;
    const timer = window.setTimeout(goNext, 7000);
    return () => clearTimeout(timer);
  }, [SLIDE_COUNT, currentSlideIndex, isPaused, prefersReducedMotion, goNext]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Allow interactive buttons inside hero to work cleanly without capturing clicks
    if ((e.target as HTMLElement).closest('button, a')) return;
    if (prefersReducedMotion) return;

    dragStateRef.current = {
      active: true,
      committed: false,
      startX: e.clientX,
      startY: e.clientY,
      startTrackX: trackX.get(),
      startPos: posRef.current,
      width: getWidth(),
      samples: [{ x: e.clientX, t: performance.now() }],
    };
    setIsPaused(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragStateRef.current;
    if (!d.active) return;

    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;

    // 10px hysteresis before committing horizontal drag
    if (!d.committed) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
        d.active = false;
        setIsPaused(false);
        return;
      }
      if (Math.abs(dx) < 10) return;
      d.committed = true;
      // Take over from any running animation without a jump
      animRef.current?.stop();
      rebase();
      d.startX = e.clientX;
      d.startTrackX = trackX.get();
      d.startPos = Math.round(-d.startTrackX / d.width);
      d.samples = [{ x: e.clientX, t: performance.now() }];
      return;
    }

    const minX = -(SLIDE_COUNT + 1) * d.width;
    const rawX = d.startTrackX + (e.clientX - d.startX);
    let clampedX = rawX;
    if (rawX > 0) {
      clampedX = rubberband(rawX, d.width);
    } else if (rawX < minX) {
      clampedX = minX - rubberband(minX - rawX, d.width);
    }
    trackX.set(clampedX);

    d.samples.push({ x: e.clientX, t: performance.now() });
    if (d.samples.length > 5) d.samples.shift();
  };

  const handlePointerRelease = () => {
    const d = dragStateRef.current;
    if (!d.active) return;
    d.active = false;
    setIsPaused(false);

    if (!d.committed) return;

    let velocity = 0;
    if (d.samples.length >= 2) {
      const first = d.samples[0];
      const last = d.samples[d.samples.length - 1];
      const dt = (last.t - first.t) / 1000;
      if (dt > 0.005) velocity = (last.x - first.x) / dt;
    }

    // Momentum projection, limited to one slide per swipe for a calm feel
    const currentX = trackX.get();
    const projectedX = currentX + project(velocity, 0.995);
    const projectedPos = Math.round(-projectedX / d.width);
    const targetPos = Math.max(d.startPos - 1, Math.min(d.startPos + 1, projectedPos));
    goToPos(Math.max(0, Math.min(SLIDE_COUNT + 1, targetPos)), velocity);
  };

  const handlePrevSlide = () => {
    goPrev();
  };

  const handleNextSlide = () => {
    goNext();
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: 'relative',
        backgroundColor: '#0A0E0C',
        color: '#FFFFFF',
        height: '88dvh',
        minHeight: '640px',
        maxHeight: '900px',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Subtle Progress Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {!prefersReducedMotion && !isPaused && (
          <div
            key={currentSlideIndex}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #009E52 0%, #C9963B 50%, #D61F33 100%)',
              animation: 'autoSlideProgress 7s linear infinite',
            }}
          />
        )}
      </div>

      {/* 1:1 Pointer-Trackable Carousel Track */}
      <motion.div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerRelease}
        onPointerCancel={handlePointerRelease}
        style={{
          x: trackX,
          display: 'flex',
          width: '100%',
          height: '100%',
          willChange: 'transform',
          cursor: 'grab',
          touchAction: 'pan-y',
        }}
      >
        {RENDERED_SLIDES.map((slide, renderIdx) => (
          <div
            key={`${slide.id}-${renderIdx}`}
            aria-hidden={renderIdx === 0 || renderIdx === SLIDE_COUNT + 1 ? true : undefined}
            style={{
              minWidth: '100%',
              width: '100%',
              height: '100%',
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none',
            }}
            className={`hero-slide-item${slide.id === SLIDES[currentSlideIndex]?.id ? ' is-active' : ''}`}
          >
            {slide.type === 'landscape' && slide.landscapeImage && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <img
                  src={slide.landscapeImage}
                  alt={slide.title}
                  draggable={false}
                  className="hero-slide-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 35%',
                    display: 'block',
                    filter: 'contrast(1.03) saturate(1.04)',
                  }}
                />
              </div>
            )}

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
                          ? '1px solid rgba(255, 255, 255, 0.2)'
                          : 'none',
                    }}
                  >
                    <img
                      src={pImg.src}
                      alt={pImg.caption}
                      draggable={false}
                      className="hero-slide-img"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 20%',
                        display: 'block',
                        filter: 'contrast(1.03) saturate(1.04)',
                      }}
                    />

                    <div
                      className="portrait-caption-pill"
                      style={{
                        position: 'absolute',
                        bottom: '5.5rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(10, 14, 12, 0.65)',
                        backdropFilter: 'blur(12px) saturate(160%)',
                        WebkitBackdropFilter: 'blur(12px) saturate(160%)',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '0.28rem 0.9rem',
                        borderRadius: '999px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        whiteSpace: 'nowrap',
                        zIndex: 15,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {pImg.caption}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div
              className="hero-dark-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                background:
                  'linear-gradient(90deg, rgba(10, 14, 12, 0.82) 0%, rgba(10, 14, 12, 0.48) 42%, rgba(10, 14, 12, 0.1) 72%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            <div
              className="container-custom hero-content-wrapper"
              style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                paddingTop: '2rem',
                paddingBottom: '3.75rem',
              }}
            >
              {/* Mobile Quick Toggle */}
              <div className="mobile-view-photo-bar">
                <button
                  type="button"
                  onClick={() => setIsCardMinimized(!isCardMinimized)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: isCardMinimized ? '#007A43' : 'rgba(10, 18, 14, 0.78)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.28)',
                    color: '#FFFFFF',
                    borderRadius: '999px',
                    padding: '0.4rem 0.95rem',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer',
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
                      <span>View Photo</span>
                    </>
                  )}
                </button>
              </div>

              {isCardMinimized ? (
                <div
                  onClick={() => setIsCardMinimized(false)}
                  className="mobile-minimized-pill"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(8, 22, 14, 0.88)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    borderRadius: '999px',
                    padding: '0.68rem 1.2rem',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '420px',
                    margin: '0 auto',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', overflow: 'hidden' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#009E52', flexShrink: 0 }} />
                    <span style={{ color: '#FFFFFF', fontSize: '0.84rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {slide.title}
                    </span>
                  </div>
                  <span style={{ color: '#F3E5C2', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, paddingLeft: '0.5rem' }}>
                    Show ↑
                  </span>
                </div>
              ) : (
                <div
                  className="hero-glass-box apple-frosted-card"
                  style={{
                    maxWidth: '610px',
                    backgroundColor: 'rgba(10, 18, 14, 0.6)',
                    backdropFilter: 'blur(26px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(26px) saturate(180%)',
                    padding: '2.35rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.42)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.15rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <div
                      className="hero-badge-parliament"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        padding: '0.32rem 0.9rem',
                        borderRadius: '999px',
                        fontSize: '0.73rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                      }}
                    >
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#009E52' }} />
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#D61F33' }} />
                      <span>NDC Parliamentary Caucus</span>
                    </div>

                    <span
                      style={{
                        backgroundColor:
                          slide.badgeColor === 'green' ? 'rgba(0, 158, 82, 0.24)' : 'rgba(214, 31, 51, 0.24)',
                        color: slide.badgeColor === 'green' ? '#A7F3D0' : '#FECACA',
                        border: `1px solid ${
                          slide.badgeColor === 'green' ? 'rgba(167, 243, 208, 0.35)' : 'rgba(254, 202, 202, 0.35)'
                        }`,
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '0.3rem 0.85rem',
                        borderRadius: '999px',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {slide.tag}
                    </span>
                  </div>

                  <h1
                    className="hero-title-text"
                    style={{
                      fontSize: 'clamp(2.15rem, 4vw, 3.45rem)',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      lineHeight: 1.12,
                      color: '#FFFFFF',
                      margin: 0,
                      letterSpacing: '-0.028em',
                    }}
                  >
                    {slide.title}{' '}
                    <span
                      style={{
                        display: 'block',
                        color: '#F3E5C2',
                        fontStyle: 'italic',
                        fontWeight: 600,
                        marginTop: '0.12rem',
                      }}
                    >
                      {slide.titleHighlight}
                    </span>
                  </h1>

                  <p
                    className="hero-desc-text"
                    style={{
                      fontSize: 'clamp(0.98rem, 1.35vw, 1.08rem)',
                      color: 'rgba(255, 255, 255, 0.88)',
                      lineHeight: 1.62,
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    {slide.description}
                  </p>

                  <div
                    className="hero-actions-row"
                    style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', paddingTop: '0.35rem' }}
                  >
                    <button
                      onClick={onExploreProjects}
                      className="btn-primary-green hero-btn-primary"
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
                    >
                      <span>Read Mama Pokua&apos;s Story</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>

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
          <div className="hero-indicator-pills" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap', maxWidth: '65vw' }}>
            {SLIDES.map((s, sIdx) => {
              const isCurrent = sIdx === currentSlideIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(sIdx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.35rem 0.15rem',
                    cursor: 'pointer',
                  }}
                  aria-label={`Go to slide ${sIdx + 1}`}
                >
                  <span
                    style={{
                      display: 'block',
                      width: isCurrent ? '22px' : '6px',
                      height: '6px',
                      borderRadius: '999px',
                      backgroundColor: isCurrent ? '#FFFFFF' : 'rgba(255, 255, 255, 0.42)',
                      transition: 'width 260ms cubic-bezier(0.22, 1, 0.36, 1), background-color 200ms ease',
                    }}
                  />
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F3E5C2', letterSpacing: '0.08em' }}>
            <span>{String(currentSlideIndex + 1).padStart(2, '0')}</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)', margin: '0 0.4rem' }}>/</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.72)' }}>{String(SLIDES.length).padStart(2, '0')}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={handlePrevSlide}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(10, 14, 12, 0.65)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.24)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 100ms ease-out, background-color 180ms ease',
              }}
              onPointerDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.92)';
              }}
              onPointerUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#007A43';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'rgba(10, 14, 12, 0.65)';
              }}
              aria-label="Previous Slide"
            >
              <ArrowLeftIcon size={18} />
            </button>

            <button
              onClick={handleNextSlide}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(10, 14, 12, 0.65)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.24)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 100ms ease-out, background-color 180ms ease',
              }}
              onPointerDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.92)';
              }}
              onPointerUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#007A43';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = 'rgba(10, 14, 12, 0.65)';
              }}
              aria-label="Next Slide"
            >
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes autoSlideProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .hero-slide-img {
          transform: scale(1.06);
          transition: transform 1.6s cubic-bezier(0.22, 1, 0.36, 1);
          backface-visibility: hidden;
        }
        .hero-slide-item.is-active .hero-slide-img {
          transform: scale(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-slide-img,
          .hero-slide-item.is-active .hero-slide-img {
            transform: none;
            transition: none;
          }
        }
        @media (min-width: 769px) {
          .mobile-view-photo-bar,
          .mobile-minimized-pill {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          #hero {
            height: 90dvh !important;
            min-height: 600px !important;
            max-height: 840px !important;
          }
          .hero-slide-item {
            align-items: flex-end !important;
            justify-content: flex-end !important;
          }
          .hero-slide-img {
            object-position: center 12% !important;
          }
          .portrait-caption-pill {
            bottom: auto !important;
            top: 1rem !important;
            font-size: 0.64rem !important;
            padding: 0.22rem 0.65rem !important;
            max-width: 90% !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            text-align: center !important;
            white-space: nowrap !important;
          }
          .hero-dark-overlay {
            background: linear-gradient(
              to top,
              rgba(6, 14, 10, 0.92) 0%,
              rgba(6, 14, 10, 0.68) 34%,
              rgba(6, 14, 10, 0.14) 58%,
              transparent 74%
            ) !important;
          }
          .hero-content-wrapper {
            padding-top: 0 !important;
            padding-bottom: 5.5rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-end !important;
          }
          .hero-indicator-pills {
            display: none !important;
          }
          .hero-glass-box {
            padding: 1.25rem !important;
            border-radius: 20px !important;
            gap: 0.72rem !important;
          }
          .hero-badge-parliament {
            font-size: 0.66rem !important;
            padding: 0.24rem 0.68rem !important;
          }
          .hero-title-text {
            font-size: 1.48rem !important;
            line-height: 1.16 !important;
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
          .hero-btn-primary,
          .hero-btn-secondary {
            padding: 0.68rem 1.15rem !important;
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
