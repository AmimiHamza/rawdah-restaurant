'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';

const content: Record<string, { badge: string; title1: string; title2: string; title3: string; title4: string; sub: string; cta1: string; cta2: string; badge2: string }> = {
  en: {
    badge:    'Amimi Digital · Restaurants',
    title1:   'Your Restaurant',
    title2:   'Deserves a Website as',
    title3:   'Exceptional',
    title4:   'as Your Cuisine',
    sub:      'We craft high-conversion, bilingual restaurant websites — complete with smart dashboards, online reservations, and seamless payments. All in days, not months.',
    cta1:     'Build My Website',
    cta2:     'See Dashboard',
    badge2:   '100% Custom · Bilingual EN/AR · Mobile-First',
  },
  fr: {
    badge:    'Amimi Digital · Restaurants',
    title1:   'Votre restaurant',
    title2:   'mérite un site aussi',
    title3:   'exceptionnel',
    title4:   "que votre cuisine",
    sub:      "Nous créons des sites restaurant bilingues à fort taux de conversion — avec tableaux de bord intelligents, réservations en ligne et paiements intégrés. En jours, pas en mois.",
    cta1:     'Créer mon site',
    cta2:     'Voir le tableau de bord',
    badge2:   '100% Sur mesure · Bilingue FR/AR · Mobile-First',
  },
  ar: {
    badge:    'عميمي ديجيتال · المطاعم',
    title1:   'مطعمك يستحق',
    title2:   'موقعاً استثنائياً',
    title3:   'بمستوى',
    title4:   'مطبخك الراقي',
    sub:      'نصمم مواقع مطاعم ثنائية اللغة عالية التحويل — مع لوحات تحكم ذكية، وحجوزات أونلاين، ودفع إلكتروني سلس. كل ذلك خلال أيام وليس أشهراً.',
    cta1:     'ابنِ موقع مطعمي',
    cta2:     'شاهد لوحة التحكم',
    badge2:   '١٠٠٪ مخصص · ثنائي اللغة · متوافق مع الجوال',
  },
};

const floatingCards: Record<string, { icon: string; label: string; value: string }[]> = {
  en: [
    { icon: '📅', label: 'Reservations', value: '+147 this week' },
    { icon: '⭐', label: 'Rating',        value: '4.9 / 5.0' },
    { icon: '💰', label: 'Revenue',       value: '+23% this month' },
  ],
  fr: [
    { icon: '📅', label: 'Réservations', value: '+147 cette semaine' },
    { icon: '⭐', label: 'Note',          value: '4,9 / 5,0' },
    { icon: '💰', label: 'Chiffre d\'aff.', value: '+23% ce mois' },
  ],
  ar: [
    { icon: '📅', label: 'الحجوزات',   value: '+١٤٧ هذا الأسبوع' },
    { icon: '⭐', label: 'التقييم',     value: '٤.٩ / ٥.٠' },
    { icon: '💰', label: 'الإيرادات',  value: '+٢٣٪ هذا الشهر' },
  ],
};

