import type { ReactNode } from "react";

// The dashboard shell changes with deployments. Avoid serving an older
// prerendered version (and its navigation) from a shared cache.
export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return children;
}
