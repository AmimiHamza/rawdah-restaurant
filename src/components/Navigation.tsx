'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';

const navLinks = [
  { key: 'features', href: '#features' },
  { key: 'dashboard', href: '#dashboard' },
  { key: 'contact',  href: '#contact' },
] as const;

const navLabels = {
  en: { features: 'What You Get', dashboard: 'Dashboard', contact: 'Contact' },
  ar: { features: 'ما ستحصل عليه', dashboard: 'لوحة التحكم', contact: 'تواصل معنا' },
};

export default function Navigation() {
  const { locale, setLocale, isRTL } = useI18n();
  const { toggleTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1025) setOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const labels = navLabels[locale];
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const iconBtn: React.CSSProperties = {
    background: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--text-2)',
    width: 36, height: 36,
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    flexShrink: 0,
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
          padding: scrolled ? '10px 0' : '18px 0',
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          transition: 'padding 0.35s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: isRTL ? 'row-reverse' : 'row' }}>

          {/* ── Logo ── */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: isRTL ? 'flex-end' : 'flex-start', gap: '1px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: 'var(--text)', letterSpacing: '0.1em', lineHeight: 1 }}>
                AMIMI
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: 'var(--gold)', letterSpacing: '0.25em', lineHeight: 1 }}>
                عميمي · Digital
              </span>
            </div>
          </button>

          {/* ── Desktop links ── */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 36, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            {navLinks.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => scrollTo(href)}
                style={{ background: 'none', border: 'none', fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-2)', cursor: 'pointer', transition: 'color 0.25s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-2)'; }}
              >
                {labels[key]}
              </button>
            ))}

            {/* Theme toggle */}
            <button onClick={toggleTheme} style={iconBtn} title="Toggle theme"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)'; }}>
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Language toggle */}
            <button
              onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
              style={{ ...iconBtn, gap: 4, width: 'auto', padding: '0 12px', borderRadius: 20, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', fontFamily: "'Montserrat'" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)'; }}
            >
              <Globe size={11} />
              {locale === 'en' ? 'عربي' : 'EN'}
            </button>

            <button onClick={() => scrollTo('#contact')} className="btn-gold-solid" style={{ fontSize: 10, padding: '10px 22px', letterSpacing: '0.15em' }}>
              {locale === 'en' ? 'Start Now' : 'ابدأ الآن'}
            </button>
          </div>

          {/* ── Mobile right controls ── */}
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <button onClick={toggleTheme} style={iconBtn}>
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button onClick={() => setOpen(!open)} style={{ ...iconBtn, borderColor: open ? 'var(--gold)' : 'var(--border)', color: open ? 'var(--gold)' : 'var(--text)' }}>
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 850, backdropFilter: 'blur(4px)' }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 860,
                background: 'var(--bg-card)', borderBottom: '1px solid var(--border)',
                padding: '80px 28px 36px', direction: isRTL ? 'rtl' : 'ltr',
                boxShadow: 'var(--shadow)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {navLinks.map(({ key, href }, i) => (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(href)}
                    style={{ background: 'none', border: 'none', fontFamily: "'Cormorant Garamond'", fontSize: 28, fontWeight: 400, color: 'var(--text)', cursor: 'pointer', padding: '10px 0', textAlign: isRTL ? 'right' : 'left', borderBottom: '1px solid var(--border)', transition: 'color 0.25s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
                  >
                    {labels[key]}
                  </motion.button>
                ))}
                <div style={{ display: 'flex', gap: 12, marginTop: 20, flexDirection: isRTL ? 'row-reverse' : 'row', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setLocale(locale === 'en' ? 'ar' : 'en'); setOpen(false); }}
                    className="btn-gold"
                    style={{ fontSize: 10, padding: '10px 20px' }}
                  >
                    <Globe size={11} /> {locale === 'en' ? 'العربية' : 'English'}
                  </button>
                  <button onClick={() => scrollTo('#contact')} className="btn-gold-solid" style={{ fontSize: 10, padding: '10px 20px', flex: 1, justifyContent: 'center' }}>
                    {locale === 'en' ? 'Start Now' : 'ابدأ الآن'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
