import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ExpenseKit Support - Help & Contact",
  description: "Get help with ExpenseKit. Contact us for support, report bugs, suggest features, or ask questions about your expense tracking and financial data.",
  keywords: "ExpenseKit, support, help, contact, bug report, feature request, customer service",
  robots: "index, follow",
  openGraph: {
    title: "ExpenseKit Support",
    description: "Need help with ExpenseKit? Contact us for support, bug reports, or feature suggestions.",
    type: "website",
    url: "https://heyvish.com/support/expensekit",
  },
  alternates: {
    canonical: "https://heyvish.com/support/expensekit",
  },
};

export default function ExpenseKitSupport() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto py-8">
        {/* Support Page Content */}
        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl font-bold mb-2 text-foreground">ExpenseKit Support</h1>
          <p className="text-muted-foreground mb-8">We&apos;re here to help you get the most out of ExpenseKit</p>

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
                We typically respond within 24-48 hours. Please include &quot;ExpenseKit&quot; in your email subject line to help us route your message appropriately.
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
                Need help using ExpenseKit? Have questions about how to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Add and categorize expenses</li>
                <li>View your spending reports and statistics</li>
                <li>Manage app settings and preferences</li>
                <li>Export your expense data</li>
                <li>Set up and track budgets</li>
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
                <li>Your device model and OS version</li>
                <li>Screenshots if applicable</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We take bug reports seriously and will work to resolve issues as quickly as possible.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Feature Requests</h2>
              <p className="text-muted-foreground leading-relaxed">
                Have an idea for a new feature or improvement? We&apos;d love to hear it! Your feedback helps us make ExpenseKit better for everyone. Share your suggestions and we&apos;ll consider them for future updates.
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
                Have questions about how we handle your expense data? Want to know more about our privacy practices? Check out our{" "}
                <a href="/privacy/expensekit" className="text-foreground hover:underline font-medium">
                  Privacy Policy
                </a>
                {" "}or contact us directly with any privacy-related concerns.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Where is my data stored?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All your expense data is stored locally on your device. We do not use cloud storage or external servers, ensuring your financial information stays private and secure.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Is my financial data secure?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes! All your data is stored locally on your device. We never transmit your expense data to external servers. Learn more in our{" "}
                    <a href="/privacy/expensekit" className="text-foreground hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Can I export my expense data?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes! ExpenseKit allows you to export your expense data for backup purposes or for use in other applications. Check the app settings for export options.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Do you offer refunds?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All app purchases are handled through the Apple App Store or Google Play Store. For refund requests, please contact Apple Support or Google Play Support directly or visit your purchase history in the respective app store.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">Thank You</h2>
              <p className="text-muted-foreground leading-relaxed">
                Thank you for using ExpenseKit! We&apos;re committed to providing you with the best experience possible. Your feedback and support mean the world to us.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

