"use client";

import { SmoothScroll } from "./SmoothScroll";
import { Cursor } from "./Cursor";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="site">
        <Cursor />
        <Nav />
        {children}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
