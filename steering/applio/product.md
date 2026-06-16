# Applio — Product Overview

Applio (project folder: AppDash) is an iOS app for indie developers and small studios who publish on the App Store. It provides a single on-device dashboard to monitor an entire app portfolio — downloads, revenue, reviews, subscriptions, impressions, crash metrics — without opening App Store Connect.

## Core Value Proposition
- Portfolio-level and per-app metrics at a glance
- Full discovery funnel: impressions → page views → conversion
- Customer reviews with Apple AI-generated summaries and inline reply support
- 100% on-device: no backend, no accounts, no third-party data sharing
- JWT signing happens on-device using `@noble/curves` (ES256)

## Target User
Solo developer or small studio with one or more iOS apps who wants quick visibility into their whole portfolio from their phone.

## Key Constraints
- iOS only (no Android/Google Play)
- Single set of App Store Connect API credentials per install
- All data stored in local SQLite — never sent to any third-party server
- Credentials stored in iOS Keychain via `expo-secure-store` (`WHEN_UNLOCKED_THIS_DEVICE_ONLY`)

## Information Architecture
Three tabs: **Dash** · **Reviews** · **Settings**, with a header **App Picker** that scopes all tabs to a single app or shows portfolio-aggregate data (All Apps mode).

## API Key Types
- **Team key (Admin):** Full access — analytics, sales reports, subscriptions
- **Individual key:** Limited — no sales/analytics report creation (403 on protected endpoints); app detects this and explains it inline

## Data Freshness & Processing
- **Reporting Delay:** Apple prepares sales and download reports overnight. Reports are always for the previous day, published around 2:00 PM UTC. The app uses friendly, non-alarming language (e.g., "Yesterday's data, today") to set these expectations.
- **FX Rates:** Revenue is reported by Apple in each country's local currency. Applio estimates USD proceeds using current exchange rates, so figures may differ slightly from final payout. User-facing FX disclaimers are shown where applicable.
