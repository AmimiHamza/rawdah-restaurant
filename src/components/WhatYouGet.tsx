'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Eye } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface Feature {
  id: string;
  icon: string;
  title: Record<string, string>;
  desc: Record<string, string>;
  included: boolean;
}

const features: Feature[] = [
  {
    id: 'website', icon: '🌐', included: true,
    title: { en: 'Luxury Restaurant Website', fr: 'Site Restaurant de Luxe', ar: 'موقع مطعم احترافي' },
    desc:  { en: 'Fully custom design tailored to your brand — hero video, story, menu, and more.', fr: 'Design entièrement sur mesure — vidéo hero, histoire, menu et plus encore.', ar: 'تصميم مخصص بالكامل يعكس هوية مطعمك — فيديو، قصة، قائمة طعام، وأكثر.' },
  },
  {
    id: 'bilingual', icon: '🌍', included: true,
    title: { en: 'Bilingual EN / AR + RTL', fr: 'Trilingue FR / EN / AR + RTL', ar: 'ثنائي اللغة عربي / إنجليزي' },
    desc:  { en: 'Full right-to-left Arabic support. One click switches the entire site language.', fr: 'Support arabe complet de droite à gauche. Changement de langue en un clic.', ar: 'دعم كامل للغة العربية من اليمين لليسار. تبديل كامل للموقع بنقرة واحدة.' },
  },
  {
    id: 'mobile', icon: '📱', included: true,
    title: { en: 'Mobile-First Responsive', fr: 'Responsive Mobile-First', ar: 'متوافق مع الجوال' },
    desc:  { en: 'Pixel-perfect on every device — phone, tablet, and desktop.', fr: 'Parfait sur tous les appareils — mobile, tablette et bureau.', ar: 'مثالي على كل الأجهزة — جوال، تابلت، وحاسوب.' },
  },
  {
    id: 'menu', icon: '📋', included: false,
    title: { en: 'Interactive Digital Menu', fr: 'Menu Digital Interactif', ar: 'قائمة طعام رقمية تفاعلية' },
    desc:  { en: 'Filter by category, search dishes, view allergens and SFDA calorie counts per dish.', fr: 'Filtrez par catégorie, recherchez des plats, consultez les allergènes et les calories.', ar: 'تصفية حسب الفئة، بحث، عرض مسببات الحساسية وسعرات SFDA لكل طبق.' },
  },
  {
    id: 'reservation', icon: '📅', included: false,
    title: { en: 'Online Reservation System', fr: 'Système de Réservation en Ligne', ar: 'نظام حجوزات أونلاين' },
    desc:  { en: 'Date, time, party size selection. Private room suggestions and peak-hour deposit logic.', fr: "Sélection de date, heure et nombre de convives. Suggestions de salons privés et dépôt de garantie.", ar: 'اختيار التاريخ، الوقت، وعدد الضيوف. اقتراح غرف خاصة ومنطق عربون.' },
  },
  {
    id: 'ordering', icon: '🛍', included: false,
    title: { en: 'Online Ordering & Payment', fr: 'Commande en Ligne & Paiement', ar: 'طلب أونلاين ودفع إلكتروني' },
    desc:  { en: 'Course-sequenced checkout (Starter → Main → Dessert) with Mada and Apple Pay.', fr: 'Commande séquentielle (Entrée → Plat → Dessert) avec Mada et Apple Pay.', ar: 'سلة منظمة بالترتيب (مقبلات ← رئيسي ← حلوى) مع مدى وآبل باي.' },
  },
  {
    id: 'dashboard', icon: '📊', included: false,
    title: { en: 'Smart Admin Dashboard', fr: 'Tableau de Bord Intelligent', ar: 'لوحة تحكم ذكية' },
    desc:  { en: 'Revenue charts, reservations, orders, and ratings — all real-time in your pocket.', fr: 'Graphiques de revenus, réservations, commandes et avis — tout en temps réel.', ar: 'مخططات الإيرادات، الحجوزات، الطلبات، والتقييمات — كل شيء في الوقت الفعلي.' },
  },
  {
    id: 'whatsapp', icon: '💬', included: false,
    title: { en: 'WhatsApp Concierge', fr: 'Conciergerie WhatsApp', ar: 'كونسيرج واتساب' },
    desc:  { en: 'Floating WhatsApp button for direct guest support and automated booking confirmations.', fr: 'Bouton WhatsApp flottant pour le support direct et les confirmations de réservation automatiques.', ar: 'زر واتساب عائم للدعم المباشر وتأكيدات الحجز التلقائية.' },
  },
  {
    id: 'seo', icon: '🔍', included: true,
    title: { en: 'SEO + Google Maps Ready', fr: 'SEO + Google Maps Intégré', ar: 'تهيئة SEO وخرائط جوجل' },
    desc:  { en: 'Schema.org markup, meta tags, and local SEO so guests find you first.', fr: 'Balisage Schema.org, balises méta et SEO local pour que vos clients vous trouvent en premier.', ar: 'ترميز Schema.org، علامات ميتا، وSEO محلي حتى يجدك الضيوف أولاً.' },
  },
  {
    id: 'private', icon: '🏛', included: false,
    title: { en: 'Private Dining Showcase', fr: 'Vitrine Salons Privés', ar: 'عرض الغرف الخاصة' },
    desc:  { en: 'Showcase your private rooms with photo gallery and direct booking flow.', fr: 'Mettez en valeur vos salons privés avec une galerie photo et un flux de réservation direct.', ar: 'عرض غرفك الخاصة بمعرض صور وتدفق حجز مباشر.' },
  },
];

