import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Button, S as formatMoney, b as useCommerce, g as SiteShell, h as PageKicker, i as GENRE_LIST } from "./router-DDApkDmv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dw3947tx.js
var import_jsx_runtime = require_jsx_runtime();
var DEMO = [
	{
		kind: "Intro",
		bars: 8,
		tone: "bg-intro"
	},
	{
		kind: "Tease",
		bars: 8,
		tone: "bg-break"
	},
	{
		kind: "Build",
		bars: 16,
		tone: "bg-build"
	},
	{
		kind: "Drop A",
		bars: 32,
		tone: "bg-drop"
	},
	{
		kind: "Break",
		bars: 16,
		tone: "bg-break"
	},
	{
		kind: "Build",
		bars: 16,
		tone: "bg-build"
	},
	{
		kind: "Drop B",
		bars: 32,
		tone: "bg-drop"
	},
	{
		kind: "Outro",
		bars: 8,
		tone: "bg-intro"
	}
];
var LANES = [
	{
		id: "Kick",
		color: "#c45c4a",
		on: () => true
	},
	{
		id: "Rev bass",
		color: "#8a4540",
		on: (k) => k !== "Intro"
	},
	{
		id: "Perc",
		color: "#8a8680",
		on: (k) => k !== "Intro"
	},
	{
		id: "FX",
		color: "#6e6a64",
		on: (k) => k === "Intro" || k === "Build" || k === "Tease"
	},
	{
		id: "Leads",
		color: "#a8b0bc",
		on: (k) => k.startsWith("Drop") || k === "Tease"
	}
];
function PhraseMapPreview() {
	const total = DEMO.reduce((n, p) => n + p.bars, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "overflow-hidden rounded-lg bg-[#101012] ring-1 ring-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-11 items-center justify-between gap-3 border-b border-border bg-[#161618] px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm uppercase tracking-wide",
					children: "Arrange"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[10px] text-muted tabular-nums",
					children: [
						"150 BPM · 4/4 · Fm · 1.1.1 → ",
						total,
						".1.1"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex overflow-x-auto bg-[#0d0d0f]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-[5.5rem] shrink-0 border-r border-border bg-[#161618]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 border-b border-border bg-[#1a1a1c]" }), LANES.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-10 items-center gap-2 border-b border-border/80 px-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-2 font-mono text-[8px] text-subtle",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-6 w-1 rounded-sm",
								style: { background: l.color }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-mono text-[9px] uppercase tracking-wide text-muted",
								children: l.id
							})
						]
					}, l.id))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-6 border-b border-border bg-[#1a1a1c] font-mono text-[8px] text-subtle",
						children: DEMO.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-1 pt-0.5",
							style: { flex: p.bars },
							children: i === 0 ? "1" : ""
						}, `${p.kind}-${i}`))
					}), LANES.map((lane, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 border-b border-border/70",
						children: DEMO.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-px py-0.5",
							style: { flex: p.bars },
							children: lane.on(p.kind) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative h-full overflow-hidden rounded-sm",
								style: {
									background: "#0e0e10",
									boxShadow: `inset 2px 0 0 ${lane.color}`,
									opacity: p.kind === "Intro" ? .55 : .95
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "absolute inset-0 h-full w-full",
									viewBox: "0 0 80 24",
									preserveAspectRatio: "none",
									"aria-hidden": true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: li % 2 === 0 ? "M0 12 L8 4 L16 18 L24 6 L32 16 L40 5 L48 14 L56 7 L64 17 L72 8 L80 12" : "M0 12 L10 8 L20 16 L30 7 L40 15 L50 9 L60 18 L70 6 L80 12",
										fill: "none",
										stroke: lane.color,
										strokeWidth: "1.4"
									})
								})
							}) : null
						}, `${lane.id}-${i}`))
					}, lane.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "border-t border-border bg-[#161618] px-4 py-3 text-xs text-pretty text-muted",
				children: "Arrange window as wavetable scopes: kick tok, reverse-bass saw, supersaw leads. 8-bar intro, then 16s and 32s — same as the records."
			})
		]
	});
}
function LandingPage() {
	const price = useCommerce((s) => s.price);
	const currency = useCommerce((s) => s.currency);
	const pro = useCommerce((s) => Boolean(s.licenseKey));
	const setUnlockOpen = useCommerce((s) => s.setUnlockOpen);
	const money = formatMoney(price, currency);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		active: "home",
		width: "wide",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageKicker, { children: "Hardstyle arrangement studio" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-wide md:text-7xl",
				children: "Write the map before you write the kick"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-xl text-base text-pretty text-muted md:text-lg",
				children: "Most maps steal the bones from a real record — Imaginary, FTS, TOO COLD — then you write your own notes. Looks like a DAW arrange window: 4–8 bar intros, then 16s and 32s, with what actually sits on kick, reverse bass, leads, and vocals."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						children: "Open the studio"
					})
				}), pro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pricing",
						children: "You're on Pro"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					size: "lg",
					onClick: () => setUnlockOpen(true),
					children: ["Buy Pro · ", money]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhraseMapPreview, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-10 grid grid-cols-3 gap-3 border-y border-border py-6",
				children: [
					{
						k: "200+",
						v: "Reference tracks behind the kits"
					},
					{
						k: "4–8",
						v: "Bar intros, like a real session"
					},
					{
						k: "200–300",
						v: "Bars per festival map"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "font-display text-3xl uppercase tracking-wide md:text-4xl",
					children: s.k
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 text-xs text-muted md:text-sm",
					children: s.v
				})] }, s.v))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-14 grid gap-3 md:grid-cols-2",
				children: PILLARS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-5 ring-1 ring-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl uppercase tracking-wide",
						children: f.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-pretty text-muted",
						children: f.body
					})]
				}, f.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl uppercase tracking-wide",
						children: "Seven kits"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/genres",
						className: "font-display text-sm uppercase tracking-wide text-muted hover:text-fg",
						children: "All genres"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
					children: GENRE_LIST.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/genres/$id",
						params: { id: g.id },
						className: "block rounded-lg bg-surface px-4 py-3 ring-1 ring-border hover:bg-surface-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display uppercase tracking-wide",
							children: g.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								g.bpmRange[0],
								"–",
								g.bpmRange[1],
								" BPM · ",
								g.short
							]
						})]
					}) }, g.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 rounded-xl bg-surface p-6 ring-1 ring-border md:flex md:items-center md:justify-between md:gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl uppercase tracking-wide",
					children: "Pro is a one-time license"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-md text-sm text-pretty text-muted",
					children: [
						"Free runs the whole studio. Pro removes the watermark, unlocks JSON backups, and keeps a library of maps. ",
						money,
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex shrink-0 flex-col gap-2 md:mt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pricing",
							children: "See pricing"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/method",
							children: "Read the method"
						})
					})]
				})]
			})
		]
	});
}
var PILLARS = [
	{
		title: "From the records",
		body: "Seven kits pulled from a pile of hardstyle, raw, and uptempo records — phrase lengths, kick language, and what actually sits in a drop. About 7 in 10 maps follow a real track's section order."
	},
	{
		title: "DAW arrange",
		body: "A timeline with lanes, 4-bar grid, and markers. Start with a 4-bar FX pickup or 8-bar filtered kick, then grow the mix-in."
	},
	{
		title: "Serum / Spire",
		body: "From Init, not a factory preset. Each kit writes Serum and Spire knobs for leads and chords, plus kick, clap, reverse bass, EQ / etch, and a mix that works in any DAW."
	},
	{
		title: "Studio sheet",
		body: "Export a bar-numbered sheet. Build it in the DAW. The music you write from the map is yours."
	}
];
var SplitComponent = LandingPage;
//#endregion
export { SplitComponent as component };
