import React, { useState } from 'react';
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

export const ContactSection: React.FC = () => {
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

    // Generate random reference number
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

  return (
    <section
      id="contact"
      style={{
        backgroundColor: 'var(--bg-cream)',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ width: '12px', height: '2px', backgroundColor: '#006B3F' }} />
            <span>Accessible Leadership &amp; Grassroots Service</span>
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
            Connect With Mama Pokua &amp; The Office
          </h2>

          <p style={{ maxWidth: '620px', margin: '0.75rem auto 0', color: '#66615C', fontSize: '1.05rem' }}>
            Whether you have a community project suggestion, require constituent assistance, or wish to join our volunteer network, our doors are always wide open.
          </p>

          <div className="ndc-accent-ribbon" style={{ margin: '1rem auto 0', maxWidth: '100px' }}>
            <div className="ribbon-green" />
            <div className="ribbon-gold" />
            <div className="ribbon-red" />
          </div>
        </div>

        {/* Two-Column Grid: Form + Office Details */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Elegant Contact Form */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-light)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 107, 63, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}
                >
                  <CheckCircleIcon size={36} className="text-[#006B3F]" />
                </div>

                <h3
                  style={{
                    fontSize: '1.65rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--ndc-green)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Message Received With Gratitude!
                </h3>

                <p style={{ color: '#55504A', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.fullName}</strong>. Your communication has been dispatched to the Agona East
                  Constituency Secretariat and Parliamentary Desk.
                </p>

                <div
                  style={{
                    backgroundColor: 'var(--bg-cream)',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px dashed #C5A059',
                    display: 'inline-block',
                    marginBottom: '2rem',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', color: '#88827C', textTransform: 'uppercase', fontWeight: 600 }}>
                    Inquiry Reference Ticket
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--rich-black)', letterSpacing: '0.05em' }}>
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
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3
                    style={{
                      fontSize: '1.4rem',
                      fontFamily: 'var(--font-serif)',
                      marginBottom: '0.25rem',
                      color: 'var(--rich-black)',
                    }}
                  >
                    Send a Message to Mama Pokua
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#77726C' }}>
                    Please fill out the form below. All constituent matters are handled with strict privacy and care.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwame Mensah"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border-light)',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      backgroundColor: 'var(--bg-cream)',
                    }}
                  />
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+233 24 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.95rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        backgroundColor: 'var(--bg-cream)',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.95rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        backgroundColor: 'var(--bg-cream)',
                      }}
                    />
                  </div>
                </div>

                {/* Town & Category */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                      Community / Town in Agona East
                    </label>
                    <select
                      value={formData.town}
                      onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        backgroundColor: 'var(--bg-cream)',
                      }}
                    >
                      {CONSTITUENCY_TOWNS.map((town) => (
                        <option key={town} value={town}>
                          {town}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                      Nature of Inquiry
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.92rem',
                        fontFamily: 'inherit',
                        outline: 'none',
                        backgroundColor: 'var(--bg-cream)',
                      }}
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

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--rich-black)' }}>
                    Your Message / Proposal *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe how Hon. Sawyerr and the constituency secretariat can assist you or your community..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border-light)',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      backgroundColor: 'var(--bg-cream)',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Volunteer Checkbox */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.volunteer}
                    onChange={(e) => setFormData({ ...formData, volunteer: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--ndc-green)' }}
                  />
                  <span>I would like to volunteer for Mama Pokua&#39;s grassroots community initiatives.</span>
                </label>

                {/* Submit Button */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn-primary-green" style={{ flex: 1 }}>
                    Submit Communication
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, volunteer: true });
                    }}
                    className="btn-primary-red"
                    style={{ flexShrink: 0 }}
                  >
                    Join Volunteer Team
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Office Locations & Social Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Agona East Secretariat Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '2rem',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                borderLeft: '5px solid var(--ndc-green)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="pill-category">Local Office</span>
                <span style={{ fontSize: '0.8rem', color: '#88827C' }}>Agona East</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--rich-black)', marginBottom: '0.75rem' }}>
                Agona East Constituency Secretariat
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#55504A' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <MapPinIcon size={18} className="text-[#006B3F] flex-shrink-0" />
                  <span>{MP_DETAILS.officeAddress}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <PhoneIcon size={18} className="text-[#006B3F] flex-shrink-0" />
                  <span>Hotline: {MP_DETAILS.hotlinePhone} / {MP_DETAILS.constituencyPhone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <MailIcon size={18} className="text-[#006B3F] flex-shrink-0" />
                  <span>{MP_DETAILS.officeEmail}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <ClockIcon size={18} className="text-[#006B3F] flex-shrink-0" />
                  <span>Mon – Fri: 8:30 AM – 5:00 PM (Constituent surgery on Saturdays)</span>
                </div>
              </div>
            </div>

            {/* Parliamentary Office Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '2rem',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                borderLeft: '5px solid var(--ndc-red)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="pill-red">Parliamentary Chambers</span>
                <span style={{ fontSize: '0.8rem', color: '#88827C' }}>Accra</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--rich-black)', marginBottom: '0.75rem' }}>
                Parliament House of Ghana
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#55504A' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <MapPinIcon size={18} className="text-[#CE1126] flex-shrink-0" />
                  <span>{MP_DETAILS.parliamentAddress}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <MailIcon size={18} className="text-[#CE1126] flex-shrink-0" />
                  <span>{MP_DETAILS.parliamentEmail}</span>
                </div>
              </div>
            </div>

            {/* Social Media & Direct Connection */}
            <div
              style={{
                backgroundColor: '#111111',
                color: '#FFFFFF',
                borderRadius: '24px',
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
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Follow Hon. Queenstar Maame Pokua Sawyerr for daily updates, live floor appearances, and community broadcasts.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
                >
                  <FacebookIcon size={16} />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
                >
                  <TwitterIcon size={16} />
                  <span>Twitter (X)</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
                >
                  <InstagramIcon size={16} />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
                >
                  <YoutubeIcon size={16} />
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
