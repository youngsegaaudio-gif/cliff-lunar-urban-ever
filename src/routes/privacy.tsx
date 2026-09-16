import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/components/legal-pages";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    pageHead(
      "Privacy · PHRASEFORM",
      "No accounts. Maps and license keys stay in this browser. Payments are handled by the seller’s checkout.",
    ),
});
