import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="flex-1 bg-gradient-to-b from-black to-gray-900">
      <div className="container px-4 py-16 max-w-4xl">
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-center gap-3">
            <FileText className="h-8 w-8 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white text-center">
              Terms of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Service
              </span>
            </h1>
          </div>
          <p className="text-white/60 text-center max-w-2xl mx-auto">
            By accessing and using ZappyToon, you agree to be bound by these
            Terms of Service.
          </p>
        </div>

        <div className="space-y-8 text-white/80">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using PixelMuse AI, you agree to be bound by
              these Terms of Service. If you do not agree to these terms, please
              do not use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              2. Service Description
            </h2>
            <p className="text-white/60 mb-4">
              ZappyToon provides AI-powered image transformation services. We
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or discontinue any aspect of the service</li>
              <li>Restrict access to parts or all of the service</li>
              <li>Change pricing or service terms with notice</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              3. User Responsibilities
            </h2>
            <p>As a user, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information when required</li>
              <li>Not use the service for illegal purposes</li>
              <li>Not upload content that violates others' rights</li>
              <li>Not attempt to disrupt or interfere with the service</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              4. Intellectual Property
            </h2>
            <p>Regarding intellectual property:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You retain rights to your original images</li>
              <li>Transformed images are for personal use only</li>
              <li>Our AI models and technology remain our property</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              5. Limitation of Liability
            </h2>
            <p className="text-white/60 mb-4">
              ZappyToon is provided "as is" without warranties of any kind.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service interruptions or errors</li>
              <li>Loss of data or images</li>
              <li>Any indirect or consequential damages</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              6. Changes to Terms
            </h2>
            <p>
              We may update these terms at any time. Continued use of the
              service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">7. Contact</h2>
            <p>For questions about these terms, please contact us at:</p>
            <p className="text-purple-400">legal@zappytoon.com</p>
          </section>

          <p className="text-sm text-white/60 pt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}
