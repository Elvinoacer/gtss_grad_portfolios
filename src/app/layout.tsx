import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ExperienceLayer } from "@/components/elite/experience";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-accent",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const shareTitle = "More than a degree. Show what you can do. | GTSS";
const shareDescription =
  "Turn your projects, research and skills into a portfolio worth sharing. Explore the Moi University graduate collection, then start your own with GTSS.";
const shareImage = {
  url: "/og/graduate-portfolios-v2.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "GTSS Graduate Portfolios — More than a degree. Show what you can do. Civil and electrical engineering portfolio examples from the Moi University Collection.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gtss-grad-portfolios.vercel.app"),
  title: {
    default: "GTSS Graduate Portfolios | Moi University Collection",
    template: "%s | GTSS Graduate Portfolios",
  },
  description:
    "Explore discipline-specific graduate portfolio examples by GTSS, beginning with the Moi University Collection. See how projects, attachments, research, skills and academic work can become a professional digital portfolio.",
  keywords: [
    "graduate portfolio",
    "student portfolio Kenya",
    "Moi University portfolio",
    "engineering portfolio",
    "computer science portfolio",
    "actuarial science portfolio",
    "GTSS",
  ],
  authors: [{ name: "GTSS" }],
  icons: {
    icon: "/gtss-mark.svg",
  },
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    siteName: "GTSS Graduate Portfolios",
    type: "website",
    locale: "en_KE",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: [shareImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#080A0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${inter.variable} ${geistMono.variable} ${instrumentSerif.variable} bg-background font-sans text-foreground antialiased`}
      >
        <ExperienceLayer />
        {children}
      </body>
    </html>
  );
}
