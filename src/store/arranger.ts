import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateTrack, makePhrase, retargetGenre, totalBars } from "@/lib/arrangement/generator";
import { applyMove } from "@/lib/arrangement/suggestions";
import type {
  EnergyPreset,
  GenreId,
  LaneId,
  LaneState,
  NextMove,
  Phrase,
  PhraseGrid,
  PhraseKind,
  Track,
} from "@/lib/arrangement/types";

interface SavedTrack {
  id: string;
  savedAt: string;
  track: Track;
}

interface ArrangerState {
  track: Track;
  selectedId: string | null;
  library: SavedTrack[];
  generate: (partial?: Partial<{
    genre: GenreId;
    energyPreset: EnergyPreset;
    targetBars: number;
    phraseGrid: PhraseGrid;
    vocals: boolean;
    bpm: number;
    key: string;
  }>) => void;
  random: () => void;
  setGenre: (genre: GenreId) => void;
  patchTrack: (patch: Partial<Track>) => void;
  select: (id: string | null) => void;
  updatePhrase: (id: string, patch: Partial<Phrase>) => void;
  setLane: (id: string, lane: LaneId, state: LaneState) => void;
  setKind: (id: string, kind: PhraseKind) => void;
  setBars: (id: string, bars: number) => void;
  removePhrase: (id: string) => void;
  duplicatePhrase: (id: string) => void;
  movePhrase: (id: string, dir: -1 | 1) => void;
  appendMove: (move: NextMove) => void;
  insertPhrase: (kind: PhraseKind, afterId?: string) => void;
  saveLibrary: () => void;
  loadLibrary: (id: string) => void;
  removeLibrary: (id: string) => void;
}

function withSelect(track: Track, preferId?: string | null): { track: Track; selectedId: string | null } {
  const selectedId =
    (preferId && track.phrases.some((p) => p.id === preferId)
      ? preferId
      : track.phrases[0]?.id) ?? null;
  return { track, selectedId };
}

const first = generateTrack({
  genre: "euphoric",
  energyPreset: "festival",
  vocals: true,
  seed: 150,
});

export const useArranger = create<ArrangerState>()(
  persist(
    (set, get) => ({
      ...withSelect(first),
      library: [],
      generate: (partial) => {
        const cur = get().track;
        const track = generateTrack({
          genre: partial?.genre ?? cur.genre,
          energyPreset: partial?.energyPreset ?? cur.energyPreset,
          targetBars: partial?.targetBars ?? cur.targetBars,
          phraseGrid: partial?.phraseGrid ?? cur.phraseGrid,
          vocals: partial?.vocals ?? cur.vocals,
          bpm: partial?.bpm,
          key: partial?.key,
        });
        set(withSelect(track));
      },
      random: () => set(withSelect(generateTrack({}))),
      setGenre: (genre) => {
        const track = retargetGenre(get().track, genre);
        set({ track });
      },
      patchTrack: (patch) => set({ track: { ...get().track, ...patch } }),
      select: (id) => set({ selectedId: id }),
      updatePhrase: (id, patch) => {
        const track = get().track;
        set({
          track: {
            ...track,
            phrases: track.phrases.map((p) => (p.id === id ? { ...p, ...patch } : p)),
          },
        });
      },
      setLane: (id, lane, state) => {
        const track = get().track;
        set({
          track: {
            ...track,
            phrases: track.phrases.map((p) =>
              p.id === id ? { ...p, lanes: { ...p.lanes, [lane]: state } } : p,
            ),
          },
        });
      },
      setKind: (id, kind) => {
        const { track } = get();
        const existing = track.phrases.find((p) => p.id === id);
        if (!existing) return;
        const fresh = makePhrase(track.genre, kind, existing.bars, track.vocals);
        set({
          track: {
            ...track,
            phrases: track.phrases.map((p) =>
              p.id === id ? { ...fresh, id, bars: existing.bars } : p,
            ),
          },
        });
      },
      setBars: (id, bars) => {
        const track = get().track;
        set({
          track: {
            ...track,
            phrases: track.phrases.map((p) => (p.id === id ? { ...p, bars } : p)),
          },
        });
      },
      removePhrase: (id) => {
        const track = get().track;
        const phrases = track.phrases.filter((p) => p.id !== id);
        const next = { ...track, phrases };
        const selectedId =
          get().selectedId === id ? (phrases[phrases.length - 1]?.id ?? null) : get().selectedId;
        set({ track: next, selectedId });
      },
      duplicatePhrase: (id) => {
        const track = get().track;
        const idx = track.phrases.findIndex((p) => p.id === id);
        if (idx < 0) return;
        const src = track.phrases[idx]!;
        const copy: Phrase = {
          ...src,
          id: crypto.randomUUID(),
          lanes: { ...src.lanes },
          notes: [...src.notes],
        };
        const phrases = [...track.phrases];
        phrases.splice(idx + 1, 0, copy);
        set({ track: { ...track, phrases }, selectedId: copy.id });
      },
      movePhrase: (id, dir) => {
        const track = get().track;
        const idx = track.phrases.findIndex((p) => p.id === id);
        const next = idx + dir;
        if (idx < 0 || next < 0 || next >= track.phrases.length) return;
        const phrases = [...track.phrases];
        const [item] = phrases.splice(idx, 1);
        phrases.splice(next, 0, item!);
        set({ track: { ...track, phrases } });
      },
      appendMove: (move) => {
        const track = get().track;
        if (totalBars(track) >= 320) return;
        const phrase = applyMove(track, move);
        set({
          track: { ...track, phrases: [...track.phrases, phrase] },
          selectedId: phrase.id,
        });
      },
      insertPhrase: (kind, afterId) => {
        const track = get().track;
        const phrase = makePhrase(track.genre, kind, track.phraseGrid, track.vocals);
        const idx = afterId ? track.phrases.findIndex((p) => p.id === afterId) : track.phrases.length - 1;
        const phrases = [...track.phrases];
        phrases.splice(idx + 1, 0, phrase);
        set({ track: { ...track, phrases }, selectedId: phrase.id });
      },
      saveLibrary: () => {
        const track = get().track;
        const entry: SavedTrack = {
          id: crypto.randomUUID(),
          savedAt: new Date().toISOString(),
          track: JSON.parse(JSON.stringify(track)) as Track,
        };
        set({ library: [entry, ...get().library].slice(0, 40) });
      },
      loadLibrary: (id) => {
        const entry = get().library.find((x) => x.id === id);
        if (!entry) return;
        set(withSelect(JSON.parse(JSON.stringify(entry.track)) as Track));
      },
      removeLibrary: (id) => set({ library: get().library.filter((x) => x.id !== id) }),
    }),
    { name: "phraseform-arranger", skipHydration: true },
  ),
);
