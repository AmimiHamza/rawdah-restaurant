'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const ui = {
  en: {
    eyebrow: 'Website as a Service',
    headline: 'Risk-Free Digital Transformation',
    sub: 'Your restaurant gets a luxury website, smart dashboard, and ongoing support — for one simple monthly fee. No setup cost. No hidden fees. No risk.',
    zeroLabel: 'Setup Fee',
    thenLabel: 'Instead, just:',
    price: '$79',
    period: '/month',
    priceNote: '0 setup · Cancel anytime',
    tooltip: 'Includes Vercel hosting, SSL certificate, and ongoing technical support',
    pillars: [
      { icon: '🛡', title: '0% Financial Risk', desc: 'No upfront payment. We invest in your success — you only pay when your site is live and delivering results.' },
      { icon: '🔄', title: 'Always Updated', desc: "We handle every update, fix, and improvement. Your site never becomes outdated — we keep it at peak performance." },
      { icon: '📈', title: 'Performance Driven', desc: 'Monthly performance reports. We continuously optimize your site for more reservations, more orders, and more revenue.' },
    ],
    cta: 'Start for $0 Today',
    contact: 'Book a Free Call',
  },
  fr: {
    eyebrow: 'Site web en tant que Service',
    headline: 'Transformation Numérique Sans Risque',
    sub: "Votre restaurant obtient un site de luxe, un tableau de bord intelligent et un support continu — pour un abonnement mensuel simple. Sans frais de création, sans frais cachés, sans risque.",
    zeroLabel: 'Frais de création',
    thenLabel: 'À la place, seulement :',
    price: '79 £',
    period: '/mois',
    priceNote: "0 frais d'installation · Résiliation à tout moment",
    tooltip: "Inclut l'hébergement Vercel, le certificat SSL et le support technique continu",
    pillars: [
      { icon: '🛡', title: '0% de Risque Financier', desc: "Aucun paiement initial. Nous investissons dans votre succès — vous ne payez que lorsque votre site est en ligne." },
      { icon: '🔄', title: 'Toujours à Jour', desc: "Nous gérons chaque mise à jour, correction et amélioration. Votre site ne vieillit jamais." },
      { icon: '📈', title: 'Axé sur la Performance', desc: "Rapports de performance mensuels. Nous optimisons continuellement pour plus de réservations et de revenus." },
    ],
    cta: 'Commencer à 0 £',
    contact: 'Réserver un appel gratuit',
  },
  ar: {
    eyebrow: 'الموقع كخدمة اشتراك',
    headline: 'تحول رقمي بلا مخاطرة',
    sub: 'مطعمك يحصل على موقع فاخر، لوحة تحكم ذكية، ودعم مستمر — مقابل رسوم شهرية بسيطة. بدون رسوم تأسيس، بدون رسوم خفية، بدون مخاطرة.',
    zeroLabel: 'رسوم التأسيس',
    thenLabel: 'بدلاً من ذلك، فقط:',
    price: '299 ر.س',
    period: '/شهر',
    priceNote: '٠ رسوم تأسيس · إلغاء في أي وقت',
    tooltip: 'يشمل استضافة Vercel، شهادة SSL، والدعم التقني المستمر',
    pillars: [
      { icon: '🛡', title: 'صفر مخاطرة مالية', desc: 'لا دفع مسبق. نستثمر في نجاحك — تدفع فقط عندما يكون الموقع حياً ويحقق نتائج.' },
      { icon: '🔄', title: 'محدّث دائماً', desc: 'نتولى كل تحديث وإصلاح وتحسين. موقعك لن يتقادم أبداً — نبقيه يعمل بأعلى أداء.' },
      { icon: '📈', title: 'مدفوع بالأداء', desc: 'تقارير أداء شهرية. نحسّن موقعك باستمرار لمزيد من الحجوزات والطلبات والإيرادات.' },
    ],
    cta: 'ابدأ بـ ٠ ريال اليوم',
    contact: 'احجز مكالمة مجانية',
  },
};

export default function WaaSSection() {
  const { locale, isRTL } = useI18n();
  const l = ui[locale as keyof typeof ui] ?? ui.en;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="waas" style={{ background: 'var(--bg-2)', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ direction: isRTL ? 'rtl' : 'ltr', position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 16 }}
        >
          <span style={{ fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            {l.eyebrow}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text)', textAlign: 'center', marginBottom: 16, lineHeight: 1.12 }}
        >
          {l.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "'Montserrat'", fontSize: 14, fontWeight: 300, color: 'var(--text-2)', textAlign: 'center', maxWidth: 580, margin: '0 auto 72px', lineHeight: 1.8 }}
        >
          {l.sub}
        </motion.p>

        {/* Zero + Pricing block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          {/* Setup = 0 badge */}
          <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 40, padding: '5px 18px', marginBottom: 16 }}>
            <span style={{ fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              {l.zeroLabel}
            </span>
          </div>

          {/* Golden 0 */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(80px, 20vw, 140px)',
            fontWeight: 300,
            lineHeight: 0.85,
            color: 'var(--gold)',
            textShadow: '0 0 80px rgba(212,175,55,0.5), 0 0 40px rgba(212,175,55,0.3)',
            filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.25))',
          }}>
            {locale === 'ar' ? '٠' : '0'}
          </div>

          <div style={{ fontFamily: "'Montserrat'", fontSize: 12, fontWeight: 300, color: 'var(--text-3)', marginTop: 12, letterSpacing: '0.05em' }}>
            {l.thenLabel}
          </div>

          {/* Monthly price */}
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 400, color: 'var(--text)' }}>
              {l.price}
            </span>
            <span style={{ fontFamily: "'Montserrat'", fontSize: 16, fontWeight: 300, color: 'var(--text-3)' }}>
              {l.period}
            </span>
          </div>

          {/* Price note + info button */}
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'Montserrat'", fontSize: 11, fontWeight: 300, color: 'var(--text-3)' }}>
              {l.priceNote}
            </span>
            <div style={{ position: 'relative' }}>
              <button
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
                style={{ width: 16, height: 16, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: "'Montserrat'", fontSize: 9, color: 'var(--text-3)', lineHeight: 1 }}
              >
                i
              </button>
              {tooltipVisible && (
                <div style={{
                  position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px',
                  width: 220, fontFamily: "'Montserrat'", fontSize: 11, fontWeight: 300, color: 'var(--text-2)',
                  lineHeight: 1.65, textAlign: isRTL ? 'right' : 'left', zIndex: 10,
                  whiteSpace: 'normal', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}>
                  {l.tooltip}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* 3 Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 60 }}>
          {l.pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '32px 28px', textAlign: isRTL ? 'right' : 'left' }}
            >
              <div style={{ fontSize: 32, marginBottom: 16 }}>{pillar.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: 'var(--gold)', marginBottom: 10, lineHeight: 1.2 }}>
                {pillar.title}
              </h3>
              <p style={{ fontFamily: "'Montserrat'", fontSize: 12, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.8 }}>
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}
        >
          <button onClick={() => scrollTo('#contact')} className="btn-gold-solid" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {l.cta} <Arrow size={14} />
          </button>
          <button onClick={() => scrollTo('#contact')} className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {l.contact}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
