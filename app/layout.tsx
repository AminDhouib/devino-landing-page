import * as gtag from './lib/gtag'
import { Inter } from "next/font/google";
import Script from 'next/script'
import "./globals.css";
import Header from "./(main)/Header";
import Footer from "./(main)/Footer";
import React, { ReactNode } from "react";


import {ThemeProvider} from "~/app/lib/context/ThemeContext";
import AnimatedCursor from "react-animated-cursor";
import StarsBG from "~/app/_ui/StarsBg";
import {Metadata} from "next";
import HotjarInitializer from "~/app/HotjarInitializer";

const inter = Inter({ subsets: ["latin"] });

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
    title: "Devino | SaaS Software Agency",
    description: "We build and scale software. Empowering you to accomplish your goals.",
    siteName: "Devino",
    images: [
      {
        url: "https://devino.ca/devino_banner.png",
        width: 1200,
        height: 676,
        alt: "Devino Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devino | SaaS Software Agency",
    description: "We build and scale software. Empowering you to accomplish your goals.",
    creator: "@devino_solutions",
    images: ["https://devino.ca/devino_banner.png"],
    site: "@devino_solutions",
  },
  icons: {
    icon: [
      { url: "/brand/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      "/brand/favicon.ico",
    ],
  },
  formatDetection: {
    telephone: false,
  },
  keywords: [
    "SaaS Development Agency Canada",
    "AI Integration for Business",
    "Cloud Software Developers",
    "Custom Mobile Applications",
    "Enterprise Vertical SaaS",
    "Generative AI Development",
    "Scalable API Development",
    "AI and Machine Learning Software",
    "Software Design and Prototyping",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
    <html lang="en">
    <HotjarInitializer />
    <body
        className={
          inter.className +
          " relative bg-white text-[#1d1e22] dark:bg-darkbg overflow-x-hidden"
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
        <AnimatedCursor
            innerSize={8}
            outerSize={35}
            innerScale={1}
            outerScale={2}
            outerAlpha={0}
            innerStyle={{
              backgroundColor: 'var(--cursor-color)'
            }}
            outerStyle={{
              border: '3px solid var(--cursor-color)',
            }}
        />
        {children}
        <Footer />
        <StarsBG />
      </body>
      </html>
    </ThemeProvider>

  );
}

export const runtime = "edge"; // 'nodejs' (default) | 'edge'
