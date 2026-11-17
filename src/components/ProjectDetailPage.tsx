import React, { useState } from 'react';
import type { Project, PageView } from '../types';
import { PROJECTS } from '../data/mockData';
import { ArrowLeftIcon, MapPinIcon, CalendarIcon, AwardIcon, CheckCircleIcon, QuoteIcon } from './Icons';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (p: Project) => void;
  onNavigate: (page: PageView) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onSelectProject,
  onNavigate,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);

  const heroImages =
    project.slideshowImages && project.slideshowImages.length > 0
      ? project.slideshowImages
      : [project.image];
  const [heroIndex, setHeroIndex] = useState(0);

  React.useEffect(() => {
    setHeroIndex(0);
  }, [project.id]);

  React.useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div style={{ backgroundColor: 'var(--bg-cream)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Top Banner Navigation Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-light)',
          padding: '1rem 0',
        }}
      >
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
            <span>Back to Projects Overview</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="pill-category">{project.category}</span>
            <span className="pill-gold">{project.impactMetric}</span>
          </div>
        </div>
      </div>

      {/* Main Project Hero Header */}
      <div
        style={{
          backgroundColor: '#111111',
          color: '#FFFFFF',
          padding: '4rem 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 75% 30%, rgba(0, 107, 63, 0.3) 0%, #111111 80%)',
            zIndex: 1,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '850px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: '0.85rem',
                }}
              >
                <MapPinIcon size={16} className="text-[#C5A059]" />
                <span>{project.location}</span>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: '0.85rem',
                }}
              >
                <CalendarIcon size={16} className="text-[#C5A059]" />
                <span>{project.completionYear}</span>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: '0.85rem',
                }}
              >
                <AwardIcon size={16} className="text-[#C5A059]" />
                <span>{project.beneficiariesCount}</span>
              </div>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                lineHeight: 1.2,
                color: '#FFFFFF',
                marginBottom: '1.25rem',
              }}
            >
              {project.title}
            </h1>

            <div className="ndc-accent-ribbon" style={{ maxWidth: '120px', height: '4px' }}>
              <div className="ribbon-green" />
              <div className="ribbon-gold" />
              <div className="ribbon-red" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="container-custom" style={{ marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {/* Left / Main Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', gridColumn: 'span 2' }}>
            {/* Primary Featured Image / Crossfade Gallery */}
            <div
              onClick={() => setSelectedImage(heroImages[heroIndex])}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '4px solid #FFFFFF',
                backgroundColor: '#0F1813',
                height: '440px',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              {heroImages.map((imgSrc, idx) => {
                const isActive = idx === heroIndex;
                return (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
                      pointerEvents: 'none',
                      zIndex: isActive ? 2 : 1,
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={`${project.title} - ${idx + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 30%',
                        display: 'block',
                        transform: isActive ? 'scale(1.03)' : 'scale(1)',
                        transition: 'transform 6000ms ease-out',
                      }}
                    />
                  </div>
                );
              })}

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(17, 20, 18, 0.55) 0%, transparent 45%)',
                  pointerEvents: 'none',
                  zIndex: 3,
                }}
              />

              {/* Floating Live Badge */}
              {heroImages.length > 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    zIndex: 10,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: 'rgba(12, 20, 16, 0.72)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    borderRadius: '999px',
                    padding: '0.35rem 0.9rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#009E52',
                    }}
                  />
                  <span>
                    Field Record {heroIndex + 1} of {heroImages.length}
                  </span>
                </div>
              )}

              {/* Bottom Dot Strip */}
              {heroImages.length > 1 && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.5rem',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    backgroundColor: 'rgba(12, 20, 16, 0.65)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.28rem 0.65rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {heroImages.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setHeroIndex(dotIdx)}
                      aria-label={`View photo ${dotIdx + 1}`}
                      style={{
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        width: dotIdx === heroIndex ? '20px' : '6px',
                        height: '6px',
                        borderRadius: '999px',
                        backgroundColor: dotIdx === heroIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                        transition: 'width 250ms ease, background-color 200ms ease',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* In-depth Overview Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontFamily: 'var(--font-serif)',
                  marginBottom: '1rem',
                  color: 'var(--rich-black)',
                }}
              >
                Project Context &amp; Grassroots Transformation
              </h2>

              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#443F3A',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                }}
              >
                {project.fullDescription}
              </p>

              {/* Key Highlights */}
              <div style={{ marginTop: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-serif)',
                    marginBottom: '1rem',
                    color: 'var(--ndc-green-dark)',
                  }}
                >
                  Key Milestones &amp; Outcomes
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {project.keyHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.85rem',
                        padding: '0.85rem 1rem',
                        backgroundColor: 'var(--bg-cream)',
                        borderRadius: '12px',
                        borderLeft: '4px solid var(--ndc-green)',
                      }}
                    >
                      <CheckCircleIcon size={20} className="text-[#006B3F] flex-shrink-0" />
                      <span style={{ fontSize: '0.95rem', color: '#2D2926', fontWeight: 500 }}>
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beneficiary Testimonial if available */}
              {project.testimonial && (
                <div
                  style={{
                    marginTop: '2.5rem',
                    padding: '2rem',
                    backgroundColor: 'rgba(0, 107, 63, 0.04)',
                    border: '1px solid rgba(0, 107, 63, 0.18)',
                    borderRadius: '16px',
                    position: 'relative',
                  }}
                >
                  <QuoteIcon size={32} className="text-[#C5A059]" />
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
                    &quot;{project.testimonial.quote}&quot;
                  </blockquote>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CE1126' }} />
                    <span style={{ fontWeight: 700, color: 'var(--ndc-green)', fontSize: '0.95rem' }}>
                      {project.testimonial.author}
                    </span>
                    <span style={{ color: '#88827C', fontSize: '0.85rem' }}>• {project.testimonial.role}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Photo Gallery for Project */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '2.5rem',
                  borderRadius: '20px',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: 'var(--ndc-green)',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#009E52' }} />
                      <span>Verified Field Photography</span>
                    </div>
                    <h3
                      style={{
                        fontSize: '1.5rem',
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--rich-black)',
                        margin: 0,
                      }}
                    >
                      Project Visual Documentation
                    </h3>
                  </div>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--ndc-green-dark)',
                      backgroundColor: 'rgba(0, 122, 67, 0.08)',
                      border: '1px solid rgba(0, 122, 67, 0.2)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '999px',
                      fontWeight: 600,
                    }}
                  >
                    {project.galleryImages.length} Field Records
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1.25rem',
                  }}
                >
                  {project.galleryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="img-zoom-container"
                      onClick={() => setSelectedImage(imgUrl)}
                      style={{
                        height: '220px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                        border: '1px solid rgba(17, 20, 18, 0.08)',
                        position: 'relative',
                        cursor: 'pointer',
                        backgroundColor: '#0F1813',
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt={`${project.title} field documentation ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 25%',
                          display: 'block',
                          transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(to top, rgba(12, 20, 16, 0.72) 0%, transparent 50%)',
                          opacity: 0.85,
                          transition: 'opacity 200ms ease',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '0.75rem',
                          left: '0.85rem',
                          right: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          color: '#FFFFFF',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                        }}
                      >
                        <span style={{ color: '#F3E5C2' }}>Field Record #{idx + 1}</span>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.22)',
                            backdropFilter: 'blur(4px)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '999px',
                          }}
                        >
                          Enlarge ⤢
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Quick Metrics Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--rich-black)',
                  marginBottom: '1.25rem',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '0.6rem',
                }}
              >
                Project Factsheet
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#88827C', fontWeight: 600 }}>
                    Category
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ndc-green)' }}>
                    {project.category}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#88827C', fontWeight: 600 }}>
                    Primary Location
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--rich-black)' }}>
                    {project.location}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#88827C', fontWeight: 600 }}>
                    Key Beneficiaries
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--rich-black)' }}>
                    {project.beneficiariesCount}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#88827C', fontWeight: 600 }}>
                    Status / Year
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--rich-black)' }}>
                    {project.completionYear}
                  </div>
                </div>
              </div>

              {/* Action buttons in sidebar */}
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-primary-green"
                  style={{ width: '100%' }}
                >
                  Propose Local Project
                </button>
                <button
                  onClick={onBack}
                  className="btn-subtle"
                  style={{ width: '100%' }}
                >
                  Back to All Projects
                </button>
              </div>
            </div>

            {/* Related Projects */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--rich-black)',
                  marginBottom: '1rem',
                }}
              >
                More Good Works
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProject(p);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      display: 'flex',
                      gap: '0.85rem',
                      alignItems: 'center',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      borderRadius: '12px',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-cream)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ndc-green)' }}>
                        {p.category}
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--rich-black)', lineHeight: 1.3 }}>
                        {p.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(5, 12, 8, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            cursor: 'zoom-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '920px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'default',
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '-2.75rem',
                right: '0',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
              aria-label="Close Preview"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Project documentation expanded"
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                borderRadius: '16px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
