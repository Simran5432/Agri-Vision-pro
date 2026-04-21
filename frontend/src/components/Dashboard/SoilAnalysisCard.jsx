import { FlaskConical, Atom, Droplets, Leaf, Gauge } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import MetricCard from '../common/MetricCard';

const SoilAnalysisCard = ({ soilData }) => {
  const { t } = useLanguage();
  if (!soilData) return null;

  const metrics = [
    {
      title: t('nitrogen'),
      value: soilData.nitrogen,
      unit: 'kg/ha',
      icon: Atom,
      color: 'blue',
    },
    {
      title: t('phosphorus'),
      value: soilData.phosphorus,
      unit: 'kg/ha',
      icon: FlaskConical,
      color: 'earth',
    },
    {
      title: t('potassium'),
      value: soilData.potassium,
      unit: 'kg/ha',
      icon: Leaf,
      color: 'agri',
    },
    {
      title: t('phLevel'),
      value: soilData.ph,
      unit: '',
      icon: Gauge,
      color: 'amber',
    },
    {
      title: t('organicMatter'),
      value: soilData.organic_matter,
      unit: '%',
      icon: Droplets,
      color: 'rose',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-agri-100 p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-earth-100 rounded-xl flex items-center justify-center">
          <FlaskConical className="w-5 h-5 text-earth-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-agri-900">{t('soilAnalysis')}</h2>
          <p className="text-sm text-agri-500">{t('soilAnalysisSub')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>
    </div>
  );
};

export default SoilAnalysisCard;
