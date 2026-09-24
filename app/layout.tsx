import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEVengers",
  description: "A countdown to January 15, 2027",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
