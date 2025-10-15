
import { GoogleGenAI, Modality } from "@google/genai";
import { GenerationType, ImageFile } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPromptForGenerationType = (type: GenerationType, location?: string): string => {
  switch (type) {
    case GenerationType.Wedding:
      return "Create a photorealistic, beautiful, and happy wedding photo of these two people. They should be dressed in elegant modern wedding attire (a beautiful white dress for the woman and a sharp suit for the man), smiling lovingly at each other. The setting should be a romantic and picturesque outdoor location, like a garden or a beach at sunset. The final image should be high-quality and look like a professional photograph.";
    case GenerationType.Baby:
      return "Based on the facial features of these two people, generate a photorealistic and adorable image of what their future baby might look like as a happy and healthy toddler (around 2 years old). The image should be a clear portrait of the child's face.";
    case GenerationType.Location:
      return `Create a photorealistic, vibrant, and happy couple's photo of these two people enjoying themselves at the following location: ${location}. They should look like they are on vacation, in love, and dressed appropriately for the location. The image should capture the essence and atmosphere of the place.`;
    default:
      throw new Error("Invalid generation type");
  }
};

export const generateImage = async (
  person1Image: ImageFile,
  person2Image: ImageFile,
  type: GenerationType,
  location?: string
): Promise<string> => {

  const prompt = getPromptForGenerationType(type, location);

  const model = 'gemini-2.5-flash-image';

  const imagePart1 = {
    inlineData: {
      data: person1Image.base64,
      mimeType: person1Image.mimeType,
    },
  };

  const imagePart2 = {
    inlineData: {
      data: person2Image.base64,
      mimeType: person2Image.mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [imagePart1, imagePart2, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error('No image data found in the API response.');

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate image due to an API error.");
  }
};
