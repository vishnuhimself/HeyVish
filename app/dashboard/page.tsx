"use client";

import { useState, useEffect } from "react";
import { Lock, TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DASHBOARD_COOKIE = "dashboard_session";

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

// --- Password Gate (inline, same design as gold page) ---
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
      if (res.ok) {
        onSuccess();
      } else {
        setError("Incorrect password");
        setPassword("");
      }
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
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isLoading}
            />
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

// --- Ranking Change Indicator ---
function ChangeIndicator({ current, prev }: { current: number | null; prev: number | null }) {
  if (!current || !prev || current === prev) return <Minus className="w-3 h-3 text-gray-400" />;
  if (current < prev) return <TrendingUp className="w-3 h-3 text-green-500" />;
  return <TrendingDown className="w-3 h-3 text-red-500" />;
}

function ChangeBadge({ current, prev }: { current: number | null; prev: number | null }) {
  if (!current || !prev) return <span className="text-xs text-gray-400">—</span>;
  const delta = prev - current;
  if (delta > 0) return <span className="text-xs text-green-600 font-medium">↑{delta}</span>;
  if (delta < 0) return <span className="text-xs text-red-600 font-medium">↓{Math.abs(delta)}</span>;
  return <span className="text-xs text-gray-400">—</span>;
}

// --- Main Dashboard ---
export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState<string>("GrowthKit");

  useEffect(() => {
    if (!isAuthenticated) return;
    loadData();
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/aso?days=30");
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
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
        <PasswordGate onSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-red-500">{error || "No data available"}</p>
      </div>
    );
  }

  const apps = [...new Set(data.rankings.map((r) => r.app))];
  const appSummary = data.summary || [];
  const filteredRankings = data.rankings.filter((r) => r.app === selectedApp);

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            Mission Control
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {data.rankings[0]?.date || "—"}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {appSummary.map((s) => (
            <Card
              key={s.app}
              className={`cursor-pointer transition-all ${
                selectedApp === s.app
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedApp(s.app)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{s.app}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {s.ranking_keywords}/{s.total_keywords}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  keywords ranking
                </div>
                {/* Mini progress bar */}
                <div className="mt-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full transition-all"
                    style={{
                      width: `${(s.ranking_keywords / s.total_keywords) * 100}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rankings Table */}
        <Card>
          <CardHeader>
            <CardTitle>{selectedApp} — Keyword Rankings</CardTitle>
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
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="py-3 pr-4 font-medium">{r.keyword}</td>
                      <td className="py-3 pr-4 text-right">
                        {r.found ? (
                          <span className="font-mono font-bold">#{r.position}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
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