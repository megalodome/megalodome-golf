import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PostHogProvider } from "@/components/PostHogProvider";
import { SiteChat } from "@/components/SiteChat";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://megalodomegolf.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MEGALODOME GOLF | THE NEXT REVOLUTION™",
    template: "%s | MEGALODOME GOLF",
  },
  description:
    "The world's first REAL indoor golf experience. Arizona-style executive 9-hole course under giant domes in Oswego, IL — year-round play.",
  applicationName: "MEGALODOME GOLF",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "MEGALODOME GOLF | THE NEXT REVOLUTION™",
    description:
      "The world's first REAL indoor golf experience — Oswego, IL flagship.",
    url: "https://megalodomegolf.com",
    siteName: "MEGALODOME GOLF",
    images: [{ url: "/images/hero-dome.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MEGALODOME GOLF | THE NEXT REVOLUTION™",
    description:
      "The world's first REAL indoor golf experience — Oswego, IL flagship.",
    images: ["/icon-512.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "MEGALODOME GOLF",
      url: siteUrl,
      logo: `${siteUrl}/icon-512.png`,
      email: "info@megalodomegolf.com",
      telephone: "+1-872-339-1004",
      address: {
        "@type": "PostalAddress",
        streetAddress: "400 Knoll Street, unit C",
        addressLocality: "Wheaton",
        addressRegion: "IL",
        postalCode: "60187",
        addressCountry: "US",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      name: "MEGALODOME GOLF",
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SportsActivityLocation",
      name: "MEGALODOME GOLF Chicago West",
      description:
        "Indoor traditional golf under proprietary domes — Oswego, IL flagship targeting Fall 2027.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Oswego",
        addressRegion: "IL",
        addressCountry: "US",
      },
      url: siteUrl,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${cormorant.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHogProvider />
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <ScrollToTop />
        <SiteChat />
      </body>
    </html>
  );
}
