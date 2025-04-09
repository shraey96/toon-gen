import { FUNCTIONS_URL } from "@/constants/api";

export type ImageGenerationStyle = "GHIBLI" | "PIXAR" | "DISNEY" | "SOUTH_PARK";

export interface ImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  id?: string;
  error?: string;
}

export async function generateToonImage(
  imageFile: File,
  style: ImageGenerationStyle
): Promise<ImageGenerationResponse> {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("style", style);

    const response = await fetch(`${FUNCTIONS_URL}/toon-gen`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    return {
      success: true,
      imageUrl: data.imageUrl,
      id: data.id,
    };
  } catch (error) {
    console.error("Error generating toon image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
