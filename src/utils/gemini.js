import { GoogleGenerativeAI } from "@google/generative-ai";
import words from './words.json';

// Initialize Gemini API
// Note: In a real production app, this should be backend-proxied or strictly env-gated.
// For this portfolio project, we use the key directly if provided.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
    try {
        genAI = new GoogleGenerativeAI(API_KEY);
    } catch (e) {
        console.error("Failed to initialize Gemini", e);
    }
}

export const generateParagraphWithAI = async (difficulty = 'medium') => {
    if (!genAI) {
        console.warn("Gemini API Key missing or invalid. Falling back to static data.");
        return null; // Signal fallback
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        let prompt = "";
        switch (difficulty) {
            case 'easy':
                prompt = "Generate a simple, easy-to-type paragraph for a typing test. About 50-70 words. Simple vocabulary. No complex punctuation.";
                break;
            case 'hard':
                prompt = "Generate a complex, challenging paragraph for a typing test. About 90-110 words. advanced vocabulary, technical terms, and punctuation.";
                break;
            case 'medium':
            default:
                prompt = "Generate a moderate paragraph for a typing test. About 70-90 words. Engaging topic, standard punctuation.";
                break;
        }
        
        // Add restriction to ensure plain text
        prompt += " Output only the raw text paragraph. No markdown, no quotes wrapping the whole text.";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Cleanup if necessary (sometimes models output quotes)
        text = text.trim().replace(/^"|"$/g, '');
        
        return text;
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        return null;
    }
};
