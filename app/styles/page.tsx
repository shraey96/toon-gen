"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";
import { APP_STYLES } from "@/constants/styles";

export default function StylesPage() {
  useEffect(() => {
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      page: "Styles",
    });
  }, []);

  return (
    <main className="flex-1 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 py-16">
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white text-center">
            Available{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Styles
            </span>
          </h1>
          <p className="text-white/60 text-center max-w-2xl mx-auto">
            Choose from our curated collection of AI-powered artistic styles to
            transform your photos into unique masterpieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {APP_STYLES.map((style, index) => (
            <div
              key={style.name}
              className="relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 group cursor-pointer animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: "50ms",
                animationFillMode: "both",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-transparent z-10 group-hover:from-black/60 transition-all duration-300" />
              <Image
                src={style.image}
                alt={`${style.name} style`}
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4">
                <Badge
                  className={`${style.badgeColor} ${style.textColor} ${style.hoverColor} border-none text-lg py-2 px-4`}
                >
                  <Sparkles className="h-4 w-4 mr-2" /> {style.name}
                </Badge>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Badge
                  className={`${style.badgeColor} ${style.textColor} ${style.hoverColor} border-none scale-110 shadow-xl`}
                >
                  <Sparkles className="h-4 w-4 mr-2" /> {style.name}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
