'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Sun, Moon, ChevronDown } from 'lucide-react';
import { useI18n, Locale } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';

const navLinks = [
  { key: 'features', href: '#features' },
  { key: 'dashboard', href: '#dashboard' },
  { key: 'contact',  href: '#contact' },
] as const;

const navLabels = {
  en: { features: 'What You Get', dashboard: 'Dashboard', contact: 'Contact' },
  fr: { features: 'Ce que vous obtenez', dashboard: 'Tableau de bord', contact: 'Contact' },
  ar: { features: 'ما ستحصل عليه', dashboard: 'لوحة التحكم', contact: 'تواصل معنا' },
};

const LANGS: { code: Locale; label: string; native: string; flag: string }[] = [
  { code: 'en', label: 'English',  native: 'English',  flag: '🇬🇧' },
  { code: 'fr', label: 'French',   native: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'Arabic',   native: 'العربية',  flag: '🇸🇦' },
];

function LangDropdown({ locale, setLocale, mobile = false }: {
  locale: Locale;
  setLocale: (l: Locale) => void;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find(l => l.code === locale) || LANGS[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (code: Locale) => { setLocale(code); setOpen(false); };

  const itemStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 10,
    width: '100%', padding: '10px 14px',
    background: active ? 'rgba(212,175,55,0.1)' : 'transparent',
    border: 'none', cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 500,
    color: active ? 'var(--gold)' : 'var(--text-2)',
    letterSpacing: '0.04em',
    transition: 'background 0.15s, color 0.15s',
    textAlign: 'left',
  });

  if (mobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ fontFamily: "'Montserrat'", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-3)', paddingLeft: 14, marginBottom: 4 }}>Language</p>
        {LANGS.map(l => (
          <button key={l.code} onClick={() => select(l.code)} style={itemStyle(l.code === locale)}>
            <span style={{ fontSize: 18 }}>{l.flag}</span>
            <span style={{ flex: 1 }}>{l.native}</span>
            {l.code === locale && <span style={{ color: 'var(--gold)', fontSize: 12 }}>✓</span>}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'transparent',
          border: '1px solid var(--border-2)',
          color: 'var(--text)',
          height: 36, padding: '0 12px', borderRadius: 20,
          cursor: 'pointer',
          fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.color = 'var(--text)'; }}
      >
        <Globe size={11} />
        <span>{current.flag} {current.code.toUpperCase()}</span>
        <ChevronDown size={10} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              width: 160, borderRadius: 12, overflow: 'hidden', zIndex: 999,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => select(l.code)}
                style={itemStyle(l.code === locale)}
                onMouseEnter={(e) => {
                  if (l.code !== locale) { e.currentTarget.style.background = 'var(--pill-bg)'; e.currentTarget.style.color = 'var(--text)'; }
                }}
                onMouseLeave={(e) => {
                  if (l.code !== locale) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-2)'; }
                }}
              >
                <span style={{ fontSize: 16 }}>{l.flag}</span>
                <span style={{ flex: 1 }}>{l.native}</span>
                {l.code === locale && <span style={{ color: 'var(--gold)', fontSize: 12 }}>✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
    border: '1px solid var(--border-2)',
    color: 'var(--text)',
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
            <button onClick={toggleTheme} style={{ ...iconBtn, color: 'var(--gold)' }} title="Toggle theme"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'var(--pill-bg)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.background = 'transparent'; }}>
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Language dropdown */}
            <LangDropdown locale={locale} setLocale={setLocale} />

            <button onClick={() => scrollTo('#contact')} className="btn-gold-solid" style={{ fontSize: 10, padding: '10px 22px', letterSpacing: '0.15em' }}>
              {locale === 'ar' ? 'ابدأ الآن' : locale === 'fr' ? 'Commencer' : 'Start Now'}
            </button>
          </div>

          {/* ── Mobile right controls ── */}
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <button onClick={toggleTheme} style={{ ...iconBtn, color: 'var(--gold)' }}>
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
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 850, backdropFilter: 'blur(4px)' }}
            />
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

                {/* Language picker in mobile drawer */}
                <div style={{ marginTop: 20 }}>
                  <LangDropdown locale={locale} setLocale={(l) => { setLocale(l); setOpen(false); }} mobile />
                </div>

                <div style={{ marginTop: 16 }}>
                  <button onClick={() => scrollTo('#contact')} className="btn-gold-solid" style={{ fontSize: 10, padding: '12px 20px', width: '100%', justifyContent: 'center' }}>
                    {locale === 'ar' ? 'ابدأ الآن' : locale === 'fr' ? 'Commencer' : 'Start Now'}
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
