import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Pictures" };

const gallery = [
  { src: "/images/gallery/three-domes.jpg", alt: "Three domes" },
  { src: "/images/gallery/three-domes-summer.jpg", alt: "Domes in summer" },
  { src: "/images/gallery/four-domes.jpg", alt: "Four dome concept" },
  { src: "/images/gallery/arizona-layout.jpg", alt: "Arizona layout" },
  { src: "/images/gallery/apex.jpg", alt: "Apex view" },
  { src: "/images/gallery/holes-9-12.jpg", alt: "Holes rendering" },
  { src: "/images/gallery/falls-green.jpg", alt: "Falls on green" },
  { src: "/images/gallery/clubhouse.jpg", alt: "Clubhouse concept" },
  { src: "/images/gallery/first-real.jpg", alt: "First real indoor course" },
  { src: "/images/gallery/new-era.jpg", alt: "New era of golf" },
  { src: "/images/gallery/oswego-site.jpg", alt: "Oswego site context" },
  { src: "/images/gallery/site-plan.jpg", alt: "Site plan" },
  { src: "/images/gallery/chicago-plan.jpg", alt: "Chicago West plan" },
  { src: "/images/gallery/golfer.jpg", alt: "Golfer" },
];

export default function PicturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Pictures"
        title="Journey through the course and practice facility"
      />
      <section className="section">
        <div className="container grid-3">
          {gallery.map((img) => (
            <figure key={img.src} className="card">
              <Image
                src={img.src}
                alt={img.alt}
                width={1000}
                height={750}
                className="h-56 w-full object-cover"
              />
              <figcaption className="muted p-4 text-sm">{img.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
