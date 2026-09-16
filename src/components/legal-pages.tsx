import { Link } from "@tanstack/react-router";
import { PageKicker, SiteShell } from "@/components/site-shell";
import { LICENSE_TERMS } from "@/lib/license";

export function LicensePage() {
  return (
    <SiteShell active="legal">
      <PageKicker>Legal</PageKicker>
      <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide">
        License
      </h1>
      <p className="mt-4 text-sm text-muted">Last updated 16 September 2026.</p>
      <div className="mt-8 space-y-6 text-sm text-pretty text-muted">
        <p>
          Phraseform Pro is a single-producer license. Free Phraseform may be used without a key,
          with watermarks on exported sheets.
        </p>
        <ul className="space-y-2">
          {LICENSE_TERMS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h2 className="font-display text-2xl uppercase tracking-wide text-fg">What you own</h2>
        <p>
          Maps, titles, and notes you generate are yours to use in original music, client work, and
          ghost production. Phraseform does not claim the tracks you write from a sheet.
        </p>
        <h2 className="font-display text-2xl uppercase tracking-wide text-fg">What you do not get</h2>
        <p>
          You do not get the right to republish the generator, mint keys for other people, or wrap
          this site as your own SaaS. Reference-track names in the kits are for study — they are not
          included audio.
        </p>
        <h2 className="font-display text-2xl uppercase tracking-wide text-fg">Keys</h2>
        <p>
          A Pro key unlocks this browser. Keep it private. If you lose it, ask the seller you paid
          — they can mint another for the same purchase.
        </p>
        <h2 className="font-display text-2xl uppercase tracking-wide text-fg">Refunds</h2>
        <p>
          Digital license. If a key was never issued, the seller handles the payment. Once a key is
          delivered and used, it is spent.
        </p>
      </div>
    </SiteShell>
  );
}

export function PrivacyPage() {
  return (
    <SiteShell active="legal">
      <PageKicker>Legal</PageKicker>
      <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide">
        Privacy
      </h1>
      <p className="mt-4 text-sm text-muted">Last updated 16 September 2026.</p>
      <div className="mt-8 space-y-6 text-sm text-pretty text-muted">
        <p>
          Phraseform does not require an account. Arrangements, license keys, and seller-desk notes
          live in this browser’s local storage. They are not uploaded to a Phraseform server.
        </p>
        <p>
          If you pay the seller, that payment is handled by their checkout (PayPal, Gumroad, Stripe,
          or similar). Their privacy policy covers that transaction — not this page.
        </p>
        <p>
          We do not run third-party advertising pixels. The host may collect ordinary server logs
          (page, time, technical errors) to keep the site up.
        </p>
        <p>
          Clear this site’s data in your browser to delete maps and unlocks on this device.
        </p>
        <p>
          Questions about a purchase go to the person you paid. Site terms:{" "}
          <Link to="/license" className="text-fg underline underline-offset-2">
            license
          </Link>
          .
        </p>
      </div>
    </SiteShell>
  );
}
