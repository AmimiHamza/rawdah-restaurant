'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'en' | 'ar';

const translations = {
  en: {
    nav: {
      story:       'Our Story',
      menu:        'Menu',
      reservations:'Reservations',
      order:       'Order Online',
      privateDining:'Private Dining',
    },
    hero: {
      tagline:     'Where Saudi Heritage Meets Contemporary Mastery',
      cta1:        'Reserve a Table',
      cta2:        'Explore Menu',
      scroll:      'Scroll to discover',
    },
    narrative: {
      eyebrow:     'Source & Craft',
      title:       'Rooted in the Kingdom,\nRefined by the World',
      p1:          'Every dish at Rawdah begins with a pilgrimage — to the date farms of Al-Ahsa, the coastal waters of Jizan, the herb gardens of Asir. Our chefs travel the length of the Kingdom to source ingredients that carry the memory of the land.',
      p2:          'From slow-caramelised Medjool date reductions that anchor our sauces, to hand-caught hammour from the Red Sea, we apply French technique to fundamentally Saudi ingredients. The result is a cuisine that could exist nowhere else.',
      stat1_val:   '12',
      stat1_lab:   'Saudi Regions Sourced',
      stat2_val:   '94%',
      stat2_lab:   'Locally Grown Produce',
      stat3_val:   '3★',
      stat3_lab:   'Michelin Recognition',
    },
    menu: {
      eyebrow:     'The Tasting Collection',
      title:       'A Curated Journey',
      searchPlaceholder: 'Search dishes…',
      categories:  ['All', 'Starters', 'Mains', 'Desserts', 'Dry Bar'],
      noResults:   'No dishes found.',
      calories:    'kcal',
      allergens:   'Allergens',
      perPerson:   'per person',
      close:       'Close',
    },
    reservation: {
      eyebrow:     'Reserve',
      title:       'Secure Your Experience',
      date:        'Date',
      time:        'Time',
      guests:      'Guests',
      name:        'Full Name',
      phone:       'Phone Number',
      email:       'Email Address',
      occasion:    'Special Occasion',
      notes:       'Special Requests',
      privateRoom: 'Private Room recommended for your group',
      deposit:     'A SAR 150/person deposit is required for Thursday & Friday evenings',
      cta:         'Confirm Reservation',
      times:       ['12:00', '13:00', '14:00', '19:00', '20:00', '20:30', '21:00', '21:30', '22:00'],
      occasions:   ['None', 'Birthday', 'Anniversary', 'Business Dinner', 'Proposal', 'Other'],
      success:     'Your reservation has been received. We will confirm via WhatsApp shortly.',
    },
    order: {
      eyebrow:     'Fine Dining Delivered',
      title:       'Order in Sequence',
      subtitle:    'Curate your meal as you would at the table — starter, main, dessert.',
      starters:    'I. Starters',
      mains:       'II. Mains',
      desserts:    'III. Desserts',
      add:         'Add',
      remove:      'Remove',
      checkout:    'Proceed to Checkout',
      total:       'Total',
      payment:     'Payment',
      mada:        'Mada',
      applePay:    'Apple Pay',
      card:        'Credit / Debit Card',
      sar:         'SAR',
      empty:       'Your selection is empty',
      orderPlaced: 'Order confirmed! Estimated delivery: 45–60 mins.',
    },
    privateDining: {
      eyebrow:     'Exclusive Spaces',
      title:       'Private Dining & Events',
      subtitle:    'Five intimate rooms, each with curated ambience and complete privacy for your guests.',
      cta:         'Enquire Now',
    },
    whatsapp:      'Chat with Concierge',
    footer: {
      tagline:     'Fine Dining · Riyadh, Kingdom of Saudi Arabia',
      hours:       'Daily 12:00 – 15:00 | 19:00 – 00:00',
      address:     'King Fahd Road, Olaya District, Riyadh 12211',
      phone:       '+966 11 XXX XXXX',
      follow:      'Follow',
      rights:      '© 2025 Rawdah Restaurant. All rights reserved.',
      privacy:     'Privacy Policy',
      terms:       'Terms of Service',
    },
  },
  ar: {
    nav: {
      story:       'قصتنا',
      menu:        'القائمة',
      reservations:'الحجز',
      order:       'اطلب عبر الإنترنت',
      privateDining:'الغرف الخاصة',
    },
    hero: {
      tagline:     'حيث يلتقي التراث السعودي بالإتقان المعاصر',
      cta1:        'احجز طاولة',
      cta2:        'استكشف القائمة',
      scroll:      'اسحب للاكتشاف',
    },
    narrative: {
      eyebrow:     'المصدر والحرفية',
      title:       'جذور في المملكة،\nورؤية عالمية',
      p1:          'تبدأ كل وجبة في روضة برحلة — إلى مزارع التمر في الأحساء، وسواحل جيزان، وحدائق أعشاب عسير. يجوب طهاتنا طول المملكة بحثاً عن المكونات التي تحمل ذاكرة الأرض.',
      p2:          'من تحلية تمر المجدول الكراميلية المطهوة ببطء، إلى الهامور الطازج من البحر الأحمر، نطبق الأساليب الفرنسية على مكونات سعودية أصيلة. النتيجة مطبخ لا يمكن أن يوجد في أي مكان آخر.',
      stat1_val:   '١٢',
      stat1_lab:   'منطقة سعودية كمصدر',
      stat2_val:   '٩٤٪',
      stat2_lab:   'منتجات محلية الزراعة',
      stat3_val:   '٣★',
      stat3_lab:   'اعتراف ميشلان',
    },
    menu: {
      eyebrow:     'مجموعة التذوق',
      title:       'رحلة منتقاة',
      searchPlaceholder: 'ابحث عن الأطباق…',
      categories:  ['الكل', 'المقبلات', 'الأطباق الرئيسية', 'الحلويات', 'بار بدون كحول'],
      noResults:   'لا توجد أطباق.',
      calories:    'سعرة',
      allergens:   'مسببات الحساسية',
      perPerson:   'للشخص',
      close:       'إغلاق',
    },
    reservation: {
      eyebrow:     'احجز',
      title:       'احجز تجربتك',
      date:        'التاريخ',
      time:        'الوقت',
      guests:      'عدد الضيوف',
      name:        'الاسم الكامل',
      phone:       'رقم الهاتف',
      email:       'البريد الإلكتروني',
      occasion:    'مناسبة خاصة',
      notes:       'طلبات خاصة',
      privateRoom: 'يُنصح بالغرفة الخاصة لمجموعتكم',
      deposit:     'يُطلب دفع ١٥٠ ريال للشخص كعربون لأمسيات الخميس والجمعة',
      cta:         'تأكيد الحجز',
      times:       ['١٢:٠٠', '١٣:٠٠', '١٤:٠٠', '١٩:٠٠', '٢٠:٠٠', '٢٠:٣٠', '٢١:٠٠', '٢١:٣٠', '٢٢:٠٠'],
      occasions:   ['لا شيء', 'عيد ميلاد', 'ذكرى سنوية', 'عشاء عمل', 'خطوبة', 'أخرى'],
      success:     'تم استلام حجزك. سنؤكد عبر واتساب قريباً.',
    },
    order: {
      eyebrow:     'الفاخر يُوصل',
      title:       'اطلب بالتسلسل',
      subtitle:    'اختر وجبتك كما لو كنت على الطاولة — مقبلات، رئيسي، حلوى.',
      starters:    'أولاً: المقبلات',
      mains:       'ثانياً: الأطباق الرئيسية',
      desserts:    'ثالثاً: الحلويات',
      add:         'أضف',
      remove:      'إزالة',
      checkout:    'المتابعة للدفع',
      total:       'المجموع',
      payment:     'طريقة الدفع',
      mada:        'مدى',
      applePay:    'آبل باي',
      card:        'بطاقة ائتمانية / مدين',
      sar:         'ريال',
      empty:       'لم تختر أي شيء بعد',
      orderPlaced: 'تم تأكيد طلبك! وقت التوصيل المقدر: ٤٥–٦٠ دقيقة.',
    },
    privateDining: {
      eyebrow:     'مساحات حصرية',
      title:       'الغرف الخاصة والفعاليات',
      subtitle:    'خمس غرف حميمة، كل منها بأجواء منتقاة وخصوصية تامة لضيوفكم.',
      cta:         'استفسر الآن',
    },
    whatsapp:      'تحدث مع الكونسيرج',
    footer: {
      tagline:     'مطعم فاخر · الرياض، المملكة العربية السعودية',
      hours:       'يومياً ١٢:٠٠ – ١٥:٠٠ | ١٩:٠٠ – ٠٠:٠٠',
      address:     'طريق الملك فهد، حي العليا، الرياض ١٢٢١١',
      phone:       '٩٦٦ ١١ XXX XXXX+',
      follow:      'تابعنا',
      rights:      '© ٢٠٢٥ مطعم روضة. جميع الحقوق محفوظة.',
      privacy:     'سياسة الخصوصية',
      terms:       'شروط الخدمة',
    },
  },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof translations['en'];
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ar');
  const t = translations[locale];
  const isRTL = locale === 'ar';

  // Apply dir/lang to the root <html> element — no wrapper div needed,
  // which prevents the layout-shift / nav-flicker bug on mobile.
  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', locale);
  }, [isRTL, locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
