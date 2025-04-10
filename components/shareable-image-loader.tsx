"use client";

import { useEffect, useState } from "react";
import { getRandomColor } from "@/lib/utils";

export function ShareableImageLoader() {
  const [currentColor, setCurrentColor] = useState(getRandomColor());
  const isLoading = true;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor(getRandomColor());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
      <div
        className={`w-full h-full transition-colors duration-1000 ${currentColor} ${
          isLoading ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      />
    </div>
  );
}
