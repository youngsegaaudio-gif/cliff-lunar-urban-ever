import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav, type NavId } from "@/components/site-nav";
import { cn } from "@/lib/utils";

export function SiteShell({
  active,
  children,
  width = "prose",
}: {
  active: NavId;
  children: ReactNode;
  width?: "prose" | "wide";
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <SiteNav active={active} />
      <main
        id="content"
        className={cn(
          "mx-auto w-full flex-1 px-4 py-10 md:px-6 md:py-14",
          width === "wide" ? "max-w-6xl" : "max-w-3xl",
        )}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export function PageKicker({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{children}</p>
  );
}
