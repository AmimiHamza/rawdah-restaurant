'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingBag, CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { menuItems } from '@/lib/menuData';

type PaymentMethod = 'mada' | 'apple_pay' | 'card';

interface CartItem {
  id: string;
  qty: number;
}

const starters  = menuItems.filter((d) => d.category === 'Starters');
const mains     = menuItems.filter((d) => d.category === 'Mains');
const desserts  = menuItems.filter((d) => d.category === 'Desserts');

function CourseSection({
  title,
  items,
  cart,
  onAdd,
  onRemove,
  isRTL,
}: {
  title: string;
  items: typeof menuItems;
  cart: CartItem[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  isRTL: boolean;
}) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <h3 style={{
        fontFamily: "'Cormorant Garamond'",
        fontSize: '26px',
        fontWeight: 400,
        color: '#D4AF37',
        marginBottom: '20px',
        textAlign: isRTL ? 'right' : 'left',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        paddingBottom: '12px',
      }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((dish) => {
          const inCart = cart.find((c) => c.id === dish.id);
          const qty = inCart?.qty ?? 0;
          return (
            <div
              key={dish.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                background: qty > 0 ? 'rgba(212,175,55,0.06)' : 'rgba(26,26,26,0.8)',
                border: `1px solid ${qty > 0 ? 'rgba(212,175,55,0.3)' : 'rgba(212,175,55,0.07)'}`,
                borderRadius: '2px',
                transition: 'all 0.25s ease',
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '19px', fontWeight: 400, color: '#F8F8F8', textAlign: isRTL ? 'right' : 'left' }}>
                  {isRTL ? dish.nameAr : dish.nameEn}
                </div>
                <div style={{ fontFamily: "'Montserrat'", fontSize: '11px', fontWeight: 300, color: 'rgba(248,248,248,0.5)', marginTop: '3px', textAlign: isRTL ? 'right' : 'left' }}>
                  {dish.price} SAR · {dish.calories} kcal
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                {qty > 0 && (
                  <>
                    <button
                      onClick={() => onRemove(dish.id)}
                      style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '2px' }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontFamily: "'Cormorant Garamond'", fontSize: '20px', color: '#D4AF37', minWidth: '24px', textAlign: 'center' }}>
                      {qty}
                    </span>
                  </>
                )}
                <button
                  onClick={() => onAdd(dish.id)}
                  style={{ background: qty > 0 ? '#D4AF37' : 'transparent', border: '1px solid #D4AF37', color: qty > 0 ? '#121212' : '#D4AF37', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '2px', transition: 'all 0.2s ease' }}
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OnlineOrder() {
  const { t, isRTL } = useI18n();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payment, setPayment] = useState<PaymentMethod>('mada');
  const [step, setStep] = useState<'build' | 'checkout' | 'done'>('build');

  const addItem = (id: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id, qty: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter((c) => c.id !== id);
      return prev.map((c) => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    });
  };

  const total = useMemo(() => {
    return cart.reduce((sum, ci) => {
      const dish = menuItems.find((d) => d.id === ci.id);
      return sum + (dish?.price ?? 0) * ci.qty;
    }, 0);
  }, [cart]);

  const itemCount = cart.reduce((s, c) => s + c.qty, 0);

  const paymentOptions: { key: PaymentMethod; label: string; icon: React.ReactNode }[] = [
    { key: 'mada', label: t.order.mada, icon: <CreditCard size={16} /> },
    { key: 'apple_pay', label: t.order.applePay, icon: <Smartphone size={16} /> },
    { key: 'card', label: t.order.card, icon: <CreditCard size={16} /> },
  ];

  return (
    <section id="order" style={{ padding: '140px 0', background: '#111111' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '16px' }}>
            {t.order.eyebrow}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: '#F8F8F8', marginBottom: '12px' }}>
            {t.order.title}
          </h2>
          <p style={{ fontFamily: "'Montserrat'", fontSize: '14px', fontWeight: 300, color: 'rgba(248,248,248,0.55)', maxWidth: '520px', margin: '0 auto' }}>
            {t.order.subtitle}
          </p>
          <div className="gold-divider" style={{ marginTop: '24px' }} />
        </motion.div>

        {step === 'done' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '80px 40px', background: 'rgba(26,26,26,0.8)', border: '1px solid rgba(212,175,55,0.2)' }}
          >
            <CheckCircle size={56} color="#D4AF37" style={{ margin: '0 auto 24px' }} />
            <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '36px', color: '#F8F8F8', marginBottom: '16px' }}>
              {isRTL ? 'تم استلام طلبك' : 'Order Received'}
            </h3>
            <p style={{ fontFamily: "'Montserrat'", fontSize: '14px', fontWeight: 300, color: 'rgba(248,248,248,0.65)' }}>
              {t.order.orderPlaced}
            </p>
            <button className="btn-gold" style={{ marginTop: '32px' }} onClick={() => { setCart([]); setStep('build'); }}>
              {isRTL ? 'طلب جديد' : 'New Order'}
            </button>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '40px', alignItems: 'start', direction: isRTL ? 'rtl' : 'ltr' }}>

            {/* Left: course sections */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <CourseSection title={t.order.starters}  items={starters}  cart={cart} onAdd={addItem} onRemove={removeItem} isRTL={isRTL} />
              <CourseSection title={t.order.mains}     items={mains}     cart={cart} onAdd={addItem} onRemove={removeItem} isRTL={isRTL} />
              <CourseSection title={t.order.desserts}  items={desserts}  cart={cart} onAdd={addItem} onRemove={removeItem} isRTL={isRTL} />
            </motion.div>

            {/* Right: order summary */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{ position: 'sticky', top: '100px' }}
            >
              <div style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(212,175,55,0.15)', padding: '32px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                  <ShoppingBag size={18} color="#D4AF37" />
                  <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '22px', fontWeight: 400, color: '#F8F8F8' }}>
                    {isRTL ? 'طلبك' : 'Your Order'}
                  </h3>
                  {itemCount > 0 && (
                    <span style={{ background: '#D4AF37', color: '#121212', fontSize: '11px', fontWeight: 700, borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: isRTL ? '0' : 'auto', marginRight: isRTL ? 'auto' : '0' }}>
                      {itemCount}
                    </span>
                  )}
                </div>

                {cart.length === 0 ? (
                  <p style={{ fontFamily: "'Montserrat'", fontSize: '12px', color: 'rgba(248,248,248,0.35)', padding: '24px 0', textAlign: isRTL ? 'right' as const : 'left' as const }}>
                    {t.order.empty}
                  </p>
                ) : (
                  <>
                    <div style={{ borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '16px', marginBottom: '20px' }}>
                      {cart.map((ci) => {
                        const dish = menuItems.find((d) => d.id === ci.id)!;
                        return (
                          <div key={ci.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                            <span style={{ fontFamily: "'Montserrat'", fontSize: '12px', color: 'rgba(248,248,248,0.7)' }}>
                              {ci.qty}× {isRTL ? dish.nameAr : dish.nameEn}
                            </span>
                            <span style={{ fontFamily: "'Montserrat'", fontSize: '12px', color: '#D4AF37', fontWeight: 500 }}>
                              {dish.price * ci.qty} SAR
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', marginBottom: '28px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <span style={{ fontFamily: "'Montserrat'", fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,248,248,0.6)' }}>
                        {t.order.total}
                      </span>
                      <span style={{ fontFamily: "'Cormorant Garamond'", fontSize: '24px', fontWeight: 400, color: '#D4AF37' }}>
                        {total} SAR
                      </span>
                    </div>
                  </>
                )}

                {/* Payment method */}
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.7)', marginBottom: '12px', textAlign: isRTL ? 'right' : 'left' }}>
                    {t.order.payment}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {paymentOptions.map(({ key, label, icon }) => (
                      <button
                        key={key}
                        onClick={() => setPayment(key)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 16px',
                          background: payment === key ? 'rgba(212,175,55,0.1)' : 'transparent',
                          border: `1px solid ${payment === key ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
                          color: payment === key ? '#D4AF37' : 'rgba(248,248,248,0.6)',
                          fontFamily: "'Montserrat'",
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          borderRadius: '2px',
                          transition: 'all 0.2s ease',
                          flexDirection: isRTL ? 'row-reverse' : 'row',
                          textAlign: isRTL ? 'right' : 'left',
                        }}
                      >
                        {icon}
                        {label}
                        {payment === key && (
                          <span style={{ marginLeft: isRTL ? '0' : 'auto', marginRight: isRTL ? 'auto' : '0', width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37', flexShrink: 0 }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="btn-gold-solid"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={cart.length === 0}
                  onClick={() => setStep('done')}
                >
                  {t.order.checkout}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          #order > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #order > div > div:last-child > div:last-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
