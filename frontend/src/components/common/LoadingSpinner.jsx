import { Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LoadingSpinner = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-agri-600 animate-spin" />
        <div className="absolute inset-0 w-12 h-12 bg-agri-200 rounded-full opacity-30 animate-ping" />
      </div>
      <p className="mt-4 text-lg font-medium text-agri-800">{t('analyzing')}</p>
      <p className="mt-2 text-sm text-agri-500">{t('analyzingSub')}</p>
    </div>
  );
};

export default LoadingSpinner;
