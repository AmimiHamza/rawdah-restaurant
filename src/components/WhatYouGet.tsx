'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface Feature {
  id: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  included: boolean; // always included vs optional
}

const features: Feature[] = [
  { id: 'website',    icon: '🌐', titleEn: 'Luxury Restaurant Website',  titleAr: 'موقع مطعم احترافي',         descEn: 'Fully custom design tailored to your brand — hero video, story, menu, and more.',        descAr: 'تصميم مخصص بالكامل يعكس هوية مطعمك — فيديو، قصة، قائمة طعام، وأكثر.',       included: true },
  { id: 'bilingual',  icon: '🌍', titleEn: 'Bilingual EN / AR + RTL',    titleAr: 'ثنائي اللغة عربي / إنجليزي', descEn: 'Full right-to-left Arabic support. One click switches the entire site language.',            descAr: 'دعم كامل للغة العربية من اليمين لليسار. تبديل كامل للموقع بنقرة واحدة.',       included: true },
  { id: 'mobile',     icon: '📱', titleEn: 'Mobile-First Responsive',    titleAr: 'متوافق مع الجوال',            descEn: 'Pixel-perfect on every device — phone, tablet, and desktop.',                              descAr: 'مثالي على كل الأجهزة — جوال، تابلت، وحاسوب.',                                   included: true },
  { id: 'menu',       icon: '📋', titleEn: 'Interactive Digital Menu',   titleAr: 'قائمة طعام رقمية تفاعلية',  descEn: 'Filter by category, search dishes, view allergens and SFDA calorie counts per dish.',      descAr: 'تصفية حسب الفئة، بحث، عرض مسببات الحساسية وسعرات SFDA لكل طبق.',             included: false },
  { id: 'reservation',icon: '📅', titleEn: 'Online Reservation System',  titleAr: 'نظام حجوزات أونلاين',        descEn: 'Date, time, party size selection. Private room suggestions and peak-hour deposit logic.',   descAr: 'اختيار التاريخ، الوقت، وعدد الضيوف. اقتراح غرف خاصة ومنطق عربون.',           included: false },
  { id: 'ordering',   icon: '🛍', titleEn: 'Online Ordering & Payment',  titleAr: 'طلب أونلاين ودفع إلكتروني', descEn: 'Course-sequenced checkout (Starter → Main → Dessert) with Mada and Apple Pay.',            descAr: 'سلة منظمة بالترتيب (مقبلات ← رئيسي ← حلوى) مع مدى وآبل باي.',               included: false },
  { id: 'dashboard',  icon: '📊', titleEn: 'Smart Admin Dashboard',      titleAr: 'لوحة تحكم ذكية',             descEn: 'Revenue charts, reservations, orders, and ratings — all real-time in your pocket.',         descAr: 'مخططات الإيرادات، الحجوزات، الطلبات، والتقييمات — كل شيء في الوقت الفعلي.',  included: false },
  { id: 'whatsapp',   icon: '💬', titleEn: 'WhatsApp Concierge',         titleAr: 'كونسيرج واتساب',             descEn: 'Floating WhatsApp button for direct guest support and automated booking confirmations.',   descAr: 'زر واتساب عائم للدعم المباشر وتأكيدات الحجز التلقائية.',                       included: false },
  { id: 'seo',        icon: '🔍', titleEn: 'SEO + Google Maps Ready',    titleAr: 'تهيئة SEO وخرائط جوجل',     descEn: 'Schema.org markup, meta tags, and local SEO so guests find you first.',                    descAr: 'ترميز Schema.org، علامات ميتا، وSEO محلي حتى يجدك الضيوف أولاً.',             included: true },
  { id: 'private',    icon: '🏛', titleEn: 'Private Dining Showcase',    titleAr: 'عرض الغرف الخاصة',           descEn: 'Showcase your private rooms with photo gallery and direct booking flow.',                  descAr: 'عرض غرفك الخاصة بمعرض صور وتدفق حجز مباشر.',                                  included: false },
];

