import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const StickyContacts: React.FC = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/905416235200?text=Merhaba, terzi hizmetleriniz hakkında bilgi almak istiyorum.', '_blank');
  };

  const handlePhone = () => {
    window.open('tel:+905416235200', '_self');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      <motion.button
        onClick={handleWhatsApp}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-xl transition-all duration-300 glow-emerald"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
      
      <motion.button
        onClick={handlePhone}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-xl transition-all duration-300 glow-blue"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Phone className="h-6 w-6" />
      </motion.button>
    </div>
  );
};