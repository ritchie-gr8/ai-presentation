"use server";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateCreativePrompt = async (userPrompt: string) => {
  const finalPrompt = `
        Create a coherent and relevant outline for the following prompt: ${userPrompt}.
        The outline should consist of at least 6 points, with each point written as a single sentence.
        Ensure the outline is well-structured and directly related to the topic.
        Return the output in the following JSON format:

        {
            "outlines": [
                "Point 1",
                "Point 2",
                "Point 3",
                "Point 4",
                "Point 5",
                "Point 6"
            ]
        }

        Ensure that the JSON is valid and properly formatted.
        Do not include any other text or explanations outside the JSON.
    `;

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(finalPrompt);
    const responseText = result.response.text();

    if (responseText) {
      try {
        const parsedResponse = JSON.parse(responseText);
        return { status: 200, data: parsedResponse };
      } catch (error) {
        console.error("Invalid JSON from Gemini", error);
        return { status: 500, error: "Invalid JSON from AI" };
      }
    }

    return { status: 400, error: "No content generated" };
  } catch (error) {
    console.error("🔴 ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};