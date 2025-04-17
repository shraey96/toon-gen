"use client";

import { useState, useRef } from "react";
import { isMobile } from "@/lib/utils";

interface CameraUIMobileProps {
  error: string | null;
  handleFile: (file: File) => void;
  handleCancel: () => void;
  disabled?: boolean;
  initialCameraType?: "user" | "environment";
}

export default function CameraUIMobile({
  error,
  handleFile,
  handleCancel,
  disabled = false,
  initialCameraType = "environment",
}: CameraUIMobileProps) {
  const [currentCamera, setCurrentCamera] = useState<"user" | "environment">(
    initialCameraType
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openNativeCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const switchCamera = () => {
    const newCamera = currentCamera === "user" ? "environment" : "user";
    setCurrentCamera(newCamera);
  };

  if (!isMobile()) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-6 items-center">
      <div className="w-full max-w-md mx-auto">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture={currentCamera}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />

        <div className="bg-black/20 p-8 rounded-lg flex flex-col items-center justify-center space-y-8">
          <div className="text-center">
            <div className="inline-block p-4 bg-purple-500/20 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-400"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">
              {currentCamera === "user" ? "Front Camera" : "Rear Camera"}
            </h3>
            <p className="text-white/70 text-sm">
              Take a photo using your device's camera
            </p>
          </div>

          <div className="flex flex-col w-full space-y-3">
            <button
              onClick={openNativeCamera}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
              disabled={disabled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              </svg>
              <span>Take Photo</span>
            </button>

            <button
              onClick={switchCamera}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
              disabled={disabled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 2v6h6" />
                <path d="M3 13a9 9 0 1 0 3-7.7L3 8" />
              </svg>
              <span>
                Switch to {currentCamera === "user" ? "Rear" : "Front"} Camera
              </span>
            </button>

            <button
              onClick={handleCancel}
              className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
              disabled={disabled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center mt-4 mb-2">{error}</p>
      )}
    </div>
  );
}
