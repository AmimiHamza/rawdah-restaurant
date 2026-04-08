'use client';
import { motion } from 'framer-motion';
import { MapPin, Mail, Camera, Share2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { isRTL, locale } = useI18n();

  const nav = [
    { labelEn: 'What You Get', labelAr: 'ما ستحصل عليه', href: '#features' },
    { labelEn: 'Dashboard',    labelAr: 'لوحة التحكم',   href: '#dashboard' },
    { labelEn: 'Contact',      labelAr: 'تواصل معنا',    href: '#contact' },
  ];

  return (
    <footer style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: '72px 0 36px', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: 32, fontWeight: 400, color: 'var(--text)', letterSpacing: '0.08em', lineHeight: 1 }}>AMIMI</div>
              <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: 14, color: 'var(--gold)', letterSpacing: '0.22em', marginTop: 3 }}>عميمي · Digital</div>
            </div>
            <p style={{ fontFamily: "'Montserrat'", fontSize: 12, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 20, textAlign: isRTL ? 'right' : 'left' }}>
              {locale === 'ar' ? 'نبني مواقع المطاعم الراقية في السعودية والخليج.' : 'Building luxury restaurant websites across Saudi Arabia & GCC.'}
            </p>
            <div style={{ display: 'flex', gap: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              {[{ icon: <Camera size={15} />, label: 'Instagram' }, { icon: <Share2 size={15} />, label: 'X' }].map(({ icon, label }) => (
                <a key={label} href="#" aria-label={label} style={{ width: 36, height: 36, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', textDecoration: 'none', borderRadius: 4, transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)'; }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
              {locale === 'ar' ? 'الأقسام' : 'Navigate'}
            </h4>
            {nav.map(({ labelEn, labelAr, href }) => (
              <div key={href} style={{ marginBottom: 10 }}>
                <a href={href} onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ fontFamily: "'Montserrat'", fontSize: 13, fontWeight: 300, color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.25s ease', display: 'block', textAlign: isRTL ? 'right' : 'left' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-2)'; }}>
                  {locale === 'ar' ? labelAr : labelEn}
                </a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
              {locale === 'ar' ? 'تواصل' : 'Contact'}
            </h4>
            {[
              { icon: <Mail size={13} />, text: 'hamza.amimi.p@gmail.com' },
              { icon: <MapPin size={13} />, text: locale === 'ar' ? 'المملكة العربية السعودية والخليج' : 'Saudi Arabia & GCC' },
            ].map(({ icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <span style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }}>{icon}</span>
                <span style={{ fontFamily: "'Montserrat'", fontSize: 12, fontWeight: 300, color: 'var(--text-2)', textAlign: isRTL ? 'right' : 'left' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat'", fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
              {locale === 'ar' ? 'النشرة البريدية' : 'Newsletter'}
            </h4>
            <p style={{ fontFamily: "'Montserrat'", fontSize: 12, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 14, textAlign: isRTL ? 'right' : 'left' }}>
              {locale === 'ar' ? 'نصائح وأفضل الممارسات لمطعمك رقمياً.' : 'Tips and best practices for your restaurant online.'}
            </p>
            <div style={{ display: 'flex', direction: isRTL ? 'rtl' : 'ltr' }}>
              <input type="email" placeholder={locale === 'ar' ? 'بريدك الإلكتروني' : 'your@email.com'} className="luxury-input" style={{ fontSize: 12, padding: '11px 14px', borderRadius: '4px 0 0 4px', borderRight: 'none' }} />
              <button className="btn-gold-solid" style={{ padding: '11px 16px', fontSize: 10, flexShrink: 0, borderRadius: '0 4px 4px 0' }}>
                {locale === 'ar' ? 'اشترك' : 'Join'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <p style={{ fontFamily: "'Montserrat'", fontSize: 11, fontWeight: 300, color: 'var(--text-3)' }}>
            {locale === 'ar' ? '© ٢٠٢٥ عميمي ديجيتال · جميع الحقوق محفوظة.' : '© 2025 Amimi Digital · All rights reserved.'}
          </p>
          <div style={{ display: 'flex', gap: 20, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            {[locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy', locale === 'ar' ? 'شروط الخدمة' : 'Terms'].map(l => (
              <a key={l} href="#" style={{ fontFamily: "'Montserrat'", fontSize: 11, fontWeight: 300, color: 'var(--text-3)', textDecoration: 'none', transition: 'color 0.25s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-3)'; }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
