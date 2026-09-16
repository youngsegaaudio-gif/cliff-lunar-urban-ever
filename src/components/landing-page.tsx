import { Link } from "@tanstack/react-router";
import { PhraseMapPreview } from "@/components/phrase-map-preview";
import { PageKicker, SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { GENRE_LIST } from "@/lib/arrangement/genres";

export function LandingPage() {
  return (
    <SiteShell active="home" width="wide">
      <PageKicker>Public hardstyle arrangement studio</PageKicker>
      <h1 className="mt-3 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-wide md:text-7xl">
        Write the map before you write the kick
      </h1>
      <p className="mt-5 max-w-xl text-base text-pretty text-muted md:text-lg">
        Most maps steal the bones from a real record — Imaginary, FTS, TOO COLD — then you write
        your own notes. Looks like a DAW arrange window: 4–8 bar intros, then 16s and 32s, with
        what actually sits on kick, reverse bass, leads, and vocals. Free. No account.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Button asChild size="lg">
          <Link to="/studio">Open the studio</Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link to="/method">How it works</Link>
        </Button>
      </div>

      <div className="mt-12">
        <PhraseMapPreview />
      </div>

      <dl className="mt-10 grid grid-cols-3 gap-3 border-y border-border py-6">
        {[
          { k: "200+", v: "Reference tracks behind the kits" },
          { k: "4–8", v: "Bar intros, like a real session" },
          { k: "200–300", v: "Bars per festival map" },
        ].map((s) => (
          <div key={s.v}>
            <dt className="font-display text-3xl uppercase tracking-wide md:text-4xl">{s.k}</dt>
            <dd className="mt-1 text-xs text-muted md:text-sm">{s.v}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-14 grid gap-3 md:grid-cols-2">
        {PILLARS.map((f) => (
          <article key={f.title} className="rounded-xl bg-surface p-5 ring-1 ring-border">
            <h2 className="font-display text-2xl uppercase tracking-wide">{f.title}</h2>
            <p className="mt-2 text-sm text-pretty text-muted">{f.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl uppercase tracking-wide">Seven kits</h2>
          <Link to="/genres" className="font-display text-sm uppercase tracking-wide text-muted hover:text-fg">
            All genres
          </Link>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {GENRE_LIST.map((g) => (
            <li key={g.id}>
              <Link
                to="/genres/$id"
                params={{ id: g.id }}
                className="block rounded-lg bg-surface px-4 py-3 ring-1 ring-border hover:bg-surface-2"
              >
                <p className="font-display uppercase tracking-wide">{g.name}</p>
                <p className="mt-1 text-xs text-muted">
                  {g.bpmRange[0]}–{g.bpmRange[1]} BPM · {g.short}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-xl bg-surface p-6 ring-1 ring-border md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <h2 className="font-display text-3xl uppercase tracking-wide">Public. No paywall.</h2>
          <p className="mt-2 max-w-md text-sm text-pretty text-muted">
            Generate maps, save a library in this browser, export a clean studio sheet. The music
            you write from it is yours.
          </p>
        </div>
        <div className="mt-4 flex shrink-0 flex-col gap-2 md:mt-0">
          <Button asChild>
            <Link to="/studio">Open the studio</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/method">Read the method</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}

const PILLARS = [
  {
    title: "From the records",
    body: "Seven kits pulled from a pile of hardstyle, raw, and uptempo records — phrase lengths, kick language, and what actually sits in a drop. About 7 in 10 maps follow a real track's section order.",
  },
  {
    title: "DAW arrange",
    body: "A timeline with lanes, 4-bar grid, and markers. Start with a 4-bar FX pickup or 8-bar filtered kick, then grow the mix-in.",
  },
  {
    title: "Serum / Spire",
    body: "From Init, not a factory preset. Each kit writes Serum and Spire knobs for leads and chords, plus kick, clap, reverse bass, EQ / etch, and a mix that works in any DAW.",
  },
  {
    title: "Studio sheet",
    body: "Export a bar-numbered sheet. Build it in the DAW. The music you write from the map is yours.",
  },
];
