import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

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
        <ClerkProvider appearance={{ variables: { colorPrimary: "#9929ea" } }}>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
