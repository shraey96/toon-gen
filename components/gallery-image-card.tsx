"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Maximize2, Trash2 } from "lucide-react";
import { GeneratedImage } from "./app-tabs";
import { PLACEHOLDER_COLORS } from "@/constants/colors";

const getRandomColor = () => {
  return PLACEHOLDER_COLORS[
    Math.floor(Math.random() * PLACEHOLDER_COLORS.length)
  ];
};

interface GalleryImageCardProps {
  image: GeneratedImage;
  onDownload: (imageUrl: string) => void;
  onView: (image: GeneratedImage) => void;
  onDelete?: (image: GeneratedImage) => void;
}

export default function GalleryImageCard({
  image,
  onDownload,
  onView,
  onDelete,
}: GalleryImageCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [placeholderColor] = useState(getRandomColor());

  return (
    <div
      className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
      onClick={() => onView(image)}
    >
      {/* Placeholder color */}
      <div
        className={`absolute inset-0 ${placeholderColor} ${
          isLoading ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Image
        src={image.url}
        alt={`Generated image in ${image.style} style`}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
        className={`object-cover transition-all duration-500 group-hover:scale-[1.05] ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] sm:text-xs text-white bg-black/50 px-1.5 sm:px-2 py-0.5 rounded-full truncate max-w-[100px] sm:max-w-[120px]">
              {image.style}
            </span>
            <div className="flex gap-0.5 sm:gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 sm:h-7 sm:w-7 text-white hover:bg-white/10 bg-black/50"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(image.url);
                }}
              >
                <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 sm:h-7 sm:w-7 text-white hover:bg-white/10 bg-black/50"
                onClick={(e) => {
                  e.stopPropagation();
                  onView(image);
                }}
              >
                <Maximize2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 sm:h-7 sm:w-7 text-white hover:bg-red-500/20 hover:text-red-500 bg-black/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(image);
                  }}
                >
                  <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
