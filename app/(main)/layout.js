import { Kumbh_Sans } from "next/font/google";
import '../globals.css'
// import { Suspense } from "react";
import Provider from "../_components/queryClient";
import Footer from "../_components/footer";
import Nav from "../_components/nav";

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / Shoe Store",
    default: "Welcome / Shoe Store",
  },
  description: `Discover the ultimate collection of stylish and comfortable shoes for every occasion. 
  From everyday wear to luxury designs, our shoe store offers quality and elegance 
  tailored to your needs. Shop the perfect pair today!`,
};

export default function RootLayout({ children }) {
  return (
    <Provider>
      <html lang="en">
        <body className={`${kumbh.className} `}>
          {/* <Suspense fallback="loading..."> */}
            <Nav />
          {/* </Suspense> */}
          <div className="mb-16 mt-28 px-4 md:mb-[5rem] md:mt-32 md:px-8 lg:mt-36 xl:px-12">
            {children}
          </div>
          {/* <Suspense> */}
            <Footer />
          {/* </Suspense> */}
        </body>
      </html>
    </Provider>
  );
}
