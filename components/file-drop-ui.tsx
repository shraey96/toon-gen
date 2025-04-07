"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface FileDropUIProps {
  previewUrl: string | null;
  error: string | null;
  handleFile: (file: File) => Promise<void>;
  handleCancel: () => void;
}

export default function FileDropUI({
  previewUrl,
  error,
  handleFile,
  handleCancel,
}: FileDropUIProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  return (
    <div
      className={`h-full ${isDragging ? "bg-white/10" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
