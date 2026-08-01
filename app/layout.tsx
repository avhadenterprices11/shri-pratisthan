import type { Metadata } from "next";
import "./globals.css";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/ui/Navbar";

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
      className="h-full antialiased"
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
