import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as SiteShell, h as PageKicker, i as GENRE_LIST, r as GENRES } from "./router-DDApkDmv.mjs";
import { i as SOUND, o as SPIRE_KNOBS } from "./init-synth-CXvZTryU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/genres-page-TR_xAX77.js
var import_jsx_runtime = require_jsx_runtime();
function GenresPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		active: "genres",
		width: "wide",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageKicker, { children: "Kits" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-2xl font-display text-5xl uppercase leading-[0.95] tracking-wide",
				children: "Seven hardstyle genres, mapped"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-base text-pretty text-muted",
				children: "Each kit comes from sitting with a pile of records in that lane — BPM, kick language, groove, lead — including the 4–8 bar intros those sessions actually start with. Generate usually steals a real track's section order."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-10 grid gap-3 md:grid-cols-2",
				children: GENRE_LIST.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/genres/$id",
					params: { id: g.id },
					className: "block h-full rounded-xl bg-surface p-5 ring-1 ring-border hover:bg-surface-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[10px] uppercase tracking-wider text-subtle",
							children: [
								g.bpmRange[0],
								"–",
								g.bpmRange[1],
								" BPM"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl uppercase tracking-wide",
							children: g.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-pretty text-muted",
							children: g.vibe
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-subtle",
							children: g.kick
						})
					]
				}) }, g.id))
			})
		]
	});
}
function GenreDetailPage({ id }) {
	const g = GENRES[id];
	const form = g.templates[0] ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		active: "genres",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageKicker, { children: [
				g.bpmRange[0],
				"–",
				g.bpmRange[1],
				" BPM"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide",
				children: g.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-base text-pretty text-muted",
				children: [g.vibe, " Maps in this kit usually follow a real record's section order, not a blank template."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Kick",
						value: g.kick
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Groove",
						value: g.groove
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Lead",
						value: g.lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Mix",
						value: g.mixTip
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl uppercase tracking-wide",
				children: "Kick / drums"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: SOUND[id].kick.concat(SOUND[id].drums).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-pretty text-muted",
					children: s
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-10 font-display text-2xl uppercase tracking-wide",
				children: ["Serum — ", SOUND[id].lead.name]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Osc",
						value: SOUND[id].lead.osc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Filter",
						value: SOUND[id].lead.filter
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Env",
						value: SOUND[id].lead.env
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "LFO",
						value: SOUND[id].lead.lfo
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "FX",
						value: SOUND[id].lead.fx
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "MIDI",
						value: SOUND[id].lead.midi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "EQ / etch",
						value: SOUND[id].lead.eq
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-10 font-display text-2xl uppercase tracking-wide",
				children: ["Serum chords — ", SOUND[id].chords.name]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Osc",
						value: SOUND[id].chords.osc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Filter",
						value: SOUND[id].chords.filter
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Env",
						value: SOUND[id].chords.env
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "MIDI",
						value: SOUND[id].chords.midi
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "EQ / etch",
						value: SOUND[id].chords.eq
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl uppercase tracking-wide",
				children: "Spire from Init"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Lead",
						value: SPIRE_KNOBS[id].lead
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Chords",
						value: SPIRE_KNOBS[id].chords
					}),
					SPIRE_KNOBS[id].screech ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Screech",
						value: SPIRE_KNOBS[id].screech
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-pretty text-muted",
				children: "Click Init, then those knobs. MIDI and EQ are the same as the Serum block above."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl uppercase tracking-wide",
				children: "Typical form"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 flex flex-wrap gap-2",
				children: form.map((kind, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-md bg-surface px-3 py-2 font-display text-sm uppercase tracking-wide ring-1 ring-border",
					children: kind === "dropB" ? "Drop B" : kind
				}, `${kind}-${i}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl uppercase tracking-wide",
				children: "Listen like this"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-3",
				children: g.references.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [
						r.artist,
						" — ",
						r.title
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-pretty text-muted",
					children: r.why
				})] }, r.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/studio",
				search: { genre: id },
				className: "mt-10 inline-flex h-12 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-fg",
				children: [
					"Open ",
					g.name,
					" in the studio"
				]
			})
		]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "font-mono text-[10px] uppercase tracking-wider text-subtle",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 text-sm text-pretty text-muted",
		children: value
	})] });
}
//#endregion
export { GenresPage as n, GenreDetailPage as t };
