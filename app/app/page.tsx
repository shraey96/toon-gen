"use client";

import { useEffect } from "react";
import AppTabs from "@/components/app-tabs";
import { trackAnalytics, ANALYTICS_EVENTS } from "@/lib/analytics";

export default function AppPage() {
  useEffect(() => {
    trackAnalytics(ANALYTICS_EVENTS.PAGE_VIEWED, {
      page: "App",
    });
  }, []);
  return (
    <main className="flex-1 bg-gradient-to-b from-black to-gray-900">
      <AppTabs />
    </main>
  );
}