export default function HeroOwner() {
  const { isRTL, locale } = useI18n();
  const { isDark } = useTheme();
  const c = content[locale];
  const cards = floatingCards[locale];
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        paddingTop: 80,
      }}
    >
      {/* ── Background ornament ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Large blurred gold circle */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          [isRTL ? 'left' : 'right']: '-15%',
          width: 600, height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${isDark ? 'rgba(212,175,55,0.08)' : 'rgba(212,175,55,0.12)'} 0%, transparent 70%)`,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          [isRTL ? 'right' : 'left']: '-10%',
          width: 400, height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${isDark ? 'rgba(212,175,55,0.05)' : 'rgba(212,175,55,0.08)'} 0%, transparent 70%)`,
        }} />
        {/* Diagonal gold line */}
        <svg style={{ position: 'absolute', top: 0, right: isRTL ? 'auto' : 0, left: isRTL ? 0 : 'auto', width: '50%', height: '100%', opacity: isDark ? 0.04 : 0.07 }} viewBox="0 0 400 800" preserveAspectRatio="none">
          <line x1="400" y1="0" x2="0" y2="800" stroke="#D4AF37" strokeWidth="1" />
          <line x1="380" y1="0" x2="-20" y2="800" stroke="#D4AF37" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,0.9fr)',
          gap: '60px',
          alignItems: 'center',
          direction: isRTL ? 'rtl' : 'ltr',
        }}>

          {/* ── Left: Text ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--pill-bg)', border: '1px solid var(--border)', borderRadius: 24, padding: '6px 16px', marginBottom: 28 }}
            >
              <Sparkles size={12} color="var(--gold)" />
              <span style={{ fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                {c.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, lineHeight: 1.08, marginBottom: 28, textAlign: isRTL ? 'right' : 'left' }}
            >
              <span style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', color: 'var(--text)', display: 'block' }}>{c.title1}</span>
              <span style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', color: 'var(--text)', display: 'block' }}>{c.title2}</span>
              <span style={{ fontSize: 'clamp(40px, 5.8vw, 76px)', display: 'block' }} className="gold-shimmer">{c.title3}</span>
              <span style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', color: 'var(--text)', display: 'block' }}>{c.title4}</span>
            </motion.h1>

            {/* Gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ width: 56, height: 1, background: 'var(--gold)', marginBottom: 24, transformOrigin: isRTL ? 'right' : 'left', marginLeft: isRTL ? 'auto' : 0, marginRight: isRTL ? 0 : 'auto' }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="body-text"
              style={{ maxWidth: 520, marginBottom: 36, textAlign: isRTL ? 'right' : 'left' }}
            >
              {c.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', flexDirection: isRTL ? 'row-reverse' : 'row' }}
            >
              <button onClick={() => scrollTo('#contact')} className="btn-gold-solid" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {c.cta1} <Arrow size={14} />
              </button>
              <button onClick={() => scrollTo('#dashboard')} className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {c.cta2}
              </button>
            </motion.div>

            {/* Sub-badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{ fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 500, letterSpacing: '0.15em', color: 'var(--text-3)', marginTop: 20, textAlign: isRTL ? 'right' : 'left' }}
            >
              {c.badge2}
            </motion.p>
          </div>

          {/* ── Right: Floating stat cards ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="desktop-only"
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {/* Mock browser frame */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              {/* Browser chrome */}
              <div style={{ background: 'var(--bg-card-2)', borderBottom: '1px solid var(--border)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                {['#ff5f56','#ffbd2e','#27c93f'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
                <div style={{ flex: 1, background: 'var(--bg-input)', borderRadius: 20, height: 22, marginLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Montserrat'", fontSize: 9, color: 'var(--text-3)', letterSpacing: '0.08em' }}>rawdah.sa</span>
                </div>
              </div>
              {/* Website screenshot-like preview */}
              <div style={{ padding: 0, height: 200, background: '#121212', position: 'relative', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=70" alt="Restaurant preview" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} onError={(e) => { e.currentTarget.style.opacity = '0'; }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, #121212 100%)' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: 22, color: '#F8F8F8', letterSpacing: '0.12em' }}>RAWDAH · روضة</div>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: 9, color: '#D4AF37', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 4 }}>Fine Dining · Riyadh</div>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 12px', textAlign: 'center' }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{card.icon}</div>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 4 }}>{card.label}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: 14, fontWeight: 400, color: 'var(--gold)' }}>{card.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        onClick={() => scrollTo('#stats')}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
      >
        <span style={{ fontFamily: "'Montserrat'", fontSize: 9, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
          {locale === 'ar' ? 'اكتشف' : locale === 'fr' ? 'Découvrir' : 'Discover'}
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={16} color="var(--gold)" />
        </motion.div>
      </motion.button>

      <style>{`
        @media (max-width: 1024px) {
          #hero > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #hero h1 { text-align: ${isRTL ? 'right' : 'left'} !important; }
        }
      `}</style>
    </section>
  );
}
