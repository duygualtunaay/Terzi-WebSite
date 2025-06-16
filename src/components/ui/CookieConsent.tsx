import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl p-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-lg">
                <Cookie className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Çerez Bildirimi:</strong> Web sitemizde deneyiminizi geliştirmek için çerezler kullanıyoruz. 
                  GDPR uyumlu veri işleme politikamızı kabul ediyor musunuz?
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={rejectCookies}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Reddet
              </button>
              <button
                onClick={acceptCookies}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Kabul Et
              </button>
              <button
                onClick={rejectCookies}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};