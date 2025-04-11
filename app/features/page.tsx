"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { FEATURES } from "@/constants/features";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

export default function FeaturesPage() {
  useEffect(() => {
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      page: "Features",
    });
  }, []);
  return (
    <main className="flex-1 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 py-16">
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl font-bold text-center mb-8">
            Discover what makes ZappyToon the perfect tool for transforming
          </h1>
          <p className="text-white/60 text-center max-w-2xl mx-auto">
            Discover what makes PixelMuse AI the perfect tool for transforming
            your photos into stunning works of art.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="relative rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 group cursor-pointer bg-white/5 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="p-6 space-y-4 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    {feature.status === "coming_soon" && (
                      <Badge className="bg-purple-400/20 text-purple-300 border-none">
                        Coming Soon
                      </Badge>
                    )}
                    {feature.status === "limited_time" && (
                      <Badge className="bg-lime-400/20 text-lime-300 border-none">
                        Limited Time
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-transparent z-10 group-hover:from-black/60 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
