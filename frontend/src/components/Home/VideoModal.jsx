import { useState, useEffect } from 'react';
import { X, MonitorPlay, Upload, BarChart3, Sprout, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import DemoPlayer from './DemoPlayer';

const demoSteps = [
  {
    icon: Upload,
    title: 'Step 1: Upload Soil Data',
    description: 'Enter your farm location, land area, and upload your Soil Health Card image or manually input NPK values.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Sprout,
    title: 'Step 2: AI Analysis',
    description: 'Our AI engine analyzes your soil composition, weather data, and local conditions in seconds.',
    color: 'bg-agri-50 text-agri-600',
  },
  {
    icon: BarChart3,
    title: 'Step 3: Get Recommendations',
    description: 'View top 3 crop recommendations with confidence scores, expected profits, and precise fertilizer quantities.',
    color: 'bg-amber-50 text-amber-600',
  },
];

const VideoModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('video');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, demoSteps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-agri-100">
          <div className="flex items-center gap-3">
            <MonitorPlay className="w-6 h-6 text-agri-600" />
            <h2 className="text-xl font-bold text-agri-900">{t('watchDemo') || 'Watch Demo'}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-agri-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-agri-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-agri-100">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'video'
                ? 'text-agri-700 border-b-2 border-agri-600 bg-agri-50/50'
                : 'text-agri-500 hover:text-agri-700 hover:bg-agri-50/30'
            }`}
          >
            {t('demoVideo') || 'Demo Video'}
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'guide'
                ? 'text-agri-700 border-b-2 border-agri-600 bg-agri-50/50'
                : 'text-agri-500 hover:text-agri-700 hover:bg-agri-50/30'
            }`}
          >
            {t('stepByStep') || 'Step-by-Step Guide'}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {activeTab === 'video' ? (
            <div className="p-6 h-full flex flex-col">
              <DemoPlayer />
            </div>
          ) : (
            <div className="p-6">
              {/* Step by step guide */}
              <div className="space-y-6">
                {demoSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-4 p-4 rounded-xl border transition-all ${
                      currentStep === idx
                        ? 'border-agri-300 bg-agri-50 shadow-sm'
                        : 'border-agri-100 bg-white'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-agri-500 uppercase tracking-wide">
                          Step {idx + 1}
                        </span>
                        {currentStep === idx && (
                          <span className="px-2 py-0.5 bg-agri-100 text-agri-700 text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-agri-900 mt-1">{step.title}</h3>
                      <p className="text-sm text-agri-600 mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-agri-700 hover:bg-agri-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {demoSteps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentStep === idx ? 'bg-agri-600 w-6' : 'bg-agri-200 hover:bg-agri-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextStep}
                  disabled={currentStep === demoSteps.length - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-agri-700 hover:bg-agri-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
