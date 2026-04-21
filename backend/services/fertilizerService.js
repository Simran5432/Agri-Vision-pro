exports.recommendFertilizers = (soilData) => {
    const { N, P, K } = soilData;
    const recommendations = [];

    // Optimal thresholds (arbitrary for demo)
    const OPTIMAL_N = 100;
    const OPTIMAL_P = 50;
    const OPTIMAL_K = 50;

    if (N < OPTIMAL_N) {
        const required = (OPTIMAL_N - N) * 1.5; 
        recommendations.push({ name: "Urea", quantity: `${required.toFixed(1)} kg/acre` });
    } else {
        recommendations.push({ name: "Urea", quantity: "0 kg/acre (Sufficient Nitrogen)" });
    }

    if (P < OPTIMAL_P) {
        const required = (OPTIMAL_P - P) * 1.2;
        recommendations.push({ name: "DAP", quantity: `${required.toFixed(1)} kg/acre` });
    }

    if (K < OPTIMAL_K) {
        const required = (OPTIMAL_K - K) * 1.0;
        recommendations.push({ name: "MOP", quantity: `${required.toFixed(1)} kg/acre` });
    }

    if (recommendations.length === 0) {
        recommendations.push({ name: "Organic Compost", quantity: "500 kg/acre (Maintenance)" });
    }

    return recommendations;
};
