import { Sprout, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-agri-900 text-agri-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-agri-400" />
            <span className="font-semibold">{t('appName')}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-agri-300">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span>{t('footerTag')}</span>
          </div>
          <p className="text-sm text-agri-400">
            &copy; {new Date().getFullYear()} {t('footerCopy')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
