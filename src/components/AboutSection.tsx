import React from 'react';
import { MP_DETAILS } from '../data/mockData';
import type { PageView } from '../types';
import { ArrowRightIcon, QuoteIcon, AwardIcon, ShieldIcon, BookIcon, UsersIcon } from './Icons';
import H2Img from '../assets/H2.jpg';

interface AboutSectionProps {
  onNavigate: (page: PageView) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const keyRoles = [
    {
      title: 'Member of Parliament, Agona East',
      subtitle: 'Serving 3 Consecutive Terms (2012, 2016, 2020 to Date)',
      icon: <AwardIcon size={18} className="text-[#006B3F]" />,
    },
    {
      title: 'Former Deputy Central Regional Minister',
      subtitle: 'Government of Ghana, Ministry of Local Government & Regional Administration',
      icon: <ShieldIcon size={18} className="text-[#006B3F]" />,
    },
    {
      title: 'Parliamentary Committee Member',
      subtitle: 'Youth, Sports & Culture Committee | Privileges Committee of Parliament',
      icon: <BookIcon size={18} className="text-[#006B3F]" />,
    },
    {
      title: 'Grassroots Development Champion',
      subtitle: 'Founder of Maame Pokua School Support & Women Micro-Finance Initiative',
      icon: <UsersIcon size={18} className="text-[#006B3F]" />,
    },
  ];

  return (
    <section
      id="about"
      style={{
        backgroundColor: 'var(--bg-cream)',
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
        position: 'relative',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ width: '12px', height: '2px', backgroundColor: '#006B3F' }} />
            <span>Dedicated Service &amp; Leadership</span>
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
            A Life of Compassion, Service &amp; Advocacy
          </h2>

          <div className="ndc-accent-ribbon" style={{ margin: '0.85rem auto 0', maxWidth: '100px' }}>
            <div className="ribbon-green" />
            <div className="ribbon-gold" />
            <div className="ribbon-red" />
          </div>
        </div>

        {/* Clean Two-Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Portrait and Prominent Quote */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid #FFFFFF',
                backgroundColor: '#FFFFFF',
              }}
            >
              <div className="img-zoom-container" style={{ aspectRatio: '4 / 5' }}>
                <img
                  src={H2Img}
                  alt={MP_DETAILS.fullName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Prominent Quote from the MP */}
              <div
                style={{
                  padding: '2rem',
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid var(--border-light)',
                }}
              >
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <QuoteIcon size={34} className="text-[#006B3F] flex-shrink-0" />
                  <div>
                    <blockquote
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.12rem',
                        fontStyle: 'italic',
                        color: 'var(--rich-black)',
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      &quot;Leadership is about service to the vulnerable. When we empower a child with education
                      and support a mother with dignity, we build a nation.&quot;
                    </blockquote>
                    <cite
                      style={{
                        display: 'block',
                        marginTop: '0.75rem',
                        fontSize: '0.88rem',
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
          </div>

          {/* Right Column: Short Personal Story + Key Roles + "More About" Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div>
              <span
                style={{
                  color: 'var(--ndc-green)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                Biography Overview
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
                Championing Agona East with Relentless Dedication
              </h3>

              <p style={{ fontSize: '1.05rem', color: '#443F3A', marginBottom: '1rem', lineHeight: 1.8 }}>
                Affectionately called <strong>&quot;Mama Pokua&quot;</strong>, Hon. Queenstar Maame Pokua Sawyerr has
                dedicated her life to the socio-economic empowerment of Agona East. First elected to Parliament in 2012,
                she has consistently proven that effective leadership begins with genuine presence among the people.
              </p>

              <p style={{ fontSize: '1.05rem', color: '#443F3A', lineHeight: 1.8 }}>
                From serving as Deputy Central Regional Minister to championing education, maternal healthcare, clean water,
                and microfinance for market women, she represents the gold standard of compassionate servant leadership.
              </p>
            </div>

            {/* Key Roles Listed Elegantly */}
            <div>
              <h4
                style={{
                  fontSize: '1.05rem',
                  fontFamily: 'var(--font-serif)',
                  marginBottom: '1rem',
                  color: 'var(--rich-black)',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '0.5rem',
                }}
              >
                Distinguished Roles &amp; Responsibilities
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {keyRoles.map((role, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--bg-warm-gray)',
                      padding: '1rem 1.25rem',
                      borderRadius: '14px',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      {role.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--rich-black)' }}>
                        {role.title}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#66615C', marginTop: '0.15rem' }}>
                        {role.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* "More About" Button */}
            <div style={{ paddingTop: '0.75rem' }}>
              <button
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary-green"
              >
                <span>More About Mama Pokua</span>
                <ArrowRightIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
