export const site = {
  name: "MEGALODOME GOLF",
  tagline: "THE NEXT REVOLUTION™",
  blurb: "The world's first REAL indoor golf experience!",
  location: "Oswego, IL",
  openTarget: "Fall 2027",
  hours: "6am–midnight CT, every day",
  emailNotify: process.env.LEAD_NOTIFY_EMAIL || "hello@megalodomegolf.com",
  flyerPath: "/docs/flyer-2026.pdf",
  /** SuiteDash / ONE booking form — 20-min investor discovery */
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ||
    "https://app.onecommercial.ca/frm/2rWPC5u8yME2svA8N",
  fullPageAds: [
    { label: "Full-page ad A", href: "/docs/ads/full-page-ad-a.pdf" },
    { label: "Full-page ad B", href: "/docs/ads/full-page-ad-b.pdf" },
    { label: "Full-page ad C", href: "/docs/ads/full-page-ad-c.pdf" },
  ],
};

export type NavChild = { href: string; label: string };
export type NavItem = {
  href?: string;
  label: string;
  children?: NavChild[];
};

/** Primary site navigation */
export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  {
    label: "About",
    children: [
      { href: "/our-mission", label: "Mission" },
      { href: "/our-location", label: "Location" },
      { href: "/team", label: "Team" },
      { href: "/about", label: "More" },
    ],
  },
  { href: "/pictures", label: "Gallery" },
  { href: "/invest", label: "Investors" },
  { href: "/news", label: "News" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const footerExplore = [
  { href: "/pictures", label: "Gallery" },
  { href: "/invest", label: "Investors" },
  { href: "/news", label: "News" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const homeIntro = {
  title: "Introduction to MEGALODOME GOLF",
  body: "The world's first indoor golf experience that replicates a traditional golf course. Enjoy an innovative, immersive year-round game regardless of weather. Our executive 9-hole course is a par 30 designed for every skill level.",
  bullets: [
    "Six (6) par 3 holes (100–160 yards)",
    "Three (3) par 4 holes (270–280 yards)",
    "Arizona-style layout by Huxham Golf Design Inc.",
    "Fourth dome: 50-stall practice facility over 275 yards",
  ],
};

export const mission = {
  title: "MEGALODOME GOLF'S UNIQUE EXPERIENCE",
  sections: [
    {
      heading: "Climate-controlled play all year",
      body: "Our initial focus is extending the golf season in colder climates — transforming a short 3- to 6-month season into a full 12 months. Rising heat also creates opportunity in warmer regions where temperatures often exceed 90°F.",
    },
    {
      heading: "Arizona-style golf course",
      body: "At our first Chicago-area location, golfers will feel transported to Scottsdale, AZ — even in the heart of winter. A true indoor traditional-course experience for all ages and levels.",
    },
  ],
};

export const locationFeatures = [
  "Par 30 executive course inside three proprietary domes — six par 3s and three par 4s",
  "Multifaceted golf academy with 275-yard driving range, practice greens, bunkers & short-game areas",
  "Controlled temperature and full night lighting",
  "Cool Arizona vibe with year-round play",
  "High-end clubhouse with bar, fully stocked pro shop, cloakroom, and office space",
];

export const about = {
  title: "MEGALODOME GOLF is also the world's first",
  paragraphs: [
    "The world's first indoor golf experience to truly replicate traditional golf is set to revolutionize the sport.",
    "This stunning Scottsdale, Arizona-style course is housed within the three largest domes in North America.",
    "Expect lakes, waste bunkers, and undulating greens designed by renowned international golf architects — plus cacti, palm trees, and four distinct types of turf for a full sensory experience.",
    "Executive 9-hole course: 6 par-3s and 3 par-4s, total par 30. The fourth dome is a complete practice facility with stalls, short-game areas, and simulator stations.",
  ],
};

export const faq = [
  {
    q: "When will MEGALODOME GOLF open?",
    a: "We are in the financing process. Our objective is to open in fall 2027.",
  },
  {
    q: "Where is the first location?",
    a: "Oswego, IL.",
  },
  {
    q: "What will a nine-hole round cost?",
    a: "Pricing is not finalized and will vary by season.",
  },
  {
    q: "What are the operating hours?",
    a: "We plan to be open 6am–midnight Central Time, every day.",
  },
  {
    q: "Is there a pro shop?",
    a: "Yes — a fully stocked pro shop with rental and purchase equipment (left- and right-handed), plus men's and women's apparel.",
  },
];

export const news = [
  {
    title: "MEGALODOME GOLF press release — Jan 24, 2026",
    href: "https://www.einpresswire.com/article/886203286/megalodome-golf-propels-the-future-of-sports-with-50-million-investment-fund-for-revolutionary-project-in-oswego-il",
  },
  {
    title: "Golfweek — Chicago indoor golf course",
    href: "https://golfweek.usatoday.com/story/sports/golf/2025/02/20/chicago-might-get-a-new-indoor-golf-course-soon/79217653007/",
  },
  {
    title: "Chicago Tribune — Four golf domes proposed in Oswego",
    href: "https://www.chicagotribune.com/2024/09/03/facility-featuring-four-golf-domes-proposed-in-oswego/",
  },
  {
    title: "Chicago Tribune — Panel recommends proposal",
    href: "https://www.chicagotribune.com/2024/09/09/oswego-panel-recommends-proposal-for-indoor-golf-course/",
  },
  {
    title: "Club & Resort Business — Domed course moves closer",
    href: "https://clubandresortbusiness.com/worlds-first-domed-golf-course-moves-closer-to-reality/",
  },
  {
    title: "Shaw Local — Trustees thumbs-up",
    href: "https://www.shawlocal.com/kendall-county-now/2024/09/19/proposed-golf-dome-get-thumbs-up-from-oswego-village-trustees/",
  },
  {
    title: "WSPY — Village board approves indoor golf domes",
    href: "https://www.wspynews.com/news/local/oswego-village-board-approves-world-s-largest-indoor-golf-domes/article_da5ce5fc-75b6-11ef-a1a6-7729dc33f7ac.html",
  },
  {
    title: "GolfPass — New dome golf course Chicago",
    href: "https://www.golfpass.com/travel-advisor/articles/new-dome-golf-course-chicago",
  },
  {
    title: "WROK 1440 — Megalodome Golf indoor Illinois",
    href: "https://1440wrok.com/ixp/723/p/megalodome-golf-indoor-illinois/",
  },
];

export const gallery = [
  { src: "/images/hero-dome.jpg", alt: "Dome summer and winter concept" },
  { src: "/images/arizona-layout.jpg", alt: "Arizona-style course layout" },
  { src: "/images/clubhouse.jpg", alt: "Domes and clubhouse" },
  { src: "/images/falls-green.jpg", alt: "Falls on green" },
  { src: "/images/new-era.jpg", alt: "A new era of golf" },
  { src: "/images/first-real.jpg", alt: "First real indoor course vision" },
  { src: "/images/course-1.jpg", alt: "Course rendering" },
  { src: "/images/photo-c.png", alt: "Facility concept" },
];
