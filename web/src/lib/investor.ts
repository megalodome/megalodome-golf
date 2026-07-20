import raw from "./investorContent.json";

export type InvestorFaq = { q: string; a: string };

export type InvestorContent = {
  disclaimer: string;
  fund: string;
  headline: {
    equityRaise: string;
    debt: string;
    totalCap: string;
    prefReturn: string;
    modeledIRR: string;
    modeledMOIC: string;
    yr5Ebitda: string;
    openTarget: string;
    location: string;
  };
  faqs: InvestorFaq[];
  onePagerParas: string[];
  execParas: string[];
  roadmapParas: string[];
  proformaSummary: string[];
  abbreviations: string[];
  assetPreviewParas: string[];
  pitchSlides: Array<{ title: string; bullets: string[] }>;
  tiers: {
    tier0: string[];
    tier1: string[];
    tier2: string[];
    tier3: string[];
  };
};

export const investor = raw as InvestorContent;

export const investorNav = [
  { href: "/invest", label: "Overview" },
  { href: "/invest/opportunity", label: "Opportunity" },
  { href: "/invest/faq", label: "Investor FAQ" },
  { href: "/invest/process", label: "Process" },
  { href: "/invest/data-room", label: "Data Room" },
  { href: "/invest/apply", label: "Apply" },
];
