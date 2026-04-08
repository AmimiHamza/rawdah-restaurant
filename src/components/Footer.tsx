'use client';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Share2, X as XIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t, isRTL } = useI18n();

  return (
    <footer
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(212,175,55,0.12)',
        padding: '80px 0 40px',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '36px', fontWeight: 400, color: '#F8F8F8', letterSpacing: '0.06em' }}>
                RAWDAH
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '14px', color: '#D4AF37', letterSpacing: '0.2em' }}>
                روضة
              </div>
            </div>
            <p style={{ fontFamily: "'Montserrat'", fontSize: '12px', fontWeight: 300, color: 'rgba(248,248,248,0.45)', lineHeight: 1.8 }}>
              {t.footer.tagline}
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '24px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              {[
                { icon: <Share2 size={16} />, label: 'Instagram' },
                { icon: <XIcon size={16} />, label: 'Twitter / X' },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: '38px',
                    height: '38px',
                    border: '1px solid rgba(212,175,55,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(248,248,248,0.5)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    borderRadius: '2px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#D4AF37';
                    e.currentTarget.style.color = '#D4AF37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)';
                    e.currentTarget.style.color = 'rgba(248,248,248,0.5)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '24px' }}>
              {isRTL ? 'تواصل معنا' : 'Contact'}
            </h4>
            {[
              { icon: <MapPin size={13} />, text: t.footer.address },
              { icon: <Phone size={13} />, text: t.footer.phone },
              { icon: <Clock size={13} />, text: t.footer.hours },
            ].map(({ icon, text }, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginBottom: '14px',
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}
              >
                <span style={{ color: '#D4AF37', marginTop: '2px', flexShrink: 0 }}>{icon}</span>
                <span style={{ fontFamily: "'Montserrat'", fontSize: '12px', fontWeight: 300, color: 'rgba(248,248,248,0.55)', lineHeight: 1.6, textAlign: isRTL ? 'right' : 'left' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '24px' }}>
              {isRTL ? 'روابط سريعة' : 'Navigate'}
            </h4>
            {[
              { label: t.nav.story, href: '#story' },
              { label: t.nav.menu, href: '#menu' },
              { label: t.nav.reservations, href: '#reservations' },
              { label: t.nav.order, href: '#order' },
              { label: t.nav.privateDining, href: '#private-dining' },
            ].map(({ label, href }) => (
              <div key={href} style={{ marginBottom: '10px', textAlign: isRTL ? 'right' : 'left' }}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{
                    fontFamily: "'Montserrat'",
                    fontSize: '12px',
                    fontWeight: 300,
                    color: 'rgba(248,248,248,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(248,248,248,0.5)'; }}
                >
                  {label}
                </a>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '24px' }}>
              {isRTL ? 'النشرة البريدية' : 'Newsletter'}
            </h4>
            <p style={{ fontFamily: "'Montserrat'", fontSize: '12px', fontWeight: 300, color: 'rgba(248,248,248,0.45)', lineHeight: 1.7, marginBottom: '16px', textAlign: isRTL ? 'right' : 'left' }}>
              {isRTL ? 'احصل على دعوات أولوية لأمسياتنا الحصرية.' : 'Receive priority invitations to our exclusive evenings.'}
            </p>
            <div style={{ display: 'flex', gap: '0', direction: isRTL ? 'rtl' : 'ltr' }}>
              <input
                type="email"
                placeholder={isRTL ? 'بريدك الإلكتروني' : 'your@email.com'}
                className="luxury-input"
                style={{ borderRadius: '0', flex: 1, fontSize: '12px', padding: '12px 14px' }}
              />
              <button
                className="btn-gold-solid"
                style={{ borderRadius: '0', padding: '12px 18px', flexShrink: 0, fontSize: '10px' }}
              >
                {isRTL ? 'اشترك' : 'Join'}
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(212,175,55,0.08)', marginBottom: '32px' }} />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
        >
          <p style={{ fontFamily: "'Montserrat'", fontSize: '11px', fontWeight: 300, color: 'rgba(248,248,248,0.3)', letterSpacing: '0.04em' }}>
            {t.footer.rights}
          </p>
          <div style={{ display: 'flex', gap: '24px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            {[t.footer.privacy, t.footer.terms].map((label) => (
              <a
                key={label}
                href="#"
                style={{ fontFamily: "'Montserrat'", fontSize: '11px', fontWeight: 300, color: 'rgba(248,248,248,0.3)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(248,248,248,0.3)'; }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
