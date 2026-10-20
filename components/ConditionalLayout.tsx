"use client";

import { usePathname } from "next/navigation";
import { SiteShell } from "@/components/site/SiteShell";

const INTERNAL_PREFIXES = ["/dashboard", "/gold"];

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const internal = INTERNAL_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (internal) return <>{children}</>;
  return <SiteShell>{children}</SiteShell>;
}
