import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing-page";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () =>
    pageHead(
      "PHRASEFORM — Hardstyle arrangement studio",
      "Phrase maps from real hardstyle records. DAW-style arrange: 4–8 bar intros, then 16s and 32s.",
    ),
});
