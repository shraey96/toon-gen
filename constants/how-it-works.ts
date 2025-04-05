import { APP_STYLES } from "./styles";

export const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: "Select Your Perfect Shot",
    description:
      "Begin your artistic journey by choosing any image you'd like to transform. Whether it's a stunning landscape, a cherished memory, or your favorite portrait – our AI can work with any high-quality image you provide.",
    details: [
      "Compatible with all popular formats (JPG, PNG, WebP)",
      "Quick upload with drag & drop functionality",
      "Optimized for images up to 10MB",
    ],
    image: "/images/how-it-works/upload-preview.png",
  },
  {
    number: 2,
    title: "Explore Artistic Styles",
    description:
      "Dive into our curated collection of AI-powered artistic styles. Each style has been carefully crafted to transform your photos into stunning pieces of art that capture different moods and aesthetics.",
    styles: APP_STYLES,
    image: "/images/how-it-works/styles-preview.png",
  },
  {
    number: 3,
    title: "Watch the Transformation",
    description:
      "Experience the magic of AI as it transforms your image in real-time. Our advanced algorithms work their magic to create a unique masterpiece while preserving the essence of your original photo. Download your creation in high resolution and share it with the world!",
    features: [
      "Real-time preview",
      "Multiple resolution options",
      "Instant downloads",
    ],
    image: "/images/how-it-works/result-preview.png",
  },
];
