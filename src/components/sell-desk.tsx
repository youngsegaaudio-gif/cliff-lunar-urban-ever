import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PageKicker, SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/license";
import { cn } from "@/lib/utils";
import { useCommerce } from "@/store/commerce";

export function SellDesk() {
  const shop = useCommerce();
  const money = formatMoney(shop.price, shop.currency);
  const [note, setNote] = useState("");
  const listing = useMemo(() => listingCopy(shop.price, shop.currency, shop.paymentUrl), [shop.price, shop.currency, shop.paymentUrl]);

  const mint = (n: number) => {
    const batch = shop.mint(n, note);
    toast.success(`Minted ${batch.length} key${batch.length === 1 ? "" : "s"}`);
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error("Could not copy");
    }
  };

  const downloadKeys = () => {
    const rows = ["key,created,note,sent", ...shop.issued.map((k) => [k.key, k.createdAt, csv(k.note), k.sent ? "yes" : "no"].join(","))];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "phraseform-keys.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SiteShell active="sell" width="wide">
        <PageKicker>Vendor</PageKicker>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-wide">Sell Phraseform</h1>
        <p className="mt-2 max-w-2xl text-sm text-pretty text-muted">
            This is your desk. Paste a checkout link, mint license keys, send a key after someone
            pays. Buyers unlock Pro on their device. No accounts.
        </p>

        <div className="mt-8 flex flex-col gap-4">

        <section className="grid gap-3 rounded-xl bg-surface p-4 ring-1 ring-border md:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Price</span>
            <Input
              type="number"
              min={1}
              step={1}
              value={shop.price}
              onChange={(e) => shop.setShop({ price: Number(e.target.value) || 0 })}
            />
          </label>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Currency</span>
            <div className="flex flex-wrap gap-1">
              {["AUD", "USD", "EUR", "GBP"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => shop.setShop({ currency: c })}
                  className={cn(
                    "h-11 rounded-md px-3 font-mono text-sm ring-1",
                    shop.currency === c
                      ? "bg-accent text-accent-fg ring-accent"
                      : "text-muted ring-border hover:text-fg",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <label className="flex flex-col gap-1.5 md:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Checkout link
            </span>
            <Input
              type="url"
              placeholder="https://paypal.me/you/29 or your Gumroad / Stripe payment link"
              value={shop.paymentUrl}
              onChange={(e) => shop.setShop({ paymentUrl: e.target.value.trim() })}
            />
            <span className="text-xs text-pretty text-muted">
              Buyers hit this when they click Pay. Use PayPal.me, Gumroad, Stripe Payment Link, or
              whatever you already collect money with.
            </span>
          </label>
          <label className="flex flex-col gap-1.5 md:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Note on the pay dialog
            </span>
            <Input
              placeholder="Pay, then message me on IG / Discord for the key."
              value={shop.supportNote}
              onChange={(e) => shop.setShop({ supportNote: e.target.value })}
            />
          </label>
        </section>

        <section className="rounded-xl bg-surface p-4 ring-1 ring-border">
          <h2 className="font-display text-2xl uppercase tracking-wide">Fulfill an order</h2>
          <p className="mt-1 text-sm text-pretty text-muted">
            Payment lands → mint a key → send it → mark sent. {money} per license.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Input
              placeholder="Buyer name or order note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button onClick={() => mint(1)}>Mint 1 key</Button>
            <Button variant="secondary" onClick={() => mint(5)}>
              Mint 5
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={downloadKeys} disabled={!shop.issued.length}>
              Download CSV
            </Button>
            <p className="self-center font-mono text-[11px] text-muted tabular-nums">
              {shop.issued.length} minted · {shop.issued.filter((k) => k.sent).length} sent
            </p>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {shop.issued.length === 0 ? (
              <li className="py-6 text-sm text-muted">No keys yet.</li>
            ) : (
              shop.issued.slice(0, 30).map((k) => (
                <li key={k.key} className="flex flex-wrap items-center gap-2 py-2">
                  <code className="font-mono text-xs text-fg">{k.key}</code>
                  {k.note ? <span className="text-xs text-muted">{k.note}</span> : null}
                  <span className="ml-auto flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => copy(k.key, "key")}>
                      Copy
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (shop.unlock(k.key, k.note)) toast.success("This device is now Pro");
                      }}
                    >
                      Use here
                    </Button>
                    <Button
                      variant={k.sent ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => shop.markSent(k.key)}
                    >
                      {k.sent ? "Sent" : "Mark sent"}
                    </Button>
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-xl bg-surface p-4 ring-1 ring-border">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-2xl uppercase tracking-wide">Listing copy</h2>
            <Button variant="secondary" size="sm" onClick={() => copy(listing, "listing")}>
              Copy listing
            </Button>
          </div>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg bg-surface-2 p-3 font-mono text-xs text-muted">
            {listing}
          </pre>
        </section>
        </div>
    </SiteShell>
  );
}

function csv(s: string) {
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function listingCopy(price: number, currency: string, paymentUrl: string): string {
  const money = formatMoney(price, currency);
  return `PHRASEFORM Studio — one-time license (${money})

Hardstyle arrangement generator. Seven genre kits (early, nu-style, euphoric, rawstyle, rawphoric, xtra raw, uptempo). Builds a phrase map in 8 / 16 / 32-bar DJ blocks with what to put on kick, reverse bass, leads, vocals, and FX.

Free: full studio, watermarked sheet.
Pro: clean export, JSON project, saved library.

After payment you get a PF- license key. Paste it in Phraseform → Unlock.

${paymentUrl ? `Pay here: ${paymentUrl}` : "Add your PayPal / Gumroad / Stripe link in Phraseform → Sell."}`;
}
