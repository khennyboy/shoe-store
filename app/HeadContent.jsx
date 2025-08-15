"use client";

import React from "react";
import useServiceWorker from "./register-sw";

export default function HeadContent() {
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
    </>
  );
}
