import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steps App Privacy Policy - Health & Fitness Activity Tracker",
  description: "Steps App's privacy policy explains how we handle your health data from Apple Health. All data is stored locally on your device with no external servers or data collection.",
  keywords: "Steps App, privacy policy, step counter, health tracking, activity tracker, data privacy, local storage, Apple Health, HealthKit",
  robots: "index, follow",
  openGraph: {
    title: "Steps App Privacy Policy",
    description: "Learn how Steps App protects your health data with local-only storage and no data collection.",
    type: "website",
    url: "https://heyvish.com/privacy/steps",
  },
  alternates: {
    canonical: "https://heyvish.com/privacy/steps",
  },
};

export default function StepsPrivacy() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto py-8">
        {/* Privacy Policy Content */}
        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold mb-2">Steps App Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: October 15, 2025</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Steps App, we take your privacy seriously. This Privacy Policy explains how we handle your health and activity data in our fitness tracking application. We believe in complete transparency and user control over personal data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Data Collection and Storage</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Steps App is designed with privacy at its core. We access health data from Apple Health using HealthKit solely to display it in an accessible format. All data is stored locally on your device:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Step count data from Apple Health</li>
                <li>Calories burned data from Apple Health</li>
                <li>Distance traveled data from Apple Health</li>
                <li>App preferences and display settings</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We do not collect, transmit, or store any of your health data on external servers. All information remains exclusively on your device and under your control. We only read data from Apple Health to present it to you in a convenient format.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Apple Health and HealthKit Integration</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Steps App connects to Apple Health using HealthKit to read your activity data. This integration:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Only reads data - we never write data to Apple Health</li>
                <li>Requires your explicit permission for each data type</li>
                <li>Can be revoked at any time through iOS Settings</li>
                <li>Does not share your health data with any third parties</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Your health data is protected by Apple&apos;s strict HealthKit privacy guidelines, which we fully comply with.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">No Account Required</h2>
              <p className="text-muted-foreground leading-relaxed">
                Steps App operates without user accounts or registration. You can start using the app immediately without providing any personal information. There is no sync functionality or cloud backup - everything stays on your device.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data is secured by your device&apos;s built-in security features. Since all data is stored locally and accessed through Apple&apos;s HealthKit framework, it benefits from iOS&apos;s encryption and security measures. We never transmit your health data over the internet.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Data Deletion</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You have complete control over your data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Revoke HealthKit permissions at any time through iOS Settings</li>
                <li>All app preferences can be reset within the app</li>
                <li>Uninstalling the app removes all associated data and preferences</li>
                <li>Your health data in Apple Health remains unaffected by our app</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Steps App does not integrate with any third-party services, analytics platforms, or advertising networks. We do not share any data with external parties. The only external system we interact with is Apple&apos;s HealthKit framework on your device.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">App Permissions</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Steps App requires minimal device permissions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>HealthKit access (to read steps, calories, and distance data only)</li>
                <li>No access to contacts, location, camera, or other sensitive information</li>
                <li>No network access required for core functionality</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Changes to Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any updates to this privacy policy will be reflected in the app and on our website. Users will be notified of significant changes through app updates. We will never change our core commitment to local-only data storage without explicit notification.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our privacy policy or data handling practices, please contact us at:{" "}
                <a href="mailto:hey@heyvish.com" className="text-foreground hover:underline">
                  hey@heyvish.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                This privacy policy complies with the requirements of the Apple App Store, including Apple&apos;s HealthKit guidelines and data privacy requirements. We are committed to protecting your privacy and maintaining the security of your personal health information.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

