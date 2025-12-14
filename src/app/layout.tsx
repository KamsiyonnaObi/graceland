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
  metadataBase: new URL(BASE_URL),
  title: "Graceland Nigeria - Top Baby Products Online",
  description:
    "Discover premium baby products in Lagos, Nigeria at Graceland. Shop eco-friendly, safe, and affordable essentials for your little one. Trusted by parents worldwide.",
  keywords: [
    "baby products Lagos",
    "baby store Lagos",
    "buy baby products Lagos",
    "baby products Nigeria",
    "newborn essentials Lagos",
    "car seats Lagos",
    "strollers Lagos",
    "baby walker Lagos",
    "baby gear Lagos",
    "high chairs Lagos",
    "baby gifts Lagos",
    "organic baby products Lagos",
    "affordable baby products Lagos",
    "premium baby products Lagos",
    "baby safety products Lagos",
    "Graceland baby store",
    "buy baby gear online Lagos",
    "child car seats Nigeria",
    "stroller shop Lagos",
    "baby accessories Lagos",
    "same day delivery Lagos",
  ],
  openGraph: {
    title: "Graceland - Premium Baby Products",
    description:
      "Shop premium baby products in Lagos, Nigeria at Graceland. Safe, eco-friendly, and perfect for your little one. Trusted by parents everywhere!",
    url: BASE_URL,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/assets/images/og-image.png`,
        width: 1440,
        height: 750,
        alt: "Graceland Baby Products",
      },
    ],
  },
  robots: "index, follow",
  alternates: {
    canonical: BASE_URL,
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
