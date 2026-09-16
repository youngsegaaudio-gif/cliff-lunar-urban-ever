export const GENRE_IDS = [
  "early",
  "nustyle",
  "euphoric",
  "rawstyle",
  "rawphoric",
  "xtraraw",
  "uptempo",
] as const;

export type GenreId = (typeof GENRE_IDS)[number];

export function isGenreId(value: unknown): value is GenreId {
  return typeof value === "string" && (GENRE_IDS as readonly string[]).includes(value);
}

export const PHRASE_KINDS = [
  "intro",
  "tease",
  "break",
  "build",
  "drop",
  "dropB",
  "breakdown",
  "bridge",
  "outro",
] as const;

export type PhraseKind = (typeof PHRASE_KINDS)[number];

export const LANE_IDS = [
  "kick",
  "bass",
  "perc",
  "fx",
  "atm",
  "lead",
  "chords",
  "vox",
] as const;

export type LaneId = (typeof LANE_IDS)[number];

export const LANE_STATES = ["off", "sparse", "filter", "full", "climax"] as const;
export type LaneState = (typeof LANE_STATES)[number];

export type EnergyPreset = "radio" | "festival" | "extended";
export type PhraseGrid = 4 | 8 | 16 | 32;

export interface Phrase {
  id: string;
  kind: PhraseKind;
  bars: number;
  lanes: Record<LaneId, LaneState>;
  notes: string[];
  energy: 1 | 2 | 3 | 4 | 5;
  label?: string;
}

export interface Track {
  title: string;
  genre: GenreId;
  bpm: number;
  key: string;
  phraseGrid: PhraseGrid;
  targetBars: number;
  vocals: boolean;
  energyPreset: EnergyPreset;
  inspiredBy?: string;
  phrases: Phrase[];
}

export interface LaneRecipe {
  state: LaneState;
  put: string;
}

export interface PhraseRecipe {
  intent: string;
  energy: 1 | 2 | 3 | 4 | 5;
  defaultBars: number;
  lanes: Partial<Record<LaneId, LaneRecipe>>;
  notes: string[];
  howToBuild: string[];
}

export interface ReferenceTrack {
  title: string;
  artist: string;
  why: string;
  /** Section order nicked from the actual record. */
  form: PhraseKind[];
  /** What to steal — not the notes, the bones. */
  steal: string;
}

export interface GenreDef {
  id: GenreId;
  name: string;
  short: string;
  bpm: number;
  bpmRange: [number, number];
  keys: string[];
  kick: string;
  groove: string;
  lead: string;
  vibe: string;
  mixTip: string;
  references: ReferenceTrack[];
  templates: PhraseKind[][];
  recipes: Record<PhraseKind, PhraseRecipe>;
}

export interface NextMove {
  id: string;
  title: string;
  why: string;
  kind: PhraseKind;
  bars: number;
}
