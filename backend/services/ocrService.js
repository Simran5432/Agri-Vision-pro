exports.extractData = async (imageBuffer) => {
    // 1. Simulate complex OCR process
    // 2. We deliberately throw an error here to simulate a failure 
    //    (e.g., OCR fails, image invalid, values missing), 
    //    triggering the robust fallback mechanism in the controller.
    
    if (!imageBuffer) {
        throw new Error("No image buffer provided");
    }

    // You could put real OCR logic here (e.g., using Tesseract.js)
    // For this demonstration, we ensure it fails to trigger dummy data 
    // as requested in the requirements (fallback system).
    
    throw new Error("OCR extraction failed to find all values.");
};
