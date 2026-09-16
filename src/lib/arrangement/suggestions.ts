import { GENRES, KIND_META } from "./genres";
import { makePhrase, totalBars } from "./generator";
import { SOUND } from "./sound";
import type { NextMove, Phrase, PhraseKind, Track } from "./types";

export function suggestNext(track: Track): NextMove[] {
  const last = track.phrases[track.phrases.length - 1];
  const bars = totalBars(track);
  const remaining = track.targetBars - bars;
  const g = GENRES[track.genre];
  const grid = track.phraseGrid <= 8 ? 8 : track.phraseGrid;
  const moves: NextMove[] = [];

  const add = (kind: PhraseKind, barsN: number, title: string, why: string) => {
    moves.push({ id: `${kind}-${barsN}-${title}`, kind, title, why, bars: barsN });
  };

  if (!last) {
    add("intro", 8, "4–8 bar intro", "Start like the records: FX pickup or filtered kick, then grow it.");
    add("intro", 4, "4-bar FX pickup", "Bars 1–4 empty-ish. Kick from 5.");
    add("build", 16, "Skip the intro — cold build", "Xtra-raw and uptempo often just hit.");
    return moves.slice(0, 4);
  }

  if (remaining <= 24 && last.kind !== "outro") {
    add("outro", 8, "Write the outro", "Strip to kick + reverse bass so the next DJ can actually mix.");
  }

  switch (last.kind) {
    case "intro":
      add("tease", 8, "Tease the identity", "One motif, then save the rest for the drop.");
      add("build", 16, "Straight into a build", "Classic raw / xtra-raw move.");
      add("break", 16, "Open the groove", "Kick + reverse bass at drop level, no lead yet.");
      break;
    case "tease":
      add("build", 16, "Build into Drop A", "Last 4 empty. Then slam.");
      add("breakdown", 32, "Sing first", "Euphoric / rawphoric sometimes sing before they hit.");
      break;
    case "break":
      add("build", 16, "Build", "Empty the low end, then slam.");
      add("drop", 32, "Drop without a build", "Old-school. Works if the break already has teeth.");
      break;
    case "build":
      add("drop", last.bars === 32 ? 32 : grid, "Drop A", g.recipes.drop.intent);
      add("build", 16, "Another 16 on the build", "Only if the first 16 isn't already busy.");
      break;
    case "drop":
      add("dropB", 32, "Drop B — change something", "Kick switch, extra screech, or a second riff. Don't clone A.");
      add("breakdown", g.recipes.breakdown.defaultBars, "Breakdown", g.recipes.breakdown.intent);
      add("bridge", 16, "Short bridge", "A breath, not a second ballad.");
      break;
    case "dropB":
      add("breakdown", g.recipes.breakdown.defaultBars, "Breakdown", "You've earned the reset.");
      add("bridge", 16, "Bridge into another drop", "Keep the pressure if this is xtra raw / uptempo.");
      add("outro", 16, "Outro", "If the story's told, mix out.");
      break;
    case "breakdown":
      add("build", 16, "Biggest build", "Last 4 empty. Second drop has to be the loudest thing that happens.");
      add("tease", 16, "Re-tease the melody", "Remind them what's coming.");
      break;
    case "bridge":
      add("build", 16, "Build", KIND_META.build.dj);
      add("drop", 32, "Second drop", "New kick or new riff — not Drop A again.");
      break;
    case "outro":
      add("outro", 16, "Extend the mix-out", "Another 16 of kick + reverse bass for long blends.");
      break;
  }

  // Genre-specific nudges
  if (track.genre === "xtraraw" || track.genre === "uptempo") {
    if (last.kind === "drop" || last.kind === "dropB") {
      add("dropB", 16, "Another 16 of kick pressure", "Short phrases. Change the kick pattern — don't write a ballad.");
    }
  }
  if (track.genre === "euphoric" || track.genre === "rawphoric") {
    if (last.kind === "intro") {
      add("breakdown", 32, "Sing first", "Put the vocal up front, then punish them.");
    }
  }

  const seen = new Set<string>();
  return moves
    .filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    })
    .slice(0, 4);
}

export function applyMove(track: Track, move: NextMove): Phrase {
  return makePhrase(track.genre, move.kind, move.bars, track.vocals);
}

export function howToBuildTrack(track: Track): string[] {
  const g = GENRES[track.genre];
  const steal = track.inspiredBy
    ? `You're nicking the skeleton from ${track.inspiredBy} — not the notes. Kick first.`
    : `Freehand in ${g.name}. No one record to chase. Kick first.`;
  return [
    steal,
    `Session: ${track.bpm} BPM, 4/4, ${track.key}. 4-bar grid. Intros 4 or 8; drops 16–32.`,
    `Groove: ${g.groove}`,
    `8-bar kick + reverse-bass (or kick-only) loop. Don't write the lead yet.`,
    `Map the phrases on this timeline. Lock lengths before you disappear into sound design.`,
    `Serum or Spire from Init. ${SOUND[track.genre].lead.name}. High-pass ~250 Hz, duck it to the kick.`,
    `EQ / etch: ${SOUND[track.genre].lead.eq}`,
    `If there's a breakdown, write it as a song: chords + melody${track.vocals ? " + vocal" : ""}.`,
    `Sidechain leads, bass and pads to the kick. Clap sits after the kick, not on it.`,
    `Last: intro/outro as DJ tools. ${g.mixTip}`,
  ];
}
