'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n, Locale } from '@/lib/i18n';

const options: { locale: Locale; label: string; native: string; flag: string; dir: 'ltr' | 'rtl' }[] = [
  { locale: 'ar', label: 'Arabic',   native: 'العربية',  flag: '🇸🇦', dir: 'rtl' },
  { locale: 'en', label: 'English',  native: 'English',  flag: '🇬🇧', dir: 'ltr' },
  { locale: 'fr', label: 'French',   native: 'Français', flag: '🇫🇷', dir: 'ltr' },
];

export default function LanguagePicker() {
  const { pickerOpen, pickLanguage } = useI18n();

  // Lock body scroll while open
  useEffect(() => {
    if (pickerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [pickerOpen]);

  return (
    <AnimatePresence>
      {pickerOpen && (
        <motion.div
          key="lang-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(8, 5, 3, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '24px',
          }}
        >
          {/* Decorative radial glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)',
          }} />

          <motion.div
            key="lang-card"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.05 }}
            style={{
              position: 'relative',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 24,
              padding: '40px 36px 36px',
              maxWidth: 420,
              width: '100%',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.08)',
              textAlign: 'center',
            }}
          >
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 22 }}
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 0 32px rgba(212,175,55,0.25)',
              }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 26, color: '#0a0704', lineHeight: 1 }}>A</span>
            </motion.div>

            {/* Heading */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}
            >
              Welcome · Bienvenue · أهلاً
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 26, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.2 }}
            >
              Choose Your Language
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: 'var(--text-2)', marginBottom: 32 }}
            >
              اختر لغتك · Choisissez votre langue
            </motion.p>

            {/* Language options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {options.map((opt, i) => (
                <motion.button
                  key={opt.locale}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32 + i * 0.07 }}
                  whileHover={{ scale: 1.02, borderColor: 'var(--gold)', backgroundColor: 'rgba(212,175,55,0.07)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => pickLanguage(opt.locale)}
                  dir={opt.dir}
                  style={{
                    display: 'flex', alignItems: 'center',
                    gap: 14,
                    padding: '14px 18px',
                    borderRadius: 14,
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, background-color 0.2s',
                    width: '100%',
                    textAlign: opt.dir === 'rtl' ? 'right' : 'left',
                  }}
                >
                  <span style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>{opt.flag}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text)', letterSpacing: '0.02em' }}>
                      {opt.native}
                    </span>
                    <span style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>
                      {opt.label}
                    </span>
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, flexShrink: 0, transform: opt.dir === 'rtl' ? 'scaleX(-1)' : 'none' }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </motion.button>
              ))}
            </div>

            {/* Footer note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: 'var(--text-2)', marginTop: 24, opacity: 0.5 }}
            >
              Your choice is saved — you won't be asked again.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
