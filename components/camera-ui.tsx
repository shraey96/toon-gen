"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Countdown from "./countdown";

interface CameraUIProps {
  previewUrl: string | null;
  error: string | null;
  handleFile: (file: File) => Promise<void>;
  handleCancel: () => void;
}

export default function CameraUI({
  previewUrl,
  error,
  handleFile,
  handleCancel,
}: CameraUIProps) {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [tempPhotoUrl, setTempPhotoUrl] = useState<string | null>(null);
  const [isCameraMode, setIsCameraMode] = useState(false);

  const startCamera = async () => {
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setIsCameraMode(true);
      setTempPhotoUrl(null);
    } catch (err) {
      console.error("Camera permission denied:", err);
      setIsCameraMode(false);
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
    setIsCameraMode(false);
    setTempPhotoUrl(null);
    setIsCountingDown(false);
  };

  const startCountdown = () => {
    setIsCountingDown(true);
  };

  const handleCountdownComplete = () => {
    capturePhoto();
    setIsCountingDown(false);
  };

  const capturePhoto = () => {
    const video = document.querySelector("video");
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const tempUrl = canvas.toDataURL("image/jpeg");
    setTempPhotoUrl(tempUrl);
  };

  const confirmPhoto = () => {
    if (!tempPhotoUrl) return;

    const canvas = document.createElement("canvas");
    const img = document.createElement("img");
    img.src = tempPhotoUrl;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "camera-capture.jpg", {
            type: "image/jpeg",
          });
          handleFile(file);
          stopCamera();
          setTempPhotoUrl(null);
        }
      }, "image/jpeg");
    };
  };

  const retakePhoto = () => {
    setTempPhotoUrl(null);
    setIsCountingDown(false);
  };

  const instantCapture = () => {
    capturePhoto();
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="flex flex-col justify-center h-full space-y-4">
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
      ) : isCameraMode ? (
        <div className="relative w-full aspect-video">
          <video
            autoPlay
            playsInline
            className={`w-full h-full rounded-lg ${
              tempPhotoUrl ? "hidden" : ""
            }`}
            ref={(videoEl) => {
              if (videoEl && videoStream) {
                videoEl.srcObject = videoStream;
              }
            }}
          />
          {tempPhotoUrl && (
            <div className="relative w-full aspect-video">
              <Image
                src={tempPhotoUrl}
                alt="Captured photo"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
          {isCountingDown && !tempPhotoUrl && (
            <Countdown initialCount={5} onComplete={handleCountdownComplete} />
          )}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            {tempPhotoUrl ? (
              <>
                <button
                  onClick={confirmPhoto}
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-200"
                  title="Use Photo"
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
                <button
                  onClick={retakePhoto}
                  className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full transition-all duration-200"
                  title="Retake Photo"
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
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-200"
                  title="Close Camera"
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
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={instantCapture}
                  disabled={isCountingDown}
                  className={`bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full transition-all duration-200 ${
                    isCountingDown ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  title="Capture Now"
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
                </button>
                <button
                  onClick={startCountdown}
                  disabled={isCountingDown}
                  className={`bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-200 ${
                    isCountingDown ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  title={isCountingDown ? `Capturing in 5s` : "5s Timer"}
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
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-200"
                  title="Close Camera"
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
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFile(file);
                }
              }}
              className="hidden"
              id="camera-file-upload"
            />
            <label
              htmlFor="camera-file-upload"
              className="cursor-pointer block space-y-4 p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              <div className="animate-pulse">
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
            </label>
          </div>

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

          <button
            onClick={startCamera}
            className="w-full p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-200"
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
              className="h-8 w-8 text-purple-400 mx-auto mb-4"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <p className="text-white/70 text-center">
              Take a picture
              <br />
              <span className="text-sm">Using your device camera</span>
            </p>
          </button>
        </div>
      )}
      {error && (
        <p className="text-red-400 text-sm text-center mt-4 mb-2">{error}</p>
      )}
    </div>
  );
}
