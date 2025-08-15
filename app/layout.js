import "./globals.css";
import HeadContent from "./HeadContent";

export const metadata = {
  title: "SoleMate – Step Into Style & Comfort",
  description:
    "SoleMate offers premium sneakers, boots, sandals, and heels for men, women, and kids. Shop quality footwear that blends style and comfort.",
  keywords:
    "buy shoes online, sneakers Nigeria, men's formal shoes, women's heels, kids footwear, affordable shoes, sports sneakers, comfortable sandals, quality leather shoes, shoe store Lagos",
  authors: [{ name: "SoleMate Team" }],
  themeColor: "#000000",
  openGraph: {
    title: "SoleMate – Step Into Style & Comfort",
    description:
      "Shop stylish, comfortable, and affordable shoes for every occasion.",
    url: "https://shoe-store-ashy-two.vercel.app/",
    siteName: "SoleMate",
    images: [
      {
        url: "https://shoe-store-ashy-two.vercel.app/1200X630.jpeg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@solemate",
    creator: "@solemate",
    title: "SoleMate – Step Into Style & Comfort",
    description:
      "Premium footwear for men, women, and kids. Shop your SoleMate today.",
    images: ["https://shoe-store-ashy-two.vercel.app/1200X600.jpeg"],
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-32X32.jpeg", sizes: "32x32", type: "image/jpeg" },
      {
        url: "/icons/favicon-192x192.png",
        sizes: "192X192",
        type: "image/jpeg",
      },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <HeadContent />
    </>
  );
}
