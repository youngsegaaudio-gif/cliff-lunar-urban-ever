import { createFileRoute, notFound } from "@tanstack/react-router";
import { GenreDetailPage } from "@/components/genres-page";
import { GENRES } from "@/lib/arrangement/genres";
import { isGenreId } from "@/lib/arrangement/types";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/genres/$id")({
  beforeLoad: ({ params }) => {
    if (!isGenreId(params.id)) throw notFound();
  },
  component: GenreDetail,
  head: ({ params }) => {
    if (!isGenreId(params.id)) {
      return pageHead("Genre · PHRASEFORM", "Hardstyle genre kit.");
    }
    const g = GENRES[params.id];
    return pageHead(`${g.name} · PHRASEFORM`, g.vibe);
  },
});

function GenreDetail() {
  const { id } = Route.useParams();
  if (!isGenreId(id)) return null;
  return <GenreDetailPage id={id} />;
}
