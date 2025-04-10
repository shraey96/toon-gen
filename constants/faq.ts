import { APP_STYLES } from "@/constants/styles";

const SUPPORTED_STYLES = APP_STYLES.map((style) => style.name).join(", ");

export const FAQS = [
  {
    id: "item-1",
    question: "How does it work?",
    answer:
      "Our AI uses advanced machine learning models to analyze your photos and transform them into various artistic styles. Simply upload your image, choose a style, and our AI will generate a transformed version in seconds. The technology combines neural networks trained on millions of images to understand and recreate artistic elements.",
  },
  {
    id: "item-2",
    question: "What styles are available?",
    answer: `We offer a wide range of styles including ${SUPPORTED_STYLES} and more.`,
  },
  {
    id: "item-3",
    question: "How long does it take?",
    answer:
      "Most transformations are completed within a minute, depending on the complexity of the image and the selected style. Some highly detailed styles may take up to 2 minutes.",
  },
  {
    id: "item-4",
    question: "What image formats are supported?",
    answer: "We support all common image formats including JPG, PNG and WEBP.",
  },
  {
    id: "item-5",
    question: "What should I know about AI-generated results?",
    answer:
      "Our AI models are continuously evolving and may produce varying results. While we strive for high-quality transformations, the output may not always perfectly match your expectations. Factors like image quality, composition, and style complexity can affect the results. We recommend experimenting with different styles to find the best match for your images.",
  },
];
