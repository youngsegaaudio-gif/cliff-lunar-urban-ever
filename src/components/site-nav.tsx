import { Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type NavId = "home" | "method" | "sound" | "genres" | "studio" | "legal";

const LINKS: { to: "/" | "/method" | "/sound" | "/genres" | "/studio"; id: NavId; label: string }[] = [
  { to: "/", id: "home", label: "Home" },
  { to: "/method", id: "method", label: "Method" },
  { to: "/sound", id: "sound", label: "Sound" },
  { to: "/genres", id: "genres", label: "Genres" },
  { to: "/studio", id: "studio", label: "Studio" },
];

export function SiteNav({ active }: { active: NavId }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95">
      <a
        href="#content"
        className="absolute left-4 top-3 z-50 -translate-y-16 rounded-md bg-accent px-3 py-2 text-sm text-accent-fg focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 md:px-6">
        <Link to="/" className="mr-auto py-1">
          <p className="font-display text-2xl uppercase leading-none tracking-[0.14em] text-fg">
            Phraseform
          </p>
          <p className="mt-0.5 text-xs text-muted">Hardstyle arrangement studio</p>
        </Link>
        <nav aria-label="Primary" className="hidden items-center md:flex">
          {LINKS.map((l) => (
            <NavItem key={l.to} {...l} on={active === l.id} />
          ))}
        </nav>
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link to="/studio">Open studio</Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent title="Phraseform" side="right">
            <nav className="flex flex-col">
              {LINKS.map((l) => (
                <NavItem key={l.to} {...l} on={active === l.id} block />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function NavItem({
  to,
  label,
  on,
  block,
}: {
  to: "/" | "/method" | "/sound" | "/genres" | "/studio";
  id?: NavId;
  label: string;
  on: boolean;
  block?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "font-display text-sm uppercase tracking-wide",
        block ? "flex h-12 items-center" : "inline-flex h-11 items-center px-3",
        on ? "text-fg" : "text-muted hover:text-fg",
      )}
    >
      {label}
    </Link>
  );
}
