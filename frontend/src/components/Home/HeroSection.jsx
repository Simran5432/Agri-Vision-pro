import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, TrendingUp, CloudSun, MonitorPlay } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const HeroSection = ({ onWatchDemo }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden min-h-[600px] flex items-center">
      {/* Farm background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-agri-900/90 via-agri-800/85 to-agri-900/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-agri-100 text-sm font-medium mb-8">
            <Leaf className="w-4 h-4" />
            <span>{t('heroBadge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {t('heroTitle')}
            <span className="block text-agri-300">{t('heroTitleHighlight')}</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-agri-100 leading-relaxed max-w-2xl mx-auto">
            {t('heroDesc')}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/upload"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-agri-800 font-semibold rounded-xl hover:bg-agri-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('getStarted')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={onWatchDemo}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-agri-700/50 text-white font-semibold rounded-xl hover:bg-agri-700/70 transition-all duration-200 border border-agri-500/30"
            >
              <MonitorPlay className="w-5 h-5" />
              {t('watchDemo')}
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <CloudSun className="w-8 h-8 text-agri-300 mx-auto mb-2" />
              <p className="text-white font-semibold">{t('weatherAnalysis')}</p>
              <p className="text-agri-200 text-sm">{t('weatherAnalysisSub')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Leaf className="w-8 h-8 text-agri-300 mx-auto mb-2" />
              <p className="text-white font-semibold">{t('soilHealth')}</p>
              <p className="text-agri-200 text-sm">{t('soilHealthSub')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <TrendingUp className="w-8 h-8 text-agri-300 mx-auto mb-2" />
              <p className="text-white font-semibold">{t('profitEst')}</p>
              <p className="text-agri-200 text-sm">{t('profitEstSub')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
