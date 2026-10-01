import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import PurpleStage from "@/components/sections/PurpleStage";
import Services from "@/components/sections/Services";
import Why from "@/components/sections/Why";
import { Approach, Sectors } from "@/components/sections/Approach";
import { Contact, Footer } from "@/components/sections/Contact";
import { SERVICES, SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}${encodeURI(SITE.logo)}`,
      email: SITE.email,
      description: SITE.description,
      makesOffer: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.summary },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <PurpleStage>
          <Hero />
          <Story />
        </PurpleStage>
        <Services />
        <Why />
        <Approach />
        <Sectors />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
