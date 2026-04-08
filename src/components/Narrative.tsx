'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const ingredients = [
  { label: 'Al-Ahsa Dates', labelAr: 'تمور الأحساء', src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=70' },
  { label: 'Red Sea Hammour', labelAr: 'هامور البحر الأحمر', src: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=70' },
  { label: 'Qatif Saffron', labelAr: 'زعفران القطيف', src: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=70' },
  { label: 'Asir Herbs', labelAr: 'أعشاب عسير', src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=70' },
];

export default function Narrative() {
  const { t, isRTL } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: t.narrative.stat1_val, label: t.narrative.stat1_lab },
    { value: t.narrative.stat2_val, label: t.narrative.stat2_lab },
    { value: t.narrative.stat3_val, label: t.narrative.stat3_lab },
  ];

  return (
    <section
      id="story"
      ref={ref}
      style={{
        padding: '140px 0',
        background: '#121212',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>

        {/* ─── Top row: text + ingredient grid ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '80px',
            alignItems: 'center',
            marginBottom: '100px',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
        >
          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                display: 'block',
                marginBottom: '20px',
              }}
            >
              {t.narrative.eyebrow}
            </span>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(36px, 4vw, 58px)',
                fontWeight: 400,
                color: '#F8F8F8',
                lineHeight: 1.15,
                marginBottom: '32px',
                whiteSpace: 'pre-line',
              }}
            >
              {t.narrative.title}
            </h2>

            <div
              style={{
                width: '48px',
                height: '1px',
                background: '#D4AF37',
                marginBottom: '32px',
                marginLeft: isRTL ? 'auto' : '0',
                marginRight: isRTL ? '0' : 'auto',
              }}
            />

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '14px',
                fontWeight: 300,
                color: 'rgba(248,248,248,0.7)',
                lineHeight: 1.9,
                marginBottom: '24px',
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {t.narrative.p1}
            </p>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '14px',
                fontWeight: 300,
                color: 'rgba(248,248,248,0.7)',
                lineHeight: 1.9,
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {t.narrative.p2}
            </p>
          </motion.div>

          {/* Ingredient image grid */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            {ingredients.map((ing, i) => (
              <motion.div
                key={ing.label}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  overflow: 'hidden',
                  borderRadius: '2px',
                }}
              >
                <img
                  src={ing.src}
                  alt={isRTL ? ing.labelAr : ing.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.65) saturate(0.8)',
                    transition: 'transform 0.6s ease, filter 0.6s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)';
                    (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.8) saturate(1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.65) saturate(0.8)';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '20px 14px 14px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#D4AF37',
                    }}
                  >
                    {isRTL ? ing.labelAr : ing.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ─── Stats row ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(212,175,55,0.15)',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '48px 40px',
                textAlign: 'center',
                background: '#121212',
                borderRight: i < 2 ? '1px solid rgba(212,175,55,0.15)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '52px',
                  fontWeight: 300,
                  color: '#D4AF37',
                  lineHeight: 1,
                  marginBottom: '12px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,248,248,0.5)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
