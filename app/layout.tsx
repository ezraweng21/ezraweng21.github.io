import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Ezra Portfolio",
  description:
    "Personal and professional portfolio with a strong technical and project focus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[linear-gradient(120deg,rgba(31,77,63,0.08),transparent_40%,rgba(168,116,71,0.08))]" />
          <SiteNavbar />
          <main className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-content flex-col gap-6 px-4 pb-6 pt-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
