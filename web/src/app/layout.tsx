import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FaGenRe - Face Gender Recognitions",
  description: "FaGenRe - Face Gender Recognitions: Your go-to solution for accurate and efficient face gender recognition. This innovative tool delivers seamless performance and precise results, making it perfect for a wide range of applications.",
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
