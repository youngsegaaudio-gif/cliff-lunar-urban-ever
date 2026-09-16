import { createFileRoute } from "@tanstack/react-router";
import { GenresPage } from "@/components/genres-page";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/genres/")({
  component: GenresPage,
  head: () =>
    pageHead(
      "Genres · PHRASEFORM",
      "Seven hardstyle genre kits: early, nu-style, euphoric, rawstyle, rawphoric, xtra raw, and uptempo.",
    ),
});
