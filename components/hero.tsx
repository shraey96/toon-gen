import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APP_STYLES } from "@/constants/styles";

const HOME_PAGE_STYLES = APP_STYLES.slice(0, 4);

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center py-8 sm:py-12">
      <div className="container px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            {/* Show badge only on non-mobile screens */}
            <div className="hidden sm:block">
              <Badge className="px-3 py-1 text-sm bg-purple-400/20 text-purple-300 hover:bg-purple-400/30 border-none">
                <span className="animate-pulse mr-1">★</span> FREE FOR A LIMITED
                TIME - NO LIMITS!
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
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
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-lime-500/30"
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

            <p className="text-base sm:text-xl text-white/70 max-w-[600px]">
              Instantly transform any photo into stunning AI-generated artwork
              with just one click. Unlimited transformations for a limited time!
            </p>

            <p className="text-sm sm:text-base text-purple-300/90 flex items-center gap-2">
              <span className="animate-pulse">★</span>
              No signup required - start creating instantly!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link href="/app" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-lime-400 text-black hover:bg-lime-300 text-base sm:text-lg rounded-l rounded-r"
                >
                  Create Image
                </Button>
              </Link>
              {/* Show free text only on mobile */}
              <p className="sm:hidden text-sm text-purple-300/90 text-center animate-pulse">
                ★ FREE FOR A LIMITED TIME - NO LIMITS!
              </p>
            </div>
          </div>

          <div className="relative mt-4 sm:mt-8 lg:mt-0">
            {/* Background glow effect */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl"></div>

            {/* Card container with perspective */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full perspective-[1000px]">
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
                  <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2">
                    <Badge
                      className={`${style.badgeColor} ${style.textColor} ${style.hoverColor} border-none text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-3`}
                    >
                      <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />{" "}
                      {style.name}
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
