import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelMuse AI - Transform Your Photos into AI Art",
  description:
    "Transform your photos into stunning AI-generated artwork. Choose from various artistic styles and create unique digital masterpieces with our advanced AI technology.",
  keywords: [
    "AI art",
    "photo to art",
    "AI image generation",
    "digital art",
    "photo transformation",
    "AI style transfer",
  ],
  authors: [{ name: "PixelMuse AI" }],
  creator: "PixelMuse AI",
  publisher: "PixelMuse AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pixelmuse.ai"),
  openGraph: {
    title: "PixelMuse AI - Transform Your Photos into AI Art",
    description:
      "Transform your photos into stunning AI-generated artwork. Choose from various artistic styles and create unique digital masterpieces.",
    url: "https://pixelmuse.ai",
    siteName: "PixelMuse AI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixelMuse AI - Transform Your Photos into AI Art",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelMuse AI - Transform Your Photos into AI Art",
    description:
      "Transform your photos into stunning AI-generated artwork. Choose from various artistic styles and create unique digital masterpieces.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
