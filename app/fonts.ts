import { Fraunces, Inter_Tight, Spline_Sans_Mono } from "next/font/google";

// Display / name / titles — refined optical serif with a "Soft" cut.
// Variable font: weight comes from the variable axis (omit `weight`
// so the optical-size / SOFT / WONK axes can be requested).
export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body — warm humanist sans.
export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

// Labels / tags / index numbers / "view project" — engineering mono.
export const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-spline-mono",
  display: "swap",
});
