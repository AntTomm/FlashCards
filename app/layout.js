import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkLoaded } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlashBrain AI",
  description: "Anthony Tommaso",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Analytics />
    </html>
    </ClerkProvider>
  );
}
