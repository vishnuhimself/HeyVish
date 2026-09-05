"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Activity, ArrowDownRight, ArrowLeft, ArrowUpRight, BarChart3, ChevronDown,
  ChevronRight, Download, Loader2, Lock, ReceiptText, RefreshCw, Tags, WalletCards,
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import { ModeToggle } from "@/components/mode-toggle";
import styles from "./dashboard.module.css";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const appMeta: Record<string, { icon: string }> = {
  Expenly: { icon: "/expenly-icon.jpg" },
  GrowthKit: { icon: "/growthkit-icon.jpg" },
  "Nova Widgets": { icon: "/nova-widgets-icon.jpg" },
  Stepsly: { icon: "/stepsly-icon.jpg" },
  Applio: { icon: "/applio-icon.jpg" },
  Calmraine: { icon: "/calmraine-icon.jpg" },
  MNML: { icon: "/mnml-icon.jpg" },
};

const money = (value: unknown) => `₹${(Number(value) || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
const compactMoney = (value: unknown) => new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(Number(value) || 0);
const formatSync = (value: string) => new Date(value).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });
const formatDay = (value: string) => new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
const periodKey = (year: unknown, month: unknown) => `${year}-${String(month).padStart(2, "0")}`;
const monthTitle = (year: unknown, month: unknown) => `${monthNames[(Number(month) || 1) - 1]} ${year}`;

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

function StoreTabIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="M10.25 3a7.25 7.25 0 1 0 4.47 12.96l4.66 4.66 1.24-1.24-4.66-4.66A7.25 7.25 0 0 0 10.25 3Zm0 2a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z" clipRule="evenodd" /></svg>;
}

function FinanceTabIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 5.25A2.25 2.25 0 0 1 6.25 3h10.5A2.25 2.25 0 0 1 19 5.25V7H6.5A2.5 2.5 0 0 0 4 9.5V5.25Z" /><path fill="currentColor" fillRule="evenodd" d="M4 9.5A1.5 1.5 0 0 1 5.5 8h14A1.5 1.5 0 0 1 21 9.5v9a2.5 2.5 0 0 1-2.5 2.5h-12A2.5 2.5 0 0 1 4 18.5v-9Zm12.75 4a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" clipRule="evenodd" /></svg>;
}

function ReportsTabIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 13.5A1.5 1.5 0 0 1 5.5 12h1A1.5 1.5 0 0 1 8 13.5V20H4v-6.5ZM10 9.5A1.5 1.5 0 0 1 11.5 8h1A1.5 1.5 0 0 1 14 9.5V20h-4V9.5ZM16 5.5A1.5 1.5 0 0 1 17.5 4h1A1.5 1.5 0 0 1 20 5.5V20h-4V5.5Z" /></svg>;
}

function SegmentedNavigation({ value, onChange }: { value: Tab; onChange: (tab: Tab) => void }) {
  const items = [{ id: "aso" as const, label: "App Store", icon: StoreTabIcon }, { id: "finance" as const, label: "Finance", icon: FinanceTabIcon }, { id: "seo" as const, label: "Reports", icon: ReportsTabIcon }];
  return <nav className={styles.nav} aria-label="Workspace">{items.map(({ id, label, icon: Icon }) => <button key={id} aria-current={value === id ? "page" : undefined} onClick={() => onChange(id)}><Icon />{label}</button>)}</nav>;
}

function PanelHeader({ title, detail }: { title: string; detail?: React.ReactNode }) {
  return <div className={styles.panelHeader}><h2>{title}</h2>{detail}</div>;
}

function PeriodDetails({ period, detail, loading }: { period: any; detail: any; loading: boolean }) {
  if (loading) return <div className={styles.periodDetails}><div className={styles.periodLoading}><Loader2 className={styles.spin} /> Loading {monthTitle(period.year, period.month_num)}…</div></div>;
  if (!detail) return null;
  const summary = detail.summary || {};
  const categories = detail.categories || [];
  const transactions = detail.transactions || [];
  const largestCategory = Math.max(...categories.map((item: any) => Number(item.total) || 0), 1);
  return <div className={styles.periodDetails}>
    <div className={styles.periodHeadline}>
      <div><span>{monthTitle(period.year, period.month_num)} in detail</span><strong>{money(summary.net)} <small>net</small></strong></div>
      <span>{summary.total_tx || 0} transactions</span>
    </div>
    <div className={styles.periodStats}>
      <div><span>Income</span><strong>{money(summary.income)}</strong></div>
      <div><span>Expenses</span><strong>{money(summary.expenses)}</strong></div>
      <div><span>Saved</span><strong>{money(summary.net)}</strong></div>
    </div>
    <div className={styles.periodBody}>
      <section className={styles.categoryBreakdown}>
        <div className={styles.detailTitle}><Tags /><span>Spend by category</span></div>
        {categories.length ? categories.map((category: any) => <div className={styles.categoryRow} key={category.category}>
          <div><span>{category.category}</span><strong>{money(category.total)}</strong></div>
          <i><em style={{ width: `${Math.max(4, Number(category.total) / largestCategory * 100)}%` }} /></i>
          <small>{category.count} {category.count === 1 ? "transaction" : "transactions"}</small>
        </div>) : <p className={styles.detailEmpty}>No expenses were recorded this month.</p>}
      </section>
      <section className={styles.transactionList}>
        <div className={styles.detailTitle}><ReceiptText /><span>All transactions</span></div>
        {transactions.length ? transactions.map((transaction: any) => <article key={transaction.id}>
          <time>{formatDay(transaction.date)}</time>
          <div><strong>{transaction.merchant || transaction.name || transaction.category}</strong><span>{transaction.category}{transaction.notes ? ` · ${transaction.notes}` : ""}</span></div>
          <b className={transaction.type === "Income" ? styles.up : ""}>{transaction.type === "Income" ? "+" : "−"}{money(transaction.amount)}</b>
        </article>) : <p className={styles.detailEmpty}>No transactions were recorded this month.</p>}
      </section>
    </div>
  </div>;
}

type Tab = "aso" | "finance" | "seo";

export default function DashboardPage() {
  const [auth, setAuth] = useState(false), [loading, setLoading] = useState(true);
  const [aso, setAso] = useState<any>(null), [finance, setFinance] = useState<any>(null), [seo, setSeo] = useState<any>(null);
  const [tab, setTab] = useState<Tab>("aso"), [selectedApp, setSelectedApp] = useState("GrowthKit"), [expanded, setExpanded] = useState<string | null>(null);
  const [expandedYear, setExpandedYear] = useState<number | null>(null), [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [periodDetail, setPeriodDetail] = useState<any>(null), [periodLoading, setPeriodLoading] = useState(false);
  const periodRequest = useRef<string | null>(null);
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

  async function selectPeriod(year: number, month: number) {
    const key = periodKey(year, month);
    if (selectedPeriod === key) { periodRequest.current = null; setSelectedPeriod(null); setPeriodDetail(null); return; }
    periodRequest.current = key;
    setSelectedPeriod(key); setPeriodDetail(null); setPeriodLoading(true);
    try {
      const response = await fetch(`/api/dashboard/finance?view=period&year=${year}&month=${month}`);
      if (!response.ok) throw new Error();
      const detail = await response.json();
      if (periodRequest.current === key) setPeriodDetail(detail);
    } catch { if (periodRequest.current === key) setError("That month’s transactions couldn’t be loaded."); }
    if (periodRequest.current === key) setPeriodLoading(false);
  }

  if (!auth) return <PasswordGate unlock={() => setAuth(true)} />;
  if (loading) return <main className={styles.status}><div className={styles.appMark}><Loader2 className={styles.spin} /></div><p>Updating workspace…</p></main>;
  if (error && !aso) return <main className={styles.status}><p>{error}</p><button className={styles.primary} onClick={load}>Try again</button></main>;

  const totals = finance?.totals || {}, yearly = finance?.yearly || [], monthly = finance?.monthly || [];
  const income = Number(totals.total_income) || 0, expenses = Number(totals.total_expenses) || 0, net = Number(totals.total_net) || 0;
  const chronologicalMonths = [...monthly].sort((a: any, b: any) => (Number(a.year) * 12 + Number(a.month_num)) - (Number(b.year) * 12 + Number(b.month_num))).map((item: any) => ({ ...item, label: `${monthNames[(Number(item.month_num) || 1) - 1]} '${String(item.year).slice(-2)}`, income: Number(item.income) || 0, expenses: Number(item.expenses) || 0, net: Number(item.net) || 0 }));
  const currentYearNumber = new Date().getFullYear();
  const currentYear = yearly.find((item: any) => Number(item.year) === currentYearNumber) || { year: currentYearNumber, income: 0, expenses: 0, net: 0 };
  const monthCategories = new Map<string, any>();
  (finance?.monthlyCategory || []).forEach((item: any) => {
    const key = periodKey(item.year, item.month_num);
    const current = monthCategories.get(key);
    if (!current || Number(item.total) > Number(current.total)) monthCategories.set(key, item);
  });
  const expenseCategories = (finance?.byCategory || []).filter((item: any) => item.type === "Expense").map((item: any) => ({ ...item, total: Number(item.total) || 0 })).slice(0, 5);
  const largestExpenseCategory = expenseCategories[0];
  const averageMonthlySpend = chronologicalMonths.length ? expenses / chronologicalMonths.length : 0;

  return <main className={styles.shell}>
    <aside className={styles.sidebar}>
      <a href="/" className={styles.brand}><span><BarChart3 /></span><strong>Mission Control</strong></a>
      <SegmentedNavigation value={tab} onChange={(next) => { setTab(next); setExpanded(null); setExpandedYear(null); setSelectedPeriod(null); setPeriodDetail(null); }} />
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
          <section className={styles.appSelector} aria-label="Choose app">{(aso.summary || []).map((item: any) => { const meta = appMeta[item.app] || { icon: "/favicon.png" }; return <button key={item.app} aria-pressed={selectedApp === item.app} onClick={() => { setSelectedApp(item.app); setExpanded(null); }}><Image src={meta.icon} alt="" width={46} height={46} /><span><strong>{item.app}</strong><small>{item.ranking_keywords} of {item.total_keywords} ranking</small></span><i><em style={{ width: `${item.ranking_keywords / Math.max(1, item.total_keywords) * 100}%` }} /></i></button>; })}</section>
          <section className={styles.panel}>
            <PanelHeader title={`${selectedApp} keywords`} detail={<span className={styles.pill}>{(aso.rankings || []).filter((item: any) => item.app === selectedApp && item.found).length} found</span>} />
            <div className={styles.tableWrap}><table><thead><tr><th>Keyword</th><th>Position</th><th>Change</th><th>State</th></tr></thead><tbody>{[...(aso.rankings || []).filter((item: any) => item.app === selectedApp)].sort((a: any, b: any) => Number(!a.found) - Number(!b.found) || (Number(a.position) || 999) - (Number(b.position) || 999)).map((rank: any) => <Fragment key={rank.keyword}>
              <tr onClick={() => setExpanded(expanded === rank.keyword ? null : rank.keyword)} className={expanded === rank.keyword ? styles.selectedRow : ""}><td><button className={styles.keyword}><ChevronRight className={expanded === rank.keyword ? styles.rotate : ""} />{rank.keyword}</button></td><td><strong className={styles.rank}>{rank.found ? `#${rank.position}` : "—"}</strong></td><td><Delta now={rank.position} previous={rank.prev_position} /></td><td><span className={rank.found ? styles.found : styles.secondary}>{rank.found ? "Ranking" : "Not found"}</span></td></tr>
              {expanded === rank.keyword && <tr className={styles.detailRow}><td colSpan={4}><RankTrend keyword={rank.keyword} history={aso.history || []} /></td></tr>}
            </Fragment>)}</tbody></table></div>
          </section>
        </>}

        {tab === "finance" && finance && <>
          <header className={styles.pageHeader}><div><p>Finance</p><h1>Your money, in context.</h1><span>A complete view of business cash flow — with every month and transaction close at hand.</span></div><div className={styles.headerStat}><span>Transactions</span><strong>{Number(totals.total_tx) || 0}</strong></div></header>
          <section className={styles.financeHero}>
            <div className={styles.netWorth}><span>All-time net earnings</span><strong>{money(net)}</strong><p className={net >= 0 ? styles.up : styles.down}>{net >= 0 ? <ArrowUpRight /> : <ArrowDownRight />}{income ? `${Math.abs(net / income * 100).toFixed(1)}% retained` : "No income yet"}</p></div>
            <div className={styles.financeFacts}>
              <div><span>{currentYearNumber} net earnings</span><strong>{money(currentYear.net)}</strong></div>
              <div><span>Lifetime income</span><strong>{money(income)}</strong></div>
              <div><span>Lifetime expenses</span><strong>{money(expenses)}</strong></div>
              <div><span>Average monthly spend</span><strong>{money(averageMonthlySpend)}</strong></div>
            </div>
          </section>
          <div className={styles.insightStrip}>
            <div><WalletCards /><span><small>Largest spending area</small><strong>{largestExpenseCategory?.category || "No expenses yet"}</strong></span><b>{largestExpenseCategory ? money(largestExpenseCategory.total) : "—"}</b></div>
            <div><Tags /><span><small>Spend categories</small><strong>{expenseCategories.length}</strong></span><b>across all time</b></div>
            <div><ReceiptText /><span><small>Monthly history</small><strong>{chronologicalMonths.length} months</strong></span><b>fully explorable</b></div>
          </div>
          <section className={styles.panel}>
            <PanelHeader title="Cash flow history" detail={<div className={styles.legend}><span><i className={styles.blueDot} />Income</span><span><i className={styles.orangeDot} />Expenses</span></div>} />
            <div className={styles.financeChart}><ResponsiveContainer width="100%" height="100%"><AreaChart data={chronologicalMonths} margin={{ top: 16, right: 12, left: -8, bottom: 0 }}>
              <defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--blue)" stopOpacity={0.22}/><stop offset="100%" stopColor="var(--blue)" stopOpacity={0}/></linearGradient><linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--orange)" stopOpacity={0.16}/><stop offset="100%" stopColor="var(--orange)" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid vertical={false} stroke="var(--chart-grid)" /><XAxis dataKey="label" axisLine={false} tickLine={false} minTickGap={28} tick={{ fill: "var(--secondary-label)", fontSize: 11 }} dy={8}/><YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--secondary-label)", fontSize: 10 }} tickFormatter={(value) => compactMoney(value)} width={54}/><Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--separator)" }}/>
              <Area type="monotone" dataKey="income" name="Income" stroke="var(--blue)" strokeWidth={2.5} fill="url(#incomeFill)" dot={false} activeDot={{ r: 4 }} animationDuration={500}/><Area type="monotone" dataKey="expenses" name="Expenses" stroke="var(--orange)" strokeWidth={2.5} fill="url(#expenseFill)" dot={false} activeDot={{ r: 4 }} animationDuration={500}/>
            </AreaChart></ResponsiveContainer></div>
          </section>
          <div className={styles.financeGrid}>
            <section className={styles.panel}><PanelHeader title="Where money went" detail={<span className={styles.subtleDetail}>All time</span>} /><div className={styles.categoryOverview}>{expenseCategories.length ? expenseCategories.map((category: any) => <div key={category.category}><div><span>{category.category}</span><strong>{money(category.total)}</strong></div><i><em style={{ width: `${Math.max(4, Number(category.total) / Math.max(1, Number(largestExpenseCategory?.total)) * 100)}%` }} /></i><small>{expenses ? `${(Number(category.total) / expenses * 100).toFixed(1)}% of all expenses` : ""}</small></div>) : <p className={styles.detailEmpty}>Expense categories will appear here.</p>}</div></section>
            <section className={styles.panel}><PanelHeader title="By year" detail={<span className={styles.subtleDetail}>Tap to expand</span>} /><div className={styles.yearList}>{yearly.map((item: any) => {
              const isOpen = expandedYear === Number(item.year);
              const monthsInYear = chronologicalMonths.filter((month: any) => Number(month.year) === Number(item.year)).reverse();
              return <div className={styles.yearGroup} key={item.year}>
                <button className={styles.yearRow} aria-expanded={isOpen} onClick={() => setExpandedYear(isOpen ? null : Number(item.year))}><ChevronDown className={isOpen ? styles.yearChevronOpen : ""} /><span>{item.year}</span><span>{money(item.income)}<small>income</small></span><span>{money(item.expenses)}<small>spent</small></span><strong className={Number(item.net) >= 0 ? styles.up : styles.down}>{money(item.net)}<small>net</small></strong></button>
                <div className={`${styles.yearDetails} ${isOpen ? styles.yearDetailsOpen : ""}`}><div>{monthsInYear.map((month: any) => { const key = periodKey(month.year, month.month_num), topCategory = monthCategories.get(key), isSelected = selectedPeriod === key; return <Fragment key={key}><button className={`${styles.monthRow} ${isSelected ? styles.monthRowSelected : ""}`} onClick={() => void selectPeriod(Number(month.year), Number(month.month_num))}><span><strong>{monthTitle(month.year, month.month_num)}</strong><small>{topCategory ? `Most spent: ${topCategory.category}` : "No expenses"}</small></span><span><b>{money(month.income)}</b><small>income</small></span><span><b>{money(month.expenses)}</b><small>expense</small></span><ChevronRight className={isSelected ? styles.rotate : ""} /></button>{isSelected && <PeriodDetails period={month} detail={periodDetail} loading={periodLoading} />}</Fragment>; })}</div></div>
              </div>;
            })}</div></section>
          </div>
          <section className={`${styles.panel} ${styles.monthHistory}`}><PanelHeader title="Every month" detail={<span className={styles.subtleDetail}>{chronologicalMonths.length} months · Tap for full detail</span>} /><div className={styles.monthList}>{chronologicalMonths.slice().reverse().map((month: any) => { const key = periodKey(month.year, month.month_num), topCategory = monthCategories.get(key), isSelected = selectedPeriod === key; return <Fragment key={key}><button className={`${styles.monthRow} ${isSelected ? styles.monthRowSelected : ""}`} onClick={() => void selectPeriod(Number(month.year), Number(month.month_num))}><span><strong>{monthTitle(month.year, month.month_num)}</strong><small>{topCategory ? `${topCategory.category} was the largest expense` : "No expenses recorded"}</small></span><span><b>{money(month.income)}</b><small>income</small></span><span><b>{money(month.expenses)}</b><small>expense</small></span><strong className={Number(month.net) >= 0 ? styles.up : styles.down}>{money(month.net)}<small>net</small></strong><ChevronRight className={isSelected ? styles.rotate : ""} /></button>{isSelected && <PeriodDetails period={month} detail={periodDetail} loading={periodLoading} />}</Fragment>; })}</div></section>
        </>}

        {tab === "seo" && <>
          <header className={styles.pageHeader}><div><p>SEO reports</p><h1>Site health</h1><span>A simple archive of every scheduled audit.</span></div><div className={styles.headerStat}><span>Reports</span><strong>{(seo?.reports || []).length}</strong></div></header>
          <section className={styles.panel}><PanelHeader title="Audit archive" /><div className={styles.reportList}>{(seo?.reports || []).map((report: any) => <article key={report.id}><div className={styles.reportIcon}><Activity /></div><div><strong>{new Date(report.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong><span>{(report.sites || []).join(" · ")}</span></div><button onClick={() => download(report.id)}><Download /> Download</button></article>)}</div>{(seo?.reports || []).length === 0 && <div className={styles.empty}><Activity /><h2>No reports yet</h2><p>Your next scheduled audit will appear here.</p></div>}</section>
        </>}
      </div>
    </section>
    <div className={styles.mobileBottomNav}>
      <SegmentedNavigation value={tab} onChange={(next) => { setTab(next); setExpanded(null); setExpandedYear(null); setSelectedPeriod(null); setPeriodDetail(null); }} />
    </div>
  </main>;
}
