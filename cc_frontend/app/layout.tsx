import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Use "Inter" (Standard, Safe Font) instead of "Geist"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CropCapital - Satellite Credit Scoring",
  description: "AI-Powered Credit for the Next Billion Farmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}