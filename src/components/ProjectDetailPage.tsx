import React from 'react';
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
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);

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
            {/* Primary Featured Image */}
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '4px solid #FFFFFF',
                backgroundColor: '#FFFFFF',
                maxHeight: '480px',
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
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
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontFamily: 'var(--font-serif)',
                    marginBottom: '1.25rem',
                    color: 'var(--rich-black)',
                  }}
                >
                  Project Visual Documentation
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {project.galleryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="img-zoom-container"
                      style={{
                        height: '200px',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <img src={imgUrl} alt={`${project.title} visual ${idx + 1}`} />
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
    </div>
  );
};
