import type { Metadata, Viewport } from "next";
import { Source_Serif_4 } from "next/font/google";
import { SITE } from "@/lib/site";
import Providers from "@/components/Providers";
import "./globals.css";

// Serif for the hero headline only; everything else uses SF Pro (system font).
const displaySerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Digital Marketing, Websites, Automation & AI`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "digital marketing agency",
    "website development",
    "performance marketing",
    "SEO and AI search optimisation",
    "WhatsApp marketing automation",
    "AI automation",
    "healthcare digital marketing",
    "Getmax Solutions",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#5932ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={displaySerif.variable}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
