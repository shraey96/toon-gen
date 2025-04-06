"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface GenerationLoaderProps {
  isGenerating: boolean;
}

const GENERATION_STAGES = [
  { progress: 15, message: "Analyzing your image..." },
  { progress: 35, message: "Applying artistic style..." },
  { progress: 65, message: "Generating masterpiece..." },
  { progress: 85, message: "Adding final touches..." },
  { progress: 95, message: "Almost there..." },
];

export default function GenerationLoader({
  isGenerating,
}: GenerationLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState<string>("");

  useEffect(() => {
    if (isGenerating) {
      setProgress(0);
      let currentStageIndex = 0;

      const progressInterval = setInterval(() => {
        if (currentStageIndex < GENERATION_STAGES.length) {
          const { progress, message } = GENERATION_STAGES[currentStageIndex];
          setProgress(progress);
          setProgressStage(message);
          currentStageIndex++;
        }
      }, 12000 / GENERATION_STAGES.length); // Spread stages across ~12 seconds

      return () => {
        clearInterval(progressInterval);
        setProgress(0);
        setProgressStage("");
      };
    }
  }, [isGenerating]);

  if (!isGenerating) return null;

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-white/70">
          <span>{progressStage}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <div className="animate-pulse">
            <Sparkles className="h-5 w-5 text-purple-400" />
          </div>
          <p className="text-sm text-white/60">
            Please wait while we create your masterpiece...
          </p>
        </div>
      </div>
    </div>
  );
}
