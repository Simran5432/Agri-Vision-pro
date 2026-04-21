import { Pill, Leaf, Beaker, CircleDot, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const fertilizerIcons = {
  urea: Beaker,
  dap: Pill,
  mop: CircleDot,
};

const fertilizerLabels = {
  urea: 'urea',
  dap: 'dap',
  mop: 'mop',
};

const fertilizerColors = {
  urea: 'bg-blue-50 border-blue-200 text-blue-700',
  dap: 'bg-earth-50 border-earth-200 text-earth-700',
  mop: 'bg-rose-50 border-rose-200 text-rose-700',
};

const fertilizerBarColors = {
  urea: 'bg-blue-500',
  dap: 'bg-earth-500',
  mop: 'bg-rose-500',
};

const FertilizerRecommendation = ({ fertilizerData }) => {
  const { t } = useLanguage();
  if (!fertilizerData || fertilizerData.length === 0) return null;

  const maxValues = {
    urea: Math.max(...fertilizerData.map((d) => d.urea)),
    dap: Math.max(...fertilizerData.map((d) => d.dap)),
    mop: Math.max(...fertilizerData.map((d) => d.mop)),
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-agri-100 p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-earth-100 rounded-xl flex items-center justify-center">
          <Leaf className="w-5 h-5 text-earth-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-agri-900">{t('fertilizerTitle')}</h2>
          <p className="text-sm text-agri-500">{t('fertilizerSub')}</p>
        </div>
      </div>

      <div className="space-y-5">
        {fertilizerData.map((item, index) => (
          <div
            key={index}
            className="border border-agri-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
          >
            <h3 className="text-base font-bold text-agri-900 mb-4">{item.crop}</h3>
            <div className="space-y-3">
              {['urea', 'dap', 'mop'].map((type) => {
                const Icon = fertilizerIcons[type];
                const value = item[type];
                const max = maxValues[type];
                const percentage = max > 0 ? (value / max) * 100 : 0;

                return (
                  <div key={type} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${fertilizerColors[type].split(' ')[0]}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-agri-800">
                          {t(fertilizerLabels[type])}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-agri-900">{value} kg</span>
                        <span className="text-xs text-agri-500 ml-1">/ha</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${fertilizerBarColors[type]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-agri-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-agri-500" />
              <span className="text-xs text-agri-600">
                {t('totalRequired')}: <span className="font-semibold text-agri-800">{item.urea + item.dap + item.mop} kg</span> {t('perHectare')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FertilizerRecommendation;
