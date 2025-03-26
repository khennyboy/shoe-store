import '../globals.css'
import { Kumbh_Sans } from "next/font/google";
 
const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  display: "swap",
});
export default function AuthLayout({ children }) {
    return (
      <html lang="en">
        <body className={`${kumbh.className} `}>
          <div>{children}</div>
        </body>
      </html>
    );
  }
  