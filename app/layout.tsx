import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import "./design-system.css";
import "./section-frames.css";
import "./folio.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: {
    default: "Ezra Weng",
    template: "%s | Ezra Weng",
  },
  description:
    "Research, technical projects, leadership, and field notes by Ezra Weng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="site-frame">
          <SiteNavbar />
          <div className="site-column">
            <main id="main-content" className="site-main">
              {children}
            </main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
