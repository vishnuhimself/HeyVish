"use client";

import { Fragment, useEffect, useState } from "react";
import { Activity, ArrowDownRight, ArrowLeft, ArrowUpRight, BarChart3, CalendarDays, ChevronRight, Download, IndianRupee, Loader2, Lock, RefreshCw, Search, Wallet } from "lucide-react";
import styles from "./dashboard.module.css";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const appColors = ["#f0b35a", "#7f96ff", "#62d99b", "#ea7ab2", "#a891ed", "#ee9561", "#5eb7d6"];
const money = (value: unknown) => `₹${(Number(value) || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
const timestamp = (value: string) => new Date(value).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

function PasswordGate({ unlock }: { unlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setWorking(true); setError("");
    try {
      const response = await fetch("/api/auth/dashboard-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (response.ok) unlock(); else { setError("That passcode doesn’t match."); setPassword(""); }
    } catch { setError("Couldn’t reach Mission Control."); }
    setWorking(false);
  }
  return <main className={styles.gate}><form className={styles.gateCard} onSubmit={submit}>
    <div className={styles.mark}><BarChart3 /></div><p className={styles.eyebrow}>Private workspace</p><h1>Mission Control</h1>
    <p className={styles.gateCopy}>A quiet view of the signals behind my independent apps.</p>
    <label className={styles.password}><Lock /><span className="sr-only">Passcode</span><input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Passcode" /></label>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <button className={styles.primary} disabled={!password || working}>{working ? <Loader2 className={styles.spin} /> : "Open workspace"}</button>
    <a className={styles.back} href="/"><ArrowLeft /> Back to heyvish.com</a>
  </form></main>;
}

function Position({ value }: { value: unknown }) {
  const position = Number(value) || 0;
  if (!position) return <span className={styles.dim}>—</span>;
  return <span className={styles.position}><b>#{position}</b><i><em style={{ width: `${100 - Math.min(100, position / 40 * 100)}%`, background: position <= 10 ? "#62d99b" : position <= 20 ? "#f0b35a" : "#e97878" }} /></i></span>;
}

function Delta({ now, previous }: { now: unknown; previous: unknown }) {
  const delta = (Number(previous) || 0) - (Number(now) || 0);
  if (!delta || !Number(now) || !Number(previous)) return <span className={styles.dim}>—</span>;
  return <span className={delta > 0 ? styles.positive : styles.negative}>{delta > 0 ? "↑" : "↓"} {Math.abs(delta)}</span>;
}

function Trend({ keyword, history }: { keyword: string; history: any[] }) {
  const points = history.filter((item) => item.keyword === keyword).sort((a, b) => a.date.localeCompare(b.date));
  if (points.length < 2) return <p className={styles.emptyInline}>Not enough history yet</p>;
  return <div className={styles.trend}><div>{points.map((point, index) => { const position = Number(point.position) || 50; return <i key={`${point.date}-${index}`} title={`${point.date}: #${point.position}`} style={{ height: `${Math.max(7, (50 - position) / 50 * 100)}%`, background: position <= 10 ? "#62d99b" : position <= 20 ? "#f0b35a" : "#e97878" }} />; })}</div><p><span>{points[0].date}</span><b>#{points[0].position} → #{points.at(-1).position}</b><span>{points.at(-1).date}</span></p></div>;
}

function Ledger({ title, rows }: { title: string; rows: (string | number)[][] }) {
  return <section className={styles.panel}><PanelTitle kicker="Ledger" title={title} /><div className={styles.tableWrap}><table><thead><tr><th>Period</th><th>Income</th><th>Expenses</th><th>Net</th></tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div></section>;
}

function PanelTitle({ kicker, title, detail }: { kicker: string; title: string; detail?: React.ReactNode }) {
  return <div className={styles.panelTitle}><div><p>{kicker}</p><h2>{title}</h2></div>{detail}</div>;
}

type Tab = "aso" | "finance" | "seo";

