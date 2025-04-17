"use client";

import { useState, useEffect } from "react";
import { convertToPNG } from "@/lib/image-utils";
import FileDropUI from "./file-drop-ui";
import FileUpload from "./file-upload";
import CameraUI from "./camera-ui";
import CameraUIMobile from "./camera-ui-mobile";
import Image from "next/image";
import { isMobile } from "@/lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

export default function FileUploader({
  onFileSelect,
  disabled = false,
}: FileUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [cameraType, setCameraType] = useState<"user" | "environment">(
    "environment"
  );

  const isUserOnMobile = isMobile();

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
    setIsCameraMode(false);
    // Reset the file input
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <FileDropUI
      onFileDrop={handleFile}
      showDropOverlay={!isCameraMode && !previewUrl}
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
      ) : isCameraMode ? (
        isUserOnMobile ? (
          <CameraUIMobile
            error={error}
            handleFile={handleFile}
            handleCancel={handleCancel}
            disabled={disabled}
            initialCameraType={cameraType}
          />
        ) : (
          <CameraUI
            error={error}
            handleFile={handleFile}
            handleCancel={handleCancel}
            disabled={disabled}
            initialCameraType={cameraType}
          />
        )
      ) : (
        <div className="space-y-8">
          <FileUpload
            error={error}
            handleFile={handleFile}
            handleCancel={handleCancel}
            disabled={disabled}
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#09090b] px-2 text-sm text-white/50">
                or
              </span>
            </div>
          </div>

          {isUserOnMobile ? (
            <button
              onClick={() => {
                setCameraType("environment");
                setIsCameraMode(true);
              }}
              className="w-full border border-white/20 rounded-lg p-4 hover:bg-white/5 transition-all duration-200"
            >
              <div className="space-y-2">
                <div className={`${disabled ? "opacity-50" : ""}`}>
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
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <p className="text-white/70 text-center">
                  Take a picture
                  <br />
                  <span className="text-sm">Using your device camera</span>
                </p>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setIsCameraMode(true)}
              className="w-full border border-white/20 rounded-lg p-8 hover:bg-white/5 transition-all duration-200"
            >
              <div className="space-y-4">
                <div className={`${disabled ? "opacity-50" : ""}`}>
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
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <p className="text-white/70 text-center">
                  Take a picture
                  <br />
                  <span className="text-sm">Using your device camera</span>
                </p>
              </div>
            </button>
          )}
        </div>
      )}
    </FileDropUI>
  );
}
