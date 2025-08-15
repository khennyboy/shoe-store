"use client";

import React from "react";
import Head from "next/head";
import useServiceWorker from "./register-sw";
import "./globals.css";

const RootLayout = ({ children }) => {
  useServiceWorker();


  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "SoleMate",
    url: "https://shoe-store-ashy-two.vercel.app/",
    logo: "https://shoe-store-ashy-two.vercel.app/icon512.png",
    description:
      "SoleMate – stylish, comfortable, and affordable shoes for men, women, and kids.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-702-677-1744",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://facebook.com/solemate",
      "https://instagram.com/solemate",
      "https://twitter.com/solemate",
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SoleMate",
    url: "https://shoe-store-ashy-two.vercel.app/",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://shoe-store-ashy-two.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Head>
        <title>SoleMate – Step Into Style & Comfort</title>
        <meta
          name="description"
          content="SoleMate offers premium sneakers, boots, sandals, and heels for men, women, and kids. Shop quality footwear that blends style and comfort."
        />
        <meta
          name="keywords"
          content="buy shoes online, sneakers Nigeria, men's formal shoes, women's heels, kids footwear, affordable shoes, sports sneakers, comfortable sandals, quality leather shoes, shoe store Lagos"
        />
        <meta name="author" content="SoleMate Team" />
        <meta name="theme-color" content="#000000" />

        {/* Open Graph */}
        <meta property="og:title" content="SoleMate – Step Into Style & Comfort" />
        <meta
          property="og:description"
          content="Shop stylish, comfortable, and affordable shoes for every occasion."
        />
        <meta property="og:url" content="https://shoe-store-ashy-two.vercel.app/" />
        <meta property="og:site_name" content="SoleMate" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:image"
          content="https://shoe-store-ashy-two.vercel.app/og-banner.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@solemate" />
        <meta name="twitter:creator" content="@solemate" />
        <meta
          name="twitter:title"
          content="SoleMate – Step Into Style & Comfort"
        />
        <meta
          name="twitter:description"
          content="Premium footwear for men, women, and kids. Shop your SoleMate today."
        />
        <meta
          name="twitter:image"
          content="https://shoe-store-ashy-two.vercel.app/og-banner.jpg"
        />

        {/* Icons */}
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/favicon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </Head>

      {children}
    </>
  );
};

export default RootLayout;
