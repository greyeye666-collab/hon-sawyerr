import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
import type { PageView } from '../types';
import { useSiteData } from '../hooks/useSiteData';
import { MenuIcon, CloseIcon } from './Icons';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onScrollToSection?: (sectionId: string) => void;
}

function rubberband(overshoot: number, dimension = 300, constant = 0.55): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onScrollToSection }) => {
  const { mpDetails } = useSiteData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const drawerX = useMotionValue(0);
  const samplesRef = useRef<Array<{ x: number; t: number }>>([]);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const draggingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    drawerX.set(0);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileMenuOpen, drawerX]);

  const navItems: { label: string; page: PageView; sectionId: string }[] = [
    { label: 'Home', page: 'home', sectionId: 'hero' },
    { label: 'About', page: 'about', sectionId: 'about' },
    { label: 'Impact & Focus Areas', page: 'impact', sectionId: 'impact' },
    { label: 'Updates & News', page: 'news', sectionId: 'news' },
    { label: 'Blog', page: 'blog', sectionId: 'blog' },
    { label: 'Gallery', page: 'gallery', sectionId: 'gallery' },
    { label: 'Contact', page: 'contact', sectionId: 'contact' },
  ];

  const handleNavClick = (item: { label: string; page: PageView; sectionId: string }) => {
    setIsMobileMenuOpen(false);
    if (currentPage === 'home' && onScrollToSection && item.page === 'home') {
      onScrollToSection(item.sectionId);
    } else {
      onNavigate(item.page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDrawerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    if ((e.target as HTMLElement).closest('button, a')) return;
    draggingRef.current = true;
    startXRef.current = e.clientX;
    startOffsetRef.current = drawerX.get();
    samplesRef.current = [{ x: e.clientX, t: performance.now() }];
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDrawerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const rawDelta = e.clientX - startXRef.current + startOffsetRef.current;
    const nextX = rawDelta < 0 ? -rubberband(Math.abs(rawDelta)) : rawDelta;
    drawerX.set(nextX);

    samplesRef.current.push({ x: e.clientX, t: performance.now() });
    if (samplesRef.current.length > 5) samplesRef.current.shift();
  };

  const handleDrawerPointerRelease = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const samples = samplesRef.current;
    let velocity = 0;
    if (samples.length >= 2) {
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = (last.t - first.t) / 1000;
      if (dt > 0.005) velocity = (last.x - first.x) / dt;
    }

    const currentX = drawerX.get();
    if (currentX > 110 || velocity > 400) {
      animate(drawerX, 420, {
        type: 'spring',
        bounce: 0,
        duration: 0.3,
        velocity,
        onComplete: () => setIsMobileMenuOpen(false),
      });
    } else {
      animate(drawerX, 0, {
        type: 'spring',
        bounce: 0,
        duration: 0.34,
        velocity,
      });
    }
  };

  return (
    <header
      className="apple-frosted-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        transition: 'background-color 240ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1)',
        backgroundColor: isScrolled ? 'rgba(3, 34, 21, 0.82)' : 'rgba(4, 42, 26, 0.9)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: isScrolled
          ? '0 10px 30px rgba(0, 0, 0, 0.24)'
          : '0 2px 12px rgba(0, 0, 0, 0.12)',
      }}
    >
      {/* Precision NDC Tri-Color Hairline */}
      <div style={{ height: '2.5px', width: '100%', display: 'flex' }}>
        <div style={{ flex: 1, backgroundColor: '#009E52' }} />
        <div style={{ width: '14px', backgroundColor: '#C9963B' }} />
        <div style={{ flex: 1, backgroundColor: '#D61F33' }} />
      </div>

      <div
        className="container-custom"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: isScrolled ? '0.62rem' : '0.82rem',
          paddingBottom: isScrolled ? '0.62rem' : '0.82rem',
          transition: 'padding 240ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Brand / Name & Monogram */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            background: 'none',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            transition: 'transform 100ms ease-out',
          }}
          onPointerDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.975)';
          }}
          onPointerUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onPointerLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label="Hon. Queenstar Sawyerr - Home"
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(155deg, #008A4B 0%, #004D2C 100%)',
              border: '1.5px solid rgba(243, 229, 194, 0.72)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 700,
              fontFamily: 'var(--font-serif)',
              fontSize: '1.02rem',
              flexShrink: 0,
            }}
          >
            QP
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span
                className="navbar-brand-title"
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '1.04rem',
                  letterSpacing: '-0.01em',
                }}
              >
                Hon. Queenstar Sawyerr
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(214, 31, 51, 0.9)',
                  color: '#FFFFFF',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  padding: '0.12rem 0.48rem',
                  borderRadius: '999px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                }}
              >
                NDC
              </span>
            </div>
            <div
              className="navbar-brand-subtitle"
              style={{
                color: 'rgba(243, 229, 194, 0.88)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Member of Parliament • Agona East
            </div>
          </div>
        </button>

        {/* Desktop Nav Links with Critically Damped Spring Pill */}
        <nav style={{ display: 'none' }} className="desktop-nav" aria-label="Primary Navigation">
          <ul style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '999px',
                      color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.82)',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      padding: '0.48rem 0.9rem',
                      position: 'relative',
                      letterSpacing: '-0.005em',
                      transition: 'color 180ms ease, transform 100ms ease-out',
                    }}
                    onPointerDown={(e) => {
                      e.currentTarget.style.transform = 'scale(0.96)';
                    }}
                    onPointerUp={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onPointerLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.82)';
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '999px',
                          backgroundColor: 'rgba(255, 255, 255, 0.14)',
                          border: '1px solid rgba(255, 255, 255, 0.22)',
                          zIndex: -1,
                        }}
                      />
                    )}
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Action CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-primary-red navbar-cta-btn"
            style={{
              padding: '0.56rem 1.25rem',
              minHeight: '40px',
              fontSize: '0.84rem',
              boxShadow: '0 4px 14px rgba(214, 31, 51, 0.3)',
            }}
          >
            Get Involved
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              borderRadius: '999px',
              color: '#FFFFFF',
              cursor: 'pointer',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 100ms ease-out',
            }}
            className="mobile-menu-btn"
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Apple 1:1 Pointer-Draggable Mobile Sheet Drawer rendered via Portal to escape header backdrop-filter containing block */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.15 : 0.22 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
                }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 9999,
                  backgroundColor: 'rgba(3, 12, 7, 0.72)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <motion.div
                  className="apple-frosted-drawer"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation Menu"
                  style={{
                    x: prefersReducedMotion ? undefined : drawerX,
                    width: 'min(100%, 360px)',
                    height: '100dvh',
                    maxHeight: '100dvh',
                    overflowY: 'auto',
                    background: 'linear-gradient(180deg, #042819 0%, #02160D 100%)',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.14)',
                    paddingTop: 'max(1.25rem, env(safe-area-inset-top))',
                    paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
                    paddingLeft: '1.35rem',
                    paddingRight: '1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                    boxShadow: '-16px 0 48px rgba(0, 0, 0, 0.55)',
                    touchAction: 'pan-y',
                  }}
                  initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.34 }}
                  onPointerDown={handleDrawerPointerDown}
                  onPointerMove={handleDrawerPointerMove}
                  onPointerUp={handleDrawerPointerRelease}
                  onPointerCancel={handleDrawerPointerRelease}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: '0.9rem',
                      marginBottom: '0.35rem',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: '#FFFFFF', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem' }}>
                      Navigation
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="Close Navigation Menu"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#FFFFFF',
                        display: 'grid',
                        placeItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <CloseIcon size={18} />
                    </button>
                  </div>

                  {navItems.map((item) => {
                    const isActive = currentPage === item.page;
                    return (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item)}
                        style={{
                          background: isActive ? 'rgba(0, 158, 82, 0.28)' : 'transparent',
                          border: isActive ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid transparent',
                          borderRadius: '12px',
                          textAlign: 'left',
                          color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.88)',
                          fontSize: '0.98rem',
                          fontWeight: isActive ? 700 : 500,
                          padding: '0.72rem 0.95rem',
                          minHeight: '44px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexShrink: 0,
                          transition: 'transform 100ms ease-out, background-color 180ms ease',
                        }}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              backgroundColor: '#F3E5C2',
                            }}
                          />
                        )}
                      </button>
                    );
                  })}

                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.12)', flexShrink: 0 }}>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onNavigate('contact');
                      }}
                      className="btn-primary-red"
                      style={{ width: '100%' }}
                    >
                      Constituent Service Desk
                    </button>
                    <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(243, 229, 194, 0.88)', fontWeight: 500 }}>
                      Hotline: {mpDetails.hotlinePhone}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .navbar-cta-btn {
            display: none !important;
          }
          .navbar-brand-title {
            font-size: 0.95rem !important;
          }
          .navbar-brand-subtitle {
            font-size: 0.62rem !important;
            letter-spacing: 0.04em !important;
          }
        }
      `}</style>
    </header>
  );
};
