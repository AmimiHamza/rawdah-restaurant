'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const PEAK_DAYS = [4, 5]; // Thursday=4, Friday=5 (getDay())

export default function Reservation() {
  const { t, isRTL } = useI18n();

  const [form, setForm] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: '',
    email: '',
    occasion: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const guestCount = parseInt(form.guests || '0', 10);
  const suggestPrivate = guestCount >= 9;

  const isPeakDay = () => {
    if (!form.date) return false;
    const d = new Date(form.date);
    return PEAK_DAYS.includes(d.getDay());
  };
  const requireDeposit = isPeakDay() && (form.time === '19:00' || form.time === '20:00' || form.time === '20:30' || form.time === '21:00' || form.time === '21:30' || form.time === '22:00');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const labelStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: 'rgba(212,175,55,0.8)',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <section id="reservations" style={{ padding: '140px 0', background: '#121212', position: 'relative', overflow: 'hidden' }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        [isRTL ? 'left' : 'right']: 0,
        width: '40%',
        height: '100%',
        backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=60)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.06,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: isRTL ? 'right' : 'left', marginBottom: '60px' }}
        >
          <span style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '16px' }}>
            {t.reservation.eyebrow}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: '#F8F8F8' }}>
            {t.reservation.title}
          </h2>
          <div style={{ width: '48px', height: '1px', background: '#D4AF37', marginTop: '20px', marginLeft: isRTL ? 'auto' : '0', marginRight: isRTL ? '0' : 'auto' }} />
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(30,30,30,0.8)',
              border: '1px solid rgba(212,175,55,0.3)',
              padding: '60px 48px',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            <CheckCircle size={48} color="#D4AF37" style={{ margin: '0 auto 24px' }} />
            <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '32px', fontWeight: 400, color: '#F8F8F8', marginBottom: '16px' }}>
              {isRTL ? 'شكراً لكم' : 'Thank You'}
            </h3>
            <p style={{ fontFamily: "'Montserrat'", fontSize: '14px', fontWeight: 300, color: 'rgba(248,248,248,0.7)', lineHeight: 1.8 }}>
              {t.reservation.success}
            </p>
            <button
              className="btn-gold"
              style={{ marginTop: '32px' }}
              onClick={() => setSubmitted(false)}
            >
              {isRTL ? 'حجز جديد' : 'New Reservation'}
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            style={{
              background: 'rgba(20,20,20,0.8)',
              border: '1px solid rgba(212,175,55,0.12)',
              padding: '56px 48px',
              backdropFilter: 'blur(10px)',
              direction: isRTL ? 'rtl' : 'ltr',
            }}
          >
            {/* Row 1: Date, Time, Guests */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={labelStyle}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Calendar size={11} color="rgba(212,175,55,0.7)" />
                    {t.reservation.date}
                  </span>
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="luxury-input"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Clock size={11} color="rgba(212,175,55,0.7)" />
                    {t.reservation.time}
                  </span>
                </label>
                <select name="time" required value={form.time} onChange={handleChange} className="luxury-input" style={{ cursor: 'pointer' }}>
                  <option value="" disabled>{isRTL ? 'اختر الوقت' : 'Select time'}</option>
                  {(['12:00','13:00','14:00','19:00','20:00','20:30','21:00','21:30','22:00']).map((tm) => (
                    <option key={tm} value={tm} style={{ background: '#1E1E1E' }}>{tm}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Users size={11} color="rgba(212,175,55,0.7)" />
                    {t.reservation.guests}
                  </span>
                </label>
                <input
                  type="number"
                  name="guests"
                  min="1"
                  max="50"
                  required
                  value={form.guests}
                  onChange={handleChange}
                  className="luxury-input"
                />
              </div>
            </div>

            {/* Private room suggestion */}
            {suggestPrivate && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  padding: '14px 18px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  borderRadius: '2px',
                }}
              >
                <AlertCircle size={16} color="#D4AF37" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: "'Montserrat'", fontSize: '12px', fontWeight: 400, color: '#D4AF37' }}>
                  {t.reservation.privateRoom}
                </span>
              </motion.div>
            )}

            {/* Deposit warning */}
            {requireDeposit && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(212,175,55,0.05)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  padding: '14px 18px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  borderRadius: '2px',
                }}
              >
                <Lock size={14} color="rgba(212,175,55,0.7)" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: "'Montserrat'", fontSize: '12px', fontWeight: 400, color: 'rgba(212,175,55,0.8)' }}>
                  {t.reservation.deposit}
                </span>
              </motion.div>
            )}

            {/* Row 2: Name, Phone, Email */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              {[
                { name: 'name', label: t.reservation.name, type: 'text' },
                { name: 'phone', label: t.reservation.phone, type: 'tel' },
                { name: 'email', label: t.reservation.email, type: 'email' },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    type={type}
                    name={name}
                    required
                    value={form[name as keyof typeof form]}
                    onChange={handleChange}
                    className="luxury-input"
                    placeholder={label}
                  />
                </div>
              ))}
            </div>

            {/* Row 3: Occasion + Notes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '36px' }}>
              <div>
                <label style={labelStyle}>{t.reservation.occasion}</label>
                <select name="occasion" value={form.occasion} onChange={handleChange} className="luxury-input" style={{ cursor: 'pointer' }}>
                  {(['None','Birthday','Anniversary','Business Dinner','Proposal','Other']).map((occ) => (
                    <option key={occ} value={occ} style={{ background: '#1E1E1E' }}>{occ}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>{t.reservation.notes}</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="luxury-input"
                  placeholder={isRTL ? 'حساسية، قيود غذائية...' : 'Allergies, dietary restrictions...'}
                  style={{ resize: 'vertical', minHeight: '50px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: isRTL ? 'flex-start' : 'flex-end' }}>
              <button type="submit" className="btn-gold-solid" style={{ minWidth: '220px', justifyContent: 'center' }}>
                {t.reservation.cta}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
