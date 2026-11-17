import React from 'react';
import { useSiteData } from '../hooks/useSiteData';
import type { PageView } from '../types';
import {
  ArrowLeftIcon,
  QuoteIcon,
  ShieldIcon,
  BookIcon,
  UsersIcon,
  HeartIcon,
  TrendingUpIcon,
  ScaleIcon,
} from './Icons';

interface DedicatedAboutPageProps {
  onBack: () => void;
  onNavigate: (page: PageView) => void;
}

export const DedicatedAboutPage: React.FC<DedicatedAboutPageProps> = ({ onBack, onNavigate }) => {
  const { mpDetails, coreValues, timelineMilestones } = useSiteData();
  const renderIcon = (name: string) => {
    switch (name) {
      case 'heart':
        return <HeartIcon size={22} className="text-[#006B3F]" />;
      case 'book':
        return <BookIcon size={22} className="text-[#006B3F]" />;
      case 'trending-up':
        return <TrendingUpIcon size={22} className="text-[#006B3F]" />;
      case 'shield':
        return <ShieldIcon size={22} className="text-[#006B3F]" />;
      case 'users':
        return <UsersIcon size={22} className="text-[#006B3F]" />;
      case 'scale':
        return <ScaleIcon size={22} className="text-[#006B3F]" />;
      default:
        return <HeartIcon size={22} className="text-[#006B3F]" />;
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-cream)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Top Banner Navigation */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-light)', padding: '1rem 0' }}>
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--ndc-green)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              padding: '0.4rem 0',
            }}
          >
            <ArrowLeftIcon size={18} />
            <span>Back to Home</span>
          </button>

          <span className="pill-category">Official Biography</span>
        </div>
      </div>

      {/* Hero Header */}
      <div
        style={{
          backgroundColor: '#111111',
          color: '#FFFFFF',
          padding: '4.5rem 0 4rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 80% 30%, rgba(0, 107, 63, 0.35) 0%, #111111 85%)',
            zIndex: 1,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#006B3F' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CE1126' }} />
              <span style={{ color: '#C5A059', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Life, Vision &amp; Public Stewardship
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '1rem',
              }}
            >
              Hon. Queenstar Maame Pokua Sawyerr
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              A visionary leader, grassroots advocate, and maternal pillar steadfastly uplifting Agona East with dignity,
              education, and economic empowerment.
            </p>

            <div className="ndc-accent-ribbon" style={{ maxWidth: '140px', height: '4px' }}>
              <div className="ribbon-green" />
              <div className="ribbon-gold" />
              <div className="ribbon-red" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="container-custom" style={{ marginTop: '3.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Portrait & Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '4px solid #FFFFFF',
                backgroundColor: '#FFFFFF',
              }}
            >
              <img
                src={mpDetails.portraitAbout}
                alt={mpDetails.fullName}
                style={{ width: '100%', height: 'auto', maxHeight: '520px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontWeight: 800, fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--rich-black)' }}>
                  &quot;Mama Pokua&quot;
                </div>
                <div style={{ color: 'var(--ndc-green)', fontWeight: 600, fontSize: '0.85rem' }}>
                  Member of Parliament • Agona East Constituency
                </div>
                <div style={{ color: '#88827C', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  Former Deputy Central Regional Minister
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid var(--border-light)',
                borderLeft: '5px solid #006B3F',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <QuoteIcon size={30} className="text-[#C5A059]" />
              <blockquote
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  color: 'var(--rich-black)',
                  margin: '0.75rem 0',
                  lineHeight: 1.6,
                }}
              >
                &quot;To serve is to identify with the struggles of the humble. When our farmers prosper and our children excel
                in school, Ghana is strengthened.&quot;
              </blockquote>
            </div>

            {/* Parliamentary Committee Responsibilities */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--rich-black)', marginBottom: '1rem' }}>
                Parliamentary Assignments
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#443F3A' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#006B3F' }} />
                  <strong>Privileges Committee:</strong> Promoting ethical legislative conduct
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#443F3A' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#006B3F' }} />
                  <strong>Youth, Sports &amp; Culture Committee:</strong> Youth empowerment policies
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#443F3A' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#006B3F' }} />
                  <strong>Gender &amp; Children:</strong> Maternal and infant health advocate
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#443F3A' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#006B3F' }} />
                  <strong>Central Regional Parliamentary Caucus:</strong> Regional development coordination
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Narrative Biography & Legislative Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', gridColumn: 'span 2' }}>
            {/* Story Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '3rem 2.5rem',
                borderRadius: '24px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.85rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--rich-black)',
                  marginBottom: '1.25rem',
                }}
              >
                The Story Behind the Leader
              </h2>

              <p style={{ fontSize: '1.1rem', color: '#443F3A', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Hon. Queenstar Maame Pokua Sawyerr was born in Agona Nsaba in the Central Region of Ghana. Raised in a family
                grounded in discipline, communal empathy, and faith, she developed an early passion for social welfare and
                entrepreneurial leadership.
              </p>

              <p style={{ fontSize: '1.1rem', color: '#443F3A', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Before entering parliamentary politics, she excelled in private enterprise and social philanthropy, creating
                jobs and supporting vulnerable households. In 2012, answering the passionate call of the elders, market women,
                and youth of Agona East, she contested and won the parliamentary seat under the ticket of the National Democratic Congress (NDC).
              </p>

              <p style={{ fontSize: '1.1rem', color: '#443F3A', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Following her legislative victory, H.E. John Dramani Mahama appointed her Deputy Central Regional Minister,
                where she worked hand-in-hand with municipal and district assemblies to supervise school infrastructure, rural
                water schemes, and community clinics across the region.
              </p>

              <p style={{ fontSize: '1.1rem', color: '#443F3A', lineHeight: 1.85 }}>
                In 2016 and 2020, her constituents decisively renewed her mandate. Over more than a decade of uninterrupted
                parliamentary service, she has earned the moniker &quot;Mama Pokua&quot; for her motherly care, approachable nature,
                and unyielding commitment to education and women&#39;s empowerment.
              </p>
            </div>

            {/* Core Values Deep Dive */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '3rem 2.5rem',
                borderRadius: '24px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.85rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--rich-black)',
                  marginBottom: '1.5rem',
                }}
              >
                Guiding Principles of Mama Pokua
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                {coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1.5rem',
                      backgroundColor: 'var(--bg-cream)',
                      borderRadius: '16px',
                      border: '1px solid rgba(232, 227, 220, 0.9)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(0, 107, 63, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {renderIcon(val.iconName)}
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--rich-black)' }}>
                        {val.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#66615C', margin: 0, lineHeight: 1.6 }}>
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Political Timeline & Milestones */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '3rem 2.5rem',
                borderRadius: '24px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.85rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--rich-black)',
                  marginBottom: '1.5rem',
                }}
              >
                Chronology of Dedicated Public Service
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
                {timelineMilestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      position: 'relative',
                    }}
                  >
                    {/* Year badge */}
                    <div style={{ flexShrink: 0 }}>
                      <div
                        style={{
                          backgroundColor: 'var(--ndc-green)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '0.9rem',
                          padding: '0.5rem 1rem',
                          borderRadius: '12px',
                          fontFamily: 'var(--font-serif)',
                          boxShadow: '0 4px 12px rgba(0, 107, 63, 0.25)',
                          textAlign: 'center',
                          minWidth: '90px',
                        }}
                      >
                        {milestone.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      style={{
                        paddingBottom: '1.5rem',
                        borderBottom: idx < timelineMilestones.length - 1 ? '1px solid var(--border-light)' : 'none',
                        flex: 1,
                      }}
                    >
                      <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--rich-black)', margin: '0 0 0.25rem 0' }}>
                        {milestone.title}
                      </h3>
                      <div style={{ fontSize: '0.85rem', color: '#C5A059', fontWeight: 700, marginBottom: '0.5rem' }}>
                        {milestone.role}
                      </div>
                      <p style={{ fontSize: '0.95rem', color: '#55504A', lineHeight: 1.65, margin: 0 }}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  onNavigate('impact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary-green"
              >
                <span>Explore Good Works &amp; Projects</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-outline-gold"
              >
                <span>Connect With Mama Pokua</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
