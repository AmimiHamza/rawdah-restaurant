'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function Hero() {
  const { t, isRTL } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {/* autoplay blocked */});
    }
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ─── Video background ─── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.35)',
        }}
        poster="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
      >
        {/* Real video would go here; poster serves as static fallback */}
        <source
          src="https://cdn.coverr.co/videos/coverr-cooking-in-a-restaurant-kitchen-7396/1080p.mp4"
          type="video/mp4"
        />
      </video>

      {/* ─── Gradient overlays ─── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(to bottom, transparent, #121212)',
        }}
      />

      {/* ─── Gold line accent ─── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: isRTL ? 'auto' : '0',
          right: isRTL ? '0' : 'auto',
          width: '120px',
          height: '1px',
          background: '#D4AF37',
          transformOrigin: isRTL ? 'right' : 'left',
        }}
      />

      {/* ─── Content ─── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '860px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              display: 'block',
              marginBottom: '24px',
            }}
          >
            RAWDAH · روضة · RIYADH
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(42px, 7vw, 90px)',
            fontWeight: 300,
            color: '#F8F8F8',
            lineHeight: 1.05,
            marginBottom: '32px',
            letterSpacing: '0.01em',
          }}
        >
          {t.hero.tagline}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            width: '48px',
            height: '1px',
            background: '#D4AF37',
            margin: '0 auto 36px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
        >
          <button
            className="btn-gold-solid"
            onClick={() => document.querySelector('#reservations')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.hero.cta1}
          </button>
          <button
            className="btn-gold"
            onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.hero.cta2}
          </button>
        </motion.div>
      </div>

      {/* ─── Scroll indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
        }}
        onClick={() => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(248,248,248,0.5)',
          }}
        >
          {t.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} color="rgba(212,175,55,0.7)" />
        </motion.div>
      </motion.div>
    </section>
  );
}
