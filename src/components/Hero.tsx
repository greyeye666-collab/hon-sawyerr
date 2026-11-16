import React from 'react';
import { MP_DETAILS, QUICK_STATS } from '../data/mockData';
import type { PageView } from '../types';
import { ArrowRightIcon, AwardIcon, SparklesIcon } from './Icons';
import H2Img from '../assets/H2.jpg';

interface HeroProps {
  onNavigate: (page: PageView) => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onExploreProjects }) => {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        backgroundColor: '#111111',
        color: '#FFFFFF',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Graphic / Atmosphere with soft gradients */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 80% 30%, rgba(0, 107, 63, 0.28) 0%, rgba(17, 17, 17, 0.95) 60%, #111111 100%)',
          zIndex: 1,
        }}
      />

      {/* Decorative Subtle Gold Shimmer & Ambient Rings */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(206, 17, 38, 0.10) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Hero Content Grid */}
      <div
        className="container-custom"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '3.5rem',
          paddingBottom: '3.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Left Column: Powerful Slogan & Typography */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '620px' }}>
            
            {/* NDC Honour Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  padding: '0.4rem 1rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#006B3F' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CE1126' }} />
                <span>NDC Parliamentary Caucus</span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: '#C5A059',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                <AwardIcon size={16} />
                <span>3-Term Member of Parliament</span>
              </div>
            </div>

            {/* Small Elegant NDC-inspired Accent Line (Green + Red + Gold) */}
            <div className="ndc-accent-ribbon" style={{ maxWidth: '140px', height: '4px' }}>
              <div className="ribbon-green" />
              <div className="ribbon-gold" />
              <div className="ribbon-red" />
            </div>

            {/* Main Powerful Slogan */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Dedicated to People.{' '}
              <span
                style={{
                  display: 'block',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #E7D5B0 60%, #C5A059 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontStyle: 'italic',
                }}
              >
                Committed to Progress.
              </span>
            </h1>

            {/* Subtitle / Statement */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: 'rgba(255, 255, 255, 0.82)',
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 300,
              }}
            >
              Serving the good people of <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>Agona East</strong> with
              steadfast compassion, educational empowerment, maternal healthcare, and grassroots economic transformation.
            </p>

            {/* Call-to-Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.75rem' }}>
              <button
                onClick={onExploreProjects}
                className="btn-primary-green"
                style={{ fontSize: '1rem', padding: '0.95rem 2rem' }}
              >
                <span>Explore Good Works</span>
                <ArrowRightIcon size={18} />
              </button>

              <button
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-glass"
                style={{ fontSize: '1rem', padding: '0.95rem 1.8rem' }}
              >
                <span>Read Mama Pokua's Story</span>
              </button>
            </div>

            {/* Popular Constituent Endorsement Note */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                paddingTop: '0.5rem',
                color: 'rgba(255, 255, 255, 0.65)',
                fontSize: '0.85rem',
              }}
            >
              <SparklesIcon size={18} className="text-[#C5A059]" />
              <span>Affectionately known as <em>&quot;Mama Pokua&quot;</em> — A mother for all, a champion for the youth.</span>
            </div>
          </div>

          {/* Right Column: High Quality Portrait of the MP with Elegant Gold Framing */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
              }}
            >
              {/* Backing Gold & Green Ambient Border */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '28px',
                  background: 'linear-gradient(135deg, rgba(0, 107, 63, 0.6) 0%, rgba(197, 160, 89, 0.7) 50%, rgba(206, 17, 38, 0.5) 100%)',
                  filter: 'blur(8px)',
                  opacity: 0.85,
                }}
              />

              {/* Main Portrait Container */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85)',
                  backgroundColor: '#1A1A1A',
                  aspectRatio: '4 / 5',
                }}
              >
                <img
                  src={H2Img}
                  alt={MP_DETAILS.fullName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                  }}
                />

                {/* Soft Dark Vignette Gradient Overlay for Maximum Readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(17, 17, 17, 0.65) 75%, rgba(17, 17, 17, 0.95) 100%)',
                  }}
                />

                {/* Overlay Floating Tag on Image */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    right: '1.25rem',
                    backgroundColor: 'rgba(17, 17, 17, 0.82)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'var(--font-serif)' }}>
                      Hon. Queenstar Maame Pokua Sawyerr
                    </div>
                    <div style={{ color: '#C5A059', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                      MEMBER OF PARLIAMENT • AGONA EAST
                    </div>
                  </div>

                  {/* NDC Dual Dot */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#006B3F' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#CE1126' }} />
                  </div>
                </div>
              </div>

              {/* Floating Badge: Dedicated Service */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '-1rem',
                  backgroundColor: 'rgba(0, 107, 63, 0.92)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  boxShadow: '0 10px 24px rgba(0, 107, 63, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C5A059' }} />
                <span>Servant of Agona East</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero Ticker: Key Impact Metrics */}
        <div
          style={{
            marginTop: '2rem',
            padding: '1.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(14px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {QUICK_STATS.map((stat, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                borderRight: idx < QUICK_STATS.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                paddingRight: '1rem',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.4rem)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 800,
                  color: '#C5A059',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem' }}>
                {stat.label}
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.78rem' }}>
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
