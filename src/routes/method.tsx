import { createFileRoute } from "@tanstack/react-router";
import { MethodPage } from "@/components/method-page";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/method")({
  component: MethodPage,
  head: () =>
    pageHead(
      "Method · PHRASEFORM",
      "How to write a hardstyle track from a phrase map: kick and reverse bass, drop first, then DJ edges.",
    ),
});
