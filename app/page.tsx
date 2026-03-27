import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F0F7FF] dark:bg-[#020C18]">

      {/* ── Animated gradient blobs ── */}
      <div
        className="blob w-[520px] h-[520px] bg-[#05B42C]/40 dark:bg-[#05B42C]/20 -top-36 -left-36"
        style={{ animationDuration: "9s" }}
      />
      <div
        className="blob w-[420px] h-[420px] bg-[#0050A3]/40 dark:bg-[#0050A3]/22 top-1/2 -right-28"
        style={{ animationDuration: "11s", animationDelay: "-4s" }}
      />
      <div
        className="blob w-[360px] h-[360px] bg-[#0050A3]/30 dark:bg-[#05B42C]/15 -bottom-20 left-1/3"
        style={{ animationDuration: "13s", animationDelay: "-7s" }}
      />

      {/* ── Mode toggle ── */}
      <div className="fixed top-4 right-4 z-50 backdrop-blur-sm bg-white/30 dark:bg-black/30 rounded-xl border border-white/40 dark:border-white/10 shadow-sm">
        <ModeToggle />
      </div>

      {/* ── Page content ── */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-7">

          {/* Hero */}
          <div
            className="flex flex-col items-center space-y-4 fade-in-up"
            style={{ animationDelay: "0ms" }}
          >
            {/* Avatar with gradient ring */}
              <div className="p-[3px] rounded-[26px] bg-gradient-to-br from-[#05B42C] to-[#0050A3] shadow-2xl shadow-[#0050A3]/30">
              <div className="relative w-24 h-24 rounded-[23px] overflow-hidden">
                <Image
                  src="/Vish_DP.webp"
                  alt="Srivishnu Ramakrishnan"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Name + tagline */}
            <div className="text-center space-y-1.5">
              <h1 className="text-[28px] font-bold leading-tight text-gray-900 dark:text-white">
                Srivishnu Ramakrishnan
              </h1>
              <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">
                i make apps
              </p>
            </div>
          </div>

          {/* Social pills */}
          <div
            className="flex items-center justify-center gap-2 fade-in-up"
            style={{ animationDelay: "90ms" }}
          >
            <Link
              href="https://x.com/VishHimself"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full backdrop-blur-md bg-white/50 dark:bg-white/[0.07] border border-white/60 dark:border-white/[0.12] text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-white/[0.13] transition-all duration-200 shadow-sm"
            >
              <svg viewBox="0 0 300 300.251" className="w-3.5 h-3.5 fill-current shrink-0">
                <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
              </svg>
              Follow
            </Link>

            <Link
              href="mailto:hey@heyvish.com"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full backdrop-blur-md bg-white/50 dark:bg-white/[0.07] border border-white/60 dark:border-white/[0.12] text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-white/[0.13] transition-all duration-200 shadow-sm"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </Link>

            <Link
              href="/blog"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full backdrop-blur-md bg-white/50 dark:bg-white/[0.07] border border-white/60 dark:border-white/[0.12] text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-white/[0.13] transition-all duration-200 shadow-sm"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Blog
            </Link>
          </div>

          {/* Apps section */}
          <div
            className="space-y-3 fade-in-up"
            style={{ animationDelay: "180ms" }}
          >

            {/* GrowthKit */}
            <Link
              href="https://apps.apple.com/us/app/growthkit-track-height-weight/id6740914430"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-3.5 rounded-2xl backdrop-blur-xl bg-white/35 dark:bg-white/[0.05] border border-white/60 dark:border-white/[0.09] hover:bg-white/55 dark:hover:bg-white/[0.1] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0050A3]/15 transition-all duration-300 shadow-sm"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm">
                <Image src="/growthkit-logo.png" alt="GrowthKit" fill className="object-cover" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="font-semibold text-[15px] text-gray-900 dark:text-white">GrowthKit</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Track Height &amp; Weight</div>
              </div>
              <div className="shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-[#05B42C] to-[#0050A3] text-white shadow-sm">
                iOS
              </div>
            </Link>

            {/* Steps App */}
            <Link
              href="https://apps.apple.com/us/app/steps-app-pedometer-widgets/id6753876664"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-3.5 rounded-2xl backdrop-blur-xl bg-white/35 dark:bg-white/[0.05] border border-white/60 dark:border-white/[0.09] hover:bg-white/55 dark:hover:bg-white/[0.1] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0050A3]/15 transition-all duration-300 shadow-sm"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm">
                <Image src="/step-counter-steps-app.webp" alt="Steps App" fill className="object-cover" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="font-semibold text-[15px] text-gray-900 dark:text-white">Steps App</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Pedometer &amp; Widgets</div>
              </div>
              <div className="shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-[#05B42C] to-[#0050A3] text-white shadow-sm">
                iOS
              </div>
            </Link>

            {/* ExpenseKit */}
            <Link
              href="https://apps.apple.com/us/app/expense-tracker-expensekit/id6756433597"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-3.5 rounded-2xl backdrop-blur-xl bg-white/35 dark:bg-white/[0.05] border border-white/60 dark:border-white/[0.09] hover:bg-white/55 dark:hover:bg-white/[0.1] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0050A3]/15 transition-all duration-300 shadow-sm"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm">
                <Image src="/expense-kit.webp" alt="ExpenseKit" fill className="object-cover" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="font-semibold text-[15px] text-gray-900 dark:text-white">ExpenseKit</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Expense Tracker</div>
              </div>
              <div className="shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-[#05B42C] to-[#0050A3] text-white shadow-sm">
                iOS
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
