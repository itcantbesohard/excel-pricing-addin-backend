import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function sendPromptToGemini(prompt, promptSystem, model) {
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                temperature: 0.1,
                systemInstruction: promptSystem,
                response_mime_type: 'application/json',
                thinkingConfig: {
                    thinkingBudget: 1024
                }
            },
        });

        return response.text
    } catch (err) {
        console.error("Error in sendPromptToGemini:", err);
        throw err;
    }

}

export async function sendPromptToOpenRouter(promptUser, promptSystem, model) {
    
    const body = JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: promptSystem },
                    { role: "user", content: promptUser }],
                temperature: 0.1,
            });
    try {
        const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: body
        });
        const data = await resp.json();
        const result = data.choices[0].message.content;

        return result
    
    } catch (err) {
        console.error("Error in sendPromptToOpenRouter:", err);
        throw err;
    }
}
