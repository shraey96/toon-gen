"use client";

import { useState, useEffect } from "react";
import { Sparkles, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateView from "@/components/create-view";
import GalleryView from "@/components/gallery-view";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

export interface GeneratedImage {
  url: string;
  timestamp: number;
  style: string;
  styleType: string;
  id: string;
}

export default function AppTabs() {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  useEffect(() => {
    // Load images from localStorage on component mount
    const storedImages = localStorage.getItem("generatedImages");
    if (storedImages) {
      setGeneratedImages(JSON.parse(storedImages));
    }
  }, []);

  const addGeneratedImage = (image: Omit<GeneratedImage, "timestamp">) => {
    const newImage = {
      ...image,
      timestamp: Date.now(),
    };
    const newImages = [newImage, ...generatedImages];
    setGeneratedImages(newImages);
    localStorage.setItem("generatedImages", JSON.stringify(newImages));
  };

  const removeExpiredImages = () => {
    const now = Date.now();
    const validImages = generatedImages.filter(
      (image) => now - image.timestamp < 24 * 60 * 60 * 1000
    );
    if (validImages.length !== generatedImages.length) {
      setGeneratedImages(validImages);
      localStorage.setItem("generatedImages", JSON.stringify(validImages));
    }
  };

  const handleDeleteImage = (imageToDelete: GeneratedImage) => {
    const newImages = generatedImages.filter(
      (image) => image.timestamp !== imageToDelete.timestamp
    );
    setGeneratedImages(newImages);
    localStorage.setItem("generatedImages", JSON.stringify(newImages));
  };

  useEffect(() => {
    // Check for expired images every hour
    const interval = setInterval(removeExpiredImages, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [generatedImages]);

  const handleTabChange = (value: string) => {
    trackAnalytics(ANALYTICS_EVENTS.TAB_CHANGED, {
      tab: value,
    });
  };

  return (
    <Tabs
      defaultValue="create"
      className="w-full"
      onValueChange={handleTabChange}
    >
      <div className="container py-4">
        <TabsList className="h-12 p-1 bg-transparent">
          <TabsTrigger
            value="create"
            className="relative h-10 px-6 rounded-md data-[state=active]:bg-lime-400/10 data-[state=active]:text-lime-400 hover:bg-white/5 data-[state=active]:shadow-none transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">Create</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className="relative h-10 px-6 rounded-md data-[state=active]:bg-purple-400/10 data-[state=active]:text-purple-400 hover:bg-white/5 data-[state=active]:shadow-none transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="font-medium">Gallery</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="create" className="mt-0 border-none">
        <CreateView onImageGenerated={addGeneratedImage} />
      </TabsContent>
      <TabsContent value="gallery" className="mt-0 border-none">
        <GalleryView images={generatedImages} onDelete={handleDeleteImage} />
      </TabsContent>
    </Tabs>
  );
}
