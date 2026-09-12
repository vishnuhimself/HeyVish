import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GrowthKit Privacy Policy - Height & Weight Tracking App",
  description: "GrowthKit's privacy policy explains how we handle your height, weight, and BMI data. Records stay on your device unless you choose optional private iCloud sync or export a backup.",
  keywords: "GrowthKit, privacy policy, height tracking, weight tracking, BMI calculator, data privacy, local storage",
  robots: "index, follow",
  openGraph: {
    title: "GrowthKit Privacy Policy",
    description: "Learn how GrowthKit protects your height and weight data with local storage and optional private iCloud sync.",
    type: "website",
    url: "https://heyvish.com/privacy/growthkit",
  },
  alternates: {
    canonical: "https://heyvish.com/privacy/growthkit",
  },
};

export default function GrowthKitPrivacy() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* Privacy Policy Content */}
        <article className="prose dark:prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-a:underline prose-a:underline-offset-4 prose-hr:border-foreground">
          <h1 className="text-3xl font-bold mb-2 text-foreground">GrowthKit Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: September 9, 2026</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At GrowthKit, we take your privacy seriously. This Privacy Policy explains how we handle your data in our height, weight, and BMI tracking application. We believe in complete transparency and user control over personal data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Collection and Storage</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                GrowthKit stores growth records on your device. These can include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Height measurements</li>
                <li>Weight measurements</li>
                <li>Profile names, birthdays, gender, and optional photos</li>
                <li>Head circumference measurements and notes</li>
                <li>BMI calculations</li>
                <li>App preferences</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Your family records are not sent to our servers. If you choose iCloud sync or restoration, GrowthKit stores profiles, measurements, notes, photos, and recovery copies in your private Apple iCloud account. iCloud is off by default, and an app update does not turn it on for you. During onboarding, GrowthKit may check whether your Apple Account has existing records available to restore; this check does not upload your local records or enable sync.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">No Account Required</h2>
              <p className="text-muted-foreground leading-relaxed">
                GrowthKit does not require a separate GrowthKit account. Optional iCloud features use the Apple Account signed in on your device. Sync supports your own devices using that same Apple Account; it does not share records with other families.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Local records benefit from your device’s security protections. Personal iCloud payloads use CloudKit encrypted fields, and photos and recovery assets use CloudKit asset protection. Apple operates iCloud under its own privacy and security policies. We do not have access to your private family records through our website or CloudKit developer console. We do not make a separate end-to-end encryption guarantee.
              </p>
            </div>

            <div>
                          <h2 className="text-xl font-semibold mb-3 text-foreground">Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              While GrowthKit can be used to track children&apos;s growth, all data management must be done by parents or legal guardians. GrowthKit is intended for parents and guardians managing family records, not for children to create independent accounts. Family records are not used for advertising.
            </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Data Backup and Deletion</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You have complete control over your data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>You can export a JSON backup containing records and available photo bytes. Exported files are not encrypted by GrowthKit; protect the file and share it only with recipients you trust.</li>
                <li>You can delete profiles and measurements in the app. While iCloud is enabled, deletions synchronize to joined devices; recovery copies and retained change history may remain available afterward.</li>
                <li>Turning off iCloud or uninstalling GrowthKit does not delete your iCloud records. Uninstalling removes the local installation; your existing iCloud records can be restored later.</li>
                <li>Recovery snapshots, conflicting versions, photos referenced by history, and deletion markers are retained to protect recovery and prevent old devices from restoring deleted records. Retained history is not immediately erased when an individual record is deleted.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Apple processes App Store purchases and optional iCloud storage. RevenueCat processes purchase history and an app user identifier to verify subscriptions and restore purchases; family profiles, photos, and measurements are not sent to RevenueCat by GrowthKit. A signed configuration endpoint hosted on Vercel delivers operational safety settings for iCloud. Requests do not contain family records or Apple Account identifiers; hosting providers may process ordinary network information, such as IP addresses, to deliver and secure the service. GrowthKit does not use this information for advertising or cross-app tracking.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">App Permissions</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                GrowthKit requires minimal device permissions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Photo-library or camera access when you choose to add a profile photo</li>
                <li>Notification permission if you enable measurement reminders</li>
                <li>iCloud availability through your device’s Apple Account for optional sync and recovery</li>
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
                For questions about your records, recovery, or this policy, contact us using the address above. Apple and RevenueCat also publish privacy policies describing how they operate their services.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
} 