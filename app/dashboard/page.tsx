"use client";

import { useState, useEffect } from "react";
import { Lock, TrendingUp, TrendingDown, Minus, BarChart3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Ranking {
  app: string;
  keyword: string;
  position: number | null;
  found: boolean;
  date: string;
  prev_position: number | null;
  prev_found: boolean | null;
}

interface HistoryPoint {
  app: string;
  keyword: string;
  date: string;
  position: number;
}

interface AppSummary {
  app: string;
  total_keywords: number;
  ranking_keywords: number;
}

interface DashboardData {
  rankings: Ranking[];
  history: HistoryPoint[];
  summary: AppSummary[];
}

function formatIST(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// --- Inline Password Gate ---
function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 300));
    try {
      const res = await fetch("/api/auth/dashboard-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) onSuccess();
      else { setError("Incorrect password"); setPassword(""); }
    } catch {
      setError("Login failed. Try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center p-6 min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">Mission Control</CardTitle>
          <p className="text-muted-foreground">Enter password to access your dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" disabled={isLoading} />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={!password || isLoading}>
              {isLoading ? "Verifying..." : "Access Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Change indicator ---
function ChangeBadge({ current, prev }: { current: number | null; prev: number | null }) {
  if (!current || !prev) return <span className="text-xs text-gray-400">—</span>;
  const delta = prev - current;
  if (delta > 0) return <span className="text-xs text-green-600 font-medium">↑{delta}</span>;
  if (delta < 0) return <span className="text-xs text-red-600 font-medium">↓{Math.abs(delta)}</span>;
  return <span className="text-xs text-gray-400">—</span>;
}

// --- Position sparkline bar ---
function PositionBar({ position, maxPos = 40 }: { position: number | null; maxPos?: number }) {
  if (!position) return null;
  const pct = Math.min(100, Math.max(0, (position / maxPos) * 100));
  const color = position <= 10 ? "bg-green-500" : position <= 20 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="w-16 bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 inline-block ml-2">
      <div className={`${color} h-1.5 rounded-full`} style={{ width: `${100 - pct}%` }} />
    </div>
  );
}

// --- Trend history mini chart per keyword ---
function TrendPanel({ keyword, history }: { keyword: string; history: HistoryPoint[] }) {
  const points = history
    .filter((h) => h.keyword === keyword)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (points.length < 2) return <p className="text-xs text-muted-foreground py-2">Not enough data yet. Check back in a few days.</p>;

  const maxPos = 50;
  const minDate = points[0].date;
  const maxDate = points[points.length - 1].date;
  const dateRange = new Date(maxDate).getTime() - new Date(minDate).getTime() || 1;

  return (
    <div className="py-3">
      <div className="flex items-end gap-0.5 h-16 mb-1">
        {points.map((p, i) => {
          const height = Math.max(4, ((maxPos - (p.position || maxPos)) / maxPos) * 100);
          const color = (p.position || 99) <= 10 ? "bg-green-500" : (p.position || 99) <= 20 ? "bg-yellow-500" : "bg-red-500";
          return (
            <div
              key={i}
              className={`${color} rounded-t-sm w-2 transition-all hover:opacity-80`}
              style={{ height: `${height}%` }}
              title={`${p.date}: #${p.position}`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{formatIST(minDate).split(",")[0]}</span>
        <span>#{points[0].position} → #{points[points.length - 1].position}</span>
        <span>{formatIST(maxDate).split(",")[0]}</span>
      </div>
    </div>
  );
}

// --- Main Dashboard ---
export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState<string>("GrowthKit");
  const [expandedKeyword, setExpandedKeyword] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    loadData();
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/aso?days=30");
      if (res.status === 401) { setIsAuthenticated(false); return; }
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to load dashboard data");
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <style>{`header, footer, nav[aria-label], .banner { display: none !important; }`}</style>
        <PasswordGate onSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <style>{`header, footer, nav[aria-label], .banner { display: none !important; }`}</style>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <style>{`header, footer, nav[aria-label] { display: none !important; }`}</style>
        <p className="text-red-500">{error || "No data available"}</p>
      </div>
    );
  }

  const appSummary = data.summary || [];

  // Sort: ranking keywords first (by position asc), then not found
  const filteredRankings = [...(data.rankings.filter((r) => r.app === selectedApp))]
    .sort((a, b) => {
      if (a.found && !b.found) return -1;
      if (!a.found && b.found) return 1;
      if (a.found && b.found) return (a.position || 999) - (b.position || 999);
      return 0;
    });

  const lastDate = data.rankings[0]?.date || "";

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 font-sans">
      {/* Hide site header/footer */}
      <style>{`header, footer, nav[aria-label], .banner, [role="banner"] { display: none !important; }`}</style>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              Mission Control
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: {formatIST(lastDate)} IST
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {appSummary.map((s) => (
            <Card
              key={s.app}
              className={`cursor-pointer transition-all ${selectedApp === s.app ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"}`}
              onClick={() => { setSelectedApp(s.app); setExpandedKeyword(null); }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{s.app}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.ranking_keywords}/{s.total_keywords}</div>
                <div className="text-xs text-muted-foreground mt-1">keywords ranking</div>
                <div className="mt-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${(s.ranking_keywords / s.total_keywords) * 100}%` }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rankings Table */}
        <Card>
          <CardHeader>
            <CardTitle>App Store Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="py-2 pr-4 font-medium">Keyword</th>
                    <th className="py-2 pr-4 font-medium text-right">Position</th>
                    <th className="py-2 pr-4 font-medium text-center">Change</th>
                    <th className="py-2 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRankings.map((r, i) => (
                    <>
                      <tr
                        key={i}
                        className={`border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer ${expandedKeyword === r.keyword ? "bg-blue-50 dark:bg-blue-950" : ""}`}
                        onClick={() => setExpandedKeyword(expandedKeyword === r.keyword ? null : r.keyword)}
                      >
                        <td className="py-3 pr-4 font-medium">{r.keyword}</td>
                        <td className="py-3 pr-4 text-right whitespace-nowrap">
                          {r.found ? (
                            <span className="font-mono font-bold">#{r.position}</span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                          {r.found && <PositionBar position={r.position} />}
                        </td>
                        <td className="py-3 pr-4 text-center">
                          <ChangeBadge current={r.position} prev={r.prev_position} />
                        </td>
                        <td className="py-3 text-right">
                          {r.found ? (
                            <span className="text-green-600 text-xs font-medium">Ranking</span>
                          ) : (
                            <span className="text-red-400 text-xs">Not found</span>
                          )}
                        </td>
                      </tr>
                      {/* Trend panel */}
                      {expandedKeyword === r.keyword && (
                        <tr key={`${i}-trend`}>
                          <td colSpan={4} className="bg-gray-50 dark:bg-gray-950 px-4 py-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-muted-foreground">
                                {r.keyword} — 7-day trend
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); setExpandedKeyword(null); }}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <TrendPanel keyword={r.keyword} history={data.history} />
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}