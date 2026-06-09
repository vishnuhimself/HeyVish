# Project Structure

```
NovaWidgets/
├── NovaWidgets/                    # Main app target
│   ├── NovaWidgetsApp.swift        # @main entry, font registration, HealthKit bootstrap
│   ├── GalleryView.swift           # Widget gallery with pill-bar filter, 2-col grid
│   ├── WidgetDetailView.swift      # Preview + customization (color, appearance)
│   ├── SettingsView.swift          # Dark mode style picker, step goal stepper
│   ├── WidgetCatalog.swift         # Static catalog of all widget items
│   ├── WidgetFilter.swift          # Filter enum + trending/free/category/favorites logic
│   ├── WidgetPreviewSurface.swift  # Renders widget at real aspect ratio on chosen background
│   ├── WidgetVariantContent.swift  # Routes WidgetVariant → concrete widget view
│   ├── ProPaywallView.swift        # In-app purchase paywall UI
│   ├── ProStore.swift              # Pro status state management
│   ├── FavoritesStore.swift        # @Observable favorites persisted in UserDefaults
│   ├── HealthPermissionSheet.swift # Per-metric HealthKit authorization UI
│   └── Assets.xcassets/
│
├── NovaWidgetsExtension/           # WidgetKit extension target
│   ├── Widgets/                    # Grouped by domain (Clock, Health, Progress, Calendar)
│   │   ├── ClockWidgets.swift
│   │   ├── HealthWidgets.swift
│   │   ├── ProgressWidgets.swift
│   │   ├── ProgressTimelineProvider.swift
│   │   ├── DotsWidgets.swift       # Dot-style progress widgets
│   │   ├── CalendarWidgets.swift
│   │   ├── NewFreeWidgets.swift    # Additional free clock & calendar widgets
│   │   ├── NewProHealthWidgets.swift # Pro-tier health widgets
│   │   ├── LockScreenWidgets.swift # Accessory widgets
│   │   ├── ProOverlay.swift        # Renders the lock overlay for unpaid widgets
│   │   ├── OpenSystemAppIntent.swift # Interactive intents for opening Apple Health
│   │   └── *ConfigurationIntent.swift # AppIntents (some also defined inline in widget files)
│   └── NovaWidgetsExtension.swift  # Extension entry point
│
├── NovaWidgetsCore/                # Local Swift Package — shared between app & extension
│   ├── Package.swift
│   └── Sources/NovaWidgetsCore/
│       ├── Models.swift            # WidgetTheme, NovaProgressKind
│       ├── Tints.swift             # NovaTint, NovaTintPresets, Color+hex
│       ├── WidgetBackgroundStyle.swift  # Background enum + fill rendering
│       ├── NovaSettings.swift      # App Group shared settings + NovaSettingsStore
│       ├── SharedSettings.swift    # App Group ID constant (stub)
│       ├── Fonts.swift             # Font registration + Font extension helpers
│       ├── ProgressCalculator.swift
│       ├── ClockTimeFormat.swift
│       ├── Health/
│       │   ├── HealthKitClient.swift   # HKHealthStore wrapper, fetch + background delivery
│       │   ├── HealthStore.swift       # Permission state, cached snapshots
│       │   ├── HealthSnapshot.swift    # Value type for today's health metrics
│       │   └── *WidgetView.swift       # Individual health widget views
│       ├── *WidgetView.swift       # Individual progress/clock/calendar/lock screen widget views
│       └── Resources/             # Bundled .ttf/.otf font files
│
└── NovaWidgets.xcodeproj/
```

## Architecture Notes

- **Shared Core pattern:** All widget rendering views, models, settings, and health logic live in `NovaWidgetsCore` so both the app and the extension render identically.
- **App target** owns navigation, the gallery, customization UI, Paywall, and WidgetCenter calls.
- **Extension target** owns timeline providers and widget configurations (AppIntents).
- **No networking layer** — all data is local (HealthKit, UserDefaults, App Group), except for StoreKit for Pro unlock.
- **Widget variants** are identified by the `WidgetVariant` enum; `WidgetVariantContent` maps each case to its view.
- **Catalog-driven gallery** — adding a new widget means adding a `WidgetCatalogItem` entry and a corresponding view in Core.
- **Pro Gating** — Pro widgets are protected by an overlay if the user hasn't paid, implemented via `ProOverlay` in the extension and `ProWidgetOverlay` in the app.
