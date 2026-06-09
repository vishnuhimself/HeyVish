import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova Widgets Support - Help & Contact",
  description: "Get help with Nova Widgets. Contact us for support, report bugs, suggest features, or ask questions about customizing your Home Screen and Lock Screen widgets.",
  keywords: "Nova Widgets, support, help, contact, bug report, feature request, customer service, iOS widgets",
  robots: "index, follow",
  openGraph: {
    title: "Nova Widgets Support",
    description: "Need help with Nova Widgets? Contact us for support, bug reports, or feature suggestions.",
    type: "website",
    url: "https://heyvish.com/support/nova",
  },
  alternates: {
    canonical: "https://heyvish.com/support/nova",
  },
};

export default function NovaSupport() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* Support Page Content */}
        <article className="prose dark:prose-invert max-w-none prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-a:underline prose-a:underline-offset-4 prose-hr:border-foreground">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Nova Widgets Support</h1>
          <p className="text-muted-foreground mb-8">We&apos;re here to help you get the most out of Nova Widgets</p>

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
                We typically respond within 24-48 hours. Please include &quot;Nova Widgets&quot; in your email subject line to help us route your message appropriately.
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
                Need help using Nova Widgets? Have questions about how to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Add widgets to your Home Screen or Lock Screen</li>
                <li>Customize widget colors and background styles</li>
                <li>Connect Health widgets to Apple Health and HealthKit</li>
                <li>Unlock and access Pro widgets</li>
                <li>Save widgets to your Favorites</li>
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
                Have an idea for a new widget or customization option? We&apos;d love to hear it! Your feedback helps us make Nova Widgets better for everyone. Share your suggestions and we&apos;ll consider them for future updates.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Privacy & Data Questions</h2>
              <p className="text-muted-foreground leading-relaxed">
                Have questions about how we handle your data or HealthKit permissions? Check out our{" "}
                <a href="/privacy/nova" className="text-foreground hover:underline font-medium">
                  Privacy Policy
                </a>
                {" "}or contact us directly with any privacy-related concerns.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Why aren&apos;t my Health widgets updating?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Make sure you&apos;ve granted Nova Widgets permission to read data from Apple Health. Go to iOS Settings → Health → Data Access & Devices → Nova Widgets and ensure permissions for the specific metrics are enabled.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">How do I unlock Pro widgets?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You can unlock Pro widgets by tapping on any Pro-tiered widget in the gallery and completing the in-app purchase. This will remove the lock icon and allow you to use premium widgets on your Home Screen and Lock Screen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Why isn&apos;t the widget appearing on my Home Screen?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    After customizing a widget in the app, you need to add it through the standard iOS flow: long-press on your Home Screen, tap the &apos;+&apos; icon in the top left, search for Nova Widgets, and add your preferred size.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Is my data secure?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes! All your preferences and health data are stored locally on your device. We never transmit your data to external servers. Learn more in our{" "}
                    <a href="/privacy/nova" className="text-foreground hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Thank You</h2>
              <p className="text-muted-foreground leading-relaxed">
                Thank you for using Nova Widgets! We&apos;re committed to providing you with the best experience possible. Your feedback and support mean the world to us.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
