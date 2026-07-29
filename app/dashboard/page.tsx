"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, X, Wallet, ArrowUpRight, ArrowDownRight, Search, Download, CalendarDays, IndianRupee, ExternalLink, Activity, Loader2, Lock, ChevronRight, Eye, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ─── Types ─── */
type Ranking = any;
type HistoryPoint = any;
type AppSummary = any;

/* ─── Helpers ─── */
function fmtR(n: any) { const v = Number(n) || 0; return "₹" + v.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }
function ist(d: string) { try { const dt = new Date(d); return dt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); } catch { return d; } }
const M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const COLORS = ["#E8AD4F","#6B8AFF","#4ADE80","#F472B6","#A78BFA","#FB923C","#38BDF8"];

/* ─── Components ─── */

function PwdGate({ onSuccess }: { onSuccess: () => void }) {
  const [p, setP] = useState(""); const [e, setE] = useState(""); const [l, setL] = useState(false);
  const h = async (ev: React.FormEvent) => {
    ev.preventDefault(); setL(true); setE("");
    await new Promise(r => setTimeout(r, 300));
    try {
      const res = await fetch("/api/auth/dashboard-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: p }) });
      if (res.ok) onSuccess(); else { setE("Wrong password"); setP(""); }
    } catch { setE("Connection failed"); }
    setL(false);
  };
  return (
    <div className="fixed inset-0 bg-[#0C0C0C] flex items-center justify-center z-50">
      <div className="relative">
        {/* Decorative lines */}
        <div className="absolute -inset-20 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>
        </div>
        <form onSubmit={h} className="relative z-10 w-80 space-y-5 text-center">
          <div className="space-y-2">
            <div className="mx-auto w-14 h-14 rounded-full border border-[#E8AD4F]/30 flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#E8AD4F]" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white" style={{ fontFamily: "var(--font-fraunces)" }}>Mission Control</h1>
            <p className="text-sm text-white/40">Enter passcode</p>
          </div>
          <Input type="password" value={p} onChange={ev => setP(ev.target.value)} placeholder="· · · · · · · · · · · ·" disabled={l} className="h-11 bg-white/5 border-white/10 text-white text-center text-lg tracking-[0.3em] placeholder:text-white/20 focus:border-[#E8AD4F]/50 focus:ring-[#E8AD4F]/20" />
          {e && <p className="text-sm text-red-400">{e}</p>}
          <Button type="submit" disabled={!p || l} className="w-full h-11 bg-[#E8AD4F] hover:bg-[#D49C3D] text-black font-medium rounded-lg transition-all duration-200 disabled:opacity-40">
            {l ? <Loader2 className="w-4 h-4 animate-spin" /> : "Access Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}

/* Trend bar chart */
function TrendChart({ kw, hist }: { kw: string; hist: any[] }) {
  const pts = (hist || []).filter((x: any) => x.keyword === kw).sort((a: any, b: any) => a.date.localeCompare(b.date));
  if (pts.length < 2) return <p className="text-xs text-white/30 py-3 text-center">Not enough data yet</p>;
  const mx = 50;
  return (
    <div className="py-3 px-1">
      <div className="flex items-end gap-[2px] h-16 mb-1.5">
        {pts.map((p: any, i: number) => {
          const ht = Math.max(6, ((mx - (Number(p.position) || mx)) / mx) * 100);
          const cl = (Number(p.position) || 99) <= 10 ? "#4ADE80" : (Number(p.position) || 99) <= 20 ? "#E8AD4F" : "#F87171";
          return <div key={i} className="rounded-t w-[6px] transition-all duration-300" style={{ height: `${ht}%`, backgroundColor: cl, opacity: 0.5 + (i / pts.length) * 0.5 }} title={`${p.date}: #${p.position}`} />;
        })}
      </div>
      <div className="flex justify-between text-[10px] text-white/30">
        <span>{ist(pts[0].date).split(",")[0]}</span>
        <span className="text-white/50">#{pts[0].position} → #{pts[pts.length - 1].position}</span>
        <span>{ist(pts[pts.length - 1].date).split(",")[0]}</span>
      </div>
    </div>
  );
}

/* Rank change indicator */
function RankDelta({ now, prev }: { now: any; prev: any }) {
  const c = Number(now) || 0; const p = Number(prev) || 0;
  if (!c || !p) return <span className="text-white/20 text-xs">—</span>;
  const d = p - c;
  if (d > 0) return <span className="text-[#4ADE80] text-xs font-medium flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />+{d}</span>;
  if (d < 0) return <span className="text-[#F87171] text-xs font-medium flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3 rotate-90" />{d}</span>;
  return <span className="text-white/20 text-xs">—</span>;
}

/* Progress bar */
function PosBar({ pos, max = 40 }: { pos: any; max?: number }) {
  const pn = Number(pos) || 0;
  if (!pn) return null;
  const pc = Math.min(100, Math.max(0, (pn / max) * 100));
  return (
    <div className="w-16 bg-white/5 rounded-full h-1 overflow-hidden inline-block ml-2 align-middle">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${100 - pc}%`, background: pn <= 10 ? "#4ADE80" : pn <= 20 ? "#E8AD4F" : "#F87171" }} />
    </div>
  );
}

/* ─── Main Dashboard ─── */
export default function DashboardPage() {
  const [auth, setAuth] = useState(false);
  const [aso, setAso] = useState<any>(null);
  const [fin, setFin] = useState<any>(null);
  const [seoData, setSeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<"aso" | "finance" | "seo">("aso");
  const [sel, setSel] = useState("GrowthKit");
  const [expKw, setExpKw] = useState<string | null>(null);

  const handleDownload = async (id: number) => {
    try {
      const res = await fetch(`/api/dashboard/seo?download=${id}`);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `seo-report-${id}.md`; a.click();
      URL.revokeObjectURL(url);
    } catch { alert("Download failed"); }
  };

  useEffect(() => { if (auth) load(); }, [auth]);

  async function load() {
    setLoading(true);
    try {
      const [a, f, s] = await Promise.all([
        fetch("/api/dashboard/aso?days=30"),
        fetch("/api/dashboard/finance?view=summary"),
        fetch("/api/dashboard/seo"),
      ]);
      if (a.status === 401) { setAuth(false); return; }
      setAso(await a.json());
      setFin(await f.json());
      setSeoData(await s.json());
    } catch { setErr("Load failed"); }
    setLoading(false);
  }

  if (!auth) return (
    <>
      <style>{`header,footer,nav{display:none!important}`}</style>
      <PwdGate onSuccess={() => setAuth(true)} />
    </>
  );

  if (loading) return (
    <>
      <style>{`header,footer,nav{display:none!important}`}</style>
      <div className="fixed inset-0 bg-[#0C0C0C] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#E8AD4F] animate-spin" />
      </div>
    </>
  );

  if (err) return (
    <>
      <style>{`header,footer,nav{display:none!important}`}</style>
      <div className="fixed inset-0 bg-[#0C0C0C] flex items-center justify-center text-red-400">{err}</div>
    </>
  );

  const totals = fin?.totals || {};
  const yearly = fin?.yearly || [];
  const monthly = fin?.monthly || [];
  const inc = Number(totals.total_income) || 0;
  const expn = Number(totals.total_expenses) || 0;
  const net = Number(totals.total_net) || 0;
  const tx = Number(totals.total_tx) || 0;
  const y2026 = (yearly || []).find((y: any) => y.year === 2026);

  const tabs = [
    { id: "aso" as const, label: "App Store", icon: Search },
    { id: "finance" as const, label: "Finance", icon: IndianRupee },
    { id: "seo" as const, label: "SEO Reports", icon: Activity },
  ];

  return (
    <>
      <style>{`header,footer,nav{display:none!important}`}</style>
      <div className="min-h-screen bg-[#0C0C0C] text-white font-sans">
        {/* Subtle grid background */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
          <svg width="100%" height="100%"><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0L0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* ─── Header ─── */}
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E8AD4F]/10 border border-[#E8AD4F]/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#E8AD4F]" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-fraunces)" }}>Mission Control</h1>
                  <p className="text-xs text-white/30 mt-0.5">Last sync {ist(new Date().toISOString())} IST</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/40">
                <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <span>Live</span>
              </div>
            </div>
          </div>

          {/* ─── Tab Navigation ─── */}
          <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] w-fit">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); setExpKw(null); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${tab === t.id ? "bg-[#E8AD4F] text-black shadow-lg shadow-[#E8AD4F]/20" : "text-white/40 hover:text-white/70 hover:bg-white/5"}`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* ─── │ APP STORE TAB ─── */}
          {tab === "aso" && aso && (
            <div className="space-y-5">
              {/* App summary cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(aso.summary || []).map((s: any, i: number) => (
                  <button
                    key={s.app}
                    onClick={() => { setSel(s.app); setExpKw(null); }}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 ${sel === s.app ? "border-[#E8AD4F]/40 bg-[#E8AD4F]/5 shadow-lg shadow-[#E8AD4F]/5" : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{s.app}</span>
                      <div className={`w-2 h-2 rounded-full ${s.ranking_keywords > 0 ? "bg-[#4ADE80]" : "bg-white/10"}`} />
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-fraunces)" }}>{s.ranking_keywords}</span>
                      <span className="text-sm text-white/30">/ {s.total_keywords}</span>
                    </div>
                    <div className="mt-2 w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(s.ranking_keywords / s.total_keywords) * 100}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Rankings table */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.06]">
                  <h2 className="text-sm font-semibold" style={{ fontFamily: "var(--font-fraunces)" }}>Rankings · {sel}</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.04] text-white/30 text-xs uppercase tracking-wider">
                        <th className="py-3 px-5 text-left font-medium">Keyword</th>
                        <th className="py-3 px-5 text-right font-medium">Position</th>
                        <th className="py-3 px-5 text-center font-medium">Change</th>
                        <th className="py-3 px-5 text-right font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...(aso.rankings || []).filter((r: any) => r.app === sel)]
                        .sort((a: any, b: any) => {
                          if (a.found && !b.found) return -1;
                          if (!a.found && b.found) return 1;
                          if (a.found && b.found) return (Number(a.position) || 999) - (Number(b.position) || 999);
                          return 0;
                        })
                        .map((r: any, i: number) => (
                          <Fragment key={r.keyword}>
                            <tr
                              onClick={() => setExpKw(expKw === r.keyword ? null : r.keyword)}
                              className={`border-b border-white/[0.03] transition-colors cursor-pointer ${expKw === r.keyword ? "bg-[#E8AD4F]/5" : "hover:bg-white/[0.02]"}`}
                            >
                              <td className="py-3 px-5">
                                <div className="flex items-center gap-2">
                                  <span className="text-white/80">{r.keyword}</span>
                                  <ChevronRight className={`w-3 h-3 text-white/20 transition-transform duration-200 ${expKw === r.keyword ? "rotate-90" : ""}`} />
                                </div>
                              </td>
                              <td className="py-3 px-5 text-right">
                                {r.found ? (
                                  <span className="font-mono text-white/90 font-medium">#{r.position}</span>
                                ) : (
                                  <span className="text-white/20">—</span>
                                )}
                                {r.found && <PosBar pos={r.position} />}
                              </td>
                              <td className="py-3 px-5 text-center">
                                <RankDelta now={r.position} prev={r.prev_position} />
                              </td>
                              <td className="py-3 px-5 text-right">
                                {r.found
                                  ? <span className="text-[#4ADE80] text-xs">Ranking</span>
                                  : <span className="text-white/20 text-xs">Not found</span>}
                              </td>
                            </tr>
                            {expKw === r.keyword && (
                              <tr>
                                <td colSpan={4} className="px-5 pb-3 bg-white/[0.01]">
                                  <div className="pl-2 border-l-2 border-[#E8AD4F]/30">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs text-white/40">{r.keyword} — 7-day trend</span>
                                      <button onClick={() => setExpKw(null)} className="text-white/20 hover:text-white/50"><X className="w-3 h-3" /></button>
                                    </div>
                                    <TrendChart kw={r.keyword} hist={aso.history || []} />
                                  </div>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── │ FINANCE TAB ─── */}
          {tab === "finance" && fin && (
            <div className="space-y-4">
              {/* Metric cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { label: "Income", value: inc, icon: ArrowUpRight, color: "green", gradient: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20" },
                  { label: "Expenses", value: expn, icon: ArrowDownRight, color: "red", gradient: "from-red-500/10 to-red-500/5 border-red-500/20" },
                  { label: "Net Profit", value: net, icon: Wallet, color: net >= 0 ? "blue" : "orange", gradient: net >= 0 ? "from-blue-500/10 to-blue-500/5 border-blue-500/20" : "from-orange-500/10 to-orange-500/5 border-orange-500/20" },
                  { label: "Transactions", value: tx, icon: CalendarDays, color: "gray", gradient: "from-white/5 to-white/[0.02] border-white/[0.06]" },
                  { label: "2026 YTD", value: y2026?.net ?? "—", icon: BarChart3, color: "green", gradient: "from-green-500/10 to-green-500/5 border-green-500/20" },
                ].map((m, i) => {
                  const Icon = m.icon;
                  const val = typeof m.value === "number" ? fmtR(m.value) : m.value;
                  return (
                    <div key={i} className={`p-4 rounded-xl border bg-gradient-to-br ${m.gradient}`}>
                      <Icon className="w-4 h-4 text-white/40 mb-2" />
                      <div className={`text-xs text-${m.color}-400/60 uppercase tracking-wider`}>{m.label}</div>
                      <div className="text-xl font-bold mt-1" style={{ fontFamily: "var(--font-fraunces)" }}>{val}</div>
                    </div>
                  );
                })}
              </div>

              {/* Monthly chart */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h2 className="text-sm font-semibold mb-4" style={{ fontFamily: "var(--font-fraunces)" }}>Monthly Income vs Expenses</h2>
                <div className="flex items-end gap-[3px] h-44">
                  {(monthly || []).slice(-12).map((d: any, i: number) => {
                    const mx = Math.max(1, ...monthly.map((x: any) => Math.max(Number(x.income) || 0, Number(x.expenses) || 0)));
                    const ih = Math.max(0, ((Number(d.income) || 0) / mx) * 160);
                    const eh = Math.max(0, ((Number(d.expenses) || 0) / mx) * 160);
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                        <div className="w-full flex flex-col gap-[2px]" style={{ height: "160px", justifyContent: "flex-end" }}>
                          {ih > 0 && <div className="w-full rounded-t-sm transition-all duration-300 group-hover:opacity-80" style={{ height: Math.max(3, ih), backgroundColor: "#4ADE80", opacity: 0.6 }} />}
                          {eh > 0 && <div className="w-full rounded-t-sm transition-all duration-300 group-hover:opacity-80" style={{ height: Math.max(3, eh), backgroundColor: "#F87171", opacity: 0.6 }} />}
                        </div>
                        <span className="text-[9px] text-white/30">{M[(Number(d.month_num) || 1) - 1]}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
                  <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#4ADE80] opacity-60" /> Income</span>
                  <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#F87171] opacity-60" /> Expenses</span>
                </div>
              </div>

              {/* Yearly + Monthly tables */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <h2 className="text-sm font-semibold mb-3" style={{ fontFamily: "var(--font-fraunces)" }}>Yearly Summary</h2>
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-white/[0.04] text-white/30 text-xs uppercase tracking-wider"><th className="py-2 pr-3 font-medium text-left">Year</th><th className="py-2 pr-3 font-medium text-right">Income</th><th className="py-2 pr-3 font-medium text-right">Expenses</th><th className="py-2 font-medium text-right">Net</th></tr></thead>
                    <tbody>{(yearly || []).map((y: any) => (
                      <tr key={y.year} className="border-b border-white/[0.02] last:border-0">
                        <td className="py-2.5 pr-3 text-white/60">{y.year}</td>
                        <td className="py-2.5 pr-3 text-right text-white/80">{fmtR(y.income)}</td>
                        <td className="py-2.5 pr-3 text-right text-white/80">{fmtR(y.expenses)}</td>
                        <td className={`py-2.5 text-right font-medium ${(Number(y.net) || 0) >= 0 ? "text-[#4ADE80]" : "text-[#F87171]"}`}>{fmtR(y.net)}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <h2 className="text-sm font-semibold mb-3" style={{ fontFamily: "var(--font-fraunces)" }}>Monthly Breakdown</h2>
                  <div className="overflow-x-auto max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-white/[0.04] text-white/30 text-xs uppercase tracking-wider sticky top-0 bg-[#0C0C0C]"><th className="py-2 pr-3 font-medium text-left">Month</th><th className="py-2 pr-3 font-medium text-right">Income</th><th className="py-2 pr-3 font-medium text-right">Expenses</th><th className="py-2 font-medium text-right">Net</th></tr></thead>
                      <tbody>{(monthly || []).map((m: any) => (
                        <tr key={m.month} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02]">
                          <td className="py-2 pr-3 text-white/60">{M[(Number(m.month_num) || 1) - 1]} {m.year}</td>
                          <td className="py-2 pr-3 text-right text-white/80">{(Number(m.income) || 0) > 0 ? fmtR(m.income) : <span className="text-white/20">—</span>}</td>
                          <td className="py-2 pr-3 text-right text-white/80">{(Number(m.expenses) || 0) > 0 ? fmtR(m.expenses) : <span className="text-white/20">—</span>}</td>
                          <td className={`py-2 text-right font-medium ${(Number(m.net) || 0) >= 0 ? "text-[#4ADE80]" : "text-[#F87171]"}`}>{fmtR(m.net)}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── │ SEO REPORTS TAB ─── */}
          {tab === "seo" && (
            <div className="space-y-4">
              {(seoData?.reports || []).length === 0 && (
                <div className="text-center py-16 text-white/20">
                  <Activity className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No reports yet. First one appears after the next biweekly audit.</p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                {(seoData?.reports || []).map((r: any) => (
                  <div key={r.id} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-200 group">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#E8AD4F]" />
                          <span className="text-sm font-medium">{new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                        <p className="text-xs text-white/30 mt-1.5">Sites: {(r.sites || []).join(", ")}</p>
                      </div>
                      <button
                        onClick={() => handleDownload(r.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/[0.06] text-white/60 hover:text-white/90 transition-all duration-200"
                      >
                        <Download className="w-3.5 h-3.5" />
                        .md
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* Need Fragment import */
import { Fragment } from "react";
