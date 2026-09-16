import { GENRES, KEYS_ALL, pickKey } from "./genres";
import type {
  EnergyPreset,
  GenreId,
  LaneId,
  LaneState,
  Phrase,
  PhraseGrid,
  PhraseKind,
  Track,
} from "./types";
import { LANE_IDS } from "./types";

const DEFAULT_BARS: Record<PhraseKind, number> = {
  intro: 8,
  tease: 8,
  break: 16,
  build: 16,
  drop: 32,
  dropB: 32,
  breakdown: 32,
  bridge: 16,
  outro: 8,
};

const ENERGY_BARS: Record<EnergyPreset, number> = {
  radio: 144,
  festival: 224,
  extended: 288,
};

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `ph_${Math.random().toString(36).slice(2, 10)}`;
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)]!;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function snap(bars: number, grid: number): number {
  const g = Math.min(grid, 4);
  return Math.max(g, Math.round(bars / g) * g);
}

function unitFor(kind: PhraseKind): 4 | 8 {
  return kind === "intro" || kind === "tease" || kind === "outro" ? 4 : 8;
}

function lanesFromRecipe(
  genre: GenreId,
  kind: PhraseKind,
  vocals: boolean,
): Record<LaneId, LaneState> {
  const recipe = GENRES[genre].recipes[kind];
  const lanes = {} as Record<LaneId, LaneState>;
  for (const id of LANE_IDS) {
    const state = recipe.lanes[id]?.state ?? "off";
    if (id === "vox" && !vocals) {
      lanes[id] = "off";
    } else {
      lanes[id] = state;
    }
  }
  return lanes;
}

function notesFromRecipe(
  genre: GenreId,
  kind: PhraseKind,
  vocals: boolean,
  steal?: string,
): string[] {
  const recipe = GENRES[genre].recipes[kind];
  const notes = [...recipe.notes];
  if (steal && (kind === "intro" || kind === "drop" || kind === "breakdown")) {
    notes.unshift(steal);
  }
  if (!vocals) {
    return notes.filter((n) => !/vocal|hook|sung|mc/i.test(n) || /optional|whisper/i.test(n));
  }
  return notes;
}

export function makePhrase(
  genre: GenreId,
  kind: PhraseKind,
  bars: number,
  vocals: boolean,
  steal?: string,
): Phrase {
  const recipe = GENRES[genre].recipes[kind];
  return {
    id: uid(),
    kind,
    bars,
    lanes: lanesFromRecipe(genre, kind, vocals),
    notes: notesFromRecipe(genre, kind, vocals, steal),
    energy: recipe.energy,
  };
}

function defaultBarsFor(genre: GenreId, kind: PhraseKind): number {
  const fromRecipe = GENRES[genre].recipes[kind].defaultBars;
  return fromRecipe || DEFAULT_BARS[kind];
}

function scaleKinds(
  kinds: PhraseKind[],
  genre: GenreId,
  targetBars: number,
  grid: PhraseGrid,
  rng: () => number,
): { kind: PhraseKind; bars: number }[] {
  let parts = kinds.map((kind) => {
    let bars = snap(defaultBarsFor(genre, kind), unitFor(kind));
    if (kind === "intro" && rng() < 0.45) bars = 4;
    return { kind, bars };
  });

  const sum = () => parts.reduce((a, p) => a + p.bars, 0);
  const capFor = (kind: PhraseKind) => {
    if (kind === "intro" || kind === "tease" || kind === "outro") return 16;
    if (kind === "build" || kind === "bridge") return 32;
    return 32;
  };
  const minFor = (kind: PhraseKind) => unitFor(kind);

  let guard = 0;
  while (sum() < targetBars - 8 && guard++ < 24) {
    const growable = parts.filter(
      (p) => p.bars < capFor(p.kind) && p.kind !== "intro" && p.kind !== "tease",
    );
    if (!growable.length) break;
    const prefer = growable.filter((p) => p.kind === "drop" || p.kind === "dropB" || p.kind === "outro");
    const p = pick(prefer.length ? prefer : growable, rng);
    p.bars = snap(p.bars + unitFor(p.kind), unitFor(p.kind));
  }

  guard = 0;
  while (sum() > targetBars && guard++ < 40) {
    const shrinkable = [...parts].reverse().filter((p) => p.bars > minFor(p.kind));
    if (!shrinkable.length) break;
    const prefer = shrinkable.filter((p) =>
      ["outro", "intro", "tease", "bridge", "breakdown"].includes(p.kind),
    );
    const p = prefer[0] ?? shrinkable[0]!;
    p.bars = snap(p.bars - unitFor(p.kind), unitFor(p.kind));
  }

  if (grid === 32) {
    parts = parts.map((p) => {
      if (p.kind === "intro" || p.kind === "tease" || p.kind === "outro") return p;
      if (p.kind === "build" || p.kind === "bridge") {
        return { ...p, bars: p.bars >= 24 ? 32 : 16 };
      }
      return { ...p, bars: Math.max(16, snap(p.bars, 16)) };
    });
    guard = 0;
    while (sum() > targetBars + 16 && guard++ < 20) {
      const p = [...parts].reverse().find((x) => x.bars > 16 && x.kind !== "intro");
      if (!p) break;
      p.bars -= 16;
    }
  }

  return parts;
}

