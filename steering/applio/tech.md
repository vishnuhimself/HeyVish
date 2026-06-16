# Tech Stack

## Platform
- **React Native** (0.83) + **Expo SDK 55** with the New Architecture enabled (`newArchEnabled: true`)
- **expo-router** (file-based routing, typed routes enabled)
- iOS only; portrait orientation; iOS 16+ target
- Bundle ID: `com.applio.app`

## Language
- **TypeScript** (strict mode, `~5.9`)
- Path alias `@/` maps to the project root

## Key Libraries

| Category | Library |
|---|---|
| Navigation | expo-router, @react-navigation/native |
| State | zustand ^5 |
| Server state / caching | @tanstack/react-query ^5 |
| Local database | expo-sqlite (WAL mode) |
| Secure storage | expo-secure-store |
| Crypto / JWT | @noble/curves (ES256 on-device signing), @noble/hashes |
| Charts | react-native-wagmi-charts, victory-native, @shopify/react-native-skia |
| Animations | react-native-reanimated ~4.3, react-native-gesture-handler ^2.31 |
| Icons | @expo/vector-icons, expo-symbols (SF Symbols), lucide-react-native |
| Purchases / paywall | react-native-purchases (RevenueCat) ^10 |
| Notifications | expo-notifications |
| Fonts | @expo-google-fonts/space-grotesk, @expo-google-fonts/space-mono, @expo-google-fonts/be-vietnam-pro |

## Common Commands

```bash
# Start dev server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android
npx expo run:android

# TypeScript check (no emit)
npx tsc --noEmit
```

> There is no Jest/test runner configured. No `npm test` script exists.

## Build Notes
- Uses `expo-dev-client` for custom native builds
- `react-native-get-random-values` and `react-native-gesture-handler` must be imported before everything else in `app/_layout.tsx` (already handled)
- Fonts are loaded non-blocking via `useFonts(fontAssets)` — never block rendering on font load
- SQLite database is initialized via `SQLiteProvider` with a `migrate()` function that runs versioned `PRAGMA user_version` migrations
