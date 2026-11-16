import React, { useState } from 'react';
import type { Project, PageView } from '../types';
import { PROJECTS } from '../data/mockData';
import { ArrowRightIcon, MapPinIcon } from './Icons';

interface ImpactSectionProps {
  onSelectProject: (project: Project) => void;
  onNavigate: (page: PageView) => void;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ onSelectProject, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Education', 'Healthcare', 'Women & Economy', 'Infrastructure', 'Youth & Skills'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="impact"
      style={{
        backgroundColor: 'var(--bg-warm-gray)',
        paddingTop: '6.5rem',
        paddingBottom: '6.5rem',
        position: 'relative',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div className="container-custom">
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span style={{ width: '12px', height: '2px', backgroundColor: '#006B3F' }} />
            <span>Key Focus Areas &amp; Grassroots Progress</span>
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
            Impact &amp; Focus Areas
          </h2>

          <p style={{ maxWidth: '650px', margin: '0.75rem auto 0', color: '#5C5751', fontSize: '1.05rem' }}>
            Delivering tangible development across Agona East through education, economic independence, healthcare,
            clean potable water, and youth empowerment.
          </p>

          <div className="ndc-accent-ribbon" style={{ margin: '1rem auto 0', maxWidth: '100px' }}>
            <div className="ribbon-green" />
            <div className="ribbon-gold" />
            <div className="ribbon-red" />
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap',
              marginTop: '2.5rem',
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.6rem 1.35rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    transition: 'var(--transition-smooth)',
                    backgroundColor: isSelected ? 'var(--ndc-green)' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#4A4643',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: isSelected ? 'var(--ndc-green)' : 'var(--border-light)',
                    boxShadow: isSelected ? '0 4px 14px rgba(0, 107, 63, 0.25)' : 'var(--shadow-sm)',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Column Refined Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2.25rem',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="luxury-card"
              style={{
                cursor: 'pointer',
                backgroundColor: '#FFFFFF',
              }}
              onClick={() => onSelectProject(project)}
            >
              {/* Soft Image & Category Pill */}
              <div className="img-zoom-container" style={{ height: '220px', position: 'relative' }}>
                <img src={project.image} alt={project.title} />

                {/* Floating Tag in Green or Red */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span
                    className={
                      project.category === 'Education'
                        ? 'pill-category'
                        : project.category === 'Women & Economy'
                        ? 'pill-red'
                        : 'pill-category'
                    }
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Metric Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(17, 17, 17, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: '#E7D5B0',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.35rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(197, 160, 89, 0.35)',
                  }}
                >
                  {project.impactMetric}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.85rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#7A7570',
                    fontSize: '0.8rem',
                    marginBottom: '0.6rem',
                  }}
                >
                  <MapPinIcon size={14} className="text-[#006B3F]" />
                  <span>{project.location}</span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    color: 'var(--rich-black)',
                    lineHeight: 1.35,
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#55504A',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem',
                    flex: 1,
                  }}
                >
                  {project.shortDescription}
                </p>

                {/* Learn More Action Button */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--ndc-green)',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      transition: 'gap 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#004D2C';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--ndc-green)';
                    }}
                  >
                    <span>View Project Details</span>
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Dedicated Impact Page CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.75rem' }}>
          <button
            onClick={() => {
              onNavigate('impact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-outline-green"
            style={{ padding: '0.9rem 2.4rem' }}
          >
            <span>Explore Complete Development Dashboard</span>
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
