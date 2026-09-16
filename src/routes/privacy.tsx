import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/components/legal-pages";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    pageHead(
      "Privacy · PHRASEFORM",
      "No accounts. Maps stay in this browser. Phraseform does not run ads or checkout.",
    ),
});
