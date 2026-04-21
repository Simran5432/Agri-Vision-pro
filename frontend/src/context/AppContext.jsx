import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [soilData, setSoilData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [crops, setCrops] = useState([]);
  const [fertilizerData, setFertilizerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [landArea, setLandArea] = useState('');

  const resetState = () => {
    setSoilData(null);
    setWeatherData(null);
    setCrops([]);
    setFertilizerData([]);
    setError(null);
  };

  const value = {
    soilData,
    setSoilData,
    weatherData,
    setWeatherData,
    crops,
    setCrops,
    fertilizerData,
    setFertilizerData,
    loading,
    setLoading,
    error,
    setError,
    location,
    setLocation,
    landArea,
    setLandArea,
    resetState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
