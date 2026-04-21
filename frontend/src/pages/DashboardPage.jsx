import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import SoilAnalysisCard from '../components/Dashboard/SoilAnalysisCard';
import WeatherCard from '../components/Dashboard/WeatherCard';
import CropRecommendation from '../components/Dashboard/CropRecommendation';
import FertilizerRecommendation from '../components/Dashboard/FertilizerRecommendation';
import ProfitChart from '../components/Dashboard/ProfitChart';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { soilData, weatherData, crops, fertilizerData, landArea } = useApp();

  useEffect(() => {
    if (!soilData) {
      navigate('/upload');
    }
  }, [soilData, navigate]);

  if (!soilData) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <Sprout className="w-12 h-12 text-agri-400 mx-auto mb-4 animate-bounce" />
          <p className="text-agri-600">Redirecting to analysis page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-agri-50 to-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/upload')}
            className="p-2 bg-white rounded-xl border border-agri-200 hover:border-agri-400 hover:shadow-sm transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-agri-700" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-agri-900">{t('analysisResults')}</h1>
            <p className="text-sm text-agri-500 mt-1">
              {t('landAreaLabel')}: <span className="font-semibold text-agri-700">{landArea} hectares</span>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <SoilAnalysisCard soilData={soilData} />
          <WeatherCard weatherData={weatherData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <CropRecommendation crops={crops} />
            </div>
            <ProfitChart crops={crops} />
            <FertilizerRecommendation fertilizerData={fertilizerData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
