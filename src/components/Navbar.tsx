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
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PageView; sectionId: string }[] = [
    { label: 'Home', page: 'home', sectionId: 'hero' },
    { label: 'About', page: 'about', sectionId: 'about' },
    { label: 'Impact & Good Works', page: 'impact', sectionId: 'impact' },
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

  const isLightNav = currentPage !== 'home' || isScrolled;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.35s ease',
        backgroundColor: isLightNav ? 'rgba(17, 17, 17, 0.94)' : 'rgba(17, 17, 17, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isLightNav ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Top NDC Subtle Accent Line */}
      <div style={{ height: '3px', width: '100%', display: 'flex' }}>
        <div style={{ flex: 1, backgroundColor: '#006B3F' }} />
        <div style={{ width: '8px', backgroundColor: '#C5A059' }} />
        <div style={{ flex: 1, backgroundColor: '#CE1126' }} />
      </div>

      <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.5rem' }}>
        {/* Brand / Name */}
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
        >
          {/* Monogram Seal */}
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #006B3F 0%, #004D2C 100%)',
              border: '1.5px solid #C5A059',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(0, 107, 63, 0.4)',
              flexShrink: 0,
            }}
          >
            QP
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  letterSpacing: '0.02em',
                }}
              >
                Hon. Queenstar Sawyerr
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(206, 17, 38, 0.25)',
                  color: '#FFA8B0',
                  border: '1px solid rgba(206, 17, 38, 0.45)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.1rem 0.45rem',
                  borderRadius: '999px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                NDC
              </span>
            </div>
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.65)',
                fontSize: '0.72rem',
                fontWeight: 500,
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
          <ul style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.78)',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      padding: '0.4rem 0',
                      position: 'relative',
                      letterSpacing: '0.02em',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)';
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-2px',
                          left: '0',
                          right: '0',
                          height: '2px',
                          borderRadius: '2px',
                          background: 'linear-gradient(90deg, #006B3F 0%, #C5A059 50%, #CE1126 100%)',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-primary-green"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
          >
            Get Involved
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
            backgroundColor: '#111111',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: currentPage === item.page ? '#C5A059' : '#FFFFFF',
                fontSize: '1.05rem',
                fontWeight: 600,
                padding: '0.5rem 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <span>{item.label}</span>
              {currentPage === item.page && (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#006B3F' }} />
              )}
            </button>
          ))}

          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('contact');
              }}
              className="btn-primary-green"
              style={{ width: '100%' }}
            >
              Constituent Service Desk
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              Call Hotline: {MP_DETAILS.hotlinePhone}
            </div>
          </div>
        </div>
      )}

      {/* Desktop style helper */}
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
