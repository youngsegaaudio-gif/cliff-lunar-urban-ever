import { createFileRoute } from "@tanstack/react-router";
import { PricingPage } from "@/components/pricing-page";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () =>
    pageHead(
      "Pricing · PHRASEFORM",
      "Free studio with watermarked sheets. Pro is a one-time license for clean export, JSON, and a saved library.",
    ),
});
