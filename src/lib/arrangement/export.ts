import { GENRES, KIND_META, LANE_META, barsToTime } from "./genres";
import { totalBars } from "./generator";
import { LANE_IDS, type Track } from "./types";

export function studioSheet(
  track: Track,
  opts?: { pro?: boolean; licensee?: string },
): string {
  const g = GENRES[track.genre];
  const bars = totalBars(track);
  const lines: string[] = [];
  lines.push(`${track.title.toUpperCase()}`);
  lines.push(`${g.name}  ·  ${track.bpm} BPM  ·  ${track.key}  ·  ${bars} bars  ·  ${barsToTime(bars, track.bpm)}`);
  if (track.inspiredBy) lines.push(`Bones stolen from ${track.inspiredBy} (form only — write your own notes)`);
  else lines.push(`Freehand — not chasing one record`);
  if (opts?.pro) {
    lines.push(
      `PHRASEFORM Pro${opts.licensee ? `  ·  licensed to ${opts.licensee}` : ""}`,
    );
  } else {
    lines.push("PHRASEFORM Free  ·  buy Pro for a clean studio sheet");
  }
  lines.push("");
  lines.push(`Kick: ${g.kick}`);
  lines.push(`Groove: ${g.groove}`);
  lines.push(`Lead: ${g.lead}`);
  lines.push("");
  let cursor = 1;
  track.phrases.forEach((p, i) => {
    const end = cursor + p.bars - 1;
    const on = LANE_IDS.filter((l) => p.lanes[l] !== "off")
      .map((l) => `${LANE_META[l].short} ${p.lanes[l]}`)
      .join(" · ");
    lines.push(`${String(i + 1).padStart(2, "0")}.  bars ${cursor}–${end}   ${KIND_META[p.kind].name.toUpperCase()}  (${p.bars})`);
    lines.push(`    ${on || "(silence)"}`);
    const recipe = g.recipes[p.kind];
    LANE_IDS.forEach((l) => {
      if (p.lanes[l] === "off") return;
      const put = recipe.lanes[l]?.put;
      if (put) lines.push(`    ${LANE_META[l].name}: ${put}`);
    });
    p.notes.forEach((n) => lines.push(`    – ${n}`));
    lines.push("");
    cursor = end + 1;
  });
  lines.push("Build order");
  lines.push("1. Kick + reverse bass 8-bar loop");
  lines.push("2. Lock phrase lengths");
  lines.push("3. First drop");
  lines.push("4. Breakdown / identity");
  lines.push("5. Builds + FX");
  lines.push("6. Intro / outro as mix tools");
  return lines.join("\n");
}

export function jsonSheet(track: Track): string {
  return JSON.stringify(track, null, 2);
}
