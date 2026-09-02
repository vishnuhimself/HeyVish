"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Activity, ArrowDownRight, ArrowLeft, ArrowUpRight, BarChart3, ChevronRight,
  Download, IndianRupee, Loader2, Lock, RefreshCw, Search, Wallet,
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import { ModeToggle } from "@/components/mode-toggle";
import styles from "./dashboard.module.css";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const appMeta: Record<string, { icon: string; color: string }> = {
  Expenly: { icon: "/expenly-icon.jpg", color: "#ff9f0a" },
  GrowthKit: { icon: "/growthkit-icon.jpg", color: "#5856d6" },
  "Nova Widgets": { icon: "/nova-widgets-icon.jpg", color: "#30d158" },
  Stepsly: { icon: "/stepsly-icon.jpg", color: "#ff375f" },
  Applio: { icon: "/applio-icon.jpg", color: "#0a84ff" },
  Calmraine: { icon: "/calmraine-icon.jpg", color: "#64d2ff" },
  MNML: { icon: "/mnml-icon.jpg", color: "#8e8e93" },
};

const money = (value: unknown) => `₹${(Number(value) || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
const compactMoney = (value: unknown) => new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(Number(value) || 0);
const formatSync = (value: string) => new Date(value).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });
const formatDay = (value: string) => new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

function PasswordGate({ unlock }: { unlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setWorking(true); setError("");
    try {
      const response = await fetch("/api/auth/dashboard-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (response.ok) unlock(); else { setError("The passcode is incorrect."); setPassword(""); }
    } catch { setError("Mission Control is unavailable right now."); }
    setWorking(false);
  }

  return <main className={styles.gate}>
    <div className={styles.gateTheme}><ModeToggle /></div>
    <form className={styles.gateCard} onSubmit={submit}>
      <div className={styles.appMark}><BarChart3 /></div>
      <h1>Mission Control</h1>
      <p>Private analytics for Vish’s apps.</p>
      <label className={styles.password}>
        <Lock /><span className="sr-only">Passcode</span>
        <input autoFocus type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Passcode" />
      </label>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button className={styles.primary} disabled={!password || working}>{working ? <Loader2 className={styles.spin} /> : "Continue"}</button>
      <a className={styles.back} href="/"><ArrowLeft /> Return to portfolio</a>
    </form>
  </main>;
}

function ChartTooltip({ active, payload, label, ranking = false }: any) {
  if (!active || !payload?.length) return null;
  return <div className={styles.tooltip}>
    <p>{ranking ? formatDay(label) : label}</p>
    {payload.map((item: any) => <div key={item.dataKey}><i style={{ background: item.color }} /><span>{item.name}</span><strong>{ranking ? `#${item.value}` : money(item.value)}</strong></div>)}
  </div>;
}

function RankTrend({ keyword, history }: { keyword: string; history: any[] }) {
  const data = useMemo(() => history.filter((item) => item.keyword === keyword).sort((a, b) => a.date.localeCompare(b.date)).map((item) => ({ date: item.date, position: Number(item.position) || 50 })), [history, keyword]);
  if (data.length < 2) return <div className={styles.chartEmpty}>More ranking history is needed to draw a trend.</div>;
  const worst = Math.max(10, ...data.map((item) => item.position));
  return <div className={styles.rankChart}>
    <div className={styles.rankChartHeader}><div><span>7-day position</span><strong>#{data.at(-1)?.position}</strong></div><p>{formatDay(data[0].date)} — {formatDay(data.at(-1)!.date)}</p></div>
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={data} margin={{ top: 12, right: 8, bottom: 0, left: -26 }}>
        <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
        <XAxis dataKey="date" hide />
        <YAxis reversed domain={[1, worst]} tick={{ fill: "var(--secondary-label)", fontSize: 10 }} axisLine={false} tickLine={false} width={42} tickFormatter={(value) => `#${value}`} />
        <Tooltip content={<ChartTooltip ranking />} cursor={{ stroke: "var(--separator)" }} />
        <Line type="monotone" dataKey="position" name="Position" stroke="var(--blue)" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "var(--blue)", stroke: "var(--surface)", strokeWidth: 2 }} animationDuration={450} />
      </LineChart>
    </ResponsiveContainer>
  </div>;
}

