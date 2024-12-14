import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { Inter, Palanquin, Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { cn } from "@/lib/utils";
import NextAuthProvider from "@/providers/NextAuthProviders";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const palanquin = Palanquin({
  subsets: ["latin"],
  variable: "--font-palanquin",
  weight: ["400", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const BASE_URL = process.env.BASE_URL || "https://www.gracelandng.com";

export const metadata: Metadata = {
  title: "Graceland Nigeria - Top Baby Products Online",
  description:
    "Discover premium baby products at Graceland. Shop eco-friendly, safe, and affordable essentials for your little one. Trusted by parents worldwide.",
  keywords: [
    "baby products",
    "newborn essentials",
    "organic baby gear",
    "baby shower gifts",
    "safe baby items",
    "affordable baby supplies",
    "Graceland baby store",
    "top-rated baby products",
  ],
  openGraph: {
    title: "Graceland - Premium Baby Products",
    description:
      "Shop premium baby products at Graceland. Safe, eco-friendly, and perfect for your little one. Trusted by parents everywhere!",
    url: BASE_URL,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/assets/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Graceland Baby Products",
      },
    ],
  },
  robots: "index, follow",
  alternates: {
    languages: {
      en: BASE_URL,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-montserrat antialiased",
          inter.variable,
          palanquin.variable,
          montserrat.variable,
        )}
      >
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
