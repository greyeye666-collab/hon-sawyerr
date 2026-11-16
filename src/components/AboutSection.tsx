import React from 'react';
import { MP_DETAILS, CORE_VALUES } from '../data/mockData';
import type { PageView } from '../types';
import { ArrowRightIcon, QuoteIcon, HeartIcon, BookIcon, TrendingUpIcon, ShieldIcon, UsersIcon, ScaleIcon } from './Icons';

interface AboutSectionProps {
  onNavigate: (page: PageView) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'heart':
        return <HeartIcon size={20} className="text-[#006B3F]" />;
      case 'book':
        return <BookIcon size={20} className="text-[#006B3F]" />;
      case 'trending-up':
        return <TrendingUpIcon size={20} className="text-[#006B3F]" />;
      case 'shield':
        return <ShieldIcon size={20} className="text-[#006B3F]" />;
      case 'users':
        return <UsersIcon size={20} className="text-[#006B3F]" />;
      case 'scale':
        return <ScaleIcon size={20} className="text-[#006B3F]" />;
      default:
        return <HeartIcon size={20} className="text-[#006B3F]" />;
    }
  };

  return (
    <section
      id="about"
      style={{
        backgroundColor: 'var(--bg-cream)',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle green watermark pattern or glow */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 107, 63, 0.25) 50%, transparent 100%)',
        }}
      />

      <div className="container-custom">
        {/* Section Tag */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ width: '12px', height: '2px', backgroundColor: '#006B3F' }} />
            <span>The Heart of Leadership</span>
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
            A Journey of Compassion, Resilience &amp; Service
          </h2>
          <div className="ndc-accent-ribbon" style={{ margin: '0.85rem auto 0', maxWidth: '100px' }}>
            <div className="ribbon-green" />
            <div className="ribbon-gold" />
            <div className="ribbon-red" />
          </div>
        </div>

        {/* Two-Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Portrait & Quote Card */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '4px solid #FFFFFF',
                backgroundColor: '#FFFFFF',
              }}
            >
              <div className="img-zoom-container" style={{ aspectRatio: '4 / 5' }}>
                <img
                  src={MP_DETAILS.portraitAbout}
                  alt={MP_DETAILS.fullName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Bottom Quote Banner */}
              <div
                style={{
                  padding: '1.75rem',
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid rgba(232, 227, 220, 0.9)',
                }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <QuoteIcon size={32} className="text-[#C5A059] flex-shrink-0" />
                  <div>
                    <blockquote
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.05rem',
                        fontStyle: 'italic',
                        color: 'var(--rich-black)',
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      &quot;A leader is defined not by the grandeur of the office, but by how many lives she touches with
                      sincere love and opportunity.&quot;
                    </blockquote>
                    <cite
                      style={{
                        display: 'block',
                        marginTop: '0.65rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--ndc-green)',
                        fontStyle: 'normal',
                      }}
                    >
                      — Hon. Queenstar Maame Pokua Sawyerr
                    </cite>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1.5rem',
                backgroundColor: '#006B3F',
                color: '#FFFFFF',
                padding: '1.25rem 1.75rem',
                borderRadius: '18px',
                boxShadow: 'var(--shadow-lg)',
                border: '2px solid #C5A059',
                display: 'none',
              }}
              className="badge-experience"
            >
              <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-serif)', lineHeight: 1 }}>
                3 Terms
              </div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
                Parliamentary Voice
              </div>
            </div>

            <style>{`
              @media (min-width: 768px) {
                .badge-experience {
                  display: block !important;
                }
              }
            `}</style>
          </div>

          {/* Right Column: Short Personal Story + Core Values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div>
              <span
                style={{
                  color: 'var(--ndc-green)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Meet Mama Pokua
              </span>
              <h3
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.3rem)',
                  fontFamily: 'var(--font-serif)',
                  marginTop: '0.35rem',
                  marginBottom: '1rem',
                  lineHeight: 1.25,
                }}
              >
                Steadfast Advocacy for the People of Agona East
              </h3>
              <p style={{ fontSize: '1.05rem', color: '#4A4643', marginBottom: '1rem' }}>
                Hon. Queenstar Maame Pokua Sawyerr is a seasoned public servant, philanthropic trailblazer, and veteran
                legislator in the Parliament of Ghana. First elected to represent Agona East in 2012, she has earned the
                enduring admiration of her constituents through her grassroots warmth, accessibility, and transformative social programs.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#4A4643' }}>
                Having served as Deputy Central Regional Minister, she spearheaded vital regional educational, health, and
                road connectivity interventions. In Parliament, she remains a fierce champion on committees advocating for
                youth development, rural infrastructure subventions, and gender parity.
              </p>
            </div>

            {/* Core Values Grid */}
            <div>
              <h4
                style={{
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-serif)',
                  marginBottom: '1rem',
                  color: 'var(--rich-black)',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '0.5rem',
                }}
              >
                Guiding Core Values
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1rem',
                }}
              >
                {CORE_VALUES.slice(0, 4).map((value, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: '1.25rem',
                      borderRadius: '14px',
                      border: '1px solid rgba(232, 227, 220, 0.9)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(0, 107, 63, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#006B3F',
                        }}
                      >
                        {renderIcon(value.iconName)}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--rich-black)' }}>
                        {value.title}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#66615C', margin: 0, lineHeight: 1.55 }}>
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button: Opens Full Biography Dedicated Page */}
            <div style={{ paddingTop: '0.5rem' }}>
              <button
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary-green"
              >
                <span>Read Full Biography &amp; Record</span>
                <ArrowRightIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
