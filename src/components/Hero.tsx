import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
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

// Additional user provided images fa1 to fa18
import fa1 from '../assets/fa/fa1.jpg';
import fa2 from '../assets/fa/fa2.jpg';
import fa3 from '../assets/fa/fa3.jpg';
import fa4 from '../assets/fa/fa4.jpg';
import fa5 from '../assets/fa/fa5.jpg';
import fa6 from '../assets/fa/fa6.jpg';
import fa7 from '../assets/fa/fa7.jpg';
import fa8 from '../assets/fa/fa8.jpg';
import fa9 from '../assets/fa/fa9.jpg';
import fa10 from '../assets/fa/fa10.jpg';
import fa11 from '../assets/fa/fa11.jpg';
import fa12 from '../assets/fa/fa12.jpg';
import fa13 from '../assets/fa/fa13.jpg';
import fa14 from '../assets/fa/fa14.jpg';
import fa15 from '../assets/fa/fa15.jpg';
import fa16 from '../assets/fa/fa16.jpg';
import fa17 from '../assets/fa/fa17.jpg';
import fa18 from '../assets/fa/fa18.jpg';
import fa19 from '../assets/fa/fa19.jpg';
import fa20 from '../assets/fa/fa20.jpg';
import fa21 from '../assets/fa/fa21.jpg';

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

function project(initialVelocityPxPerSec: number, decelerationRate = 0.996): number {
  return ((initialVelocityPxPerSec / 1000) * decelerationRate) / (1 - decelerationRate);
}

function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

const SLIDES: HeroSlide[] = [
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
  {
    id: 9,
    type: 'paired-portrait',
    tag: 'Constituency Engagement',
    badgeColor: 'green',
    title: 'Deeply Rooted in Agona East.',
    titleHighlight: 'Listening to Every Voice.',
    description:
      'Walking through every village and hamlet, listening to elders, youth, and families with humility, dedication, and active care.',
    portraitImages: [
      { src: fa1, caption: 'Grassroots Listening Tour' },
      { src: fa2, caption: 'Heart of Agona East' },
    ],
  },
  {
    id: 10,
    type: 'paired-portrait',
    tag: 'Servant Leadership',
    badgeColor: 'red',
    title: 'Standing with the People.',
    titleHighlight: 'In Every Season of Life.',
    description:
      'Accessible, hands-on leadership that meets people right where they are, bringing hope and practical solutions to daily community challenges.',
    portraitImages: [
      { src: fa3, caption: 'Community Fellowship' },
      { src: fa4, caption: 'Mama Pokua in Service' },
      { src: fa5, caption: 'Grassroots Engagement' },
    ],
  },
  {
    id: 11,
    type: 'paired-portrait',
    tag: 'Women Empowerment',
    badgeColor: 'green',
    title: 'Championing Mothers & Families.',
    titleHighlight: 'Economic Dignity in Every Home.',
    description:
      'Standing firmly behind market women, farmers, and family heads with revolving micro-grants, mechanized processing tools, and business guidance.',
    portraitImages: [
      { src: fa6, caption: 'Market Women Solidarity' },
      { src: fa7, caption: 'Maternal Dignity' },
    ],
  },
  {
    id: 12,
    type: 'paired-portrait',
    tag: 'Youth Development',
    badgeColor: 'red',
    title: 'Inspiring the Next Generation.',
    titleHighlight: 'Unlocking Boundless Potential.',
    description:
      'Empowering our youth through educational subsidies, vocational skills apprenticeship, and educational supplies to build a prosperous tomorrow.',
    portraitImages: [
      { src: fa8, caption: 'Youth Mentorship' },
      { src: fa9, caption: 'Future Leaders of Agona' },
    ],
  },
  {
    id: 13,
    type: 'paired-portrait',
    tag: 'Unity & Heritage',
    badgeColor: 'green',
    title: 'United in Heritage & Purpose.',
    titleHighlight: 'Honoring Our Traditions.',
    description:
      'Partnering closely with revered traditional chiefs, queenmothers, and community custodians to foster peace, cultural pride, and inclusive development.',
    portraitImages: [
      { src: fa10, caption: 'Traditional Durbar' },
      { src: fa11, caption: 'Cultural Heritage' },
      { src: fa12, caption: 'Community Solidarity' },
    ],
  },
  {
    id: 14,
    type: 'paired-portrait',
    tag: 'Infrastructure Oversight',
    badgeColor: 'red',
    title: 'Delivering Everyday Results.',
    titleHighlight: 'Action and Accountability.',
    description:
      'Personally inspecting rural roads, water boreholes, school facilities, and CHPS clinics to ensure uncompromising quality for our people.',
    portraitImages: [
      { src: fa13, caption: 'Field Project Inspection' },
      { src: fa14, caption: 'Development in Action' },
    ],
  },
  {
    id: 15,
    type: 'paired-portrait',
    tag: 'A Mother to All',
    badgeColor: 'green',
    title: 'A Pillar of Compassion.',
    titleHighlight: 'Beloved Across the Central Region.',
    description:
      'Affectionately called Mama Pokua for her unwavering warmth, accessible presence, and lifelong dedication to uplifting the vulnerable.',
    portraitImages: [
      { src: fa15, caption: 'Grassroots Warmth' },
      { src: fa16, caption: 'Mama Pokua with Constituents' },
      { src: fa17, caption: "The People's Choice" },
    ],
  },
  {
    id: 16,
    type: 'landscape',
    tag: 'Agona East Rising',
    badgeColor: 'green',
    title: 'Forward Together for Agona East.',
    titleHighlight: 'Building a Resilient Constituency.',
    description:
      'A unified constituency forging forward in mutual respect, sustainable economic growth, and steadfast leadership for the generations ahead.',
    landscapeImage: fa18,
  },
  {
    id: 17,
    type: 'paired-portrait',
    tag: 'Community Progress',
    badgeColor: 'red',
    title: 'Transforming Lives Daily.',
    titleHighlight: 'Agona East Flourishes.',
    description:
      'Working tirelessly on the ground with grassroots communities, women traders, and local champions to bring real, lasting development across Agona East.',
    portraitImages: [
      { src: fa19, caption: 'Community Dialogue' },
      { src: fa20, caption: 'Grassroots Solidarity' },
    ],
  },
  {
    id: 18,
    type: 'landscape',
    tag: 'A Future of Hope',
    badgeColor: 'green',
    title: 'Visionary Leadership.',
    titleHighlight: 'Empowering Every Citizen.',
    description:
      'Steadfast dedication to uplifting Agona East through accessible leadership, robust infrastructure, and educational excellence for every family.',
    landscapeImage: fa21,
  },
];

