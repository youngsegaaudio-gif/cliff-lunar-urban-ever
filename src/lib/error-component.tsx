import { Link, type ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "Something broke. Reload, or go back to the studio.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg">
      <TriangleAlert className="size-8 text-drop" strokeWidth={2} aria-hidden="true" />
      <h1 className="font-display text-2xl uppercase tracking-wide">Something went wrong</h1>
      <p className="max-w-md text-sm text-pretty text-muted">{errorMessage(error)}</p>
      <Link to="/" className="mt-2 text-sm text-muted underline underline-offset-2 hover:text-fg">
        Home
      </Link>
    </main>
  );
}
