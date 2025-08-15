"use client";
import "./globals.css";
import  useServiceWorker from "./register-sw";
const RootLayout = ({ children }) => {
  useServiceWorker(); 
  return children;
};

export default RootLayout;
