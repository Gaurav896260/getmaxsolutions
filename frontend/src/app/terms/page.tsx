import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

// TEMPLATE — needs legal review before ads go live.

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply when you use the ${SITE.name} website.`,
  alternates: { canonical: "/terms" },
};

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="1 October 2026"
      intro={
        <p>
          These terms apply to your use of the {SITE.name} website. By using the site you agree to
          them. Work we do for clients is covered by a separate written agreement, which takes
          priority over these terms.
        </p>
      }
      sections={[
        {
          heading: "Using this website",
          body: (
            <p>
              You may use this site for lawful purposes only. Please don&apos;t attempt to disrupt it,
              access it without authorisation, or submit false or automated enquiries.
            </p>
          ),
        },
        {
          heading: "Free Growth Audit",
          body: (
            <p>
              The Free Growth Audit is offered at no cost and with no obligation. It is a professional
              opinion based on publicly visible information and anything you choose to share, not a
              guarantee of results. We may decline or limit audit requests at our discretion.
            </p>
          ),
        },
        {
          heading: "Content and intellectual property",
          body: (
            <p>
              The content, design, logos and code on this site belong to {SITE.name} or its licensors.
              You may view and share pages for personal or internal business use, but you may not copy,
              modify or republish them commercially without our written permission.
            </p>
          ),
        },
        {
          heading: "No warranties",
          body: (
            <p>
              Information on this site is provided for general purposes and may change without notice.
              We work to keep it accurate but make no promise that it is complete, current or suitable
              for your specific situation.
            </p>
          ),
        },
        {
          heading: "Limitation of liability",
          body: (
            <p>
              To the extent permitted by law, {SITE.name} is not liable for any indirect or
              consequential loss arising from your use of this website or reliance on its content.
            </p>
          ),
        },
        {
          heading: "Links to other sites",
          body: (
            <p>
              We may link to other websites, including Getmax Healthcare. We are not responsible for
              the content or practices of third-party sites.
            </p>
          ),
        },
        {
          heading: "Privacy",
          body: (
            <p>
              Our <a href="/privacy">Privacy Policy</a> explains how we handle personal information you
              share with us.
            </p>
          ),
        },
        {
          heading: "Governing law and contact",
          body: (
            <p>
              These terms are governed by the laws of India. We may update them from time to time.
              Questions? Contact us at {mail}.
            </p>
          ),
        },
      ]}
    />
  );
}
