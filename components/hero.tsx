import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { APP_STYLES } from "@/constants/styles";

const HOME_PAGE_STYLES = APP_STYLES.slice(0, 4);

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center">
      <div className="container px-4">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <Badge className="px-3 py-1 text-sm bg-purple-400/20 text-purple-300 hover:bg-purple-400/30 border-none">
              <span className="animate-pulse mr-1">★</span> FREE FOR A WHILE -
              NO LIMITS!
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
              Transform your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                photos
              </span>{" "}
              into{" "}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                  magical
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-lime-500/30"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,0 Q50,12 100,0"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              art
            </h1>

            <p className="text-xl text-white/70 max-w-[600px]">
              Instantly transform any photo into stunning AI-generated artwork
              with just one click. Unlimited transformations for a full month!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/app">
                <Button
                  size="lg"
                  className="bg-lime-400 text-black hover:bg-lime-300 text-lg"
                >
                  Create Image
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            {/* Background glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl"></div>

            {/* Card container with perspective */}
            <div className="relative h-[500px] w-full perspective-[1000px]">
              {HOME_PAGE_STYLES.map((style, index) => (
                <div
                  key={style.name}
                  className={`absolute rounded-xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 hover:scale-105 hover:z-10 animate-[float_6s_ease-in-out_infinite] ${getPositionClasses(
                    index
                  )}`}
                  style={{
                    transform: `rotate(${getRotation(index)}deg)`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
                  <Image
                    src={style.image}
                    alt={`${style.name} style`}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                    priority={index < 2}
                  />
                  <div className="absolute bottom-2 right-2">
                    <Badge
                      className={`${style.badgeColor} ${style.textColor} ${style.hoverColor} border-none`}
                    >
                      <Sparkles className="h-3 w-3 mr-1" /> {style.name}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get position classes based on index
function getPositionClasses(index: number): string {
  const positions = [
    "left-[10%] top-[5%] w-[45%]",
    "right-[5%] top-[15%] w-[50%]",
    "left-[15%] bottom-[10%] w-[40%]",
    "right-[10%] bottom-[5%] w-[45%]",
  ];
  return positions[index] || positions[0];
}

// Helper function to get rotation based on index
function getRotation(index: number): number {
  const rotations = [1, -1, 2, -2];
  return rotations[index] || 0;
}
