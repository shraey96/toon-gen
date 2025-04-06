"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Maximize2 } from "lucide-react";
import { GeneratedImage } from "./app-tabs";
import GeneratedImageModal from "./generated-image-modal";

interface GalleryViewProps {
  images: GeneratedImage[];
}

export default function GalleryView({ images }: GalleryViewProps) {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const handleDownload = async (imageUrl: string) => {
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

  const showImageModal = (image: GeneratedImage) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  if (images.length === 0) {
    return (
      <div className="flex-1 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 py-4 sm:py-8 flex items-center justify-center min-h-[600px]">
          <div className="text-center max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              No Images Yet
            </h2>
            <p className="text-white/60">
              Generate some images in the Create tab to see them here!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in duration-500">
          {images.map((image) => (
            <div
              key={image.timestamp}
              className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
              onClick={() => showImageModal(image)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src={image.url}
                alt={`Generated image in ${image.style} style`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                      {image.style}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 bg-black/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(image.url);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 bg-black/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          showImageModal(image);
                        }}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <GeneratedImageModal
          imageUrl={selectedImage?.url || null}
          showModal={showModal}
          timestamp={selectedImage?.timestamp}
          style={selectedImage?.style}
          onClose={() => {
            setShowModal(false);
            setSelectedImage(null);
          }}
        />
      </div>
    </div>
  );
}
