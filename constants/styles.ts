import pixarImage from "@/images/styles/pixar.png";
import modernGhibliImage from "@/images/styles/modern_ghibli.png";
import southparkImage from "@/images/styles/southpark.png";
import vintageImage from "@/images/styles/vintage.png";

export const APP_STYLES = [
  {
    name: "Pixar",
    style: "PIXAR",
    image: pixarImage,
    badgeColor: "bg-lime-400/90",
    textColor: "text-black",
    hoverColor: "hover:bg-lime-400",
    description:
      "Transform your images into vibrant, 3D-rendered characters with Pixar's signature style. Perfect for creating playful, expressive characters with smooth surfaces and rich textures.",
  },
  {
    name: "Modern Ghibli",
    style: "MODERN_GHIBLI",
    image: modernGhibliImage,
    badgeColor: "bg-purple-400/90",
    textColor: "text-white",
    hoverColor: "hover:bg-purple-400",
    description:
      "Capture the magical essence of Studio Ghibli with soft, dreamy aesthetics. This style brings out the whimsical and emotional qualities of your images with gentle colors and flowing details.",
  },
  {
    name: "South Park",
    style: "SOUTH_PARK",
    image: southparkImage,
    badgeColor: "bg-pink-400/90",
    textColor: "text-white",
    hoverColor: "hover:bg-pink-400",
    description:
      "Convert your photos into the iconic South Park paper-cutout style. This transformation creates simple, bold characters with distinctive outlines and flat colors, perfect for comedic and satirical effects.",
  },
  {
    name: "Vintage",
    style: "VINTAGE",
    image: vintageImage,
    badgeColor: "bg-amber-400/90",
    textColor: "text-black",
    hoverColor: "hover:bg-amber-400",
    description:
      "Give your images a timeless, nostalgic look with our vintage style. This transformation adds warm, sepia tones and subtle grain effects to create a classic, retro aesthetic reminiscent of old photographs.",
  },
];
