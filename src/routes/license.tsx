import { createFileRoute } from "@tanstack/react-router";
import { LicensePage } from "@/components/legal-pages";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/license")({
  component: LicensePage,
  head: () =>
    pageHead(
      "License · PHRASEFORM",
      "Phraseform is a public studio. Free to use. The music you write from a map is yours.",
    ),
});
