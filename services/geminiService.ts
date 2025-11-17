
import { GoogleGenAI, Type } from "@google/genai";
import { FetchedProjectInfo } from "../types";

// Initialize the AI client. This assumes process.env.API_KEY is set in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProjectInfoFromUrl = async (url: string): Promise<FetchedProjectInfo> => {
  const prompt = `
    Analyze the content of the website at the following URL: ${url}.
    Based on the content, generate a comprehensive project summary. If it's a GitHub repo, analyze the README and code structure. If it's a live website, analyze its purpose and features.

    Provide the following details in a JSON object:
    1.  "name": A suitable project name.
    2.  "description": A concise one-paragraph project description.
    3.  "tags": An array of 3-5 relevant technology tags.
    4.  "caseStudy": An object with the following fields, each written as a detailed paragraph:
        - "problem": What problem does this project solve? What was the primary challenge?
        - "role": What was the likely role of the creator? (e.g., 'Lead Developer', 'UI/UX Designer').
        - "process": Briefly describe the likely development process or technical approach.
        - "outcome": What is the result or impact of this project?
        - "imageUrl": A placeholder image URL from placehold.co, formatted as 'https://placehold.co/1200x600/HEX/HEX/png?text=Project+Name'. Replace HEX codes and the Project+Name appropriately based on the project.

    Respond ONLY with a valid JSON object matching this structure. Do not include any other text or markdown formatting.
  `;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          tags: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          caseStudy: {
            type: Type.OBJECT,
            properties: {
              problem: { type: Type.STRING },
              role: { type: Type.STRING },
              process: { type: Type.STRING },
              outcome: { type: Type.STRING },
              imageUrl: { type: Type.STRING },
            },
            required: ['problem', 'role', 'process', 'outcome', 'imageUrl']
          }
        },
        required: ['name', 'description', 'tags', 'caseStudy']
      }
    }
  });

  const text = response.text.trim();
  const parsed = JSON.parse(text);

  return parsed as FetchedProjectInfo;
};

// Fix: Add getAICodeReview function for SimulationModal.tsx
export const getAICodeReview = async (codeSnippet: string): Promise<string> => {
  const prompt = `
    Please act as an expert code reviewer. Analyze the following code snippet and provide a brief, constructive review.
    Focus on:
    1.  Code clarity and readability.
    2.  Potential bugs or edge cases.
    3.  Best practices and possible improvements.

    Format your response in simple markdown.

    Here is the code:
    \`\`\`
    ${codeSnippet}
    \`\`\`
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text;
};