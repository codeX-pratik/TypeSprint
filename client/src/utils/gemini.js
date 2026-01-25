import { GoogleGenerativeAI } from "@google/generative-ai";


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
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.9, // High creativity to ensure variety
                maxOutputTokens: 300,
            }
        });
        
        const topics = [
            "technology", "nature", "space", "history", "science", 
            "future", "ocean", "forest", "city life", "AI", 
            "ancient civilizations", "cooking", "music", "art"
        ];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        let prompt = "";
        switch (difficulty) {
            case 'easy':
                prompt = `Generate a simple paragraph about ${randomTopic} for a typing test. About 30-40 words. Simple vocabulary. No complex punctuation.`;
                break;
            case 'hard':
                prompt = `Generate a complex paragraph about ${randomTopic} for a typing test. About 80-100 words. Advanced vocabulary, technical terms, and punctuation.`;
                break;
            case 'medium':
            default:
                prompt = `Generate a moderate paragraph about ${randomTopic} for a typing test. About 50-70 words. Engaging style, standard punctuation.`;
                break;
        }
        
        // Add restriction to ensure plain text
        prompt += " Output only the raw text paragraph. No markdown, no quotes wrapping the whole text. Do not include the topic name as a title.";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Cleanup if necessary (sometimes models output quotes)
        text = text.trim().replace(/^"|"$/g, '');
        
        return text;
    } catch (error) {
        if (error.message.includes('429') || error.status === 429) {
            console.warn("Gemini Rate Limit Exceeded. Falling back to offline mode.");
        } else {
            console.error("Gemini Generation Error:", error);
        }
        return null;
    }
};
