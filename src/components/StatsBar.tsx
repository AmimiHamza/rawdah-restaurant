'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

interface Stat { valueEn: string; valueAr: string; labelEn: string; labelAr: string; num: number; suffix: string; }

const stats: Stat[] = [
  { num: 40,  suffix: '+', valueEn: '40+',  valueAr: '+٤٠',  labelEn: 'Restaurants Served', labelAr: 'مطعم نخدمه' },
  { num: 3,   suffix: '',  valueEn: '3',     valueAr: '٣',    labelEn: 'Countries',           labelAr: 'دول' },
  { num: 98,  suffix: '%', valueEn: '98%',   valueAr: '٩٨٪',  labelEn: 'Client Satisfaction', labelAr: 'رضا العملاء' },
  { num: 7,   suffix: 'd', valueEn: '7 days',valueAr: '٧ أيام',labelEn: 'Avg. Delivery',     labelAr: 'متوسط التسليم' },
];

function Counter({ num, suffix, active }: { num: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(num / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= num) { setVal(num); clearInterval(id); }
      else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [active, num]);
  return <>{val}{suffix}</>;
}

export default function StatsBar() {
  const { isRTL, locale } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="stats" ref={ref} style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'var(--border)' }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ background: 'var(--bg-2)', padding: '32px 24px', textAlign: 'center' }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: 'var(--gold)', lineHeight: 1, marginBottom: 8 }}>
                <Counter num={s.num} suffix={s.suffix} active={inView} />
              </div>
              <div style={{ fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
                {locale === 'ar' ? s.labelAr : s.labelEn}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          #stats .container > div { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
