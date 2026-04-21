# 🌾 AgriVision-Pro

### Precision Farming Decision Support System

---

## 🚀 Overview

AgriVision-Pro is an intelligent agriculture support system that helps farmers make **data-driven decisions** instead of relying on traditional practices.

The system analyzes a **Soil Health Card image**, combines it with **weather data**, and provides:

* 🌱 Crop recommendations
* 💰 Profit estimation
* 🧪 Fertilizer suggestions

---

## 🎯 Problem Statement

Farmers often rely on guesswork, leading to:

* Inefficient fertilizer usage
* Poor crop selection
* Reduced yield and profit

---

## 💡 Solution

Our system integrates:

* Soil data (from SHC images)
* Weather conditions
* Smart decision logic

To generate **personalized farming recommendations**.

---

## ⚙️ How It Works

```text
User uploads Soil Health Card image
        ↓
Image processing (OCR / fallback)
        ↓
Extract soil parameters (N, P, K, pH, organic carbon)
        ↓
Fetch weather data using location
        ↓
Predict top 3 crops
        ↓
Estimate profit
        ↓
Recommend fertilizers
```

---

## 🧠 Features

✔ Upload Soil Health Card image
✔ Automatic soil data extraction
✔ Weather integration (API-based)
✔ Top 3 crop recommendations
✔ Profit estimation for each crop
✔ Fertilizer recommendation (name + quantity)
✔ Smart fallback system (ensures output even if errors occur)

---

## 🛠️ Tech Stack

### 🔹 Backend

* Node.js
* Express.js
* Multer (file upload)
* Axios (API calls)

### 🔹 AI / Logic

* Rule-based crop prediction
* Soil nutrient analysis
* Fertilizer calculation

### 🔹 External APIs

* OpenWeatherMap API

---

## 📂 Project Structure

```text
backend/
│
├── controllers/
├── routes/
├── services/
├── utils/
├── app.js
├── server.js
```

---

## 🔐 Environment Variables

Create a `.env` file inside backend:

```env
PORT=5000
WEATHER_API_KEY=your_api_key_here
```

---

## ▶️ How to Run

```bash
cd backend
npm install
node server.js
```

---

## 🧪 API Endpoint

### POST `/api/analyze`

**Request:**

* Form-data → `image` (file upload)

**Response:**

```json
{
  "soil_data": { "N": 90, "P": 42, "K": 43, "ph": 6.5 },
  "location": { "latitude": 31.026, "longitude": 75.790 },
  "weather": { "temperature": 30, "humidity": 60, "rainfall": 20 },
  "top_crops": [
    { "crop": "rice", "confidence": 90, "profit": 50000 }
  ],
  "fertilizers": [
    { "name": "Urea", "quantity": "50 kg/acre" }
  ]
}
```

---

## 🛡️ Reliability Feature

Even if:

* Image processing fails
* OCR fails
* API fails

👉 The system uses a **fallback mechanism** to always provide meaningful output.

---

## 🎤 Use Case

* Farmers
* Agricultural advisors
* Smart farming systems

---

## 🚀 Future Enhancements

* MongoDB integration (history tracking)
* Real ML model integration
* Mobile app
* Satellite data integration

---

## 👨‍💻 Team Contribution

* Backend development
* Soil data processing
* Crop recommendation logic
* Fertilizer optimization

---

## 🌟 Conclusion

AgriVision-Pro empowers farmers with **AI-driven insights**, improving productivity, reducing waste, and increasing profitability.

---
