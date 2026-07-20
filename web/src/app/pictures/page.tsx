import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { gallery } from "@/lib/content";

export const metadata: Metadata = { title: "Pictures" };

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
                height={800}
                className="h-64 w-full object-cover"
              />
              <figcaption className="muted p-4 text-sm">{img.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
