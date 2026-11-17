import React from 'react';
import { motion } from 'motion/react';
import { useSiteData } from '../hooks/useSiteData';
import type { PageView } from '../types';
import { ArrowRightIcon, QuoteIcon, AwardIcon, ShieldIcon, BookIcon, UsersIcon } from './Icons';

interface AboutSectionProps {
  onNavigate: (page: PageView) => void;
}

const APPLE_SPRING = { type: 'spring' as const, bounce: 0, duration: 0.44 };

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { mpDetails } = useSiteData();
  const keyRoles = [
    {
      title: 'Member of Parliament, Agona East',
      subtitle: 'Serving 3 Consecutive Terms (2012, 2016, 2020 to Date)',
      icon: <AwardIcon size={18} className="text-[#007A43]" />,
    },
    {
      title: 'Former Deputy Central Regional Minister',
      subtitle: 'Government of Ghana, Ministry of Local Government & Regional Administration',
      icon: <ShieldIcon size={18} className="text-[#007A43]" />,
    },
    {
      title: 'Parliamentary Committee Member',
      subtitle: 'Youth, Sports & Culture Committee | Privileges Committee of Parliament',
      icon: <BookIcon size={18} className="text-[#007A43]" />,
    },
    {
      title: 'Grassroots Development Champion',
      subtitle: 'Founder of Maame Pokua School Support & Women Micro-Finance Initiative',
      icon: <UsersIcon size={18} className="text-[#007A43]" />,
    },
  ];

  return (
    <section
      id="about"
      style={{
        backgroundColor: 'var(--bg-cream)',
        paddingTop: 'clamp(4.5rem, 7vw, 6.5rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 6.5rem)',
        position: 'relative',
      }}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={APPLE_SPRING}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ width: '12px', height: '2px', backgroundColor: 'var(--ndc-green)' }} />
            <span>Dedicated Service &amp; Leadership</span>
            <span style={{ width: '12px', height: '2px', backgroundColor: 'var(--ndc-red)' }} />
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

          <div className="ndc-accent-ribbon" style={{ margin: '1rem auto 0' }}>
            <div className="ribbon-green" />
            <div className="ribbon-gold" />
            <div className="ribbon-red" />
          </div>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4.25rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Portrait & Editorial Quote */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={APPLE_SPRING}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-light)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <div className="img-zoom-container" style={{ aspectRatio: '4 / 5' }}>
                <img
                  src={mpDetails.portraitAbout}
                  alt={mpDetails.fullName}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                />
              </div>

              <div
                style={{
                  padding: '1.85rem 2rem',
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid var(--border-light)',
                }}
              >
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <QuoteIcon size={30} className="text-[#007A43] flex-shrink-0" />
                  <div>
                    <blockquote
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.08rem',
                        fontStyle: 'italic',
                        color: 'var(--rich-black)',
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      &quot;{mpDetails.aboutQuote || 'Leadership is about service to the vulnerable. When we empower a child with education and support a mother with dignity, we build a nation.'}&quot;
                    </blockquote>
                    <cite
                      style={{
                        display: 'block',
                        marginTop: '0.7rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--ndc-green)',
                        fontStyle: 'normal',
                      }}
                    >
                      — {mpDetails.fullName}
                    </cite>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative + Clean Hairline Role List */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ ...APPLE_SPRING, delay: 0.06 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.65rem' }}
          >
            <div>
              <span
                style={{
                  color: 'var(--ndc-green)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                Biography Overview
              </span>

              <h3
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontFamily: 'var(--font-serif)',
                  marginTop: '0.35rem',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                Championing Agona East with Relentless Dedication
              </h3>

              <p style={{ fontSize: '1.03rem', color: '#3F4742', marginBottom: '1rem', lineHeight: 1.75 }}>
                Affectionately called <strong>&quot;Mama Pokua&quot;</strong>, Hon. Queenstar Maame Pokua Sawyerr has
                dedicated her life to the socio-economic empowerment of Agona East. First elected to Parliament in 2012,
                she has consistently proven that effective leadership begins with genuine presence among the people.
              </p>

              <p style={{ fontSize: '1.03rem', color: '#3F4742', lineHeight: 1.75 }}>
                From serving as Deputy Central Regional Minister to championing education, maternal healthcare, clean water,
                and microfinance for market women, she represents the gold standard of compassionate servant leadership.
              </p>
            </div>

            <div>
              <h4
                style={{
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                  color: 'var(--muted-gray)',
                }}
              >
                Distinguished Roles &amp; Responsibilities
              </h4>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                }}
              >
                {keyRoles.map((role, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.9rem',
                      borderTop: idx > 0 ? '1px solid var(--border-light)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--bg-warm-gray)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {role.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--rich-black)' }}>
                        {role.title}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--muted-gray)', marginTop: '0.15rem' }}>
                        {role.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: '0.4rem' }}>
              <button
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary-green"
              >
                <span>More About Mama Pokua</span>
                <ArrowRightIcon size={17} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
