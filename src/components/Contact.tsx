'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, Globe, CheckCircle, Send, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const services = {
  en: [
    'Private Dining / Event Booking',
    'Corporate Event',
    'Wedding & Celebration',
    'Media / Press Inquiry',
    'Catering Partnership',
    'General Inquiry',
  ],
  ar: [
    'حجز غرفة خاصة / فعالية',
    'فعالية شركات',
    'حفل زفاف أو احتفال',
    'استفسار إعلامي / صحفي',
    'شراكة تموين',
    'استفسار عام',
  ],
};

const infoCards = {
  en: [
    { icon: <Mail size={18} />, label: 'Email', value: 'concierge@rawdah.sa' },
    { icon: <Clock size={18} />, label: 'Response Time', value: 'Within 24 hours' },
    { icon: <Globe size={18} />, label: 'We serve', value: 'Saudi Arabia & GCC' },
  ],
  ar: [
    { icon: <Mail size={18} />, label: 'البريد', value: 'concierge@rawdah.sa' },
    { icon: <Clock size={18} />, label: 'وقت الرد', value: 'خلال ٢٤ ساعة' },
    { icon: <Globe size={18} />, label: 'نخدم', value: 'السعودية والخليج' },
  ],
};

export default function Contact() {
  const { isRTL, locale } = useI18n();
  const cards = infoCards[locale];
  const serviceList = services[locale];

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
            {isRTL ? 'تواصل معنا' : 'Get In Touch'}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: '#F8F8F8' }}>
            {isRTL ? 'كيف يمكننا مساعدتك؟' : 'How Can We Serve You?'}
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
                {isRTL
                  ? '"نبني تجارب لا تُنسى، وكل سؤالك هو بداية قصة."'
                  : '"Every inquiry is the beginning of an unforgettable experience."'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond'", fontSize: '14px', fontWeight: 600, color: '#121212' }}>
                  R
                </div>
                <div>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: '11px', fontWeight: 600, color: '#F8F8F8' }}>
                    {isRTL ? 'فريق روضة' : 'Rawdah Team'}
                  </div>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 300, color: 'rgba(248,248,248,0.4)' }}>
                    {isRTL ? 'الكونسيرج والضيافة' : 'Concierge & Hospitality'}
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
                  {isRTL ? 'تم الإرسال' : 'Message Sent'}
                </h3>
                <p style={{ fontFamily: "'Montserrat'", fontSize: '13px', fontWeight: 300, color: 'rgba(248,248,248,0.6)' }}>
                  {isRTL ? 'سنتواصل معك خلال ٢٤ ساعة.' : 'Our team will reach out within 24 hours.'}
                </p>
                <button className="btn-gold" style={{ marginTop: '28px' }} onClick={() => setStatus('idle')}>
                  {isRTL ? 'رسالة جديدة' : 'Send Another'}
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
                    <label style={labelStyle}>{isRTL ? 'اسمك الكريم' : 'Full Name'}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={isRTL ? 'اسمك الكريم' : 'John Al-Rashid'}
                      className="luxury-input"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>{isRTL ? 'بريدك الإلكتروني' : 'Email Address'}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={isRTL ? 'بريدك الإلكتروني' : 'you@example.com'}
                      className="luxury-input"
                    />
                  </div>
                </div>

                {/* Service */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>{isRTL ? 'نوع الخدمة' : 'Service Type'}</label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className="luxury-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="" disabled style={{ background: '#1E1E1E' }}>
                      {isRTL ? 'نوع الخدمة' : 'Select a service…'}
                    </option>
                    {serviceList.map((s) => (
                      <option key={s} value={s} style={{ background: '#1E1E1E' }}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>{isRTL ? 'أخبرنا عن مشروعك...' : 'Tell us about your request…'}</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={isRTL ? 'أخبرنا عن مشروعك...' : 'Describe your request, event size, preferred dates…'}
                    className="luxury-input"
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </div>

                {status === 'error' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#e57373' }}>
                    <AlertCircle size={14} />
                    <span style={{ fontFamily: "'Montserrat'", fontSize: '12px' }}>
                      {isRTL ? 'حدث خطأ، حاول مجدداً.' : 'Something went wrong. Please try again.'}
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
                    ? (isRTL ? 'جاري الإرسال...' : 'Sending…')
                    : (isRTL ? 'إرسال الرسالة' : 'Send Message')}
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
