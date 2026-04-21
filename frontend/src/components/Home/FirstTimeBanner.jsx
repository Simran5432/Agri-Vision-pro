import { useState, useEffect } from 'react';
import { X, MonitorPlay } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FirstTimeBanner = ({ onWatchDemo }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenBanner = localStorage.getItem('has-seen-demo-banner');
    if (!hasSeenBanner) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('has-seen-demo-banner', 'true');
  };

  const handleWatch = () => {
    handleDismiss();
    onWatchDemo();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-agri-200 p-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-agri-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <MonitorPlay className="w-6 h-6 text-agri-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-agri-900">{t('newHere') || 'New here?'}</p>
          <p className="text-xs text-agri-600 mt-0.5">{t('watchHowItWorks') || 'Watch how it works'}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleWatch}
            className="px-4 py-2 bg-agri-600 text-white text-sm font-medium rounded-lg hover:bg-agri-700 transition-colors whitespace-nowrap"
          >
            {t('watchDemo')}
          </button>
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-agri-50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-agri-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeBanner;
