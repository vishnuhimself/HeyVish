"use client";

import { SmoothScroll } from "./SmoothScroll";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="site">
        <Nav />
        {children}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
