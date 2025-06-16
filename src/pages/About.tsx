import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock, Star, Scissors, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const founders = [
    {
      name: 'Özlem Altunay',
      title: 'Kurucu Ortak & Baş Terzi',
      description: '15 yıllık deneyime sahip, özellikle kadın kıyafetlerinde uzman'
    },
    {
      name: 'Derya Girmeç',
      title: 'Kurucu Ortak & Terzi',
      description: '12 yıllık deneyime sahip, erkek kıyafetleri ve tadilat uzmanı'
    },
    {
      name: 'Dilek Girmeç',
      title: 'Kurucu Ortak & Terzi',
      description: '10 yıllık deneyime sahip, özel dikim ve detay işçiliği uzmanı'
    }
  ];

  const achievements = [
    { icon: Users, number: '2000+', label: 'Mutlu Müşteri' },
    { icon: Clock, number: '20', label: 'Yıllık Deneyim' },
    { icon: Award, number: '500+', label: 'Başarılı Proje' },
    { icon: Star, number: '4.9', label: 'Müşteri Puanı' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Müşteri Odaklılık',
      description: 'Her müşterimizin ihtiyaçlarını özenle dinler ve en iyi çözümü sunarız'
    },
    {
      icon: Award,
      title: 'Kalite Garantisi',
      description: 'Kullandığımız malzemelerden işçiliğe kadar her detayda kaliteyi ön planda tutarız'
    },
    {
      icon: Clock,
      title: 'Zamanında Teslimat',
      description: 'Verdiğimiz sürelere titizlikle uyar, müşterilerimizi asla bekletmeyiz'
    },
    {
      icon: Scissors,
      title: 'Profesyonel Hizmet',
      description: 'Yılların verdiği tecrübe ile profesyonel terzilik hizmeti sunuyoruz'
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
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Öz-İrem Tekstil, Ankara Sincan'da faaliyet gösteren, kadın ve erkeklere özel 
            profesyonel terzi hizmetleri sunan bir tekstil atölyesidir.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-8 mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Hikayemiz
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                Kurucularımız <strong>Özlem Altunay</strong>, <strong>Derya Girmeç</strong> ve <strong>Dilek Girmeç</strong>'in 
                yıllara dayanan deneyimi ile her bedene ve tarza uygun dikim, tadilat ve onarım 
                hizmetleri sunmaktayız. Kaliteli işçilik, müşteri memnuniyeti ve özenli ölçü 
                alma prensibiyle hareket ediyoruz.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Gömlek daraltmadan pantolon paçası kısaltmaya, elbise tadilatından özel dikime 
                kadar tüm ihtiyaçlarınıza çözüm sunuyoruz. "Sincan terzi", "kişiye özel dikim Ankara", 
                "pantolon tadilatı", "terzi bayan erkek", "kıyafet onarımı" gibi terzi ve moda 
                alanında en çok aranan anahtar kelimelere uygun, profesyonel ve hızlı hizmet sağlıyoruz.
              </p>
              <p className="text-lg leading-relaxed">
                Öz-İrem Tekstil olarak kaliteli kumaşlar, titiz işçilik ve müşteri memnuniyetini 
                bir araya getiriyoruz. Siz de tarzınızı bizimle şekillendirin.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Founders Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t('about.founders')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Scissors className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {founder.name}
                </h3>
                <p className="text-amber-600 font-medium mb-4">
                  {founder.title}
                </p>
                <p className="text-gray-600">
                  {founder.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Başarılarımız
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-4">
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-gray-300">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-lg flex-shrink-0">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Misyonumuz
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Müşterilerimize en kaliteli terzi hizmetlerini sunarak, onların stil ve 
                konfor ihtiyaçlarını karşılamak. Her kıyafette mükemmelliği hedefleyerek, 
                müşteri memnuniyetini en üst seviyede tutmak.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Vizyonumuz
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ankara'nın en güvenilir ve tercih edilen terzi atölyesi olmak. 
                Geleneksel terziliği modern tekniklerle birleştirerek, sektörde 
                örnek teşkil eden bir marka haline gelmek.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};