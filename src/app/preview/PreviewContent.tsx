'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const WHATSAPP = '212643626334';

// ── Mockup components ────────────────────────────────────────────────

function WebsiteMockup() {
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
      <div style={{ background: '#1E1E1E', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, background: '#2A2A2A', borderRadius: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
          <span style={{ fontFamily: 'Montserrat', fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>rawdah.sa</span>
        </div>
      </div>
      <div style={{ height: 240, background: 'linear-gradient(135deg,#1A1208 0%,#2A1F0A 60%,#121212 100%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%,rgba(212,175,55,0.15) 0%,transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 14, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 24 }}>
          {['Menu', 'Story', 'Reserve', 'Order'].map(l => <span key={l} style={{ fontFamily: 'Montserrat', fontSize: 7, color: 'rgba(248,248,248,0.6)', letterSpacing: '0.12em' }}>{l}</span>)}
        </div>
        <div style={{ fontFamily: 'Montserrat', fontSize: 8, letterSpacing: '0.35em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: 4 }}>Fine Dining · Riyadh</div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 34, color: '#F8F8F8', letterSpacing: '0.1em', lineHeight: 1 }}>RAWDAH</div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: 'rgba(248,248,248,0.7)', letterSpacing: '0.18em' }}>روضة</div>
        <div style={{ background: '#D4AF37', color: '#111', fontFamily: 'Montserrat', fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', padding: '7px 22px', marginTop: 12 }}>RESERVE A TABLE</div>
      </div>
    </div>
  );
}

function BilingualMockup() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '20px 14px' }}>
        <div style={{ fontFamily: 'Montserrat', fontSize: 8, fontWeight: 600, letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: 8 }}>EN</div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: 'var(--text)', marginBottom: 6 }}>Reserve a Table</div>
        <div style={{ fontFamily: 'Montserrat', fontSize: 10, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 12 }}>Saudi heritage cuisine in the heart of Riyadh.</div>
        <div style={{ background: 'var(--gold)', color: 'var(--bg)', fontFamily: 'Montserrat', fontSize: 8, fontWeight: 700, padding: '5px 14px', display: 'inline-block' }}>Book Now</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 38, height: 20, background: 'var(--gold)', borderRadius: 12, display: 'flex', alignItems: 'center', padding: '0 4px', justifyContent: 'flex-end' }}>
          <div style={{ width: 13, height: 13, borderRadius: '50%', background: 'var(--bg)' }} />
        </div>
        <span style={{ fontFamily: 'Montserrat', fontSize: 8, color: 'var(--text-3)' }}>EN/AR</span>
      </div>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-2)', borderRadius: 8, padding: '20px 14px', direction: 'rtl' }}>
        <div style={{ fontFamily: 'Montserrat', fontSize: 8, fontWeight: 600, letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: 8 }}>عر</div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: 'var(--text)', marginBottom: 6 }}>احجز طاولة</div>
        <div style={{ fontFamily: 'Montserrat', fontSize: 10, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 12 }}>مطبخ سعودي في قلب الرياض.</div>
        <div style={{ background: 'var(--gold)', color: 'var(--bg)', fontFamily: 'Montserrat', fontSize: 8, fontWeight: 700, padding: '5px 14px', display: 'inline-block' }}>احجز الآن</div>
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 190, border: '2px solid var(--border-2)', borderRadius: 30, overflow: 'hidden', background: '#111', boxShadow: '0 24px 64px rgba(0,0,0,0.55)' }}>
        <div style={{ background: '#000', padding: '7px 18px 5px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Montserrat', fontSize: 7, color: 'rgba(255,255,255,0.6)' }}>9:41</span>
          <span style={{ fontFamily: 'Montserrat', fontSize: 7, color: 'rgba(255,255,255,0.6)' }}>●●●</span>
        </div>
        <div style={{ background: 'rgba(18,18,18,0.97)', borderBottom: '1px solid rgba(212,175,55,0.15)', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, color: '#F8F8F8' }}>RAWDAH</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, width: 18 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ height: 1.5, background: '#D4AF37', borderRadius: 1 }} />)}
          </div>
        </div>
        <div style={{ height: 110, background: 'linear-gradient(135deg,#1A1208,#2A1F0A)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: '#F8F8F8', letterSpacing: '0.08em' }}>RAWDAH</div>
          <div style={{ fontFamily: 'Montserrat', fontSize: 7, color: '#D4AF37', letterSpacing: '0.2em' }}>FINE DINING</div>
          <div style={{ background: '#D4AF37', color: '#111', fontFamily: 'Montserrat', fontSize: 7, fontWeight: 700, padding: '4px 14px', marginTop: 6 }}>RESERVE</div>
        </div>
        {[64, 46, 46].map((h, i) => (
          <div key={i} style={{ height: h, margin: '6px 12px', background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 4 }} />
        ))}
        <div style={{ height: 40, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 14 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>💬</div>
        </div>
      </div>
    </div>
  );
}

function MenuMockup() {
  const dishes = [
    { name: 'Truffle Hammour', price: '185 SAR', tag: "Chef's Pick", cal: '420 kcal' },
    { name: 'Medjool Date Tart', price: '65 SAR', tag: 'Dessert', cal: '280 kcal' },
    { name: 'Asir Herb Salad', price: '55 SAR', tag: 'Starter', cal: '180 kcal' },
    { name: 'Jizan Sea Bass', price: '165 SAR', tag: 'Main', cal: '390 kcal' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {['All', 'Starters', 'Mains', 'Desserts'].map((c, i) => (
          <div key={c} style={{ padding: '5px 14px', borderRadius: 20, fontFamily: 'Montserrat', fontSize: 9, fontWeight: i === 0 ? 700 : 400, background: i === 0 ? 'var(--gold)' : 'var(--bg-input)', color: i === 0 ? 'var(--bg)' : 'var(--text-2)', border: `1px solid ${i === 0 ? 'var(--gold)' : 'var(--border)'}` }}>{c}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {dishes.map(d => (
          <div key={d.name} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ height: 80, background: 'linear-gradient(135deg,#1A1208,#2A1F0A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🍽</div>
            <div style={{ padding: '10px' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 13, color: 'var(--text)', marginBottom: 4 }}>{d.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <span style={{ fontFamily: 'Montserrat', fontSize: 10, fontWeight: 600, color: 'var(--gold)' }}>{d.price}</span>
                <span style={{ fontFamily: 'Montserrat', fontSize: 7, color: 'var(--text-3)' }}>{d.cal}</span>
              </div>
              <span style={{ fontFamily: 'Montserrat', fontSize: 7, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--gold)', background: 'var(--pill-bg)', padding: '2px 8px', borderRadius: 10 }}>{d.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReservationMockup() {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'var(--text)', marginBottom: 20 }}>Book Your Table</div>
      <div style={{ fontFamily: 'Montserrat', fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 6 }}>Date</div>
      <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 4, padding: '10px 14px', fontFamily: 'Montserrat', fontSize: 12, color: 'var(--text)', marginBottom: 14 }}>April 15, 2025</div>
      <div style={{ fontFamily: 'Montserrat', fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 8 }}>Time</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {['19:00', '20:00', '21:00', '22:00'].map((t, i) => (
          <div key={t} style={{ padding: '6px 12px', borderRadius: 20, fontFamily: 'Montserrat', fontSize: 10, background: i === 1 ? 'var(--gold)' : 'var(--bg-input)', color: i === 1 ? 'var(--bg)' : 'var(--text-2)', border: `1px solid ${i === 1 ? 'var(--gold)' : 'var(--border)'}`, fontWeight: i === 1 ? 700 : 300 }}>{t}</div>
        ))}
      </div>
      <div style={{ fontFamily: 'Montserrat', fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 8 }}>Guests</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        {['−', '4', '+'].map((v, i) => (
          <div key={i} style={{ width: i === 1 ? 'auto' : 32, height: i === 1 ? 'auto' : 32, borderRadius: i === 1 ? 0 : 4, border: i === 1 ? 'none' : '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontSize: i === 1 ? 22 : 16, color: i === 1 ? 'var(--text)' : 'var(--gold)' }}>{v}</div>
        ))}
        <span style={{ fontFamily: 'Montserrat', fontSize: 8, color: 'var(--gold)', background: 'var(--pill-bg)', padding: '3px 10px', borderRadius: 10, border: '1px solid var(--border)' }}>Private Room Suggested ✦</span>
      </div>
      <div style={{ background: 'var(--gold)', color: 'var(--bg)', fontFamily: 'Montserrat', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', padding: '13px', textAlign: 'center', borderRadius: 4 }}>CONFIRM RESERVATION</div>
    </div>
  );
}

function OrderingMockup() {
  const items = [
    { course: 'I · Starter', name: 'Truffle Arancini', price: 85 },
    { course: 'II · Main', name: 'Hammour Al-Ahsa', price: 185 },
    { course: 'III · Dessert', name: 'Date Tart', price: 65 },
  ];
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ background: 'var(--bg-card-2)', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: 'var(--text)' }}>Your Order</span>
      </div>
      <div style={{ padding: '16px 20px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 14, borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div>
              <div style={{ fontFamily: 'Montserrat', fontSize: 8, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--gold)', marginBottom: 2 }}>{item.course}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'var(--text)' }}>{item.name}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'Montserrat', fontSize: 12, fontWeight: 600, color: 'var(--gold)' }}>{item.price}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {['−', '+'].map(v => <div key={v} style={{ width: 22, height: 22, border: '1px solid var(--border)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontSize: 14, color: 'var(--gold)' }}>{v}</div>)}
              </div>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontFamily: 'Montserrat', fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>Total</span>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'var(--gold)' }}>335 SAR</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {['Mada', 'Apple Pay', 'Card'].map((p, i) => (
            <div key={p} style={{ flex: 1, border: `1px solid ${i === 0 ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 4, padding: '7px 4px', fontFamily: 'Montserrat', fontSize: 8, fontWeight: 600, color: i === 0 ? 'var(--gold)' : 'var(--text-3)', textAlign: 'center' }}>{p}</div>
          ))}
        </div>
        <div style={{ background: 'var(--gold)', color: 'var(--bg)', fontFamily: 'Montserrat', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', padding: '12px', textAlign: 'center', borderRadius: 4 }}>PLACE ORDER</div>
      </div>
    </div>
  );
}

function DashboardMockup() {
  const data = [28, 31, 29, 34, 37, 33, 39, 36, 41, 38, 44, 48];
  const max = Math.max(...data);
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ background: 'rgba(30,24,14,0.9)', borderBottom: '1px solid rgba(212,175,55,0.12)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
        <span style={{ fontFamily: 'Montserrat', fontSize: 9, color: 'rgba(248,248,248,0.3)', marginLeft: 8 }}>Dashboard — Rawdah</span>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: 'Montserrat', fontSize: 8, fontWeight: 600, color: 'rgba(248,248,248,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>Monthly Revenue</div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: '#F8F8F8', lineHeight: 1 }}>48,300 <span style={{ fontSize: 12, color: 'rgba(248,248,248,0.5)' }}>SAR</span></div>
          </div>
          <div style={{ background: 'rgba(39,201,63,0.15)', border: '1px solid rgba(39,201,63,0.3)', borderRadius: 20, padding: '4px 10px', fontFamily: 'Montserrat', fontSize: 11, fontWeight: 700, color: '#27c93f' }}>+23%</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 70 }}>
          {data.map((v, i) => {
            const h = (v / max) * 70;
            const isLast = i === data.length - 1;
            return <div key={i} style={{ flex: 1, height: h, background: isLast ? 'linear-gradient(to top,#A8891F,#D4AF37,#F5D76E)' : 'rgba(212,175,55,0.2)', borderRadius: '2px 2px 0 0', minWidth: 8 }} />;
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 16 }}>
          {[{ icon: '⭐', v: '4.9', l: 'Rating' }, { icon: '📅', v: '27', l: 'Bookings' }, { icon: '🛍', v: '132', l: 'Avg Order' }, { icon: '📦', v: '134', l: 'Orders' }].map(k => (
            <div key={k.l} style={{ background: 'rgba(40,30,10,0.5)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 6, padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 14, marginBottom: 2 }}>{k.icon}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, color: '#F8F8F8' }}>{k.v}</div>
              <div style={{ fontFamily: 'Montserrat', fontSize: 7, color: 'rgba(248,248,248,0.35)' }}>{k.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhatsAppMockup() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 250, background: '#0B1014', borderRadius: 18, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ background: '#1F2C34', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🍽</div>
          <div>
            <div style={{ fontFamily: 'Montserrat', fontSize: 12, fontWeight: 600, color: '#E9EDF0' }}>Rawdah Restaurant</div>
            <div style={{ fontFamily: 'Montserrat', fontSize: 9, color: 'rgba(233,237,240,0.5)' }}>Concierge · Online now</div>
          </div>
        </div>
        <div style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { from: 'them', text: 'Welcome to Rawdah 🌟 How can we assist you tonight?' },
            { from: 'me', text: "I'd like a table for 4 this Friday 🙏" },
            { from: 'them', text: 'Table for 4 confirmed at 20:00 ✅ See you Friday!' },
          ].map((msg, i) => (
            <div key={i} style={{ background: msg.from === 'me' ? '#054640' : '#1F2C34', borderRadius: msg.from === 'me' ? '10px 10px 2px 10px' : '10px 10px 10px 2px', padding: '8px 12px', maxWidth: '85%', alignSelf: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
              <div style={{ fontFamily: 'Montserrat', fontSize: 10, color: '#E9EDF0', lineHeight: 1.5 }}>{msg.text}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '8px 12px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ flex: 1, background: '#1F2C34', borderRadius: 20, padding: '8px 14px', fontFamily: 'Montserrat', fontSize: 10, color: 'rgba(233,237,240,0.35)' }}>Message…</div>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>➤</div>
        </div>
      </div>
    </div>
  );
}

function SEOMockup() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ background: '#FFFFFF', borderRadius: 8, padding: '20px', boxShadow: '0 4px 24px rgba(0,0,0,0.15)', direction: 'ltr' }}>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, color: '#006621', marginBottom: 4 }}>rawdah.sa › dining › riyadh</div>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 18, color: '#1A0DAB', marginBottom: 6, lineHeight: 1.3 }}>Rawdah Restaurant Riyadh — Fine Dining in Olaya</div>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#545454', lineHeight: 1.6, marginBottom: 10 }}>Award-winning Saudi cuisine in Riyadh. Reserve online, view our bilingual menu, and experience culinary excellence. <span style={{ color: '#1A0DAB' }}>Open today 19:00 – 00:00</span></div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {['Reserve a Table', 'View Menu', 'Private Dining'].map(l => (
            <span key={l} style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, color: '#1A0DAB' }}>» {l}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { icon: '⭐', label: 'Rich Snippet', val: 'Rating 4.9 · 340 reviews' },
          { icon: '📍', label: 'Google Maps', val: 'Olaya District, Riyadh' },
          { icon: '📊', label: 'Schema.org', val: 'LocalBusiness + Restaurant' },
          { icon: '🔗', label: 'Open Graph', val: 'WhatsApp & Instagram cards' },
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <div>
              <div style={{ fontFamily: 'Montserrat', fontSize: 9, fontWeight: 600, color: 'var(--gold)', marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontFamily: 'Montserrat', fontSize: 9, color: 'var(--text-2)', lineHeight: 1.4 }}>{item.val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivateMockup() {
  const rooms = [
    { name: 'Al Diwan Suite', cap: '12 guests', icon: '🕌' },
    { name: 'The Majlis', cap: '8 guests', icon: '🌙' },
    { name: 'Garden Pavilion', cap: '20 guests', icon: '🌿' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
      {rooms.map((r, i) => (
        <div key={i} style={{ background: 'linear-gradient(160deg,#1A1208,#2A1F0A)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 10, padding: '24px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 30, marginBottom: 12 }}>{r.icon}</div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, color: '#F8F8F8', marginBottom: 6, lineHeight: 1.2 }}>{r.name}</div>
          <div style={{ fontFamily: 'Montserrat', fontSize: 8, color: '#D4AF37', letterSpacing: '0.1em', marginBottom: 14 }}>{r.cap}</div>
          <div style={{ border: '1px solid rgba(212,175,55,0.4)', padding: '5px', fontFamily: 'Montserrat', fontSize: 8, color: '#D4AF37', borderRadius: 4, letterSpacing: '0.1em' }}>ENQUIRE</div>
        </div>
      ))}
    </div>
  );
}

// ── Feature data ─────────────────────────────────────────────────────

const mockupMap: Record<string, React.FC> = {
  website: WebsiteMockup,
  bilingual: BilingualMockup,
  mobile: MobileMockup,
  menu: MenuMockup,
  reservation: ReservationMockup,
  ordering: OrderingMockup,
  dashboard: DashboardMockup,
  whatsapp: WhatsAppMockup,
  seo: SEOMockup,
  private: PrivateMockup,
};

interface FeatureInfo {
  id: string;
  icon: string;
  en: { title: string; desc: string; bullets: string[] };
  ar: { title: string; desc: string; bullets: string[] };
}

const featureInfos: FeatureInfo[] = [
  {
    id: 'website', icon: '🌐',
    en: { title: 'Luxury Restaurant Website', desc: 'A bespoke website built around your brand — not a template, not a drag-and-drop builder. Every detail is intentional and unique to you.', bullets: ['Custom hero with video or cinematic photography', 'Your story, your chefs, your philosophy', 'Full menu with filters and allergen info', 'Lightning-fast — optimized for Google PageSpeed', 'SSL secured, hosted on global CDN'] },
    ar: { title: 'موقع مطعم احترافي', desc: 'موقع مصمم حول هوية علامتك التجارية — وليس قالباً جاهزاً. كل تفصيلة مقصودة وفريدة لمطعمك.', bullets: ['قسم هيرو مخصص بفيديو أو تصوير سينمائي', 'قصتك، طهاتك، فلسفتك', 'قائمة كاملة مع تصفية ومعلومات الحساسية', 'سريع جداً — محسّن لـ Google PageSpeed', 'آمن بـ SSL، مستضاف على CDN عالمي'] },
  },
  {
    id: 'bilingual', icon: '🌍',
    en: { title: 'Bilingual EN / AR + RTL', desc: 'One click switches your entire site between English and Arabic — including full right-to-left layout, Arabic numerals, and typography.', bullets: ['Full Arabic (RTL) + English (LTR) layout', 'Proper Arabic typography and fonts', 'All content, menus, and forms bilingual', 'Locale-aware date and number formatting', 'One codebase — no duplicate site to maintain'] },
    ar: { title: 'ثنائي اللغة عربي / إنجليزي', desc: 'نقرة واحدة تبدّل كامل الموقع بين العربية والإنجليزية — بما فيه اتجاه RTL والأرقام العربية والخطوط.', bullets: ['تخطيط كامل بالعربية (RTL) والإنجليزية (LTR)', 'خطوط وطباعة عربية احترافية', 'كل المحتوى والقوائم والنماذج ثنائية اللغة', 'تنسيق التواريخ والأرقام حسب اللغة', 'قاعدة كود واحدة — لا موقعين للصيانة'] },
  },
  {
    id: 'mobile', icon: '📱',
    en: { title: 'Mobile-First Responsive', desc: 'Most guests browse on their phones. Your site looks and performs beautifully on every screen — from 320px to 4K displays.', bullets: ['Designed mobile-first, then scaled up', 'Smooth touch interactions and swipe gestures', 'Tap-to-call, tap-to-WhatsApp, tap-to-navigate', 'Fast load on mobile networks (3G/4G)', 'Tested on iOS Safari and Android Chrome'] },
    ar: { title: 'متوافق مع الجوال', desc: 'معظم الضيوف يتصفحون من هواتفهم. موقعك يبدو ويُشعر بالفخامة على كل شاشة.', bullets: ['مصمم للجوال أولاً، ثم يتوسع للشاشات الكبيرة', 'تفاعلات سلسة باللمس والتمرير', 'انقر للاتصال، واتساب، والخرائط', 'تحميل سريع على شبكات الجوال', 'مختبر على iOS Safari وAndroid Chrome'] },
  },
  {
    id: 'menu', icon: '📋',
    en: { title: 'Interactive Digital Menu', desc: 'A searchable, filterable menu that showcases every dish with allergens, SFDA calorie counts, and rich photography.', bullets: ['Filter by category: Starters, Mains, Desserts, Dry Bar', 'Search dishes by name or ingredient', 'Allergen tags (nuts, dairy, gluten…)', 'SFDA-compliant calorie counts per dish', 'Full-screen dish modal with description and price'] },
    ar: { title: 'قائمة طعام رقمية تفاعلية', desc: 'قائمة رقمية قابلة للبحث والتصفية، تعرض كل طبق مع الحساسيات وسعرات SFDA والصور.', bullets: ['تصفية حسب الفئة: مقبلات، رئيسية، حلويات، بار', 'بحث الأطباق بالاسم أو المكوّن', 'تصنيفات الحساسية (مكسرات، ألبان، غلوتين...)', 'سعرات حرارية متوافقة مع SFDA', 'نافذة طبق كاملة مع الوصف والسعر'] },
  },
  {
    id: 'reservation', icon: '📅',
    en: { title: 'Online Reservation System', desc: 'A frictionless booking experience — date, time, party size, and special requests, confirmed instantly via WhatsApp.', bullets: ['Date and time slot selection', 'Party size with private room suggestion logic', 'Special occasion and notes field', 'Peak-hour deposit requirement (Thu/Fri evenings)', 'Instant confirmation via WhatsApp'] },
    ar: { title: 'نظام حجوزات أونلاين', desc: 'تجربة حجز سلسة — التاريخ والوقت وعدد الضيوف وطلبات خاصة، يُؤكد فوراً عبر واتساب.', bullets: ['اختيار التاريخ والفترة الزمنية', 'عدد الضيوف مع اقتراح الغرف الخاصة تلقائياً', 'حقل المناسبة الخاصة والطلبات', 'منطق العربون في أوقات الذروة (الخميس/الجمعة)', 'تأكيد فوري عبر واتساب'] },
  },
  {
    id: 'ordering', icon: '🛍',
    en: { title: 'Online Ordering & Payment', desc: 'Course-sequenced checkout — Starters, Mains, Desserts — with Mada, Apple Pay, and credit card support built in.', bullets: ['Guided flow: Starter → Main → Dessert', 'Real-time cart with item customization', 'Mada, Apple Pay, and credit/debit card', 'Estimated delivery time (45–60 min)', 'Order confirmation via WhatsApp'] },
    ar: { title: 'طلب أونلاين ودفع إلكتروني', desc: 'طلب منظم بالترتيب — مقبلات ثم رئيسية ثم حلويات — مع مدى، آبل باي، والبطاقات البنكية.', bullets: ['تدفق إرشادي: مقبلات ← رئيسي ← حلوى', 'سلة آنية مع خيارات التخصيص', 'مدى، آبل باي، وبطاقات ائتمانية/مدين', 'وقت التوصيل المقدر (٤٥–٦٠ دقيقة)', 'تأكيد الطلب والمتابعة عبر واتساب'] },
  },
  {
    id: 'dashboard', icon: '📊',
    en: { title: 'Smart Admin Dashboard', desc: "Your restaurant's command center — revenue trends, live reservations, today's orders, and customer ratings, all on your phone.", bullets: ['12-month revenue chart with growth tracking', 'Daily reservations and order count', 'Average order value and customer rating', 'Exportable reports (PDF and CSV)', 'Accessible from any device, anywhere'] },
    ar: { title: 'لوحة تحكم ذكية', desc: 'مركز قيادة مطعمك — اتجاهات الإيرادات والحجوزات المباشرة وطلبات اليوم والتقييمات، كل شيء في جيبك.', bullets: ['مخطط الإيرادات لـ 12 شهراً مع تتبع النمو', 'الحجوزات اليومية وعدد الطلبات', 'متوسط قيمة الطلب وتقييم العميل', 'تقارير قابلة للتصدير (PDF وCSV)', 'متاح من أي جهاز وفي أي مكان'] },
  },
  {
    id: 'whatsapp', icon: '💬',
    en: { title: 'WhatsApp Concierge', desc: 'A floating button that connects guests directly with your team for reservations, menu questions, or any VIP requests.', bullets: ['Fixed floating button on every page', 'Pre-filled message by language (EN/AR)', 'Direct link to your WhatsApp Business', 'Automated booking confirmation messages', 'Premium, discreet concierge UX'] },
    ar: { title: 'كونسيرج واتساب', desc: 'زر عائم يربط الضيوف مباشرة بفريقك لاستفسارات الحجز وأسئلة القائمة والطلبات الخاصة.', bullets: ['زر ثابت عائم في كل صفحة', 'رسالة جاهزة حسب اللغة (عربي/إنجليزي)', 'رابط مباشر لحساب واتساب بيزنس', 'رسائل تأكيد حجز تلقائية', 'تجربة كونسيرج فاخرة وأنيقة'] },
  },
  {
    id: 'seo', icon: '🔍',
    en: { title: 'SEO + Google Maps Ready', desc: 'When guests search "best restaurant in Riyadh", they find you first. Full local SEO, Schema.org markup, and Google Maps integration.', bullets: ['Schema.org LocalBusiness + Restaurant markup', 'Optimized meta titles and descriptions', 'Google Maps embed and GMB profile link', 'Open Graph for WhatsApp and Instagram sharing', 'Sitemap and robots.txt auto-generated'] },
    ar: { title: 'تهيئة SEO وخرائط جوجل', desc: 'عندما يبحث الضيوف عن أفضل مطعم، يجدونك أولاً. SEO محلي كامل وتكامل مع خرائط جوجل.', bullets: ['ترميز Schema.org للمطاعم والأعمال المحلية', 'عناوين ووصف ميتا محسّنة', 'خرائط جوجل وربط حساب GMB', 'Open Graph لمشاركة واتساب وإنستغرام', 'Sitemap وrobots.txt تلقائياً'] },
  },
  {
    id: 'private', icon: '🏛',
    en: { title: 'Private Dining Showcase', desc: 'Showcase your private rooms with a stunning gallery, capacity details, and a direct booking inquiry — perfect for corporate events and special occasions.', bullets: ['Room gallery with high-res photography', 'Capacity and setup configuration info', 'Direct "Enquire Now" form per room', 'AV equipment and catering options listed', 'WhatsApp shortcut for VIP inquiries'] },
    ar: { title: 'عرض الغرف الخاصة', desc: 'اعرض غرفك الخاصة بمعرض صور رائع وتفاصيل الطاقة الاستيعابية وحجز مباشر — مثالي للفعاليات ومناسبات الأعمال.', bullets: ['معرض صور الغرف بجودة عالية', 'معلومات الطاقة الاستيعابية وإعدادات التهيئة', 'نموذج استفسار مباشر لكل غرفة', 'قائمة بالمعدات السمعية البصرية وخيارات التموين', 'اختصار واتساب للاستفسارات الخاصة'] },
  },
];

// ── Main component ────────────────────────────────────────────────────

export default function PreviewContent() {
  const params = useSearchParams();
  const { locale, isRTL } = useI18n();

  const ids = params.get('f')?.split(',').filter(Boolean) ?? [];
  const selected = featureInfos.filter(f => ids.includes(f.id));
  const toShow = selected.length > 0 ? selected : featureInfos;

  const message = encodeURIComponent(
    locale === 'ar'
      ? `مرحباً عميمي ديجيتال، أريد موقعاً بالميزات التالية: ${toShow.map(f => f.ar.title).join('، ')}`
      : `Hello Amimi Digital, I'd like a site with: ${toShow.map(f => f.en.title).join(', ')}`
  );

  const Back = isRTL ? ArrowRight : ArrowLeft;
  const Forward = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Preview nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900, background: 'var(--nav-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-2)', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em' }}>
            <Back size={14} /> {locale === 'ar' ? 'العودة' : 'Back'}
          </Link>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'var(--text)', letterSpacing: '0.06em' }}>AMIMI · Digital</span>
          <a href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noopener noreferrer" className="btn-gold-solid" style={{ fontSize: 9, padding: '8px 18px', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
            {locale === 'ar' ? 'ابنِ هذا الموقع' : 'Build This Site'} <Forward size={11} />
          </a>
        </div>
      </nav>

      {/* Page header */}
      <div style={{ paddingTop: 116, paddingBottom: 60, textAlign: 'center', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="eyebrow">{locale === 'ar' ? 'معاينة حزمتك' : 'Your Package Preview'}</span>
            <h1 className="section-title" style={{ marginBottom: 14 }}>
              {locale === 'ar' ? `${toShow.length} ميزات ستحصل عليها` : `${toShow.length} Features You Selected`}
            </h1>
            <p className="body-text" style={{ maxWidth: 520, margin: '0 auto 24px' }}>
              {locale === 'ar'
                ? 'شاهد كيف سيبدو موقع مطعمك مع كل ميزة مختارة — مع أمثلة حقيقية.'
                : 'See exactly what each feature looks like on your restaurant site — with real examples.'}
            </p>
            <div className="gold-divider" />
          </motion.div>
        </div>
      </div>

      {/* Feature sections */}
      {toShow.map((f, i) => {
        const content = locale === 'ar' ? f.ar : f.en;
        const MockupComp = mockupMap[f.id];
        // Alternate: even = text left, odd = text right (flip for RTL)
        const textFirst = (i % 2 === 0) !== isRTL;

        const textBlock = (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            <div style={{ fontSize: 48, marginBottom: 18, lineHeight: 1 }}>{f.icon}</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 400, color: 'var(--text)', marginBottom: 16, lineHeight: 1.12 }}>
              {content.title}
            </h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.85, marginBottom: 26 }}>
              {content.desc}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {content.bullets.map((b, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <div style={{ width: 19, height: 19, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <Check size={10} color="var(--bg)" strokeWidth={3} />
                  </div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 300, color: 'var(--text-2)', textAlign: isRTL ? 'right' : 'left', lineHeight: 1.65 }}>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );

        const mockupBlock = (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            {MockupComp ? <MockupComp /> : null}
          </motion.div>
        );

        return (
          <section key={f.id} style={{ padding: '88px 0', borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)' }}>
            <div className="container">
              <div className="preview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
                {textFirst ? <>{textBlock}{mockupBlock}</> : <>{mockupBlock}{textBlock}</>}
              </div>
            </div>
          </section>
        );
      })}

      {/* Final CTA */}
      <section style={{ padding: '100px 0', background: 'var(--bg-2)', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="eyebrow">{locale === 'ar' ? 'جاهز للبدء؟' : 'Ready to Start?'}</span>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              {locale === 'ar' ? 'لنبني موقع مطعمك الآن' : "Let's Build Your Restaurant Site"}
            </h2>
            <p className="body-text" style={{ maxWidth: 500, margin: '0 auto 36px' }}>
              {locale === 'ar' ? 'تواصل معنا الآن وسنبدأ البناء خلال أيام.' : "Get in touch and we'll start building within days, not months."}
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <a href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noopener noreferrer" className="btn-gold-solid" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                💬 {locale === 'ar' ? 'واتساب الآن' : 'WhatsApp Now'}
              </a>
              <Link href="/#contact" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                {locale === 'ar' ? 'نموذج التواصل' : 'Contact Form'} <Forward size={13} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .preview-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
