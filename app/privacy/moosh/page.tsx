import type { Metadata } from "next";
import { DocPage } from "@/components/docs/DocPage";

export const metadata: Metadata = {
  title: "Moosh Privacy Policy - Mood Tracker & Journal App",
  description: "Moosh's privacy policy explains how I handle your mood data and journal entries. All sensitive emotional data is stored locally on your device with complete privacy protection.",
  keywords: "Moosh, privacy policy, mood tracker, journal app, emotional data, mental health, data privacy, local storage",
  robots: "index, follow",
  openGraph: {
    title: "Moosh Privacy Policy",
    description: "Learn how Moosh protects your mood data and journal entries with local-only storage and no external access to your personal reflections.",
    type: "website",
    url: "https://heyvish.com/privacy/moosh",
  },
  alternates: {
    canonical: "https://heyvish.com/privacy/moosh",
  },
};

export default function MooshPrivacy() {
  return (
    <DocPage kind="privacy" title="Moosh Privacy Policy" subtitle="Last updated: October 20, 2026" app="Moosh">
      <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Moosh is made by one person, and I take your privacy seriously. This Privacy Policy explains how I handle your data in my mood tracking and journaling application. I believe in complete transparency and user control over personal data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Collection and Storage</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Moosh is designed with privacy at its core. All data is stored locally on your device:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Daily mood entries</li>
                <li>Journal notes and reflections</li>
                <li>Mood patterns and history</li>
                <li>Profile information</li>
                <li>App preferences and settings</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                I do not collect, transmit, or store any of your data on external servers. All information remains exclusively on your device and under your control.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">No Account Required</h2>
              <p className="text-muted-foreground leading-relaxed">
                Moosh operates without user accounts or registration. You can start tracking your mood and journaling immediately without providing any personal information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your mood data and journal entries are secured by your device&apos;s built-in security features. Since all data is stored locally, it benefits from your device&apos;s encryption and security measures.
              </p>
            </div>

            <div>
                          <h2 className="text-xl font-semibold mb-3 text-foreground">Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              While Moosh can be used by teenagers to track their mood and emotional well-being, all data management for users under 13 must be done by parents or legal guardians. I do not knowingly collect any personal information from children.
            </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Backup and Deletion</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You have complete control over your mood data and journal entries:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>All data can be exported for backup purposes</li>
                <li>Individual entries or all data can be deleted from the app at any time</li>
                <li>Uninstalling the app removes all associated data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Moosh does not integrate with any third-party services or analytics platforms. I do not share any of your mood data or journal entries with external parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">App Permissions</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Moosh requires minimal device permissions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>No access to contacts, location, or other sensitive information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Sensitive Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                I understand that mood data and journal entries are highly personal and sensitive. Moosh is designed to keep this information completely private and accessible only to you. I never analyze, process, or access your personal reflections and mood entries.
              </p>
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

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                This policy is written to meet the App Store&apos;s privacy requirements. I am committed to protecting your privacy and maintaining the security of your personal and emotional information.
              </p>
            </div>
          </section>
    </DocPage>
  );
} 