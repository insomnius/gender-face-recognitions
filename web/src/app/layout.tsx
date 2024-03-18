import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FaGenRe - Face Gender Recognition | Accurate & Efficient",
  description: "Discover FaGenRe - your go-to solution for precise face gender recognition. Our innovative tool ensures seamless performance and delivers precise results for various applications.",
  authors: {
    name: "Muhammad Arief Rahman",
    url: "https://www.linkedin.com/in/insomnius/"
  },
  keywords: "FaGenRe, face gender recognition, accurate, efficient, precise results, innovative tool, wide range of applications",
  robots: "index, follow",
  openGraph: {
    title: "FaGenRe - Face Gender Recognition | Accurate & Efficient",
    description: "Discover FaGenRe - your go-to solution for precise face gender recognition. Our innovative tool ensures seamless performance and delivers precise results for various applications.",
    type: "website",
    siteName: "FaGenRe",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "FaGenRe - Face Gender Recognition | Accurate & Efficient",
    description: "Discover FaGenRe - your go-to solution for precise face gender recognition. Our innovative tool ensures seamless performance and delivers precise results for various applications.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
