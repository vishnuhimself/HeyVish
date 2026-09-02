"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface PasswordGateProps {
  onSuccess: (expiresAt?: number) => void;
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        setPassword("");
        onSuccess(data.expiresAt);
        return;
      }

      if (res.status === 429) {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Incorrect password. Please try again.");
      }
      setPassword("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 min-h-screen">
      <Card className="w-full max-w-md rounded-3xl border-border/80 shadow-[0_28px_90px_rgba(0,0,0,0.08)]">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-amber-50 dark:bg-amber-950 rounded-2xl border border-amber-200/70 dark:border-amber-800 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Private workspace</p>
          <CardTitle className="font-display text-3xl font-medium tracking-[-0.035em]">Gold Portfolio</CardTitle>
          <p className="text-sm text-muted-foreground">Enter your passcode to open the ledger.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={isLoading}
              />
              {error && (
                <p className="text-sm text-destructive mt-1">{error}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!password || isLoading}
            >
              {isLoading ? "Verifying..." : "Access Portfolio"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 
