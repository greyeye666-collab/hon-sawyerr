import React, { useId, useState } from 'react';
import { motion } from 'motion/react';
import { MP_DETAILS, CONSTITUENCY_TOWNS } from '../data/mockData';
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  CheckCircleIcon,
} from './Icons';

const APPLE_SPRING = { type: 'spring' as const, bounce: 0, duration: 0.42 };

export const ContactSection: React.FC = () => {
  const uid = useId();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    town: CONSTITUENCY_TOWNS[0],
    category: 'Constituent Assistance',
    message: '',
    volunteer: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    const randomRef = `AE-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefNumber(randomRef);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      town: CONSTITUENCY_TOWNS[0],
      category: 'Constituent Assistance',
      message: '',
      volunteer: false,
    });
    setSubmitted(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.82rem 1rem',
    borderRadius: '12px',
    border: '1px solid rgba(17, 20, 18, 0.14)',
    fontSize: '0.94rem',
    fontFamily: 'inherit',
    backgroundColor: 'var(--bg-cream)',
    transition: 'border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease',
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: 'var(--bg-cream)',
        paddingTop: 'clamp(4.5rem, 7vw, 6.5rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 6.5rem)',
        position: 'relative',
        borderTop: '1px solid var(--border-light)',
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
            <span>Accessible Leadership &amp; Grassroots Service</span>
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
            Contact &amp; Get Involved
          </h2>

          <p style={{ maxWidth: '620px', margin: '0.85rem auto 0', color: '#525A55', fontSize: '1.03rem' }}>
            Whether you require constituent assistance, have a community proposal, or want to join Mama Pokua&#39;s volunteer corps, we are here for you.
          </p>

          <div className="ndc-accent-ribbon" style={{ margin: '1.15rem auto 0' }}>
            <div className="ribbon-green" />
            <div className="ribbon-gold" />
            <div className="ribbon-red" />
          </div>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.75rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Contact Form */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '22px',
              padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-light)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }} role="status">
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 122, 67, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}
                >
                  <CheckCircleIcon size={34} className="text-[#007A43]" />
                </div>

                <h3
                  style={{
                    fontSize: '1.6rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--ndc-green)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Message Received With Gratitude!
                </h3>

                <p style={{ color: '#4F5752', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.fullName}</strong>. Your communication has been recorded for the Agona East
                  Constituency Secretariat and Parliamentary Desk.
                </p>

                <div
                  style={{
                    backgroundColor: 'var(--bg-warm-gray)',
                    padding: '1rem 1.5rem',
                    borderRadius: '14px',
                    border: '1px solid var(--border-subtle)',
                    display: 'inline-block',
                    marginBottom: '2rem',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted-gray)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Inquiry Reference Number
                  </div>
                  <div style={{ fontSize: '1.28rem', fontWeight: 800, color: 'var(--rich-black)', letterSpacing: '0.04em' }}>
                    {refNumber}
                  </div>
                </div>

                <div>
                  <button onClick={handleReset} className="btn-primary-green">
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontFamily: 'var(--font-serif)',
                      marginBottom: '0.25rem',
                      color: 'var(--rich-black)',
                    }}
                  >
                    Direct Message to Mama Pokua
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted-gray)' }}>
                    All constituent matters are handled with strict confidentiality and dedicated attention.
                  </p>
                </div>

                <div>
                  <label htmlFor={`${uid}-name`} style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                    Full Name *
                  </label>
                  <input
                    id={`${uid}-name`}
                    type="text"
                    required
                    placeholder="e.g. Kwame Mensah"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label htmlFor={`${uid}-phone`} style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      id={`${uid}-phone`}
                      type="tel"
                      required
                      placeholder="+233 24 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor={`${uid}-email`} style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                      Email Address
                    </label>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label htmlFor={`${uid}-town`} style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                      Community / Town in Agona East
                    </label>
                    <select
                      id={`${uid}-town`}
                      value={formData.town}
                      onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                      style={inputStyle}
                    >
                      {CONSTITUENCY_TOWNS.map((town) => (
                        <option key={town} value={town}>
                          {town}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`${uid}-category`} style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                      Nature of Inquiry
                    </label>
                    <select
                      id={`${uid}-category`}
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={inputStyle}
                    >
                      <option value="Constituent Assistance">Constituent Assistance</option>
                      <option value="Community Project Suggestion">Community Project Suggestion</option>
                      <option value="Women Micro-Grant Inquiry">Women Micro-Grant Inquiry</option>
                      <option value="BECE / School Support">BECE / School Support</option>
                      <option value="Media & Press Interview">Media &amp; Press Interview</option>
                      <option value="Other Inquiries">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor={`${uid}-message`} style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                    Your Message / Request *
                  </label>
                  <textarea
                    id={`${uid}-message`}
                    required
                    rows={4}
                    placeholder="Describe how Hon. Sawyerr and the constituency secretariat can assist you or your community..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <label htmlFor={`${uid}-volunteer`} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    id={`${uid}-volunteer`}
                    type="checkbox"
                    checked={formData.volunteer}
                    onChange={(e) => setFormData({ ...formData, volunteer: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--ndc-green)' }}
                  />
                  <span>I want to join Mama Pokua&#39;s grassroots volunteer and campaign team.</span>
                </label>

                <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn-primary-green" style={{ flex: 1 }}>
                    Submit Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, volunteer: true })}
                    className="btn-primary-red"
                  >
                    Join Volunteer Team
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Office Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '22px',
                padding: '2rem',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.65rem' }}>
                <span className="pill-category">Constituency Office</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-gray)' }}>Agona East</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--rich-black)', marginBottom: '0.85rem' }}>
                Agona East Secretariat
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#4F5752' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <MapPinIcon size={18} className="text-[#007A43] flex-shrink-0" />
                  <span>{MP_DETAILS.officeAddress}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <PhoneIcon size={18} className="text-[#007A43] flex-shrink-0" />
                  <span>Hotline: {MP_DETAILS.hotlinePhone} / {MP_DETAILS.constituencyPhone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <MailIcon size={18} className="text-[#007A43] flex-shrink-0" />
                  <span>{MP_DETAILS.officeEmail}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <ClockIcon size={18} className="text-[#007A43] flex-shrink-0" />
                  <span>Mon – Fri: 8:30 AM – 5:00 PM (Constituent surgery on Saturdays)</span>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '22px',
                padding: '2rem',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.65rem' }}>
                <span className="pill-red">Parliamentary Chamber</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted-gray)' }}>Accra</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--rich-black)', marginBottom: '0.85rem' }}>
                Parliament House of Ghana
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', color: '#4F5752' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <MapPinIcon size={18} className="text-[#D61F33] flex-shrink-0" />
                  <span>{MP_DETAILS.parliamentAddress}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <MailIcon size={18} className="text-[#D61F33] flex-shrink-0" />
                  <span>{MP_DETAILS.parliamentEmail}</span>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#111412',
                color: '#FFFFFF',
                borderRadius: '22px',
                padding: '2rem',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-serif)',
                  color: '#FFFFFF',
                  marginBottom: '0.4rem',
                }}
              >
                Official Social Media Channels
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Follow Hon. Queenstar Maame Pokua Sawyerr for daily updates, live floor appearances, and community broadcasts.
              </p>

              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn-glass" style={{ padding: '0.52rem 0.95rem', fontSize: '0.82rem' }}>
                  <FacebookIcon size={15} />
                  <span>Facebook</span>
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="btn-glass" style={{ padding: '0.52rem 0.95rem', fontSize: '0.82rem' }}>
                  <TwitterIcon size={15} />
                  <span>Twitter (X)</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn-glass" style={{ padding: '0.52rem 0.95rem', fontSize: '0.82rem' }}>
                  <InstagramIcon size={15} />
                  <span>Instagram</span>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn-glass" style={{ padding: '0.52rem 0.95rem', fontSize: '0.82rem' }}>
                  <YoutubeIcon size={15} />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
