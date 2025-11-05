// app/sitemap.ts
import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tunuyanbeachvolley.com";
  return [
    { url: `${base}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/partidos`, priority: 0.9 },
    { url: `${base}/sponsors`, priority: 0.7 },
    { url: `${base}/tienda`, priority: 0.7 },
    { url: `${base}/galeria`, priority: 0.6 },
    { url: `${base}/info`, priority: 0.5 },
  ];
}
