import pixarImage from "@/images/styles/pixar.png";
import animeImage from "@/images/styles/anime.png";
import southparkImage from "@/images/styles/southpark.png";

export const APP_STYLES = [
  {
    name: "Pixar",
    style: "PIXAR",
    image: pixarImage,
    badgeColor: "bg-lime-400/90",
    textColor: "text-black",
    hoverColor: "hover:bg-lime-400",
  },
  {
    name: "Modern Ghibli",
    style: "MODERN_GHIBLI",
    image: animeImage,
    badgeColor: "bg-purple-400/90",
    textColor: "text-white",
    hoverColor: "hover:bg-purple-400",
  },
  {
    name: "South Park",
    style: "SOUTH_PARK",
    image: southparkImage,
    badgeColor: "bg-pink-400/90",
    textColor: "text-white",
    hoverColor: "hover:bg-pink-400",
  },
];
