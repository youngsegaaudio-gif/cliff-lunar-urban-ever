import { createFileRoute } from "@tanstack/react-router";
import { LicensePage } from "@/components/legal-pages";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/license")({
  component: LicensePage,
  head: () =>
    pageHead(
      "License · PHRASEFORM",
      "Single-producer license for Phraseform Pro. Arrangements are ideas — the music you write is yours.",
    ),
});
