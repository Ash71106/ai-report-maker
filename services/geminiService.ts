
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisReport, Location } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

export const analyzeImageWithLocation = async (
  base64ImageData: string,
  mimeType: string,
  location: Location
): Promise<AnalysisReport> => {
  const imagePart = fileToGenerativePart(base64ImageData, mimeType);
  const textPart = {
    text: `You are an expert maintenance and safety analysis system. Analyze the provided image to identify any structural, safety, or maintenance issues. The user is at location: ${location.latitude}, ${location.longitude}. Based on your analysis, generate a concise problem title, a detailed report explaining the issue and its potential risks, suggested remediation steps or preventative measures, assign a priority level ('Low', 'Medium', or 'High'), and suggest a recipient in a typical corporate management structure (e.g., 'Facilities Manager', 'Safety Officer', 'IT Department'). Provide a plausible corporate email address for the suggested recipient. Respond ONLY with a JSON object that adheres to the specified schema.`,
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: { parts: [imagePart, textPart] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          problem: {
            type: Type.STRING,
            description: "A short, concise title for the identified problem.",
          },
          report: {
            type: Type.STRING,
            description:
              "A detailed report explaining the problem, its context, and potential risks.",
          },
          remediationSteps: {
            type: Type.STRING,
            description: "Suggested steps to fix the issue or prevent it from happening again."
          },
          priority: {
            type: Type.STRING,
            enum: ["Low", "Medium", "High"],
            description: "The urgency of the issue.",
          },
          recipient: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description:
                  "The job title of the person who should receive this report (e.g., 'Facilities Manager').",
              },
              email: {
                type: Type.STRING,
                description:
                  "A plausible corporate email address for the recipient (e.g., 'facilities.manager@example.com').",
              },
            },
            required: ["name", "email"],
          },
        },
        required: ["problem", "report", "priority", "recipient", "remediationSteps"],
      },
    },
  });

  const jsonString = response.text.trim();
  const result = JSON.parse(jsonString);

  return result as AnalysisReport;
};
