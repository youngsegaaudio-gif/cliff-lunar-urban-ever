import { createFileRoute } from "@tanstack/react-router";
import { SoundPage } from "@/components/sound-page";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/sound")({
  component: SoundPage,
  head: () =>
    pageHead(
      "Sound · PHRASEFORM",
      "Kick, drums, reverse bass, Serum and Spire from Init, and mixing — written for any DAW.",
    ),
});
