"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics, initAnalytics } from "@/lib/analytics";

function resolveMarketingPageName(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "home";
  }

  return pathname.replace(/^\//, "").replace(/\//g, "_");
}

export function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const query = searchParams?.toString();
    analytics.track("page_viewed", {
      page_name: resolveMarketingPageName(pathname),
      page_path: pathname,
      page_query: query || null,
      domain: window.location.hostname,
      page_type: "marketing",
    });
  }, [pathname, searchParams]);

  return null;
}
