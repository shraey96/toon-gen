import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

export const convertToPNG = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Could not convert image to PNG"));
          return;
        }
        const newFile = new File(
          [blob],
          file.name.replace(/\.[^/.]+$/, ".png"),
          {
            type: "image/png",
          }
        );
        resolve(newFile);
      }, "image/png");
    };
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = URL.createObjectURL(file);
  });
};

export const getShareableImageUrl = (imageId: string) => {
  return `https://share.zappytoon.com/?img=${imageId}`;
};

export const downloadImage = async (imageUrl: string, extraConfig = {}) => {
  trackAnalytics(ANALYTICS_EVENTS.IMAGE_DOWNLOAD_CLICKED, {
    image_url: imageUrl,
    ...extraConfig,
  });
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};
