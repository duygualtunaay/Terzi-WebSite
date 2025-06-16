import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, MessageCircle, Mail, Navigation } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      content: 'Malazgirt, Telsiz Sk. No:16, 06930 Sincan/Ankara',
      action: () => window.open('https://maps.google.com/?q=39.954101,32.560990', '_blank')
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: '+90 541 623 52 00',
      action: () => window.open('tel:+905416235200', '_self')
    },
    {
      icon: MessageCircle,
      title: t('contact.whatsapp'),
      content: '+90 541 623 52 00',
      action: () => window.open('https://wa.me/905054171583?text=Merhaba, terzi hizmetleriniz hakkında bilgi almak istiyorum.', '_blank')
    },
    {
      icon: Instagram,
      title: t('contact.instagram'),
      content: '@oz_irem_tekstil_',
      action: () => window.open('https://www.instagram.com/oz_irem_tekstil_', '_blank')
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      content: t('contact.hoursText'),
      action: null
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Size en yakın konumda profesyonel terzi hizmetleri. Bizimle iletişime geçin, 
            hayalinizdeki kıyafeti birlikte tasarlayalım.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                İletişim Bilgilerimiz
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex items-start space-x-4 p-4 rounded-xl ${
                      info.action ? 'hover:bg-gray-50 cursor-pointer transition-colors' : ''
                    }`}
                    onClick={info.action || undefined}
                  >
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-lg flex-shrink-0">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-600">
                        {info.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Hızlı İletişim
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.open('https://wa.me/905054171583?text=Merhaba, terzi hizmetleriniz hakkında bilgi almak istiyorum.', '_blank')}
                  className="w-full flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp ile Mesaj Gönder
                </button>
                <button
                  onClick={() => window.open('tel:+905416235200', '_self')}
                  className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Hemen Ara
                </button>
                <button
                  onClick={() => window.open('https://maps.google.com/?q=39.954101,32.560990', '_blank')}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Navigation className="h-5 w-5 mr-2" />
                  Yol Tarifi Al
                </button>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Konumumuz
              </h2>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.5234567890123!2d32.560990!3d39.954101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU3JzE0LjgiTiAzMsKwMzMnMzkuNiJF!5e0!3m2!1str!2str!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Öz-İrem Tekstil Konum"
                  ></iframe>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Öz-İrem Tekstil
                      </h3>
                      <p className="text-gray-600">
                        Malazgirt, Telsiz Sk. No:16, Sincan/Ankara
                      </p>
                    </div>
                    <button
                      onClick={() => window.open('https://maps.google.com/?q=39.954101,32.560990', '_blank')}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Haritada Aç
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Çalışma Saatlerimiz
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Pazartesi - Cuma</span>
                  <span className="font-medium text-gray-900">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Cumartesi</span>
                  <span className="font-medium text-gray-900">09:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Pazar</span>
                  <span className="font-medium text-red-600">Kapalı</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-100 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Not:</strong> Acil durumlar için WhatsApp üzerinden 7/24 ulaşabilirsiniz.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Sık Sorulan Sorular
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Randevu almam gerekli mi?
              </h3>
              <p className="text-gray-600">
                Randevu almanız önerilir ancak zorunlu değildir. Randevunuz varsa 
                daha hızlı hizmet alabilirsiniz.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Teslimat süreniz ne kadar?
              </h3>
              <p className="text-gray-600">
                İşin türüne göre 1-7 gün arasında değişmektedir. 
                Acil işler aynı gün teslim edilebilir.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Ödeme seçenekleri nelerdir?
              </h3>
              <p className="text-gray-600">
                Nakit, kredi kartı ve banka kartı ile ödeme yapabilirsiniz. 
                Havale/EFT de kabul edilmektedir.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Evden alım hizmetiniz var mı?
              </h3>
              <p className="text-gray-600">
                Belirli bir minimum tutar üzerinde evden alım ve teslim 
                hizmeti sunmaktayız. Detaylar için arayınız.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};