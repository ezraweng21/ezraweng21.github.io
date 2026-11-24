import type { Metadata } from "next";
import { DesignBrowser } from "@/components/design-browser";
import "./viewer.css";

export const metadata: Metadata = { title: "Design Browser", robots: { index: false, follow: false } };
export default function DesignBrowserPage() { return <DesignBrowser />; }
