import { Link } from "@tanstack/react-router";
import { PageKicker, SiteShell } from "@/components/site-shell";
import { LICENSE_TERMS } from "@/lib/license";

export function LicensePage() {
  return (
    <SiteShell active="legal">
      <PageKicker>Use</PageKicker>
      <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide">
        Public studio
      </h1>
      <p className="mt-4 text-sm text-muted">Last updated 16 September 2026.</p>
      <div className="mt-8 space-y-6 text-sm text-pretty text-muted">
        <p>
          Phraseform is free. No account, no key, no paywall. The studio, kits, exports, and
          library in this browser are all open.
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
          You do not get the right to republish the generator or wrap this site as your own product.
          Reference-track names in the kits are for study — they are not included audio.
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
          Phraseform does not require an account. Arrangements you save live in this browser’s local
          storage. They are not uploaded to a Phraseform server.
        </p>
        <p>
          We do not run ads or payment checkout. The host may collect ordinary server logs (page,
          time, technical errors) to keep the site up.
        </p>
        <p>Clear this site’s data in your browser to delete maps on this device.</p>
        <p>
          Site terms:{" "}
          <Link to="/license" className="text-fg underline underline-offset-2">
            public use
          </Link>
          .
        </p>
      </div>
    </SiteShell>
  );
}
