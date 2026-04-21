import { X, Calendar, Droplets, Banknote, Sprout, Clock, Wheat, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const cropDetailsData = {
  Rice: {
    growingSeason: 'Kharif (June - November)',
    waterRequirement: 'High - 1500-2500 mm',
    marketPrice: '₹2,040 - ₹2,500 per quintal',
    bestSoil: 'Clayey, loamy soil with good water retention',
    duration: '120-150 days',
    expectedYield: '25-40 quintals per hectare',
    description: 'Rice is a staple crop that thrives in warm and humid climates. It requires consistent water supply and fertile soil for optimal growth.',
  },
  Wheat: {
    growingSeason: 'Rabi (November - April)',
    waterRequirement: 'Moderate - 450-650 mm',
    marketPrice: '₹2,125 - ₹2,500 per quintal',
    bestSoil: 'Well-drained loamy soil',
    duration: '100-140 days',
    expectedYield: '35-50 quintals per hectare',
    description: 'Wheat is a cool-season crop that requires moderate temperatures. It is one of the most important cereal crops globally.',
  },
  Sugarcane: {
    growingSeason: 'Year-round planting (Spring/Autumn)',
    waterRequirement: 'Very High - 1500-2500 mm',
    marketPrice: '₹3,150 - ₹3,500 per quintal',
    bestSoil: 'Deep, well-drained loamy soil',
    duration: '10-12 months',
    expectedYield: '600-1000 quintals per hectare',
    description: 'Sugarcane is a long-duration cash crop with high water requirements. It provides excellent returns but needs careful management.',
  },
};

const CropDetailsModal = ({ crop, onClose }) => {
  const { t } = useLanguage();
  if (!crop) return null;

  const details = cropDetailsData[crop.name] || {
    growingSeason: 'Varies by region',
    waterRequirement: 'Moderate',
    marketPrice: 'Market dependent',
    bestSoil: 'Well-drained fertile soil',
    duration: '90-150 days',
    expectedYield: '20-40 quintals per hectare',
    description: `${crop.name} is a valuable crop suitable for your soil and climate conditions.`,
  };

  const infoItems = [
    { icon: Calendar, label: t('growingSeason'), value: details.growingSeason },
    { icon: Droplets, label: t('waterRequirement'), value: details.waterRequirement },
    { icon: Banknote, label: t('marketPrice'), value: details.marketPrice },
    { icon: Sprout, label: t('bestSoil'), value: details.bestSoil },
    { icon: Clock, label: t('cropDuration'), value: details.duration },
    { icon: Wheat, label: t('expectedYield'), value: details.expectedYield },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-600 to-agri-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Wheat className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{crop.name}</h2>
                <p className="text-sm text-agri-100 opacity-90">{t('cropDetails')}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profit highlight */}
          <div className="bg-agri-50 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-agri-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-agri-600" />
            </div>
            <div>
              <p className="text-sm text-agri-600">{t('expectedProfit')}</p>
              <p className="text-2xl font-bold text-agri-800">
                ₹{crop.expected_profit.toLocaleString()}
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm text-agri-600">{t('confidence')}</p>
              <p className="text-xl font-bold text-agri-700">{crop.confidence}%</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-agri-700 leading-relaxed">{details.description}</p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infoItems.map((item, index) => (
              <div key={index} className="bg-agri-50/50 rounded-xl p-4 border border-agri-100">
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="w-4 h-4 text-agri-500" />
                  <p className="text-xs font-medium text-agri-500 uppercase tracking-wide">
                    {item.label}
                  </p>
                </div>
                <p className="text-sm font-semibold text-agri-900">{item.value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-agri-600 text-white font-semibold rounded-xl hover:bg-agri-700 transition-colors"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropDetailsModal;
