import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Kannada } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoKannada = Noto_Sans_Kannada({
  variable: "--font-noto-kannada",
  subsets: ["kannada"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ITKannadigaru | Manoj Krishnappa - DevOps & Generative AI in Kannada",
  description:
    "ITKannadigaru is Karnataka's home for learning DevOps, Cloud, Kubernetes and Generative AI in Kannada. Founded by Manoj Krishnappa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoKannada.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
