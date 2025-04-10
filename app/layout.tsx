import type React from "react";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const OG_IMAGE_PATH = "/images/og-desktop-2.png";

export const metadata: Metadata = {
  title: "ZappyToon - Transform Your Photos into Beautiful Art",
  description:
    "Transform your photos into stunning art with ZappyToon. Create unique, artistic images in seconds.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: [
    "AI art",
    "photo to art",
    "AI image generation",
    "digital art",
    "photo transformation",
    "AI style transfer",
  ],
  authors: [{ name: "ZappyToon" }],
  creator: "ZappyToon",
  publisher: "ZappyToon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://zappytoon.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "ZappyToon - Transform Your Photos into Beautiful Art",
    description:
      "Transform your photos into stunning art with ZappyToon. Create unique, artistic images in seconds.",
    url: "https://zappytoon.com",
    siteName: "ZappyToon",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "ZappyToon - Transform Your Photos into Beautiful Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZappyToon - Transform Your Photos into AI Art",
    description:
      "Transform your photos into stunning AI-generated artwork. Choose from various artistic styles and create unique digital masterpieces.",
    images: [OG_IMAGE_PATH],
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
      <Toaster />
    </html>
  );
}
