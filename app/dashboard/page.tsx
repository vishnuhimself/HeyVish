"use client";

import { useState, useEffect } from "react";
import { Lock, TrendingUp, TrendingDown, Minus, BarChart3, X, DollarSign, ArrowUpRight, ArrowDownRight, Wallet, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* Types */
type Ranking = any;
type HistoryPoint = any;
type AppSummary = any;

/* Helpers */
function fmtR(n: any) { const v = Number(n) || 0; return "₹" + v.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }
function ist(d: string) { try { const dt = new Date(d); return dt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); } catch { return d; } }
const M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* Password Gate */
function PG({ onSuccess }: { onSuccess: () => void }) {
  const [p, setP] = useState(""); const [e, setE] = useState(""); const [l, setL] = useState(false);
  const h = async (ev: React.FormEvent) => { ev.preventDefault(); setL(true); setE(""); await new Promise(r => setTimeout(r,300));
    try { const res=await fetch("/api/auth/dashboard-login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p})}); if(res.ok) onSuccess(); else { setE("Incorrect"); setP(""); } } catch { setE("Failed"); } setL(false); };
  return (<div className="flex items-center justify-center p-6 min-h-screen"><Card className="w-full max-w-md"><CardHeader className="text-center"><div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4"><Lock className="w-6 h-6 text-blue-600 dark:text-blue-400"/></div><CardTitle className="text-2xl">Mission Control</CardTitle><p className="text-muted-foreground">Enter password</p></CardHeader><CardContent><form onSubmit={h} className="space-y-4"><Input type="password" value={p} onChange={ev=>setP(ev.target.value)} placeholder="Enter password" disabled={l}/>{e&&<p className="text-sm text-destructive">{e}</p>}<Button type="submit" className="w-full" disabled={!p||l}>{l?"Verifying...":"Access Dashboard"}</Button></form></CardContent></Card></div>);
}
function Chg({c,p}:{c:any;p:any}){const cn=Number(c)||0;const pn=Number(p)||0;if(!cn||!pn)return<span className="text-xs text-gray-400">—</span>;const d=pn-cn;if(d>0)return<span className="text-xs text-green-600 font-medium">↑{d}</span>;if(d<0)return<span className="text-xs text-red-600 font-medium">↓{Math.abs(d)}</span>;return<span className="text-xs text-gray-400">—</span>;}
function PBar({p,m=40}:{p:any;m?:number}){const pn=Number(p)||0;if(!pn)return null;const pc=Math.min(100,Math.max(0,(pn/m)*100));const cl=pn<=10?"bg-green-500":pn<=20?"bg-yellow-500":"bg-red-500";return<div className="w-12 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 inline-block ml-2"><div className={`${cl} h-1.5 rounded-full`} style={{width:`${100-pc}%`}}/></div>;}
function TP({k,h}:{k:string;h:any[]}){const pts=(h||[]).filter((x:any)=>x.keyword===k).sort((a:any,b:any)=>a.date.localeCompare(b.date));if(pts.length<2)return<p className="text-xs text-muted-foreground py-2">Need more data</p>;const mx=50;return(<div className="py-3"><div className="flex items-end gap-1 h-16 mb-1">{pts.map((p:any,i:number)=>{const ht=Math.max(4,((mx-(Number(p.position)||mx))/mx)*100);const cl=(Number(p.position)||99)<=10?"bg-green-500":(Number(p.position)||99)<=20?"bg-yellow-500":"bg-red-500";return<div key={i} className={`${cl} rounded-t-sm w-2`} style={{height:`${ht}%`}} title={`${p.date}: #${p.position}`}/>})}</div><div className="flex justify-between text-[10px] text-muted-foreground"><span>{ist(pts[0].date).split(",")[0]}</span><span>#{pts[0].position}→#{pts[pts.length-1].position}</span><span>{ist(pts[pts.length-1].date).split(",")[0]}</span></div></div>);}

export default function DashboardPage() {
  const [auth, setAuth] = useState(false);
  const [aso, setAso] = useState<any>(null);
  const [fin, setFin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<"aso"|"finance">("aso");
  const [sel, setSel] = useState("GrowthKit");
  const [exp, setExp] = useState<string|null>(null);

  useEffect(()=>{if(auth) load();},[auth]);

  async function load(){setLoading(true);try{const[a,f]=await Promise.all([fetch("/api/dashboard/aso?days=30"),fetch("/api/dashboard/finance?view=summary")]);if(a.status===401){setAuth(false);return}setAso(await a.json());const fd=await f.json();setFin(fd);}catch{setErr("Load failed")}setLoading(false)}

  if(!auth)return<div className="min-h-screen bg-white dark:bg-black"><style>{`header,footer,nav{display:none!important}`}</style><PG onSuccess={()=>setAuth(true)}/></div>;
  if(loading)return<div className="min-h-screen bg-white dark:bg-black flex items-center justify-center"><style>{`header,footer,nav{display:none!important}`}</style><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"/></div>;
  if(err)return<div className="min-h-screen bg-white dark:bg-black flex items-center justify-center"><style>{`header,footer,nav{display:none!important}`}</style><p className="text-red-500">{err}</p></div>;

  const totals = fin?.totals || {};
  const yearly = fin?.yearly || [];
  const monthly = fin?.monthly || [];
  const byCat = fin?.byCategory || [];
  const inc = Number(totals.total_income) || 0;
  const expn = Number(totals.total_expenses) || 0;
  const net = Number(totals.total_net) || 0;
  const tx = Number(totals.total_tx) || 0;
  const y2026 = (yearly||[]).find((y:any)=>y.year===2026);

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 font-sans">
      <style>{`header,footer,nav{display:none!important}`}</style>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-3xl font-bold flex items-center gap-2"><BarChart3 className="w-8 h-8 text-blue-600"/>Mission Control</h1><p className="text-sm text-muted-foreground mt-1">Last updated: {ist(new Date().toISOString())} IST</p></div>
        </div>

        <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg w-fit">
          <button onClick={()=>setTab("aso")} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab==="aso"?"bg-white dark:bg-gray-800 shadow":"text-muted-foreground hover:text-foreground"}`}>📱 App Store</button>
          <button onClick={()=>setTab("finance")} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab==="finance"?"bg-white dark:bg-gray-800 shadow":"text-muted-foreground hover:text-foreground"}`}>💰 Finance</button>
        </div>

        {tab==="aso"&&aso&&(<>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{(aso.summary||[]).map((s:any)=>(<Card key={s.app} className={`cursor-pointer transition-all ${sel===s.app?"ring-2 ring-blue-500 shadow-lg":"hover:shadow-md"}`} onClick={()=>{setSel(s.app);setExp(null);}}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{s.app}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{s.ranking_keywords}/{s.total_keywords}</div><div className="text-xs text-muted-foreground mt-1">keywords ranking</div><div className="mt-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full" style={{width:`${(s.ranking_keywords/s.total_keywords)*100}%`}}/></div></CardContent></Card>))}</div>
          <Card><CardHeader><CardTitle>App Store Rankings</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="py-2 pr-4 font-medium">Keyword</th><th className="py-2 pr-4 font-medium text-right">Position</th><th className="py-2 pr-4 font-medium text-center">Change</th><th className="py-2 font-medium text-right">Status</th></tr></thead><tbody>{[...(aso.rankings||[]).filter((r:any)=>r.app===sel)].sort((a:any,b:any)=>{if(a.found&&!b.found)return-1;if(!a.found&&b.found)return 1;if(a.found&&b.found)return(Number(a.position)||999)-(Number(b.position)||999);return 0}).map((r:any,i:number)=>(<><tr key={i} className={`border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer ${exp===r.keyword?"bg-blue-50 dark:bg-blue-950":""}`} onClick={()=>setExp(exp===r.keyword?null:r.keyword)}><td className="py-3 pr-4 font-medium">{r.keyword}</td><td className="py-3 pr-4 text-right whitespace-nowrap">{r.found?<span className="font-mono font-bold">#{r.position}</span>:<span className="text-gray-400">—</span>}{r.found&&<PBar p={r.position}/>}</td><td className="py-3 pr-4 text-center"><Chg c={r.position} p={r.prev_position}/></td><td className="py-3 text-right">{r.found?<span className="text-green-600 text-xs font-medium">Ranking</span>:<span className="text-red-400 text-xs">Not found</span>}</td></tr>{exp===r.keyword&&<tr><td colSpan={4} className="bg-gray-50 dark:bg-gray-950 px-4 py-2"><div className="flex items-center justify-between mb-1"><span className="text-xs font-medium text-muted-foreground">{r.keyword} — 7-day trend</span><button onClick={e=>{e.stopPropagation();setExp(null);}} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3"/></button></div><TP k={r.keyword} h={aso.history||[]}/></td></tr>}</>))}</tbody></table></div></CardContent></Card>
        </>)}

        {tab==="finance"&&(<>
          {/* Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800"><CardContent className="p-4"><ArrowUpRight className="w-4 h-4 text-green-600 mb-1"/><div className="text-xs text-muted-foreground">Total Income</div><div className="text-xl font-bold text-green-700 dark:text-green-400">{fmtR(inc)}</div></CardContent></Card>
            <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800"><CardContent className="p-4"><ArrowDownRight className="w-4 h-4 text-red-600 mb-1"/><div className="text-xs text-muted-foreground">Total Expenses</div><div className="text-xl font-bold text-red-700 dark:text-red-400">{fmtR(expn)}</div></CardContent></Card>
            <Card className={`bg-gradient-to-br ${net>=0?"from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800":"from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800"}`}><CardContent className="p-4"><Wallet className="w-4 h-4 text-blue-600 mb-1"/><div className="text-xs text-muted-foreground">Net Profit</div><div className={`text-xl font-bold ${net>=0?"text-blue-700 dark:text-blue-400":"text-orange-700 dark:text-orange-400"}`}>{fmtR(net)}</div></CardContent></Card>
            <Card><CardContent className="p-4"><Calendar className="w-4 h-4 text-gray-500 mb-1"/><div className="text-xs text-muted-foreground">Transactions</div><div className="text-xl font-bold">{tx}</div></CardContent></Card>
            <Card><CardContent className="p-4"><DollarSign className="w-4 h-4 text-gray-500 mb-1"/><div className="text-xs text-muted-foreground">2026 YTD</div><div className="text-xl font-bold text-green-600">{y2026 ? fmtR(y2026.net) : "—"}</div></CardContent></Card>
          </div>

          {/* Monthly chart — simple bars */}
          <Card><CardHeader><CardTitle>Monthly Income vs Expenses</CardTitle></CardHeader><CardContent>
            <div className="flex items-end gap-1 h-40 mt-2">{(monthly||[]).slice(-12).map((d:any,i:number)=>{
              const mx = Math.max(1, ...monthly.map((x:any)=>Math.max(Number(x.income)||0, Number(x.expenses)||0)));
              const ih = Math.max(0,((Number(d.income)||0)/mx)*140);
              const eh = Math.max(0,((Number(d.expenses)||0)/mx)*140);
              return <div key={i} className="flex-1 flex flex-col items-center gap-1"><div className="w-full flex flex-col gap-0.5" style={{height:"140px",justifyContent:"flex-end"}}>{ih>0&&<div className="w-full bg-green-500 rounded-t-sm" style={{height:Math.max(2,ih)}}/>}{eh>0&&<div className="w-full bg-red-400 rounded-t-sm" style={{height:Math.max(2,eh)}}/>}</div><span className="text-[9px] text-muted-foreground">{M[(Number(d.month_num)||1)-1]}</span></div>
            })}</div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground"><span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"/> Income</span><span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded-sm"/> Expenses</span></div>
          </CardContent></Card>

          {/* Yearly table */}
          <Card><CardHeader><CardTitle>Yearly Summary</CardTitle></CardHeader><CardContent>
            <table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="py-2 pr-4 font-medium">Year</th><th className="py-2 pr-4 font-medium text-right">Income</th><th className="py-2 pr-4 font-medium text-right">Expenses</th><th className="py-2 pr-4 font-medium text-right">Net</th></tr></thead><tbody>{(yearly||[]).map((y:any)=>(<tr key={y.year} className="border-b last:border-0"><td className="py-3 pr-4 font-medium">{y.year}</td><td className="py-3 pr-4 text-right">{fmtR(y.income)}</td><td className="py-3 pr-4 text-right">{fmtR(y.expenses)}</td><td className={`py-3 pr-4 text-right font-bold ${(Number(y.net)||0)>=0?"text-green-600":"text-red-600"}`}>{fmtR(y.net)}</td></tr>))}</tbody></table>
          </CardContent></Card>

          {/* Monthly table */}
          <Card><CardHeader><CardTitle>Monthly Breakdown</CardTitle></CardHeader><CardContent>
            <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left text-muted-foreground"><th className="py-2 pr-4 font-medium">Month</th><th className="py-2 pr-4 font-medium text-right">Income</th><th className="py-2 pr-4 font-medium text-right">Expenses</th><th className="py-2 pr-4 font-medium text-right">Net</th></tr></thead><tbody>{(monthly||[]).map((m:any)=>(<tr key={m.month} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900"><td className="py-2 pr-4 font-medium">{M[(Number(m.month_num)||1)-1]} {m.year}</td><td className="py-2 pr-4 text-right">{(Number(m.income)||0)>0?fmtR(m.income):"—"}</td><td className="py-2 pr-4 text-right">{(Number(m.expenses)||0)>0?fmtR(m.expenses):"—"}</td><td className={`py-2 pr-4 text-right font-semibold ${(Number(m.net)||0)>=0?"text-green-600":"text-red-600"}`}>{fmtR(m.net)}</td></tr>))}</tbody></table></div>
          </CardContent></Card>
        </>)}
      </div>
    </div>
  );
}