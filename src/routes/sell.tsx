import { createFileRoute } from "@tanstack/react-router";
import { SellDesk } from "@/components/sell-desk";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/sell")({
  component: SellDesk,
  head: () =>
    pageHead(
      "Seller desk · PHRASEFORM",
      "Set price, paste a checkout link, mint license keys, and fulfill Phraseform Pro orders.",
    ),
});
