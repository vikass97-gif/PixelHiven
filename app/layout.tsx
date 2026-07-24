import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "PixelHiven | Premium Digital Products Marketplace",
    template: "%s | PixelHiven",
  },
  description:
    "Discover premium digital products including templates, source code, UI kits, AI prompts, ebooks, graphics, and more.",
  keywords: [
    "Digital Products",
    "Templates",
    "Next.js",
    "UI Kits",
    "Source Code",
    "AI Prompts",
    "Ebooks",
    "Graphics",
    "PixelHiven",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}