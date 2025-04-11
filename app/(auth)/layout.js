import { ToastContainer } from "react-toastify";
import "../globals.css";
import { Kumbh_Sans } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import Provider from "../_components/queryClient";

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  display: "swap",
});
export default function AuthLayout({ children }) {
  return (
    <Provider>
      <html lang="en">
        <body className={`${kumbh.className} `}>
          <ToastContainer />
          <div>{children}</div>
        </body>
      </html>
    </Provider>
  );
}
