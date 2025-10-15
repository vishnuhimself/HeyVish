import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moosh Privacy Policy - Mood Tracker & Journal App",
  description: "Moosh's privacy policy explains how we handle your mood data and journal entries. All sensitive emotional data is stored locally on your device with complete privacy protection.",
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
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto py-8">
        {/* Privacy Policy Content */}
        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Moosh Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: May 24, 2025</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Moosh, we take your privacy seriously. This Privacy Policy explains how we handle your data in our mood tracking and journaling application. We believe in complete transparency and user control over personal data.
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
                We do not collect, transmit, or store any of your data on external servers. All information remains exclusively on your device and under your control.
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
              While Moosh can be used by teenagers to track their mood and emotional well-being, all data management for users under 13 must be done by parents or legal guardians. We do not knowingly collect any personal information from children.
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
                Moosh does not integrate with any third-party services or analytics platforms. We do not share any of your mood data or journal entries with external parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">App Permissions</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Moosh requires minimal device permissions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Storage access (for local data storage only)</li>
                <li>No access to contacts, location, or other sensitive information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Sensitive Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We understand that mood data and journal entries are highly personal and sensitive. Moosh is designed to keep this information completely private and accessible only to you. We never analyze, process, or access your personal reflections and mood entries.
              </p>
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

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                This privacy policy complies with the requirements of the Apple App Store and Google Play Store. We are committed to protecting your privacy and maintaining the security of your personal and emotional information.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
} 