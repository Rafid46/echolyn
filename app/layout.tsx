import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// const bricolage = Bricolage_Grotesque({
//   variable: "--font-bricolage",
//   subsets: ["latin"],
// });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  // display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Echolyn",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
