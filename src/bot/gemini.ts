import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export async function askGemini(prompt: string): Promise<string> {
    try {
        const res = await axios.post(GEMINI_API_URL, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        const text = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
        return text || "No response from Gemini.";
    } catch (error: any) {
        console.error("Gemini API error:", error.response?.data || error.message);
        return "Error when calling Gemini.";
    }
}
