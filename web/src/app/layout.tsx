import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://megalodomegolf.com"
  ),
  title: {
    default: "MEGALODOME GOLF | THE NEXT REVOLUTION™",
    template: "%s | MEGALODOME GOLF",
  },
  description:
    "The world's first REAL indoor golf experience. Arizona-style executive 9-hole course under giant domes in Oswego, IL — year-round play.",
  openGraph: {
    title: "MEGALODOME GOLF | THE NEXT REVOLUTION™",
    description:
      "The world's first REAL indoor golf experience — Oswego, IL flagship.",
    url: "https://megalodomegolf.com",
    siteName: "MEGALODOME GOLF",
    images: [{ url: "/images/hero-dome.jpg" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${cormorant.variable} antialiased`}
      >
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
