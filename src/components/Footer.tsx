import React, { useState } from 'react';
import type { PageView } from '../types';
import { useSiteData } from '../hooks/useSiteData';
import { ArrowRightIcon, FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, CheckIcon } from './Icons';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { mpDetails, subscribeNewsletter } = useSiteData();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || submitting) return;
    setSubmitting(true);
    setSubscribeError(null);
    const res = await subscribeNewsletter(newsletterEmail, 'footer');
    setSubmitting(false);
    if (res.ok) {
      setSubscribed(true);
      setNewsletterEmail('');
    } else {
      setSubscribeError(res.error || 'Subscription failed.');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#0D0D0D',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top NDC Dual Accent Ribbon */}
      <div style={{ height: '4px', width: '100%', display: 'flex' }}>
        <div style={{ flex: 1, backgroundColor: '#006B3F' }} />
        <div style={{ width: '12px', backgroundColor: '#C5A059' }} />
        <div style={{ flex: 1, backgroundColor: '#CE1126' }} />
      </div>

      <div className="container-custom" style={{ paddingTop: '5rem', paddingBottom: '3.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand & Mission Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #006B3F 0%, #004D2C 100%)',
                  border: '1.5px solid #C5A059',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                }}
              >
                QP
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.15rem' }}>
                  Hon. Queenstar Sawyerr
                </div>
                <div style={{ color: '#C5A059', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                  MEMBER OF PARLIAMENT • AGONA EAST
                </div>
              </div>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
              &quot;Dedicated to People. Committed to Progress.&quot; Serving Agona East through grassroots empowerment,
              accessible education, maternal healthcare, and sustainable economic dignity.
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
              <a
                href={mpDetails.socialLinks?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                }}
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href={mpDetails.socialLinks?.x || 'https://x.com'}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                }}
                aria-label="Twitter X"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href={mpDetails.socialLinks?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                }}
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={mpDetails.socialLinks?.youtube || 'https://youtube.com'}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                }}
                aria-label="YouTube"
              >
                <YoutubeIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h4
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-serif)',
                color: '#C5A059',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.5rem',
              }}
            >
              Navigation
            </h4>

            {[
              { label: 'Home Page', page: 'home' as PageView },
              { label: 'About Mama Pokua', page: 'about' as PageView },
              { label: 'Impact & Projects', page: 'impact' as PageView },
              { label: 'News & Press Releases', page: 'news' as PageView },
              { label: "The MP's Notebook (Blog)", page: 'blog' as PageView },
              { label: 'Community Photo Gallery', page: 'gallery' as PageView },
              { label: 'Constituent Secretariat', page: 'contact' as PageView },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  color: 'rgba(255, 255, 255, 0.72)',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)';
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Key Interventions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h4
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-serif)',
                color: '#C5A059',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.5rem',
              }}
            >
              Key Initiatives
            </h4>
            <div style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.88rem' }}>
              • Maame Pokua BECE Exam Support
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.88rem' }}>
              • Agona East Women Microfinance
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.88rem' }}>
              • Rural CHPS Solar Electrification
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.88rem' }}>
              • Clean Solar Water Boreholes
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.88rem' }}>
              • Youth Apprenticeship &amp; Tool Kits
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-serif)',
                color: '#C5A059',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0,
              }}
            >
              Constituency Newsletter
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
              Receive monthly digital bulletins on projects, scholarships, and parliamentary votes directly in your inbox.
            </p>

            {subscribed ? (
              <div
                style={{
                  backgroundColor: 'rgba(0, 107, 63, 0.2)',
                  border: '1px solid #006B3F',
                  borderRadius: '12px',
                  padding: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#8DF5C1',
                  fontSize: '0.85rem',
                }}
              >
                <CheckIcon size={16} />
                <span>Thank you for subscribing to Agona East updates!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      backgroundColor: '#006B3F',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      padding: '0.75rem 1rem',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-label="Subscribe"
                  >
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
                {subscribeError && (
                  <span style={{ fontSize: '0.75rem', color: '#FCA5A5' }}>
                    {subscribeError}
                  </span>
                )}
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)' }}>
                  We respect your privacy. No spam.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Office of Hon. Queenstar Maame Pokua Sawyerr, MP. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span>Agona East Constituency</span>
            <span>•</span>
            <span>Central Region, Ghana</span>
            <span>•</span>
            <span style={{ color: '#006B3F', fontWeight: 700 }}>NDC Parliamentary Caucus</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
