export type AppStorePortfolioApp = {
  id: string;
  appStoreId: string;
  name: string;
  appStoreName: string;
  tagline: string;
  description: string;
  category: string;
  icon: string;
  href: string;
  /** oklch hue used for the app's halo on the site */
  hue: number;
  chroma: number;
  /** A short line about what the app is for, in Vish's voice */
  note: string;
  privacy?: string;
  support?: string;
};

export const APP_STORE_PORTFOLIO: AppStorePortfolioApp[] = [
  {
    id: "stepsly",
    appStoreId: "6753876664",
    name: "Stepsly",
    appStoreName: "Step Counter: Stepsly",
    tagline: "Pedometer & Walking Tracker",
    description:
      "A step counter for iPhone that makes it easy to track daily movement and build a walking habit.",
    note: "Walk more, without a wearable. Reads your steps straight from the phone and turns them into a habit.",
    category: "Health & Fitness",
    icon: "/stepsly-icon.jpg",
    href: "https://apps.apple.com/us/app/step-counter-stepsly/id6753876664",
    hue: 262,
    chroma: 0.16,
    privacy: "/privacy/steps",
    support: "/support/steps",
  },
  {
    id: "expenly",
    appStoreId: "6756433597",
    name: "Expenly",
    appStoreName: "Expense Tracker: Expenly",
    tagline: "Budget Planner & Spending Log",
    description:
      "A private, offline-first expense tracker for logging spending, managing budgets, and reviewing habits.",
    note: "Log a spend in two taps. Offline-first, so your money stays your business.",
    category: "Finance",
    icon: "/expenly-icon.jpg",
    href: "https://apps.apple.com/us/app/expense-tracker-expenly/id6756433597",
    hue: 268,
    chroma: 0.17,
    privacy: "/privacy/expensekit",
    support: "/support/expensekit",
  },
  {
    id: "growthkit",
    appStoreId: "6740914430",
    name: "GrowthKit",
    appStoreName: "Child Growth Tracker GrowthKit",
    tagline: "Height, Weight & WHO Charts",
    description:
      "A child growth tracker for recording height, weight, and head circumference against WHO percentile charts.",
    note: "For parents who want the pediatrician's chart in their pocket. WHO percentiles, doctor-ready PDFs.",
    category: "Health & Fitness",
    icon: "/growthkit-icon.jpg",
    href: "https://apps.apple.com/us/app/child-growth-tracker-growthkit/id6740914430",
    hue: 240,
    chroma: 0.15,
    privacy: "/privacy/growthkit",
    support: "/support/growthkit",
  },
  {
    id: "mnml",
    appStoreId: "6785169924",
    name: "MNML",
    appStoreName: "MNML: Minimal Widgets",
    tagline: "Home & Lock Screen Widgets",
    description:
      "Ready-to-use minimal widgets for a clean, personal iPhone Home Screen and Lock Screen.",
    note: "Widgets that get out of the way. Quiet, monochrome, and ready in a tap.",
    category: "Utilities",
    icon: "/mnml-icon.jpg",
    href: "https://apps.apple.com/us/app/mnml-minimal-widgets/id6785169924",
    hue: 42,
    chroma: 0.12,
  },
];
