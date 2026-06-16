import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applio Support - Help & Contact",
  description: "Get help with Applio. Contact us for support, report bugs, suggest features, or find answers to common questions about App Store Connect API keys and reporting delays.",
  keywords: "Applio, support, help, contact, bug report, feature request, customer service, App Store Connect, API keys",
  robots: "index, follow",
  openGraph: {
    title: "Applio Support",
    description: "Need help with Applio? Contact us for support, bug reports, or feature suggestions.",
    type: "website",
    url: "https://heyvish.com/support/applio",
  },
  alternates: {
    canonical: "https://heyvish.com/support/applio",
  },
};

export default function ApplioSupport() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* Support Page Content */}
        <article className="prose dark:prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-a:underline prose-a:underline-offset-4 prose-hr:border-foreground">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Applio Support</h1>
          <p className="text-muted-foreground mb-8">We&apos;re here to help you monitor your app portfolio with Applio</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For any support inquiries, bug reports, feature requests, or general questions, please email us at:
              </p>
              <div className="border border-foreground p-6">
                <a 
                  href="mailto:hey@heyvish.com" 
                  className="text-2xl font-bold text-foreground hover:underline block text-center"
                >
                  hey@heyvish.com
                </a>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We typically respond within 24-48 hours. Please include &quot;Applio&quot; in your email subject line to help us route your message appropriately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">General Help & Support</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Need help getting started with Applio? We can assist you with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Generating and configuring App Store Connect API keys</li>
                <li>Understanding the dashboard metrics (impressions, views, conversion)</li>
                <li>Navigating portfolio-wide vs. single-app views</li>
                <li>Interacting with Apple AI-generated review summaries</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How do I get my App Store Connect API keys?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You can generate API keys by logging into App Store Connect on the web, navigating to Users and Access, and selecting the "Integrations" tab. You will need your Issuer ID, a new Key ID, and the downloaded `.p8` private key file.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Team Key vs. Individual Key: What&apos;s the difference?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We highly recommend using a <strong>Team key (Admin access)</strong>. Team keys allow Applio to fetch full analytics, sales reports, and subscription data. If you use an <strong>Individual key</strong>, Apple restricts access to certain protected endpoints, and you won&apos;t be able to view sales or analytics reports.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Why isn&apos;t today&apos;s data showing up yet?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Apple prepares sales and download reports overnight. Reports are always for the previous day and are typically published around 2:00 PM UTC. "Yesterday's data, today" is the expected cadence for the App Store Connect API.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Why does the revenue look slightly different from App Store Connect?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Apple reports revenue in each country&apos;s local currency. Applio estimates your USD proceeds using current, real-time exchange rates. Because exchange rates fluctuate, these figures are an estimation and might differ slightly from Apple&apos;s final payout at the end of the fiscal month.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Is my API key secure?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes. Applio stores your API credentials securely in your iOS Keychain, which is strictly sandboxed. All communication happens directly between your device and Apple. We do not have servers and your data is never sent to us. Learn more in our{" "}
                    <a href="/privacy/applio" className="text-foreground hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Report a Bug</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Found something that&apos;s not working as expected? Please let us know! When reporting a bug, it helps to include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>A description of the issue</li>
                <li>Steps to reproduce the problem</li>
                <li>Your device model and iOS version</li>
                <li>Whether you are using a Team or Individual API key</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Feature Requests</h2>
              <p className="text-muted-foreground leading-relaxed">
                Applio is built for indie developers, and we love community feedback. If there&apos;s a specific metric, chart, or view you&apos;d love to see on your dashboard, let us know and we might include it in a future update!
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Thank You</h2>
              <p className="text-muted-foreground leading-relaxed">
                Thank you for using Applio to manage your app portfolio. We&apos;re committed to providing you with the best on-device analytics experience possible.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
