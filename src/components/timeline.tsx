import { KIND_META, LANE_META, barsToTime, shortKey } from "@/lib/arrangement/genres";
import { totalBars } from "@/lib/arrangement/generator";
import type { LaneId, LaneState, Phrase, PhraseKind } from "@/lib/arrangement/types";
import { LANE_IDS } from "@/lib/arrangement/types";
import { cn } from "@/lib/utils";
import { useArranger } from "@/store/arranger";
import { barOffset } from "./timeline-helpers";

const KIND_TONE: Record<PhraseKind, string> = {
  intro: "bg-intro",
  tease: "bg-break/60",
  break: "bg-break",
  build: "bg-build",
  drop: "bg-drop",
  dropB: "bg-drop/80",
  breakdown: "bg-break/90",
  bridge: "bg-build/50",
  outro: "bg-intro/80",
};

const LANE_COLOR: Record<LaneId, string> = {
  kick: "#c45c4a",
  bass: "#8a4540",
  perc: "#8a8680",
  fx: "#6e6a64",
  atm: "#7d8b82",
  lead: "#a8b0bc",
  chords: "#8b93a0",
  vox: "#c4b8a8",
};

const STATE_OPACITY: Record<LaneState, number> = {
  off: 0,
  sparse: 0.42,
  filter: 0.58,
  full: 0.88,
  climax: 1,
};

const PX = 14;
const HEAD = 124;
const LANE_H = 48;
const ARR_H = 32;
const RULER_H = 28;
const CLIP_HEAD = 12;

