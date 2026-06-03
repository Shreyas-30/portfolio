import type { Metadata } from "next";
import { fraunces, interTight, splineMono } from "./fonts";
import { FloatingNav } from "@/components/nav/FloatingNav";
import { GrainOverlay } from "@/components/GrainOverlay";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.intro,
  openGraph: {
    title: `${site.name} — Portfolio`,
    description: site.intro,
    type: "website",
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
