import type { Track } from "@/lib/arrangement/types";

export function barOffset(track: Track, id: string): number {
  let n = 1;
  for (const p of track.phrases) {
    if (p.id === id) return n;
    n += p.bars;
  }
  return n;
}
