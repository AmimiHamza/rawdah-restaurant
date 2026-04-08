'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const navLinks = [
  { key: 'story',        href: '#story' },
  { key: 'menu',         href: '#menu' },
  { key: 'reservations', href: '#reservations' },
  { key: 'order',        href: '#order' },
  { key: 'privateDining',href: '#private-dining' },
] as const;

export default function Navigation() {
  const { t, locale, setLocale, isRTL } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLocale = () => setLocale(locale === 'en' ? 'ar' : 'en');

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          padding: scrolled ? '12px 0' : '24px 0',
          background: scrolled
            ? 'rgba(18,18,18,0.95)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.12)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{ textDecoration: 'none' }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '28px',
                  fontWeight: 400,
                  color: '#F8F8F8',
                  letterSpacing: '0.08em',
                  lineHeight: 1,
                }}
              >
                RAWDAH
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '11px',
                  color: '#D4AF37',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  marginTop: '3px',
                }}
              >
                روضة
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}
          >
            {navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(248,248,248,0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,248,248,0.75)')}
              >
                {t.nav[key as keyof typeof t.nav]}
              </a>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'transparent',
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#D4AF37',
                padding: '6px 14px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Globe size={12} />
              {locale === 'en' ? 'عربي' : 'EN'}
            </button>

            <a
              href="#reservations"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#reservations')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-gold"
              style={{ fontSize: '10px', padding: '10px 24px', textDecoration: 'none' }}
            >
              {t.nav.reservations}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setOpen(!open)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#F8F8F8',
              cursor: 'pointer',
              display: 'none',
            }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? -100 : 100 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              [isRTL ? 'left' : 'right']: 0,
              width: '80vw',
              maxWidth: '360px',
              height: '100vh',
              background: 'rgba(18,18,18,0.98)',
              backdropFilter: 'blur(20px)',
              zIndex: 800,
              display: 'flex',
              flexDirection: 'column',
              padding: '100px 40px 40px',
              gap: '32px',
              borderLeft: isRTL ? 'none' : '1px solid rgba(212,175,55,0.15)',
              borderRight: isRTL ? '1px solid rgba(212,175,55,0.15)' : 'none',
            }}
          >
            {navLinks.map(({ key, href }, i) => (
              <motion.a
                key={key}
                href={href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                  setOpen(false);
                }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '28px',
                  fontWeight: 400,
                  color: '#F8F8F8',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'color 0.3s ease',
                  textAlign: isRTL ? 'right' : 'left',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#F8F8F8')}
              >
                {t.nav[key as keyof typeof t.nav]}
              </motion.a>
            ))}
            <button
              onClick={() => { toggleLocale(); setOpen(false); }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#D4AF37',
                padding: '12px 20px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                alignSelf: isRTL ? 'flex-end' : 'flex-start',
              }}
            >
              {locale === 'en' ? 'العربية' : 'English'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
