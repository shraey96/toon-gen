"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  X,
  Download,
  Maximize2,
  Minimize2,
  Clock,
  Sparkles,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useKeydown } from "@/hooks/use-keydown";

interface GeneratedImageModalProps {
  imageUrl: string | null;
  showModal: boolean;
  onClose: () => void;
  timestamp?: number;
  style?: string;
}

export default function GeneratedImageModal({
  imageUrl,
  showModal,
  onClose,
  timestamp,
  style,
}: GeneratedImageModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const closeModal = () => {
    setIsFullscreen(false);
    onClose();
  };

  useOutsideClick({
    ref: modalRef,
    callback: closeModal,
    enabled: showModal,
  });

  useKeydown({
    key: "Escape",
    callback: closeModal,
    enabled: showModal,
  });

  if (!showModal || !imageUrl) return null;

  const handleDownload = async () => {
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        ref={modalRef}
        className={`relative bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 rounded-xl p-2 sm:p-4 ${
          isFullscreen ? "w-full h-full max-w-none" : "max-w-4xl w-full"
        }`}
      >
        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 flex gap-1 sm:gap-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 text-white/70 hover:text-white hover:bg-white/10"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 text-white/70 hover:text-white hover:bg-white/10"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 text-white/70 hover:text-white hover:bg-white/10"
            onClick={closeModal}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        <div
          className={`relative ${
            isFullscreen
              ? "h-[calc(100vh-8rem)] sm:h-[calc(100vh-12rem)]"
              : "aspect-square max-h-[60vh] sm:max-h-[70vh]"
          } w-full rounded-lg overflow-hidden`}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-white" />
            </div>
          )}
          <Image
            src={imageUrl}
            alt="Generated image"
            fill
            className="object-contain"
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>

        <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-4">
          {(timestamp || style) && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/70">
              {style && (
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{style}</span>
                </div>
              )}
              {timestamp && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Created {formatDistanceToNow(timestamp)} ago</span>
                </div>
              )}
            </div>
          )}

          <div className="text-center text-xs sm:text-sm text-white/70 bg-white/5 rounded-lg p-2 sm:p-3">
            <p>⚠️ This image will be automatically deleted after 24 hours.</p>
            <p>Make sure to download it if you want to keep it!</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 w-full sm:w-auto"
              onClick={handleDownload}
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 w-full sm:w-auto"
              onClick={closeModal}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
