"use client";

import { useEffect, useState } from "react";
import { GeneratedImage } from "./app-tabs";
import GeneratedImageModal from "./generated-image-modal";
import GalleryImageCard from "./gallery-image-card";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";
interface GalleryViewProps {
  images: GeneratedImage[];
  onDelete?: (image: GeneratedImage) => void;
}

export default function GalleryView({ images, onDelete }: GalleryViewProps) {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(
    null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
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
    const index = images.findIndex((img) => img.timestamp === image.timestamp);
    setSelectedImageIndex(index);
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleNavigate = (index: number) => {
    setSelectedImageIndex(index);
    setSelectedImage(images[index]);
  };

  useEffect(() => {
    trackAnalytics(ANALYTICS_EVENTS.GALLERY_VIEWED, {
      images: images?.length ?? [],
    });
  }, []);

  if (images.length === 0) {
    return (
      <div className="flex-1 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 py-4 sm:py-8 flex items-center justify-center min-h-[400px] sm:min-h-[600px]">
          <div className="text-center max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">
              No Images Yet
            </h2>
            <p className="text-sm sm:text-base text-white/60">
              Generate some images in the Create tab to see them here!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-black to-gray-900">
      <div className="container max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 animate-in fade-in duration-500">
          {images.map((image) => (
            <GalleryImageCard
              key={image.timestamp}
              image={image}
              onDownload={handleDownload}
              onView={showImageModal}
              onDelete={onDelete}
            />
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
          images={images}
          currentImageIndex={selectedImageIndex}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}
