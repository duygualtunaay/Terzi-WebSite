import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, MapPin, Phone, Instagram, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-2 rounded-lg shadow-lg">
                <Scissors className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Öz-İrem Tekstil</h3>
                <p className="text-sm text-gray-400">Profesyonel Terzi</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ankara Sincan'da 20 yıllık deneyimle profesyonel terzi hizmetleri sunuyoruz. 
              Kaliteli işçilik ve müşteri memnuniyeti önceliğimizdir.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Hızlı Bağlantılar</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                {t('nav.home')}
              </Link>
              <Link to="/services" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                {t('nav.services')}
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                {t('nav.about')}
              </Link>
              <Link to="/size-estimator" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                {t('nav.sizeEstimator')}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">{t('contact.title')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">
                    Malazgirt, Telsiz Sk. No:16,<br />
                    06930 Sincan/Ankara
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <p className="text-sm text-gray-300">+90 541 623 5200</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">{t('contact.hoursText')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Sosyal Medya</h4>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/oz_irem_tekstil_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-fuchsia-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="text-sm">@oz_irem_tekstil_</span>
              </a>
              <a
                href="https://wa.me/905054171583"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="text-sm font-medium">WhatsApp ile İletişim</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Öz-İrem Tekstil. Tüm hakları saklıdır. | Özlem Altunay, Derya Girmeç & Dilek Girmeç
          </p>
        </div>
      </div>
    </footer>
  );
};