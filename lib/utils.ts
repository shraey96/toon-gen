import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PLACEHOLDER_COLORS } from "@/constants/colors";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function getRandomColor(): string {
  return PLACEHOLDER_COLORS[
    Math.floor(Math.random() * PLACEHOLDER_COLORS.length)
  ];
}
