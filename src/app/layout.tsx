import type React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { AnalyticsProvider } from "./components/AnalyticsProvider";
import { LanguageProvider } from "@/components/language-provider";
import { cookies } from "next/headers";
import {
  isThemePreference,
  resolveTheme,
  THEME_COOKIE_NAME,
  type ThemePreference,
} from "@/lib/theme";
import { getLocaleLanguage } from "@/lib/i18n";
import { buildGtmConsentModeScript, buildGtmInlineScript } from "@/lib/gtm";
import { getRequestLocale } from "@/lib/request-locale";

const SITE_URL = "https://creeadores.com";
const SEO_TITLE = "Creeadores | Encuentra UGC/Influencers para tu Marca";
const SEO_DESCRIPTION =
  "Conectamos marcas con creadores de contenido. Crea campañas, encuentra creadores de contenido, gestiona sus entregables y pagos en una sola plataforma.";
const SEO_KEYWORDS =
  "creadores de contenido UGC, plataforma UGC, marketplace creadores de contenido, contenido generado por usuarios, UGC creator, marketplace UGC, creadores UGC, plataforma para creadores de contenido, contratar creadores de contenido, contratar creadores UGC";
const BRAND_COLOR = "#0019DA";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim();

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Creeadores",
  url: SITE_URL,
  description: SEO_DESCRIPTION,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", category: "Software" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
  },
  creator: { "@type": "Organization", name: "Creeadores", url: SITE_URL },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Creeadores",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "Plataforma que conecta marcas con creadores de contenido UGC",
  sameAs: [
    "https://twitter.com/creeadores",
    "https://instagram.com/creeadores",
    "https://linkedin.com/company/creeadores",
    "https://facebook.com/creeadores",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "contacto@creeadores.com",
    availableLanguage: ["Spanish", "English", "Portuguese"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué es Creeadores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Creeadores es una plataforma marketplace que conecta marcas y agencias con creadores de contenido UGC (User-Generated Content) e influencers en Latinoamérica. Permite crear campañas, descubrir creadores, gestionar entregables y realizar pagos seguros a través de Mercado Pago.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta Creeadores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Creeadores ofrece un plan Gratuito ($0/mes, hasta 2 creadores), Starter (US$16/mes, hasta 10 creadores), Growth (US$29/mes, hasta 30 creadores, el más popular) y Enterprise (precio personalizado, creadores ilimitados). Todos los planes incluyen acceso al marketplace de creadores.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué tipos de campañas puedo crear en Creeadores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Podés crear 4 tipos de campañas: Flash (gratis, negociación directa), Influencer (contenido de marca en perfiles de influencers), UGC Creator (producción de video profesional) y UGC + Influencer (híbrida, la más completa).",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo funcionan los pagos en Creeadores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los pagos se procesan de forma segura a través de Mercado Pago. Los fondos se mantienen en custodia y se liberan a los creadores solo después de que la marca apruebe el contenido entregado.",
      },
    },
    {
      "@type": "Question",
      name: "¿En qué países opera Creeadores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Creeadores opera en toda Latinoamérica, con fuerte presencia en Argentina, México, Chile, Colombia y Venezuela. La plataforma está disponible en Español, Inglés y Portugués.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: { default: SEO_TITLE, template: "%s | Creeadores" },
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  applicationName: "Creeadores",
  authors: [{ name: "Creeadores" }],
  creator: "Creeadores",
  publisher: "Creeadores",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: { es: "/", "es-AR": "/", "es-MX": "/", "es-CO": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    siteName: "Creeadores",
    locale: "es_ES",
    alternateLocale: ["es_AR", "es_MX", "es_CO"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Creeadores - Plataforma UGC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@creeadores",
    creator: "@creeadores",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: BRAND_COLOR,
};

async function getInitialTheme(): Promise<ThemePreference> {
  const cookieStore = await cookies();
  const storedTheme = cookieStore.get(THEME_COOKIE_NAME)?.value;
  return storedTheme && isThemePreference(storedTheme) ? storedTheme : "light";
}

async function getInitialLocale() {
  return getRequestLocale();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themePreference = await getInitialTheme();
  const initialResolvedTheme = resolveTheme(themePreference);
  const locale = await getInitialLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-theme={initialResolvedTheme}
      data-theme-preference={themePreference}
    >
      <head>
        <meta
          httpEquiv="content-language"
          content={getLocaleLanguage(locale)}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webApplicationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
        {GTM_ID ? (
          <>
            <Script
              id="google-consent-mode"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{ __html: buildGtmConsentModeScript() }}
            />
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: buildGtmInlineScript(GTM_ID) }}
            />
          </>
        ) : null}
      </head>
      <body className="font-sans antialiased">
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <ThemeProvider initialTheme={themePreference}>
          <LanguageProvider initialLocale={locale}>
            <AnalyticsProvider />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
