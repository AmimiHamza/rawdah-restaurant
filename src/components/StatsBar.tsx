'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

interface Stat { label: Record<string, string>; num: number; suffix: string; }

const stats: Stat[] = [
  { num: 40,  suffix: '+', label: { en: 'Restaurants Served', fr: 'Restaurants servis',    ar: 'مطعم نخدمه' } },
  { num: 3,   suffix: '',  label: { en: 'Countries',           fr: 'Pays',                  ar: 'دول' } },
  { num: 98,  suffix: '%', label: { en: 'Client Satisfaction', fr: 'Satisfaction client',   ar: 'رضا العملاء' } },
  { num: 7,   suffix: 'd', label: { en: 'Avg. Delivery',       fr: 'Délai moyen',           ar: 'متوسط التسليم' } },
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
                {s.label[locale] ?? s.label.en}
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
