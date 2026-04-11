'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, CalendarCheck, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const monthlyData = [
  { en: 'Jan', fr: 'Jan', ar: 'يناير', value: 28000 },
  { en: 'Feb', fr: 'Fév', ar: 'فبراير', value: 31000 },
  { en: 'Mar', fr: 'Mar', ar: 'مارس',  value: 29500 },
  { en: 'Apr', fr: 'Avr', ar: 'أبريل', value: 34000 },
  { en: 'May', fr: 'Mai', ar: 'مايو',  value: 37000 },
  { en: 'Jun', fr: 'Juin',ar: 'يونيو', value: 33000 },
  { en: 'Jul', fr: 'Juil',ar: 'يوليو', value: 39000 },
  { en: 'Aug', fr: 'Aoû', ar: 'أغسطس',value: 36000 },
  { en: 'Sep', fr: 'Sep', ar: 'سبتمبر',value: 41000 },
  { en: 'Oct', fr: 'Oct', ar: 'أكتوبر',value: 38000 },
  { en: 'Nov', fr: 'Nov', ar: 'نوفمبر',value: 44000 },
  { en: 'Dec', fr: 'Déc', ar: 'ديسمبر',value: 48300 },
];

const maxVal = Math.max(...monthlyData.map((d) => d.value));

interface StatCard {
  icon: React.ReactNode;
  label: Record<string, string>;
  value: Record<string, string>;
  delta: Record<string, string>;
  positive: boolean;
}

const stats: StatCard[] = [
  {
    icon: <Star size={20} />,
    label: { en: 'Rating Today',  fr: 'Note du jour',    ar: 'تقييم اليوم'    },
    value: { en: '4.9',           fr: '4,9',             ar: '4.9'            },
    delta: { en: '+0.1',          fr: '+0,1',            ar: '0.1+'           },
    positive: true,
  },
  {
    icon: <CalendarCheck size={20} />,
    label: { en: 'Reservations',  fr: 'Réservations',    ar: 'الحجوزات'       },
    value: { en: '27',            fr: '27',              ar: '27'             },
    delta: { en: '+8',            fr: '+8',              ar: '8+'             },
    positive: true,
  },
  {
    icon: <Star size={20} />,
    label: { en: 'Avg. Order',    fr: 'Commande moy.',   ar: 'متوسط الطلب'    },
    value: { en: '$132',          fr: '£132',            ar: '132 ر.س'        },
    delta: { en: '+5',            fr: '+5',              ar: '+5'             },
    positive: true,
  },
  {
    icon: <TrendingUp size={20} />,
    label: { en: 'Orders Today',  fr: 'Commandes du jour', ar: 'طلبات اليوم'  },
    value: { en: '134',           fr: '134',             ar: '134'            },
    delta: { en: '+12',           fr: '+12',             ar: '12+'            },
    positive: true,
  },
];

const ui = {
  en: {
    eyebrow:  'What Your Restaurant Gets',
    headline: 'A Smart Dashboard for Your Restaurant',
    sub:      'Track your revenue, reservations, and orders in real time — all in one place.',
    chrome:   'Dashboard — Rawdah',
    revenue:  'Monthly Revenue',
    sar:      'USD',
    amount:   '$48,300',
    features: [
      'Real-time revenue tracking',
      'Reservation management',
      'Order analytics',
      'Customer ratings & reviews',
      'Menu performance insights',
      'Export reports (PDF/CSV)',
    ],
  },
  fr: {
    eyebrow:  'Ce que votre restaurant obtient',
    headline: 'Un Tableau de Bord Intelligent pour votre Restaurant',
    sub:      'Suivez vos revenus, réservations et commandes en temps réel — tout en un seul endroit.',
    chrome:   'Tableau de bord — Rawdah',
    revenue:  'Revenu mensuel',
    sar:      'GBP',
    amount:   '£48,300',
    features: [
      'Suivi des revenus en temps réel',
      'Gestion des réservations',
      'Analytique des commandes',
      "Évaluations et avis clients",
      'Performance du menu',
      'Export de rapports (PDF/CSV)',
    ],
  },
  ar: {
    eyebrow:  'ما يحصل عليه مطعمك',
    headline: 'لوحة تحكم ذكية لإدارة مطعمك',
    sub:      'تتبع إيراداتك، حجوزاتك، وطلباتك في الوقت الفعلي — كل شيء في مكان واحد.',
    chrome:   'لوحة التحكم — روضة',
    revenue:  'الإيراد الشهري',
    sar:      'ر.س',
    amount:   '48,300',
    features: [
      'تتبع الإيرادات الفوري',
      'إدارة الحجوزات',
      'تحليلات الطلبات',
      'تقييمات العملاء',
      'أداء قائمة الطعام',
      'تصدير التقارير (PDF/CSV)',
    ],
  },
};

