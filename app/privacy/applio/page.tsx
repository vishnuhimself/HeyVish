import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applio Privacy Policy - 100% On-Device Portfolio Analytics",
  description: "Applio's privacy policy explains how we handle your App Store Connect data. Your API credentials and app metrics are stored entirely on-device, with zero third-party tracking or external servers.",
  keywords: "Applio, privacy policy, App Store Connect, iOS app, indie developer, analytics, secure storage, local database, on-device, data privacy",
  robots: "index, follow",
  openGraph: {
    title: "Applio Privacy Policy",
    description: "Learn how Applio protects your App Store Connect API credentials and portfolio data with local-only storage and no third-party tracking.",
    type: "website",
    url: "https://heyvish.com/privacy/applio",
  },
  alternates: {
    canonical: "https://heyvish.com/privacy/applio",
  },
};

export default function ApplioPrivacy() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* Privacy Policy Content */}
        <article className="prose dark:prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-a:underline prose-a:underline-offset-4 prose-hr:border-foreground">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Applio Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: June 16, 2026</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Applio, we take your privacy and the security of your App Store Connect data extremely seriously. This Privacy Policy explains how we handle your information. We built Applio with a strict "local-first" philosophy to give indie developers and small studios a powerful analytics dashboard without ever exposing their data to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">100% On-Device Data Storage</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Applio is designed so that your app portfolio data never leaves your device:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>All portfolio analytics, sales reports, subscriptions, impressions, and crash metrics are stored in a local SQLite database on your iPhone.</li>
                <li>We do not operate any backend servers.</li>
                <li>We do not collect, transmit, or store any of your App Store Connect data on our own infrastructure.</li>
                <li>We do not share your data with any third-party analytics or tracking networks.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">API Credentials and Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Connecting Applio to your App Store Connect account requires sensitive API credentials (Issuer ID, Key ID, and p8 Private Key). We ensure these are handled securely:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Credentials are stored securely in the iOS Keychain using strict access controls, only accessible when the device is unlocked.</li>
                <li>Your private keys are never transmitted to our servers or any third-party.</li>
                <li>JWT (JSON Web Token) signing for App Store Connect API requests happens entirely on-device.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Direct Connection to Apple</h2>
              <p className="text-muted-foreground leading-relaxed">
                Applio connects directly from your device to Apple&apos;s App Store Connect API. There is no middleman, proxy server, or intermediary service involved. Your device communicates directly with Apple to fetch your portfolio data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">No Account Required</h2>
              <p className="text-muted-foreground leading-relaxed">
                Applio operates without requiring you to create an account with us. There is no Applio cloud sync or backend registration. You simply enter your App Store Connect API keys locally and start using the app.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Deletion</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Because all data is stored locally, you have complete and immediate control over its deletion:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Deleting your API keys within the app instantly removes them from your iOS Keychain.</li>
                <li>Uninstalling Applio entirely wipes your local SQLite database and all associated portfolio data from your device.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">App Permissions</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Applio requires minimal device permissions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Network access (strictly to communicate with Apple&apos;s App Store Connect API and process in-app purchases).</li>
                <li>Push notifications (optional, if configured for local background fetching alerts).</li>
                <li>No access to contacts, precise location, camera, or other sensitive information.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Changes to Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any updates to this privacy policy will be reflected in the app and on our website. Users will be notified of significant changes through app updates. Our core commitment to on-device storage and zero third-party tracking will never change.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our privacy policy or how we secure your App Store Connect API keys, please contact us at:{" "}
                <a href="mailto:hey@heyvish.com" className="text-foreground hover:underline">
                  hey@heyvish.com
                </a>
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
