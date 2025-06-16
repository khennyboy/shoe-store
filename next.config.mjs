/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uiagqlvuhmmkylfcfqbm.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Add this line for Google avatar URL
        port: "",
        pathname: "/a/**", // This matches the Google avatar path
      },
    ],
  },
  reactStrictMode: false
};

export default nextConfig;


