import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MessageCircle, Scissors, Shirt, Palette, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceItem {
  name: string;
  price: string;
  description: string;
}

interface ServiceCategory {
  title: string;
  icon: any;
  color: string;
  services: ServiceItem[];
}

export const Services: React.FC = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<string>('');
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  const serviceCategories: ServiceCategory[] = [
    {
      title: t('services.men'),
      icon: Shirt,
      color: 'from-blue-500 to-blue-600',
      services: [
        { name: 'Takım Elbise Dikimi', price: '800-1200', description: 'Kişiye özel takım elbise dikimi' },
        { name: 'Pantolon Paça Kısaltma', price: '40-60', description: 'Pantolon paça uzunluğu ayarı' },
        { name: 'Ceket Daraltma', price: '80-120', description: 'Ceket bel ve kol daraltma işlemi' },
        { name: 'Gömlek Daraltma', price: '50-80', description: 'Gömlek bel ve kol daraltma' },
        { name: 'Pantolon Bel Daraltma', price: '60-90', description: 'Pantolon bel genişliği ayarı' }
      ]
    },
    {
      title: t('services.women'),
      icon: Palette,
      color: 'from-pink-500 to-pink-600',
      services: [
        { name: 'Elbise Dikimi', price: '600-1000', description: 'Özel tasarım elbise dikimi' },
        { name: 'Bluz Dikimi', price: '300-500', description: 'Kişiye özel bluz dikimi' },
        { name: 'Etek Dikimi', price: '250-400', description: 'Çeşitli model etek dikimi' },
        { name: 'Elbise Tadilat', price: '80-150', description: 'Elbise dar/geniş alma işlemleri' },
        { name: 'Fermuar Değişimi', price: '30-50', description: 'Bozuk fermuar değişimi' }
      ]
    },
    {
      title: t('services.alterations'),
      icon: Scissors,
      color: 'from-amber-500 to-amber-600',
      services: [
        { name: 'Yırtık Onarım', price: '25-60', description: 'Kıyafet yırtık ve delik onarımı' },
        { name: 'Düğme Değişimi', price: '10-25', description: 'Kopmuş düğme değişimi' },
        { name: 'Astarlık Değişimi', price: '40-80', description: 'Elbise astar yenileme' },
        { name: 'Kenar Overlok', price: '15-30', description: 'Kenar overlok işlemi' },
        { name: 'Dikiş Onarımı', price: '20-40', description: 'Açılmış dikiş onarımı' }
      ]
    }
  ];

  const calculatePrice = (serviceName: string) => {
    const allServices = serviceCategories.flatMap(cat => cat.services);
    const service = allServices.find(s => s.name === serviceName);
    if (service) {
      const priceRange = service.price.split('-');
      const averagePrice = (parseInt(priceRange[0]) + parseInt(priceRange[1])) / 2;
      setEstimatedPrice(averagePrice);
      setSelectedService(serviceName);
    }
  };

  const sendWhatsAppMessage = (serviceName: string) => {
    const message = `Merhaba, "${serviceName}" hizmeti için fiyat teklifi almak istiyorum. Detaylı bilgi alabilir miyim?`;
    window.open(`https://wa.me/905054171583?text=${encodeURIComponent(message)}`, '_blank');
  };

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
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Price Estimator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Calculator className="h-8 w-8 text-amber-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              {t('services.priceEstimator')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Hizmet Seçin:
              </label>
              <select
                value={selectedService}
                onChange={(e) => calculatePrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Bir hizmet seçin...</option>
                {serviceCategories.map((category) =>
                  category.services.map((service, index) => (
                    <option key={`${category.title}-${index}`} value={service.name}>
                      {service.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            
            <div className="text-center">
              {estimatedPrice > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <p className="text-lg text-gray-600">Tahmini Fiyat:</p>
                  <p className="text-4xl font-bold text-amber-600">₺{estimatedPrice}</p>
                  <button
                    onClick={() => sendWhatsAppMessage(selectedService)}
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {t('services.getQuoteWhatsApp')}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Service Categories */}
        <div className="space-y-12">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${category.color} p-6`}>
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: serviceIndex * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-amber-600">
                          ₺{service.price}
                        </span>
                        <button
                          onClick={() => sendWhatsAppMessage(service.name)}
                          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Sor
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Hizmet Özelliklerimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Hızlı Teslimat</h3>
                <p className="text-gray-300">
                  Acil işlerinizi aynı gün içinde teslim ediyoruz
                </p>
              </div>
              <div className="text-center">
                <Scissors className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Kaliteli İşçilik</h3>
                <p className="text-gray-300">
                  20 yıllık deneyimle mükemmel sonuçlar garantiliyoruz
                </p>
              </div>
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">WhatsApp Destek</h3>
                <p className="text-gray-300">
                  7/24 WhatsApp desteği ile her zaman ulaşılabilir
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};