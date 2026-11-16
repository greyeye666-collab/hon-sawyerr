import React, { useState, useEffect } from 'react';
import type { PageView } from '../types';
import { MP_DETAILS } from '../data/mockData';
import { MenuIcon, CloseIcon } from './Icons';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onScrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scrolled state early (scrollY > 15) so as soon as user scrolls down, the distinctive look is active
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PageView; sectionId: string }[] = [
    { label: 'Home', page: 'home', sectionId: 'hero' },
    { label: 'About', page: 'about', sectionId: 'about' },
    { label: 'Impact & Focus Areas', page: 'impact', sectionId: 'impact' },
    { label: 'Updates & News', page: 'news', sectionId: 'news' },
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

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: isScrolled ? 'rgba(2, 40, 24, 0.98)' : 'rgba(3, 50, 30, 0.98)',
        backgroundImage: isScrolled
          ? 'linear-gradient(135deg, rgba(2, 36, 21, 0.98) 0%, rgba(0, 68, 38, 0.98) 50%, rgba(2, 36, 21, 0.98) 100%)'
          : 'linear-gradient(135deg, rgba(3, 46, 28, 0.98) 0%, rgba(0, 78, 44, 0.98) 50%, rgba(3, 46, 28, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: isScrolled
          ? '2.5px solid #009E52'
          : '1.5px solid rgba(0, 158, 82, 0.45)',
        boxShadow: isScrolled
          ? '0 12px 35px rgba(0, 0, 0, 0.45), 0 2px 10px rgba(0, 158, 82, 0.35)'
          : '0 4px 20px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Top NDC Tri-Color Ribbon */}
      <div style={{ height: '3.5px', width: '100%', display: 'flex' }}>
        <div style={{ flex: 1, backgroundColor: '#009E52' }} />
        <div style={{ width: '16px', backgroundColor: '#F59E0B' }} />
        <div style={{ flex: 1, backgroundColor: '#EE2B42' }} />
      </div>

      <div
        className="container-custom"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: isScrolled ? '0.7rem' : '0.9rem',
          paddingBottom: isScrolled ? '0.7rem' : '0.9rem',
          transition: 'padding 0.3s ease',
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
            gap: '0.85rem',
          }}
          aria-label="Hon. Queenstar Sawyerr - Home"
        >
          {/* Monogram Seal */}
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #009E52 0%, #004D2C 100%)',
              border: '2px solid #F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35), 0 0 10px rgba(245, 158, 11, 0.4)',
              flexShrink: 0,
            }}
          >
            QP
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <span
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  letterSpacing: '0.015em',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
                }}
              >
                Hon. Queenstar Sawyerr
              </span>
              <span
                style={{
                  backgroundColor: '#EE2B42',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '0.12rem 0.5rem',
                  borderRadius: '999px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 8px rgba(238, 43, 66, 0.5)',
                }}
              >
                NDC
              </span>
            </div>
            <div
              style={{
                color: '#FDE68A',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Member of Parliament • Agona East
            </div>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'none' }} className="desktop-nav">
          <ul style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item)}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(0, 158, 82, 0.5) 0%, rgba(0, 122, 62, 0.65) 100%)'
                        : 'transparent',
                      border: isActive
                        ? '1px solid rgba(16, 185, 129, 0.6)'
                        : '1px solid transparent',
                      borderRadius: '8px',
                      color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.92)',
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      padding: '0.5rem 0.85rem',
                      position: 'relative',
                      letterSpacing: '0.02em',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 4px 12px rgba(0, 158, 82, 0.35)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#FBBF24';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                        e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.35)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.92)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                      }
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-1px',
                          left: '12%',
                          right: '12%',
                          height: '2.5px',
                          borderRadius: '2px',
                          background: 'linear-gradient(90deg, #009E52 0%, #F59E0B 50%, #EE2B42 100%)',
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Action CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #EE2B42 0%, #C51426 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.02em',
              padding: '0.62rem 1.35rem',
              borderRadius: '999px',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 16px rgba(238, 43, 66, 0.45)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #FF4757 0%, #EE2B42 100%)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(238, 43, 66, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #EE2B42 0%, #C51426 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(238, 43, 66, 0.45)';
            }}
          >
            Get Involved
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'rgba(0, 158, 82, 0.35)',
              border: '1.5px solid rgba(16, 185, 129, 0.5)',
              borderRadius: '8px',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#022E1A',
            backgroundImage: 'linear-gradient(180deg, #022E1A 0%, #011E11 100%)',
            borderTop: '2px solid #009E52',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              style={{
                background: currentPage === item.page ? 'rgba(0, 158, 82, 0.35)' : 'none',
                border: currentPage === item.page ? '1px solid rgba(16, 185, 129, 0.5)' : 'none',
                borderRadius: '8px',
                textAlign: 'left',
                color: currentPage === item.page ? '#FBBF24' : '#FFFFFF',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.65rem 0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{item.label}</span>
              {currentPage === item.page && (
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#F59E0B',
                    boxShadow: '0 0 8px #F59E0B',
                  }}
                />
              )}
            </button>
          ))}

          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('contact');
              }}
              style={{
                background: 'linear-gradient(135deg, #EE2B42 0%, #C51426 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.92rem',
                padding: '0.85rem',
                borderRadius: '999px',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                width: '100%',
                boxShadow: '0 6px 20px rgba(238, 43, 66, 0.4)',
              }}
            >
              Constituent Service Desk
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#FDE68A', fontWeight: 500 }}>
              Hotline: {MP_DETAILS.hotlinePhone}
            </div>
          </div>
        </div>
      )}

      {/* Responsive layout helper */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
