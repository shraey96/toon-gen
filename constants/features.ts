import {
  Zap,
  Image as ImageIcon,
  Palette,
  Wand2,
  Shield,
  Sparkles,
} from "lucide-react";

export const FEATURES = [
  {
    title: "Quick Processing",
    description:
      "Get your transformed images in just a few minutes. Our efficient AI processing ensures you don't have to wait long for your results.",
    icon: Zap,
    color: "from-blue-400 to-cyan-400",
    status: null,
  },
  {
    title: "High Quality Output",
    description:
      "Coming soon: Enhanced image quality and resolution options for even better results.",
    icon: ImageIcon,
    color: "from-purple-400 to-pink-400",
    status: "coming_soon",
  },
  {
    title: "Diverse Style Options",
    description:
      "Choose from a wide range of artistic styles, from classic paintings to modern digital art.",
    icon: Palette,
    color: "from-amber-400 to-orange-400",
    status: null,
  },
  {
    title: "One-Click Magic",
    description:
      "Simple and intuitive interface. Just upload your image, pick a style, and let the AI work its magic.",
    icon: Wand2,
    color: "from-emerald-400 to-teal-400",
    status: null,
  },
  {
    title: "Privacy First",
    description:
      "Your images are processed securely and never stored permanently. Your privacy is our priority.",
    icon: Shield,
    color: "from-rose-400 to-red-400",
    status: null,
  },
  {
    title: "Free to Use",
    description:
      "Enjoy unlimited image transformations for a limited time. No hidden costs or watermarks.",
    icon: Sparkles,
    color: "from-violet-400 to-indigo-400",
    status: "limited_time",
  },
];
