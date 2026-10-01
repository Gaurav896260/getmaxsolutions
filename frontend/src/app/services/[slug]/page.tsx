import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceCta from "@/components/service/ServiceCta";
import { Footer } from "@/components/sections/Contact";
import { PillLink } from "@/components/sections/Hero";
import { SERVICES, SHARE_IMAGE, SITE } from "@/lib/site";
import { SERVICE_PAGES } from "@/lib/service-pages";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const page = SERVICE_PAGES[slug];
  if (!service || !page) return {};
  const url = `/services/${slug}`;
  return {
    title: service.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${service.title} — ${SITE.name}`,
      description: page.metaDescription,
      url,
      images: SHARE_IMAGE.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — ${SITE.name}`,
      description: page.metaDescription,
      images: SHARE_IMAGE.twitter,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const index = SERVICES.findIndex((s) => s.slug === slug);
  const service = SERVICES[index];
  const page = SERVICE_PAGES[slug];
  if (!service || !page) notFound();

  // Next three services, wrapping around the list.
  const related = [1, 2, 3].map((n) => SERVICES[(index + n) % SERVICES.length]);
  const url = `${SITE.url}/services/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        description: page.metaDescription,
        serviceType: service.title,
        url,
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: service.title,
          itemListElement: page.included.map((i) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: i.title, description: i.body },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
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
          eyebrowHref="/services"
          title={service.title}
          intro={page.intro}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />

        {/* Highlights band */}
        <section data-header-theme="dark" aria-label="Highlights" className="bg-brand text-white">
          <ul className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-3 sm:px-10 sm:py-20 lg:px-[calc(2.5rem+3vw)]">
            {page.highlights.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 0.08}>
                <p className="text-[clamp(1.75rem,2.8vw,2.5rem)] tracking-[-0.02em]">{h.title}</p>
                <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-white/75">{h.body}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* What's included */}
        <section
          data-header-theme="light"
          aria-labelledby="included-title"
          className="flex min-h-svh items-center bg-sand text-brand-night"
        >
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-[calc(2.5rem+3vw)]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <h2
                  id="included-title"
                  className="font-display text-[clamp(2.4rem,4.4vw,4rem)] font-semibold leading-[1.06] tracking-[-0.01em]"
                >
                  What&apos;s included
                </h2>
                <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-brand-night/80 sm:text-[1.2rem]">
                  {service.summary}
                </p>
                <div className="mt-8">
                  <PillLink href="/audit" variant="brand" size="lg">
                    Get a free audit
                  </PillLink>
                </div>
              </Reveal>
            </div>
            <ul className="border-b border-brand-night/12">
              {page.included.map((item) => (
                <Reveal as="li" key={item.title} className="border-t border-brand-night/12 py-9 lg:py-11">
                  <h3 className="text-[1.6rem] leading-tight tracking-[-0.01em] sm:text-[2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed text-brand-night/75">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Good fit */}
        <section
          data-header-theme="dark"
          aria-labelledby="fit-title"
          className="flex min-h-[80svh] items-center bg-brand-night text-white"
        >
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-[calc(2.5rem+3vw)]">
            <Reveal>
              <h2
                id="fit-title"
                className="font-display text-[clamp(2.4rem,4.4vw,4rem)] font-semibold leading-[1.06] tracking-[-0.01em]"
              >
                A good fit if…
              </h2>
            </Reveal>
            <ul className="space-y-7 self-center">
              {page.fits.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 0.08} className="flex items-start gap-4">
                  <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-brand">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span className="text-xl leading-snug sm:text-2xl">{f}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section
          data-header-theme="light"
          aria-labelledby="faq-title"
          className="flex min-h-[80svh] items-center bg-sand text-brand-night"
        >
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-[calc(2.5rem+3vw)]">
            <Reveal>
              <h2
                id="faq-title"
                className="font-display text-[clamp(2.4rem,4.4vw,4rem)] font-semibold leading-[1.06] tracking-[-0.01em]"
              >
                Questions
              </h2>
            </Reveal>
            <div className="divide-y divide-brand-night/12 border-y border-brand-night/12">
              {page.faqs.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl leading-snug sm:text-[1.4rem] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden
                      className="text-3xl font-light text-brand transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-brand-night/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        <section
          data-header-theme="light"
          aria-labelledby="related-title"
          className="bg-[#e7e4f1] text-brand-night"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-10 lg:px-[calc(2.5rem+3vw)]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2
                id="related-title"
                className="font-display text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.01em]"
              >
                Related services
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-bold uppercase tracking-[0.14em] text-brand hover:underline hover:underline-offset-8"
              >
                All services <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {related.map((r, i) => (
                <Reveal as="li" key={r.slug} delay={i * 0.08}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="group flex h-full flex-col justify-between rounded-3xl bg-white p-8 transition-shadow hover:shadow-[0_24px_60px_-30px_rgba(30,11,120,0.45)]"
                  >
                    <div>
                      <h3 className="text-[1.5rem] leading-tight tracking-[-0.01em] transition-colors group-hover:text-brand">
                        {r.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-brand-night/70">{r.summary}</p>
                    </div>
                    <ArrowUpRight className="mt-8 size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <ServiceCta />
      </main>
      <Footer />
    </>
  );
}
