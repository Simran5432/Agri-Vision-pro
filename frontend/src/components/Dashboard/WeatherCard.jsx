import { CloudSun, Thermometer, Droplets, CloudRain, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import MetricCard from '../common/MetricCard';

const WeatherCard = ({ weatherData }) => {
  const { t } = useLanguage();
  if (!weatherData) return null;

  const metrics = [
    {
      title: t('temperature'),
      value: weatherData.temperature,
      unit: '°C',
      icon: Thermometer,
      color: 'amber',
    },
    {
      title: t('humidity'),
      value: weatherData.humidity,
      unit: '%',
      icon: Droplets,
      color: 'blue',
    },
    {
      title: t('rainfall'),
      value: weatherData.rainfall,
      unit: 'mm',
      icon: CloudRain,
      color: 'earth',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-agri-100 p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <CloudSun className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-agri-900">{t('weather')}</h2>
            <p className="text-sm text-agri-500">{t('weatherSub')}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-agri-600 bg-agri-50 px-3 py-1 rounded-full">
          <MapPin className="w-3.5 h-3.5" />
          {weatherData.location}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
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

      <div className="bg-agri-50 rounded-xl p-4 flex items-center gap-3">
        <CloudSun className="w-8 h-8 text-agri-600 flex-shrink-0" />
        <p className="text-sm text-agri-700">{weatherData.description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
