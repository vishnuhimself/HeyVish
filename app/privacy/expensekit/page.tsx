import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ExpenseKit Privacy Policy - Daily Expense Tracker App",
  description: "ExpenseKit's privacy policy explains how we handle your expense tracking data. All data is stored locally on your device with no external servers or data collection.",
  keywords: "ExpenseKit, privacy policy, expense tracking, daily expenses, data privacy, local storage",
  robots: "index, follow",
  openGraph: {
    title: "ExpenseKit Privacy Policy",
    description: "Learn how ExpenseKit protects your expense data with local-only storage and no data collection.",
    type: "website",
    url: "https://heyvish.com/privacy/expensekit",
  },
  alternates: {
    canonical: "https://heyvish.com/privacy/expensekit",
  },
};

export default function ExpenseKitPrivacy() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto py-8">
        {/* Privacy Policy Content */}
        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold mb-2 text-foreground">ExpenseKit Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 12, 2025</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At ExpenseKit, we take your privacy seriously. This Privacy Policy explains how we handle your data in our daily expense tracking application. We believe in complete transparency and user control over personal data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Collection and Storage</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                ExpenseKit is designed with privacy at its core. All data is stored locally on your device:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Expense records</li>
                <li>Transaction details</li>
                <li>Category information</li>
                <li>Budget settings</li>
                <li>App preferences</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We do not collect, transmit, or store any of your data on external servers. All information remains exclusively on your device and under your control.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">No Account Required</h2>
              <p className="text-muted-foreground leading-relaxed">
                ExpenseKit operates without user accounts or registration. You can start using the app immediately without providing any personal information.
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
                ExpenseKit is designed for adult users to manage their personal finances. We do not knowingly collect any personal information from children.
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
                ExpenseKit does not integrate with any third-party services or analytics platforms. We do not share any data with external parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">App Permissions</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                ExpenseKit requires minimal device permissions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Storage access (for local data storage only)</li>
                <li>No access to contacts, location, or other sensitive information</li>
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

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                This privacy policy complies with the requirements of the Apple App Store and Google Play Store. We are committed to protecting your privacy and maintaining the security of your personal information.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}


