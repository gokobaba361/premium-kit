import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Bricolage_Grotesque,
  Familjen_Grotesk,
  Instrument_Sans,
  Public_Sans,
  Cormorant_Garamond,
  Space_Grotesk,
  Plus_Jakarta_Sans,
  Archivo,
  Jost,
  EB_Garamond,
  Sora,
} from "next/font/google";
import { LanguageSwitch } from "@/components/site/language-switch";
import "./globals.css";

/*
 * Type stacks.
 *
 * Every face here is open licence (SIL OFL) and self hosted by next/font at
 * build time, so no request leaves the visitor's browser for a font CDN.
 * Themes pick a display face by variable in src/design/themes.css.
 *
 * latin-ext is loaded because the templates use Turkish copy and names.
 * Licensed retail faces (Söhne, GT Walsheim, PP Editorial New) belong in
 * next/font/local with the vendor's files, never checked into this repo.
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

/** bone: studios and portfolios. Wide, slightly eccentric display grotesque. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
});

/** forest: premium consumer. Warm grotesque with open apertures. */
const familjen = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin", "latin-ext"],
});

/** cobalt: fintech and B2B. Neutral, tight, unremarkable in the right way. */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin", "latin-ext"],
});

/** clinic: healthcare and public services. Drawn for legibility at small sizes. */
const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin", "latin-ext"],
});

/**
 * terracotta: hospitality. The one serif in the kit, and it earns the place:
 * a stone house with a printed daily menu is a genuinely editorial brief.
 * Deliberately not Fraunces or Instrument Serif.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
});

/** slate: architecture and property. Technical, slightly squared grotesque. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

/** signal: consumer apps. Friendly geometric, reads well at heavy weights. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

/** ember: sport and performance. Sturdy, wide, holds heavy weights without mush. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
});

/** ivory: beauty and fashion. Geometric with high contrast counters. */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
});

/** archive: publishing and museums. The second serif, and a different one on purpose. */
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "latin-ext"],
});

/** neon: gaming and nightlife. Techy geometric without the gamer cliches. */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
});

const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  bricolage.variable,
  familjen.variable,
  instrumentSans.variable,
  publicSans.variable,
  cormorant.variable,
  spaceGrotesk.variable,
  jakarta.variable,
  archivo.variable,
  jost.variable,
  ebGaramond.variable,
  sora.variable,
].join(" ");

export const metadata: Metadata = {
  title: {
    default: "Premium Kit",
    template: "%s | Premium Kit",
  },
  description:
    "Sector calibrated design system and block library for building premium marketing sites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LanguageSwitch />
        {children}
      </body>
    </html>
  );
}
