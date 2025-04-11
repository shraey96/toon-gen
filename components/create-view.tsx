"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/file-uploader";
import StyleSelector from "@/components/style-selector";
import GenerationLoader from "@/components/generation-loader";
import GeneratedImageModal from "@/components/generated-image-modal";
import {
  generateToonImage,
  ImageGenerationStyle,
} from "@/lib/image-generation";
import { GeneratedImage } from "./app-tabs";
import { APP_STYLES } from "@/constants/styles";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

interface CreateViewProps {
  onImageGenerated: (image: Omit<GeneratedImage, "timestamp">) => void;
}

export default function CreateView({ onImageGenerated }: CreateViewProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] =
    useState<ImageGenerationStyle | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleStyleSelect = (styleName: ImageGenerationStyle | null) => {
    setSelectedStyle(styleName);
    trackAnalytics(ANALYTICS_EVENTS.STYLE_SELECTED, {
      style: styleName,
    });
  };

  const handleGenerateImage = async () => {
    if (!selectedFile || !selectedStyle) {
      console.error("Please select both an image and a style");
      return;
    }

    trackAnalytics(ANALYTICS_EVENTS.GENERATE_IMAGE_CLICKED, {
      style: selectedStyle,
    });

    setIsGenerating(true);
    loaderRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    try {
      const result = await generateToonImage(selectedFile, selectedStyle);

      if (result.success && result.imageUrl) {
        toast.success("Image generated successfully");
        setGeneratedImageUrl(result.imageUrl);
        onImageGenerated({
          url: result.imageUrl,
          style:
            APP_STYLES.find((s) => s.style === selectedStyle)?.name ||
            selectedStyle,
          styleType: selectedStyle,
          id: result.id || "",
        });
        setShowModal(true);
      } else {
        console.error("Failed to generate image:", result.error);
        toast.error("Failed to generate image: " + result.error);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-black to-gray-900">
      <div
        className="container px-4 py-4 sm:py-8 animate-in fade-in slide-in-from-bottom-4"
        style={{ animationDelay: "150ms", animationFillMode: "both" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 min-h-[auto] lg:min-h-[600px]">
          <div className="flex flex-col min-h-[300px] sm:min-h-[500px] lg:min-h-0">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 sm:mb-6">
              Upload Your Photo
            </h2>
            <div className="flex-1">
              <FileUploader
                withCamera
                disabled={isGenerating}
                onFileSelect={(file) => file && handleFileSelect(file)}
              />
            </div>
          </div>

          <div className="flex flex-col min-h-[300px] sm:min-h-[500px] lg:min-h-0">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 sm:mb-6">
              Choose Your Style
            </h2>
            <div className="flex-1">
              <StyleSelector
                selectedStyle={selectedStyle}
                onStyleSelect={handleStyleSelect}
                disabled={isGenerating}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-8 flex flex-col items-center gap-4">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-lime-400 text-black hover:bg-lime-300 text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-lime-400/20"
            disabled={!selectedFile || !selectedStyle || isGenerating}
            onClick={handleGenerateImage}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Generating...
              </div>
            ) : (
              "Generate Image"
            )}
          </Button>

          {generatedImageUrl && !isGenerating && (
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10"
              onClick={() => setShowModal(true)}
            >
              View Generated Image
            </Button>
          )}

          <div ref={loaderRef}>
            <GenerationLoader isGenerating={isGenerating} />
          </div>
        </div>
      </div>

      <GeneratedImageModal
        showModal={showModal}
        imageUrl={generatedImageUrl}
        onClose={() => setShowModal(false)}
        images={[]}
        currentImageIndex={0}
        onNavigate={() => {}}
      />
    </div>
  );
}
