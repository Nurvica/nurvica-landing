import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — NURVICA",
  description:
    "How NURVICA collects, uses, and protects the information you share with us.",
};

const LAST_UPDATED = "May 1, 2026";

export default function PrivacyPage() {
  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-28 pb-24">
        <div className="mb-10">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-widest text-deep-forest/60 hover:text-deep-forest transition-colors"
          >
            ← Back to home
          </Link>
        </div>

        <header className="mb-12 pb-8 border-b border-deep-forest/10">
          <h1 className="font-serif text-4xl sm:text-5xl text-deep-forest leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-widest text-deep-forest/50">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="font-sans font-light text-deep-forest/80 leading-relaxed space-y-8 text-[15px]">
          <section>
            <p>
              NURVICA (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              respects your privacy. This Privacy Policy explains what
              information we collect, why we collect it, and how we handle it
              when you visit nurvica.com or join our waitlist.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-deep-forest mb-3">
              Information we collect
            </h2>
            <p className="mb-3">
              At this stage, we only collect the email address you submit when
              joining our waitlist. We do not require you to create an account,
              and we do not collect names, addresses, payment details, or
              sensitive personal information through the website.
            </p>
            <p>
              Like most websites, our hosting provider may automatically log
              standard technical information such as IP address, browser type,
              and pages visited. This is used solely for security and basic
              analytics.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-deep-forest mb-3">
              How we use your information
            </h2>
            <p className="mb-3">We use the email address you provide to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirm your spot on the waitlist.</li>
              <li>
                Send occasional updates about NURVICA&apos;s development,
                launch timing, and early-access opportunities.
              </li>
              <li>
                Respond to questions you send us directly at info@nurvica.com.
              </li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your email address with anyone for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-deep-forest mb-3">
              Service providers
            </h2>
            <p className="mb-3">
              We use a small number of third-party services to operate the
              website and waitlist. These providers process your information
              only on our behalf:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Resend</span> — manages our
                waitlist and sends transactional email (such as the welcome
                message).
              </li>
              <li>
                <span className="font-medium">Vercel</span> — hosts the website
                and processes basic request logs.
              </li>
            </ul>
            <p className="mt-3">
              Each of these services has its own privacy practices, and we
              choose providers we believe handle data responsibly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-deep-forest mb-3">
              Your choices
            </h2>
            <p>
              You can unsubscribe from any email we send by clicking the
              unsubscribe link in the message, or by emailing us at
              info@nurvica.com. You can also request that we delete your email
              from our waitlist at any time by contacting the same address.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-deep-forest mb-3">
              Data retention
            </h2>
            <p>
              We keep waitlist email addresses until you ask us to remove them
              or until we decide they are no longer needed. After launch, the
              waitlist may transition into our standard customer or marketing
              database, at which point this policy will be updated.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-deep-forest mb-3">
              Children
            </h2>
            <p>
              NURVICA is not directed at children under 13, and we do not
              knowingly collect information from them. If you believe a child
              has submitted information to us, please contact us and we will
              delete it.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-deep-forest mb-3">
              Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy as the product evolves. When we
              do, we will revise the &ldquo;Last updated&rdquo; date at the top
              of this page. Material changes will also be communicated by
              email.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-deep-forest mb-3">
              Contact
            </h2>
            <p>
              Questions about this policy or how we handle your information?
              Reach us at{" "}
              <a
                href="mailto:info@nurvica.com"
                className="text-deep-forest underline hover:opacity-70"
              >
                info@nurvica.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
