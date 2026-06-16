# Project Structure

## Root Layout

```
AppDash/
├── app/                  # expo-router screens (file-based routing)
├── components/           # Shared React components
├── lib/                  # Business logic, API client, DB, state
├── theme/                # Design tokens, typography, font assets
├── assets/               # Static assets (fonts, images, icons)
├── android/              # Android native project (Expo prebuild)
└── .kiro/                # Kiro steering rules
```

## `app/` — Screens & Routing

```
app/
├── _layout.tsx           # Root layout: providers (SQLite, QueryClient, Theme, GestureHandler)
├── index.tsx             # Entry point / redirect
├── (auth)/               # Unauthenticated flow
│   ├── _layout.tsx
│   ├── welcome.tsx       # Landing / sign-in prompt
│   └── connect.tsx       # API credential entry (Issuer ID, Key ID, p8, Vendor Number)
├── (tabs)/               # Main authenticated app
│   ├── _layout.tsx       # Tab bar definition (Dash · Reviews · Settings)
│   └── dash.tsx          # Primary dashboard screen (large, self-contained)
├── settings.tsx          # Settings modal (transparentModal presentation)
├── apps.tsx              # App picker modal
├── app-detail.tsx        # Per-app detail screen
└── onboarding.tsx        # Onboarding flow (fullScreenModal)
```

## `components/` — UI Components

```
components/
├── ui/                   # Core design-system primitives
│   ├── Button.tsx        # variant: primary | secondary | ghost | destructive
│   ├── Card.tsx
│   ├── Chip.tsx
│   ├── EmptyState.tsx
│   ├── Icon.tsx          # SF Symbols wrapper (expo-symbols)
│   ├── Pressable.tsx     # Haptic-aware pressable base
│   ├── Screen.tsx        # SafeAreaView + optional ScrollView wrapper
│   ├── Skeleton.tsx      # Loading placeholder
│   ├── Stack.tsx         # HStack / VStack layout helpers
│   └── Text.tsx          # Typography component with `preset` prop
├── charts/
│   └── AreaChart.tsx
├── AppPicker.tsx          # App selection sheet
├── FloatingAppPicker.tsx  # FAB for app picker
├── FloatingMetricPicker.tsx # FAB for metric selection
├── DashboardView.tsx
├── FirstSyncScreen.tsx
└── Paywall.tsx
```

## `lib/` — Business Logic

```
lib/
├── asc/                  # App Store Connect API client
│   ├── client.ts         # Base fetch wrapper (auth, error handling, retry)
│   ├── jwt.ts            # On-device JWT generation (ES256 via @noble/curves)
│   ├── types.ts          # Shared ASC TypeScript types
│   ├── apps.ts           # GET /v1/apps
│   ├── sales.ts          # Sales Reports TSV parser
│   ├── analytics.ts      # Analytics Reports API
│   ├── reviews.ts        # Customer Reviews API
│   ├── subscriptions.ts
│   ├── crashes.ts
│   └── errors.ts         # Typed AscError class
├── db/
│   ├── schema.ts         # SQLite schema + versioned migrations (PRAGMA user_version)
│   └── queries.ts        # Typed query helpers (upsert, range selects, aggregates)
├── sync/                 # Data sync orchestration
│   ├── downloads.ts
│   ├── analytics.ts
│   ├── reviews.ts
│   └── subscriptions.ts
├── hooks/                # React Query hooks (data fetching + mutations)
│   ├── useDownloads.ts
│   ├── useEarnings.ts
│   ├── usePortfolio.ts
│   ├── useReviews.ts
│   ├── useApps.ts
│   └── ...
├── stores/               # Zustand stores (persistent state)
│   ├── auth.ts           # Credentials + auth status
│   ├── theme.ts          # Light / dark / system preference
│   ├── selectedApp.ts    # Currently selected app (or null = All Apps)
│   ├── dashBar.ts        # Dash UI state (paywall mode, etc.)
│   └── notifications.ts
├── constants/
│   ├── metrics.ts        # CHART_METRICS definitions (key, label, color, icon)
│   └── tabBar.ts         # FAB sizing constants
├── credentials.ts        # SecureStore read/write helpers for API credentials
├── format.ts             # Number/date/currency formatters, flagEmoji()
├── notifications.ts      # Notification scheduling helpers
├── purchases.ts          # RevenueCat initialization + paywall resolution
└── queryClient.ts        # TanStack Query client singleton
```

## `theme/` — Design System

```
theme/
├── tokens.ts     # Color palettes (lightColors / darkColors), spacing, radii, motion, shadows
├── hooks.ts      # useColors(), useEffectiveScheme()
├── typography.ts # Type presets (hero, title1–3, headline, body, footnote, caps, mono, etc.)
├── fonts.ts      # fontFamilies map + fontAssets for useFonts()
└── index.ts      # Re-exports everything
```

## Key Conventions

- **Imports:** Always use the `@/` alias (e.g. `@/theme`, `@/lib/stores/auth`, `@/components/ui`)
- **Colors:** Never hardcode color values in components. Use `const colors = useColors()` and reference semantic tokens (`colors.text`, `colors.bg`, `colors.blue`, etc.)
- **Spacing/radii:** Use `spacing.*` and `radii.*` tokens from `@/theme`, not magic numbers
- **Typography:** Use the `<Text preset="...">` component rather than raw `<Text>` with manual styles. Presets: `hero`, `title1`, `title2`, `title3`, `headline`, `body`, `callout`, `subhead`, `footnote`, `caption`, `caps`, `mono`
- **Primary font:** Space Grotesk (UI text). Space Mono for monospaced labels (country codes, dates). Be Vietnam Pro assets are bundled but Space Grotesk is the active primary
- **Data hooks:** All data fetching lives in `lib/hooks/`. Hooks use `useQuery` / `useMutation` from TanStack Query and `useSQLiteContext()` for DB access
- **Global state:** Zustand stores in `lib/stores/`. Stores persist via `expo-secure-store` where needed
- **API errors:** Caught as `AscError` instances from `lib/asc/errors.ts`; handle `individual_key_not_supported` and `forbidden` codes explicitly in UI
- **Animations:** Use `react-native-reanimated` for UI animations. `LinearTransition.duration(280)` is the standard layout transition (aliased as `LAYOUT_T` in dash.tsx). Modal lists use staggered entry animations (e.g., `FadeIn.duration(220).delay(i * 35)`).
- **SQLite:** All DB access goes through `lib/db/queries.ts` helpers. Schema changes require a new `PRAGMA user_version` migration block in `lib/db/schema.ts`
- **Modals & Cards:** Make entire summary cards tappable using `<Pressable>` wrappers instead of just a "View All" button. Use the `arrow.up.right` icon for "All" links (label should be concise, e.g., "All" instead of "View all").
- **Card Styling:** Standard cards use `backgroundColor: colors.bg`, `borderWidth: 1.5`, `borderColor: colors.border`, `borderRadius: radii.xl`, and `paddingHorizontal: spacing.base`.
- **Formatting:** Format territories using full country names (via `getCountryName` in `lib/format.ts`), not just country codes. Avoid progress bars in modal lists; favor clean numeric/percentage layouts with serial numbers for ranked lists.
