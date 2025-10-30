import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!} );

export const aiAnalyzerService = async(logs: any[]) =>{

    const logText = logs
    .map(
      (log) =>
        `Timestamp: ${log.timestamp}, Status Code: ${log.statusCode}, Response Time: ${log.responseTime}ms, Message: ${log.message}`
    )
    .join("\n");
    const prompt = `
        You are an expert server performance analyst and monitoring specialist.
        Analyze the following server monitor logs and provide:
        1. Summary of server performance
        2. Any detected issues or anomalies
        3. Actionable recommendations to improve reliability and performance
        4. Summarize in 2–3 sentences with uptime and stability insights
        ${logText}`;
    try {
     const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
       });
       return result.text;
    } catch (err) {
     console.log("error in ai analyzer service", err);
     throw new Error("Ai analysis error");
    }
}



