import { GoogleGenAI, Modality, Part } from "@google/genai";
import { ImageFile } from '../types';

/**
 * Converts a File object to a base64 encoded string wrapped in a Gemini API Part object.
 * @param file The image file to convert.
 * @returns A promise that resolves to an InlineDataPart object for the Gemini API.
 */
const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        // The result includes the data URL prefix "data:image/jpeg;base64,", we need to remove it.
        const base64Data = reader.result.split(',')[1];
        resolve(base64Data);
      } else {
        reject(new Error("Failed to read file as data URL."));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

/**
 * Sends a prompt and image(s) to the Gemini API to be edited.
 * @param prompt The user's instructions in Arabic.
 * @param image1 The primary image file.
 * @param image2 An optional second image file for merging.
 * @returns An object containing the base64 string of the edited image and any text response.
 */
export const editImageWithPrompt = async (
  prompt: string,
  image1: ImageFile,
  image2: ImageFile | null
): Promise<{ editedImageB64: string | null; text: string }> => {
  // Use the environment variable as per guidelines
  // FIX: Per coding guidelines, the Gemini API key must be taken from `process.env.API_KEY`.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Prepare parts for the API request
  const requestParts: Part[] = [];

  // Add the first image (mandatory)
  requestParts.push(await fileToGenerativePart(image1.file));

  // Add the second image if it exists (optional)
  if (image2) {
    requestParts.push(await fileToGenerativePart(image2.file));
  }

  // Add the text prompt with instructions
  requestParts.push({ text: prompt });

  // Call the Gemini model for image editing
  // FIX: Using the correct model 'gemini-2.5-flash-image-preview' for image editing tasks as per the documentation.
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: requestParts,
    },
    // Request both image and text in the response modalities
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  // Process the response to extract the edited image and text
  let editedImageB64: string | null = null;
  let text = '';

  if (response.candidates && response.candidates.length > 0) {
    const candidate = response.candidates[0];
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        editedImageB64 = part.inlineData.data;
      } else if (part.text) {
        text += part.text + ' ';
      }
    }
  }

  return { editedImageB64, text: text.trim() };
};
