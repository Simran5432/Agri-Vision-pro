import { Upload, BarChart3, FlaskConical, Wheat } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Upload,
      title: t('featureEasyInput'),
      description: t('featureEasyInputDesc'),
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: FlaskConical,
      title: t('featureSoil'),
      description: t('featureSoilDesc'),
      color: 'bg-earth-50 text-earth-600',
    },
    {
      icon: Wheat,
      title: t('featureCrop'),
      description: t('featureCropDesc'),
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: BarChart3,
      title: t('featureFertilizer'),
      description: t('featureFertilizerDesc'),
      color: 'bg-agri-50 text-agri-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-agri-900">
            {t('howItWorks')}
          </h2>
          <p className="mt-4 text-lg text-agri-600 max-w-2xl mx-auto">
            {t('howItWorksDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-agri-50/50 border border-agri-100 hover:border-agri-300 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-agri-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-agri-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-agri-700">95%</span>
            <span className="text-sm text-agri-500 mt-1">{t('statAccuracy')}</span>
          </div>
          <div className="hidden sm:block w-px h-12 bg-agri-200" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-agri-700">50+</span>
            <span className="text-sm text-agri-500 mt-1">{t('statVarieties')}</span>
          </div>
          <div className="hidden sm:block w-px h-12 bg-agri-200" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-agri-700">24/7</span>
            <span className="text-sm text-agri-500 mt-1">{t('statUpdates')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
