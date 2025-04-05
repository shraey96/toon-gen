import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HOW_IT_WORKS_STEPS } from "@/constants/how-it-works";
import { Sparkles } from "lucide-react";

export default function HowItWorks() {
  return (
    <main className="flex-1 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 py-16">
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white text-center">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Works
            </span>
          </h1>
          <p className="text-white/60 text-center max-w-2xl mx-auto">
            Turn your photos into masterpieces with our AI-powered art
            transformation. Follow these three simple steps to begin your
            artistic adventure.
          </p>
        </div>

        <div className="space-y-24">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.number} className="relative">
              {/* Step number */}
              <div className="absolute -left-6 -top-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center transform rotate-12 backdrop-blur-xl">
                <span className="text-3xl font-bold text-white transform -rotate-12">
                  {step.number}
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center rounded-3xl p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                      {step.title}
                    </h2>
                    <p className="text-lg text-white/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {step.details && (
                    <ul className="space-y-4">
                      {step.details.map((detail, index) => (
                        <li
                          key={index}
                          className="text-white/70 flex items-center"
                        >
                          <span className="mr-3 text-purple-400">✦</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}

                  {step.features && (
                    <ul className="space-y-4">
                      {step.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-white/70 flex items-center"
                        >
                          <span className="mr-3 text-purple-400">✦</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {step.styles && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {step.styles.map((style) => (
                        <div
                          key={style.name}
                          className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                        >
                          <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 border border-white/10">
                            <div className="relative h-full w-full rounded-lg overflow-hidden">
                              <Image
                                src={style.image}
                                alt={style.name}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                              <div className="absolute bottom-3 left-3 right-3">
                                <Badge
                                  className={`${style.badgeColor} ${style.textColor} border-none mb-2`}
                                >
                                  <Sparkles className="h-3 w-3 mr-1" />{" "}
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
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-xl transform transition-all duration-300 hover:scale-105">
                        Start Creating Now
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 transform transition-transform duration-500 group-hover:scale-[1.02]">
                    <Image
                      src={step.image}
                      alt={`Step ${step.number} - ${step.title}`}
                      fill
                      className="object-cover"
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
