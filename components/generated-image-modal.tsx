"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { X, Download, Share2, Clock, Sparkles, Loader2 } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useKeydown } from "@/hooks/use-keydown";
import { GeneratedImage } from "./app-tabs";
import { isMobile } from "@/lib/utils";
import { getShareableImageUrl, downloadImage } from "@/lib/image-utils";

interface GeneratedImageModalProps {
  imageUrl: string | null;
  showModal: boolean;
  onClose: () => void;
  timestamp?: number;
  style?: string;
  images: GeneratedImage[];
  currentImageIndex: number;
  onNavigate: (index: number) => void;
  generatedImageId: string | null;
}

export default function GeneratedImageModal({
  imageUrl,
  showModal,
  onClose,
  timestamp,
  style,
  images,
  currentImageIndex,
  onNavigate,
  generatedImageId,
}: GeneratedImageModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);

  // Minimum swipe distance for navigation (in pixels)
  const minSwipeDistance = 50;

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

  // Reset animation state when image changes
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection(null);
      }, 300); // Match this with CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const closeModal = () => {
    setIsFullscreen(false);
    onClose();
  };

  useOutsideClick({
    ref: modalRef as React.RefObject<HTMLElement>,
    callback: closeModal,
    enabled: showModal,
  });

  useKeydown({
    key: "Escape",
    callback: closeModal,
    enabled: showModal,
  });

  useKeydown({
    key: "ArrowLeft",
    callback: () => {
      if (currentImageIndex > 0) {
        setSlideDirection("right");
        setIsAnimating(true);
        onNavigate(currentImageIndex - 1);
      }
    },
    enabled: showModal,
  });

  useKeydown({
    key: "ArrowRight",
    callback: () => {
      if (currentImageIndex < images.length - 1) {
        setSlideDirection("left");
        setIsAnimating(true);
        onNavigate(currentImageIndex + 1);
      }
    },
    enabled: showModal,
  });

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentImageIndex < images.length - 1) {
      setSlideDirection("left");
      setIsAnimating(true);
      onNavigate(currentImageIndex + 1);
    }

    if (isRightSwipe && currentImageIndex > 0) {
      setSlideDirection("right");
      setIsAnimating(true);
      onNavigate(currentImageIndex - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!showModal || !imageUrl) return null;

  const handleDownload = async () => {
    if (imageUrl) {
      await downloadImage(imageUrl);
    }
  };
  const currentImage = images[currentImageIndex];

  const handleShare = async () => {
    const shareUrl = getShareableImageUrl(
      currentImage?.id || generatedImageId || ""
    );
    try {
      if (isMobile() && navigator.share && shareUrl) {
        await navigator.share({
          title: "Check out my AI-generated artwork!",
          text: "Created with ZappyToon",
          url: shareUrl,
        });
      } else {
        // On desktop or if Web Share API is not available, copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Image URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback to copying URL
      if (shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Image URL copied to clipboard!");
      }
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setSlideDirection("right");
      setIsAnimating(true);
      onNavigate(currentImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      setSlideDirection("left");
      setIsAnimating(true);
      onNavigate(currentImageIndex + 1);
    }
  };

  const getSlideAnimation = () => {
    if (!isAnimating) return "";
    if (slideDirection === "left") {
      return "animate-in slide-in-from-right duration-300";
    }
    if (slideDirection === "right") {
      return "animate-in slide-in-from-left duration-300";
    }
    return "";
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
            className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 transition-colors"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 text-lime-400 hover:text-lime-300 hover:bg-lime-400/10 transition-colors"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
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
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-white" />
            </div>
          )}
          <div className={`relative w-full h-full ${getSlideAnimation()}`}>
            <Image
              src={imageUrl}
              alt="Generated image"
              fill
              className="object-contain"
              onLoadingComplete={() => setIsLoading(false)}
              draggable={false}
              priority
            />
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            {currentImageIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-12 sm:w-12 text-white/70 hover:text-white hover:bg-white/10 pointer-events-auto ml-1 sm:ml-2"
                onClick={handlePrevious}
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
                  className="h-4 w-4 sm:h-6 sm:w-6"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
            )}
            {currentImageIndex < images.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-12 sm:w-12 text-white/70 hover:text-white hover:bg-white/10 pointer-events-auto mr-1 sm:mr-2"
                onClick={handleNext}
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
                  className="h-4 w-4 sm:h-6 sm:w-6"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            )}
          </div>
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
              className="bg-white/5 border-purple-400/20 text-purple-400 hover:bg-purple-400/10 hover:text-purple-300 w-full sm:w-auto transition-colors"
              onClick={handleShare}
            >
              <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border-lime-400/20 text-lime-400 hover:bg-lime-400/10 hover:text-lime-300 w-full sm:w-auto transition-colors"
              onClick={handleDownload}
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 w-full sm:w-auto transition-colors"
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
