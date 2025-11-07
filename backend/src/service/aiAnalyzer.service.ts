import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const aiAnalyzerService = async (logs: any[]) => {
  if (!Array.isArray(logs) || logs.length === 0) {
    throw new Error("No logs provided for analysis");
  }

  const logText = logs
    .map(
      (log) =>
        `Timestamp: ${log.timestamp}, Status Code: ${log.statusCode}, Response Time: ${log.responseTime}ms, Message: ${log.message}`
    )
    .join("\n");

  const performancePrompt = `
You are an expert server performance analyst and monitoring specialist.
Analyze the following API logs and provide:
 A short 2–3 sentence overall stability insight.

Logs:
${logText}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(performancePrompt);

    const text = result.response.text();

    return text;
  } catch (error: any) {
    console.error(" AI Analyzer error:", error.message);
    throw new Error("Failed to analyze logs with Gemini");
  }
};
