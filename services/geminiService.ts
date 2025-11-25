import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let genAI: GoogleGenAI | null = null;

const getGenAI = (): GoogleGenAI => {
  if (!genAI) {
    const apiKey = process.env.API_KEY || '';
    // In a real scenario, we handle missing keys gracefully, but for this demo assume env is set.
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

const SYSTEM_INSTRUCTION = `
You are "Portfolio Bot", an AI assistant living on the portfolio website of a Senior UX Designer specializing in Fintech.
Your tone is professional, concise, slightly technical, but friendly.
The designer loves minimal design, data visualization, and street photography.
Answer questions about their experience (assume they have 8 years experience, expert in React, Figma, and Financial Data viz).
If asked about contact info, suggest emailing 'hello@uxdesigner.tech'.
Keep answers short (under 100 words) unless asked for details.
`;

export const sendMessageToGemini = async (history: { role: string; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    const ai = getGenAI();
    // Using the 2.5 flash model for speed and efficiency in a chat widget
    const model = 'gemini-2.5-flash';
    
    // Construct chat history for context
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: newMessage,
    });

    return result.text || "I'm processing that data point, but couldn't generate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection to the neural interface interrupted. Please try again later.";
  }
};
