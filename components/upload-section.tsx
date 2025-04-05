"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
}

export default function UploadSection({ onFileSelect }: UploadSectionProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      onFileSelect(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
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
    <div className="border-2 border-dashed border-white/20 rounded-xl p-6 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10 h-full">
      <div className="flex flex-col justify-center h-full space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer block space-y-4">
          {previewUrl ? (
            <div className="relative w-full aspect-square max-h-[280px] lg:max-h-none">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-contain rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleCancel();
                }}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white/70 hover:text-white p-2 rounded-full transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <div className="animate-pulse">
                <Sparkles className="h-12 w-12 text-purple-400 mx-auto" />
              </div>
              <p className="text-white/70 text-center">
                Click to upload or drag and drop
                <br />
                Supported formats: JPG, PNG, WEBP
                <br />
                Max file size: 5MB
              </p>
            </>
          )}
        </label>
      </div>
      {error && (
        <p className="text-red-400 text-sm text-center mt-4 mb-2">{error}</p>
      )}
    </div>
  );
}
