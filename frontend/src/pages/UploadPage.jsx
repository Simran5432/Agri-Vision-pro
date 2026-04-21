import { Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SoilUploadForm from '../components/Upload/SoilUploadForm';

const UploadPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-agri-50 to-white animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-agri-100 rounded-2xl mb-4">
            <Sprout className="w-8 h-8 text-agri-600" />
          </div>
          <h1 className="text-3xl font-bold text-agri-900">
            {t('analyzeLand')}
          </h1>
          <p className="mt-3 text-agri-600 max-w-lg mx-auto">
            {t('uploadDesc')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-agri-100 p-6 sm:p-8">
          <SoilUploadForm />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
