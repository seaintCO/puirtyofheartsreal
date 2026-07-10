export type ResourceType =
  | "video"
  | "pdf"
  | "template"
  | "worksheet"
  | "tool"
  | "replay";

export type VaultResource = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: ResourceType;
  duration?: string;
  youtubeUrl?: string;
  downloadUrl?: string;
  featured?: boolean;
};

export const vaultCategories = [
  "All",
  "Business",
  "Startups",
  "Finance",
  "Marketing",
  "Strategy",
  "Leadership",
  "Templates",
];

export const vaultResources: VaultResource[] = [
  {
    id: "business-resource-video-1",
    title: "Business Training Resource 1",
    description:
      "Supplemental business training for founders and emerging entrepreneurs.",
    category: "Business",
    type: "video",
    youtubeUrl: "https://youtu.be/Fk9BCr5pLTU",
    featured: true,
  },
  {
    id: "cofounder-equity-mistakes",
    title: "Co-Founder Equity Mistakes to Avoid",
    description:
      "A startup resource covering important considerations when dividing founder ownership.",
    category: "Startups",
    type: "video",
    youtubeUrl: "https://youtu.be/DISocTmEwiI",
    featured: true,
  },
  {
    id: "business-resource-video-3",
    title: "Business Training Resource 3",
    description:
      "Additional business education covering practical founder and company-building concepts.",
    category: "Strategy",
    type: "video",
    youtubeUrl: "https://youtu.be/leQ89XSHILw",
  },
  {
    id: "business-resource-video-4",
    title: "Business Training Resource 4",
    description:
      "A supplemental lesson for building stronger business systems and decision-making skills.",
    category: "Leadership",
    type: "video",
    youtubeUrl: "https://youtu.be/x60gG9zi0bI",
  },
  {
    id: "business-resource-video-5",
    title: "Business Training Resource 5",
    description:
      "Bonus entrepreneurial education intended to support the main business-management program.",
    category: "Business",
    type: "video",
    youtubeUrl: "https://youtu.be/1WTD-V2F_N8",
  },

  {
    id: "business-toolkit-index",
    title: "Business Resource Toolkit",
    description:
      "An index and recommended learning sequence for all five downloadable business tools.",
    category: "Templates",
    type: "pdf",
    downloadUrl: "/resources/00_business_toolkit_index.pdf",
    featured: true,
  },
  {
    id: "idea-validation-workbook",
    title: "Business Idea Validation Workbook",
    description:
      "Interview customers, test demand, evaluate evidence, and design a minimum viable offer.",
    category: "Strategy",
    type: "worksheet",
    downloadUrl: "/resources/01_business_idea_validation_workbook.pdf",
    featured: true,
  },
  {
    id: "cofounder-equity-worksheet",
    title: "Co-Founder Equity Decision Worksheet",
    description:
      "Prepare ownership, contribution, vesting, responsibility, and founder-alignment discussions.",
    category: "Startups",
    type: "worksheet",
    downloadUrl: "/resources/02_cofounder_equity_decision_worksheet.pdf",
  },
  {
    id: "business-model-canvas",
    title: "Business Model & Offer Canvas",
    description:
      "Organize your customer, problem, offer, delivery system, revenue model, and unit economics.",
    category: "Business",
    type: "template",
    downloadUrl: "/resources/03_business_model_and_offer_canvas.pdf",
  },
  {
    id: "marketing-acquisition-planner",
    title: "Marketing & Customer Acquisition Planner",
    description:
      "Define your customer, message, channels, campaign targets, and acquisition scorecard.",
    category: "Marketing",
    type: "template",
    downloadUrl: "/resources/04_marketing_customer_acquisition_planner.pdf",
  },
  {
    id: "execution-kpi-planner",
    title: "90-Day Execution & KPI Planner",
    description:
      "Turn business strategy into quarterly priorities, weekly execution, ownership, and measurable KPIs.",
    category: "Leadership",
    type: "template",
    downloadUrl: "/resources/05_90_day_execution_kpi_planner.pdf",
  },
];
