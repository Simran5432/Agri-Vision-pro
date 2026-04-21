import { useState } from 'react';
import { Wheat, TrendingUp, Award, Medal, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import CropDetailsModal from './CropDetailsModal';

const rankConfig = {
  1: {
    icon: Award,
    bg: 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    iconColor: 'text-amber-500',
    medal: '🥇',
  },
  2: {
    icon: Medal,
    bg: 'bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200',
    badge: 'bg-slate-100 text-slate-800',
    iconColor: 'text-slate-500',
    medal: '🥈',
  },
  3: {
    icon: Medal,
    bg: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200',
    badge: 'bg-orange-100 text-orange-800',
    iconColor: 'text-orange-500',
    medal: '🥉',
  },
};

const CropRecommendation = ({ crops }) => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState(null);

  if (!crops || crops.length === 0) return null;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-agri-100 p-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-agri-100 rounded-xl flex items-center justify-center">
            <Wheat className="w-5 h-5 text-agri-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-agri-900">{t('topCrops')}</h2>
            <p className="text-sm text-agri-500">{t('topCropsSub')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {crops.map((crop, index) => {
            const rank = crop.rank || index + 1;
            const config = rankConfig[rank] || rankConfig[3];
            const RankIcon = config.icon;

            return (
              <div
                key={index}
                className={`relative rounded-xl border p-5 hover:shadow-md transition-shadow ${config.bg}`}
              >
                <div className="absolute top-3 right-3 text-2xl">{config.medal}</div>

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm`}>
                    <RankIcon className={`w-6 h-6 ${config.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-agri-900">{crop.name}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${config.badge}`}>
                      {t('rank')} #{rank}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-agri-600">{t('confidence')}</span>
                      <span className="font-semibold text-agri-800">{crop.confidence}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2.5 border border-gray-100">
                      <div
                        className="bg-agri-500 h-2.5 rounded-full transition-all duration-1000"
                        style={{ width: `${crop.confidence}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-black/5">
                    <TrendingUp className="w-4 h-4 text-agri-600" />
                    <span className="text-sm text-agri-600">{t('expectedProfit')}:</span>
                    <span className="text-lg font-bold text-agri-800">
                      ₹{crop.expected_profit.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedCrop(crop)}
                    className="w-full flex items-center justify-center gap-1 py-2 mt-2 bg-white/70 hover:bg-white rounded-lg text-sm font-medium text-agri-700 hover:text-agri-900 transition-colors border border-black/5"
                  >
                    {t('viewDetails')}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCrop && (
        <CropDetailsModal crop={selectedCrop} onClose={() => setSelectedCrop(null)} />
      )}
    </>
  );
};

export default CropRecommendation;
