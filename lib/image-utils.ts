import { FUNCTIONS_URL } from "@/constants/api";

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
  return `${FUNCTIONS_URL}/toon-gen-share?id=${imageId}`;
};
