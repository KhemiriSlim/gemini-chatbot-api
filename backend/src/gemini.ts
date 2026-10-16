import { GoogleGenAI } from "@google/genai";
import { AppError } from "./error";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL;

if (!apiKey || !model) {
  throw new Error("GEMINI_API_KEY and GEMINI_MODEL must be set");
}
const MODEL: string = model;
const ai = new GoogleGenAI({ apiKey });

export async function askGemini(message: string): Promise<string> {
  const interaction = await ai.interactions.create({
    model : MODEL,
    input: message,
  });

  const text = interaction.output_text;
  if (!text) {
    throw new AppError(502, "Gemini returned an empty reply");
  }
  return text;
}