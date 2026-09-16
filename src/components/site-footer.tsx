import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.14em]">Phraseform</p>
          <p className="mt-2 max-w-xs text-sm text-pretty text-muted">
            Phrase maps for hardstyle, taken from hundreds of records. Kick, reverse bass, leads,
            and vocals — written on a 4-bar DAW grid.
          </p>
        </div>
        <FooterCol
          title="Product"
          links={[
            { to: "/studio", label: "Studio" },
            { to: "/pricing", label: "Pricing" },
            { to: "/genres", label: "Genre kits" },
          ]}
        />
        <FooterCol
          title="Learn"
          links={[
            { to: "/method", label: "Method" },
            { to: "/sound", label: "Kick / Serum / mix" },
            { to: "/license", label: "License" },
          ]}
        />
        <FooterCol
          title="Site"
          links={[
            { to: "/privacy", label: "Privacy" },
            { to: "/sell", label: "Seller desk" },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-subtle md:px-6">
          <p>© 2026 Phraseform. Arrangements are ideas. The track is yours.</p>
          <p>One producer, one license.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: "/studio" | "/pricing" | "/genres" | "/method" | "/sound" | "/license" | "/privacy" | "/sell"; label: string }[];
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-muted hover:text-fg">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
