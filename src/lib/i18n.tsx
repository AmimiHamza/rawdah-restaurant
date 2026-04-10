'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'en' | 'ar' | 'fr';

const STORAGE_KEY = 'amimi-locale';

const translations = {
  en: {
    nav: {
      story:        'Our Story',
      menu:         'Menu',
      reservations: 'Reservations',
      order:        'Order Online',
      privateDining:'Private Dining',
    },
    hero: {
      tagline:  'Where Saudi Heritage Meets Contemporary Mastery',
      cta1:     'Reserve a Table',
      cta2:     'Explore Menu',
      scroll:   'Scroll to discover',
    },
    narrative: {
      eyebrow:   'Source & Craft',
      title:     'Rooted in the Kingdom,\nRefined by the World',
      p1:        'Every dish at Rawdah begins with a pilgrimage — to the date farms of Al-Ahsa, the coastal waters of Jizan, the herb gardens of Asir. Our chefs travel the length of the Kingdom to source ingredients that carry the memory of the land.',
      p2:        'From slow-caramelised Medjool date reductions that anchor our sauces, to hand-caught hammour from the Red Sea, we apply French technique to fundamentally Saudi ingredients. The result is a cuisine that could exist nowhere else.',
      stat1_val: '12',
      stat1_lab: 'Saudi Regions Sourced',
      stat2_val: '94%',
      stat2_lab: 'Locally Grown Produce',
      stat3_val: '3★',
      stat3_lab: 'Michelin Recognition',
    },
    menu: {
      eyebrow:          'The Tasting Collection',
      title:            'A Curated Journey',
      searchPlaceholder:'Search dishes…',
      categories:       ['All', 'Starters', 'Mains', 'Desserts', 'Dry Bar'],
      noResults:        'No dishes found.',
      calories:         'kcal',
      allergens:        'Allergens',
      perPerson:        'per person',
      close:            'Close',
    },
    reservation: {
      eyebrow:    'Reserve',
      title:      'Secure Your Experience',
      date:       'Date',
      time:       'Time',
      guests:     'Guests',
      name:       'Full Name',
      phone:      'Phone Number',
      email:      'Email Address',
      occasion:   'Special Occasion',
      notes:      'Special Requests',
      privateRoom:'Private Room recommended for your group',
      deposit:    'A SAR 150/person deposit is required for Thursday & Friday evenings',
      cta:        'Confirm Reservation',
      times:      ['12:00', '13:00', '14:00', '19:00', '20:00', '20:30', '21:00', '21:30', '22:00'],
      occasions:  ['None', 'Birthday', 'Anniversary', 'Business Dinner', 'Proposal', 'Other'],
      success:    'Your reservation has been received. We will confirm via WhatsApp shortly.',
    },
    order: {
      eyebrow:    'Fine Dining Delivered',
      title:      'Order in Sequence',
      subtitle:   'Curate your meal as you would at the table — starter, main, dessert.',
      starters:   'I. Starters',
      mains:      'II. Mains',
      desserts:   'III. Desserts',
      add:        'Add',
      remove:     'Remove',
      checkout:   'Proceed to Checkout',
      total:      'Total',
      payment:    'Payment',
      mada:       'Mada',
      applePay:   'Apple Pay',
      card:       'Credit / Debit Card',
      sar:        'SAR',
      empty:      'Your selection is empty',
      orderPlaced:'Order confirmed! Estimated delivery: 45–60 mins.',
    },
    privateDining: {
      eyebrow: 'Exclusive Spaces',
      title:   'Private Dining & Events',
      subtitle:'Five intimate rooms, each with curated ambience and complete privacy for your guests.',
      cta:     'Enquire Now',
    },
    whatsapp: 'Chat with Concierge',
    footer: {
      tagline: 'Fine Dining · Riyadh, Kingdom of Saudi Arabia',
      hours:   'Daily 12:00 – 15:00 | 19:00 – 00:00',
      address: 'King Fahd Road, Olaya District, Riyadh 12211',
      phone:   '+212 643 636 334',
      follow:  'Follow',
      rights:  '© 2025 Rawdah Restaurant. All rights reserved.',
      privacy: 'Privacy Policy',
      terms:   'Terms of Service',
    },
  },
  fr: {
    nav: {
      story:        'Notre Histoire',
      menu:         'Menu',
      reservations: 'Réservations',
      order:        'Commander en Ligne',
      privateDining:'Salons Privés',
    },
    hero: {
      tagline:  "Là où l'Héritage Saoudien Rencontre la Maîtrise Contemporaine",
      cta1:     'Réserver une Table',
      cta2:     'Explorer le Menu',
      scroll:   'Défiler pour découvrir',
    },
    narrative: {
      eyebrow:   'Source & Savoir-Faire',
      title:     'Enraciné au Royaume,\nRaffiné par le Monde',
      p1:        "Chaque plat de Rawdah commence par un pèlerinage — vers les dattiers d'Al-Ahsa, les eaux côtières de Jizan, les jardins d'herbes de l'Asir. Nos chefs parcourent le Royaume pour sourcer des ingrédients qui portent la mémoire de la terre.",
      p2:        "Des réductions de dattes Medjool caramélisées lentement qui ancrent nos sauces, au hammour pêché à la main en Mer Rouge, nous appliquons la technique française à des ingrédients fondamentalement saoudiens.",
      stat1_val: '12',
      stat1_lab: 'Régions Saoudiennes',
      stat2_val: '94 %',
      stat2_lab: 'Produits Locaux',
      stat3_val: '3★',
      stat3_lab: 'Reconnaissance Michelin',
    },
    menu: {
      eyebrow:          'La Collection Dégustation',
      title:            'Un Voyage Cuisiné',
      searchPlaceholder:'Rechercher un plat…',
      categories:       ['Tout', 'Entrées', 'Plats', 'Desserts', 'Bar Sans Alcool'],
      noResults:        'Aucun plat trouvé.',
      calories:         'kcal',
      allergens:        'Allergènes',
      perPerson:        'par personne',
      close:            'Fermer',
    },
    reservation: {
      eyebrow:    'Réservation',
      title:      'Sécurisez Votre Expérience',
      date:       'Date',
      time:       'Heure',
      guests:     'Convives',
      name:       'Nom Complet',
      phone:      'Numéro de Téléphone',
      email:      'Adresse E-mail',
      occasion:   'Occasion Spéciale',
      notes:      'Demandes Spéciales',
      privateRoom:'Salon privé recommandé pour votre groupe',
      deposit:    'Un acompte de 150 SAR/personne est requis le jeudi et vendredi soir',
      cta:        'Confirmer la Réservation',
      times:      ['12:00', '13:00', '14:00', '19:00', '20:00', '20:30', '21:00', '21:30', '22:00'],
      occasions:  ['Aucune', 'Anniversaire', 'Fête', 'Dîner d\'affaires', 'Demande en mariage', 'Autre'],
      success:    'Votre réservation a été reçue. Nous confirmerons via WhatsApp sous peu.',
    },
    order: {
      eyebrow:    'Fine Cuisine Livrée',
      title:      'Commander en Séquence',
      subtitle:   "Composez votre repas comme à table — entrée, plat, dessert.",
      starters:   'I. Entrées',
      mains:      'II. Plats',
      desserts:   'III. Desserts',
      add:        'Ajouter',
      remove:     'Retirer',
      checkout:   'Passer à la Caisse',
      total:      'Total',
      payment:    'Paiement',
      mada:       'Mada',
      applePay:   'Apple Pay',
      card:       'Carte Bancaire',
      sar:        'SAR',
      empty:      'Votre sélection est vide',
      orderPlaced:'Commande confirmée ! Livraison estimée : 45–60 min.',
    },
    privateDining: {
      eyebrow: 'Espaces Exclusifs',
      title:   'Salons Privés & Événements',
      subtitle:"Cinq salons intimes, chacun avec une ambiance soignée et une confidentialité totale pour vos invités.",
      cta:     'Nous Contacter',
    },
    whatsapp: 'Discuter avec le Concierge',
    footer: {
      tagline: 'Fine Dining · Riyad, Royaume d\'Arabie Saoudite',
      hours:   'Tous les jours 12h00 – 15h00 | 19h00 – 00h00',
      address: 'Route du Roi Fahd, Quartier Olaya, Riyad 12211',
      phone:   '+212 643 636 334',
      follow:  'Suivre',
      rights:  '© 2025 Restaurant Rawdah. Tous droits réservés.',
      privacy: 'Politique de Confidentialité',
      terms:   "Conditions d'Utilisation",
    },
  },
  ar: {
    nav: {
      story:        'قصتنا',
      menu:         'القائمة',
      reservations: 'الحجز',
      order:        'اطلب عبر الإنترنت',
      privateDining:'الغرف الخاصة',
    },
    hero: {
      tagline: 'حيث يلتقي التراث السعودي بالإتقان المعاصر',
      cta1:    'احجز طاولة',
      cta2:    'استكشف القائمة',
      scroll:  'اسحب للاكتشاف',
    },
    narrative: {
      eyebrow:   'المصدر والحرفية',
      title:     'جذور في المملكة،\nورؤية عالمية',
      p1:        'تبدأ كل وجبة في روضة برحلة — إلى مزارع التمر في الأحساء، وسواحل جيزان، وحدائق أعشاب عسير. يجوب طهاتنا طول المملكة بحثاً عن المكونات التي تحمل ذاكرة الأرض.',
      p2:        'من تحلية تمر المجدول الكراميلية المطهوة ببطء، إلى الهامور الطازج من البحر الأحمر، نطبق الأساليب الفرنسية على مكونات سعودية أصيلة. النتيجة مطبخ لا يمكن أن يوجد في أي مكان آخر.',
      stat1_val: '١٢',
      stat1_lab: 'منطقة سعودية كمصدر',
      stat2_val: '٩٤٪',
      stat2_lab: 'منتجات محلية الزراعة',
      stat3_val: '٣★',
      stat3_lab: 'اعتراف ميشلان',
    },
    menu: {
      eyebrow:          'مجموعة التذوق',
      title:            'رحلة منتقاة',
      searchPlaceholder:'ابحث عن الأطباق…',
      categories:       ['الكل', 'المقبلات', 'الأطباق الرئيسية', 'الحلويات', 'بار بدون كحول'],
      noResults:        'لا توجد أطباق.',
      calories:         'سعرة',
      allergens:        'مسببات الحساسية',
      perPerson:        'للشخص',
      close:            'إغلاق',
    },
    reservation: {
      eyebrow:    'احجز',
      title:      'احجز تجربتك',
      date:       'التاريخ',
      time:       'الوقت',
      guests:     'عدد الضيوف',
      name:       'الاسم الكامل',
      phone:      'رقم الهاتف',
      email:      'البريد الإلكتروني',
      occasion:   'مناسبة خاصة',
      notes:      'طلبات خاصة',
      privateRoom:'يُنصح بالغرفة الخاصة لمجموعتكم',
      deposit:    'يُطلب دفع ١٥٠ ريال للشخص كعربون لأمسيات الخميس والجمعة',
      cta:        'تأكيد الحجز',
      times:      ['١٢:٠٠', '١٣:٠٠', '١٤:٠٠', '١٩:٠٠', '٢٠:٠٠', '٢٠:٣٠', '٢١:٠٠', '٢١:٣٠', '٢٢:٠٠'],
      occasions:  ['لا شيء', 'عيد ميلاد', 'ذكرى سنوية', 'عشاء عمل', 'خطوبة', 'أخرى'],
      success:    'تم استلام حجزك. سنؤكد عبر واتساب قريباً.',
    },
    order: {
      eyebrow:    'الفاخر يُوصل',
      title:      'اطلب بالتسلسل',
      subtitle:   'اختر وجبتك كما لو كنت على الطاولة — مقبلات، رئيسي، حلوى.',
      starters:   'أولاً: المقبلات',
      mains:      'ثانياً: الأطباق الرئيسية',
      desserts:   'ثالثاً: الحلويات',
      add:        'أضف',
      remove:     'إزالة',
      checkout:   'المتابعة للدفع',
      total:      'المجموع',
      payment:    'طريقة الدفع',
      mada:       'مدى',
      applePay:   'آبل باي',
      card:       'بطاقة ائتمانية / مدين',
      sar:        'ريال',
      empty:      'لم تختر أي شيء بعد',
      orderPlaced:'تم تأكيد طلبك! وقت التوصيل المقدر: ٤٥–٦٠ دقيقة.',
    },
    privateDining: {
      eyebrow: 'مساحات حصرية',
      title:   'الغرف الخاصة والفعاليات',
      subtitle:'خمس غرف حميمة، كل منها بأجواء منتقاة وخصوصية تامة لضيوفكم.',
      cta:     'استفسر الآن',
    },
    whatsapp: 'تحدث مع الكونسيرج',
    footer: {
      tagline: 'مطعم فاخر · الرياض، المملكة العربية السعودية',
      hours:   'يومياً ١٢:٠٠ – ١٥:٠٠ | ١٩:٠٠ – ٠٠:٠٠',
      address: 'طريق الملك فهد، حي العليا، الرياض ١٢٢١١',
      phone:   '٩٦٦ ١١ XXX XXXX+',
      follow:  'تابعنا',
      rights:  '© ٢٠٢٥ مطعم روضة. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms:   'شروط الخدمة',
    },
  },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof translations['en'];
  isRTL: boolean;
  pickerOpen: boolean;
  pickLanguage: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar');
  const [pickerOpen, setPickerOpen] = useState(false);

  // On mount: check localStorage — show picker only on first visit
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && ['en', 'ar', 'fr'].includes(saved)) {
      applyLocale(saved);
    } else {
      setPickerOpen(true);
    }
  }, []);

  const applyLocale = (l: Locale) => {
    setLocaleState(l);
    document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', l);
  };

  const setLocale = (l: Locale) => {
    applyLocale(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const pickLanguage = (l: Locale) => {
    setLocale(l);
    setPickerOpen(false);
  };

  // Keep dir/lang in sync when locale changes externally (e.g. nav toggle)
  useEffect(() => {
    document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', locale);
  }, [locale]);

  const t = translations[locale];
  const isRTL = locale === 'ar';

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isRTL, pickerOpen, pickLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