const ui = {
  en: {
    eyebrow: 'Build Your Package',
    title: 'Choose What Your Restaurant Needs',
    sub: "Select the features you want — we'll build you a site that fits exactly. Reach out after selecting.",
    note: '✓ Gold-highlighted items are always included',
    included: 'Included',
    packageTitle: 'Your Package',
    featuresSelected: 'features selected',
    preview: 'Preview My Package',
    whatsapp: 'Send via WhatsApp',
    contact: 'Or Contact Us',
  },
  fr: {
    eyebrow: 'Composez votre offre',
    title: 'Choisissez ce dont votre restaurant a besoin',
    sub: "Sélectionnez les fonctionnalités souhaitées — nous construirons votre site exactement comme vous le voulez.",
    note: '✓ Les éléments dorés sont toujours inclus',
    included: 'Inclus',
    packageTitle: 'Votre offre',
    featuresSelected: 'fonctionnalités sélectionnées',
    preview: 'Aperçu de mon offre',
    whatsapp: 'Envoyer via WhatsApp',
    contact: 'Ou nous contacter',
  },
  ar: {
    eyebrow: 'صمم حزمتك',
    title: 'اختر ما يناسب مطعمك',
    sub: 'حدد الميزات التي تريدها — سنبني لك موقعاً مخصصاً بالضبط. تواصل معنا بعد اختيارك.',
    note: '✓ المضلل بالذهبي مشمول دائماً',
    included: 'مشمول',
    packageTitle: 'حزمتك المختارة',
    featuresSelected: 'ميزات محددة',
    preview: 'معاينة حزمتك',
    whatsapp: 'أرسل عبر واتساب',
    contact: 'أو اتصل بنا',
  },
};

export default function WhatYouGet() {
  const { isRTL, locale } = useI18n();
  const [selected, setSelected] = useState<Set<string>>(new Set(features.filter(f => f.included).map(f => f.id)));

  const toggle = (id: string) => {
    const f = features.find(f => f.id === id)!;
    if (f.included) return;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedFeatures = features.filter(f => selected.has(f.id));
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const l = ui[locale] ?? ui.en;

  const buildContactMessage = () => {
    const names = selectedFeatures.map(f => f.title[locale] ?? f.title.en).join(', ');
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
          <span className="eyebrow">{l.eyebrow}</span>
          <h2 className="section-title" style={{ marginBottom: 14 }}>{l.title}</h2>
          <p className="body-text" style={{ maxWidth: 560, margin: '0 auto 8px' }}>{l.sub}</p>
          <p style={{ fontFamily: "'Montserrat'", fontSize: 11, fontWeight: 500, color: 'var(--gold)', letterSpacing: '0.1em' }}>
            {l.note}
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
                    {f.title[locale] ?? f.title.en}
                    {f.included && (
                      <span style={{ fontFamily: "'Montserrat'", fontSize: 8, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginLeft: isRTL ? 0 : 8, marginRight: isRTL ? 8 : 0, background: 'var(--pill-bg)', padding: '2px 7px', borderRadius: 10 }}>
                        {l.included}
                      </span>
                    )}
                  </h3>
                  <p style={{ fontFamily: "'Montserrat'", fontSize: 12, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.7, textAlign: isRTL ? 'right' : 'left' }}>
                    {f.desc[locale] ?? f.desc.en}
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
              <div style={{ background: 'var(--gold)', padding: '20px 24px' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 22, fontWeight: 400, color: 'var(--bg)', marginBottom: 4 }}>
                  {l.packageTitle}
                </h3>
                <p style={{ fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 600, color: 'rgba(0,0,0,0.6)', letterSpacing: '0.12em' }}>
                  {selectedFeatures.length} {l.featuresSelected}
                </p>
              </div>
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
                        {f.title[locale] ?? f.title.en}
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
              {/* Pricing mini-block */}
              <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span style={{ fontFamily: "'Montserrat'", fontSize: 9, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {locale === 'ar' ? 'رسوم التأسيس' : locale === 'fr' ? 'Frais de création' : 'Setup Fee'}
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond'", fontSize: 22, fontWeight: 400, color: 'var(--gold)' }}>
                  {locale === 'ar' ? '٠ ر.س' : '0'}
                </span>
              </div>

              <div style={{ padding: '16px 24px 24px' }}>
                <button
                  onClick={() => { const ids = Array.from(selected).join(','); window.location.href = `/preview?f=${ids}`; }}
                  className="btn-gold-solid"
                  style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: 8, marginBottom: 10, borderRadius: 6 }}
                >
                  <Eye size={14} /> {l.preview}
                </button>
                <a
                  href={`https://wa.me/212643626334?text=${buildContactMessage()}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: 8, marginBottom: 10, borderRadius: 6, textDecoration: 'none' }}
                >
                  💬 {l.whatsapp}
                </a>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center', display: 'flex', gap: 8, borderRadius: 6 }}
                >
                  {l.contact} <Arrow size={13} />
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
