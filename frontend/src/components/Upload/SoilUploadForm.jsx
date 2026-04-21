import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Ruler, FlaskConical, ScanLine, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import ImageUploader from './ImageUploader';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const SoilUploadForm = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    setSoilData,
    setWeatherData,
    setCrops,
    setFertilizerData,
    loading,
    setLoading,
    error,
    setError,
    location,
    setLocation,
    landArea,
    setLandArea,
  } = useApp();

  const [selectedImage, setSelectedImage] = useState(null);
  const [useManualInput, setUseManualInput] = useState(false);
  const [manualSoil, setManualSoil] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    organic_matter: '',
  });

  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setManualSoil((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!location.trim()) return 'Please enter a location';
    if (!landArea || landArea <= 0) return 'Please enter a valid land area';
    if (useManualInput) {
      if (!manualSoil.nitrogen) return 'Please enter Nitrogen value';
      if (!manualSoil.phosphorus) return 'Please enter Phosphorus value';
      if (!manualSoil.potassium) return 'Please enter Potassium value';
      if (!manualSoil.ph) return 'Please enter pH value';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API calls with demo data since backend may not be ready
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Demo soil data
      const demoSoilData = useManualInput
        ? {
            nitrogen: parseFloat(manualSoil.nitrogen),
            phosphorus: parseFloat(manualSoil.phosphorus),
            potassium: parseFloat(manualSoil.potassium),
            ph: parseFloat(manualSoil.ph),
            organic_matter: parseFloat(manualSoil.organic_matter) || 3.5,
          }
        : {
            nitrogen: 85,
            phosphorus: 42,
            potassium: 60,
            ph: 6.8,
            organic_matter: 4.2,
          };

      // Demo weather data
      const demoWeatherData = {
        temperature: 28,
        humidity: 65,
        rainfall: 120,
        description: 'Partly cloudy with light winds',
        location: location,
      };

      // Demo crop recommendations
      const demoCrops = [
        {
          name: 'Rice',
          confidence: 94,
          expected_profit: 145000,
          rank: 1,
        },
        {
          name: 'Wheat',
          confidence: 87,
          expected_profit: 128000,
          rank: 2,
        },
        {
          name: 'Sugarcane',
          confidence: 79,
          expected_profit: 192000,
          rank: 3,
        },
      ];

      // Demo fertilizer data
      const demoFertilizerData = [
        {
          crop: 'Rice',
          urea: 145,
          dap: 65,
          mop: 85,
        },
        {
          crop: 'Wheat',
          urea: 120,
          dap: 55,
          mop: 70,
        },
        {
          crop: 'Sugarcane',
          urea: 280,
          dap: 120,
          mop: 150,
        },
      ];

      setSoilData(demoSoilData);
      setWeatherData(demoWeatherData);
      setCrops(demoCrops);
      setFertilizerData(demoFertilizerData);

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => setError(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-agri-800 mb-2">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t('location')}
            </span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t('locationPlaceholder')}
            className="w-full px-4 py-3 rounded-xl border border-agri-200 bg-white focus:border-agri-500 focus:ring-2 focus:ring-agri-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-agri-800 mb-2">
            <span className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              {t('landArea')}
            </span>
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            placeholder={t('landAreaPlaceholder')}
            className="w-full px-4 py-3 rounded-xl border border-agri-200 bg-white focus:border-agri-500 focus:ring-2 focus:ring-agri-200 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-agri-50 rounded-xl">
        <button
          type="button"
          onClick={() => setUseManualInput(false)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            !useManualInput
              ? 'bg-agri-600 text-white shadow-md'
              : 'bg-white text-agri-700 hover:bg-agri-100'
          }`}
        >
          <ScanLine className="w-4 h-4" />
          {t('uploadImage')}
        </button>
        <button
          type="button"
          onClick={() => setUseManualInput(true)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            useManualInput
              ? 'bg-agri-600 text-white shadow-md'
              : 'bg-white text-agri-700 hover:bg-agri-100'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          {t('manualEntry')}
        </button>
      </div>

      {!useManualInput ? (
        <ImageUploader
          selectedImage={selectedImage}
          onImageSelect={setSelectedImage}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'nitrogen', label: t('nitrogen'), unit: 'kg/ha' },
            { name: 'phosphorus', label: t('phosphorus'), unit: 'kg/ha' },
            { name: 'potassium', label: t('potassium'), unit: 'kg/ha' },
            { name: 'ph', label: t('phLevel'), unit: '' },
            { name: 'organic_matter', label: t('organicMatter'), unit: '%' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-agri-800 mb-1">
                {field.label}
              </label>
              <input
                type="number"
                step="0.1"
                name={field.name}
                value={manualSoil[field.name]}
                onChange={handleManualChange}
                placeholder={field.unit}
                className="w-full px-3 py-2 rounded-lg border border-agri-200 bg-white focus:border-agri-500 focus:ring-2 focus:ring-agri-200 outline-none transition-all text-sm"
              />
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-agri-600 text-white font-semibold rounded-xl hover:bg-agri-700 active:bg-agri-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('analyzeBtn')}
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SoilUploadForm;
