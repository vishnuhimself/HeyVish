"use client";

import { useState, useEffect } from "react";
import { Lock, TrendingUp, TrendingDown, Minus, BarChart3, X, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ─── Types ─── */
interface Ranking {
  app: string; keyword: string; position: number | null; found: boolean;
  date: string; prev_position: number | null; prev_found: boolean | null;
}
interface HistoryPoint { app: string; keyword: string; date: string; position: number; }
interface AppSummary { app: string; total_keywords: number; ranking_keywords: number; }
interface FinanceData {
  yearly: { year: number; income: number; expenses: number; net: number }[];
  monthly: { month: string; year: number; month_num: number; income: number; expenses: number; net: number }[];
  byCategory: { type: string; category: string; total: number; count: number }[];
  totals: { total_income: number; total_expenses: number; total_net: number; total_tx: number };
}

/* ─── Helpers ─── */
function fmt(n: number) { return "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }
function formatIST(iso: string) { const d = new Date(iso); return d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* ─── Password Gate ─── */
function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [p, setP] = useState(""); const [e, setE] = useState(""); const [l, setL] = useState(false);
  const h = async (ev: React.FormEvent) => {
    ev.preventDefault(); setL(true); setE(""); await new Promise(r => setTimeout(r,300));
    try { const res=await fetch("/api/auth/dashboard-login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p})}); if(res.ok) onSuccess(); else { setE("Incorrect"); setP(""); } } catch { setE("Failed"); } setL(false);
  };
  return (<div className="flex items-center justify-center p-6 min-h-screen"><Card className="w-full max-w-md"><CardHeader className="text-center"><div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4"><Lock className="w-6 h-6 text-blue-600 dark:text-blue-400"/></div><CardTitle className="text-2xl">Mission Control</CardTitle><p className="text-muted-foreground">Enter password</p></CardHeader><CardContent><form onSubmit={h} className="space-y-4"><Input type="password" value={p} onChange={ev=>setP(ev.target.value)} placeholder="Enter password" disabled={l}/>{e&&<p className="text-sm text-destructive">{e}</p>}<Button type="submit" className="w-full" disabled={!p||l}>{l?"Verifying...":"Access Dashboard"}</Button></form></CardContent></Card></div>);
}

/* ─── Change Badge ─── */
function Chg({c,p}:{c:number|null;p:number|null}){if(!c||!p)return <span className="text-xs text-gray-400">—</span>;const d=p-c;if(d>0)return <span className="text-xs text-green-600 font-medium">↑{d}</span>;if(d<0)return <span className="text-xs text-red-600 font-medium">↓{Math.abs(d)}</span>;return <span className="text-xs text-gray-400">—</span>;}

/* ─── Position Bar ─── */
function PBar({p,m=40}:{p:number|null;m?:number}){if(!p)return null;const pc=Math.min(100,Math.max(0,(p/m)*100));const cl=p<=10?"bg-green-500":p<=20?"bg-yellow-500":"bg-red-500";return <div className="w-12 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 inline-block ml-2"><div className={`${cl} h-1.5 rounded-full`} style={{width:`${100-pc}%`}}/></div>;}

/* ─── Trend Panel ─── */
function TrendPanel({k,h}:{k:string;h:HistoryPoint[]}){const pts=h.filter(x=>x.keyword===k).sort((a,b)=>a.date.localeCompare(b.date));if(pts.length<2)return <p className="text-xs text-muted-foreground py-2">Need more data</p>;const mx=50;return(<div className="py-3"><div className="flex items-end gap-1 h-16 mb-1">{pts.map((p,i)=>{const ht=Math.max(4,((mx-(p.position||mx))/mx)*100);const cl=(p.position||99)<=10?"bg-green-500":(p.position||99)<=20?"bg-yellow-500":"bg-red-500";return<div key={i} className={`${cl} rounded-t-sm w-2`} style={{height:`${ht}%`}} title={`${p.date}: #${p.position}`}/>})}</div><div className="flex justify-between text-[10px] text-muted-foreground"><span>{formatIST(pts[0].date).split(",")[0]}</span><span>#{pts[0].position}→#{pts[pts.length-1].position}</span><span>{formatIST(pts[pts.length-1].date).split(",")[0]}</span></div></div>);}

/* ─── Monthly Bar Chart ─── */
function MonthlyChart({ data }: { data: FinanceData["monthly"] }) {
  const sorted = [...data].reverse().slice(-12);
  const maxVal = Math.max(...sorted.map(d => Math.max(d.income, d.expenses)), 1);
  return (
    <div className="flex items-end gap-1 h-40 mt-2">
      {sorted.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex flex-col items-center gap-0.5" style={{ height: "140px", justifyContent: "flex-end" }}>
            <div className="w-full bg-green-500 rounded-t-sm" style={{ height: `${(d.income/maxVal)*100}%`, minHeight: d.income > 0 ? 3 : 0 }} title={`Income: ${fmt(d.income)}`} />
            <div className="w-full bg-red-400 rounded-t-sm" style={{ height: `${(d.expenses/maxVal)*100}%`, minHeight: d.expenses > 0 ? 3 : 0 }} title={`Expenses: ${fmt(d.expenses)}`} />
          </div>
          <span className="text-[9px] text-muted-foreground">{MONTHS[d.month_num-1]}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Donut Ring ─── */
function DonutRing({ segments, total, size = 120 }: { segments: { label: string; value: number; color: string }[]; total: number; size?: number }) {
  const stroke = 10; const r = (size - stroke) / 2; const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {segments.map((s, i) => {
          const pct = total > 0 ? s.value / total : 0;
          const dash = circ * pct;
          const o = offset; offset += dash;
          return <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={s.color} strokeWidth={stroke} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-o} strokeLinecap="round" />;
        })}
      </svg>
      <div className="flex flex-col gap-1 text-xs">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} /><span className="text-muted-foreground">{s.label}</span><span className="font-medium">{fmt(s.value)}</span></div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ MAIN ═══════════════ */
export default function DashboardPage() {
  const [auth, setAuth] = useState(false);
  const [asoData, setAsoData] = useState<any>(null);
  const [finData, setFinData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"aso" | "finance">("aso");
  const [selApp, setSelApp] = useState("GrowthKit");
  const [expKw, setExpKw] = useState<string | null>(null);

  useEffect(() => { if (!auth) return; loadAll(); }, [auth]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [asoRes, finRes] = await Promise.all([
        fetch("/api/dashboard/aso?days=30"),
        fetch("/api/dashboard/finance?view=summary"),
      ]);
      if (asoRes.status===401) { setAuth(false); return; }
      setAsoData(await asoRes.json());
      setFinData(await finRes.json());
    } catch { setError("Load failed"); }
    setLoading(false);
  };

  if (!auth) return <div className="min-h-screen bg-white dark:bg-black"><style>{`header,footer,nav{display:none!important}`}</style><PasswordGate onSuccess={()=>setAuth(true)}/></div>;
  if (loading) return <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center"><style>{`header,footer,nav{display:none!important}`}</style><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"/></div>;
  if (error||!finData) return <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center"><style>{`header,footer,nav{display:none!important}`}</style><p className="text-red-500">{error||"No data"}</p></div>;

  const { totals, yearly, monthly, byCategory } = finData;
  const incomeCats = byCategory.filter(c => c.type === "Income");
  const expenseCats = byCategory.filter(c => c.type === "Expense");
  const colors = ["#3b82f6","#8b5cf6","#f59e0b","#10b981","#ef4444","#ec4899","#06b6d4"];

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 font-sans">
      <style>{`header,footer,nav{display:none!important}`}</style>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2"><BarChart3 className="w-8 h-8 text-blue-600"/>Mission Control</h1>
            <p className="text-sm text-muted-foreground mt-1">Last updated: {formatIST(new Date().toISOString())} IST</p>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg w-fit">
          <button onClick={()=>setTab("aso")} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab==="aso"?"bg-white dark:bg-gray-800 shadow":"text-muted-foreground hover:text-foreground"}`}>📱 App Store Rankings</button>
          <button onClick={()=>setTab("finance")} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab==="finance"?"bg-white dark:bg-gray-800 shadow":"text-muted-foreground hover:text-foreground"}`}>💰 Finance</button>
        </div>

        {/* ── ASO TAB ── */}
        {tab === "aso" && asoData && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {asoData.summary.map((s:AppSummary)=>(<Card key={s.app} className={`cursor-pointer transition-all ${selApp===s.app?"ring-2 ring-blue-500 shadow-lg":"hover:shadow-md"}`} onClick={()=>{setSelApp(s.app);setExpKw(null);}}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{s.app}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{s.ranking_keywords}/{s.total_keywords}</div><div className="text-xs text-muted-foreground mt-1">keywords ranking</div><div className="mt-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full" style={{width:`${(s.ranking_keywords/s.total_keywords)*100}%`}}/></div></CardContent></Card>))}
            </div>
            <Card><CardHeader><CardTitle>App Store Rankings</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="py-2 pr-4 font-medium">Keyword</th><th className="py-2 pr-4 font-medium text-right">Position</th><th className="py-2 pr-4 font-medium text-center">Change</th><th className="py-2 font-medium text-right">Status</th></tr></thead><tbody>{[...asoData.rankings.filter((r:Ranking)=>r.app===selApp)].sort((a:Ranking,b:Ranking)=>{if(a.found&&!b.found)return -1;if(!a.found&&b.found)return 1;if(a.found&&b.found)return (a.position||999)-(b.position||999);return 0;}).map((r:Ranking,i:number)=>(<><tr key={i} className={`border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer ${expKw===r.keyword?"bg-blue-50 dark:bg-blue-950":""}`} onClick={()=>setExpKw(expKw===r.keyword?null:r.keyword)}><td className="py-3 pr-4 font-medium">{r.keyword}</td><td className="py-3 pr-4 text-right whitespace-nowrap">{r.found?<span className="font-mono font-bold">#{r.position}</span>:<span className="text-gray-400">—</span>}{r.found&&<PBar p={r.position}/>}</td><td className="py-3 pr-4 text-center"><Chg c={r.position} p={r.prev_position}/></td><td className="py-3 text-right">{r.found?<span className="text-green-600 text-xs font-medium">Ranking</span>:<span className="text-red-400 text-xs">Not found</span>}</td></tr>{expKw===r.keyword&&<tr><td colSpan={4} className="bg-gray-50 dark:bg-gray-950 px-4 py-2"><div className="flex items-center justify-between mb-1"><span className="text-xs font-medium text-muted-foreground">{r.keyword} — 7-day trend</span><button onClick={e=>{e.stopPropagation();setExpKw(null);}} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3"/></button></div><TrendPanel k={r.keyword} h={asoData.history}/></td></tr>}</>))}</tbody></table></div></CardContent></Card>
          </>
        )}

        {/* ── FINANCE TAB ── */}
        {tab === "finance" && (
          <>
            {/* Top Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
                <CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><ArrowUpRight className="w-4 h-4 text-green-600"/><span className="text-xs text-muted-foreground">Total Income</span></div><div className="text-xl font-bold text-green-700 dark:text-green-400">{fmt(totals.total_income)}</div></CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800">
                <CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><ArrowDownRight className="w-4 h-4 text-red-600"/><span className="text-xs text-muted-foreground">Total Expenses</span></div><div className="text-xl font-bold text-red-700 dark:text-red-400">{fmt(totals.total_expenses)}</div></CardContent>
              </Card>
              <Card className={`bg-gradient-to-br ${totals.total_net>=0?"from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800":"from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800"}`}>
                <CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><Wallet className="w-4 h-4 text-blue-600"/><span className="text-xs text-muted-foreground">Net Profit</span></div><div className={`text-xl font-bold ${totals.total_net>=0?"text-blue-700 dark:text-blue-400":"text-orange-700 dark:text-orange-400"}`}>{fmt(totals.total_net)}</div></CardContent>
              </Card>
              <Card>
                <CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><Calendar className="w-4 h-4 text-gray-500"/><span className="text-xs text-muted-foreground">Transactions</span></div><div className="text-xl font-bold">{totals.total_tx}</div></CardContent>
              </Card>
              <Card>
                <CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><DollarSign className="w-4 h-4 text-gray-500"/><span className="text-xs text-muted-foreground">2026 YTD Net</span></div><div className="text-xl font-bold text-green-600">{(yearly.find(y=>y.year===2026)||{net:0}) as any ? fmt((yearly.find(y=>y.year===2026)||{net:0}).net) : "—"}</div></CardContent>
              </Card>
            </div>

            {/* Monthly Chart + Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Monthly Income vs Expenses</CardTitle></CardHeader>
                <CardContent>
                  <MonthlyChart data={monthly} />
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"/> Income</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded-sm"/> Expenses</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Category Breakdown</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div><p className="text-xs font-medium text-muted-foreground mb-2">Income</p>
                    <DonutRing segments={incomeCats.map((c,i)=>({label:c.category,value:c.total,color:colors[i%colors.length]}))} total={totals.total_income} size={100}/>
                  </div>
                  <div><p className="text-xs font-medium text-muted-foreground mb-2">Expenses</p>
                    <DonutRing segments={expenseCats.map((c,i)=>({label:c.category,value:c.total,color:colors[i%colors.length]}))} total={totals.total_expenses} size={100}/>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Yearly Table */}
            <Card>
              <CardHeader><CardTitle>Yearly Summary</CardTitle></CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-left text-muted-foreground"><th className="py-2 pr-4 font-medium">Year</th><th className="py-2 pr-4 font-medium text-right">Income</th><th className="py-2 pr-4 font-medium text-right">Expenses</th><th className="py-2 pr-4 font-medium text-right">Net</th><th className="py-2 font-medium text-right">Margin</th></tr></thead>
                  <tbody>
                    {yearly.map((y:any) => (
                      <tr key={y.year} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium">{y.year}</td>
                        <td className="py-3 pr-4 text-right">{fmt(y.income)}</td>
                        <td className="py-3 pr-4 text-right">{fmt(y.expenses)}</td>
                        <td className={`py-3 pr-4 text-right font-bold ${y.net>=0?"text-green-600":"text-red-600"}`}>{fmt(y.net)}</td>
                        <td className="py-3 text-right text-xs">{y.income>0?((y.net/y.income)*100).toFixed(0)+"%":"—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Monthly Table */}
            <Card>
              <CardHeader><CardTitle>Monthly Breakdown</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b text-left text-muted-foreground"><th className="py-2 pr-4 font-medium">Month</th><th className="py-2 pr-4 font-medium text-right">Income</th><th className="py-2 pr-4 font-medium text-right">Expenses</th><th className="py-2 pr-4 font-medium text-right">Net</th></tr></thead>
                    <tbody>
                      {monthly.map((m:any) => (
                        <tr key={m.month} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900">
                          <td className="py-2 pr-4 font-medium">{MONTHS[m.month_num-1]} {m.year}</td>
                          <td className="py-2 pr-4 text-right">{m.income>0?fmt(m.income):"—"}</td>
                          <td className="py-2 pr-4 text-right">{m.expenses>0?fmt(m.expenses):"—"}</td>
                          <td className={`py-2 pr-4 text-right font-semibold ${m.net>=0?"text-green-600":"text-red-600"}`}>{fmt(m.net)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}