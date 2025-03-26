import { Kumbh_Sans } from "next/font/google";
import "../globals.css";
// import { Suspense } from "react";
import Provider from "../_components/queryClient";
import Footer from "../_components/footer";
import Nav from "../_components/nav";
import { Toaster } from "react-hot-toast";

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
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "12px 20px",
            backgroundColor: "hsl(26, 100%, 55%)",
            color: "white",
          },
        }}
      />
      <html lang="en">
        <body className={`${kumbh.className} `}>
          <Nav />

          <div className="mt-28 mb-16 px-4 md:mt-32 md:mb-[5rem] md:px-8 lg:mt-36 xl:px-12">
            {children}
          </div>

          <Footer />
        </body>
      </html>
    </Provider>
  );
}
