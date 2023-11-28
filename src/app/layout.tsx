import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wavly",
  description: "The Note taking App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full">{children}</body>
    </html>
  );
}