function Delta({ now, previous }: { now: unknown; previous: unknown }) {
  const delta = (Number(previous) || 0) - (Number(now) || 0);
  if (!delta || !Number(now) || !Number(previous)) return <span className={styles.secondary}>—</span>;
  return <span className={delta > 0 ? styles.up : styles.down}>{delta > 0 ? "↑" : "↓"} {Math.abs(delta)}</span>;
}

function SegmentedNavigation({ value, onChange }: { value: Tab; onChange: (tab: Tab) => void }) {
  const items = [{ id: "aso" as const, label: "App Store", icon: Search }, { id: "finance" as const, label: "Finance", icon: IndianRupee }, { id: "seo" as const, label: "Reports", icon: Activity }];
  return <nav className={styles.nav} aria-label="Workspace">{items.map(({ id, label, icon: Icon }) => <button key={id} aria-current={value === id ? "page" : undefined} onClick={() => onChange(id)}><Icon />{label}</button>)}</nav>;
}

function PanelHeader({ title, detail }: { title: string; detail?: React.ReactNode }) {
  return <div className={styles.panelHeader}><h2>{title}</h2>{detail}</div>;
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
      const [appStoreResponse, financeResponse, seoResponse] = await Promise.all([fetch("/api/dashboard/aso?days=30"), fetch("/api/dashboard/finance?view=summary"), fetch("/api/dashboard/seo")]);
      if (appStoreResponse.status === 401) { setAuth(false); return; }
      setAso(await appStoreResponse.json()); setFinance(await financeResponse.json()); setSeo(await seoResponse.json()); setLastSync(new Date().toISOString());
    } catch { setError("Some data could not be refreshed."); }
    setLoading(false);
  }
  useEffect(() => { if (auth) void load(); }, [auth]);

  async function download(id: number) {
    try { const response = await fetch(`/api/dashboard/seo?download=${id}`); if (!response.ok) throw new Error(); const url = URL.createObjectURL(await response.blob()); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `seo-report-${id}.md`; anchor.click(); URL.revokeObjectURL(url); }
    catch { setError("The report couldn’t be downloaded."); }
  }

  if (!auth) return <PasswordGate unlock={() => setAuth(true)} />;
  if (loading) return <main className={styles.status}><div className={styles.appMark}><Loader2 className={styles.spin} /></div><p>Updating workspace…</p></main>;
  if (error && !aso) return <main className={styles.status}><p>{error}</p><button className={styles.primary} onClick={load}>Try again</button></main>;

  const totals = finance?.totals || {}, yearly = finance?.yearly || [], monthly = finance?.monthly || [];
  const income = Number(totals.total_income) || 0, expenses = Number(totals.total_expenses) || 0, net = Number(totals.total_net) || 0;
  const chronologicalMonths = [...monthly].sort((a: any, b: any) => (Number(a.year) * 12 + Number(a.month_num)) - (Number(b.year) * 12 + Number(b.month_num))).slice(-12).map((item: any) => ({ ...item, label: monthNames[(Number(item.month_num) || 1) - 1], income: Number(item.income) || 0, expenses: Number(item.expenses) || 0 }));
  const currentYear = yearly[0] || {};

  return <main className={styles.shell}>
    <aside className={styles.sidebar}>
      <a href="/" className={styles.brand}><span><BarChart3 /></span><strong>Mission Control</strong></a>
      <SegmentedNavigation value={tab} onChange={(next) => { setTab(next); setExpanded(null); }} />
      <div className={styles.sidebarBottom}><span><i /> Synced</span><a href="/"><ArrowLeft /> Portfolio</a></div>
    </aside>

    <section className={styles.workspace}>
      <header className={styles.toolbar}>
        <div className={styles.mobileBrand}><div className={styles.appMark}><BarChart3 /></div><strong>Mission Control</strong></div>
        <div className={styles.toolbarActions}><span>{lastSync ? `Updated ${formatSync(lastSync)}` : "Updated now"}</span><button onClick={load} aria-label="Refresh data"><RefreshCw /></button><ModeToggle className={styles.themeToggle} /></div>
      </header>
      {error && <div className={styles.notice}>{error}</div>}

      <div className={styles.view} key={tab}>
        {tab === "aso" && aso && <>
          <header className={styles.pageHeader}><div><p>App Store</p><h1>Search visibility</h1><span>Keyword positions across your apps over the last 30 days.</span></div><div className={styles.headerStat}><span>Keywords ranking</span><strong>{(aso.rankings || []).filter((item: any) => item.found).length}</strong></div></header>
          <section className={styles.appSelector} aria-label="Choose app">{(aso.summary || []).map((item: any) => { const meta = appMeta[item.app] || { icon: "/favicon.png", color: "#007aff" }; return <button key={item.app} aria-pressed={selectedApp === item.app} onClick={() => { setSelectedApp(item.app); setExpanded(null); }}><Image src={meta.icon} alt="" width={46} height={46} /><span><strong>{item.app}</strong><small>{item.ranking_keywords} of {item.total_keywords} ranking</small></span><i style={{ "--color": meta.color } as React.CSSProperties}><em style={{ width: `${item.ranking_keywords / Math.max(1, item.total_keywords) * 100}%` }} /></i></button>; })}</section>
          <section className={styles.panel}>
            <PanelHeader title={`${selectedApp} keywords`} detail={<span className={styles.pill}>{(aso.rankings || []).filter((item: any) => item.app === selectedApp && item.found).length} found</span>} />
            <div className={styles.tableWrap}><table><thead><tr><th>Keyword</th><th>Position</th><th>Change</th><th>State</th></tr></thead><tbody>{[...(aso.rankings || []).filter((item: any) => item.app === selectedApp)].sort((a: any, b: any) => Number(!a.found) - Number(!b.found) || (Number(a.position) || 999) - (Number(b.position) || 999)).map((rank: any) => <Fragment key={rank.keyword}>
              <tr onClick={() => setExpanded(expanded === rank.keyword ? null : rank.keyword)} className={expanded === rank.keyword ? styles.selectedRow : ""}><td><button className={styles.keyword}><ChevronRight className={expanded === rank.keyword ? styles.rotate : ""} />{rank.keyword}</button></td><td><strong className={styles.rank}>{rank.found ? `#${rank.position}` : "—"}</strong></td><td><Delta now={rank.position} previous={rank.prev_position} /></td><td><span className={rank.found ? styles.found : styles.secondary}>{rank.found ? "Ranking" : "Not found"}</span></td></tr>
              {expanded === rank.keyword && <tr className={styles.detailRow}><td colSpan={4}><RankTrend keyword={rank.keyword} history={aso.history || []} /></td></tr>}
            </Fragment>)}</tbody></table></div>
          </section>
        </>}

        {tab === "finance" && finance && <>
          <header className={styles.pageHeader}><div><p>Finance</p><h1>Business overview</h1><span>Income, expenses, and retained earnings at a glance.</span></div><div className={styles.headerStat}><span>Transactions</span><strong>{Number(totals.total_tx) || 0}</strong></div></header>
          <section className={styles.financeHero}>
            <div className={styles.netWorth}><span>Net earnings</span><strong>{money(net)}</strong><p className={net >= 0 ? styles.up : styles.down}>{net >= 0 ? <ArrowUpRight /> : <ArrowDownRight />}{income ? `${Math.abs(net / income * 100).toFixed(1)}% margin` : "No income yet"}</p></div>
            <div className={styles.financeFacts}><div><span>Total income</span><strong>{money(income)}</strong></div><div><span>Total expenses</span><strong>{money(expenses)}</strong></div><div><span>{currentYear.year || "Current year"} net</span><strong>{money(currentYear.net)}</strong></div></div>
          </section>
          <section className={styles.panel}>
            <PanelHeader title="Cash flow" detail={<div className={styles.legend}><span><i className={styles.blueDot} />Income</span><span><i className={styles.orangeDot} />Expenses</span></div>} />
            <div className={styles.financeChart}><ResponsiveContainer width="100%" height="100%"><AreaChart data={chronologicalMonths} margin={{ top: 16, right: 12, left: -8, bottom: 0 }}>
              <defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--blue)" stopOpacity={0.22}/><stop offset="100%" stopColor="var(--blue)" stopOpacity={0}/></linearGradient><linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--orange)" stopOpacity={0.16}/><stop offset="100%" stopColor="var(--orange)" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid vertical={false} stroke="var(--chart-grid)" /><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "var(--secondary-label)", fontSize: 11 }} dy={8}/><YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--secondary-label)", fontSize: 10 }} tickFormatter={(value) => compactMoney(value)} width={54}/><Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--separator)" }}/>
              <Area type="monotone" dataKey="income" name="Income" stroke="var(--blue)" strokeWidth={2.5} fill="url(#incomeFill)" dot={false} activeDot={{ r: 4 }} animationDuration={500}/><Area type="monotone" dataKey="expenses" name="Expenses" stroke="var(--orange)" strokeWidth={2.5} fill="url(#expenseFill)" dot={false} activeDot={{ r: 4 }} animationDuration={500}/>
            </AreaChart></ResponsiveContainer></div>
          </section>
          <div className={styles.financeGrid}>
            <section className={styles.panel}><PanelHeader title="By year" /><div className={styles.list}>{yearly.map((item: any) => <div key={item.year}><span>{item.year}</span><span>{money(item.income)}<small>income</small></span><span>{money(item.expenses)}<small>spent</small></span><strong className={Number(item.net) >= 0 ? styles.up : styles.down}>{money(item.net)}</strong></div>)}</div></section>
            <section className={styles.panel}><PanelHeader title="Recent months" /><div className={styles.list}>{chronologicalMonths.slice(-6).reverse().map((item: any) => <div key={`${item.year}-${item.month_num}`}><span>{item.label}</span><span>{money(item.income)}<small>income</small></span><span>{money(item.expenses)}<small>spent</small></span><strong className={Number(item.income) - Number(item.expenses) >= 0 ? styles.up : styles.down}>{money(Number(item.income) - Number(item.expenses))}</strong></div>)}</div></section>
          </div>
        </>}

        {tab === "seo" && <>
          <header className={styles.pageHeader}><div><p>SEO reports</p><h1>Site health</h1><span>A simple archive of every scheduled audit.</span></div><div className={styles.headerStat}><span>Reports</span><strong>{(seo?.reports || []).length}</strong></div></header>
          <section className={styles.panel}><PanelHeader title="Audit archive" /><div className={styles.reportList}>{(seo?.reports || []).map((report: any) => <article key={report.id}><div className={styles.reportIcon}><Activity /></div><div><strong>{new Date(report.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong><span>{(report.sites || []).join(" · ")}</span></div><button onClick={() => download(report.id)}><Download /> Download</button></article>)}</div>{(seo?.reports || []).length === 0 && <div className={styles.empty}><Activity /><h2>No reports yet</h2><p>Your next scheduled audit will appear here.</p></div>}</section>
        </>}
      </div>
    </section>
    <div className={styles.mobileBottomNav}>
      <SegmentedNavigation value={tab} onChange={(next) => { setTab(next); setExpanded(null); }} />
    </div>
  </main>;
}
