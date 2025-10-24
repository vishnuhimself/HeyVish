import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steps App Support - Help & Contact",
  description: "Get help with Steps App. Contact us for support, report bugs, suggest features, or ask questions about your step tracking and health data.",
  keywords: "Steps App, support, help, contact, bug report, feature request, customer service",
  robots: "index, follow",
  openGraph: {
    title: "Steps App Support",
    description: "Need help with Steps App? Contact us for support, bug reports, or feature suggestions.",
    type: "website",
    url: "https://heyvish.com/support/steps",
  },
  alternates: {
    canonical: "https://heyvish.com/support/steps",
  },
};

export default function StepsSupport() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto py-8">
        {/* Support Page Content */}
        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Steps App Support</h1>
          <p className="text-muted-foreground mb-8">We&apos;re here to help you get the most out of Steps App</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For any support inquiries, bug reports, feature requests, or general questions, please email us at:
              </p>
              <div className="bg-muted p-6 rounded-lg border-2 border-foreground/10">
                <a 
                  href="mailto:hey@heyvish.com" 
                  className="text-2xl font-bold text-foreground hover:underline block text-center"
                >
                  hey@heyvish.com
                </a>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We typically respond within 24-48 hours. Please include &quot;Steps App&quot; in your email subject line to help us route your message appropriately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">How Can We Help?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you need assistance, have questions, or want to share feedback, we&apos;re here to support you. Feel free to reach out to us for any of the following:
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">General Help & Support</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Need help using Steps App? Have questions about how to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Connect to Apple Health and HealthKit</li>
                <li>View your step count, calories, and distance data</li>
                <li>Manage app permissions and settings</li>
                <li>Understand your activity statistics</li>
                <li>Troubleshoot data sync issues</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We&apos;re happy to help you with any questions or concerns.
              </p>
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
                <li>Screenshots if applicable</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We take bug reports seriously and will work to resolve issues as quickly as possible.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Feature Requests</h2>
              <p className="text-muted-foreground leading-relaxed">
                Have an idea for a new feature or improvement? We&apos;d love to hear it! Your feedback helps us make Steps App better for everyone. Share your suggestions and we&apos;ll consider them for future updates.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Feedback & Suggestions</h2>
              <p className="text-muted-foreground leading-relaxed">
                We value your input! Whether it&apos;s about the user interface, functionality, or overall experience, your feedback helps us improve. Let us know what you love about the app and what we can do better.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Privacy & Data Questions</h2>
              <p className="text-muted-foreground leading-relaxed">
                Have questions about how we handle your health data? Want to know more about our privacy practices? Check out our{" "}
                <a href="/privacy/steps" className="text-foreground hover:underline font-medium">
                  Privacy Policy
                </a>
                {" "}or contact us directly with any privacy-related concerns.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Why isn&apos;t my data syncing from Apple Health?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Make sure you&apos;ve granted Steps App permission to read data from Apple Health. Go to iOS Settings → Health → Data Access & Devices → Steps App and ensure all necessary permissions are enabled.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Is my health data secure?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes! All your data is stored locally on your device. We never transmit your health data to external servers. Learn more in our{" "}
                    <a href="/privacy/steps" className="text-foreground hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Can I export my data?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Your data lives in Apple Health and is accessible through iOS&apos;s built-in export features. Steps App displays this data in an easy-to-read format but doesn&apos;t store a separate copy.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Do you offer refunds?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All app purchases are handled through the Apple App Store. For refund requests, please contact Apple Support directly or visit your purchase history in the App Store.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Thank You</h2>
              <p className="text-muted-foreground leading-relaxed">
                Thank you for using Steps App! We&apos;re committed to providing you with the best experience possible. Your feedback and support mean the world to us.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

