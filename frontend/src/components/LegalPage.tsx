import Header from "./Header";
import { Footer } from "./sections/Contact";

export type LegalSection = { heading: string; body: React.ReactNode };

// Shared layout for /privacy and /terms. Copy is a starting template and needs
// review by a lawyer before the site runs ads.
export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <Header alwaysCompact />
      <main id="top" data-header-theme="light" className="bg-sand text-ink">
        <article className="mx-auto max-w-[760px] px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Legal</p>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {title}
          </h1>
          <p className="mt-3 text-sm text-ink/55">Last updated {updated}</p>
          <div className="mt-8 text-base leading-relaxed text-ink/80">{intro}</div>
          {sections.map((s, i) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-lg font-semibold tracking-tight text-ink">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink/75 [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
                {s.body}
              </div>
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