export function Timeline() {
  const track = useArranger((s) => s.track);
  const selectedId = useArranger((s) => s.selectedId);
  const select = useArranger((s) => s.select);
  const bars = totalBars(track);
  const width = Math.max(bars * PX, 480);
  const selected = track.phrases.find((p) => p.id === selectedId);
  const selStart = selected ? barOffset(track, selected.id) : 1;
  const selEnd = selected ? selStart + selected.bars : 1;
  const playhead = (selStart - 1) * PX;
  const loopLeft = playhead;
  const loopW = selected ? selected.bars * PX : 0;

  return (
    <div className="flex min-h-[22rem] min-w-0 flex-1 flex-col overflow-hidden rounded-lg bg-[#101012] ring-1 ring-border">
      <Transport
        bpm={track.bpm}
        keySig={track.key}
        bars={bars}
        pos={selStart}
        loopEnd={selEnd}
        time={barsToTime(bars, track.bpm)}
        onStart={() => {
          const first = track.phrases[0];
          if (first) select(first.id);
        }}
      />

      <div className="min-h-0 min-w-0 flex-1 overflow-auto">
        <div className="flex min-w-max">
          <div
            className="sticky left-0 z-30 shrink-0 border-r border-border bg-[#161618]"
            style={{ width: HEAD }}
          >
            <div className="border-b border-border bg-[#1a1a1c]" style={{ height: RULER_H }} />
            <div
              className="flex items-center gap-2 border-b border-border px-2"
              style={{ height: ARR_H }}
            >
              <span className="h-3 w-0.5 rounded-sm bg-fg/70" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted">WT / Arr</span>
            </div>
            {LANE_IDS.map((id, i) => (
              <TrackHeader key={id} id={id} index={i} />
            ))}
          </div>

          <div className="relative bg-[#0d0d0f]" style={{ width }}>
            <Ruler bars={bars} />

            <div
              className="pointer-events-none absolute z-10 bg-fg/10"
              style={{ left: loopLeft, width: loopW, top: 0, bottom: 0 }}
            />
            <div
              className="pointer-events-none absolute top-0 z-20 h-1.5 bg-fg/45"
              style={{ left: loopLeft, width: loopW }}
            />
            <Locator x={loopLeft} />
            <Locator x={loopLeft + loopW} />

            <div className="pointer-events-none absolute inset-0 top-0 z-[5]">
              {Array.from({ length: bars + 1 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute top-0 bottom-0",
                    i % 16 === 0
                      ? "w-px bg-border"
                      : i % 4 === 0
                        ? "w-px bg-border/70"
                        : "w-px bg-border/25",
                  )}
                  style={{ left: i * PX }}
                />
              ))}
            </div>

            <div
              className="pointer-events-none absolute top-0 bottom-0 z-20 w-px bg-fg"
              style={{ left: playhead }}
            />

            <div className="relative border-b border-border/80" style={{ height: ARR_H }}>
              {track.phrases.map((p) => {
                const start = barOffset(track, p.id);
                const on = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => select(p.id)}
                    className={cn(
                      "absolute top-1 overflow-hidden rounded-sm text-left ring-1",
                      KIND_TONE[p.kind],
                      on ? "z-10 ring-fg" : "ring-black/50 hover:ring-fg/40",
                    )}
                    style={{
                      left: (start - 1) * PX + 1,
                      width: Math.max(p.bars * PX - 2, 8),
                      height: ARR_H - 8,
                    }}
                  >
                    <span className="block truncate px-1.5 font-display text-[10px] uppercase leading-[24px] tracking-wide text-fg">
                      {KIND_META[p.kind].name}
                      <span className="ml-1 font-mono text-[9px] text-fg/70">{p.bars}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {LANE_IDS.map((lane) => (
              <div
                key={lane}
                className="relative border-b border-border/60"
                style={{ height: LANE_H, background: "rgba(255,255,255,0.015)" }}
              >
                {track.phrases.map((p) => (
                  <LaneClip
                    key={p.id + lane}
                    phrase={p}
                    lane={lane}
                    start={barOffset(track, p.id)}
                    selected={p.id === selectedId}
                    onSelect={() => select(p.id)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex h-8 shrink-0 items-center gap-3 border-t border-border bg-[#161618] px-3 font-mono text-[10px] uppercase tracking-wider text-subtle">
        <span>Wavetable</span>
        <span className="text-border">/</span>
        <span>Osc 256</span>
        <span className="text-border">/</span>
        <span>Snap 4</span>
        <span className="text-border">/</span>
        <span>Grid 1/4</span>
        <span className="ml-auto tabular-nums text-muted">
          {selected
            ? `${fmtPos(selStart)} – ${fmtPos(selEnd)} · ${selected.bars} bars`
            : `${bars} bars`}
        </span>
      </div>
    </div>
  );
}

function Transport({
  bpm,
  keySig,
  bars,
  pos,
  loopEnd,
  time,
  onStart,
}: {
  bpm: number;
  keySig: string;
  bars: number;
  pos: number;
  loopEnd: number;
  time: string;
  onStart: () => void;
}) {
  return (
    <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-[#161618] px-3">
      <p className="font-display text-sm uppercase tracking-wide">Arrange</p>
      <div className="flex items-center overflow-hidden rounded-md ring-1 ring-border">
        <button
          type="button"
          onClick={onStart}
          className="h-8 px-2.5 font-mono text-[10px] uppercase text-muted hover:bg-surface-2 hover:text-fg"
        >
          Start
        </button>
        <span className="h-8 px-2.5 font-mono text-[10px] uppercase leading-8 text-subtle ring-1 ring-border">
          Cycle
        </span>
      </div>
      <p className="font-mono text-[13px] tabular-nums text-fg">{fmtPos(pos)}</p>
      <p className="font-mono text-[11px] text-muted tabular-nums">
        {bpm} BPM · 4/4 · {shortKey(keySig)}
      </p>
      <p className="ml-auto font-mono text-[11px] text-muted tabular-nums">
        Loop {fmtPos(pos)}–{fmtPos(loopEnd)} · {bars} bars · {time}
      </p>
    </div>
  );
}

function TrackHeader({ id, index }: { id: LaneId; index: number }) {
  return (
    <div
      className="flex items-center gap-2 border-b border-border/80 px-2"
      style={{ height: LANE_H }}
      title={LANE_META[id].hint}
    >
      <span className="w-3 shrink-0 font-mono text-[9px] tabular-nums text-subtle">{index + 1}</span>
      <span
        className="h-8 w-1 shrink-0 rounded-sm"
        style={{ background: LANE_COLOR[id] }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-[10px] uppercase tracking-wide text-fg">
          {LANE_META[id].name}
        </p>
        <MiniOsc lane={id} color={LANE_COLOR[id]} />
      </div>
    </div>
  );
}

function MiniOsc({ lane, color }: { lane: LaneId; color: string }) {
  const w = 56;
  const h = 14;
  const n = 28;
  const ys = Array.from({ length: n }, (_, i) =>
    sampleLane(lane, i / (n - 1), 4, "full", "drop", 3),
  );
  const d = polyline(w, h, ys);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="mt-0.5 block" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function LaneClip({
  phrase,
  lane,
  start,
  selected,
  onSelect,
}: {
  phrase: Phrase;
  lane: LaneId;
  start: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const state = phrase.lanes[lane];
  if (state === "off") return null;
  const w = Math.max(phrase.bars * PX - 3, 6);
  const color = LANE_COLOR[lane];
  const frames = state === "climax" ? 5 : state === "sparse" ? 2 : 3;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "absolute overflow-hidden rounded-sm text-left ring-1",
        selected ? "z-10 ring-fg" : "ring-black/50 hover:ring-fg/35",
      )}
      style={{
        left: (start - 1) * PX + 1,
        width: w,
        top: 3,
        height: LANE_H - 6,
        opacity: STATE_OPACITY[state],
        background: "#0e0e10",
        boxShadow: `inset 3px 0 0 ${color}`,
      }}
      title={`${LANE_META[lane].name}: ${state}`}
    >
      <span
        className="flex h-3 items-center justify-between gap-1 px-1.5 font-mono text-[8px] uppercase leading-none tracking-wide"
        style={{ color, background: "rgba(255,255,255,0.04)" }}
      >
        <span className="truncate">
          {LANE_META[lane].short}
          {state === "filter" ? " · lp" : state === "climax" ? " · wt+" : ""}
        </span>
        <span className="tabular-nums text-[7px] opacity-70">{wtIndex(start, lane)}</span>
      </span>
      <WavetableScope
        lane={lane}
        bars={phrase.bars}
        start={start}
        kind={phrase.kind}
        state={state}
        width={w}
        height={LANE_H - 6 - CLIP_HEAD}
        color={color}
        frames={frames}
      />
    </button>
  );
}

function WavetableScope({
  lane,
  bars,
  start,
  kind,
  width,
  height,
  state,
  color,
  frames,
}: {
  lane: LaneId;
  bars: number;
  start: number;
  kind: PhraseKind;
  width: number;
  height: number;
  state: LaneState;
  color: string;
  frames: number;
}) {
  const n = Math.min(120, Math.max(32, Math.floor(width)));
  const mid = height / 2;
  const seed = start * 17 + LANE_IDS.indexOf(lane) * 3;
  const layers = Array.from({ length: frames }, (_, f) => {
    const morphBias = (f / Math.max(frames - 1, 1) - 0.5) * 0.28;
    const ys = Array.from({ length: n }, (_, i) =>
      sampleLane(lane, i / (n - 1), bars, state, kind, seed, morphBias),
    );
    return { d: polyline(width, height, ys, f * 1.4), f };
  });
  const fillD = area(width, height, Array.from({ length: n }, (_, i) =>
    sampleLane(lane, i / (n - 1), bars, state, kind, seed, 0),
  ));
  const gid = `wtg-${lane}-${start}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1={mid} x2={width} y2={mid} stroke={color} strokeOpacity="0.18" strokeWidth="1" />
      {Array.from({ length: 4 }).map((_, i) => (
        <line
          key={i}
          x1={(width * (i + 1)) / 5}
          y1="0"
          x2={(width * (i + 1)) / 5}
          y2={height}
          stroke={color}
          strokeOpacity="0.08"
        />
      ))}
      <path d={fillD} fill={`url(#${gid})`} />
      {layers.map((layer) => (
        <path
          key={layer.f}
          d={layer.d}
          fill="none"
          stroke={color}
          strokeWidth={layer.f === Math.floor(frames / 2) ? 1.4 : 0.9}
          strokeOpacity={layer.f === Math.floor(frames / 2) ? 0.95 : 0.28}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function polyline(width: number, height: number, ys: number[], yShift = 0): string {
  const mid = height / 2 + yShift;
  const amp = height * 0.4;
  return ys
    .map((y, i) => {
      const x = (i / Math.max(ys.length - 1, 1)) * width;
      const cmd = i === 0 ? "M" : "L";
      return `${cmd}${x.toFixed(2)} ${(mid - y * amp).toFixed(2)}`;
    })
    .join(" ");
}

function area(width: number, height: number, ys: number[]): string {
  const line = polyline(width, height, ys);
  const mid = height / 2;
  return `${line} L${width.toFixed(2)} ${mid.toFixed(2)} L0 ${mid.toFixed(2)} Z`;
}

function wtIndex(start: number, lane: LaneId): string {
  const n = (start * 7 + LANE_IDS.indexOf(lane) * 13) % 256;
  return String(n).padStart(3, "0");
}

function frac(n: number): number {
  return n - Math.floor(n);
}
function sine(p: number): number {
  return Math.sin(p * Math.PI * 2);
}
function saw(p: number): number {
  return frac(p) * 2 - 1;
}
function square(p: number): number {
  return frac(p) < 0.5 ? 1 : -1;
}
function noise(i: number, seed: number): number {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

function sampleLane(
  lane: LaneId,
  t: number,
  bars: number,
  state: LaneState,
  kind: PhraseKind,
  seed: number,
  morphBias = 0,
): number {
  const bar = t * bars;
  const inBar = frac(bar);
  const inBeat = frac(inBar * 4);
  const amp = state === "sparse" ? 0.42 : state === "climax" ? 1 : 0.78;
  const filt = state === "filter" ? 0.72 : 0;
  const rise = kind === "build" || kind === "tease" ? t : kind === "dropB" ? 0.65 : 0.4;
  const morph = Math.min(1, Math.max(0, rise + morphBias));
  let y = 0;

  if (lane === "kick") {
    const env = Math.exp(-inBeat * 8.5);
    const body = sine(inBeat * 3.2) * env;
    const click = Math.exp(-inBeat * 36) * noise(Math.floor(bar * 4), seed) * 0.35;
    y = body * (1 - filt * 0.4) + sine(inBeat * 2) * env * filt * 0.4 + click * (1 - filt);
  } else if (lane === "bass") {
    const off = inBeat > 0.5 ? (inBeat - 0.5) / 0.5 : 0;
    if (off <= 0) y = 0;
    else {
      const env = Math.pow(off, 0.5);
      y = (saw(off * 2.4) * (1 - filt) + sine(off * 2.4) * filt) * env;
    }
  } else if (lane === "perc") {
    const burst = inBeat < 0.12 || (inBeat > 0.48 && inBeat < 0.58);
    y = burst ? noise(t * 80 + seed, seed) * Math.exp(-frac(inBeat * 2) * 10) : 0;
  } else if (lane === "fx") {
    const nse = noise(t * 40 + seed, seed);
    const tone = sine(t * bars * 0.7);
    y = (nse * morph + tone * (1 - morph)) * (0.35 + t * 0.65);
  } else if (lane === "atm") {
    y = sine(t * 1.6) * 0.55 + sine(t * 3.1 + 0.4) * 0.25;
  } else if (lane === "lead") {
    const p = t * bars * 2.2;
    const wt = saw(p) * (1 - morph) + square(p) * morph;
    const detune = wt + saw(p * 1.012) * 0.32 + saw(p * 0.988) * 0.26;
    y = detune * (1 - filt) + sine(p) * filt;
  } else if (lane === "chords") {
    const p = t * bars * 1.4;
    y = sine(p) * 0.55 + sine(p * 1.5) * 0.28 + sine(p * 2) * 0.18 * (1 - filt);
  } else {
    const p = t * bars * 1.8;
    y = sine(p) * (0.6 + 0.25 * sine(p * 0.33)) * (0.5 + 0.5 * Math.abs(sine(t * 2)));
  }

  return Math.max(-1, Math.min(1, y * amp));
}

function Ruler({ bars }: { bars: number }) {
  const marks = [];
  for (let b = 1; b <= bars; b += 4) marks.push(b);
  return (
    <div className="relative border-b border-border bg-[#1a1a1c]" style={{ height: RULER_H }}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "absolute bottom-0 w-px bg-border",
            i % 4 === 0 ? "h-2.5" : "h-1.5 opacity-50",
          )}
          style={{ left: i * PX }}
        />
      ))}
      {marks.map((b) => (
        <span
          key={b}
          className={cn(
            "absolute top-0.5 font-mono tabular-nums",
            (b - 1) % 16 === 0 ? "text-[10px] text-fg" : "text-[9px] text-muted",
          )}
          style={{ left: (b - 1) * PX + 3 }}
        >
          {b}
        </span>
      ))}
    </div>
  );
}

function Locator({ x }: { x: number }) {
  return (
    <div
      className="pointer-events-none absolute top-0 z-20 h-0 w-0 border-x-4 border-t-[6px] border-x-transparent border-t-fg"
      style={{ left: x, transform: "translateX(-4px)" }}
    />
  );
}

function fmtPos(bar: number): string {
  return `${bar}.1.1`;
}
