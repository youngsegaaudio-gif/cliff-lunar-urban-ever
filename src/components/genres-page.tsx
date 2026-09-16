import { Link } from "@tanstack/react-router";
import { PageKicker, SiteShell } from "@/components/site-shell";
import { GENRE_LIST, GENRES } from "@/lib/arrangement/genres";
import { SOUND } from "@/lib/arrangement/sound";
import { SPIRE_KNOBS } from "@/lib/arrangement/init-synth";
import type { GenreId } from "@/lib/arrangement/types";

export function GenresPage() {
  return (
    <SiteShell active="genres" width="wide">
      <PageKicker>Kits</PageKicker>
      <h1 className="mt-3 max-w-2xl font-display text-5xl uppercase leading-[0.95] tracking-wide">
        Seven hardstyle genres, mapped
      </h1>
      <p className="mt-4 max-w-xl text-base text-pretty text-muted">
        Each kit comes from sitting with a pile of records in that lane — BPM, kick language,
        groove, lead — including the 4–8 bar intros those sessions actually start with. Generate
        usually steals a real track's section order.
      </p>
      <ul className="mt-10 grid gap-3 md:grid-cols-2">
        {GENRE_LIST.map((g) => (
          <li key={g.id}>
            <Link
              to="/genres/$id"
              params={{ id: g.id }}
              className="block h-full rounded-xl bg-surface p-5 ring-1 ring-border hover:bg-surface-2"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                {g.bpmRange[0]}–{g.bpmRange[1]} BPM
              </p>
              <h2 className="mt-1 font-display text-2xl uppercase tracking-wide">{g.name}</h2>
              <p className="mt-2 text-sm text-pretty text-muted">{g.vibe}</p>
              <p className="mt-3 text-xs text-subtle">{g.kick}</p>
            </Link>
          </li>
        ))}
      </ul>
    </SiteShell>
  );
}

export function GenreDetailPage({ id }: { id: GenreId }) {
  const g = GENRES[id];
  const form = g.templates[0] ?? [];
  return (
    <SiteShell active="genres">
      <PageKicker>
        {g.bpmRange[0]}–{g.bpmRange[1]} BPM
      </PageKicker>
      <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide">{g.name}</h1>
      <p className="mt-4 text-base text-pretty text-muted">
        {g.vibe} Maps in this kit usually follow a real record's section order, not a blank template.
      </p>
      <dl className="mt-8 space-y-4">
        <Row label="Kick" value={g.kick} />
        <Row label="Groove" value={g.groove} />
        <Row label="Lead" value={g.lead} />
        <Row label="Mix" value={g.mixTip} />
      </dl>
      <h2 className="mt-10 font-display text-2xl uppercase tracking-wide">Kick / drums</h2>
      <ul className="mt-3 space-y-2">
        {SOUND[id].kick.concat(SOUND[id].drums).map((s) => (
          <li key={s} className="text-sm text-pretty text-muted">
            {s}
          </li>
        ))}
      </ul>
      <h2 className="mt-10 font-display text-2xl uppercase tracking-wide">
        Serum — {SOUND[id].lead.name}
      </h2>
      <dl className="mt-3 space-y-2">
        <Row label="Osc" value={SOUND[id].lead.osc} />
        <Row label="Filter" value={SOUND[id].lead.filter} />
        <Row label="Env" value={SOUND[id].lead.env} />
        <Row label="LFO" value={SOUND[id].lead.lfo} />
        <Row label="FX" value={SOUND[id].lead.fx} />
        <Row label="MIDI" value={SOUND[id].lead.midi} />
        <Row label="EQ / etch" value={SOUND[id].lead.eq} />
      </dl>
      <h2 className="mt-10 font-display text-2xl uppercase tracking-wide">
        Serum chords — {SOUND[id].chords.name}
      </h2>
      <dl className="mt-3 space-y-2">
        <Row label="Osc" value={SOUND[id].chords.osc} />
        <Row label="Filter" value={SOUND[id].chords.filter} />
        <Row label="Env" value={SOUND[id].chords.env} />
        <Row label="MIDI" value={SOUND[id].chords.midi} />
        <Row label="EQ / etch" value={SOUND[id].chords.eq} />
      </dl>
      <h2 className="mt-10 font-display text-2xl uppercase tracking-wide">Spire from Init</h2>
      <dl className="mt-3 space-y-2">
        <Row label="Lead" value={SPIRE_KNOBS[id].lead} />
        <Row label="Chords" value={SPIRE_KNOBS[id].chords} />
        {SPIRE_KNOBS[id].screech ? <Row label="Screech" value={SPIRE_KNOBS[id].screech} /> : null}
      </dl>
      <p className="mt-3 text-sm text-pretty text-muted">
        Click Init, then those knobs. MIDI and EQ are the same as the Serum block above.
      </p>
      <h2 className="mt-10 font-display text-2xl uppercase tracking-wide">Typical form</h2>
      <ol className="mt-3 flex flex-wrap gap-2">
        {form.map((kind, i) => (
          <li
            key={`${kind}-${i}`}
            className="rounded-md bg-surface px-3 py-2 font-display text-sm uppercase tracking-wide ring-1 ring-border"
          >
            {kind === "dropB" ? "Drop B" : kind}
          </li>
        ))}
      </ol>
      <h2 className="mt-10 font-display text-2xl uppercase tracking-wide">Listen like this</h2>
      <ul className="mt-3 space-y-3">
        {g.references.map((r) => (
          <li key={r.title}>
            <p className="text-sm">
              {r.artist} — {r.title}
            </p>
            <p className="text-xs text-pretty text-muted">{r.why}</p>
          </li>
        ))}
      </ul>
      <Link
        to="/studio"
        search={{ genre: id }}
        className="mt-10 inline-flex h-12 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-fg"
      >
        Open {g.name} in the studio
      </Link>
    </SiteShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider text-subtle">{label}</dt>
      <dd className="mt-1 text-sm text-pretty text-muted">{value}</dd>
    </div>
  );
}
