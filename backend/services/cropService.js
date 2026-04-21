exports.predictCrops = (soilData, weather) => {
    const crops = [];
    const { N, P, K, ph, organic_carbon } = soilData;
    const { temperature, rainfall } = weather;

    // Rule-based logic simulating ML model
    
    // Rice rule
    if (N > 80 && rainfall > 100) {
        crops.push({ crop: "Rice", confidence: 92 });
    }
    
    // Millet rule
    if (rainfall < 80 && temperature > 25) {
        crops.push({ crop: "Millet", confidence: 85 });
    }

    // Wheat rule
    if (N > 50 && P > 30 && K > 30 && ph >= 6.0 && ph <= 7.0) {
        crops.push({ crop: "Wheat", confidence: 88 });
    }
    
    // Maize rule
    if (temperature > 20 && temperature < 30 && rainfall > 50) {
        crops.push({ crop: "Maize", confidence: 82 });
    }

    // Cotton rule
    if (organic_carbon > 0.5 && ph > 5.5) {
        crops.push({ crop: "Cotton", confidence: 78 });
    }

    // If rules don't match, provide generic top crops
    if (crops.length === 0) {
        crops.push(
            { crop: "Soybean", confidence: 80 },
            { crop: "Barley", confidence: 75 },
            { crop: "Oats", confidence: 70 }
        );
    }

    // Get top 3
    return crops.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
};
