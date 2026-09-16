const DEMO = [
  { kind: "Intro", bars: 8, tone: "bg-intro" },
  { kind: "Tease", bars: 8, tone: "bg-break" },
  { kind: "Build", bars: 16, tone: "bg-build" },
  { kind: "Drop A", bars: 32, tone: "bg-drop" },
  { kind: "Break", bars: 16, tone: "bg-break" },
  { kind: "Build", bars: 16, tone: "bg-build" },
  { kind: "Drop B", bars: 32, tone: "bg-drop" },
  { kind: "Outro", bars: 8, tone: "bg-intro" },
] as const;

const LANES: { id: string; color: string; on: (kind: string) => boolean }[] = [
  { id: "Kick", color: "#c45c4a", on: () => true },
  { id: "Rev bass", color: "#8a4540", on: (k) => k !== "Intro" },
  { id: "Perc", color: "#8a8680", on: (k) => k !== "Intro" },
  { id: "FX", color: "#6e6a64", on: (k) => k === "Intro" || k === "Build" || k === "Tease" },
  { id: "Leads", color: "#a8b0bc", on: (k) => k.startsWith("Drop") || k === "Tease" },
];

export function PhraseMapPreview() {
  const total = DEMO.reduce((n, p) => n + p.bars, 0);
  return (
    <figure className="overflow-hidden rounded-lg bg-[#101012] ring-1 ring-border">
      <div className="flex h-11 items-center justify-between gap-3 border-b border-border bg-[#161618] px-4">
        <p className="font-display text-sm uppercase tracking-wide">Arrange</p>
        <p className="font-mono text-[10px] text-muted tabular-nums">
          150 BPM · 4/4 · Fm · 1.1.1 → {total}.1.1
        </p>
      </div>
      <div className="flex overflow-x-auto bg-[#0d0d0f]">
        <div className="w-[5.5rem] shrink-0 border-r border-border bg-[#161618]">
          <div className="h-6 border-b border-border bg-[#1a1a1c]" />
          {LANES.map((l, i) => (
            <div
              key={l.id}
              className="flex h-10 items-center gap-2 border-b border-border/80 px-2"
            >
              <span className="w-2 font-mono text-[8px] text-subtle">{i + 1}</span>
              <span className="h-6 w-1 rounded-sm" style={{ background: l.color }} />
              <span className="truncate font-mono text-[9px] uppercase tracking-wide text-muted">
                {l.id}
              </span>
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex h-6 border-b border-border bg-[#1a1a1c] font-mono text-[8px] text-subtle">
            {DEMO.map((p, i) => (
              <span key={`${p.kind}-${i}`} className="px-1 pt-0.5" style={{ flex: p.bars }}>
                {i === 0 ? "1" : ""}
              </span>
            ))}
          </div>
          {LANES.map((lane, li) => (
            <div key={lane.id} className="flex h-10 border-b border-border/70">
              {DEMO.map((p, i) => (
                <div key={`${lane.id}-${i}`} className="px-px py-0.5" style={{ flex: p.bars }}>
                  {lane.on(p.kind) ? (
                    <div
                      className="relative h-full overflow-hidden rounded-sm"
                      style={{ background: "#0e0e10", boxShadow: `inset 2px 0 0 ${lane.color}`, opacity: p.kind === "Intro" ? 0.55 : 0.95 }}
                    >
                      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 80 24" preserveAspectRatio="none" aria-hidden>
                        <path
                          d={li % 2 === 0 ? "M0 12 L8 4 L16 18 L24 6 L32 16 L40 5 L48 14 L56 7 L64 17 L72 8 L80 12" : "M0 12 L10 8 L20 16 L30 7 L40 15 L50 9 L60 18 L70 6 L80 12"}
                          fill="none"
                          stroke={lane.color}
                          strokeWidth="1.4"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="border-t border-border bg-[#161618] px-4 py-3 text-xs text-pretty text-muted">
        Arrange window as wavetable scopes: kick tok, reverse-bass saw, supersaw leads. 8-bar intro,
        then 16s and 32s — same as the records.
      </figcaption>
    </figure>
  );
}
