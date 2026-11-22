import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/noto-sans-kannada";
import VisitorGate from "@/components/VisitorGate";
import "./globals.css";

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
      <body className="antialiased bg-background text-foreground">
        <VisitorGate>{children}</VisitorGate>
      </body>
    </html>
  );
}
