"use client";
import useServiceWorker from "./register-sw";
import "./globals.css";
const RootLayout = ({ children }) => {
  useServiceWorker();
  return children;
};

export default RootLayout;
