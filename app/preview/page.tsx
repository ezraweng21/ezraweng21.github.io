import type { Metadata } from "next";
import { Preview } from "./preview";
import "./preview.css";

export const metadata: Metadata = {
  title: "Design preview",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return <Preview />;
}
