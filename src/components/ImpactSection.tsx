import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import type { Project, PageView } from '../types';
import { PROJECTS } from '../data/mockData';
import { ArrowRightIcon, MapPinIcon, CheckIcon, SparklesIcon } from './Icons';

interface ImpactSectionProps {
  onSelectProject: (project: Project) => void;
  onNavigate: (page: PageView) => void;
}

const APPLE_SPRING = { type: 'spring' as const, bounce: 0, duration: 0.38 };

const FlagshipPhotographicPlate: React.FC<{ project: Project }> = ({ project }) => {
  const images =
    project.slideshowImages && project.slideshowImages.length > 0
      ? project.slideshowImages
      : [project.image];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Reset index when project changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [project.id]);

  // Smooth auto-fade every 3.8 seconds
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [images.length, isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        minHeight: '400px',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#0F1813',
      }}
    >
      {/* Stacked Images for Ultra-Smooth Crossfade */}
      {images.map((imgSrc, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 1100ms cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none',
              zIndex: isActive ? 2 : 1,
            }}
          >
            <img
              src={imgSrc}
              alt={`${project.title} visual ${idx + 1}`}
              loading={idx === 0 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 25%',
                display: 'block',
                transform: isActive ? 'scale(1.035)' : 'scale(1)',
                transition: 'transform 6000ms ease-out',
              }}
            />
          </div>
        );
      })}

      {/* Atmospheric Gradients for High Legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(12, 20, 16, 0.82) 0%, rgba(12, 20, 16, 0.22) 35%, transparent 60%), linear-gradient(to bottom, rgba(12, 20, 16, 0.45) 0%, transparent 30%)',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      {/* Top Floating Badge with Live Counter */}
      {images.length > 1 && (
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
            padding: '0.32rem 0.85rem',
            fontSize: '0.74rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#009E52',
              boxShadow: '0 0 6px #009E52',
            }}
          />
          <span>Field Photo {currentIndex + 1} of {images.length}</span>
        </div>
      )}

      {/* Bottom Interactive Dot Strip */}
      {images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '3.75rem',
            left: '1.5rem',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            backgroundColor: 'rgba(12, 20, 16, 0.65)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '0.3rem 0.65rem',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          {images.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(dotIdx);
              }}
              aria-label={`View photo ${dotIdx + 1}`}
              style={{
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                width: dotIdx === currentIndex ? '22px' : '7px',
                height: '7px',
                borderRadius: '999px',
                backgroundColor: dotIdx === currentIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                transition: 'width 260ms cubic-bezier(0.22, 1, 0.36, 1), background-color 200ms ease',
              }}
            />
          ))}
        </div>
      )}

      {/* Bottom Metadata Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: '#F3E5C2',
            fontSize: '0.82rem',
            fontWeight: 500,
          }}
        >
          <MapPinIcon size={14} className="text-[#C9963B]" />
          <span>{project.location}</span>
        </div>
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: 'var(--ndc-green-dark)',
            fontSize: '0.74rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0.3rem 0.8rem',
            borderRadius: '999px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.16)',
          }}
        >
          {project.completionYear}
        </div>
      </div>
    </div>
  );
};

const ProjectCardPhotoPlate: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const images =
    project.slideshowImages && project.slideshowImages.length > 0
      ? project.slideshowImages
      : [project.image];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [project.id]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3900);
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div style={{ height: '210px', position: 'relative', overflow: 'hidden', backgroundColor: '#0F1813' }}>
      {images.map((imgSrc, idx) => {
        const isActive = idx === currentIndex;
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
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 25%',
                display: 'block',
                transform: isActive ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 5000ms ease-out',
              }}
            />
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(17, 20, 18, 0.65) 0%, transparent 60%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle index number watermark */}
      <div
        style={{
          position: 'absolute',
          top: '0.85rem',
          right: '1rem',
          fontFamily: 'var(--font-serif)',
          fontSize: '1.2rem',
          fontWeight: 700,
          color: 'rgba(255, 255, 255, 0.85)',
          textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          zIndex: 4,
        }}
      >
        #{String(index + 2).padStart(2, '0')}
      </div>

      {/* Multiple images dot indicator strip */}
      {images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            top: '0.85rem',
            left: '1rem',
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            backgroundColor: 'rgba(12, 20, 16, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '0.22rem 0.5rem',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          {images.map((_, dotIdx) => (
            <span
              key={dotIdx}
              style={{
                width: dotIdx === currentIndex ? '14px' : '5px',
                height: '5px',
                borderRadius: '999px',
                backgroundColor: dotIdx === currentIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                transition: 'width 250ms ease, background-color 200ms ease',
              }}
            />
          ))}
        </div>
      )}

      <div style={{ position: 'absolute', bottom: '0.85rem', left: '1rem', zIndex: 4 }}>
        <span
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(8px)',
            color: 'var(--rich-black)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '0.28rem 0.72rem',
            borderRadius: '999px',
            border: '1px solid rgba(17, 20, 18, 0.06)',
          }}
        >
          {project.category}
        </span>
      </div>
    </div>
  );
};

