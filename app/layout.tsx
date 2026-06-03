import type { Metadata } from "next";
import { fraunces, interTight, splineMono } from "./fonts";
import { FloatingNav } from "@/components/nav/FloatingNav";
import { GrainOverlay } from "@/components/GrainOverlay";
import { site } from "@/content/site";
import "./globals.css";

const title = `${site.name} — Portfolio`;
const description =
  "Curious builder creating meaningful physical and digital products, from AI apps and product systems to machining, mechatronics, and industrial design.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: site.name,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${interTight.variable} ${splineMono.variable}`}
    >
      <body>
        <GrainOverlay />
        {children}
        <FloatingNav />
      </body>
    </html>
  );
}
