"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/file-uploader";
import StyleSelector from "@/components/style-selector";

export default function AppPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleStyleSelect = (styleName: string) => {
    setSelectedStyle(styleName);
  };

  const handleGenerateImage = () => {
    console.log("Generating image...", selectedFile, selectedStyle);
  };

  return (
    <main className="flex-1 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[600px]">
          <div className="flex flex-col min-h-[500px] lg:min-h-0">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Upload Your Photo
            </h2>
            <div className="flex-1">
              <FileUploader onFileSelect={handleFileSelect} />
            </div>
          </div>

          <div className="flex flex-col min-h-[500px] lg:min-h-0">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Choose Your Style
            </h2>
            <div className="flex-1">
              <StyleSelector
                selectedStyle={selectedStyle}
                onStyleSelect={handleStyleSelect}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="bg-lime-400 text-black hover:bg-lime-300 text-lg transition-all duration-300 shadow-lg hover:shadow-lime-400/20"
            disabled={!selectedFile || !selectedStyle || isGenerating}
            onClick={handleGenerateImage}
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Generating...
              </div>
            ) : (
              "Generate Image"
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
