import { useState } from "react";
import { GENRES, shortKey } from "@/lib/arrangement/genres";
import { SERUM_FROM_SCRATCH, SPIRE_FROM_SCRATCH, SPIRE_KNOBS } from "@/lib/arrangement/init-synth";
import { EQ_ETCH, SOUND, type SerumPatch } from "@/lib/arrangement/sound";
import { cn } from "@/lib/utils";
import { useArranger } from "@/store/arranger";
import { Separator } from "@/components/ui/separator";

type Tab = "kit" | "kick" | "synths" | "mix";
type SynthView = "serum" | "spire" | "init";

export function SoundPanel() {
  const genre = useArranger((s) => s.track.genre);
  const key = useArranger((s) => s.track.key);
  const [tab, setTab] = useState<Tab>("kit");
  const [synth, setSynth] = useState<SynthView>("init");
  const g = GENRES[genre];
  const s = SOUND[genre];
  const spire = SPIRE_KNOBS[genre];

  return (
    <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
      <h3 className="font-display text-lg uppercase tracking-wide">Sound</h3>
      <div className="mt-3 flex flex-wrap gap-1">
        {(
          [
            ["kit", "Kit"],
            ["kick", "Kick / drums"],
            ["synths", "Serum / Spire"],
            ["mix", "Mix"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "h-9 rounded-md px-2.5 font-display text-xs uppercase tracking-wide ring-1 ring-border",
              tab === id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "kit" ? (
        <dl className="mt-4 space-y-2 text-sm">
          <Row label="Kick" value={g.kick} />
          <Row label="Groove" value={g.groove} />
          <Row label="Lead" value={g.lead} />
          <Row label="Mix" value={g.mixTip} />
        </dl>
      ) : null}

      {tab === "kick" ? (
        <div className="mt-4 space-y-3">
          <List title="Kick" items={s.kick} />
          <List title="Drums" items={s.drums} />
          <List title="Reverse bass" items={s.bass} />
        </div>
      ) : null}

      {tab === "synths" ? (
        <div className="mt-4">
          <div className="flex flex-wrap gap-1">
            {(
              [
                ["init", "From Init"],
                ["serum", "Serum knobs"],
                ["spire", "Spire knobs"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setSynth(id)}
                className={cn(
                  "h-8 rounded-md px-2 font-mono text-[10px] uppercase ring-1 ring-border",
                  synth === id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {synth === "init" ? (
            <div className="mt-4 space-y-4">
              <List title="Serum — lead from Init" items={SERUM_FROM_SCRATCH.lead} />
              <List title="Serum — chords from Init" items={SERUM_FROM_SCRATCH.chords} />
              <Separator />
              <List title="Spire — lead from Init" items={SPIRE_FROM_SCRATCH.lead} />
              <List title="Spire — chords from Init" items={SPIRE_FROM_SCRATCH.chords} />
            </div>
          ) : null}

          {synth === "serum" ? (
            <div className="mt-4 space-y-4">
              <Patch title={`Lead — ${s.lead.name}`} patch={s.lead} sessionKey={key} />
              <Separator />
              <Patch title={`Chords — ${s.chords.name}`} patch={s.chords} sessionKey={key} />
            </div>
          ) : null}

          {synth === "spire" ? (
            <div className="mt-4 space-y-3">
              <p className="text-xs text-muted">
                Same MIDI and EQ as Serum. Init first, then these knobs.
              </p>
              <Row label="Lead" value={spire.lead} />
              <Row label="Chords" value={spire.chords} />
              {spire.screech ? <Row label="Screech" value={spire.screech} /> : null}
              <Separator />
              <Row label="MIDI" value={s.lead.midi} />
              <p className="text-[11px] text-subtle">
                Written in Fm. Transpose the riff to {shortKey(key)} ({key}).
              </p>
              <Row label="EQ / etch" value={s.lead.eq} />
            </div>
          ) : null}
        </div>
      ) : null}

      {tab === "mix" ? (
        <div className="mt-4 space-y-3">
          <List title="This kit" items={s.mix} />
          <List title="EQ / etch" items={EQ_ETCH} />
        </div>
      ) : null}

      {tab === "kit" ? (
        <>
          <Separator className="my-3" />
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Listen like this</p>
          <ul className="mt-2 space-y-2">
            {g.references.map((r) => (
              <li key={r.title}>
                <p className="text-sm text-fg">
                  {r.artist} — {r.title}
                </p>
                <p className="text-xs text-pretty text-muted">{r.why}</p>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

function Patch({
  title,
  patch,
  sessionKey,
}: {
  title: string;
  patch: SerumPatch;
  sessionKey: string;
}) {
  return (
    <div>
      <p className="font-display text-sm uppercase tracking-wide">{title}</p>
      <dl className="mt-2 space-y-1.5 text-xs text-pretty text-muted">
        <Row label="Osc" value={patch.osc} />
        <Row label="Filter" value={patch.filter} />
        <Row label="Env" value={patch.env} />
        <Row label="LFO" value={patch.lfo} />
        <Row label="FX" value={patch.fx} />
        <Row label="MIDI" value={patch.midi} />
        <p className="text-[11px] text-subtle">
          Written in Fm. Move it to {shortKey(sessionKey)} ({sessionKey}).
        </p>
        <Row label="EQ / etch" value={patch.eq} />
      </dl>
    </div>
  );
}

function List({ title, items, className }: { title: string; items: string[]; className?: string }) {
  return (
    <div className={className}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">{title}</p>
      <ol className="mt-1.5 list-decimal space-y-1.5 pl-4">
        {items.map((x) => (
          <li key={x} className="text-sm text-pretty text-muted">
            {x}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider text-subtle">{label}</dt>
      <dd className="text-pretty text-muted">{value}</dd>
    </div>
  );
}
