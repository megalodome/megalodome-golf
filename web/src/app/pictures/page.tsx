import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Gallery" };

/** MEGALODOME course renders */
const gallery = [
  {
    src: "/images/gallery/render-01.jpg",
    alt: "Tee shot beside water hazard under the dome",
  },
  {
    src: "/images/gallery/render-04.jpg",
    alt: "Fairway approach with bunker, rocks, and palms",
  },
  {
    src: "/images/gallery/render-02.jpg",
    alt: "Aerial view of Arizona-style holes under the dome canopy",
  },
  {
    src: "/images/gallery/render-09.jpg",
    alt: "Golfer on the tee with turquoise water and hanging screens",
  },
  {
    src: "/images/gallery/render-13.jpg",
    alt: "Green complex with bunker and spectator palms",
  },
  {
    src: "/images/gallery/render-07.jpg",
    alt: "Elevated green with THE NEXT REVOLUTION™ screen",
  },
  {
    src: "/images/gallery/render-14.jpg",
    alt: "Waterfall and rockscape amenity inside the dome",
  },
  {
    src: "/images/gallery/render-15.jpg",
    alt: "Island water feature and desert planting",
  },
  {
    src: "/images/gallery/render-11.jpg",
    alt: "Waterfall cascade between rock formations",
  },
  {
    src: "/images/gallery/render-12.jpg",
    alt: "Players on the green with desert dunes beyond",
  },
  {
    src: "/images/gallery/render-10.jpg",
    alt: "Desert interior island with bunkers and cacti",
  },
  {
    src: "/images/gallery/arizona-layout.jpg",
    alt: "Arizona-style course layout",
  },
];

export default function PicturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Journey through the course"
        subtitle="Arizona-style indoor golf under climate-controlled domes — water, palms, bunkers, and real walkable holes."
      />
      <section className="section">
        <div className="container">
          <figure className="card mb-6 overflow-hidden">
            <Image
              src="/images/gallery/render-04.jpg"
              alt="Signature fairway with water and sand"
              width={1600}
              height={900}
              className="h-[min(62vh,560px)] w-full object-cover"
              priority
            />
            <figcaption className="muted px-5 py-4 text-sm">
              Signature hole experience — real turf, desert rockwork, and water
              inside the dome.
            </figcaption>
          </figure>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {gallery.map((img) => (
              <figure key={img.src} className="card overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={800}
                  className="h-56 w-full object-cover transition duration-500 hover:scale-[1.03] sm:h-60"
                />
                <figcaption className="muted p-4 text-sm leading-6">
                  {img.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
