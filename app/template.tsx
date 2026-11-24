"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const theme = pathname.startsWith("/photography") ? "photography" : pathname.startsWith("/personal") ? "personal" : /^\/(projects|portfolio)/.test(pathname) ? "work" : "home";
  return <motion.div className="section-theme" data-theme={theme} initial={false} animate={{ y: reduced ? 0 : [6, 0] }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
