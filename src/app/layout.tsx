import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
// @ts-ignore: allow importing global CSS without type declarations
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Delivery Route Finder",
  description: "Optimize and visualize delivery routes by batching orders, minimizing travel time and distance, and generating efficient turn-by-turn directions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
