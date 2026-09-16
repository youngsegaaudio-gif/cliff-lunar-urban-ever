import { createFileRoute } from "@tanstack/react-router";
import { StudioApp } from "@/components/studio-app";
import { isGenreId, type GenreId } from "@/lib/arrangement/types";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/studio")({
  validateSearch: (search: Record<string, unknown>): { genre?: GenreId } => ({
    genre: isGenreId(search.genre) ? search.genre : undefined,
  }),
  component: StudioApp,
  head: () =>
    pageHead(
      "Studio · PHRASEFORM",
      "Generate and edit hardstyle phrase maps. Kick, reverse bass, leads, vocals — by the bar.",
    ),
});
