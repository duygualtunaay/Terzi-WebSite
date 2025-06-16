import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.services': 'Hizmetlerimiz',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    'nav.sizeEstimator': 'Beden Tahmini',
    
    // Homepage
    'hero.title': 'Profesyonel Terzi Hizmetleri',
    'hero.subtitle': 'Ankara Sincan\'da 20 yıllık deneyimle kişiye özel dikim ve tadilat hizmetleri',
    'hero.cta': 'Hizmetlerimizi Keşfedin',
    'hero.whatsapp': 'WhatsApp ile İletişim',
    
    // Services
    'services.title': 'Hizmetlerimiz',
    'services.subtitle': 'Profesyonel terzi hizmetleri ile stilinizi mükemmelleştirin',
    'services.men': 'Erkek Terziliği',
    'services.women': 'Kadın Terziliği',
    'services.alterations': 'Tadilat ve Onarım',
    'services.custom': 'Özel Dikim',
    'services.priceEstimator': 'Fiyat Hesaplama',
    'services.getQuoteWhatsApp': 'WhatsApp ile Fiyat Al',
    
    // About
    'about.title': 'Hakkımızda',
    'about.founders': 'Kurucularımız',
    'about.experience': 'Yıllık Deneyim',
    
    // Contact
    'contact.title': 'İletişim',
    'contact.address': 'Adres',
    'contact.phone': 'Telefon',
    'contact.whatsapp': 'WhatsApp',
    'contact.instagram': 'Instagram',
    'contact.hours': 'Çalışma Saatleri',
    'contact.hoursText': 'Pazartesi - Cumartesi: 09:00 - 18:00',
    
    // Size Estimator
    'size.title': 'AI Beden Tahmini',
    'size.subtitle': 'Ölçülerinizi girin, size uygun bedeni öğrenin',
    'size.height': 'Boy (cm)',
    'size.weight': 'Kilo (kg)',
    'size.waist': 'Bel (cm)',
    'size.chest': 'Göğüs (cm)',
    'size.hips': 'Kalça (cm)',
    'size.calculate': 'Beden Hesapla',
    'size.result': 'Önerilen Beden',
    'size.sendWhatsApp': 'WhatsApp ile Gönder',
    
    // Common
    'common.readMore': 'Devamını Oku',
    'common.viewAll': 'Tümünü Gör',
    'common.contact': 'İletişim',
    'common.phone': 'Ara',
    'common.whatsapp': 'WhatsApp',
    'common.close': 'Kapat',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.sizeEstimator': 'Size Estimator',
    
    // Homepage
    'hero.title': 'Professional Tailoring Services',
    'hero.subtitle': 'Custom tailoring and alterations with 20 years of experience in Sincan, Ankara',
    'hero.cta': 'Explore Our Services',
    'hero.whatsapp': 'Contact via WhatsApp',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Perfect your style with professional tailoring services',
    'services.men': 'Men\'s Tailoring',
    'services.women': 'Women\'s Tailoring',
    'services.alterations': 'Alterations & Repairs',
    'services.custom': 'Custom Tailoring',
    'services.priceEstimator': 'Price Calculator',
    'services.getQuoteWhatsApp': 'Get Quote via WhatsApp',
    
    // About
    'about.title': 'About Us',
    'about.founders': 'Our Founders',
    'about.experience': 'Years of Experience',
    
    // Contact
    'contact.title': 'Contact',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.whatsapp': 'WhatsApp',
    'contact.instagram': 'Instagram',
    'contact.hours': 'Business Hours',
    'contact.hoursText': 'Monday - Saturday: 09:00 - 18:00',
    
    // Size Estimator
    'size.title': 'AI Size Estimator',
    'size.subtitle': 'Enter your measurements to get size recommendations',
    'size.height': 'Height (cm)',
    'size.weight': 'Weight (kg)',
    'size.waist': 'Waist (cm)',
    'size.chest': 'Chest (cm)',
    'size.hips': 'Hips (cm)',
    'size.calculate': 'Calculate Size',
    'size.result': 'Recommended Size',
    'size.sendWhatsApp': 'Send via WhatsApp',
    
    // Common
    'common.readMore': 'Read More',
    'common.viewAll': 'View All',
    'common.contact': 'Contact',
    'common.phone': 'Call',
    'common.whatsapp': 'WhatsApp',
    'common.close': 'Close',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['tr']] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};