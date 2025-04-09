"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface FileDropUIProps {
  previewUrl: string | null;
  error: string | null;
  handleFile: (file: File) => void;
  handleCancel: () => void;
  disabled?: boolean;
}

export default function FileDropUI({
  previewUrl,
  error,
  handleFile,
  handleCancel,
  disabled = false,
}: FileDropUIProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div
      className={`h-full ${isDragging ? "bg-white/10" : ""} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
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
          disabled={disabled}
        />
        <label
          htmlFor="file-upload"
          className={`cursor-pointer block space-y-4 ${
            disabled ? "cursor-not-allowed" : ""
          }`}
        >
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
                  if (disabled) return;
                  e.preventDefault();
                  handleCancel();
                }}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white/70 hover:text-white p-2 rounded-full transition-all duration-200"
                disabled={disabled}
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
            <div className="space-y-6">
              <div className="space-y-4">
                <div
                  className={`animate-pulse ${disabled ? "opacity-50" : ""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-purple-400 mx-auto"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <p className="text-white/70 text-center">
                  Upload from device
                  <br />
                  <span className="text-sm">
                    Supported: JPG, PNG, WEBP (Max 5MB)
                  </span>
                </p>
              </div>
            </div>
          )}
        </label>
      </div>
      {error && (
        <p className="text-red-400 text-sm text-center mt-4 mb-2">{error}</p>
      )}
    </div>
  );
}
