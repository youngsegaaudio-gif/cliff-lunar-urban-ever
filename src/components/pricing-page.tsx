import { Link } from "@tanstack/react-router";
import { PageKicker, SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { formatMoney, LICENSE_TERMS } from "@/lib/license";
import { useCommerce } from "@/store/commerce";

export function PricingPage() {
  const price = useCommerce((s) => s.price);
  const currency = useCommerce((s) => s.currency);
  const pro = useCommerce((s) => Boolean(s.licenseKey));
  const setUnlockOpen = useCommerce((s) => s.setUnlockOpen);
  const money = formatMoney(price, currency);

  return (
    <SiteShell active="pricing" width="wide">
      <PageKicker>License</PageKicker>
      <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide">
        Free studio. Pro sheet.
      </h1>
      <p className="mt-4 max-w-xl text-base text-pretty text-muted">
        Use the arranger without paying. Buy once if you want clean exports, JSON backups, and a
        saved library.
      </p>

      <div className="mt-10 grid gap-3 md:grid-cols-2">
        <article className="rounded-xl bg-surface p-6 ring-1 ring-border">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Free</p>
          <h2 className="mt-1 font-display text-4xl uppercase tracking-wide">Studio</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>Kits pulled from a pile of real records — most maps steal a track's form</li>
            <li>Random generator and next-phrase moves</li>
            <li>Full customisation of bars, BPM, key, vocals</li>
            <li>Watermarked sheet copy</li>
          </ul>
          <Button asChild variant="secondary" className="mt-8 w-full">
            <Link to="/studio">Open free</Link>
          </Button>
        </article>
        <article className="rounded-xl bg-surface p-6 ring-1 ring-accent">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">One-time</p>
          <h2 className="mt-1 font-display text-4xl uppercase tracking-wide">Pro · {money}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>Clean studio-sheet download</li>
            <li>JSON project file</li>
            <li>Named library of arrangements</li>
            <li>License stamped with your name</li>
          </ul>
          <Button className="mt-8 w-full" onClick={() => setUnlockOpen(true)}>
            {pro ? "Already unlocked" : `Buy / unlock · ${money}`}
          </Button>
        </article>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-3xl uppercase tracking-wide">How a purchase works</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            { n: "01", t: "Pay", d: "Checkout opens the seller’s PayPal, Gumroad, or Stripe link." },
            { n: "02", t: "Key", d: "They send a PF- license key after the payment lands." },
            { n: "03", t: "Unlock", d: "Paste it once. Pro stays on this browser." },
          ].map((s) => (
            <li key={s.n} className="rounded-xl bg-surface p-4 ring-1 ring-border">
              <p className="font-mono text-[11px] text-subtle">{s.n}</p>
              <h3 className="mt-1 font-display text-xl uppercase tracking-wide">{s.t}</h3>
              <p className="mt-2 text-sm text-pretty text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl uppercase tracking-wide">FAQ</h2>
        <dl className="mt-6 space-y-6">
          {FAQ.map((q) => (
            <div key={q.q} className="border-t border-border pt-4">
              <dt className="font-display text-lg uppercase tracking-wide">{q.q}</dt>
              <dd className="mt-2 text-sm text-pretty text-muted">{q.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14 border-t border-border pt-8">
        <h2 className="font-display text-xl uppercase tracking-wide">In short</h2>
        <ul className="mt-3 space-y-1.5 text-sm text-pretty text-muted">
          {LICENSE_TERMS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <Link to="/license" className="mt-4 inline-block text-sm text-muted underline underline-offset-2 hover:text-fg">
          Full license
        </Link>
      </section>
    </SiteShell>
  );
}

const FAQ = [
  {
    q: "Does this make audio?",
    a: "No. It writes arrangement maps and instrument placement. You still produce the track.",
  },
  {
    q: "Which DAW?",
    a: "Any. Phrase lengths are 8 / 16 / 32 bars so they drop onto a 4/4 grid.",
  },
  {
    q: "Is Pro a subscription?",
    a: "No. One payment, one producer license, as many of your own machines as you need.",
  },
  {
    q: "Can I use it on client work?",
    a: "Yes. Ghost production too. You cannot resell the generator or share the key.",
  },
];
