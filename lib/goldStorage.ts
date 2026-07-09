// Client-side API wrapper for the gold portfolio.
//
// All persistence now happens server-side in Postgres, behind session-gated
// API routes (see app/api/gold-data/*). The browser never sees database
// credentials or any secret - it only calls our own authenticated endpoints,
// with the session cookie sent automatically.

export interface GoldEntry {
  id: string;
  date: string;
  pricePerGram: number;
  extraChargesPerGram: number;
  effectivePricePerGram: number;
  totalGrams: number;
  totalInvestment: number;
  notes?: string;
}

export interface PriceHistoryEntry {
  date: string; // YYYY-MM-DD format
  price: number;
  timestamp: string; // ISO string
}

export interface GoldData {
  entries: GoldEntry[];
  currentGoldPrice: number;
  lastUpdated: string;
  priceHistory?: PriceHistoryEntry[];
}

export interface EntryInput {
  date: string;
  pricePerGram: number;
  extraChargesPerGram: number;
  totalGrams: number;
  notes?: string;
}

async function handle<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export class GoldStorage {
  /** Load the full portfolio. Returns null if the session is invalid. */
  static async getData(): Promise<GoldData | null> {
    const res = await fetch("/api/gold-data", { cache: "no-store" });
    if (res.status === 401) return null;
    return handle<GoldData>(res);
  }

  static async createEntry(input: EntryInput): Promise<GoldEntry> {
    const res = await fetch("/api/gold-data/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return handle<GoldEntry>(res);
  }

  static async updateEntry(id: string, input: EntryInput): Promise<GoldEntry> {
    const res = await fetch(`/api/gold-data/entries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return handle<GoldEntry>(res);
  }

  static async deleteEntry(id: string): Promise<void> {
    const res = await fetch(`/api/gold-data/entries/${id}`, {
      method: "DELETE",
    });
    await handle<{ success: boolean }>(res);
  }

  static async updatePrice(
    price: number,
    recordHistory = false
  ): Promise<{ currentGoldPrice: number; lastUpdated: string }> {
    const res = await fetch("/api/gold-data/price", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price, recordHistory }),
    });
    return handle<{ currentGoldPrice: number; lastUpdated: string }>(res);
  }
}
