import type { Metadata } from "next";
import "./globals.css";

import QueryProvider from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "Sportsbook Admin",
  description: "Sportsbook Administration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}