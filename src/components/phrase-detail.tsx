import { ChevronLeft, ChevronRight, Copy, Plus, Trash2 } from "lucide-react";
import { GENRES, KIND_META, LANE_META } from "@/lib/arrangement/genres";
import { phraseSoundTips } from "@/lib/arrangement/sound";
import { barOffset } from "./timeline-helpers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LANE_IDS, LANE_STATES, PHRASE_KINDS, type GenreId, type LaneState, type PhraseKind } from "@/lib/arrangement/types";
import { cn } from "@/lib/utils";
import { useArranger } from "@/store/arranger";

export function PhraseDetail() {
  const track = useArranger((s) => s.track);
  const selectedId = useArranger((s) => s.selectedId);
  const setKind = useArranger((s) => s.setKind);
  const setBars = useArranger((s) => s.setBars);
  const setLane = useArranger((s) => s.setLane);
  const removePhrase = useArranger((s) => s.removePhrase);
  const duplicatePhrase = useArranger((s) => s.duplicatePhrase);
  const movePhrase = useArranger((s) => s.movePhrase);
  const insertPhrase = useArranger((s) => s.insertPhrase);

  const phrase = track.phrases.find((p) => p.id === selectedId);
  if (!phrase) {
    return (
      <div className="rounded-xl bg-surface p-5 ring-1 ring-border">
        <p className="text-sm text-muted">Select a phrase on the timeline.</p>
      </div>
    );
  }

  const g = GENRES[track.genre];
  const recipe = g.recipes[phrase.kind];
  const start = barOffset(track, phrase.id);
  const end = start + phrase.bars - 1;

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-surface p-4 ring-1 ring-border">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted tabular-nums">
            Bars {start}–{end}
          </p>
          <h3 className="font-display text-2xl uppercase tracking-wide text-fg">
            {KIND_META[phrase.kind].name}
          </h3>
          <p className="mt-1 text-sm text-pretty text-muted">{recipe.intent}</p>
        </div>
        <div className="flex shrink-0">
          <Button variant="ghost" size="icon" onClick={() => movePhrase(phrase.id, -1)} aria-label="Move earlier">
            <ChevronLeft />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => movePhrase(phrase.id, 1)} aria-label="Move later">
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {PHRASE_KINDS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(phrase.id, k)}
            className={cn(
              "h-8 rounded-md px-2.5 font-display text-xs uppercase tracking-wide ring-1 ring-border",
              phrase.kind === k ? "bg-accent text-accent-fg" : "text-muted hover:text-fg hover:bg-surface-2",
            )}
          >
            {KIND_META[k].name}
          </button>
        ))}
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">Length</p>
        <div className="flex flex-wrap gap-1.5">
          {[4, 8, 16, 24, 32, 48].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setBars(phrase.id, n)}
              className={cn(
                "h-9 min-w-11 rounded-md px-2 font-mono text-xs tabular-nums ring-1 ring-border",
                phrase.bars === n ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">What to put here</p>
        <ul className="flex flex-col gap-2">
          {LANE_IDS.map((lane) => {
            const rec = recipe.lanes[lane];
            const state = phrase.lanes[lane];
            return (
              <li key={lane} className="rounded-lg bg-surface-2 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-sm uppercase tracking-wide text-fg">
                    {LANE_META[lane].name}
                  </span>
                  <LaneToggle
                    value={state}
                    onChange={(s) => setLane(phrase.id, lane, s)}
                  />
                </div>
                {state !== "off" && rec?.put ? (
                  <p className="mt-1.5 text-xs leading-relaxed text-pretty text-muted">{rec.put}</p>
                ) : (
                  <p className="mt-1.5 text-xs text-subtle">Muted in this phrase.</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">How to build it</p>
        <ol className="list-decimal space-y-1.5 pl-4 text-sm text-pretty text-muted">
          {recipe.howToBuild.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <ul className="mt-3 space-y-1">
          {phrase.notes.map((n) => (
            <li key={n} className="text-xs text-pretty text-muted">
              {n}
            </li>
          ))}
        </ul>
      </div>

      <PhraseSound genre={track.genre} kind={phrase.kind} />

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={() => duplicatePhrase(phrase.id)}>
          <Copy /> Duplicate
        </Button>
        <Button variant="secondary" size="sm" onClick={() => insertPhrase("build", phrase.id)}>
          <Plus /> Insert after
        </Button>
        <Button variant="ghost" size="sm" onClick={() => removePhrase(phrase.id)}>
          <Trash2 /> Remove
        </Button>
      </div>
    </div>
  );
}

function PhraseSound({ genre, kind }: { genre: GenreId; kind: PhraseKind }) {
  const blocks = phraseSoundTips(genre, kind);
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">
        Serum / Spire / EQ
      </p>
      <div className="space-y-3">
        {blocks.map((b) => (
          <div key={b.title}>
            <p className="font-display text-xs uppercase tracking-wide text-fg">{b.title}</p>
            <ul className="mt-1 space-y-1">
              {b.steps.map((s) => (
                <li key={s} className="text-xs leading-relaxed text-pretty text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function LaneToggle({
  value,
  onChange,
}: {
  value: LaneState;
  onChange: (s: LaneState) => void;
}) {
  return (
    <div className="flex rounded-md ring-1 ring-border">
      {LANE_STATES.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={cn(
            "h-8 px-1.5 font-mono text-[9px] uppercase",
            value === s ? "bg-accent text-accent-fg" : "text-subtle hover:text-fg",
          )}
        >
          {s === "filter" ? "filt" : s.slice(0, 4)}
        </button>
      ))}
    </div>
  );
}

export function kindTone(kind: PhraseKind): "drop" | "build" | "break" | "intro" | "muted" {
  if (kind === "drop" || kind === "dropB") return "drop";
  if (kind === "build") return "build";
  if (kind === "breakdown" || kind === "break" || kind === "tease") return "break";
  return "intro";
}

export function PhraseKindBadge({ kind }: { kind: PhraseKind }) {
  return <Badge tone={kindTone(kind)}>{KIND_META[kind].name}</Badge>;
}
