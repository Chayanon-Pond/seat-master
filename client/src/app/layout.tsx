import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seat Master",
  description: "Seat Master Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
