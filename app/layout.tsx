import * as gtag from './lib/gtag'
import { Inter } from "next/font/google";
import Script from 'next/script'
import "./globals.css";
import Header from "./(main)/Header";
import Footer from "./(main)/Footer";
import React, { ReactNode } from "react";

import {Metadata} from "next";
import HotjarInitializer from "~/app/HotjarInitializer";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "SaaS Software Agency | Devino",
//   description: "Pragmatic Software Agency for SaaS",
// };

export const metadata: Metadata = {
  title: "Devino | SaaS Software Agency",
  description: "We build and scale software. Empowering you to accomplish your goals.",
  metadataBase: new URL("https://devino.ca"),
  alternates: {
    canonical: "https://devino.ca",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devino.ca",
    title: "Devino",
    description: "We build and scale software. Empowering you to accomplish your goals.",
    siteName: "Devino",
    images: [
      {
        url: "https://devino.ca/brand/full_logo.png",
        width: 800,
        height: 600,
        alt: "Devino Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devino | SaaS Software Agency",
    description: "We build and scale software. Empowering you to accomplish your goals.",
    creator: "@devino_solutions",
    images: ["https://devino.ca/og.svg"],
    site: "@devino_solutions",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      "/icons/favicon.ico", // Default favicon
    ],
    apple: [
      "/icons/touch-icon-iphone.png",
      "/icons/touch-icon-ipad.png",
      "/icons/touch-icon-iphone-retina.png",
      "/icons/touch-icon-ipad-retina.png",
    ],
    shortcut: "/icons/favicon.ico",
    mask: {
      url: "/icons/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
  },
  manifest: "/manifest.json",
  mobileWebAppCapable: "yes",
  appleMobileWebAppCapable: "yes",
  appleMobileWebAppStatusBarStyle: "default",
  appleMobileWebAppTitle: "Devino",
  applicationName: "Devino",
  formatDetection: {
    telephone: false,
  },
  additionalMetaTags: [
    {
      name: "msapplication-config",
      content: "/icons/browserconfig.xml",
    },
    {
      name: "msapplication-TileColor",
      content: "#2B5797",
    },
    {
      name: "msapplication-tap-highlight",
      content: "no",
    },
    {
      name: "application-name",
      content: "Devino",
    },
  ],
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <HotjarInitializer />
    <body
        className={
          inter.className +
          " relative bg-white text-[#1d1e22] overflow-x-hidden"
        }
      >
    <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
    />
    <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag.GA_TRACKING_ID}');
        `}
    </Script>
        <Header />
        {children}
        <Footer />

      </body>
    </html>
  );
}

export const runtime = "edge"; // 'nodejs' (default) | 'edge'
