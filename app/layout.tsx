import type { Metadata } from "next";
import { Syne, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/ui/Navbar";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shree Prathishthan | Cultural Heritage & Social Welfare Trust",
  description: "Experience the legacy of Maharashtra. Shree Prathishthan organizes grand celebrations, medical camps, and rural support drives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <ScrollProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}
