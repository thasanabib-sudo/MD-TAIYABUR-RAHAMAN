import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getChatResponse(message: string, context: string, language: 'en' | 'bn') {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: message,
    config: {
      systemInstruction: `You are an AI assistant for Tahsan Abib (Md. Toyebur Rahman). 
      Your goal is to answer questions about him based on the provided context.
      Context: ${context}
      Respond in ${language === 'en' ? 'English' : 'Bangla'}.
      Be professional, polite, and helpful. If you don't know something, say you don't know based on the information provided.`,
    },
  });

  const response = await model;
  return response.text;
}
