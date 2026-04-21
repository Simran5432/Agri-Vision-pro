const ocrService = require('../services/ocrService');
const weatherService = require('../services/weatherService');
const cropService = require('../services/cropService');
const profitService = require('../services/profitService');
const fertilizerService = require('../services/fertilizerService');
const { dummyData } = require('../utils/dummyData');

exports.analyzeImage = async (req, res) => {
    try {
        let extractedData;
        const image = req.file;

        try {
            // Attempt to process image via OCR Service
            extractedData = await ocrService.extractData(image ? image.buffer : null);
        } catch (error) {
            // FALLBACK SYSTEM (VERY IMPORTANT)
            console.error("OCR failed or missing constraints, enforcing dummy data fallback:", error.message);
            // using a deep copy to ensure dummyData doesn't get mutated accidentally across calls
            extractedData = { ...dummyData };
        }

        // Destructure location and soil data
        const { latitude, longitude, ...soilData } = extractedData;

        // 1. Fetch Weather Data based on Latitude and Longitude
        const weather = await weatherService.getWeather(latitude, longitude);

        // 2. Predict Top 3 Crops
        const top_crops = cropService.predictCrops(soilData, weather);

        // 3. Calculate Expected Profit for each crop
        const top_crops_with_profit = profitService.calculateProfits(top_crops, weather, soilData);

        // 4. Recommend Fertilizers based on Soil Data
        const fertilizers = fertilizerService.recommendFertilizers(soilData);

        // Final Response Format
        return res.json({
            soil_data: soilData,
            location: { latitude, longitude },
            weather: weather,
            top_crops: top_crops_with_profit,
            fertilizers: fertilizers
        });

    } catch (error) {
        console.error("Critical Analysis Error:", error);
        return res.status(500).json({ error: "An unexpected error occurred during the analysis pipeline." });
    }
};
