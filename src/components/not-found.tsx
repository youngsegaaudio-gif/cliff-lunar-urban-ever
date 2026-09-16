import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <SiteShell active="home">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">404</p>
      <h1 className="mt-3 font-display text-5xl uppercase tracking-wide">Phrase not on this map</h1>
      <p className="mt-4 text-sm text-pretty text-muted">
        That page is not here. The studio and the genre kits still are.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/studio">Studio</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
