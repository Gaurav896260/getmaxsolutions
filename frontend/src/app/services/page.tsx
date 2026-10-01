import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceCta from "@/components/service/ServiceCta";
import { Footer } from "@/components/sections/Contact";
import { SERVICES, SHARE_IMAGE, SITE } from "@/lib/site";

const description =
  "Strategy, websites, performance marketing, SEO and AI search, automation, AI, creative, analytics and software — one team that plans it, builds it and runs it.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: `Services — ${SITE.name}`, description, url: "/services", images: SHARE_IMAGE.openGraph },
  twitter: { card: "summary_large_image", images: SHARE_IMAGE.twitter },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} services`,
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${SITE.url}/services/${s.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="top">
        <ServiceHero
          eyebrow="Services"
          title="Everything your growth runs on"
          intro={SITE.subline}
          crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        />

        <section
          data-header-theme="light"
          aria-label="All services"
          className="bg-sand text-brand-night"
        >
          <ul className="mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-10 lg:px-[calc(2.5rem+3vw)] lg:py-28">
            {SERVICES.map((s) => (
              <Reveal as="li" key={s.slug} className="border-b border-brand-night/12 first:border-t">
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid grid-cols-1 items-center gap-3 py-9 lg:grid-cols-[1.1fr_1fr_auto] lg:gap-12 lg:py-12"
                >
                  <h2 className="text-[1.7rem] leading-tight tracking-[-0.01em] transition-colors group-hover:text-brand sm:text-[2.1rem] lg:text-[2.4rem]">
                    {s.title}
                  </h2>
                  <p className="max-w-[52ch] text-[17px] leading-relaxed text-brand-night/70">{s.summary}</p>
                  <ArrowUpRight
                    className="hidden size-7 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand lg:block"
                    strokeWidth={1.75}
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>

        <ServiceCta />
      </main>
      <Footer />
    </>
  );
}
