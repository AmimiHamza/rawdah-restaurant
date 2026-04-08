'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, CalendarCheck, ShoppingBag, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

// Monthly revenue data (last 12 months, oldest→newest)
const monthlyData = [
  { en: 'Jan', ar: 'يناير', value: 28000 },
  { en: 'Feb', ar: 'فبراير', value: 31000 },
  { en: 'Mar', ar: 'مارس', value: 29500 },
  { en: 'Apr', ar: 'أبريل', value: 34000 },
  { en: 'May', ar: 'مايو', value: 37000 },
  { en: 'Jun', ar: 'يونيو', value: 33000 },
  { en: 'Jul', ar: 'يوليو', value: 39000 },
  { en: 'Aug', ar: 'أغسطس', value: 36000 },
  { en: 'Sep', ar: 'سبتمبر', value: 41000 },
  { en: 'Oct', ar: 'أكتوبر', value: 38000 },
  { en: 'Nov', ar: 'نوفمبر', value: 44000 },
  { en: 'Dec', ar: 'ديسمبر', value: 48300 },
];

const maxVal = Math.max(...monthlyData.map((d) => d.value));

interface StatCard {
  iconEn: React.ReactNode;
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
  deltaEn: string;
  deltaAr: string;
  positive: boolean;
}

const stats: StatCard[] = [
  {
    iconEn: <Star size={20} />,
    labelEn: 'Rating Today',   labelAr: 'تقييم اليوم',
    valueEn: '4.9',            valueAr: '٤.٩',
    deltaEn: '+0.1',           deltaAr: '0.1+',
    positive: true,
  },
  {
    iconEn: <CalendarCheck size={20} />,
    labelEn: 'Reservations',   labelAr: 'الحجوزات',
    valueEn: '27',             valueAr: '٢٧',
    deltaEn: '+8',             deltaAr: '٨+',
    positive: true,
  },
  {
    iconEn: <ShoppingBag size={20} />,
    labelEn: 'Avg. Order',     labelAr: 'متوسط الطلب',
    valueEn: '132 SAR',        valueAr: 'ر ١٣٢',
    deltaEn: '+5',             deltaAr: '٥+',
    positive: true,
  },
  {
    iconEn: <TrendingUp size={20} />,
    labelEn: 'Orders Today',   labelAr: 'طلبات اليوم',
    valueEn: '134',            valueAr: '١٣٤',
    deltaEn: '+12',            deltaAr: '١٢+',
    positive: true,
  },
];

