import React, { useState } from 'react';
import type { Project, PageView } from '../types';
import { useSiteData } from '../hooks/useSiteData';
import { ArrowLeftIcon, ArrowRightIcon, MapPinIcon } from './Icons';

interface DedicatedImpactPageProps {
  onBack: () => void;
  onSelectProject: (p: Project) => void;
  onNavigate: (page: PageView) => void;
}

export const DedicatedImpactPage: React.FC<DedicatedImpactPageProps> = ({
  onBack,
  onSelectProject,
  onNavigate,
}) => {
  const { projects, quickStats } = useSiteData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Education', 'Healthcare', 'Women & Economy', 'Infrastructure', 'Youth & Skills'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

          <span className="pill-category">Development Dashboard</span>
        </div>
      </div>

      {/* Header */}
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
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#006B3F' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CE1126' }} />
              <span style={{ color: '#C5A059', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Grassroots Progress Across Agona East
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
              Good Works &amp; Development Track Record
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              Explore the verified projects, social safety nets, educational interventions, and infrastructure spearheaded
              by Hon. Queenstar Maame Pokua Sawyerr.
            </p>

            <div className="ndc-accent-ribbon" style={{ maxWidth: '140px', height: '4px' }}>
              <div className="ribbon-green" />
              <div className="ribbon-gold" />
              <div className="ribbon-red" />
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div
            style={{
              marginTop: '3rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {quickStats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#C5A059', fontFamily: 'var(--font-serif)' }}>
                  {stat.value}
                </div>
                <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.88rem' }}>
                  {stat.label}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.75rem' }}>
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="container-custom" style={{ marginTop: '3.5rem' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by project name, town, or sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: '260px',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-cream)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="btn-subtle"
            >
              Reset Filters
            </button>
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  backgroundColor: selectedCategory === cat ? '#006B3F' : 'transparent',
                  color: selectedCategory === cat ? '#FFFFFF' : '#55504A',
                  borderColor: selectedCategory === cat ? '#006B3F' : 'var(--border-light)',
                  transition: 'var(--transition-smooth)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="luxury-card"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectProject(project)}
            >
              <div className="img-zoom-container" style={{ height: '240px', position: 'relative' }}>
                <img src={project.image} alt={project.title} />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(17, 20, 18, 0.45) 0%, transparent 60%)',
                  }}
                />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem' }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--rich-black)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '0.28rem 0.75rem',
                      borderRadius: '999px',
                      border: '1px solid rgba(17, 20, 18, 0.08)',
                    }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              <div style={{ padding: '1.85rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6A736E', fontSize: '0.8rem' }}>
                    <MapPinIcon size={14} className="text-[#007A43]" />
                    <span>{project.location}</span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--ndc-green-dark)',
                      backgroundColor: 'rgba(0, 122, 67, 0.08)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                    }}
                  >
                    {project.impactMetric}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    marginBottom: '0.85rem',
                    color: 'var(--rich-black)',
                    lineHeight: 1.3,
                  }}
                >
                  {project.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: '#55504A', lineHeight: 1.65, marginBottom: '1.5rem', flex: 1 }}>
                  {project.shortDescription}
                </p>

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
                    }}
                  >
                    <span>Read Complete Project Report</span>
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Suggest a Project Banner */}
        <div
          style={{
            marginTop: '5rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '3.5rem 2.5rem',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <span className="pill-category">Constituent Collaboration</span>
            <h2
              style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--rich-black)',
                marginTop: '0.85rem',
                marginBottom: '0.85rem',
              }}
            >
              Have a Project Suggestion for Your Community?
            </h2>
            <p style={{ color: '#55504A', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Hon. Queenstar Maame Pokua Sawyerr and the Agona East development committee welcome proposals from assembly
              members, chiefs, youth leaders, and women groups.
            </p>
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary-green"
              style={{ padding: '0.9rem 2.2rem' }}
            >
              Submit Community Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
