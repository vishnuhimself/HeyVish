"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import styles from "./FinanceTransactionForm.module.css";

type TransactionType = "Income" | "Expense";

function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export default function FinanceTransactionForm({
  categories,
  onClose,
  onSaved,
  onUnauthorized,
}: {
  categories: { type: TransactionType; category: string }[];
  onClose: () => void;
  onSaved: (date: string) => void;
  onUnauthorized: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [type, setType] = useState<TransactionType>("Expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(localDate);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [merchant, setMerchant] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => { if (element?.open) element.close(); };
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/dashboard/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, amount, date, name, category, merchant, notes }),
      });
      if (response.status === 401) { onUnauthorized(); return; }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save the transaction.");
      onSaved(date);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save the transaction.");
    } finally {
      setSaving(false);
    }
  }

  const suggestions = [...new Set(categories.filter((item) => item.type === type).map((item) => item.category))];

  return <dialog ref={dialog} className={styles.dialog} onClose={onClose} onClick={(event) => {
    if (event.target === event.currentTarget) dialog.current?.close();
  }}>
    <form onSubmit={submit} className={styles.form}>
      <header className={styles.header}>
        <div><span>FINANCE</span><h2>Add transaction</h2></div>
        <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close"><X /></button>
      </header>
      <div className={styles.body}>
        <fieldset className={styles.typePicker} disabled={saving}>
          <legend className={styles.srOnly}>Transaction type</legend>
          {(["Expense", "Income"] as const).map((option) => <label key={option} className={type === option ? styles.selected : ""}>
            <input type="radio" name="type" value={option} checked={type === option} onChange={() => { setType(option); setCategory(""); }} />{option}
          </label>)}
        </fieldset>
        <div className={styles.fields}>
          <label className={styles.field}><span>Amount (₹)</span><input autoFocus required inputMode="decimal" type="text" pattern="[0-9]+([.][0-9]{1,2})?" placeholder="0.00" value={amount} onChange={(event) => setAmount(event.target.value)} disabled={saving} /></label>
          <label className={styles.field}><span>Date</span><input required type="date" value={date} onChange={(event) => setDate(event.target.value)} disabled={saving} /></label>
          <label className={styles.field}><span>{type === "Expense" ? "What was it for?" : "Where did it come from?"}</span><input required maxLength={200} placeholder={type === "Expense" ? "e.g. Server hosting" : "e.g. App Store payout"} value={name} onChange={(event) => setName(event.target.value)} disabled={saving} /></label>
          <label className={styles.field}><span>Category</span><input required maxLength={100} list="finance-category-suggestions" placeholder={type === "Expense" ? "e.g. Hosting" : "e.g. App Store"} value={category} onChange={(event) => setCategory(event.target.value)} disabled={saving} /><datalist id="finance-category-suggestions">{suggestions.map((item) => <option key={item} value={item} />)}</datalist></label>
          <label className={styles.field}><span>Merchant or source <small>Optional</small></span><input maxLength={200} placeholder={type === "Expense" ? "e.g. Hetzner" : "e.g. Apple"} value={merchant} onChange={(event) => setMerchant(event.target.value)} disabled={saving} /></label>
          <label className={styles.field}><span>Notes <small>Optional</small></span><textarea maxLength={2000} rows={3} placeholder="Anything else to remember" value={notes} onChange={(event) => setNotes(event.target.value)} disabled={saving} /></label>
        </div>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </div>
      <footer className={styles.footer}><button type="button" className={styles.cancel} onClick={() => dialog.current?.close()} disabled={saving}>Cancel</button><button type="submit" className={styles.save} disabled={saving}>{saving ? <><Loader2 className={styles.spin} /> Saving…</> : `Add ${type.toLowerCase()}`}</button></footer>
    </form>
  </dialog>;
}
