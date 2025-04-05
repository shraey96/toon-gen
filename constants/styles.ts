import pixarImage from "@/images/styles/pixar.jpeg";
import animeImage from "@/images/styles/anime.jpeg";
import southparkImage from "@/images/styles/southpark.jpeg";

export const APP_STYLES = [
  {
    name: "Pixar Style",
    image: pixarImage,
    badgeColor: "bg-lime-400/90",
    textColor: "text-black",
    hoverColor: "hover:bg-lime-400",
  },
  {
    name: "Southpark",
    image: southparkImage,
    badgeColor: "bg-purple-400/90",
    textColor: "text-white",
    hoverColor: "hover:bg-purple-400",
  },
  {
    name: "Anime",
    image: animeImage,
    badgeColor: "bg-pink-400/90",
    textColor: "text-white",
    hoverColor: "hover:bg-pink-400",
  },
];
