import * as amplitude from "@amplitude/analytics-browser";

type AnalyticsValue =
  | string
  | number
  | boolean
  | null
  | Array<string | number>;

export type AnalyticsProperties = Record<string, AnalyticsValue>;
type AnalyticsPropertyInput = Record<string, AnalyticsValue | undefined>;

type MarketingCtaClickInput = {
  ctaName: string;
  location: string;
  destination: string;
  targetUserType?: string;
  planName?: string;
};

type MarketingNavClickInput = {
  label: string;
  location: string;
  destination: string;
  linkType?: string;
};

const MARKETING_PAGE_TYPE = "marketing";

const AMPLITUDE_ENABLED =
  process.env.NEXT_PUBLIC_APP_ENV === "production" &&
  Boolean(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY?.trim());

const AMPLITUDE_API_KEY = AMPLITUDE_ENABLED
  ? process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY?.trim()
  : undefined;

let isAmplitudeInitialized = false;
let hasBeforeUnloadListener = false;

function sanitizeAnalyticsProperties(
  properties?: AnalyticsPropertyInput,
): AnalyticsProperties | undefined {
  if (!properties) {
    return undefined;
  }

  const sanitizedEntries = Object.entries(properties).filter(([, value]) => typeof value !== "undefined");
  if (sanitizedEntries.length === 0) {
    return undefined;
  }

  return Object.fromEntries(sanitizedEntries) as AnalyticsProperties;
}

function mergeAnalyticsProperties(
  ...propertiesList: Array<AnalyticsPropertyInput | undefined>
): AnalyticsProperties | undefined {
  const merged = propertiesList.reduce<Record<string, AnalyticsValue | undefined>>((acc, properties) => {
    if (!properties) {
      return acc;
    }

    Object.entries(properties).forEach(([key, value]) => {
      acc[key] = value;
    });

    return acc;
  }, {});

  return sanitizeAnalyticsProperties(merged);
}

function getBaseAnalyticsProperties(): AnalyticsProperties | undefined {
  if (typeof window === "undefined") {
    return { page_type: MARKETING_PAGE_TYPE };
  }

  return sanitizeAnalyticsProperties({
    domain: window.location.hostname,
    page_type: MARKETING_PAGE_TYPE,
  });
}

function pushDataLayerEvent(eventName: string, properties?: AnalyticsProperties) {
  if (typeof window === "undefined") {
    return;
  }

  const windowWithDataLayer = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
  };

  windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
  windowWithDataLayer.dataLayer.push({
    event: eventName,
    ...properties,
  });
}

export function initAnalytics() {
  if (typeof window === "undefined" || isAmplitudeInitialized || !AMPLITUDE_API_KEY) {
    return;
  }

  amplitude.init(AMPLITUDE_API_KEY, {
    defaultTracking: true,
    flushIntervalMillis: 1000,
    flushQueueSize: 30,
  });

  if (!hasBeforeUnloadListener) {
    window.addEventListener("beforeunload", () => {
      amplitude.flush();
    });
    hasBeforeUnloadListener = true;
  }

  isAmplitudeInitialized = true;
}

export const analytics = {
  track(eventName: string, properties?: AnalyticsPropertyInput) {
    const normalizedEventName = eventName.trim();
    if (!normalizedEventName) {
      return;
    }

    initAnalytics();
    const mergedProperties = mergeAnalyticsProperties(getBaseAnalyticsProperties(), properties);

    if (AMPLITUDE_API_KEY) {
      amplitude.track(normalizedEventName, mergedProperties);
    }

    pushDataLayerEvent(normalizedEventName, mergedProperties);
  },

  trackMarketingCtaClicked(input: MarketingCtaClickInput) {
    this.track("cta_clicked", {
      cta_name: input.ctaName,
      location: input.location,
      destination: input.destination,
      target_user_type: input.targetUserType,
      plan_name: input.planName,
    });
  },

  trackMarketingNavClicked(input: MarketingNavClickInput) {
    this.track("nav_link_clicked", {
      link_label: input.label,
      location: input.location,
      destination: input.destination,
      link_type: input.linkType,
    });
  },
};
