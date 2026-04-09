import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
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
        <div>
          <SiteNavbar />
          <main className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-content flex-col gap-0 px-4 pb-6 pt-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