export default function DashboardPreview() {
  const { isRTL, locale } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const l = ui[locale as keyof typeof ui] ?? ui.en;

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
          <span style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '16px' }}>
            {l.eyebrow}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: 'var(--text)', marginBottom: '14px' }}>
            {l.headline}
          </h2>
          <p style={{ fontFamily: "'Montserrat'", fontSize: '14px', fontWeight: 300, color: 'var(--text-2)', maxWidth: '560px', margin: '0 auto 24px' }}>
            {l.sub}
          </p>
          <div className="gold-divider" />
        </motion.div>

        {/* Dashboard mock-up card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}
        >
          {/* Window chrome */}
          <div style={{ background: 'var(--bg-card-2)', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '8px', direction: isRTL ? 'rtl' : 'ltr' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ fontFamily: "'Montserrat'", fontSize: '11px', color: 'var(--text-3)', marginLeft: isRTL ? '0' : '12px', marginRight: isRTL ? '12px' : '0', letterSpacing: '0.1em' }}>
              {l.chrome}
            </span>
          </div>

          <div style={{ padding: '28px 28px 32px', direction: isRTL ? 'rtl' : 'ltr' }}>

            {/* Revenue chart card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px 24px 20px', marginBottom: '20px' }}
            >
              {/* Revenue header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  <p style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '6px' }}>
                    {l.revenue}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond'", fontSize: '36px', fontWeight: 400, color: 'var(--text)', lineHeight: 1 }}>
                      {l.amount}
                    </span>
                    <span style={{ fontFamily: "'Montserrat'", fontSize: '13px', color: 'var(--text-3)' }}>
                      {l.sar}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(39,201,63,0.12)', border: '1px solid rgba(39,201,63,0.25)', borderRadius: '20px', padding: '5px 12px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <ArrowUpRight size={13} color="#27c93f" />
                  <span style={{ fontFamily: "'Montserrat'", fontSize: '12px', fontWeight: 700, color: '#27c93f' }}>+23%</span>
                </div>
              </div>

              {/* Bar chart */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '90px', flexDirection: isRTL ? 'row-reverse' : 'row', overflowX: 'auto', paddingBottom: '2px' }}>
                {monthlyData.map((d, i) => {
                  const height = (d.value / maxVal) * 90;
                  const isLast = i === monthlyData.length - 1;
                  const label = locale === 'ar' ? d.ar.slice(0, 3) : locale === 'fr' ? d.fr.slice(0, 3) : d.en.slice(0, 3);
                  return (
                    <div key={d.en} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${height}px` } : { height: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 + i * 0.04, ease: 'easeOut' }}
                        style={{ width: '100%', background: isLast ? 'linear-gradient(to top, #A8891F, #D4AF37, #F5D76E)' : 'rgba(212,175,55,0.2)', borderRadius: '3px 3px 0 0', minWidth: '8px', cursor: 'pointer' }}
                        title={`${d.value.toLocaleString()} SAR`}
                      />
                      <span className="chart-label" style={{ fontFamily: "'Montserrat'", fontSize: '7px', color: 'var(--text-3)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* KPI cards */}
            <div className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
                  style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '18px 16px', direction: isRTL ? 'rtl' : 'ltr' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span style={{ background: 'var(--pill-bg)', borderRadius: '8px', padding: '6px', display: 'flex', color: 'var(--gold)' }}>
                      {s.icon}
                    </span>
                    <span style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 700, color: s.positive ? '#27c93f' : '#ff5f56', background: s.positive ? 'rgba(39,201,63,0.12)' : 'rgba(255,95,86,0.12)', padding: '2px 8px', borderRadius: '12px' }}>
                      {s.delta[locale] ?? s.delta.en}▲
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '26px', fontWeight: 400, color: 'var(--text)', lineHeight: 1, marginBottom: '4px', textAlign: isRTL ? 'right' : 'left' }}>
                    {s.value[locale] ?? s.value.en}
                  </div>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 300, color: 'var(--text-3)', textAlign: isRTL ? 'right' : 'left' }}>
                    {s.label[locale] ?? s.label.en}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '40px', direction: isRTL ? 'rtl' : 'ltr' }}
        >
          {l.features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Montserrat'", fontSize: '13px', fontWeight: 300, color: 'var(--text-2)' }}>
                {f}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .kpi-grid > div { padding: 14px 10px !important; }
        }
        @media (max-width: 480px) { .chart-label { display: none; } }
      `}</style>
    </section>
  );
}