// Seamless infinite loop: [clone of last, ...slides, clone of first]
const SLIDE_COUNT = SLIDES.length;
const RENDERED_SLIDES: HeroSlide[] = [SLIDES[SLIDE_COUNT - 1], ...SLIDES, SLIDES[0]];

// Gentle, editorial ease-in-out for autoplay / arrows / dots
const SLIDE_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const SLIDE_DURATION = 0.95;

export const Hero: React.FC<HeroProps> = ({ onNavigate, onExploreProjects }) => {
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
    const width = getWidth();
    if (posRef.current >= SLIDE_COUNT + 1) {
      posRef.current -= SLIDE_COUNT;
      trackX.set(trackX.get() + SLIDE_COUNT * width);
    } else if (posRef.current <= 0) {
      posRef.current += SLIDE_COUNT;
      trackX.set(trackX.get() - SLIDE_COUNT * width);
    }
  }, [getWidth, trackX]);

  const goToPos = useCallback(
    (pos: number, velocity?: number) => {
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
    [getWidth, prefersReducedMotion, rebase, trackX]
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
    if (isPaused || prefersReducedMotion) return;
    const timer = window.setTimeout(goNext, 7000);
    return () => clearTimeout(timer);
  }, [currentSlideIndex, isPaused, prefersReducedMotion, goNext]);

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
            className={`hero-slide-item${slide.id === SLIDES[currentSlideIndex].id ? ' is-active' : ''}`}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap', maxWidth: '65vw' }}>
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
            padding-bottom: 4.6rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-end !important;
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
