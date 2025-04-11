"use client";

import { useState, ReactNode } from "react";

interface FileDropUIProps {
  children: ReactNode;
  onFileDrop: (file: File) => void;
  showDropOverlay?: boolean;
}

export default function FileDropUI({
  children,
  onFileDrop,
  showDropOverlay = true,
}: FileDropUIProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileDrop(file);
    }
  };

  return (
    <div
      className={
        "relative border-2 border-dashed rounded-xl p-12 bg-white/5 backdrop-blur-sm transition-all duration-300 h-full border-white/20 hover:border-purple-400/50"
      }
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && showDropOverlay && (
        <div className="absolute inset-0 bg-white/10 rounded-xl flex items-center justify-center">
          <p className="text-white/70 text-center">Drop your image here</p>
        </div>
      )}
      <div className="flex flex-col h-full justify-center">{children}</div>
    </div>
  );
}
