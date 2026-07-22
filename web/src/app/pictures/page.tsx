import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GalleryTabs, type GalleryItem } from "@/components/GalleryTabs";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "MEGALODOME GOLF gallery — dome exterior, indoor Arizona-style course, clubhouse, and convention spaces.",
};

const gallery: GalleryItem[] = [
  // Dome outside
  {
    category: "outside",
    src: "/images/gallery/dome-outside-pavilion-dusk.jpg",
    alt: "Quilted dome exterior with glass pavilion at dusk",
  },
  {
    category: "outside",
    src: "/images/gallery/dome-outside-pavilion-day.jpg",
    alt: "Dome and glass pavilion set in landscaped grounds",
  },
  {
    category: "outside",
    src: "/images/gallery/three-domes.jpg",
    alt: "Multi-dome campus massing concept",
  },
  {
    category: "outside",
    src: "/images/gallery/three-domes-summer.jpg",
    alt: "Dome campus in summer landscape",
  },
  {
    category: "outside",
    src: "/images/gallery/apex.jpg",
    alt: "Aerial exterior of the dome complex",
  },
  {
    category: "outside",
    src: "/images/gallery/oswego-site.jpg",
    alt: "Oswego site context",
  },

  // Dome inside
  {
    category: "inside",
    src: "/images/gallery/dome-inside-water-tee.jpg",
    alt: "Tee shot beside turquoise water under hanging screens",
  },
  {
    category: "inside",
    src: "/images/gallery/dome-inside-tropical-terrace.jpg",
    alt: "Tropical terrace and lounge overlooking indoor fairways",
  },
  {
    category: "inside",
    src: "/images/gallery/render-01.jpg",
    alt: "Tee shot beside water hazard under the dome",
  },
  {
    category: "inside",
    src: "/images/gallery/render-04.jpg",
    alt: "Fairway approach with bunker, rocks, and palms",
  },
  {
    category: "inside",
    src: "/images/gallery/render-02.jpg",
    alt: "Aerial view of Arizona-style holes under the dome canopy",
  },
  {
    category: "inside",
    src: "/images/gallery/render-09.jpg",
    alt: "Golfer on the tee with turquoise water and hanging screens",
  },
  {
    category: "inside",
    src: "/images/gallery/render-13.jpg",
    alt: "Green complex with bunker and spectator palms",
  },
  {
    category: "inside",
    src: "/images/gallery/render-07.jpg",
    alt: "Elevated green with THE NEXT REVOLUTION™ screen",
  },
  {
    category: "inside",
    src: "/images/gallery/render-14.jpg",
    alt: "Waterfall and rockscape amenity inside the dome",
  },
  {
    category: "inside",
    src: "/images/gallery/render-15.jpg",
    alt: "Island water feature and desert planting",
  },
  {
    category: "inside",
    src: "/images/gallery/render-11.jpg",
    alt: "Waterfall cascade between rock formations",
  },
  {
    category: "inside",
    src: "/images/gallery/render-12.jpg",
    alt: "Players on the green with desert dunes beyond",
  },
  {
    category: "inside",
    src: "/images/gallery/render-10.jpg",
    alt: "Desert interior island with bunkers and cacti",
  },
  {
    category: "inside",
    src: "/images/gallery/arizona-layout.jpg",
    alt: "Arizona-style course layout under the dome",
  },

  // Clubhouse
  {
    category: "clubhouse",
    src: "/images/gallery/clubhouse-arrival-canopy.jpg",
    alt: "Clubhouse arrival canopy with reflecting water and dome beyond",
  },
  {
    category: "clubhouse",
    src: "/images/gallery/clubhouse-reflecting-pool.jpg",
    alt: "Grand clubhouse entry framed by twin domes and reflecting pool",
  },
  {
    category: "clubhouse",
    src: "/images/gallery/clubhouse-lobby-atrium.jpg",
    alt: "Clubhouse lobby atrium with timber vaults and MEGALODOME GOLF desk",
  },
  {
    category: "clubhouse",
    src: "/images/gallery/clubhouse-restaurant-timber.jpg",
    alt: "Clubhouse restaurant with timber arches and skylights",
  },
  {
    category: "clubhouse",
    src: "/images/gallery/clubhouse.jpg",
    alt: "Clubhouse exterior concept",
  },

  // Conventions
  {
    category: "conventions",
    src: "/images/gallery/convention-hall-sunset.jpg",
    alt: "Convention hall with hanging lights, reception, and sunset glass wall",
  },
  {
    category: "conventions",
    src: "/images/gallery/convention-lounge-carts.jpg",
    alt: "Convention lounge with lounge seating and golf cart staging",
  },
];

export default function PicturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Journey through MEGALODOME"
        subtitle="Browse by space — dome exterior, indoor Arizona-style course, clubhouse, and convention venues."
      />
      <section className="section">
        <div className="container">
          <GalleryTabs items={gallery} />
        </div>
      </section>
    </>
  );
}