export default function DashboardPage() {
  const [auth, setAuth] = useState(false), [loading, setLoading] = useState(true);
  const [aso, setAso] = useState<any>(null), [finance, setFinance] = useState<any>(null), [seo, setSeo] = useState<any>(null);
  const [tab, setTab] = useState<Tab>("aso"), [selectedApp, setSelectedApp] = useState("GrowthKit"), [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState(""), [lastSync, setLastSync] = useState("");

  async function load() {
    setLoading(true); setError("");
    try {
      const [a, f, s] = await Promise.all([fetch("/api/dashboard/aso?days=30"), fetch("/api/dashboard/finance?view=summary"), fetch("/api/dashboard/seo")]);
      if (a.status === 401) { setAuth(false); return; }
      setAso(await a.json()); setFinance(await f.json()); setSeo(await s.json()); setLastSync(new Date().toISOString());
    } catch { setError("Mission Control couldn’t load its data."); }
    setLoading(false);
  }
  useEffect(() => { if (auth) void load(); }, [auth]);

  async function download(id: number) {
    try { const response = await fetch(`/api/dashboard/seo?download=${id}`); if (!response.ok) throw new Error(); const url = URL.createObjectURL(await response.blob()); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `seo-report-${id}.md`; anchor.click(); URL.revokeObjectURL(url); }
    catch { setError("That report couldn’t be downloaded."); }
  }

  if (!auth) return <PasswordGate unlock={() => setAuth(true)} />;
  if (loading) return <main className={styles.status}><div className={styles.mark}><Loader2 className={styles.spin} /></div><p>Preparing your workspace…</p></main>;
  if (error && !aso) return <main className={styles.status}><p>{error}</p><button className={styles.primary} onClick={load}>Try again</button></main>;

  const nav = [{ id: "aso" as const, label: "App Store", icon: Search }, { id: "finance" as const, label: "Finance", icon: IndianRupee }, { id: "seo" as const, label: "SEO reports", icon: Activity }];
  const totals = finance?.totals || {}, yearly = finance?.yearly || [], monthly = finance?.monthly || [];
  const income = Number(totals.total_income) || 0, expenses = Number(totals.total_expenses) || 0, net = Number(totals.total_net) || 0;
  const ytd = yearly.find((item: any) => item.year === 2026)?.net;

  return <main className={styles.shell}>
    <aside className={styles.sidebar}><a href="/" className={styles.brand}><span><BarChart3 /></span><div><strong>Mission Control</strong><small>Vish’s workspace</small></div></a>
      <nav className={styles.nav}><p>Workspace</p>{nav.map(({ id, label, icon: Icon }) => <button key={id} aria-current={tab === id ? "page" : undefined} onClick={() => { setTab(id); setExpanded(null); }}><Icon />{label}</button>)}</nav>
      <div className={styles.sidebarFoot}><span><i /> All systems live</span><a href="/"><ArrowLeft /> Portfolio</a></div>
    </aside>
    <section className={styles.workspace}><header className={styles.topbar}><div><p className={styles.eyebrow}>{tab === "aso" ? "Discovery" : tab === "finance" ? "Business" : "Site health"}</p><h1>{nav.find((item) => item.id === tab)?.label}</h1></div><div className={styles.sync}><span>Updated {lastSync ? timestamp(lastSync) : "just now"}</span><button onClick={load} aria-label="Refresh"><RefreshCw /></button></div></header>
      <nav className={styles.mobileNav}>{nav.map(({ id, label, icon: Icon }) => <button key={id} aria-current={tab === id ? "page" : undefined} onClick={() => setTab(id)}><Icon />{label}</button>)}</nav>
      {error && <p className={styles.notice}>{error}</p>}

      {tab === "aso" && aso && <div className={styles.content}><section className={styles.intro}><p>Thirty-day snapshot</p><h2>See where every app is being found.</h2></section>
        <div className={styles.appRail}>{(aso.summary || []).map((item: any, index: number) => <button key={item.app} aria-pressed={selectedApp === item.app} onClick={() => { setSelectedApp(item.app); setExpanded(null); }} style={{ "--app-color": appColors[index % appColors.length] } as React.CSSProperties}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.app}</strong><b>{item.ranking_keywords}<small> / {item.total_keywords}</small></b><i><em style={{ width: `${item.ranking_keywords / Math.max(1, item.total_keywords) * 100}%` }} /></i></button>)}</div>
        <section className={styles.panel}><PanelTitle kicker="Keyword intelligence" title={selectedApp} detail={<span className={styles.badge}>{(aso.rankings || []).filter((rank: any) => rank.app === selectedApp && rank.found).length} ranking</span>} /><div className={styles.tableWrap}><table><thead><tr><th>Keyword</th><th>Position</th><th>Movement</th><th>Status</th></tr></thead><tbody>{[...(aso.rankings || []).filter((rank: any) => rank.app === selectedApp)].sort((a: any, b: any) => Number(!a.found) - Number(!b.found) || (Number(a.position) || 999) - (Number(b.position) || 999)).map((rank: any) => <Fragment key={rank.keyword}><tr className={expanded === rank.keyword ? styles.open : ""} onClick={() => setExpanded(expanded === rank.keyword ? null : rank.keyword)}><td><button className={styles.keyword}>{rank.keyword}<ChevronRight className={expanded === rank.keyword ? styles.rotated : ""} /></button></td><td><Position value={rank.found ? rank.position : null} /></td><td><Delta now={rank.position} previous={rank.prev_position} /></td><td><span className={rank.found ? styles.ranking : styles.notFound}>{rank.found ? "Ranking" : "Not found"}</span></td></tr>{expanded === rank.keyword && <tr className={styles.detail}><td colSpan={4}><Trend keyword={rank.keyword} history={aso.history || []} /></td></tr>}</Fragment>)}</tbody></table></div></section>
      </div>}

      {tab === "finance" && finance && <div className={styles.content}><section className={styles.intro}><p>All-time view</p><h2>The business, without the spreadsheet fog.</h2></section>
        <div className={styles.metrics}>{[{ label: "Income", value: money(income), icon: ArrowUpRight, tone: "positive" }, { label: "Expenses", value: money(expenses), icon: ArrowDownRight, tone: "negative" }, { label: "Net profit", value: money(net), icon: Wallet, tone: net >= 0 ? "positive" : "negative" }, { label: "Transactions", value: Number(totals.total_tx) || 0, icon: CalendarDays, tone: "neutral" }, { label: "2026 YTD", value: ytd == null ? "—" : money(ytd), icon: BarChart3, tone: "accent" }].map(({ label, value, icon: Icon, tone }) => <article key={label} data-tone={tone}><div><span>{label}</span><Icon /></div><strong>{value}</strong></article>)}</div>
        <section className={`${styles.panel} ${styles.chartPanel}`}><PanelTitle kicker="Cash movement" title="Income and expenses" detail={<div className={styles.legend}><span><i data-kind="income" />Income</span><span><i data-kind="expense" />Expenses</span></div>} /><div className={styles.monthChart}>{monthly.slice(-12).map((item: any, index: number) => { const max = Math.max(1, ...monthly.map((month: any) => Math.max(Number(month.income) || 0, Number(month.expenses) || 0))); return <div key={`${item.year}-${item.month_num}-${index}`}><span><i data-kind="income" style={{ height: `${Math.max(2, (Number(item.income) || 0) / max * 100)}%` }} /><i data-kind="expense" style={{ height: `${Math.max(2, (Number(item.expenses) || 0) / max * 100)}%` }} /></span><small>{months[(Number(item.month_num) || 1) - 1]}</small></div>; })}</div></section>
        <div className={styles.split}><Ledger title="Yearly summary" rows={yearly.map((item: any) => [item.year, money(item.income), money(item.expenses), money(item.net)])} /><Ledger title="Monthly breakdown" rows={monthly.map((item: any) => [`${months[(Number(item.month_num) || 1) - 1]} ${item.year}`, money(item.income), money(item.expenses), money(item.net)])} /></div>
      </div>}

      {tab === "seo" && <div className={styles.content}><section className={styles.intro}><p>Biweekly archive</p><h2>A clean record of what changed.</h2></section><div className={styles.reports}>{(seo?.reports || []).map((report: any, index: number) => <article key={report.id}><span>{String(index + 1).padStart(2, "0")}</span><div><p>{new Date(report.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p><h2>{(report.sites || []).join(" · ")}</h2></div><button onClick={() => download(report.id)}><Download /> Download .md</button></article>)}</div>{(seo?.reports || []).length === 0 && <div className={styles.empty}><Activity /><h2>No reports yet.</h2><p>The next biweekly audit will appear here.</p></div>}</div>}
    </section>
  </main>;
}
