import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Clock, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FloatingFabrics } from '../components/animations/FloatingFabrics';
import { SewingMachine } from '../components/animations/SewingMachine';

export const Home: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: '2000+ Mutlu Müşteri',
      description: 'Yıllar içinde binlerce müşteriye hizmet verdik',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Clock,
      title: '20 Yıllık Deneyim',
      description: 'Profesyonel terzilikte uzun yılların tecrübesi',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Award,
      title: 'Kaliteli İşçilik',
      description: 'Her işimizde mükemmellik ve detay odaklı yaklaşım',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Star,
      title: '5 Yıldız Hizmet',
      description: 'Müşteri memnuniyetinde en üst seviye kalite',
      color: 'from-fuchsia-500 to-pink-600'
    }
  ];

  const services = [
    {
      title: 'Erkek Terziliği',
      description: 'Takım elbise, gömlek, pantolon dikim ve tadilat',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-blue-600 to-indigo-700'
    },
    {
      title: 'Kadın Terziliği',
      description: 'Elbise, bluz, etek ve özel tasarım dikimi',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-fuchsia-600 to-pink-700'
    },
    {
      title: 'Tadilat & Onarım',
      description: 'Profesyonel kıyafet tadilat ve onarım hizmetleri',
      image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-emerald-600 to-teal-700'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <FloatingFabrics />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex justify-center mb-8">
              <SewingMachine />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-emerald-400 dark:via-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                to="/services"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="https://wa.me/905054171583?text=Merhaba, terzi hizmetleriniz hakkında bilgi almak istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                {t('hero.whatsapp')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Neden Öz-İrem Tekstil?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Yılların deneyimi ve müşteri odaklı hizmet anlayışımızla fark yaratıyoruz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-4 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className={`inline-flex items-center text-transparent bg-gradient-to-r ${service.gradient} bg-clip-text hover:opacity-80 font-medium transition-opacity`}
                  >
                    Detayları Gör
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              {t('common.viewAll')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 dark:from-emerald-700 dark:via-teal-700 dark:to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Hayalinizdeki Kıyafeti Birlikte Tasarlayalım
            </h2>
            <p className="text-xl text-emerald-100">
              Profesyonel terzi hizmetlerimizle stilinizi mükemmelleştirin. 
              Ücretsiz ölçü alma ve danışmanlık için bugün bize ulaşın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                {t('common.contact')}
              </Link>
              <a
                href="https://wa.me/905054171583"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                WhatsApp ile Ulaşın
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};