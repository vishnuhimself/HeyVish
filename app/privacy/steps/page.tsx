import type { Metadata } from "next";
import { DocPage } from "@/components/docs/DocPage";

export const metadata: Metadata = {
  title: "Stepsly Privacy Policy - Health & Fitness Activity Tracker",
  description: "Stepsly's privacy policy explains how I handle your health data from Apple Health. All data is stored locally on your device with no external servers or data collection.",
  keywords: "Stepsly, privacy policy, step counter, health tracking, activity tracker, data privacy, local storage, Apple Health, HealthKit",
  robots: "index, follow",
  openGraph: {
    title: "Stepsly Privacy Policy",
    description: "Learn how Stepsly protects your health data with local-only storage and no data collection.",
    type: "website",
    url: "https://heyvish.com/privacy/steps",
  },
  alternates: {
    canonical: "https://heyvish.com/privacy/steps",
  },
};

export default function StepsPrivacy() {
  return (
    <DocPage kind="privacy" title="Stepsly Privacy Policy" subtitle="Last updated: October 20, 2026" app="Stepsly" icon="/stepsly-icon.jpg">
      <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Stepsly is made by one person, and I take your privacy seriously. This Privacy Policy explains how I handle your health and activity data in my fitness tracking application. I believe in complete transparency and user control over personal data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Collection and Storage</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Stepsly is designed with privacy at its core. I access health data from Apple Health using HealthKit solely to display it in an accessible format. All data is stored locally on your device:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Step count data from Apple Health</li>
                <li>Calories burned data from Apple Health</li>
                <li>Distance traveled data from Apple Health</li>
                <li>App preferences and display settings</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                I do not collect, transmit, or store any of your health data on external servers. All information remains exclusively on your device and under your control. Stepsly only reads data from Apple Health to present it to you in a convenient format.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Apple Health and HealthKit Integration</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Stepsly connects to Apple Health using HealthKit to read your activity data. This integration:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Only reads data - I never write data to Apple Health</li>
                <li>Requires your explicit permission for each data type</li>
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
                Stepsly operates without user accounts or registration. You can start using the app immediately without providing any personal information. There is no sync functionality or cloud backup - everything stays on your device.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data is secured by your device&apos;s built-in security features. Since all data is stored locally and accessed through Apple&apos;s HealthKit framework, it benefits from iOS&apos;s encryption and security measures. I never transmit your health data over the internet.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Deletion</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You have complete control over your data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Revoke HealthKit permissions at any time through iOS Settings</li>
                <li>All app preferences can be reset within the app</li>
                <li>Uninstalling the app removes all associated data and preferences</li>
                <li>Your health data in Apple Health remains unaffected by my app</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Stepsly does not integrate with any third-party services, analytics platforms, or advertising networks. I do not share any data with external parties. The only external system I interact with is Apple&apos;s HealthKit framework on your device.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">App Permissions</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Stepsly requires minimal device permissions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>HealthKit access (to read steps, calories, and distance data only)</li>
                <li>No access to contacts, location, camera, or other sensitive information</li>
                <li>No network access required for core functionality</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Changes to Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any updates to this privacy policy will be reflected in the app and on my website. Users will be notified of significant changes through app updates. I will never change my core commitment to local-only data storage without explicit notification.
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

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                This privacy policy complies with the requirements of the Apple App Store, including Apple&apos;s HealthKit guidelines and data privacy requirements. I am committed to protecting your privacy and maintaining the security of your personal health information.
              </p>
            </div>
          </section>
    </DocPage>
  );
}

