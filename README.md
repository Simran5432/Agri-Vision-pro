# 🌱 AgriVision Pro

### Precision Farming Decision Support System

---

## 🚀 Overview

**AgriVision Pro** is a full-stack web application designed to empower farmers with **data-driven agricultural insights**.
It transforms raw soil data, weather conditions, and land inputs into **actionable recommendations** for crop selection, fertilizer usage, and profit optimization.

---

## 🎯 Problem Statement

Farmers often rely on traditional practices instead of scientific data, leading to:

* Inefficient fertilizer usage
* Poor crop selection
* Reduced yield and profitability

---

## 💡 Solution

AgriVision Pro provides an intelligent platform that:

* Analyzes **Soil Health Card (SHC)** data
* Integrates **weather information**
* Recommends **optimal crops**
* Suggests **fertilizer usage and quantity**
* Estimates **profit potential**

---

## ⚙️ Key Features

* 📷 **Image-based Soil Analysis**
  Upload Soil Health Card images for automatic data extraction

* 🌱 **Soil Nutrient Insights**
  Visual representation of N, P, K, pH, and organic content

* 🌾 **Crop Recommendation System**
  Top 3 crops based on soil and environmental conditions

* 💰 **Profit Estimation**
  Expected returns for recommended crops

* 🧪 **Fertilizer Recommendation**
  Optimized fertilizer suggestions with quantities

* 🌦️ **Weather Integration**
  Real-time weather data based on location

* 🔄 **Robust Processing Pipeline**
  Ensures consistent results across different inputs

---

## 🏗️ Tech Stack

### 🔹 Frontend

* React.js
* Modern UI/UX with responsive design
* Component-based architecture

### 🔹 Backend

* Node.js
* Express.js

### 🔹 APIs & Integration

* OpenWeather API (weather data)
* Image processing & data extraction pipeline

---

## 📂 Project Structure

```
project/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 🔌 How It Works

1. User uploads Soil Health Card image
2. System extracts soil parameters
3. Weather data is fetched based on location
4. Backend processes inputs
5. Frontend displays:

   * Soil insights
   * Recommended crops
   * Fertilizer suggestions
   * Profit estimates

---

## 🛠️ Setup Instructions

### 🔹 1. Clone Repository

```bash
git clone <repo-link>
cd project
```

---

### 🔹 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file in backend:

```
PORT=5000
OPENWEATHER_API_KEY=your_api_key_here
```

---

## 🧪 API Endpoint

### POST `/api/analyze`

* Accepts: Image file (form-data)
* Returns: Structured agricultural insights

---

## 🎥 Demo Flow

1. Login
2. Upload Soil Health Card
3. View nutrient analysis
4. Get crop recommendations
5. View fertilizer plan and profit insights

---

## 🔮 Future Scope

* Integration with government soil databases
* Satellite-based precision farming
* Mobile application for wider accessibility
* Advanced predictive analytics

---

## 👨‍💻 Contributors

* Simran Preet Kaur, Simranjit Kaur, Simranjot, Sheetal
* Team TechTitans

---

## 📌 Conclusion

AgriVision Pro bridges the gap between **traditional farming and smart agriculture** by combining **soil data, weather intelligence, and decision support** into one unified platform.

---
