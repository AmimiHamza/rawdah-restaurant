'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, Globe, CheckCircle, Send, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const services: Record<string, string[]> = {
  en: [
    'Luxury Restaurant Website',
    'Admin Dashboard & Analytics',
    'Online Reservation System',
    'Bilingual EN/AR Setup',
    'Full Package (Website + Dashboard)',
    'Consultation',
  ],
  fr: [
    'Site Restaurant de Luxe',
    'Tableau de Bord & Analytiques',
    'Système de Réservation en Ligne',
    'Configuration Multilingue FR/AR',
    'Offre Complète (Site + Tableau de Bord)',
    'Consultation',
  ],
  ar: [
    'موقع مطعم احترافي',
    'لوحة تحكم وتحليلات',
    'نظام حجوزات إلكتروني',
    'إعداد ثنائي اللغة عربي/إنجليزي',
    'الباقة الكاملة (موقع + لوحة تحكم)',
    'استشارة',
  ],
};

const infoCards: Record<string, { icon: React.ReactNode; label: string; value: string }[]> = {
  en: [
    { icon: <Mail size={18} />, label: 'Email', value: 'hamza.amimi.p@gmail.com' },
    { icon: <Clock size={18} />, label: 'Response Time', value: 'Within 24 hours' },
    { icon: <Globe size={18} />, label: 'We serve', value: 'Worldwide' },
  ],
  fr: [
    { icon: <Mail size={18} />, label: 'E-mail', value: 'hamza.amimi.p@gmail.com' },
    { icon: <Clock size={18} />, label: 'Délai de réponse', value: 'Sous 24 heures' },
    { icon: <Globe size={18} />, label: 'Zones servies', value: 'Monde entier' },
  ],
  ar: [
    { icon: <Mail size={18} />, label: 'البريد', value: 'hamza.amimi.p@gmail.com' },
    { icon: <Clock size={18} />, label: 'وقت الرد', value: 'خلال 24 ساعة' },
    { icon: <Globe size={18} />, label: 'نخدم', value: 'حول العالم' },
  ],
};

const contactUi: Record<string, {
  eyebrow: string; heading: string; quote: string; sent: string; sentSub: string; sendAnother: string;
  nameLbl: string; namePh: string; emailLbl: string; emailPh: string;
  serviceLbl: string; servicePh: string; msgLbl: string; msgPh: string;
  error: string; sending: string; send: string;
}> = {
  en: {
    eyebrow: 'Start Your Project', heading: 'Request a Service',
    quote: '"We build digital experiences that tell real stories."',
    sent: 'Message Sent', sentSub: 'Our team will reach out within 24 hours.', sendAnother: 'Send Another',
    nameLbl: 'Full Name', namePh: 'John Al-Rashid',
    emailLbl: 'Email Address', emailPh: 'you@example.com',
    serviceLbl: 'Service Type', servicePh: 'Select a service…',
    msgLbl: 'Tell us about your request…', msgPh: 'Describe your request, event size, preferred dates…',
    error: 'Something went wrong. Please try again.', sending: 'Sending…', send: 'Send Message',
  },
  fr: {
    eyebrow: 'Démarrez votre projet', heading: 'Demander un service',
    quote: '"Nous créons des expériences digitales qui racontent de vraies histoires."',
    sent: 'Message envoyé', sentSub: 'Notre équipe vous répondra sous 24 heures.', sendAnother: 'Envoyer un autre',
    nameLbl: 'Nom complet', namePh: 'Jean Al-Rashid',
    emailLbl: 'Adresse e-mail', emailPh: 'vous@exemple.com',
    serviceLbl: 'Type de service', servicePh: 'Sélectionnez un service…',
    msgLbl: 'Parlez-nous de votre projet…', msgPh: 'Décrivez votre demande, taille de l\'événement, dates souhaitées…',
    error: 'Une erreur est survenue. Veuillez réessayer.', sending: 'Envoi en cours…', send: 'Envoyer le message',
  },
  ar: {
    eyebrow: 'ابدأ مشروعك', heading: 'اطلب خدمتك الآن',
    quote: '"نبني تجارب رقمية تحكي قصصاً حقيقية."',
    sent: 'تم الإرسال', sentSub: 'سنتواصل معك خلال 24 ساعة.', sendAnother: 'رسالة جديدة',
    nameLbl: 'اسمك الكريم', namePh: 'اسمك الكريم',
    emailLbl: 'بريدك الإلكتروني', emailPh: 'بريدك الإلكتروني',
    serviceLbl: 'نوع الخدمة', servicePh: 'نوع الخدمة',
    msgLbl: 'أخبرنا عن مشروعك...', msgPh: 'أخبرنا عن مشروعك...',
    error: 'حدث خطأ، حاول مجدداً.', sending: 'جاري الإرسال...', send: 'إرسال الرسالة',
  },
};

