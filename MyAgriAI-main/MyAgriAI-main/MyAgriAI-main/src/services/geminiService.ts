
import { useToast } from "@/hooks/use-toast";

const GEMINI_API_KEY = "AIzaSyCOwPYTTog69qdsG1y6UyANS3gOjot3Fq4";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models";
const MODEL_NAME = "gemini-2.0-flash";

export interface GeminiTextRequest {
  prompt: string;
  image?: File | null;
}

export interface GeminiImageAnalysisRequest {
  image: File;
  prompt?: string;
}

export const generateGeminiResponse = async (request: GeminiTextRequest) => {
  try {
    let url = `${GEMINI_API_URL}/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
    let body: any = {
      contents: [
        {
          parts: [
            {
              text: request.prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048,
      }
    };

    // If there's an image, add it to the request
    if (request.image) {
      const base64Image = await convertImageToBase64(request.image);
      body.contents[0].parts.unshift({
        inline_data: {
          mime_type: request.image.type,
          data: base64Image
        }
      });
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || "No response from Gemini";
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    throw error;
  }
};

export const analyzeImageWithGemini = async (request: GeminiImageAnalysisRequest) => {
  try {
    const url = `${GEMINI_API_URL}/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
    const base64Image = await convertImageToBase64(request.image);
    
    const analysisPrompt = request.prompt || 
      "Analyze this crop or farm image. Provide detailed insights about: " +
      "1. Crop health status " +
      "2. Potential diseases or pests if visible " +
      "3. Growth stage assessment " +
      "4. Soil condition observations " +
      "5. Recommendations for improvement";

    const body = {
      contents: [
        {
          parts: [
            {
              inline_data: {
                mime_type: request.image.type,
                data: base64Image
              }
            },
            {
              text: analysisPrompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        topK: 32,
        topP: 1,
        maxOutputTokens: 2048,
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || "No analysis provided";
  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    throw error;
  }
};

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
