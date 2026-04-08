'use client';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const rooms = [
  { nameEn: 'The Majlis Suite', nameAr: 'جناح المجلس', cap: '4–8', src: 'https://images.unsplash.com/photo-1562679299-8a3a33ab8b7c?w=600&q=70' },
  { nameEn: 'The Pearl Room',   nameAr: 'غرفة اللؤلؤ',  cap: '6–12', src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=70' },
  { nameEn: 'The Desert Rose',  nameAr: 'وردة الصحراء', cap: '10–20', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=70' },
  { nameEn: 'The Board Room',   nameAr: 'قاعة الاجتماعات', cap: '12–18', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=70' },
  { nameEn: 'The Garden Terrace', nameAr: 'تراس الحديقة', cap: '20–40', src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=70' },
];

export default function PrivateDining() {
  const { t, isRTL } = useI18n();

  return (
    <section
      id="private-dining"
      style={{ padding: '140px 0', background: '#0A0A0A', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '16px' }}>
            {t.privateDining.eyebrow}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: '#F8F8F8', marginBottom: '16px' }}>
            {t.privateDining.title}
          </h2>
          <p style={{ fontFamily: "'Montserrat'", fontSize: '14px', fontWeight: 300, color: 'rgba(248,248,248,0.55)', maxWidth: '560px', margin: '0 auto 24px' }}>
            {t.privateDining.subtitle}
          </p>
          <div className="gold-divider" />
        </motion.div>

        {/* Room grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '60px',
          direction: isRTL ? 'rtl' : 'ltr',
        }}>
          {rooms.map((room, i) => (
            <motion.div
              key={room.nameEn}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ position: 'relative', overflow: 'hidden', borderRadius: '2px', aspectRatio: '3/4', cursor: 'pointer' }}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector('.room-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector('.room-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              <img
                src={room.src}
                alt={room.nameEn}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)', transition: 'transform 0.6s ease' }}
              />
              <div
                className="room-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(212,175,55,0.12)',
                  border: '1px solid rgba(212,175,55,0.4)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '30px 24px 24px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
              }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '22px', fontWeight: 400, color: '#F8F8F8', marginBottom: '6px', textAlign: isRTL ? 'right' : 'left' }}>
                  {isRTL ? room.nameAr : room.nameEn}
                </h3>
                <p style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', color: '#D4AF37', textAlign: isRTL ? 'right' : 'left' }}>
                  {room.cap} {isRTL ? 'ضيف' : 'guests'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="btn-gold"
            onClick={() => document.querySelector('#reservations')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.privateDining.cta}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
