import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

// TEMPLATE — needs legal review before ads go live.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy" },
};

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 October 2026"
      intro={
        <p>
          This policy explains how {SITE.name} (&ldquo;Getmax&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
          collects, uses and protects personal information when you visit {SITE.url.replace(/^https?:\/\//, "")}
          {" "}or contact us. We process personal data in line with applicable law, including India&apos;s
          Digital Personal Data Protection Act, 2023.
        </p>
      }
      sections={[
        {
          heading: "Information we collect",
          body: (
            <>
              <p>We only collect what we need to respond to you and run this website:</p>
              <ul>
                <li>
                  <strong>Details you give us</strong> — your name, work email, website and, if you
                  choose, phone or WhatsApp number when you request a Free Growth Audit or contact us.
                </li>
                <li>
                  <strong>Campaign information</strong> — the page you submitted from and any campaign
                  tags in the link you followed (for example utm_source), so we know which channels
                  work.
                </li>
                <li>
                  <strong>Technical data</strong> — standard server logs such as IP address, browser
                  type and pages requested, used for security and to keep the site running.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <ul>
              <li>To prepare and send the audit or reply you asked for.</li>
              <li>To follow up about our services relating to your request. You can ask us to stop at any time.</li>
              <li>To measure and improve our website and marketing.</li>
              <li>To protect the site against spam and abuse, and to meet legal obligations.</li>
            </ul>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <>
              <p>
                We do not sell your personal information. We share it only with service providers that
                help us operate — for example website hosting, email delivery and CRM tools — under
                contracts that require them to protect it, and where the law requires us to.
              </p>
              <p>
                Some of these providers may store data outside India. Where they do, we take steps to
                make sure your information stays protected.
              </p>
            </>
          ),
        },
        {
          heading: "Cookies and analytics",
          body: (
            <p>
              This site uses only the cookies needed for it to work. If we add analytics or advertising
              tools, we will update this policy and, where required, ask for your consent first.
            </p>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              We keep enquiry details for as long as needed to respond and follow up, and for up to 24
              months afterwards unless you become a client or ask us to delete them sooner.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              You can ask to access, correct or delete your personal information, withdraw consent, or
              raise a concern. Email {mail} and we will respond within a reasonable time.
            </p>
          ),
        },
        {
          heading: "Security",
          body: (
            <p>
              We use reasonable technical and organisational safeguards, including encrypted
              connections (HTTPS). No method of transmission or storage is completely secure, but we
              work to protect your data.
            </p>
          ),
        },
        {
          heading: "Changes and contact",
          body: (
            <p>
              We may update this policy from time to time; the date at the top shows the latest
              version. Questions? Contact us at {mail}.
            </p>
          ),
        },
      ]}
    />
  );
}
