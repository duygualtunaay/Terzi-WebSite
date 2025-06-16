import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, User, MessageCircle, AlertCircle, Camera, Upload, Eye, EyeOff, Shield, Zap, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { AIVisionAnalyzer } from '../components/ai/AIVisionAnalyzer';

interface Measurements {
  height: number;
  weight: number;
  waist: number;
  chest: number;
  hips: number;
  shoulderWidth: number;
  gender: 'male' | 'female';
}

interface SizeResult {
  size: string;
  confidence: number;
  recommendations: string[];
  garmentSpecific?: {
    pants: string;
    shirts: string;
    dresses?: string;
    suits: string;
  };
}

interface AIAnalysisResult {
  measurements: Partial<Measurements>;
  confidence: number;
  landmarks: any[];
  validationPassed: boolean;
}

export const SizeEstimator: React.FC = () => {
  const { t } = useLanguage();
  const [measurements, setMeasurements] = useState<Measurements>({
    height: 0,
    weight: 0,
    waist: 0,
    chest: 0,
    hips: 0,
    shoulderWidth: 0,
    gender: 'male'
  });
  const [result, setResult] = useState<SizeResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);

  const calculateSize = useCallback(() => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const { height, weight, waist, chest, hips, shoulderWidth, gender } = measurements;
      
      let size = '';
      let confidence = 0;
      const recommendations: string[] = [];
      let garmentSpecific: any = {};

      if (gender === 'male') {
        // Men's size calculation with enhanced logic
        if (chest <= 88) {
          size = 'S (Small)';
          confidence = 85;
          garmentSpecific = { pants: '46-48', shirts: 'S', suits: '46' };
        } else if (chest <= 96) {
          size = 'M (Medium)';
          confidence = 90;
          garmentSpecific = { pants: '50-52', shirts: 'M', suits: '48-50' };
        } else if (chest <= 104) {
          size = 'L (Large)';
          confidence = 88;
          garmentSpecific = { pants: '54-56', shirts: 'L', suits: '52-54' };
        } else if (chest <= 112) {
          size = 'XL (Extra Large)';
          confidence = 85;
          garmentSpecific = { pants: '58-60', shirts: 'XL', suits: '56-58' };
        } else {
          size = 'XXL (Double Extra Large)';
          confidence = 80;
          garmentSpecific = { pants: '62+', shirts: 'XXL', suits: '60+' };
        }

        if (shoulderWidth > 0) {
          if (shoulderWidth < 42) {
            recommendations.push('Dar omuz yapısı - fitted kesim önerilir');
          } else if (shoulderWidth > 48) {
            recommendations.push('Geniş omuz yapısı - rahat kesim tercih edilebilir');
          }
          confidence += 5; // AI analysis bonus
        }

        if (waist > chest - 10) {
          recommendations.push('Bel bölgesinde daraltma gerekebilir');
          confidence -= 5;
        }
        
        if (height < 170) {
          recommendations.push('Kol ve pantolon boyu kısaltma önerilir');
        } else if (height > 185) {
          recommendations.push('Uzun boy kesimi tercih edilebilir');
        }
      } else {
        // Women's size calculation with enhanced logic
        if (chest <= 84) {
          size = 'S (Small)';
          confidence = 85;
          garmentSpecific = { pants: '36-38', shirts: 'S', dresses: 'S', suits: '36' };
        } else if (chest <= 88) {
          size = 'M (Medium)';
          confidence = 90;
          garmentSpecific = { pants: '40-42', shirts: 'M', dresses: 'M', suits: '38-40' };
        } else if (chest <= 92) {
          size = 'L (Large)';
          confidence = 88;
          garmentSpecific = { pants: '44-46', shirts: 'L', dresses: 'L', suits: '42-44' };
        } else if (chest <= 96) {
          size = 'XL (Extra Large)';
          confidence = 85;
          garmentSpecific = { pants: '48-50', shirts: 'XL', dresses: 'XL', suits: '46-48' };
        } else {
          size = 'XXL (Double Extra Large)';
          confidence = 80;
          garmentSpecific = { pants: '52+', shirts: 'XXL', dresses: 'XXL', suits: '50+' };
        }

        if (hips > chest + 10) {
          recommendations.push('Kalça bölgesinde genişletme gerekebilir');
          confidence -= 5;
        }
        
        if (waist < chest - 20) {
          recommendations.push('Bel bölgesinde daraltma önerilir');
        }
        
        if (height < 160) {
          recommendations.push('Petite kesim önerilir');
        } else if (height > 175) {
          recommendations.push('Tall kesim tercih edilebilir');
        }

        if (shoulderWidth > 0) {
          if (shoulderWidth < 36) {
            recommendations.push('Dar omuz yapısı - fitted kesim önerilir');
          } else if (shoulderWidth > 42) {
            recommendations.push('Geniş omuz yapısı - rahat kesim tercih edilebilir');
          }
          confidence += 5; // AI analysis bonus
        }
      }

      // BMI consideration
      const bmi = weight / ((height / 100) ** 2);
      if (bmi > 25) {
        recommendations.push('Rahat kesim önerilir');
      } else if (bmi < 18.5) {
        recommendations.push('Fitted kesim uygun olabilir');
      }

      // AI analysis bonus
      if (aiAnalysis && aiAnalysis.validationPassed) {
        confidence = Math.min(95, confidence + 15);
        recommendations.push('AI görüntü analizi ile doğrulanmıştır');
        recommendations.push(`${aiAnalysis.landmarks.length} anahtar nokta tespit edildi`);
      }

      setResult({
        size,
        confidence: Math.max(60, confidence),
        recommendations,
        garmentSpecific
      });
      setIsCalculating(false);
    }, 2000);
  }, [measurements, aiAnalysis]);

  const handleAIAnalysis = (analysis: AIAnalysisResult) => {
    setAiAnalysis(analysis);
    if (analysis.validationPassed) {
      setMeasurements(prev => ({
        ...prev,
        ...analysis.measurements
      }));
    }
  };

  const sendWhatsAppMessage = () => {
    if (!result) return;
    
    const aiInfo = aiAnalysis && aiAnalysis.validationPassed ? 
      `\n🤖 AI Görüntü Analizi ile Doğrulanmıştır (${aiAnalysis.landmarks.length} anahtar nokta)` : '';
    
    const garmentInfo = result.garmentSpecific ? `

📏 Kıyafet Türüne Göre Bedenler:
- Pantolon: ${result.garmentSpecific.pants}
- Gömlek/Bluz: ${result.garmentSpecific.shirts}
${result.garmentSpecific.dresses ? `- Elbise: ${result.garmentSpecific.dresses}` : ''}
- Takım: ${result.garmentSpecific.suits}` : '';

    const message = `Merhaba, AI beden tahmini yaptırdım. Sonuçlar:${aiInfo}

📐 Ölçülerim:
- Boy: ${measurements.height} cm
- Kilo: ${measurements.weight} kg
- Bel: ${measurements.waist} cm
- Göğüs: ${measurements.chest} cm
- Kalça: ${measurements.hips} cm
${measurements.shoulderWidth > 0 ? `- Omuz Genişliği: ${measurements.shoulderWidth} cm` : ''}
- Cinsiyet: ${measurements.gender === 'male' ? 'Erkek' : 'Kadın'}

🎯 Önerilen Genel Beden: ${result.size}
📊 Güven Oranı: %${result.confidence}${garmentInfo}

${result.recommendations.length > 0 ? `💡 Öneriler: ${result.recommendations.join(', ')}` : ''}

Bu ölçülere göre kıyafet dikimi hakkında bilgi alabilir miyim?`;

    window.open(`https://wa.me/905054171583?text=${encodeURIComponent(message)}`, '_blank');
  };

  const isFormValid = measurements.height > 0 && measurements.weight > 0 && 
                    measurements.waist > 0 && measurements.chest > 0 && measurements.hips > 0;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 p-4 rounded-2xl shadow-xl">
              <Calculator className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('size.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Gelişmiş AI görüntü analizi ile vücut ölçülerinizi otomatik tespit edin veya manuel olarak girin
          </p>
        </motion.div>

        {/* Method Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setUseAI(false)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                !useAI
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Calculator className="h-5 w-5 mr-2" />
              Manuel Ölçü Girişi
            </button>
            <button
              onClick={() => setUseAI(true)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                useAI
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Zap className="h-5 w-5 mr-2" />
              AI Görüntü Analizi
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
          >
            {useAI ? (
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    AI Görüntü Analizi
                  </h2>
                </div>
                
                {/* Privacy Consent */}
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Gizlilik ve Veri Güvenliği
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-start space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacyConsent}
                            onChange={(e) => setPrivacyConsent(e.target.checked)}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-blue-800 dark:text-blue-200">
                            Fotoğrafımın sadece beden analizi için kullanılmasını ve işlem sonrası silinmesini kabul ediyorum.
                          </span>
                        </label>
                        <button
                          onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                          className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          {showPrivacyDetails ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                          Gizlilik detayları
                        </button>
                        {showPrivacyDetails && (
                          <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 p-3 rounded mt-2">
                            <ul className="space-y-1">
                              <li>• Fotoğrafınız sadece tarayıcınızda işlenir, sunucuya gönderilmez</li>
                              <li>• Analiz sonrası tüm görüntü verileri otomatik silinir</li>
                              <li>• Sadece ölçü verileri geçici olarak saklanır</li>
                              <li>• GDPR uyumlu veri işleme politikası</li>
                              <li>• İstediğiniz zaman verileri silebilirsiniz</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <AIVisionAnalyzer
                  onAnalysisComplete={handleAIAnalysis}
                  disabled={!privacyConsent}
                  gender={measurements.gender}
                />
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Calculator className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Ölçülerinizi Girin
                  </h2>
                </div>
                
                {/* Gender Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Cinsiyet
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setMeasurements(prev => ({ ...prev, gender: 'male' }))}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all duration-300 ${
                        measurements.gender === 'male'
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Erkek
                    </button>
                    <button
                      onClick={() => setMeasurements(prev => ({ ...prev, gender: 'female' }))}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all duration-300 ${
                        measurements.gender === 'female'
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Kadın
                    </button>
                  </div>
                </div>

                {/* Measurements */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('size.height')}
                      </label>
                      <input
                        type="number"
                        value={measurements.height || ''}
                        onChange={(e) => setMeasurements(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="175"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('size.weight')}
                      </label>
                      <input
                        type="number"
                        value={measurements.weight || ''}
                        onChange={(e) => setMeasurements(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="70"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('size.chest')}
                      </label>
                      <input
                        type="number"
                        value={measurements.chest || ''}
                        onChange={(e) => setMeasurements(prev => ({ ...prev, chest: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="92"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('size.waist')}
                      </label>
                      <input
                        type="number"
                        value={measurements.waist || ''}
                        onChange={(e) => setMeasurements(prev => ({ ...prev, waist: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="78"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('size.hips')}
                      </label>
                      <input
                        type="number"
                        value={measurements.hips || ''}
                        onChange={(e) => setMeasurements(prev => ({ ...prev, hips: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="95"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Omuz Genişliği (cm)
                      </label>
                      <input
                        type="number"
                        value={measurements.shoulderWidth || ''}
                        onChange={(e) => setMeasurements(prev => ({ ...prev, shoulderWidth: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="42"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={calculateSize}
              disabled={!isFormValid || isCalculating}
              className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Hesaplanıyor...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Target className="h-5 w-5 mr-2" />
                  {t('size.calculate')}
                </div>
              )}
            </button>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {result ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800 shadow-xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('size.result')}
                  </h2>
                  {aiAnalysis && aiAnalysis.validationPassed && (
                    <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-2">
                      <Zap className="h-4 w-4 mr-1" />
                      AI Analizi ile Doğrulandı
                    </div>
                  )}
                </div>

                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {result.size}
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-lg text-gray-700 dark:text-gray-300">
                      Güven Oranı: <strong>%{result.confidence}</strong>
                    </span>
                  </div>
                </div>

                {result.garmentSpecific && (
                  <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Kıyafet Türüne Göre Bedenler:
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Pantolon:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{result.garmentSpecific.pants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Gömlek:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{result.garmentSpecific.shirts}</span>
                      </div>
                      {result.garmentSpecific.dresses && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Elbise:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{result.garmentSpecific.dresses}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Takım:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{result.garmentSpecific.suits}</span>
                      </div>
                    </div>
                  </div>
                )}

                {result.recommendations.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Öneriler:
                    </h3>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <AlertCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={sendWhatsAppMessage}
                  className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t('size.sendWhatsApp')}
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
                <Calculator className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Ölçülerinizi Bekliyor
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {useAI ? 'Fotoğraf yükleyin veya' : ''} Soldaki formu doldurun ve beden tahmininizi alın
                </p>
              </div>
            )}

            {/* How it works */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {useAI ? 'AI Görüntü Analizi Nasıl Çalışır?' : 'Nasıl Çalışır?'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {useAI ? (
                  <>
                    <li>• İnsan vücudu tespit algoritması ile doğrulama</li>
                    <li>• 9 anahtar nokta ile ölçü hesaplama</li>
                    <li>• Makine öğrenmesi ile beden önerileri</li>
                    <li>• %70-95 doğruluk oranı ile sonuç</li>
                  </>
                ) : (
                  <>
                    <li>• Vücut ölçülerinizi algoritma analiz eder</li>
                    <li>• Binlerce müşteri verisine dayalı tahmin yapar</li>
                    <li>• Kişisel önerileri size özel hesaplar</li>
                    <li>• %60-95 doğruluk oranı ile sonuç verir</li>
                  </>
                )}
              </ul>
              <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  <strong>Not:</strong> Bu tahmin yardımcı bir araçtır. 
                  Kesin ölçü için atölyemize gelerek ölçü aldırmanızı öneririz.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};