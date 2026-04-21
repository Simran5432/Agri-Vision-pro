exports.calculateProfits = (topCrops, weather, soilData) => {
    // Base profit values per acre/hectare
    const baseProfits = {
        "Rice": 45000,
        "Millet": 25000,
        "Wheat": 38000,
        "Maize": 30000,
        "Cotton": 50000,
        "Soybean": 35000,
        "Barley": 22000,
        "Oats": 20000
    };

    return topCrops.map(item => {
        let expected_profit = baseProfits[item.crop] || 25000;
        
        // Adjust baseline based on confidence
        expected_profit = expected_profit * (item.confidence / 100);

        // Adjust based on weather/soil
        if (weather.rainfall > 120 && item.crop === "Rice") {
            expected_profit *= 1.1;
        }
        if (soilData.organic_carbon > 0.6) {
            expected_profit *= 1.05;
        }
        
        return {
            ...item,
            expected_profit: Math.round(expected_profit)
        };
    });
};
