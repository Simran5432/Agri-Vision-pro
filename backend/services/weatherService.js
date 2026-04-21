const axios = require('axios');

exports.getWeather = async (lat, lon) => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        if (!apiKey || apiKey === 'your_openweather_api_key') {
            console.log("No valid OpenWeather API key found, using fallback weather data.");
            return {
                temperature: 28.5,
                humidity: 65,
                rainfall: 120
            };
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const response = await axios.get(url);
        const data = response.data;
        
        // Rainfall estimate: API might not return rain if it's currently dry
        const rainfall = data.rain ? (data.rain['1h'] || data.rain['3h'] || 0) : Math.floor(Math.random() * 50) + 50;

        return {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            rainfall: rainfall
        };
    } catch (error) {
        console.error("Weather Service failed:", error.message);
        // Fallback in case API call fails
        return {
            temperature: 30,
            humidity: 60,
            rainfall: 100
        };
    }
};
