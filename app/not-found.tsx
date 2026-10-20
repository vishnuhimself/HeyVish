import Link from "next/link";
import { Scramble } from "@/components/site/Scramble";
import { Reveal } from "@/components/site/Reveal";
import { Magnetic } from "@/components/site/Magnetic";

export const metadata = { title: "404 — Not Found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <main id="main" className="container" style={{ minHeight: "100svh", display: "grid", alignContent: "center", gap: "1.5rem", paddingTop: "5rem", paddingBottom: "4rem" }}>
      <Scramble as="div" text="404" hover auto duration={1400} className="display-xl" />
      <Reveal as="p" className="eyebrow eyebrow--accent" delay={0.4}>Nothing here</Reveal>
      <Reveal as="h1" className="display-l" delay={0.5}>Nothing at this address.</Reveal>
      <Reveal as="p" className="lede" delay={0.6}>The link may be old, or the page moved. Try the homepage, or the writing index.</Reveal>
      <Reveal delay={0.7}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem" }}>
          <Magnetic><Link href="/" className="btn btn--solid">Back home</Link></Magnetic>
          <Magnetic><Link href="/blog" className="btn">Browse writing</Link></Magnetic>
        </div>
      </Reveal>
    </main>
  );
}
