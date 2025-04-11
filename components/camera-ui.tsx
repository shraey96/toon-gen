"use client";

import { useState, useEffect, useRef } from "react";
import Countdown from "./countdown";

interface CameraUIProps {
  error: string | null;
  handleFile: (file: File) => void;
  handleCancel: () => void;
  disabled?: boolean;
}

export default function CameraUI({
  error,
  handleFile,
  handleCancel,
  disabled = false,
}: CameraUIProps) {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [tempPhotoUrl, setTempPhotoUrl] = useState<string | null>(null);
  const [currentCamera, setCurrentCamera] = useState<"user" | "environment">(
    "user"
  );
  const [hasBackCamera, setHasBackCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async (facingMode: "user" | "environment" = "user") => {
    try {
      // Stop any existing stream first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      streamRef.current = stream;
      setTempPhotoUrl(null);
      setCurrentCamera(facingMode);
    } catch (err) {
      console.error("Camera permission denied:", err);
    }
  };

  const handleSwitchCamera = async (e: React.MouseEvent) => {
    e.preventDefault();
    const newCamera = currentCamera === "user" ? "environment" : "user";
    await startCamera(newCamera);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
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
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
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
    startCamera(currentCamera);
  };

  const instantCapture = () => {
    capturePhoto();
  };

  // Check for back camera availability
  useEffect(() => {
    const checkCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasBackCam = devices.some(
          (device) =>
            device.kind === "videoinput" &&
            device.label.toLowerCase().includes("back")
        );
        setHasBackCamera(hasBackCam);
      } catch (err) {
        console.error("Error checking cameras:", err);
      }
    };
    checkCameras();
  }, []);

  // Start camera when component mounts and cleanup on unmount
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div
      className={`flex flex-col justify-center h-full space-y-4 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="relative w-full aspect-video">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`w-full h-full rounded-lg ${tempPhotoUrl ? "hidden" : ""}`}
        />
        {tempPhotoUrl && (
          <div className="relative w-full aspect-video">
            <img
              src={tempPhotoUrl}
              alt="Captured photo"
              className="w-full h-full object-contain rounded-lg"
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
              {hasBackCamera && (
                <button
                  onClick={handleSwitchCamera}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-200"
                  title="Switch Camera"
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
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => {
                  stopCamera();
                  handleCancel();
                }}
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
              {hasBackCamera && (
                <button
                  onClick={handleSwitchCamera}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-200"
                  title="Switch Camera"
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
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => {
                  stopCamera();
                  handleCancel();
                }}
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
      {error && (
        <p className="text-red-400 text-sm text-center mt-4 mb-2">{error}</p>
      )}
    </div>
  );
}
