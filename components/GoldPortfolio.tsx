"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, TrendingUp, TrendingDown, RefreshCw, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { GoldStorage, type GoldEntry } from "@/lib/goldStorage";
import { ToastProvider, useToast } from "@/components/ui/toast";

interface PortfolioStats {
  totalGrams: number;
  totalInvestment: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}

const goldEntrySchema = z.object({
  date: z.string().min(1, "Date is required"),
  pricePerGram: z.number().positive("Price must be positive"),
  extraChargesPerGram: z.number().min(0, "Extra charges cannot be negative"),
  totalGrams: z.number().positive("Weight must be positive"),
  notes: z.string().optional(),
});

type GoldEntryForm = z.infer<typeof goldEntrySchema>;

function GoldTrackingPageContent({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [entries, setEntries] = useState<GoldEntry[]>([]);
  const [currentGoldPrice, setCurrentGoldPrice] = useState(6500);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<GoldEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshingPrice, setIsRefreshingPrice] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<GoldEntryForm>({
    resolver: zodResolver(goldEntrySchema),
  });

  const portfolioStats: PortfolioStats = {
    totalGrams: entries.reduce((sum, entry) => sum + entry.totalGrams, 0),
    totalInvestment: entries.reduce((sum, entry) => sum + entry.totalInvestment, 0),
    currentValue: entries.reduce((sum, entry) => sum + (entry.totalGrams * currentGoldPrice), 0),
    profitLoss: 0,
    profitLossPercentage: 0,
  };

  portfolioStats.profitLoss = portfolioStats.currentValue - portfolioStats.totalInvestment;
  portfolioStats.profitLossPercentage = portfolioStats.totalInvestment > 0
    ? (portfolioStats.profitLoss / portfolioStats.totalInvestment) * 100
    : 0;

  useEffect(() => {
    void loadData();
  }, []);

  const handleUnauthorized = () => onUnauthorized();

  const loadData = async () => {
    try {
      const data = await GoldStorage.getData();

      if (data === null) {
        // Session expired between the check and the load.
        handleUnauthorized();
        return;
      }

      setEntries(data.entries);
      setCurrentGoldPrice(data.currentGoldPrice || 6500);
      setLastUpdated(data.lastUpdated || new Date().toISOString());
    } catch (error) {
      console.error("Error loading data:", error);
      addToast({
        title: "Failed to Load Portfolio",
        description: "Could not load your gold data. Please try again.",
        variant: "destructive",
      });
      setCurrentGoldPrice(6500);
      setLastUpdated(new Date().toISOString());
    } finally {
      setIsLoading(false);
    }
  };

  const refreshGoldPrice = async () => {
    setIsRefreshingPrice(true);
    try {
      const response = await fetch('/api/gold-price');
      const data = await response.json();

      if (data.success) {
        const result = await GoldStorage.updatePrice(data.price, true);
        setCurrentGoldPrice(result.currentGoldPrice);
        setLastUpdated(result.lastUpdated);
        addToast({
          title: "Price Updated Successfully!",
          description: `22K Gold price updated to ₹${data.price.toLocaleString('en-IN')} per gram`,
          variant: "success"
        });
      } else {
        throw new Error(data.error || 'Failed to fetch price');
      }
    } catch (error) {
      if (error instanceof Error && error.message === "UNAUTHORIZED") {
        handleUnauthorized();
        return;
      }
      console.error('Error refreshing price:', error);
      addToast({
        title: "Failed to Update Price",
        description: "Could not fetch the latest gold price. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshingPrice(false);
    }
  };

  const onSubmit = async (data: GoldEntryForm) => {
    const input = {
      date: data.date,
      pricePerGram: data.pricePerGram,
      extraChargesPerGram: data.extraChargesPerGram,
      totalGrams: data.totalGrams,
      notes: data.notes || "",
    };

    try {
      if (editingEntry) {
        const updated = await GoldStorage.updateEntry(editingEntry.id, input);
        setEntries((prev) =>
          prev.map((entry) => (entry.id === updated.id ? updated : entry))
        );
      } else {
        const created = await GoldStorage.createEntry(input);
        setEntries((prev) => [...prev, created]);
      }

      reset();
      setEditingEntry(null);
      setIsDialogOpen(false);
    } catch (error) {
      if (error instanceof Error && error.message === "UNAUTHORIZED") {
        handleUnauthorized();
        return;
      }
      console.error("Error saving entry:", error);
      addToast({
        title: "Failed to Save Entry",
        description: "Could not save your entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (entry: GoldEntry) => {
    setEditingEntry(entry);
    setValue("date", entry.date);
    setValue("pricePerGram", entry.pricePerGram);
    setValue("extraChargesPerGram", entry.extraChargesPerGram);
    setValue("totalGrams", entry.totalGrams);
    setValue("notes", entry.notes);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const previous = entries;
    // Optimistic update.
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    try {
      await GoldStorage.deleteEntry(id);
    } catch (error) {
      // Roll back on failure.
      setEntries(previous);
      if (error instanceof Error && error.message === "UNAUTHORIZED") {
        handleUnauthorized();
        return;
      }
      console.error("Error deleting entry:", error);
      addToast({
        title: "Failed to Delete Entry",
        description: "Could not delete the entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePriceUpdate = async (newPrice: number) => {
    try {
      const result = await GoldStorage.updatePrice(newPrice);
      setCurrentGoldPrice(result.currentGoldPrice);
      setLastUpdated(result.lastUpdated);
      addToast({
        title: "Price Updated Manually",
        description: `Gold price set to ₹${newPrice.toLocaleString('en-IN')} per gram`,
        variant: "success"
      });
    } catch (error) {
      if (error instanceof Error && error.message === "UNAUTHORIZED") {
        handleUnauthorized();
        return;
      }
      console.error("Error updating price:", error);
      addToast({
        title: "Failed to Update Price",
        description: "Could not update the price. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="gold-page flex min-h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="gold-page pb-8">
      <div className="max-w-[88rem] mx-auto space-y-6">


        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2">Private workspace</p>
              <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-[-0.045em]">Gold Portfolio</h1>
            </div>
          </div>

          {/* Current Gold Price & P/L Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Portfolio P/L Card */}
            <Card className={`bg-gradient-to-r ${
              portfolioStats.profitLoss >= 0
                ? 'from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800'
                : 'from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    portfolioStats.profitLoss >= 0
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'bg-red-100 dark:bg-red-900'
                  }`}>
                    {portfolioStats.profitLoss >= 0 ? (
                      <TrendingUp className={`w-6 h-6 ${
                        portfolioStats.profitLoss >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`} />
                    ) : (
                      <TrendingDown className={`w-6 h-6 ${
                        portfolioStats.profitLoss >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Portfolio P&L
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-3xl font-bold ${
                        portfolioStats.profitLoss >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {portfolioStats.profitLoss >= 0 ? '+' : '-'}{formatCurrency(Math.abs(portfolioStats.profitLoss))}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={`text-sm font-medium ${
                        portfolioStats.profitLoss >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {portfolioStats.profitLoss >= 0 ? '+' : '-'}{Math.abs(portfolioStats.profitLossPercentage).toFixed(2)}%
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {portfolioStats.totalGrams.toFixed(3)}g portfolio
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-current/10">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Investment</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(portfolioStats.totalInvestment)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Current Value</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(portfolioStats.currentValue)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Gold Price Card */}
            <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                      <Coins className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Current 22K Gold Price
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(currentGoldPrice)}/g
                        </span>
                      </div>
                      {lastUpdated && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Last updated: {format(new Date(lastUpdated), 'PPp')} IST
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 border-t border-current/10 pt-8">
                    <Button
                      onClick={refreshGoldPrice}
                      disabled={isRefreshingPrice}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white flex-1 h-10 sm:h-8"
                    >
                      {isRefreshingPrice ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Get Latest Price
                        </>
                      )}
                    </Button>

                    <Dialog open={priceDialogOpen} onOpenChange={setPriceDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-950 flex-1 h-10 sm:h-8">
                          Add Price Manually
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Current Gold Price</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="currentPrice">Price per gram (INR)</Label>
                            <Input
                              id="currentPrice"
                              type="number"
                              step="0.01"
                              value={currentGoldPrice}
                              onChange={(e) => setCurrentGoldPrice(parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          <Button onClick={() => {
                            handlePriceUpdate(currentGoldPrice);
                            setPriceDialogOpen(false);
                          }} className="w-full">
                            Update Price
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>


        </div>



        {/* Coin Tracking */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Owned Coins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.floor(portfolioStats.totalGrams / 8)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.floor(portfolioStats.totalGrams / 8) * 8} grams
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Target Coins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100</div>
              <div className="text-xs text-muted-foreground">800g</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Coins To Go</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {Math.max(0, 100 - Math.floor(portfolioStats.totalGrams / 8))}
              </div>
              <div className="text-xs text-muted-foreground">
                {Math.max(0, (100 * 8) - portfolioStats.totalGrams).toFixed(3)}g needed
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Amount Needed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(Math.max(0, (100 - Math.floor(portfolioStats.totalGrams / 8)) * 8 * currentGoldPrice))}
              </div>
              <div className="text-xs text-muted-foreground">
                At current price: {formatCurrency(currentGoldPrice)}/g
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entries Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Investments</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Entry
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingEntry ? "Edit" : "Add"} Gold Entry</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        {...register("date")}
                      />
                      {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="pricePerGram">Base price per gram (INR)</Label>
                      <Input
                        id="pricePerGram"
                        type="number"
                        step="0.01"
                        {...register("pricePerGram", { valueAsNumber: true })}
                      />
                      {errors.pricePerGram && <p className="text-sm text-destructive">{errors.pricePerGram.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="extraChargesPerGram">Extra charges per gram (INR)</Label>
                      <Input
                        id="extraChargesPerGram"
                        type="number"
                        step="0.01"
                        placeholder="0"
                        {...register("extraChargesPerGram", { valueAsNumber: true })}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Making charges, GST, or other additional costs per gram
                      </p>
                      {errors.extraChargesPerGram && <p className="text-sm text-destructive">{errors.extraChargesPerGram.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="totalGrams">Total grams</Label>
                      <Input
                        id="totalGrams"
                        type="number"
                        step="0.001"
                        {...register("totalGrams", { valueAsNumber: true })}
                      />
                      {errors.totalGrams && <p className="text-sm text-destructive">{errors.totalGrams.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="notes">Notes (optional)</Label>
                      <Input
                        id="notes"
                        {...register("notes")}
                        placeholder="e.g., 22k gold coins, jewelry, etc."
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingEntry ? "Update" : "Add"} Entry
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          reset();
                          setEditingEntry(null);
                          setIsDialogOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No gold entries yet. Add your first investment to get started!
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Gold Price</th>
                        <th className="text-left p-2">Extra (Per Gram)</th>
                        <th className="text-left p-2">Extra (Per Poun)</th>
                        <th className="text-left p-2">Total Extra</th>
                        <th className="text-left p-2">Purchase Price</th>
                        <th className="text-left p-2">Current Price</th>
                        <th className="text-left p-2">Weight (g)</th>
                        <th className="text-left p-2">Investment</th>
                        <th className="text-left p-2">Current Value</th>
                        <th className="text-left p-2">P&L</th>
                        <th className="text-left p-2">Notes</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((entry) => {
                          const currentValue = entry.totalGrams * currentGoldPrice;
                          const pnl = currentValue - entry.totalInvestment;
                          const pnlPercentage = (pnl / entry.totalInvestment) * 100;

                          return (
                            <tr key={entry.id} className="border-b hover:bg-muted/50">
                              <td className="p-2">{format(new Date(entry.date), "MMM dd, yyyy")}</td>
                              <td className="p-2">{formatCurrency(entry.pricePerGram)}</td>
                              <td className="p-2">
                                {entry.extraChargesPerGram > 0 ? formatCurrency(entry.extraChargesPerGram) : '-'}
                              </td>
                              <td className="p-2">
                                {entry.extraChargesPerGram > 0 ? formatCurrency(entry.extraChargesPerGram * 8) : '-'}
                              </td>
                              <td className="p-2">
                                {entry.extraChargesPerGram > 0 ? formatCurrency(entry.extraChargesPerGram * entry.totalGrams) : '-'}
                              </td>
                              <td className="p-2 font-medium">{formatCurrency(entry.effectivePricePerGram)}</td>
                              <td className="p-2 font-medium text-blue-600">{formatCurrency(currentGoldPrice)}</td>
                              <td className="p-2">{entry.totalGrams.toFixed(3)}</td>
                              <td className="p-2">{formatCurrency(entry.totalInvestment)}</td>
                              <td className="p-2">{formatCurrency(currentValue)}</td>
                              <td className={`p-2 ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(Math.abs(pnl))}
                                <span className="text-xs block">
                                  ({pnl >= 0 ? '+' : '-'}{Math.abs(pnlPercentage).toFixed(1)}%)
                                </span>
                              </td>
                              <td className="p-2 text-sm text-muted-foreground max-w-32 truncate">
                                {entry.notes || '-'}
                              </td>
                              <td className="p-2">
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleEdit(entry)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDelete(entry.id)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                  {entries
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((entry) => {
                      const currentValue = entry.totalGrams * currentGoldPrice;
                      const pnl = currentValue - entry.totalInvestment;
                      const pnlPercentage = (pnl / entry.totalInvestment) * 100;

                      return (
                        <Card key={entry.id} className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-medium">{format(new Date(entry.date), "MMM dd, yyyy")}</div>
                              <div className="text-sm text-muted-foreground">{entry.totalGrams.toFixed(3)}g</div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEdit(entry)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(entry.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <div className="text-muted-foreground">Base Price</div>
                              <div className="font-medium">{formatCurrency(entry.pricePerGram)}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Extra/g</div>
                              <div className="font-medium">
                                {entry.extraChargesPerGram > 0 ? formatCurrency(entry.extraChargesPerGram) : '-'}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Extra/Poun</div>
                              <div className="font-medium">
                                {entry.extraChargesPerGram > 0 ? formatCurrency(entry.extraChargesPerGram * 8) : '-'}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Total Extra</div>
                              <div className="font-medium">
                                {entry.extraChargesPerGram > 0 ? formatCurrency(entry.extraChargesPerGram * entry.totalGrams) : '-'}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Total Price</div>
                              <div className="font-medium">{formatCurrency(entry.effectivePricePerGram)}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Current Price</div>
                              <div className="font-medium text-blue-600">{formatCurrency(currentGoldPrice)}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Investment</div>
                              <div className="font-medium">{formatCurrency(entry.totalInvestment)}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Current Value</div>
                              <div className="font-medium">{formatCurrency(currentValue)}</div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-muted-foreground text-sm">P&L</div>
                                <div className={`font-bold ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {pnl >= 0 ? '+' : '-'}{formatCurrency(Math.abs(pnl))} ({pnl >= 0 ? '+' : '-'}{Math.abs(pnlPercentage).toFixed(1)}%)
                                </div>
                              </div>
                              {entry.notes && (
                                <div className="text-right">
                                  <div className="text-muted-foreground text-sm">Notes</div>
                                  <div className="text-sm max-w-32 truncate">{entry.notes}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function GoldPortfolio({ onUnauthorized }: { onUnauthorized: () => void }) {
  return (
    <ToastProvider>
      <GoldTrackingPageContent onUnauthorized={onUnauthorized} />
    </ToastProvider>
  );
}
