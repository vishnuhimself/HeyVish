import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova Widgets Privacy Policy - Widget Customization & Health Data",
  description: "Nova Widgets privacy policy explains how we handle your data. We store your preferences locally and access Apple Health data securely with no external tracking.",
  keywords: "Nova Widgets, privacy policy, widgets, iOS widgets, health data, HealthKit, local storage, data privacy",
  robots: "index, follow",
  openGraph: {
    title: "Nova Widgets Privacy Policy",
    description: "Learn how Nova Widgets protects your data with local-only storage and secure Apple Health integration.",
    type: "website",
    url: "https://heyvish.com/privacy/nova",
  },
  alternates: {
    canonical: "https://heyvish.com/privacy/nova",
  },
};

export default function NovaPrivacy() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* Privacy Policy Content */}
        <article className="prose dark:prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-a:underline prose-a:underline-offset-4 prose-hr:border-foreground">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Nova Widgets Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: June 9, 2026</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Nova Widgets, we take your privacy seriously. This Privacy Policy explains how we handle your data when you use our curated gallery of stylish home screen and lock screen widgets. We believe in complete transparency and user control over personal data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Collection and Storage</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Nova Widgets is designed with privacy at its core. All your data and preferences are stored locally on your device:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Widget customizations and favorite items</li>
                <li>App preferences and display settings</li>
                <li>Health data (steps, distance, calories, heart rate) accessed via Apple Health</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We do not collect, transmit, or store any of your personal or health data on external servers. All information remains exclusively on your device and under your control.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Apple Health and HealthKit Integration</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Nova Widgets connects to Apple Health using HealthKit to display health metrics on specific widgets. This integration:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Only reads data - we never write data to Apple Health</li>
                <li>Requires your explicit permission for each specific data type</li>
                <li>Can be revoked at any time through iOS Settings</li>
                <li>Does not share your health data with any third parties</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Your health data is protected by Apple&apos;s strict HealthKit privacy guidelines, which we fully comply with.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">No Account Required</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nova Widgets operates without user accounts or registration. You can start using the app immediately without providing any personal information. There is no sync functionality or cloud backup - everything stays on your device.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data is secured by your device&apos;s built-in security features. Since all data is stored locally, it benefits from iOS&apos;s encryption and security measures. We never transmit your health data or widget preferences over the internet.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Deletion</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You have complete control over your data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Revoke HealthKit permissions at any time through iOS Settings</li>
                <li>Uninstalling the app removes all associated data and preferences</li>
                <li>Your health data in Apple Health remains unaffected by our app</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nova Widgets integrates with Apple&apos;s StoreKit for processing in-app purchases (Pro unlock). We do not use any third-party analytics platforms or advertising networks. We do not share any data with external parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">App Permissions</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Nova Widgets requires minimal device permissions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>HealthKit access (only to read selected metrics for your widgets)</li>
                <li>No access to contacts, location, camera, or other sensitive information</li>
                <li>No network access required for core functionality (except for App Store purchases)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Changes to Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any updates to this privacy policy will be reflected in the app and on our website. Users will be notified of significant changes through app updates.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our privacy policy or data handling practices, please contact us at:{" "}
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
