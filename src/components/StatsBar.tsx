import React from 'react';
import { QUICK_STATS } from '../data/mockData';

export const StatsBar: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        padding: '3.5rem 0',
        position: 'relative',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {QUICK_STATS.map((stat, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                borderLeft: idx > 0 ? '1px solid var(--border-light)' : 'none',
                paddingLeft: idx > 0 ? '2rem' : '0',
                transition: 'var(--transition-smooth)',
              }}
              className="stat-item"
            >
              <div
                style={{
                  fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 800,
                  color: 'var(--ndc-green)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--rich-black)',
                  marginTop: '0.2rem',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#6E6963',
                  lineHeight: 1.5,
                }}
              >
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stat-item {
            border-left: none !important;
            padding-left: 0 !important;
            border-bottom: 1px solid var(--border-light);
            padding-bottom: 1.5rem;
          }
          .stat-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      `}</style>
    </section>
  );
};
