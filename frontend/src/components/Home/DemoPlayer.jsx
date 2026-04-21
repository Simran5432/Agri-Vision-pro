import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play, Pause, RotateCcw, SkipForward, SkipBack,
  Sprout, Upload, MapPin, Ruler, Search, ChevronDown,
  Loader2, CheckCircle2, FlaskConical, CloudSun,
  Wheat, TrendingUp, Award, Beaker, Pill, CircleDot,
  Globe, ArrowRight, X, ChevronRight, Info
} from 'lucide-react';

const demoScenes = [
  { id: 'home', duration: 3500, caption: 'Welcome to Agri Vision Pro — AI-Powered Agriculture Insights' },
  { id: 'language', duration: 3000, caption: 'Switch between English, Hindi, or Punjabi instantly' },
  { id: 'upload-form', duration: 4500, caption: 'Enter your farm location and land area in acres' },
  { id: 'upload-image', duration: 3000, caption: 'Upload your Soil Health Card with drag & drop' },
  { id: 'analyzing', duration: 3500, caption: 'AI analyzes soil nutrients, weather, and local conditions' },
  { id: 'dashboard-soil', duration: 3500, caption: 'View detailed soil analysis and real-time weather data' },
  { id: 'dashboard-crops', duration: 3500, caption: 'Get Top 3 crop recommendations with profit estimates' },
  { id: 'crop-details', duration: 4000, caption: 'Tap View More Details for yield, market price & growing season' },
  { id: 'fertilizer', duration: 3500, caption: 'See precise Urea, DAP, and MOP quantities with visual bars' },
  { id: 'chart', duration: 3000, caption: 'Compare expected profits across all recommended crops' },
  { id: 'outro', duration: 3000, caption: 'Start making data-driven farming decisions today' },
];

const totalDuration = demoScenes.reduce((sum, s) => sum + s.duration, 0);

/* ============ TYPEWRITER ============ */

