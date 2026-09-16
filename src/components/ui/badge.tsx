import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "drop" | "build" | "break" | "intro";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider",
        tone === "muted" && "bg-surface-2 text-muted",
        tone === "drop" && "bg-drop/20 text-drop",
        tone === "build" && "bg-build/20 text-build",
        tone === "break" && "bg-break/20 text-break",
        tone === "intro" && "bg-intro/25 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
