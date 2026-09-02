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
};

export const APP_STORE_PORTFOLIO: AppStorePortfolioApp[] = [
  {
    id: "calmraine",
    appStoreId: "6798650334",
    name: "Calmraine",
    appStoreName: "Migraine Tracker: Calmraine",
    tagline: "Headache Diary & Symptom Log",
    description:
      "A focused headache diary for recording migraine attacks, symptoms, medication, and possible patterns.",
    category: "Medical",
    icon: "/calmraine-icon.jpg",
    href: "https://apps.apple.com/us/app/migraine-tracker-calmraine/id6798650334",
  },
  {
    id: "mnml",
    appStoreId: "6785169924",
    name: "MNML",
    appStoreName: "MNML: Minimal Widgets",
    tagline: "Home & Lock Screen Widgets",
    description:
      "Ready-to-use minimal widgets for a clean, personal iPhone Home Screen and Lock Screen.",
    category: "Utilities",
    icon: "/mnml-icon.jpg",
    href: "https://apps.apple.com/us/app/mnml-minimal-widgets/id6785169924",
  },
  {
    id: "applio",
    appStoreId: "6768385078",
    name: "Applio",
    appStoreName: "Applio: App Sales & Analytics",
    tagline: "Revenue, Downloads & Reviews",
    description:
      "An on-device dashboard for indie developers to monitor App Store downloads, revenue, subscriptions, and reviews.",
    category: "Developer Tools",
    icon: "/applio-icon.jpg",
    href: "https://apps.apple.com/us/app/applio-app-sales-analytics/id6768385078",
  },
  {
    id: "nova-widgets",
    appStoreId: "6776261450",
    name: "Nova Widgets",
    appStoreName: "Nova Widgets - Dark & Minimal",
    tagline: "Dark & Minimal Widgets",
    description:
      "A curated gallery of premium dark widgets for an iPhone Home Screen and Lock Screen.",
    category: "Utilities",
    icon: "/nova-widgets-icon.jpg",
    href: "https://apps.apple.com/us/app/nova-widgets-dark-minimal/id6776261450",
  },
  {
    id: "expenly",
    appStoreId: "6756433597",
    name: "Expenly",
    appStoreName: "Expense Tracker: Expenly",
    tagline: "Budget Planner & Spending Log",
    description:
      "A private, offline-first expense tracker for logging spending, managing budgets, and reviewing habits.",
    category: "Finance",
    icon: "/expenly-icon.jpg",
    href: "https://apps.apple.com/us/app/expense-tracker-expenly/id6756433597",
  },
  {
    id: "stepsly",
    appStoreId: "6753876664",
    name: "Stepsly",
    appStoreName: "Step Counter: Stepsly",
    tagline: "Pedometer & Walking Tracker",
    description:
      "A step counter for iPhone that makes it easy to track daily movement and build a walking habit.",
    category: "Health & Fitness",
    icon: "/stepsly-icon.jpg",
    href: "https://apps.apple.com/us/app/step-counter-stepsly/id6753876664",
  },
  {
    id: "growthkit",
    appStoreId: "6740914430",
    name: "GrowthKit",
    appStoreName: "Child Growth Tracker GrowthKit",
    tagline: "Height, Weight & WHO Charts",
    description:
      "A child growth tracker for recording height, weight, and head circumference against WHO percentile charts.",
    category: "Health & Fitness",
    icon: "/growthkit-icon.jpg",
    href: "https://apps.apple.com/us/app/child-growth-tracker-growthkit/id6740914430",
  },
];