export interface GenerateOpts {
  genre?: GenreId;
  energyPreset?: EnergyPreset;
  targetBars?: number;
  phraseGrid?: PhraseGrid;
  vocals?: boolean;
  bpm?: number;
  key?: string;
  inspired?: boolean;
  seed?: number;
}

export function generateTrack(opts: GenerateOpts = {}): Track {
  const rng = mulberry32(opts.seed ?? Math.floor(Math.random() * 1e9));
  const genreIds = Object.keys(GENRES) as GenreId[];
  const genre = opts.genre ?? pick(genreIds, rng);
  const def = GENRES[genre];
  const energyPreset = opts.energyPreset ?? pick(["radio", "festival", "extended"] as const, rng);
  const targetBars = opts.targetBars ?? ENERGY_BARS[energyPreset];
  const phraseGrid = opts.phraseGrid ?? 8;
  const vocals = opts.vocals ?? rng() > 0.35;
  const emulate = opts.inspired !== false && rng() < 0.7;
  const inspired = emulate ? pick(def.references, rng) : undefined;
  const template = inspired?.form ?? pick(def.templates, rng);
  const scaled = scaleKinds(template, genre, targetBars, phraseGrid, rng);
  const key = opts.key ?? pickKey(rng);
  const bpm = opts.bpm ?? snapBpm(def.bpm + Math.round((rng() - 0.5) * 4), def.bpmRange);

  const steal = inspired
    ? `Nicking the bones from ${inspired.artist} — ${inspired.title}. ${inspired.steal}`
    : undefined;

  const phrases = scaled.map((p) => makePhrase(genre, p.kind, p.bars, vocals, steal));

  const title = titleFor(genre, inspired?.title, rng);

  return {
    title,
    genre,
    bpm,
    key,
    phraseGrid,
    targetBars,
    vocals,
    energyPreset,
    inspiredBy: inspired ? `${inspired.artist} — ${inspired.title}` : undefined,
    phrases,
  };
}

function snapBpm(n: number, range: [number, number]): number {
  return Math.min(range[1], Math.max(range[0], Math.round(n)));
}

function titleFor(genre: GenreId, inspired: string | undefined, rng: () => number): string {
  const a = ["No Mercy", "Headroom", "Afterlife", "Voltage", "Ritual", "Last Light", "Breaker", "False Idol", "Night Raid", "Overdrive"];
  const b = ["Protocol", "Anthem", "Edit", "Weapon", "Hymn", "Reload", "Machine", "Gospel"];
  const stamp = pick(a, rng);
  const tag = pick(b, rng);
  if (inspired && rng() > 0.5) return `${stamp}`;
  return `${stamp} ${tag}`;
}

export function retargetGenre(track: Track, genre: GenreId): Track {
  const def = GENRES[genre];
  return {
    ...track,
    genre,
    bpm: def.bpm,
    key: KEYS_ALL.includes(track.key) ? track.key : def.keys[0]!,
    inspiredBy: undefined,
    phrases: track.phrases.map((p) => ({
      ...makePhrase(genre, p.kind, p.bars, track.vocals),
      id: p.id,
      bars: p.bars,
    })),
  };
}

export function totalBars(track: Track): number {
  return track.phrases.reduce((a, p) => a + p.bars, 0);
}

export const ENERGY_DEFAULTS = ENERGY_BARS;
