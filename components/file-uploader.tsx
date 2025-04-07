"use client";

import { useState } from "react";
import { convertToPNG } from "@/lib/image-utils";
import FileDropUI from "./file-drop-ui";
import CameraUI from "./camera-ui";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  withCamera?: boolean;
}

export default function FileUploader({
  onFileSelect,
  withCamera = false,
}: FileUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return false;
    }
    return true;
  };

  const handleFile = async (file: File) => {
    setError(null);
    if (validateFile(file)) {
      try {
        let processedFile = file;
        if (
          ["image/webp", "image/jpeg"].includes(file.type) &&
          file.size > 5 * 1024 * 1024
        ) {
          processedFile = await convertToPNG(file);
        }
        onFileSelect(processedFile);
        const url = URL.createObjectURL(processedFile);
        setPreviewUrl(url);
      } catch (error) {
        setError("Failed to process image");
        console.error("Error processing image:", error);
      }
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    setError(null);
    onFileSelect(null);
    // Reset the file input
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="border-2 border-dashed rounded-xl p-6 bg-white/5 backdrop-blur-sm transition-all duration-300 h-full border-white/20 hover:border-purple-400/50 hover:bg-white/10">
      {withCamera ? (
        <CameraUI
          onFileSelect={onFileSelect}
          previewUrl={previewUrl}
          error={error}
          validateFile={validateFile}
          handleFile={handleFile}
          handleCancel={handleCancel}
        />
      ) : (
        <FileDropUI
          onFileSelect={onFileSelect}
          previewUrl={previewUrl}
          error={error}
          validateFile={validateFile}
          handleFile={handleFile}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
}
