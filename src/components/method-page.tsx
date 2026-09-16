import { Link } from "@tanstack/react-router";
import { PageKicker, SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    n: "01",
    title: "Think in phrases",
    body: "A hardstyle record starts like a DAW session: 4 bars of FX or 8 of a filtered kick, then 16s and 32s. Most Phraseform maps nick that order from a real one — mix-in, drop, identity, mix-out — not the notes.",
  },
  {
    n: "02",
    title: "Lock kick and reverse bass",
    body: "Eight bars. Kick on the downbeats, reverse bass on the offbeats. If that groove is wrong, the rest of the map does not matter. Generate a kit, then copy that 8 into your DAW first.",
  },
  {
    n: "03",
    title: "Fix the lengths",
    body: "Intros are 4 or 8. Builds 16. Drops 16 or 32. Festival maps land around 200–300 bars. Use the energy preset, then stretch a phrase if a DJ mix-in needs another 16.",
  },
  {
    n: "04",
    title: "Write Drop A before the intro",
    body: "The drop is the record. Intro, tease, and build exist to deliver it. Open the drop phrase, read the lane recipes, and program kick / reverse bass / lead there first.",
  },
  {
    n: "05",
    title: "Ask for the next phrase",
    body: "When the first drop is in, use the suggestions. Drop B, breakdown, or mix-out — each one explains why that move is in this genre.",
  },
  {
    n: "06",
    title: "Export the sheet, finish the music",
    body: "Copy the studio sheet. It is bar numbers and instrument notes, not audio. You still write the riff, the kick, and the vocal. Phraseform is the map.",
  },
];

export function MethodPage() {
  return (
    <SiteShell active="method">
      <PageKicker>How to use it</PageKicker>
      <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide">
        A session, not a template dump
      </h1>
      <p className="mt-4 text-base text-pretty text-muted">
        Same order you'd actually write: groove, drop, identity, then the DJ edges. Works in any
        DAW. Phrase lengths match how sets get mixed. Roughly 70% of generates follow a real
        track's skeleton.
      </p>
      <ol className="mt-10 space-y-8">
        {STEPS.map((s) => (
          <li key={s.n} className="border-t border-border pt-6">
            <p className="font-mono text-[11px] text-subtle">{s.n}</p>
            <h2 className="mt-1 font-display text-2xl uppercase tracking-wide">{s.title}</h2>
            <p className="mt-2 text-sm text-pretty text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/studio">Open the studio</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/sound">Kick, Serum, mix</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
