import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.14em]">Phraseform</p>
          <p className="mt-2 max-w-xs text-sm text-pretty text-muted">
            Public hardstyle phrase maps. Kick, reverse bass, leads, and vocals on a 4-bar DAW
            grid. Free to use.
          </p>
        </div>
        <FooterCol
          title="Studio"
          links={[
            { to: "/studio", label: "Open studio" },
            { to: "/genres", label: "Genre kits" },
            { to: "/sound", label: "Kick / Serum / mix" },
          ]}
        />
        <FooterCol
          title="Learn"
          links={[
            { to: "/method", label: "Method" },
            { to: "/license", label: "Use" },
          ]}
        />
        <FooterCol
          title="Site"
          links={[{ to: "/privacy", label: "Privacy" }]}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-subtle md:px-6">
          <p>© 2026 Phraseform. Public tool. Arrangements are ideas. The track is yours.</p>
          <p>No paywall. No account.</p>
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
  links: { to: "/studio" | "/genres" | "/method" | "/sound" | "/license" | "/privacy"; label: string }[];
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
