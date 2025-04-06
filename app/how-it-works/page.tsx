import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HOW_IT_WORKS_STEPS } from "@/constants/how-it-works";
import { Sparkles } from "lucide-react";

export default function HowItWorks() {
  return (
    <main className="flex-1 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-3 sm:px-4 md:px-6 py-6 md:py-16">
        <div
          className="space-y-3 md:space-y-6 mb-6 md:mb-12 animate-in fade-in slide-in-from-bottom-4"
          style={{
            animationDelay: "0ms",
            animationFillMode: "both",
          }}
        >
          <h1 className="text-[32px] md:text-4xl lg:text-5xl font-bold tracking-tighter text-white text-center">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Works
            </span>
          </h1>
          <p className="text-[15px] md:text-base text-white/60 text-center max-w-2xl mx-auto px-2">
            Turn your photos into masterpieces with our AI-powered art
            transformation. Follow these three simple steps to begin your
            artistic adventure.
          </p>
        </div>

        <div className="space-y-8 md:space-y-24">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.number}
              className="relative animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: `${150 + index * 150}ms`,
                animationFillMode: "both",
              }}
            >
              {/* Step number */}
              <div className="absolute -left-2 sm:-left-4 md:-left-6 -top-3 sm:-top-4 md:-top-6 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center transform rotate-12 backdrop-blur-xl">
                <span className="text-2xl sm:text-2xl md:text-3xl font-bold text-white transform -rotate-12">
                  {step.number}
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-4 md:gap-12 items-start lg:items-center rounded-xl md:rounded-3xl p-3 sm:p-4 md:p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                <div className="space-y-4 md:space-y-8">
                  <div>
                    <h2 className="text-2xl sm:text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2 md:mb-4">
                      {step.title}
                    </h2>
                    <p className="text-[15px] sm:text-base md:text-lg text-white/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {step.details && (
                    <ul className="space-y-2 md:space-y-4">
                      {step.details.map((detail, index) => (
                        <li
                          key={index}
                          className="text-sm sm:text-sm md:text-base text-white/70 flex items-center"
                        >
                          <span className="mr-2 md:mr-3 text-purple-400 text-sm">
                            ✦
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}

                  {step.features && (
                    <ul className="space-y-2 md:space-y-4">
                      {step.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-sm sm:text-sm md:text-base text-white/70 flex items-center"
                        >
                          <span className="mr-2 md:mr-3 text-purple-400 text-sm">
                            ✦
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {step.styles && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                      {step.styles.map((style) => (
                        <div
                          key={style.name}
                          className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                        >
                          <div className="aspect-square rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-1.5 sm:p-2 md:p-4 border border-white/10">
                            <div className="relative h-full w-full rounded-md md:rounded-lg overflow-hidden">
                              <Image
                                src={style.image}
                                alt={style.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 30vw, (max-width: 768px) 33vw, 20vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                              <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 left-1 sm:left-2 md:left-3 right-1 sm:right-2 md:right-3">
                                <Badge
                                  className={`${style.badgeColor} ${style.textColor} border-none text-[11px] sm:text-xs md:text-sm whitespace-nowrap`}
                                >
                                  <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 mr-1" />{" "}
                                  {style.name}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.number === 3 && (
                    <Link href="/app" className="inline-block">
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-[15px] sm:text-base md:text-lg rounded-lg md:rounded-xl transform transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                        Start Creating Now
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="relative group order-first lg:order-last mb-4 lg:mb-0">
                  <div className="absolute -inset-1.5 sm:-inset-2 md:-inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg sm:rounded-xl md:rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative aspect-[4/3] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-white/10 transform transition-transform duration-500 group-hover:scale-[1.02]">
                    <Image
                      src={step.image}
                      alt={`Step ${step.number} - ${step.title}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 95vw, (max-width: 1024px) 100vw, 50vw"
                      priority={step.number === 1}
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 mix-blend-overlay" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
