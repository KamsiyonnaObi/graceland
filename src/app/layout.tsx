import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { Inter, Palanquin, Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
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

export const metadata: Metadata = {
  title: "Graceland",
  description: "All round baby products",
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
        <Analytics />
      </body>
    </html>
  );
}
