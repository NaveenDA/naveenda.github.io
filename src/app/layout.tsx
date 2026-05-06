import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Naveen Portfolio',
    default: 'Naveen Portfolio | Machine Learning Engineer',
  },
  description: "Machine Learning Engineer with 8+ years of experience building scalable AI systems across startups and enterprise environments. Transforming data into intelligent solutions that drive real business impact.",
  verification: {
    google: "uhmDfwJjyzeSLOe1Ux5PCU2Jx8fPVxYhujq8DZ9AJuA",
  },
  keywords: [
    "Machine Learning Engineer",
    "AI Engineer",
    "Deep Learning",
    "MLOps",
    "Data Science",
    "Python",
    "TensorFlow",
    "PyTorch",
    "Big Data",
    "Real-time Analytics",
    "Recommendation Systems"
  ],
  authors: [{ name: "Naveen DA" }],
  creator: "Naveen DA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://naveenda.live",
    title: "Naveen DA - Machine Learning Engineer",
    description: "Machine Learning Engineer with 8+ years of experience building scalable AI systems across startups and enterprise environments.",
    siteName: "Naveen DA Portfolio",
    images: [
      {
        url: 'https://naveenda.live/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Naveen DA Portfolio',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveen DA - Machine Learning Engineer",
    description: "Machine Learning Engineer with 8+ years of experience building scalable AI systems across startups and enterprise environments.",
    creator: "@naveenda_",
    site: "@naveenda_",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="apple-mobile-web-app-title" content="NaveenDA" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Script
          src="https://cdn.jsdelivr.net/npm/neataptic@1.4.7/dist/neataptic.min.js"
          strategy="beforeInteractive"
        />
        <GoogleAnalytics gaId="G-5T64WG8PN5" />
        {children}
      </body>
    </html>
  );
}
