import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";

export const metadata: Metadata = {
  title: "Indian Space Sector Explorer",
  description: "An interactive map of ISRO, IN-SPACe, NSIL, startups, infrastructure, and downstream markets in India's space ecosystem.",
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
      <body className="min-h-full bg-space-black text-foreground antialiased selection:bg-accent-cyan selection:text-space-black">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
