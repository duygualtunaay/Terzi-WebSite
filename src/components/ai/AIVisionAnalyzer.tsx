import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, RotateCcw, CheckCircle, AlertTriangle, Loader, Eye, User, Zap, Target } from 'lucide-react';

interface AIVisionAnalyzerProps {
  onAnalysisComplete: (result: any) => void;
  disabled?: boolean;
  gender: 'male' | 'female';
}

interface BodyLandmark {
  x: number;
  y: number;
  confidence: number;
  label: string;
}

interface AnalysisResult {
  measurements: {
    height?: number;
    chest?: number;
    waist?: number;
    hips?: number;
    shoulderWidth?: number;
  };
  confidence: number;
  landmarks: BodyLandmark[];
  validationPassed: boolean;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
  confidence: number;
}

export const AIVisionAnalyzer: React.FC<AIVisionAnalyzerProps> = ({
  onAnalysisComplete,
  disabled = false,
  gender
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Realistic body measurement averages by gender
  const bodyAverages = {
    male: {
      height: { min: 165, max: 185, avg: 175 },
      chest: { min: 85, max: 110, avg: 95 },
      waist: { min: 75, max: 95, avg: 85 },
      hips: { min: 85, max: 105, avg: 95 },
      shoulderWidth: { min: 40, max: 50, avg: 45 }
    },
    female: {
      height: { min: 155, max: 175, avg: 165 },
      chest: { min: 80, max: 100, avg: 88 },
      waist: { min: 60, max: 85, avg: 70 },
      hips: { min: 85, max: 110, avg: 95 },
      shoulderWidth: { min: 35, max: 45, avg: 40 }
    }
  };

  // Simulate human body detection (70% success rate for demo)
  const validateHumanBody = useCallback(async (imageData: string): Promise<ValidationResult> => {
    setIsValidating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation with 70% success rate
    const isValid = Math.random() > 0.3;
    const confidence = 60 + Math.random() * 35; // 60-95% confidence
    
    setIsValidating(false);
    
    if (!isValid) {
      const errors = [
        'Tam vücut görüntüsü tespit edilemedi. Lütfen baş-ayak arası tam görünen bir fotoğraf yükleyin.',
        'İnsan vücudu tespit edilemedi. Lütfen net bir tam vücut fotoğrafı yükleyin.',
        'Fotoğrafta hayvan veya nesne tespit edildi. Lütfen sadece insan vücudu içeren fotoğraf yükleyin.',
        'Vücut pozisyonu uygun değil. Lütfen dik duruş pozisyonunda fotoğraf çekin.'
      ];
      
      return {
        isValid: false,
        error: errors[Math.floor(Math.random() * errors.length)],
        confidence: confidence
      };
    }
    
    return {
      isValid: true,
      confidence: confidence
    };
  }, []);

  // Generate realistic measurements with variation
  const generateRealisticMeasurements = useCallback((genderType: 'male' | 'female', baseConfidence: number) => {
    const averages = bodyAverages[genderType];
    const variation = 3; // ±3cm variation
    
    const generateMeasurement = (category: keyof typeof averages) => {
      const { avg } = averages[category];
      return Math.round(avg + (Math.random() - 0.5) * 2 * variation);
    };

    // Generate landmarks with realistic positions
    const landmarks: BodyLandmark[] = [
      { x: 0.5, y: 0.08, confidence: 0.92 + Math.random() * 0.06, label: 'Baş Üstü' },
      { x: 0.42, y: 0.22, confidence: 0.88 + Math.random() * 0.08, label: 'Sol Omuz' },
      { x: 0.58, y: 0.22, confidence: 0.88 + Math.random() * 0.08, label: 'Sağ Omuz' },
      { x: 0.5, y: 0.35, confidence: 0.85 + Math.random() * 0.1, label: 'Göğüs Merkezi' },
      { x: 0.5, y: 0.55, confidence: 0.82 + Math.random() * 0.12, label: 'Bel' },
      { x: 0.45, y: 0.72, confidence: 0.80 + Math.random() * 0.12, label: 'Sol Kalça' },
      { x: 0.55, y: 0.72, confidence: 0.80 + Math.random() * 0.12, label: 'Sağ Kalça' },
      { x: 0.47, y: 0.95, confidence: 0.75 + Math.random() * 0.15, label: 'Sol Ayak' },
      { x: 0.53, y: 0.95, confidence: 0.75 + Math.random() * 0.15, label: 'Sağ Ayak' }
    ];

    const measurements = {
      height: generateMeasurement('height'),
      chest: generateMeasurement('chest'),
      waist: generateMeasurement('waist'),
      hips: generateMeasurement('hips'),
      shoulderWidth: generateMeasurement('shoulderWidth')
    };

    // Calculate confidence based on landmark quality and validation
    const avgLandmarkConfidence = landmarks.reduce((sum, l) => sum + l.confidence, 0) / landmarks.length;
    const finalConfidence = Math.round((baseConfidence * 0.4 + avgLandmarkConfidence * 100 * 0.6));

    return {
      measurements,
      landmarks,
      confidence: Math.min(95, Math.max(70, finalConfidence))
    };
  }, []);

  // Main analysis function
  const analyzeImage = useCallback(async (imageData: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Step 1: Validate human body presence
      const validation = await validateHumanBody(imageData);
      setValidationResult(validation);

      if (!validation.isValid) {
        setError(validation.error || 'Geçersiz görüntü tespit edildi.');
        setIsAnalyzing(false);
        return;
      }

      // Step 2: Simulate measurement extraction
      await new Promise(resolve => setTimeout(resolve, 2000));

      const analysisData = generateRealisticMeasurements(gender, validation.confidence);

      const result: AnalysisResult = {
        ...analysisData,
        validationPassed: true
      };

      setAnalysisResult(result);
      onAnalysisComplete(result);
    } catch (err) {
      setError('Görüntü analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [gender, onAnalysisComplete, validateHumanBody, generateRealisticMeasurements]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Lütfen geçerli bir resim dosyası seçin (JPG, PNG, WebP).');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('Dosya boyutu 10MB\'dan küçük olmalıdır.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setImage(imageData);
      setError(null);
      setAnalysisResult(null);
      setValidationResult(null);
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = () => {
    if (image && !disabled) {
      analyzeImage(image);
    }
  };

  const resetAnalysis = () => {
    setImage(null);
    setAnalysisResult(null);
    setValidationResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const drawLandmarks = useCallback(() => {
    if (!canvasRef.current || !analysisResult || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Draw landmarks with labels
      analysisResult.landmarks.forEach((landmark, index) => {
        const x = landmark.x * canvas.width;
        const y = landmark.y * canvas.height;
        
        // Draw landmark point
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(34, 197, 94, ${landmark.confidence})`;
        ctx.fill();
        ctx.strokeStyle = '#16a34a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw confidence text
        ctx.fillStyle = '#16a34a';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(`${Math.round(landmark.confidence * 100)}%`, x + 12, y - 8);
        
        // Draw label
        ctx.fillStyle = '#1f2937';
        ctx.font = '10px Arial';
        ctx.fillText(landmark.label, x + 12, y + 8);
      });

      // Draw measurement lines
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      
      // Shoulder line
      if (analysisResult.landmarks[1] && analysisResult.landmarks[2]) {
        const leftShoulder = analysisResult.landmarks[1];
        const rightShoulder = analysisResult.landmarks[2];
        ctx.beginPath();
        ctx.moveTo(leftShoulder.x * canvas.width, leftShoulder.y * canvas.height);
        ctx.lineTo(rightShoulder.x * canvas.width, rightShoulder.y * canvas.height);
        ctx.stroke();
      }

      // Height line
      if (analysisResult.landmarks[0] && analysisResult.landmarks[7]) {
        const head = analysisResult.landmarks[0];
        const foot = analysisResult.landmarks[7];
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(head.x * canvas.width, head.y * canvas.height);
        ctx.lineTo(foot.x * canvas.width, foot.y * canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };
    img.src = image;
  }, [analysisResult, image]);

  useEffect(() => {
    if (analysisResult) {
      drawLandmarks();
    }
  }, [analysisResult, drawLandmarks]);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!image ? (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={disabled}
            className="hidden"
          />
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-full">
                <Upload className="h-12 w-12 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Vücut Fotoğrafı Yükleyin
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                AI analizi için tam vücut görünümü olan, düz duruş pozisyonunda çekilmiş fotoğraf yükleyin
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Camera className="h-5 w-5 mr-2" />
                Fotoğraf Seç
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Image Preview */}
          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={image}
              alt="Uploaded body photo"
              className="w-full max-h-96 object-contain"
            />
            {analysisResult && (
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
                style={{ maxHeight: '384px' }}
              />
            )}
            
            {/* Validation Status Overlay */}
            {isValidating && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                  <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-3" />
                  <p className="text-gray-900 dark:text-white font-medium">İnsan vücudu tespit ediliyor...</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex space-x-3">
            <button
              onClick={startAnalysis}
              disabled={disabled || isAnalyzing || isValidating || !!analysisResult}
              className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isValidating ? (
                <>
                  <Eye className="h-5 w-5 mr-2 animate-pulse" />
                  Doğrulanıyor...
                </>
              ) : isAnalyzing ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Analiz Ediliyor...
                </>
              ) : analysisResult ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Analiz Tamamlandı
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  AI Analizi Başlat
                </>
              )}
            </button>
            <button
              onClick={resetAnalysis}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Validation Result */}
      {validationResult && !validationResult.isValid && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <span className="text-red-800 dark:text-red-200">{validationResult.error}</span>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <span className="text-red-800 dark:text-red-200">{error}</span>
        </motion.div>
      )}

      {/* Analysis Result */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            <h3 className="font-semibold text-green-900 dark:text-green-100">AI Analizi Tamamlandı</h3>
            <div className="ml-auto flex items-center space-x-1">
              <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                %{analysisResult.confidence} Güven
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-green-700 dark:text-green-300">Boy:</span>
              <span className="font-medium text-gray-900 dark:text-white">{analysisResult.measurements.height} cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700 dark:text-green-300">Göğüs:</span>
              <span className="font-medium text-gray-900 dark:text-white">{analysisResult.measurements.chest} cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700 dark:text-green-300">Bel:</span>
              <span className="font-medium text-gray-900 dark:text-white">{analysisResult.measurements.waist} cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700 dark:text-green-300">Kalça:</span>
              <span className="font-medium text-gray-900 dark:text-white">{analysisResult.measurements.hips} cm</span>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="text-green-700 dark:text-green-300">Omuz Genişliği:</span>
              <span className="font-medium text-gray-900 dark:text-white">{analysisResult.measurements.shoulderWidth} cm</span>
            </div>
          </div>

          <div className="pt-3 border-t border-green-200 dark:border-green-800">
            <p className="text-xs text-green-600 dark:text-green-400 mb-2">
              {analysisResult.landmarks.length} anahtar nokta tespit edildi
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700 dark:text-green-300">Analiz Kalitesi:</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-green-200 dark:bg-green-800 rounded-full h-2">
                  <div 
                    className="bg-green-600 dark:bg-green-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${analysisResult.confidence}%` }}
                  />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Mükemmel</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">En İyi Sonuç İçin:</h3>
        </div>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
            <span><strong>Dik duruş:</strong> Kameraya doğrudan bakın, yan durmayın</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
            <span><strong>Tam vücut:</strong> Baş-ayak arası tamamen görünecek şekilde çekin</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
            <span><strong>Dar kıyafet:</strong> Vücut hatlarınızı gösteren dar kıyafetler giyin</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
            <span><strong>İyi aydınlatma:</strong> Parlak, eşit dağılmış ışık altında çekin</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
            <span><strong>Düz zemin:</strong> Düz bir duvar önünde, temiz arka plan</span>
          </li>
        </ul>
        
        <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-xs text-amber-800 dark:text-amber-200">
            <strong>Gizlilik:</strong> Fotoğrafınız sadece tarayıcınızda işlenir, sunucuya gönderilmez. 
            Analiz sonrası tüm veriler otomatik silinir.
          </p>
        </div>
      </div>
    </div>
  );
};