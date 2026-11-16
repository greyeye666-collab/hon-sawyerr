import React from 'react';
import { motion } from 'motion/react';
import { QUICK_STATS } from '../data/mockData';

export const StatsBar: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        padding: 'clamp(2.75rem, 4.5vw, 3.75rem) 0',
        position: 'relative',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.25rem',
            alignItems: 'center',
          }}
        >
          {QUICK_STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.42, delay: idx * 0.05 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                borderLeft: idx > 0 ? '1px solid var(--border-light)' : 'none',
                paddingLeft: idx > 0 ? '2rem' : '0',
              }}
              className="stat-item"
            >
              <div
                style={{
                  fontSize: 'clamp(2.3rem, 4vw, 3.25rem)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 800,
                  color: 'var(--ndc-green)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.025em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  color: 'var(--rich-black)',
                  marginTop: '0.2rem',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '0.84rem',
                  color: 'var(--muted-gray)',
                  lineHeight: 1.5,
                }}
              >
                {stat.subtext}
              </div>
            </motion.div>
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
