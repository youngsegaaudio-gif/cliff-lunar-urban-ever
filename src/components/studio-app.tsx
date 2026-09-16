import { useSearch } from "@tanstack/react-router";
import { Dices, FileDown, FolderOpen, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { PhraseDetail } from "@/components/phrase-detail";
import { SiteNav } from "@/components/site-nav";
import { SoundPanel } from "@/components/sound-panel";
import { Timeline } from "@/components/timeline";
import { UnlockDialog } from "@/components/unlock-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { jsonSheet, studioSheet } from "@/lib/arrangement/export";
import { GENRE_LIST, GENRES, KEYS_ALL, KIND_META, barsToTime, shortKey } from "@/lib/arrangement/genres";
import { ENERGY_DEFAULTS, totalBars } from "@/lib/arrangement/generator";
import { howToBuildTrack, suggestNext } from "@/lib/arrangement/suggestions";
import type { EnergyPreset, GenreId } from "@/lib/arrangement/types";
import { cn } from "@/lib/utils";
import { useArranger } from "@/store/arranger";
import { useCommerce } from "@/store/commerce";

export function StudioApp() {
  const track = useArranger((s) => s.track);
  const generate = useArranger((s) => s.generate);
  const random = useArranger((s) => s.random);
  const bars = totalBars(track);
  const g = GENRES[track.genre];
  const search = useSearch({ from: "/studio" });

  useEffect(() => {
    const ready = Promise.resolve(useArranger.persist.rehydrate());
    void ready.then(() => {
      if (search.genre) useArranger.getState().setGenre(search.genre);
    });
    void useCommerce.persist.rehydrate();
  }, [search.genre]);

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-bg text-fg">
      <SiteNav active="studio" />
      <UnlockDialog />
      <div id="content" className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden">
      <div className="border-b border-border px-4 py-2 md:px-6">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => generate()}>
            <Sparkles /> Generate
          </Button>
          <Button size="sm" onClick={() => random()}>
            <Dices /> Random track
          </Button>
          <LibraryMenu />
          <ExportMenu />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-3 p-3 md:p-4">
        <GenreRail />
        <SettingsRow />

        <section className="rounded-xl bg-surface px-4 py-3 ring-1 ring-border">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <input
                aria-label="Track title"
                className="w-full max-w-md bg-transparent font-display text-3xl uppercase tracking-wide text-fg outline-none md:text-4xl"
                value={track.title}
                onChange={(e) => useArranger.getState().patchTrack({ title: e.target.value })}
              />
              <p className="mt-1 text-sm text-muted">
                {g.name} · {track.bpm} BPM · {track.key} · {bars} bars ·{" "}
                {barsToTime(bars, track.bpm)}
                {track.inspiredBy
                  ? ` · after ${track.inspiredBy}`
                  : " · freehand"}
              </p>
            </div>
            <p className="max-w-md text-xs text-pretty text-muted">{g.vibe}</p>
          </div>
        </section>

        <div className="grid min-h-0 min-w-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex min-h-[22rem] min-w-0 flex-col gap-3">
            <Timeline />
            <HowToStrip />
            <div className="lg:hidden">
              <SoundPanel />
            </div>
          </div>
          <div className="flex min-h-0 flex-col gap-3">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full">Edit selected phrase</Button>
                </SheetTrigger>
                <SheetContent side="bottom" title="Phrase">
                  <PhraseDetail />
                  <div className="mt-4">
                    <NextMoves />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden min-h-0 flex-col gap-3 lg:flex">
              <ScrollArea className="max-h-[calc(100dvh-14rem)]">
                <div className="flex flex-col gap-3 pr-2">
                  <PhraseDetail />
                  <NextMoves />
                  <SoundPanel />
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function GenreRail() {
  const genre = useArranger((s) => s.track.genre);
  const setGenre = useArranger((s) => s.setGenre);
  const generate = useArranger((s) => s.generate);

  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {GENRE_LIST.map((g) => {
        const on = g.id === genre;
        return (
          <button
            key={g.id}
            type="button"
            onClick={() => {
              setGenre(g.id);
            }}
            onDoubleClick={() => generate({ genre: g.id as GenreId })}
            className={cn(
              "min-w-[9.5rem] shrink-0 rounded-lg px-3 py-2.5 text-left ring-1 transition-[background-color,color] duration-150",
              on ? "bg-accent text-accent-fg ring-accent" : "bg-surface text-fg ring-border hover:ring-fg/30",
            )}
          >
            <span className="block font-display text-sm uppercase tracking-wide">{g.name}</span>
            <span className={cn("mt-0.5 block text-[11px] leading-snug", on ? "text-accent-fg/70" : "text-muted")}>
              {g.bpm} BPM · {g.short}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SettingsRow() {
  const track = useArranger((s) => s.track);
  const patch = useArranger((s) => s.patchTrack);
  const generate = useArranger((s) => s.generate);
  const g = GENRES[track.genre];

  return (
    <div className="grid gap-3 rounded-xl bg-surface p-3 ring-1 ring-border md:grid-cols-2 xl:grid-cols-4">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">BPM</span>
        <div className="flex items-center gap-3">
          <Slider
            min={g.bpmRange[0]}
            max={g.bpmRange[1]}
            step={1}
            value={[track.bpm]}
            onValueChange={([v]) => patch({ bpm: v ?? track.bpm })}
          />
          <span className="w-8 font-mono text-sm tabular-nums">{track.bpm}</span>
        </div>
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Target length</span>
        <div className="flex items-center gap-3">
          <Slider
            min={64}
            max={320}
            step={8}
            value={[track.targetBars]}
            onValueChange={([v]) => patch({ targetBars: v ?? track.targetBars })}
          />
          <span className="w-10 font-mono text-sm tabular-nums">{track.targetBars}</span>
        </div>
      </label>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Phrase grid</span>
        <div className="flex gap-1">
          {([4, 8, 16, 32] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => patch({ phraseGrid: n })}
              className={cn(
                "h-11 flex-1 rounded-md font-mono text-sm ring-1 ring-border",
                track.phraseGrid === n ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Form</span>
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-1">
            {(["radio", "festival", "extended"] as EnergyPreset[]).map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => {
                  patch({ energyPreset: e, targetBars: ENERGY_DEFAULTS[e] });
                  generate({ energyPreset: e, targetBars: ENERGY_DEFAULTS[e] });
                }}
                className={cn(
                  "h-11 rounded-md px-2 font-display text-xs uppercase tracking-wide ring-1 ring-border",
                  track.energyPreset === e ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
                )}
              >
                {e}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-muted">
            Vox
            <Switch
              checked={track.vocals}
              onCheckedChange={(v) => {
                patch({ vocals: v });
                generate({ vocals: v });
              }}
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:col-span-2 xl:col-span-4">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Key</span>
        <div className="flex flex-wrap gap-1">
          {KEYS_ALL.filter((k) => k.endsWith("minor")).map((k) => (
            <KeyChip key={k} name={k} active={track.key === k} onPick={() => patch({ key: k })} />
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {KEYS_ALL.filter((k) => k.endsWith("major")).map((k) => (
            <KeyChip key={k} name={k} active={track.key === k} onPick={() => patch({ key: k })} />
          ))}
        </div>
      </div>
    </div>
  );
}

function KeyChip({ name, active, onPick }: { name: string; active: boolean; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      title={name}
      className={cn(
        "h-8 min-w-9 rounded-md px-1.5 font-mono text-[11px] ring-1 ring-border",
        active ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
      )}
    >
      {shortKey(name)}
    </button>
  );
}

function NextMoves() {
  const track = useArranger((s) => s.track);
  const appendMove = useArranger((s) => s.appendMove);
  const moves = useMemo(() => suggestNext(track), [track]);

  return (
    <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
      <h3 className="font-display text-lg uppercase tracking-wide">Next phrase</h3>
      <p className="mt-1 text-xs text-muted">Suggestions from this genre’s reference records.</p>
      <ul className="mt-3 flex flex-col gap-2">
        {moves.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => appendMove(m)}
              className="w-full rounded-lg bg-surface-2 px-3 py-2.5 text-left ring-1 ring-border hover:ring-fg/30"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-display text-sm uppercase tracking-wide text-fg">{m.title}</span>
                <span className="font-mono text-[10px] text-muted tabular-nums">
                  {KIND_META[m.kind].name} · {m.bars}
                </span>
              </span>
              <span className="mt-1 block text-xs text-pretty text-muted">{m.why}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowToStrip() {
  const track = useArranger((s) => s.track);
  const steps = howToBuildTrack(track);
  return (
    <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
      <h3 className="font-display text-lg uppercase tracking-wide">Build this track</h3>
      <ol className="mt-2 grid gap-2 text-sm text-muted md:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-2 text-pretty">
            <span className="font-mono text-[11px] text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function LibraryMenu() {
  const [open, setOpen] = useState(false);
  const library = useArranger((s) => s.library);
  const saveLibrary = useArranger((s) => s.saveLibrary);
  const loadLibrary = useArranger((s) => s.loadLibrary);
  const removeLibrary = useArranger((s) => s.removeLibrary);
  const pro = useCommerce((s) => s.isPro());
  const setUnlockOpen = useCommerce((s) => s.setUnlockOpen);

  const save = () => {
    if (!pro) {
      setUnlockOpen(true);
      setOpen(false);
      return;
    }
    saveLibrary();
    toast.success("Saved to library");
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setOpen((v) => !v)}>
        <FolderOpen /> Library
      </Button>
      {open ? (
        <div className="absolute left-0 z-30 mt-1 w-72 rounded-lg bg-surface-2 p-1 ring-1 ring-border">
          <button
            type="button"
            className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-surface"
            onClick={save}
          >
            Save this arrangement
          </button>
          {library.length === 0 ? (
            <p className="px-3 py-2 text-xs text-muted">Empty. Pro keeps a named shelf of maps.</p>
          ) : (
            library.map((item) => (
              <div key={item.id} className="flex items-center gap-1 px-1">
                <button
                  type="button"
                  className="min-w-0 flex-1 rounded-md px-2 py-2 text-left text-sm hover:bg-surface"
                  onClick={() => {
                    loadLibrary(item.id);
                    setOpen(false);
                  }}
                >
                  <span className="block truncate">{item.track.title}</span>
                  <span className="block font-mono text-[10px] text-muted">
                    {item.track.genre} · {item.track.bpm}
                  </span>
                </button>
                <button
                  type="button"
                  className="px-2 text-xs text-muted hover:text-fg"
                  onClick={() => removeLibrary(item.id)}
                >
                  Del
                </button>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

function ExportMenu() {
  const [open, setOpen] = useState(false);
  const track = useArranger((s) => s.track);
  const pro = useCommerce((s) => s.isPro());
  const licensee = useCommerce((s) => s.licensee);
  const setUnlockOpen = useCommerce((s) => s.setUnlockOpen);
  const sheet = () => studioSheet(track, { pro, licensee });

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Copied ${label}`);
    } catch {
      toast.error("Could not copy");
    }
    setOpen(false);
  };

  const download = (text: string, name: string, mime: string) => {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const needPro = (fn: () => void) => {
    if (!pro) {
      setUnlockOpen(true);
      setOpen(false);
      return;
    }
    fn();
  };

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setOpen((v) => !v)}>
        <FileDown /> Export
      </Button>
      {open ? (
        <div className="absolute right-0 z-30 mt-1 w-56 rounded-lg bg-surface-2 p-1 ring-1 ring-border">
          <button
            type="button"
            className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-surface"
            onClick={() => copy(sheet(), pro ? "studio sheet" : "watermarked sheet")}
          >
            Copy studio sheet
          </button>
          <button
            type="button"
            className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-surface"
            onClick={() =>
              needPro(() => download(sheet(), `${slug(track.title)}.txt`, "text/plain"))
            }
          >
            Download .txt{pro ? "" : " · Pro"}
          </button>
          <button
            type="button"
            className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-surface"
            onClick={() =>
              needPro(() =>
                download(jsonSheet(track), `${slug(track.title)}.json`, "application/json"),
              )
            }
          >
            Download JSON{pro ? "" : " · Pro"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "phraseform";
}

