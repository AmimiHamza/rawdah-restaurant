'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star, Info } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { menuItems, MenuItem, categoryKeys, Category } from '@/lib/menuData';

function DishModal({ dish, onClose, t, isRTL }: {
  dish: MenuItem;
  onClose: () => void;
  t: ReturnType<typeof useI18n>['t'];
  isRTL: boolean;
}) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#1E1E1E',
          border: '1px solid rgba(212,175,55,0.2)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '280px', overflow: 'hidden', background: 'linear-gradient(135deg, #1A1410 0%, #2C2010 50%, #1A1410 100%)' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Cormorant Garamond'", fontSize: '80px', fontWeight: 300, color: 'rgba(212,175,55,0.1)' }}>✦</span>
          </div>
          <img
            src={dish.image}
            alt={isRTL ? dish.nameAr : dish.nameEn}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(30,30,30,1) 0%, transparent 60%)',
          }} />
          {dish.signature && (
            <div style={{
              position: 'absolute',
              top: '16px',
              [isRTL ? 'left' : 'right']: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(212,175,55,0.9)',
              padding: '4px 12px',
              borderRadius: '20px',
            }}>
              <Star size={10} fill="#121212" color="#121212" />
              <span style={{ fontFamily: "'Montserrat'", fontSize: '9px', fontWeight: 700, color: '#121212', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {isRTL ? 'طبق مميز' : 'Signature'}
              </span>
            </div>
          )}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              [isRTL ? 'right' : 'left']: '16px',
              background: 'rgba(18,18,18,0.8)',
              border: 'none',
              color: '#F8F8F8',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '2px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px 36px 36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '32px', fontWeight: 400, color: '#F8F8F8', flex: 1 }}>
              {isRTL ? dish.nameAr : dish.nameEn}
            </h3>
            <div style={{ textAlign: isRTL ? 'left' : 'right', flexShrink: 0, marginLeft: isRTL ? '0' : '20px', marginRight: isRTL ? '20px' : '0' }}>
              <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '28px', fontWeight: 400, color: '#D4AF37' }}>
                {dish.price} <span style={{ fontSize: '16px' }}>SAR</span>
              </div>
              <div style={{ fontFamily: "'Montserrat'", fontSize: '11px', color: 'rgba(248,248,248,0.5)', marginTop: '4px' }}>
                {dish.calories} {t.menu.calories}
              </div>
            </div>
          </div>

          <div style={{ width: '40px', height: '1px', background: '#D4AF37', marginBottom: '20px', marginLeft: isRTL ? 'auto' : '0', marginRight: isRTL ? '0' : 'auto' }} />

          <p style={{ fontFamily: "'Montserrat'", fontSize: '14px', fontWeight: 300, color: 'rgba(248,248,248,0.75)', lineHeight: 1.8, marginBottom: '24px', textAlign: isRTL ? 'right' : 'left' }}>
            {isRTL ? dish.descAr : dish.descEn}
          </p>

          {dish.allergens.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <Info size={13} color="rgba(212,175,55,0.6)" />
                <span style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.7)' }}>
                  {t.menu.allergens}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
                {dish.allergens.map((a) => (
                  <span key={a} className="allergen-tag">{a}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function DishCard({ dish, onClick, isRTL }: { dish: MenuItem; onClick: () => void; isRTL: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      style={{
        background: '#1A1A1A',
        border: '1px solid rgba(212,175,55,0.08)',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.35)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.08)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Image */}
      <div style={{ height: '200px', overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #1A1410 0%, #2C2010 50%, #1A1410 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Cormorant Garamond'", fontSize: '56px', fontWeight: 300, color: 'rgba(212,175,55,0.12)', letterSpacing: '0.1em' }}>✦</span>
        </div>
        <img
          src={dish.image}
          alt={dish.nameEn}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        />
      </div>

      {/* Signature badge */}
      {dish.signature && (
        <div style={{
          position: 'absolute',
          top: '12px',
          [isRTL ? 'left' : 'right']: '12px',
          background: 'rgba(212,175,55,0.9)',
          padding: '3px 10px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <Star size={9} fill="#121212" color="#121212" />
          <span style={{ fontFamily: "'Montserrat'", fontSize: '8px', fontWeight: 700, color: '#121212', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Signature
          </span>
        </div>
      )}

      {/* Text */}
      <div style={{ padding: '20px 22px 24px' }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '22px', fontWeight: 400, color: '#F8F8F8', marginBottom: '8px' }}>
          {isRTL ? dish.nameAr : dish.nameEn}
        </h3>
        <p style={{ fontFamily: "'Montserrat'", fontSize: '12px', fontWeight: 300, color: 'rgba(248,248,248,0.5)', lineHeight: 1.6, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {isRTL ? dish.descAr : dish.descEn}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <span style={{ fontFamily: "'Cormorant Garamond'", fontSize: '20px', fontWeight: 400, color: '#D4AF37' }}>
            {dish.price} SAR
          </span>
          <span style={{ fontFamily: "'Montserrat'", fontSize: '10px', color: 'rgba(248,248,248,0.4)' }}>
            {dish.calories} kcal
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const { t, isRTL } = useI18n();
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All');
  const [search, setSearch] = useState('');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const categoryLabels = ['All', ...categoryKeys];

  const filtered = useMemo(() => {
    return menuItems.filter((d) => {
      const matchCat = activeCategory === 'All' || d.category === activeCategory;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        d.nameEn.toLowerCase().includes(q) ||
        d.nameAr.includes(q) ||
        d.descEn.toLowerCase().includes(q) ||
        d.descAr.includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <section id="menu" style={{ padding: '140px 0', background: '#0E0E0E' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Montserrat'", fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '16px' }}
          >
            {t.menu.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: '#F8F8F8' }}
          >
            {t.menu.title}
          </motion.h2>
          <div className="gold-divider" style={{ marginTop: '20px' }} />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', marginBottom: '48px' }}>
          {/* Category filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
            {categoryLabels.map((cat, i) => {
              const label = t.menu.categories[i];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as 'All' | Category)}
                  style={{
                    padding: '8px 20px',
                    background: isActive ? '#D4AF37' : 'transparent',
                    border: `1px solid ${isActive ? '#D4AF37' : 'rgba(212,175,55,0.3)'}`,
                    color: isActive ? '#121212' : 'rgba(248,248,248,0.6)',
                    fontFamily: "'Montserrat'",
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    borderRadius: '2px',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <Search
              size={14}
              color="rgba(212,175,55,0.6)"
              style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [isRTL ? 'right' : 'left']: '14px' }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.menu.searchPlaceholder}
              className="luxury-input"
              style={{
                paddingLeft: isRTL ? '18px' : '40px',
                paddingRight: isRTL ? '40px' : '18px',
                textAlign: isRTL ? 'right' : 'left',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [isRTL ? 'left' : 'right']: '14px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(248,248,248,0.5)' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center', color: 'rgba(248,248,248,0.4)', fontFamily: "'Montserrat'", padding: '60px 0' }}
            >
              {t.menu.noResults}
            </motion.p>
          ) : (
            <motion.div
              key="grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {filtered.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  isRTL={isRTL}
                  onClick={() => setSelectedDish(dish)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedDish && (
          <DishModal
            dish={selectedDish}
            t={t}
            isRTL={isRTL}
            onClose={() => setSelectedDish(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
