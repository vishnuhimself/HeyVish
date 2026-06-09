# Product Overview

Nova Widgets is an iOS app that provides a curated gallery of stylish home screen and lock screen widgets. Users browse, preview, and customize widgets before adding them to their Home Screen via the standard WidgetKit flow.

## Widget Families

- **Progress** — Day, week, month, and year visualizations (bars, squares, dots, calendar grids)
- **Clock & Calendar** — Typographic and editorial time/date displays (terminal, vertical, sonnet, pulse, percent, frame, local+remote, dot grid, word clocks, and detailed calendars)
- **Health** — HealthKit-powered widgets showing steps, distance, calories, heart rate
- **Lock Screen** — Minimalist accessory widgets for the Lock Screen (progress, health, calendars)

## Key Features

- Dark-first aesthetic with a monospace (Space Mono) design language
- In-app preview with live color tint and background style customization
- Widget catalog filtered by Hot, Free, Category, and Favorites
- Favorites system persisted locally via UserDefaults
- HealthKit integration (read-only, on-device, no account required)
- Per-metric health permission flow — prompts only for the data a specific widget needs
- App Group shared settings so the widget extension reads user preferences
- Background delivery for HealthKit so widgets stay current

## Monetization & Tiers

The catalog defines a `WidgetTier` (free/pro). The app features a Pro paywall to unlock premium widgets.
- **Free Widgets**: Available to all users, highlighted in the "Free" section of the gallery.
- **Pro Widgets**: Locked behind a paywall (`ProStore`). If added to the Home Screen/Lock Screen without Pro, a `ProWidgetOverlay` or `LockScreenProGate` shows a lock icon and dimmed content.