const TypewriterText = ({ text, progress, speed = 0.5 }) => {
  const chars = Math.floor(text.length * Math.min(progress / speed, 1));
  const showCursor = progress < speed;
  return (
    <span>
      {text.slice(0, chars)}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
};

/* ============ MOCK NAVBAR ============ */

const MockNavbar = ({ showLang, langOpen, activeLang }) => (
  <div className="flex items-center justify-between px-3 py-2 bg-white/90 border-b border-agri-100 rounded-t-lg">
    <div className="flex items-center gap-1.5">
      <div className="w-6 h-6 bg-agri-600 rounded-md flex items-center justify-center">
        <Sprout className="w-3.5 h-3.5 text-white" />
      </div>
      <span className="text-[10px] font-bold text-agri-900">Agri Vision</span>
    </div>
    <div className="flex items-center gap-1.5">
      <div className="w-10 h-4 bg-agri-100 rounded" />
      <div className="w-10 h-4 bg-agri-100 rounded" />
      <div className="w-10 h-4 bg-agri-100 rounded" />
      <div className={`relative flex items-center gap-1 px-1.5 py-1 rounded ${showLang ? 'bg-agri-100' : ''}`}>
        <Globe className="w-3 h-3 text-agri-600" />
        <span className="text-[9px] text-agri-700 font-medium">{activeLang}</span>
        <ChevronDown className={`w-2.5 h-2.5 text-agri-500 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
        {langOpen && (
          <div className="absolute top-full right-0 mt-1 w-20 bg-white rounded-lg shadow-lg border border-agri-100 py-1 z-10">
            {['English', 'हिन्दी', 'ਪੰਜਾਬੀ'].map((l) => (
              <div key={l} className={`px-2 py-1 text-[9px] ${l === activeLang ? 'bg-agri-50 font-semibold text-agri-800' : 'text-agri-600'}`}>
                {l}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-8 h-5 bg-agri-600 rounded text-[8px] text-white flex items-center justify-center">Login</div>
    </div>
  </div>
);

/* ============ SCENE COMPONENTS ============ */

const SceneHome = ({ progress }) => (
  <div className="h-full flex flex-col items-center justify-center text-center p-5 bg-gradient-to-br from-agri-800/95 to-agri-900/95 rounded-lg relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
    <div className="relative z-10">
      <div className={`w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-3 mx-auto transition-all duration-700 ${progress > 0.2 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <Sprout className="w-8 h-8 text-agri-300" />
      </div>
      <h2 className={`text-xl font-bold text-white mb-1 transition-all duration-700 ${progress > 0.3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        Agri Vision Pro
      </h2>
      <p className={`text-agri-200 text-xs mb-4 transition-all duration-700 delay-100 ${progress > 0.4 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        AI-Powered Agriculture Insights
      </p>
      <div className={`flex gap-2 justify-center transition-all duration-700 delay-200 ${progress > 0.5 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="px-4 py-2 bg-white rounded-lg text-xs font-bold text-agri-800 flex items-center gap-1">
          Get Started <ArrowRight className="w-3 h-3" />
        </div>
        <div className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold text-white border border-white/20 flex items-center gap-1">
          <Play className="w-3 h-3 fill-white" /> Watch Demo
        </div>
      </div>
    </div>
  </div>
);

const SceneLanguage = ({ progress }) => (
  <div className="h-full bg-gradient-to-b from-agri-50 to-white rounded-lg p-3 flex flex-col">
    <MockNavbar showLang={true} langOpen={progress > 0.3 && progress < 0.7} activeLang={progress > 0.7 ? 'हिन्दी' : 'English'} />
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className={`text-center transition-all duration-500 ${progress > 0.1 ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-sm font-bold text-agri-900 mb-3">
          {progress > 0.7 ? 'एग्री विजन प्रो' : 'Agri Vision Pro'}
        </p>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-agri-100 rounded-full text-xs text-agri-700 transition-all duration-500 ${progress > 0.8 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <Globe className="w-3 h-3" />
          {progress > 0.7 ? 'भाषा बदल गई!' : 'Language changed!'}
        </div>
      </div>
      <div className={`mt-6 grid grid-cols-3 gap-3 w-full max-w-xs transition-all duration-700 ${progress > 0.5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {[
          { icon: CloudSun, label: progress > 0.7 ? 'मौसम' : 'Weather', sub: progress > 0.7 ? 'वास्तविक समय' : 'Real-time' },
          { icon: Sprout, label: progress > 0.7 ? 'मिट्टी' : 'Soil', sub: progress > 0.7 ? 'NPK और pH' : 'NPK & pH' },
          { icon: TrendingUp, label: progress > 0.7 ? 'लाभ' : 'Profit', sub: progress > 0.7 ? 'राजस्व' : 'Revenue' },
        ].map((item, i) => (
          <div key={i} className="bg-white/80 backdrop-blur rounded-lg p-2 text-center border border-agri-100">
            <item.icon className="w-5 h-5 text-agri-500 mx-auto mb-1" />
            <p className="text-[10px] font-bold text-agri-800">{item.label}</p>
            <p className="text-[8px] text-agri-500">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SceneUploadForm = ({ progress }) => (
  <div className="h-full bg-gradient-to-b from-agri-50 to-white rounded-lg p-3 flex flex-col">
    <MockNavbar showLang={false} langOpen={false} activeLang="English" />
    <div className="flex-1 flex flex-col items-center justify-center p-2">
      <div className={`w-full max-w-[220px] transition-all duration-500 ${progress > 0.1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="w-8 h-8 bg-agri-100 rounded-xl flex items-center justify-center mx-auto mb-2">
          <Sprout className="w-4 h-4 text-agri-600" />
        </div>
        <p className="text-center text-xs font-bold text-agri-900 mb-2">Analyze Your Land</p>
        <div className="space-y-2">
          <div className={`px-2.5 py-1.5 bg-white border border-agri-200 rounded-lg transition-all duration-300 ${progress > 0.2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-agri-400" />
              <span className="text-[10px] text-agri-400">Location</span>
            </div>
            <p className="text-[11px] text-agri-800 font-medium mt-0.5">
              <TypewriterText text="Hyderabad, Punjab" progress={progress} speed={0.35} />
            </p>
          </div>
          <div className={`px-2.5 py-1.5 bg-white border border-agri-200 rounded-lg transition-all duration-300 ${progress > 0.5 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-1.5">
              <Ruler className="w-3 h-3 text-agri-400" />
              <span className="text-[10px] text-agri-400">Land Area (acres)</span>
            </div>
            <p className="text-[11px] text-agri-800 font-medium mt-0.5">
              <TypewriterText text="6.2 acres" progress={Math.max(0, progress - 0.3)} speed={0.3} />
            </p>
          </div>
        </div>
        <div className={`mt-2 border-2 border-dashed border-agri-300 rounded-xl p-3 bg-agri-50/50 flex flex-col items-center transition-all duration-500 ${progress > 0.7 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <Upload className="w-5 h-5 text-agri-400 mb-1" />
          <p className="text-[9px] text-agri-500">Soil Health Card</p>
          <div className={`mt-1 flex items-center gap-1 px-2 py-0.5 bg-agri-100 rounded-full transition-all duration-300 ${progress > 0.85 ? 'opacity-100' : 'opacity-0'}`}>
            <CheckCircle2 className="w-2.5 h-2.5 text-agri-600" />
            <span className="text-[8px] text-agri-700 font-medium">Uploaded</span>
          </div>
        </div>
        <div className={`mt-2 transition-all duration-500 ${progress > 0.9 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="w-full py-2 bg-agri-600 text-white text-[10px] font-bold rounded-xl text-center flex items-center justify-center gap-1">
            <Search className="w-3 h-3" />
            Analyze Land
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SceneUploadImage = ({ progress }) => (
  <div className="h-full bg-gradient-to-b from-agri-50 to-white rounded-lg p-3 flex flex-col">
    <MockNavbar showLang={false} langOpen={false} activeLang="English" />
    <div className="flex-1 flex flex-col items-center justify-center p-2">
      <div className={`w-full max-w-[220px] transition-all duration-500 ${progress > 0.1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`border-2 border-dashed rounded-xl p-4 bg-white text-center relative overflow-hidden transition-all duration-500 ${progress > 0.3 ? 'border-agri-500 bg-agri-50' : 'border-agri-200'}`}>
          <div className={`absolute inset-0 bg-agri-100/50 flex items-center justify-center transition-opacity duration-300 ${progress > 0.4 && progress < 0.7 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center">
              <Upload className="w-6 h-6 text-agri-600 animate-bounce" />
              <p className="text-[9px] text-agri-600 font-medium mt-1">Dropping...</p>
            </div>
          </div>
          <Upload className={`w-6 h-6 text-agri-400 mx-auto mb-1 transition-all duration-300 ${progress > 0.4 ? 'opacity-0' : 'opacity-100'}`} />
          <p className={`text-[10px] text-agri-500 transition-all duration-300 ${progress > 0.4 ? 'opacity-0' : 'opacity-100'}`}>Drag & drop or click</p>
        </div>
        <div className={`mt-2 bg-white border border-agri-200 rounded-xl p-2 flex items-center gap-2 transition-all duration-500 ${progress > 0.7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="w-10 h-10 bg-agri-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sprout className="w-5 h-5 text-agri-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium text-agri-800 truncate">soil_health_card.jpg</p>
            <p className="text-[8px] text-agri-500">1.2 MB</p>
          </div>
          <CheckCircle2 className="w-4 h-4 text-agri-500 flex-shrink-0" />
        </div>
        <div className={`mt-2 flex items-center gap-1.5 p-2 bg-blue-50 border border-blue-200 rounded-lg transition-all duration-500 ${progress > 0.85 ? 'opacity-100' : 'opacity-0'}`}>
          <Info className="w-3 h-3 text-blue-500" />
          <p className="text-[9px] text-blue-700">Image uploaded successfully</p>
        </div>
      </div>
    </div>
  </div>
);

const SceneAnalyzing = ({ progress }) => (
  <div className="h-full bg-gradient-to-b from-agri-50 to-white rounded-lg p-3 flex flex-col">
    <MockNavbar showLang={false} langOpen={false} activeLang="English" />
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="relative">
        <Loader2 className="w-10 h-10 text-agri-600 animate-spin" />
        <div className="absolute inset-0 w-10 h-10 bg-agri-200 rounded-full opacity-30 animate-ping" />
      </div>
      <p className="mt-3 text-xs font-bold text-agri-800">Analyzing your land...</p>
      <div className="mt-2 w-40 h-1.5 bg-agri-100 rounded-full overflow-hidden">
        <div className="h-full bg-agri-500 rounded-full transition-all duration-300" style={{ width: `${Math.min(progress * 120, 100)}%` }} />
      </div>
      <div className="mt-3 flex gap-1.5 flex-wrap justify-center">
        {['Soil NPK', 'pH Level', 'Weather', 'Crops', 'Profit'].map((tag, i) => (
          <div key={tag} className={`px-2 py-0.5 bg-agri-100 rounded text-[8px] text-agri-600 transition-all duration-300 ${progress > 0.2 + i * 0.15 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SceneDashboardSoil = ({ progress }) => (
  <div className="h-full bg-gradient-to-b from-agri-50 to-white rounded-lg p-3 flex flex-col overflow-hidden">
    <MockNavbar showLang={false} langOpen={false} activeLang="English" />
    <div className="flex-1 flex flex-col gap-2 justify-center overflow-hidden">
      <div className={`bg-white rounded-xl border border-agri-100 p-2.5 shadow-sm transition-all duration-500 ${progress > 0.1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-5 h-5 bg-earth-100 rounded-md flex items-center justify-center">
            <FlaskConical className="w-3 h-3 text-earth-600" />
          </div>
          <p className="text-[10px] font-bold text-agri-900">Soil Analysis</p>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {[
            { label: 'N', value: '85', unit: 'kg/ha', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { label: 'P', value: '42', unit: 'kg/ha', color: 'bg-earth-50 text-earth-700 border-earth-200' },
            { label: 'K', value: '60', unit: 'kg/ha', color: 'bg-agri-50 text-agri-700 border-agri-200' },
            { label: 'pH', value: '6.8', unit: '', color: 'bg-amber-50 text-amber-700 border-amber-200' },
            { label: 'OM', value: '4.2', unit: '%', color: 'bg-rose-50 text-rose-700 border-rose-200' },
          ].map((m, i) => (
            <div key={i} className={`p-1.5 rounded-lg border text-center transition-all duration-400 ${m.color} ${progress > 0.15 + i * 0.1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <p className="text-[8px] opacity-80">{m.label}</p>
              <p className="text-[11px] font-bold leading-tight">{m.value}<span className="text-[7px] font-normal">{m.unit}</span></p>
            </div>
          ))}
        </div>
      </div>
      <div className={`bg-white rounded-xl border border-agri-100 p-2.5 shadow-sm transition-all duration-500 ${progress > 0.5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
            <CloudSun className="w-3 h-3 text-blue-600" />
          </div>
          <p className="text-[10px] font-bold text-agri-900">Weather</p>
          <div className="ml-auto flex items-center gap-0.5 text-[8px] text-agri-500 bg-agri-50 px-1.5 py-0.5 rounded-full">
            <MapPin className="w-2 h-2" /> Hyderabad
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'Temp', value: '28°C' },
            { label: 'Humidity', value: '65%' },
            { label: 'Rainfall', value: '120mm' },
          ].map((m, i) => (
            <div key={i} className={`bg-amber-50 border border-amber-200 rounded-lg p-1.5 text-center transition-all duration-400 ${progress > 0.6 + i * 0.1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <p className="text-[8px] text-amber-700 opacity-80">{m.label}</p>
              <p className="text-[11px] font-bold text-amber-800">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SceneDashboardCrops = ({ progress }) => (
  <div className="h-full bg-gradient-to-b from-agri-50 to-white rounded-lg p-3 flex flex-col overflow-hidden">
    <MockNavbar showLang={false} langOpen={false} activeLang="English" />
    <div className="flex-1 flex flex-col justify-center overflow-hidden">
      <div className={`bg-white rounded-xl border border-agri-100 p-2.5 shadow-sm transition-all duration-500 ${progress > 0.1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 bg-agri-100 rounded-md flex items-center justify-center">
            <Wheat className="w-3 h-3 text-agri-600" />
          </div>
          <p className="text-[10px] font-bold text-agri-900">Top Crop Recommendations</p>
        </div>
        <div className="space-y-1.5">
          {[
            { name: 'Rice', conf: 94, profit: '₹145,000', medal: '🥇', bg: 'from-amber-50 to-yellow-50 border-amber-200', badge: 'bg-amber-100 text-amber-800' },
            { name: 'Wheat', conf: 87, profit: '₹128,000', medal: '🥈', bg: 'from-slate-50 to-gray-50 border-slate-200', badge: 'bg-slate-100 text-slate-800' },
            { name: 'Sugarcane', conf: 79, profit: '₹192,000', medal: '🥉', bg: 'from-orange-50 to-amber-50 border-orange-200', badge: 'bg-orange-100 text-orange-800' },
          ].map((crop, i) => (
            <div key={i} className={`relative rounded-lg border p-2 flex items-center justify-between bg-gradient-to-br ${crop.bg} transition-all duration-500 ${progress > 0.2 + i * 0.15 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-sm">
                  <Award className={`w-3.5 h-3.5 ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-slate-500' : 'text-orange-500'}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-agri-900">{crop.name}</p>
                  <div className="w-12 h-1 bg-white rounded-full mt-0.5">
                    <div className="h-full bg-agri-500 rounded-full transition-all duration-700" style={{ width: `${crop.conf}%` }} />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs">{crop.medal}</span>
                <p className="text-[9px] font-bold text-agri-800">{crop.profit}</p>
              </div>
              <div className={`absolute bottom-0.5 right-1 transition-all duration-300 ${progress > 0.6 + i * 0.1 ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[7px] font-medium ${crop.badge}`}>
                  Details <ChevronRight className="w-2 h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SceneCropDetails = ({ progress }) => (
  <div className="h-full bg-gradient-to-b from-agri-50 to-white rounded-lg p-3 flex flex-col overflow-hidden">
    <MockNavbar showLang={false} langOpen={false} activeLang="English" />
    <div className="flex-1 flex flex-col justify-center overflow-hidden relative">
      <div className={`absolute inset-0 transition-all duration-500 ${progress > 0.15 ? 'scale-95 opacity-50 blur-[1px]' : 'scale-100 opacity-100'}`}>
        <div className="bg-white rounded-xl border border-agri-100 p-2 m-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 bg-agri-100 rounded-md flex items-center justify-center"><Wheat className="w-3 h-3 text-agri-600" /></div>
            <p className="text-[10px] font-bold text-agri-900">Top Crops</p>
          </div>
          <div className="space-y-1">
            <div className="rounded-lg border p-1.5 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 flex items-center justify-between">
              <span className="text-[10px] font-bold">Rice</span>
              <span className="text-[8px] bg-amber-100 text-amber-800 px-1 rounded">Details &gt;</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`relative z-10 mx-auto w-full max-w-[260px] transition-all duration-500 ${progress > 0.15 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <div className="bg-white rounded-xl shadow-xl border border-agri-100 overflow-hidden">
          <div className="bg-gradient-to-r from-agri-600 to-agri-700 p-3 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Wheat className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold">Rice</p>
                <p className="text-[9px] text-agri-100">Crop Details</p>
              </div>
            </div>
            <X className="w-4 h-4" />
          </div>
          <div className="p-3 space-y-2">
            <div className={`bg-agri-50 rounded-lg p-2 flex items-center gap-2 transition-all duration-400 ${progress > 0.3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <TrendingUp className="w-4 h-4 text-agri-600" />
              <div>
                <p className="text-[8px] text-agri-600">Expected Profit</p>
                <p className="text-sm font-bold text-agri-800">₹145,000</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-[8px] text-agri-600">Confidence</p>
                <p className="text-xs font-bold text-agri-700">94%</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Growing Season', value: 'Kharif (Jun-Nov)', delay: 0.4 },
                { label: 'Water Need', value: 'High (1500-2500mm)', delay: 0.5 },
                { label: 'Market Price', value: '₹2,040-2,500/q', delay: 0.6 },
                { label: 'Duration', value: '120-150 days', delay: 0.7 },
              ].map((item, i) => (
                <div key={i} className={`bg-agri-50/50 rounded-lg p-1.5 border border-agri-100 transition-all duration-400 ${progress > item.delay ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <p className="text-[7px] text-agri-500 uppercase font-medium">{item.label}</p>
                  <p className="text-[9px] font-bold text-agri-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SceneFertilizer = ({ progress }) => (
  <div className="h-full bg-gradient-to-b from-agri-50 to-white rounded-lg p-3 flex flex-col overflow-hidden">
    <MockNavbar showLang={false} langOpen={false} activeLang="English" />
    <div className="flex-1 flex flex-col justify-center overflow-hidden">
      <div className={`bg-white rounded-xl border border-agri-100 p-2.5 shadow-sm transition-all duration-500 ${progress > 0.1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 bg-earth-100 rounded-md flex items-center justify-center">
            <Sprout className="w-3 h-3 text-earth-600" />
          </div>
          <p className="text-[10px] font-bold text-agri-900">Fertilizer Recommendations</p>
        </div>
        <div className="space-y-2">
          <div className={`border border-agri-100 rounded-lg p-2 transition-all duration-500 ${progress > 0.2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <p className="text-[10px] font-bold text-agri-900 mb-1.5">Rice <span className="text-[8px] font-normal text-agri-500">per hectare</span></p>
            <div className="space-y-1.5">
              {[
                { type: 'Urea', value: 145, max: 280, icon: Beaker, color: 'bg-blue-500', bg: 'bg-blue-50' },
                { type: 'DAP', value: 65, max: 280, icon: Pill, color: 'bg-earth-500', bg: 'bg-earth-50' },
                { type: 'MOP', value: 85, max: 280, icon: CircleDot, color: 'bg-rose-500', bg: 'bg-rose-50' },
              ].map((f, j) => (
                <div key={j} className={`space-y-0.5 transition-all duration-400 ${progress > 0.3 + j * 0.12 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <f.icon className="w-2.5 h-2.5 text-agri-500" />
                      <span className="text-[9px] font-medium text-agri-800">{f.type}</span>
                    </div>
                    <span className="text-[9px] font-bold">{f.value} kg</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${f.color} transition-all duration-700`} style={{ width: `${progress > 0.3 + j * 0.12 ? (f.value / f.max) * 100 : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-1.5 pt-1.5 border-t border-agri-100 flex items-center gap-1 transition-all duration-400 ${progress > 0.75 ? 'opacity-100' : 'opacity-0'}`}>
              <TrendingUp className="w-2.5 h-2.5 text-agri-500" />
              <span className="text-[8px] text-agri-600">Total: <span className="font-bold text-agri-800">295 kg</span> /ha</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SceneChart = ({ progress }) => (
  <div className="h-full bg-gradient-to-b from-agri-50 to-white rounded-lg p-3 flex flex-col overflow-hidden">
    <MockNavbar showLang={false} langOpen={false} activeLang="English" />
    <div className="flex-1 flex flex-col justify-center overflow-hidden">
      <div className={`bg-white rounded-xl border border-agri-100 p-2.5 shadow-sm transition-all duration-500 ${progress > 0.1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 bg-agri-100 rounded-md flex items-center justify-center">
            <TrendingUp className="w-3 h-3 text-agri-600" />
          </div>
          <p className="text-[10px] font-bold text-agri-900">Profit Comparison</p>
        </div>
        <div className="flex items-end justify-center gap-4 h-20 px-3">
          {[
            { name: 'Rice', value: 60, color: 'bg-agri-500', profit: '₹145K' },
            { name: 'Wheat', value: 50, color: 'bg-agri-400', profit: '₹128K' },
            { name: 'Sugarcane', value: 85, color: 'bg-agri-300', profit: '₹192K' },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
              <span className={`text-[8px] font-bold transition-all duration-500 ${progress > 0.3 + i * 0.15 ? 'opacity-100' : 'opacity-0'}`}>{bar.profit}</span>
              <div className="w-full max-w-[28px] bg-agri-100 rounded-t-md relative overflow-hidden" style={{ height: '60px' }}>
                <div className={`absolute bottom-0 w-full rounded-t-md transition-all duration-700 ${bar.color}`} style={{ height: progress > 0.2 + i * 0.15 ? `${bar.value}%` : '0%' }} />
              </div>
              <span className="text-[8px] text-agri-600 font-medium">{bar.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={`mt-2 text-center transition-all duration-500 ${progress > 0.7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-agri-100 rounded-full">
          <CheckCircle2 className="w-3 h-3 text-agri-600" />
          <span className="text-[9px] font-medium text-agri-700">Analysis Complete — Sugarcane has highest profit!</span>
        </div>
      </div>
    </div>
  </div>
);

const SceneOutro = () => (
  <div className="h-full flex flex-col items-center justify-center text-center p-5 bg-gradient-to-br from-agri-700 to-agri-900 rounded-lg">
    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-3">
      <CheckCircle2 className="w-8 h-8 text-agri-300" />
    </div>
    <h2 className="text-lg font-bold text-white mb-1">Ready to Farm Smarter?</h2>
    <p className="text-agri-200 text-xs max-w-[200px] mb-3">Get personalized crop recommendations and maximize your profits today.</p>
    <div className="px-5 py-2 bg-white rounded-xl text-xs font-bold text-agri-800 flex items-center gap-1">
      Get Started Now <ArrowRight className="w-3 h-3" />
    </div>
  </div>
);

const SceneRenderer = ({ sceneId, progress }) => {
  switch (sceneId) {
    case 'home': return <SceneHome progress={progress} />;
    case 'language': return <SceneLanguage progress={progress} />;
    case 'upload-form': return <SceneUploadForm progress={progress} />;
    case 'upload-image': return <SceneUploadImage progress={progress} />;
    case 'analyzing': return <SceneAnalyzing progress={progress} />;
    case 'dashboard-soil': return <SceneDashboardSoil progress={progress} />;
    case 'dashboard-crops': return <SceneDashboardCrops progress={progress} />;
    case 'crop-details': return <SceneCropDetails progress={progress} />;
    case 'fertilizer': return <SceneFertilizer progress={progress} />;
    case 'chart': return <SceneChart progress={progress} />;
    case 'outro': return <SceneOutro />;
    default: return <SceneHome progress={progress} />;
  }
};

/* ============ PLAYER WITH MANUAL CONTROLS ============ */

const DemoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const sceneStartRef = useRef(0);

  const currentScene = demoScenes[currentSceneIndex];

  const reset = useCallback(() => {
    setCurrentSceneIndex(0);
    setSceneProgress(0);
    setElapsed(0);
    sceneStartRef.current = 0;
    lastTimeRef.current = null;
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      setElapsed((prev) => {
        const next = prev + delta;
        const sceneElapsed = next - sceneStartRef.current;
        const sceneDuration = demoScenes[currentSceneIndex].duration;
        const progress = Math.min(sceneElapsed / sceneDuration, 1);
        setSceneProgress(progress);

        if (sceneElapsed >= sceneDuration) {
          const nextIndex = currentSceneIndex + 1;
          if (nextIndex < demoScenes.length) {
            setCurrentSceneIndex(nextIndex);
            sceneStartRef.current = next;
            setSceneProgress(0);
          } else {
            setIsPlaying(false);
          }
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, currentSceneIndex]);

  const goToScene = (index) => {
    if (index < 0 || index >= demoScenes.length) return;
    let newElapsed = 0;
    for (let i = 0; i < index; i++) {
      newElapsed += demoScenes[i].duration;
    }
    setElapsed(newElapsed);
    sceneStartRef.current = newElapsed;
    setCurrentSceneIndex(index);
    setSceneProgress(0);
    setIsPlaying(true);
    lastTimeRef.current = null;
  };

  const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);

  return (
    <div className="flex flex-col h-full">
      {/* Screen */}
      <div className="flex-1 relative rounded-xl overflow-hidden bg-agri-100 shadow-inner border border-agri-200 min-h-[280px]">
        <div className="absolute inset-0 p-1">
          <SceneRenderer sceneId={currentScene.id} progress={sceneProgress} />
        </div>
      </div>

      {/* Caption */}
      <div className="mt-3 px-1">
        <p className="text-sm text-center text-agri-700 font-medium min-h-[20px]">
          {currentScene.caption}
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-2 flex items-center gap-1">
        {demoScenes.map((scene, i) => (
          <button
            key={scene.id}
            onClick={() => goToScene(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentSceneIndex
                ? 'bg-agri-600 flex-[2]'
                : i < currentSceneIndex
                ? 'bg-agri-400 flex-1'
                : 'bg-agri-200 flex-1 hover:bg-agri-300'
            }`}
            title={scene.caption}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          onClick={() => goToScene(currentSceneIndex - 1)}
          className="p-2 hover:bg-agri-50 rounded-lg text-agri-600 transition-colors"
          title="Previous"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 bg-agri-600 hover:bg-agri-700 text-white rounded-full flex items-center justify-center transition-colors shadow-md"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <button
          onClick={reset}
          className="p-2 hover:bg-agri-50 rounded-lg text-agri-600 transition-colors"
          title="Restart"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => goToScene(currentSceneIndex + 1)}
          className="p-2 hover:bg-agri-50 rounded-lg text-agri-600 transition-colors"
          title="Next"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Time */}
      <div className="mt-1 text-center">
        <span className="text-[10px] text-agri-400">
          Scene {currentSceneIndex + 1} of {demoScenes.length} · {Math.round(progressPercent)}%
        </span>
      </div>
    </div>
  );
};

export default DemoPlayer;
