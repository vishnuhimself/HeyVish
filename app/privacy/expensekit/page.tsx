import type { Metadata } from "next";
import { DocPage } from "@/components/docs/DocPage";

export const metadata: Metadata = {
  title: "Expenly Privacy Policy - Daily Expense Tracker App",
  description: "Expenly's privacy policy explains how I handle your expense tracking data. All data is stored locally on your device with no external servers or data collection.",
  keywords: "Expenly, privacy policy, expense tracking, daily expenses, data privacy, local storage",
  robots: "index, follow",
  openGraph: {
    title: "Expenly Privacy Policy",
    description: "Learn how Expenly protects your expense data with local-only storage and no data collection.",
    type: "website",
    url: "https://heyvish.com/privacy/expensekit",
  },
  alternates: {
    canonical: "https://heyvish.com/privacy/expensekit",
  },
};

export default function ExpenlyPrivacy() {
  return (
    <DocPage kind="privacy" title="Expenly Privacy Policy" subtitle="Last updated: October 20, 2026" app="Expenly" icon="/expenly-icon.jpg">
      <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Expenly is made by one person, and I take your privacy seriously. This Privacy Policy explains how I handle your data in my daily expense tracking application. I believe in complete transparency and user control over personal data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Collection and Storage</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Expenly is designed with privacy at its core. All data is stored locally on your device:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Expense records</li>
                <li>Transaction details</li>
                <li>Category information</li>
                <li>Budget settings</li>
                <li>App preferences</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                I do not collect, transmit, or store any of your data on external servers. All information remains exclusively on your device and under your control.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">No Account Required</h2>
              <p className="text-muted-foreground leading-relaxed">
                Expenly operates without user accounts or registration. You can start using the app immediately without providing any personal information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data is secured by your device&apos;s built-in security features. Since all data is stored locally, it benefits from your device&apos;s encryption and security measures.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Children&apos;s Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Expenly is designed for adult users to manage their personal finances. I do not knowingly collect any personal information from children.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Backup and Deletion</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You have complete control over your data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>All data can be exported for backup</li>
                <li>Data can be completely deleted from the app at any time</li>
                <li>Uninstalling the app removes all associated data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Expenly does not integrate with any third-party services or analytics platforms. I do not share any data with external parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">App Permissions</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Expenly requires minimal device permissions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>No access to contacts, location, or other sensitive information</li>
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

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                This policy is written to meet the App Store&apos;s privacy requirements. I am committed to protecting your privacy and maintaining the security of your personal information.
              </p>
            </div>
          </section>
    </DocPage>
  );
}