export default function DashboardPreview() {
  const { isRTL } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="dashboard"
      ref={ref}
      style={{ padding: '120px 0', background: 'var(--bg-2)', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '16px' }}>
            {isRTL ? 'ما يحصل عليه مطعمك' : 'What Your Restaurant Gets'}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: '#F8F8F8', marginBottom: '14px' }}>
            {isRTL ? 'لوحة تحكم ذكية لإدارة مطعمك' : 'A Smart Dashboard for Your Restaurant'}
          </h2>
          <p style={{ fontFamily: "'Montserrat'", fontSize: '14px', fontWeight: 300, color: 'rgba(248,248,248,0.5)', maxWidth: '560px', margin: '0 auto 24px' }}>
            {isRTL
              ? 'تتبع إيراداتك، حجوزاتك، وطلباتك في الوقت الفعلي — كل شيء في مكان واحد.'
              : 'Track your revenue, reservations, and orders in real time — all in one place.'}
          </p>
          <div className="gold-divider" />
        </motion.div>

        {/* ── Dashboard mock-up card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow)',
          }}
        >
          {/* Window chrome */}
          <div style={{
            background: 'rgba(30,24,14,0.9)',
            borderBottom: '1px solid rgba(212,175,55,0.12)',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            direction: isRTL ? 'rtl' : 'ltr',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ fontFamily: "'Montserrat'", fontSize: '11px', color: 'rgba(248,248,248,0.3)', marginLeft: isRTL ? '0' : '12px', marginRight: isRTL ? '12px' : '0', letterSpacing: '0.1em' }}>
              {isRTL ? 'لوحة التحكم — روضة' : 'Dashboard — Rawdah'}
            </span>
          </div>

          <div style={{ padding: '28px 28px 32px', direction: isRTL ? 'rtl' : 'ltr' }}>

            {/* Revenue chart card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                background: 'rgba(40,30,10,0.6)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '8px',
                padding: '24px 24px 20px',
                marginBottom: '20px',
              }}
            >
              {/* Revenue header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  <p style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.4)', marginBottom: '6px' }}>
                    {isRTL ? 'الإيراد الشهري' : 'Monthly Revenue'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond'", fontSize: '36px', fontWeight: 400, color: '#F8F8F8', lineHeight: 1 }}>
                      {isRTL ? '٤٨,٣٠٠' : '48,300'}
                    </span>
                    <span style={{ fontFamily: "'Montserrat'", fontSize: '13px', color: 'rgba(248,248,248,0.5)' }}>
                      {isRTL ? 'ريال' : 'SAR'}
                    </span>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(39,201,63,0.15)',
                  border: '1px solid rgba(39,201,63,0.3)',
                  borderRadius: '20px',
                  padding: '5px 12px',
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}>
                  <ArrowUpRight size={13} color="#27c93f" />
                  <span style={{ fontFamily: "'Montserrat'", fontSize: '12px', fontWeight: 700, color: '#27c93f' }}>
                    +23%
                  </span>
                </div>
              </div>

              {/* Bar chart */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '6px',
                height: '90px',
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}>
                {monthlyData.map((d, i) => {
                  const height = (d.value / maxVal) * 90;
                  const isLast = i === monthlyData.length - 1;
                  return (
                    <div key={d.en} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${height}px` } : { height: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 + i * 0.04, ease: 'easeOut' }}
                        style={{
                          width: '100%',
                          background: isLast
                            ? 'linear-gradient(to top, #A8891F, #D4AF37, #F5D76E)'
                            : 'rgba(212,175,55,0.2)',
                          borderRadius: '3px 3px 0 0',
                          minWidth: '8px',
                          cursor: 'pointer',
                          transition: 'background 0.2s ease',
                        }}
                        title={`${d.value.toLocaleString()} SAR`}
                      />
                      <span style={{ fontFamily: "'Montserrat'", fontSize: '7px', color: 'rgba(248,248,248,0.3)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                        {isRTL ? d.ar.slice(0, 3) : d.en.slice(0, 3)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* KPI cards row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
                  style={{
                    background: 'rgba(40,30,10,0.5)',
                    border: '1px solid rgba(212,175,55,0.12)',
                    borderRadius: '8px',
                    padding: '18px 16px',
                    direction: isRTL ? 'rtl' : 'ltr',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span style={{ background: 'rgba(212,175,55,0.12)', borderRadius: '8px', padding: '6px', display: 'flex', color: '#D4AF37' }}>
                      {s.iconEn}
                    </span>
                    <span style={{
                      fontFamily: "'Montserrat'",
                      fontSize: '10px',
                      fontWeight: 700,
                      color: s.positive ? '#27c93f' : '#ff5f56',
                      background: s.positive ? 'rgba(39,201,63,0.12)' : 'rgba(255,95,86,0.12)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                    }}>
                      {isRTL ? s.deltaAr : s.deltaEn}▲
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '26px', fontWeight: 400, color: '#F8F8F8', lineHeight: 1, marginBottom: '4px', textAlign: isRTL ? 'right' : 'left' }}>
                    {isRTL ? s.valueAr : s.valueEn}
                  </div>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 300, color: 'rgba(248,248,248,0.4)', textAlign: isRTL ? 'right' : 'left' }}>
                    {isRTL ? s.labelAr : s.labelEn}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features list below dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginTop: '40px',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
        >
          {[
            { en: 'Real-time revenue tracking', ar: 'تتبع الإيرادات الفوري' },
            { en: 'Reservation management', ar: 'إدارة الحجوزات' },
            { en: 'Order analytics', ar: 'تحليلات الطلبات' },
            { en: 'Customer ratings & reviews', ar: 'تقييمات العملاء' },
            { en: 'Menu performance insights', ar: 'أداء قائمة الطعام' },
            { en: 'Export reports (PDF/CSV)', ar: 'تصدير التقارير (PDF/CSV)' },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Montserrat'", fontSize: '13px', fontWeight: 300, color: 'rgba(248,248,248,0.65)' }}>
                {isRTL ? f.ar : f.en}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #dashboard .kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
