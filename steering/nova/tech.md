# Tech Stack

## Platform & Language

- **Language:** Swift 5 with Swift 6 concurrency (`SWIFT_APPROACHABLE_CONCURRENCY`, `SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor`)
- **Minimum deployment:** iOS 17.0
- **UI framework:** SwiftUI (no UIKit views)
- **Xcode:** 26.0+

## Build System

- **Project type:** Xcode project (`NovaWidgets.xcodeproj`) — not a Swift Package workspace
- **Targets:**
  - `NovaWidgets` — main iOS app
  - `NovaWidgetsExtensionExtension` — WidgetKit extension (`.appex`)
- **Local Swift Package:** `NovaWidgetsCore` (swift-tools-version 6.0) — shared library consumed by both targets
- **Bundle ID:** `com.app.NovaWidgets` (extension: `.NovaWidgetsExtension`)
- **App Group:** `group.com.app.NovaWidgets`

## Frameworks & Libraries

- SwiftUI
- WidgetKit (extension target, using `AppIntentConfiguration` and `.containerBackground`)
- HealthKit (read-only)
- StoreKit (for Pro paywall)
- CoreText (custom font registration)
- No third-party dependencies

## Custom Fonts (bundled in NovaWidgetsCore/Resources)

Space Mono, Instrument Serif, Fragment Mono, Departure Mono, Doto, Bricolage Grotesque, Big Shoulders Display, Fraunces, VT323, Finlandica, Alata, Bitcount Grid Single, Micro 5, Playwrite AU SA

Fonts are registered at launch via `CTFontManagerRegisterFontsForURL` and accessed through `Font` extension helpers (e.g. `.spaceMono(size:weight:)`).

## Build & Run

```bash
# Build the project from the command line
xcodebuild -project NovaWidgets.xcodeproj -scheme NovaWidgets -sdk iphoneos build

# Build the shared package independently
cd NovaWidgetsCore && swift build

# Run SwiftUI previews
# Use Xcode's canvas (Cmd+Option+P) — no CLI equivalent
```

## Key Conventions

- Swift strict concurrency: all mutable state is `@MainActor` isolated
- `@Observable` macro for state stores (not `ObservableObject`/`@Published`)
- No Combine usage in new code — prefer `async/await` and `NotificationCenter`
- Widget configuration uses modern WidgetKit AppIntents (iOS 17+)
- Cross-process settings via `UserDefaults(suiteName:)` through `NovaSettings`
- Accessory Widgets (Lock Screen) are supported alongside Home Screen widgets
