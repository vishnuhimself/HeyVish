import type { Metadata } from "next";
import { DocPage } from "@/components/docs/DocPage";

export const metadata: Metadata = {
  title: "Nova Widgets Privacy Policy - Widget Customization & Health Data",
  description: "Nova Widgets privacy policy explains how I handle your data. I store your preferences locally and access Apple Health data securely with no external tracking.",
  keywords: "Nova Widgets, privacy policy, widgets, iOS widgets, health data, HealthKit, local storage, data privacy",
  robots: "index, follow",
  openGraph: {
    title: "Nova Widgets Privacy Policy",
    description: "Learn how Nova Widgets protects your data with local-only storage and secure Apple Health integration.",
    type: "website",
    url: "https://heyvish.com/privacy/nova-widgets",
  },
  alternates: {
    canonical: "https://heyvish.com/privacy/nova-widgets",
  },
};

export default function NovaPrivacy() {
  return (
    <DocPage kind="privacy" title="Nova Widgets Privacy Policy" subtitle="Last updated: October 20, 2026" app="Nova Widgets" icon="/nova-widgets-icon.jpg" notice="Nova Widgets is no longer available on the App Store. This policy still applies to existing installs.">
      <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nova Widgets is made by one person, and I take your privacy seriously. This Privacy Policy explains how I handle your data when you use my curated gallery of stylish home screen and lock screen widgets. I believe in complete transparency and user control over personal data.
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
                I do not collect, transmit, or store any of your personal or health data on external servers. All information remains exclusively on your device and under your control.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Apple Health and HealthKit Integration</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Nova Widgets connects to Apple Health using HealthKit to display health metrics on specific widgets. This integration:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Only reads data - I never write data to Apple Health</li>
                <li>Requires your explicit permission for each specific data type</li>
                <li>Can be revoked at any time through iOS Settings</li>
                <li>Does not share your health data with any third parties</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Your health data is protected by Apple&apos;s strict HealthKit privacy guidelines, which I fully comply with.
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
                Your data is secured by your device&apos;s built-in security features. Since all data is stored locally, it benefits from iOS&apos;s encryption and security measures. I never transmit your health data or widget preferences over the internet.
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
                <li>Your health data in Apple Health remains unaffected by my app</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nova Widgets integrates with Apple&apos;s StoreKit for processing in-app purchases (Pro unlock). I do not use any third-party analytics platforms or advertising networks. I do not share any data with external parties.
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
                Any updates to this privacy policy will be reflected in the app and on my website. Users will be notified of significant changes through app updates.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about my privacy policy or data handling practices, please contact me at:{" "}
                <a href="mailto:hey@heyvish.com" className="text-foreground hover:underline">
                  hey@heyvish.com
                </a>
              </p>
            </div>
          </section>
    </DocPage>
  );
}