export default function Contact() {
  const { isRTL, locale } = useI18n();
  const cards = infoCards[locale] ?? infoCards.en;
  const serviceList = services[locale] ?? services.en;
  const ui = contactUi[locale] ?? contactUi.en;

  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', email: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(212,175,55,0.75)',
    display: 'block',
    marginBottom: '8px',
    textAlign: isRTL ? 'right' : 'left',
  };

  return (
    <section id="contact" style={{ padding: '140px 0', background: '#121212' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '16px' }}>
            {ui.eyebrow}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: '#F8F8F8' }}>
            {ui.heading}
          </h2>
          <div className="gold-divider" style={{ marginTop: '20px' }} />
        </motion.div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr)',
          gap: '40px',
          alignItems: 'start',
          direction: isRTL ? 'rtl' : 'ltr',
        }}>

          {/* ── Left: info cards + quote ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '22px 24px',
                  background: 'rgba(26,26,26,0.9)',
                  border: '1px solid rgba(212,175,55,0.12)',
                  borderRadius: '4px',
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}
              >
                <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.4)', marginBottom: '6px' }}>
                    {card.label}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '20px', fontWeight: 400, color: '#F8F8F8' }}>
                    {card.value}
                  </div>
                </div>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4AF37',
                  flexShrink: 0,
                }}>
                  {card.icon}
                </div>
              </motion.div>
            ))}

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              style={{
                padding: '28px 24px',
                background: 'rgba(212,175,55,0.05)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '4px',
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              <p style={{
                fontFamily: "'Cormorant Garamond'",
                fontSize: '18px',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'rgba(248,248,248,0.8)',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}>
                {ui.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond'", fontSize: '14px', fontWeight: 600, color: '#121212' }}>
                  R
                </div>
                <div>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: '11px', fontWeight: 600, color: '#F8F8F8' }}>
                    {locale === 'ar' ? 'حمزة عميمي' : 'Hamza Amimi'}
                  </div>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 300, color: 'rgba(248,248,248,0.4)' }}>
                    {locale === 'ar' ? 'مطور ومصمم مواقع' : locale === 'fr' ? 'Développeur & Designer Web' : 'Web Developer & Designer'}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ background: 'rgba(26,26,26,0.9)', border: '1px solid rgba(212,175,55,0.2)', padding: '64px 48px', textAlign: 'center', borderRadius: '4px' }}
              >
                <CheckCircle size={48} color="#D4AF37" style={{ margin: '0 auto 20px' }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '30px', color: '#F8F8F8', marginBottom: '12px' }}>
                  {ui.sent}
                </h3>
                <p style={{ fontFamily: "'Montserrat'", fontSize: '13px', fontWeight: 300, color: 'rgba(248,248,248,0.6)' }}>
                  {ui.sentSub}
                </p>
                <button className="btn-gold" style={{ marginTop: '28px' }} onClick={() => setStatus('idle')}>
                  {ui.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: 'rgba(20,20,20,0.85)',
                  border: '1px solid rgba(212,175,55,0.12)',
                  padding: '48px 44px',
                  borderRadius: '4px',
                  backdropFilter: 'blur(10px)',
                  direction: isRTL ? 'rtl' : 'ltr',
                }}
              >
                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={labelStyle}>{ui.nameLbl}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={ui.namePh}
                      className="luxury-input"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>{ui.emailLbl}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={ui.emailPh}
                      className="luxury-input"
                    />
                  </div>
                </div>

                {/* Service */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>{ui.serviceLbl}</label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className="luxury-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="" disabled style={{ background: '#1E1E1E' }}>
                      {ui.servicePh}
                    </option>
                    {serviceList.map((s) => (
                      <option key={s} value={s} style={{ background: '#1E1E1E' }}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>{ui.msgLbl}</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={ui.msgPh}
                    className="luxury-input"
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </div>

                {status === 'error' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#e57373' }}>
                    <AlertCircle size={14} />
                    <span style={{ fontFamily: "'Montserrat'", fontSize: '12px' }}>
                      {ui.error}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-gold-solid"
                  disabled={status === 'sending'}
                  style={{ width: '100%', justifyContent: 'center', gap: '10px', opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  <Send size={14} />
                  {status === 'sending'
                    ? ui.sending
                    : ui.send}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
