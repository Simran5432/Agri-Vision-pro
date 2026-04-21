import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const predictCrops = async (soilData, location, landArea) => {
  try {
    const response = await api.post('/predict', {
      ...soilData,
      location,
      land_area: landArea,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get crop predictions');
  }
};

export const getFertilizer = async (cropName, soilData) => {
  try {
    const response = await api.post('/fertilizer', {
      crop: cropName,
      ...soilData,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get fertilizer recommendation');
  }
};

export const getWeather = async (location) => {
  try {
    const response = await api.get('/weather', {
      params: { location },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get weather data');
  }
};

export const analyzeSoilImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await api.post('/analyze-soil', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to analyze soil image');
  }
};

export default api;