export const ImpactSection: React.FC<ImpactSectionProps> = ({ onSelectProject, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Education', 'Healthcare', 'Women & Economy', 'Infrastructure', 'Youth & Skills'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const flagshipProject = filteredProjects[0];
  const secondaryProjects = filteredProjects.slice(1);

  return (
    <section
      id="impact"
      style={{
        backgroundColor: 'var(--bg-warm-gray)',
        paddingTop: 'clamp(4.5rem, 7vw, 6.5rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 6.5rem)',
        position: 'relative',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div className="container-custom">
        {/* Section Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={APPLE_SPRING}
          style={{ textAlign: 'center', marginBottom: '3.25rem' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ width: '12px', height: '2px', backgroundColor: 'var(--ndc-green)' }} />
            <span>Constituency Development Record</span>
            <span style={{ width: '12px', height: '2px', backgroundColor: 'var(--ndc-red)' }} />
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontFamily: 'var(--font-serif)',
              marginTop: '0.5rem',
              color: 'var(--rich-black)',
              letterSpacing: '-0.024em',
            }}
          >
            Grassroots Impact &amp; Focus Areas
          </h2>

          <p style={{ maxWidth: '640px', margin: '0.85rem auto 0', color: '#525A55', fontSize: '1.04rem', lineHeight: 1.68 }}>
            A decade of tangible, verified interventions transforming livelihoods, expanding educational access, and strengthening health systems across Agona East.
          </p>

          <div className="ndc-accent-ribbon" style={{ margin: '1.25rem auto 0' }}>
            <div className="ribbon-green" />
            <div className="ribbon-gold" />
            <div className="ribbon-red" />
          </div>

          {/* Apple Segmented Filter Strip */}
          <div
            role="tablist"
            aria-label="Filter Projects by Focus Area"
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              gap: '0.35rem',
              flexWrap: 'wrap',
              marginTop: '2.5rem',
              padding: '0.38rem',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(12px)',
              borderRadius: '999px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    position: 'relative',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.55rem 1.25rem',
                    minHeight: '40px',
                    borderRadius: '999px',
                    fontSize: '0.84rem',
                    fontWeight: isSelected ? 600 : 500,
                    backgroundColor: 'transparent',
                    color: isSelected ? '#FFFFFF' : '#434A46',
                    zIndex: 1,
                    transition: 'color 180ms ease, transform 100ms ease-out',
                  }}
                  onPointerDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
                  onPointerUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  onPointerLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="impact-category-pill"
                      transition={{ type: 'spring', bounce: 0, duration: 0.34 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '999px',
                        backgroundColor: 'var(--ndc-green)',
                        boxShadow: '0 3px 12px rgba(0, 122, 67, 0.28)',
                        zIndex: -1,
                      }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Flagship Feature Spread (Asymmetric Editorial Layout) */}
        {flagshipProject && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={APPLE_SPRING}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid rgba(17, 20, 18, 0.09)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              marginBottom: '3rem',
            }}
          >
            {/* Left Photographic Plate with Smooth Image Fade Slideshow */}
            <FlagshipPhotographicPlate project={flagshipProject} />

            {/* Right Editorial Dossier */}
            <div style={{ padding: 'clamp(2rem, 4vw, 3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--ndc-green)',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  <SparklesIcon size={13} />
                  <span>Flagship Initiative • {flagshipProject.category}</span>
                </span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  color: 'var(--rich-black)',
                  lineHeight: 1.25,
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {flagshipProject.title}
              </h3>

              <p style={{ fontSize: '0.98rem', color: '#4E5752', lineHeight: 1.68, marginBottom: '1.5rem' }}>
                {flagshipProject.shortDescription}
              </p>

              {/* Key Verified Milestones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                {flagshipProject.keyHighlights.slice(0, 3).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 122, 67, 0.12)',
                        color: 'var(--ndc-green)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <CheckIcon size={11} />
                    </div>
                    <span style={{ fontSize: '0.88rem', color: '#3A423D', lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quantitative Impact Seal & CTA */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-light)',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(0, 122, 67, 0.08)',
                    border: '1px solid rgba(0, 122, 67, 0.2)',
                    padding: '0.45rem 1rem',
                    borderRadius: '8px',
                  }}
                >
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-gray)', display: 'block' }}>
                    Verified Reach
                  </span>
                  <span style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--ndc-green-dark)' }}>
                    {flagshipProject.impactMetric}
                  </span>
                </div>

                <button
                  onClick={() => onSelectProject(flagshipProject)}
                  className="btn-primary-green"
                  style={{ padding: '0.75rem 1.6rem', fontSize: '0.88rem' }}
                >
                  <span>Examine Full Dossier</span>
                  <ArrowRightIcon size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Secondary Initiatives: Editorial Gazette Index Grid */}
        {secondaryProjects.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2.25rem',
            }}
          >
            {secondaryProjects.map((project, index) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={APPLE_SPRING}
                onClick={() => onSelectProject(project)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid rgba(17, 20, 18, 0.08)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(0, 122, 67, 0.22)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(17, 20, 18, 0.08)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                {/* Photo Plate with Integrated Editorial Overline & Smooth Slideshow */}
                <ProjectCardPhotoPlate project={project} index={index} />

                {/* Editorial Content Block */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--muted-gray)',
                      fontSize: '0.8rem',
                      marginBottom: '0.65rem',
                    }}
                  >
                    <MapPinIcon size={13} className="text-[#007A43]" />
                    <span>{project.location}</span>
                  </div>

                  <h4
                    style={{
                      fontSize: '1.2rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      marginBottom: '0.65rem',
                      color: 'var(--rich-black)',
                      lineHeight: 1.32,
                    }}
                  >
                    {project.title}
                  </h4>

                  <p
                    style={{
                      fontSize: '0.91rem',
                      color: '#4F5752',
                      lineHeight: 1.65,
                      marginBottom: '1.35rem',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Impact Metric & Link */}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--ndc-green-dark)',
                        backgroundColor: 'rgba(0, 122, 67, 0.08)',
                        padding: '0.22rem 0.65rem',
                        borderRadius: '6px',
                      }}
                    >
                      {project.impactMetric}
                    </span>

                    <span
                      style={{
                        color: 'var(--ndc-green)',
                        fontWeight: 600,
                        fontSize: '0.86rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <span>Read Dossier</span>
                      <ArrowRightIcon size={14} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Global Dashboard Navigation CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.75rem' }}>
          <button
            onClick={() => {
              onNavigate('impact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-outline-green"
          >
            <span>Explore Complete Development Dashboard</span>
            <ArrowRightIcon size={17} />
          </button>
        </div>
      </div>
    </section>
  );
};
