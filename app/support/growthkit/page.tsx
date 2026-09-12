import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GrowthKit Support - Help & Contact",
  description: "Get help with GrowthKit. Contact us for support, report bugs, suggest features, or ask questions about child growth tracking and WHO percentile charts.",
  keywords: "GrowthKit, support, help, contact, bug report, feature request, child growth tracker, WHO charts",
  robots: "index, follow",
  openGraph: {
    title: "GrowthKit Support",
    description: "Need help with GrowthKit? Contact us for support, bug reports, or feature suggestions.",
    type: "website",
    url: "https://heyvish.com/support/growthkit",
  },
  alternates: {
    canonical: "https://heyvish.com/support/growthkit",
  },
};

export default function GrowthKitSupport() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-a:underline prose-a:underline-offset-4 prose-hr:border-foreground">
          <h1 className="text-3xl font-bold mb-2 text-foreground">GrowthKit Support</h1>
          <p className="text-muted-foreground mb-8">We&apos;re here to help you and your little one get the most out of GrowthKit</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">For any support inquiries, bug reports, feature requests, or general questions, please email us at:</p>
              <div className="border border-foreground p-6">
                <a href="mailto:hey@heyvish.com" className="text-2xl font-bold text-foreground hover:underline block text-center">hey@heyvish.com</a>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">We typically respond within 24-48 hours. Please include &quot;GrowthKit&quot; in your email subject line.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">How Can We Help?</h2>
              <p className="text-muted-foreground leading-relaxed">Whether you need assistance tracking your child&apos;s growth, have questions about WHO percentile charts, or want to share feedback, we&apos;re here to support you.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">General Help & Support</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Need help using GrowthKit? Have questions about how to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Add and manage growth measurements for your child</li>
                <li>Understand WHO percentile charts and growth curves</li>
                <li>Generate and share doctor-ready PDF reports</li>
                <li>Track weight, height, head circumference, and BMI</li>
                <li>Export your child&apos;s growth data</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">We&apos;re happy to help you with any questions or concerns.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Report a Bug</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">Found something that&apos;s not working as expected? Please let us know! Include a description, steps to reproduce, your device model and OS version, and screenshots if possible.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Feature Requests</h2>
              <p className="text-muted-foreground leading-relaxed">Have an idea for a new feature or improvement? We&apos;d love to hear it! Your feedback helps us make GrowthKit better for every parent and child.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Feedback & Suggestions</h2>
              <p className="text-muted-foreground leading-relaxed">We value your input! Whether it&apos;s about the growth charts, user interface, or overall experience, your feedback helps us improve.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Privacy & Data Questions</h2>
              <p className="text-muted-foreground leading-relaxed">Have questions about how we handle your child&apos;s health data? Check out our <a href="/privacy/growthkit" className="text-foreground hover:underline font-medium">Privacy Policy</a> or contact us directly.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div><h3 className="font-semibold text-foreground mb-2">Where is my child&apos;s growth data stored?</h3><p className="text-muted-foreground leading-relaxed">All growth data is stored locally on your device. GrowthKit does not use cloud storage or external servers.</p></div>
                <div><h3 className="font-semibold text-foreground mb-2">Is my child&apos;s health data secure?</h3><p className="text-muted-foreground leading-relaxed">Absolutely. All data stays on your device. Learn more in our <a href="/privacy/growthkit" className="text-foreground hover:underline">Privacy Policy</a>.</p></div>
                <div><h3 className="font-semibold text-foreground mb-2">What growth standards does GrowthKit use?</h3><p className="text-muted-foreground leading-relaxed">GrowthKit uses WHO (World Health Organization) growth standards — the global gold standard for monitoring child growth from birth to 5 years.</p></div>
                <div><h3 className="font-semibold text-foreground mb-2">Can I export data for my pediatrician?</h3><p className="text-muted-foreground leading-relaxed">Yes! Generate doctor-ready PDF reports with growth charts, percentile data, and measurement history directly from the app.</p></div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Thank You</h2>
              <p className="text-muted-foreground leading-relaxed">Thank you for using GrowthKit! We&apos;re committed to helping you track your child&apos;s growth journey with confidence.</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}