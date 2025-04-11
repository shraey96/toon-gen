"use client";
import { useEffect } from "react";
import Hero from "@/components/hero";
import Faq from "@/components/faq";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

export default function Home() {
  useEffect(() => {
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      page: "Home",
    });
  }, []);

  return (
    <main className="flex-1">
      <Hero />
      <Faq />
    </main>
  );
}
