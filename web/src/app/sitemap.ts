import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://megalodomegolf.com";
  const paths = [
    "/",
    "/our-mission",
    "/our-location",
    "/about",
    "/pictures",
    "/team",
    "/news",
    "/faq",
    "/contact",
    "/privacy",
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
