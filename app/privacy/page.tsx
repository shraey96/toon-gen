import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 py-16 max-w-4xl">
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white text-center">
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Policy
              </span>
            </h1>
          </div>
          <p className="text-white/60 text-center max-w-2xl mx-auto">
            Your privacy is important to us. This policy outlines how we handle
            your data and protect your privacy.
          </p>
        </div>

        <div className="space-y-8 text-white/80">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              1. Data Collection
            </h2>
            <p>
              We collect minimal data necessary to provide our service. When you
              upload images for transformation:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Images are processed temporarily and not stored permanently
              </li>
              <li>
                We do not collect personal information beyond what's necessary
                for the service
              </li>
              <li>No data is shared with third parties</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              2. Image Processing
            </h2>
            <p>Your images are processed securely:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Images are deleted immediately after processing</li>
              <li>Processing occurs in secure, encrypted environments</li>
              <li>No human review of your images</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              3. Cookies and Analytics
            </h2>
            <p>We use minimal cookies and analytics:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Essential cookies for site functionality</li>
              <li>Basic analytics to improve our service</li>
              <li>No tracking cookies or third-party analytics</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              4. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request deletion of any data we may have</li>
              <li>Opt-out of non-essential cookies</li>
              <li>Access any personal data we hold about you</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">5. Contact Us</h2>
            <p>
              If you have any questions about our privacy policy, please contact
              us at:
            </p>
            <p className="text-purple-400">privacy@zappytoon.com</p>
          </section>

          <p className="text-sm text-white/60 pt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}
