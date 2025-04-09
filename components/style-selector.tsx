"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { APP_STYLES } from "@/constants/styles";
import { ImageGenerationStyle } from "@/lib/image-generation";

interface StyleSelectorProps {
  selectedStyle: ImageGenerationStyle | null;
  onStyleSelect: (styleName: ImageGenerationStyle | null) => void;
  disabled?: boolean;
}

export default function StyleSelector({
  selectedStyle,
  onStyleSelect,
  disabled = false,
}: StyleSelectorProps) {
  return (
    <div
      className={`border-2 border-white/20 rounded-xl p-6 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 h-full overflow-y-auto ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {APP_STYLES.map((style) => {
          const isStyleSelected = selectedStyle === style.style;
          return (
            <div
              key={style.style}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group ${
                isStyleSelected
                  ? "ring-2 ring-lime-400 scale-[1.02] shadow-xl shadow-lime-400/20"
                  : "border border-white/10 hover:border-white/30"
              } ${disabled ? "cursor-not-allowed" : ""}`}
              onClick={() => {
                if (disabled) return;
                onStyleSelect(
                  isStyleSelected ? null : (style.style as ImageGenerationStyle)
                );
              }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent z-10 group-hover:from-black/20 transition-all duration-300" />
                {isStyleSelected && (
                  <div className="absolute inset-0 bg-lime-400/10 z-10 animate-pulse" />
                )}
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className={`object-cover transition-transform duration-300 ${
                    disabled ? "" : "group-hover:scale-105"
                  }`}
                />
                <div className="absolute top-2 left-2 z-20">
                  {isStyleSelected && (
                    <div className="bg-lime-400 text-black rounded-full p-1 shadow-xl animate-in fade-in zoom-in">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge
                    className={`${style.badgeColor} ${style.textColor} ${style.hoverColor} border-none scale-110 shadow-xl`}
                  >
                    <Sparkles className="h-3 w-3 mr-1" /> {style.name}
                  </Badge>
                </div>
                <Badge
                  className={`absolute bottom-2 right-2 z-20 ${style.badgeColor} ${style.textColor} ${style.hoverColor} border-none group-hover:opacity-0 transition-opacity duration-300`}
                >
                  <Sparkles className="h-3 w-3 mr-1" /> {style.name}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