export default function WhatYouGet() {
  const { isRTL, locale } = useI18n();
  const [selected, setSelected] = useState<Set<string>>(new Set(features.filter(f => f.included).map(f => f.id)));

  const toggle = (id: string) => {
    const f = features.find(f => f.id === id)!;
    if (f.included) return; // can't deselect always-included
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedFeatures = features.filter(f => selected.has(f.id));
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const buildContactMessage = () => {
    const names = selectedFeatures.map(f => locale === 'ar' ? f.titleAr : f.titleEn).join(', ');
    return encodeURIComponent(`Hello Amimi Digital, I would like: ${names}`);
  };

  return (
    <section id="features" style={{ background: 'var(--bg)', padding: '120px 0' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="eyebrow">
            {locale === 'ar' ? 'صمم حزمتك' : 'Build Your Package'}
          </span>
          <h2 className="section-title" style={{ marginBottom: 14 }}>
            {locale === 'ar' ? 'اختر ما يناسب مطعمك' : 'Choose What Your Restaurant Needs'}
          </h2>
          <p className="body-text" style={{ maxWidth: 560, margin: '0 auto 8px' }}>
            {locale === 'ar'
              ? 'حدد الميزات التي تريدها — سنبني لك موقعاً مخصصاً بالضبط. تواصل معنا بعد اختيارك.'
              : 'Select the features you want — we\'ll build you a site that fits exactly. Reach out after selecting.'}
          </p>
          <p style={{ fontFamily: "'Montserrat'", fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.1em' }}>
            {locale === 'ar' ? '✓ المضلل بالذهبي مشمول دائماً' : '✓ Gold-highlighted items are always included'}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 32, alignItems: 'start', direction: isRTL ? 'rtl' : 'ltr' }}>

          {/* ── Feature grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {features.map((f, i) => {
              const isSelected = selected.has(f.id);
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => toggle(f.id)}
                  className={`feature-card${isSelected ? ' selected' : ''}`}
                  style={{ cursor: f.included ? 'default' : 'pointer' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <span style={{ fontSize: 28, lineHeight: 1 }}>{f.icon}</span>
                    <div className="feat-check">
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                            <Check size={12} color={f.included ? '#121212' : 'var(--bg)'} strokeWidth={3} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 20, fontWeight: 400, color: isSelected ? 'var(--gold)' : 'var(--text)', marginBottom: 8, textAlign: isRTL ? 'right' : 'left', transition: 'color 0.25s ease' }}>
                    {locale === 'ar' ? f.titleAr : f.titleEn}
                    {f.included && <span style={{ fontFamily: "'Montserrat'", fontSize: 8, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginLeft: isRTL ? 0 : 8, marginRight: isRTL ? 8 : 0, background: 'var(--pill-bg)', padding: '2px 7px', borderRadius: 10 }}>
                      {locale === 'ar' ? 'مشمول' : 'Included'}
                    </span>}
                  </h3>
                  <p style={{ fontFamily: "'Montserrat'", fontSize: 12, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.7, textAlign: isRTL ? 'right' : 'left' }}>
                    {locale === 'ar' ? f.descAr : f.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ── Sticky summary card ── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ position: 'sticky', top: 100 }}
          >
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-2)', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              {/* Header */}
              <div style={{ background: 'var(--gold)', padding: '20px 24px' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 22, fontWeight: 400, color: 'var(--bg)', marginBottom: 4 }}>
                  {locale === 'ar' ? 'حزمتك المختارة' : 'Your Package'}
                </h3>
                <p style={{ fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 600, color: 'rgba(0,0,0,0.6)', letterSpacing: '0.12em' }}>
                  {selectedFeatures.length} {locale === 'ar' ? 'ميزات محددة' : 'features selected'}
                </p>
              </div>
              {/* Features list */}
              <div style={{ padding: '20px 24px', maxHeight: 320, overflowY: 'auto' }}>
                <AnimatePresence mode="popLayout">
                  {selectedFeatures.map(f => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid var(--border)', flexDirection: isRTL ? 'row-reverse' : 'row', overflow: 'hidden' }}
                    >
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{f.icon}</span>
                      <span style={{ fontFamily: "'Montserrat'", fontSize: 12, fontWeight: 500, color: 'var(--text)', textAlign: isRTL ? 'right' : 'left', flex: 1 }}>
                        {locale === 'ar' ? f.titleAr : f.titleEn}
                      </span>
                      {!f.included && (
                        <button onClick={(e) => { e.stopPropagation(); toggle(f.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: 2 }}>
                          ×
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {/* CTA */}
              <div style={{ padding: '16px 24px 24px' }}>
                <a
                  href={`https://wa.me/966000000000?text=${buildContactMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-solid"
                  style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: 8, marginBottom: 12, borderRadius: 6 }}
                >
                  💬 {locale === 'ar' ? 'أرسل عبر واتساب' : 'Send via WhatsApp'}
                </a>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: 8, borderRadius: 6 }}
                >
                  {locale === 'ar' ? 'أو اتصل بنا' : 'Or Contact Us'} <Arrow size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #features > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #features > div > div:last-child > div:last-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
