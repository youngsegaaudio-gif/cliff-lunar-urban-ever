import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md bg-surface-2 px-3 text-sm text-fg outline-none ring-1 ring-border placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-fg/40",
        className,
      )}
      {...props}
    />
  );
}
