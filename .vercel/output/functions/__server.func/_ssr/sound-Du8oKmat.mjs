import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Button, g as SiteShell, h as PageKicker, i as GENRE_LIST } from "./router-DDApkDmv.mjs";
import { a as SPIRE_FROM_SCRATCH, i as SOUND, n as EQ_ETCH, r as SERUM_FROM_SCRATCH, t as DAW_SESSION } from "./init-synth-CXvZTryU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sound-Du8oKmat.js
var import_jsx_runtime = require_jsx_runtime();
function SoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		active: "sound",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageKicker, { children: "Any DAW" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide",
				children: "Kick, Serum, Spire, mix"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-base text-pretty text-muted",
				children: "Same session in every DAW. Leads and chords start from Init in Serum or Spire — never from a factory preset. MIDI and EQ stay the same; only the knobs change."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Session",
				n: "01",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "list-decimal space-y-2 pl-4",
					children: DAW_SESSION.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-pretty text-muted",
						children: s
					}, s))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Kick and drums",
				n: "02",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-pretty text-muted",
					children: "Kick on its own track. Clap a 16th after it. Hats off the transient. Snare rolls only in the last 4–8 of a build. Kickrolls are extra hits on the kick track, not a separate drum loop. Pitch the kick to the key unless it is pure raw noise."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Reverse bass",
				n: "03",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-pretty text-muted",
					children: "Offbeat after every kick. Reverse a short bass hit, or an envelope that swells into the next downbeat. Sidechain it to the kick so the punch stays. If the kick is already full-range (xtra raw, uptempo), mute it."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Serum from Init",
				n: "04",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty text-muted",
						children: "Menu → Init Preset. Empty default. Then saw, unison, filter, two envelopes, one LFO, FX."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 list-decimal space-y-2 pl-4",
						children: SERUM_FROM_SCRATCH.lead.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-pretty text-muted",
							children: s
						}, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-sm uppercase tracking-wide",
						children: "Chords (second Init)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-2 list-decimal space-y-2 pl-4",
						children: SERUM_FROM_SCRATCH.chords.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-pretty text-muted",
							children: s
						}, s))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Spire from Init",
				n: "05",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-pretty text-muted",
						children: "Click Init in the preset browser. OSC 1 Classic SAW, then Uni, filter, ENV 1/2, matrix, FX. Same MIDI as Serum."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 list-decimal space-y-2 pl-4",
						children: SPIRE_FROM_SCRATCH.lead.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-pretty text-muted",
							children: s
						}, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-sm uppercase tracking-wide",
						children: "Chords (second Init)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-2 list-decimal space-y-2 pl-4",
						children: SPIRE_FROM_SCRATCH.chords.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-pretty text-muted",
							children: s
						}, s))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Leads (the riff)",
				n: "06",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-pretty text-muted",
					children: "One lead track (Serum or Spire). Write an 8-bar riff in the session key — minor pentatonic for euphoric (1 b3 4 5 b7), octaves and fifths for early, chromatic 2–3 notes for screech. Call in bars 1–4, answer in 5–8. Rest on kick downbeats. Copy that 8 through the drop; Drop B is the same MIDI up an octave or with extra 8ths, not a new song."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Chords (the loop)",
				n: "07",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-pretty text-muted",
					children: "Workhorse loop: i – bVI – III – bVII, two bars each. In Fm that is Fm – Db – Ab – Eb. Open voicing in the break (root in the left, a C on top if you can). Drop: drop the bass note, 8th-note offbeats on the +. Duplicate the patch for pad vs stab envelopes. Invert so the top note does not jump."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "EQ / etch",
				n: "08",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "list-decimal space-y-2 pl-4",
					children: EQ_ETCH.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-pretty text-muted",
						children: s
					}, s))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Mix",
				n: "09",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-pretty text-muted",
					children: "Kick owns 50–80 Hz and the click at 3–5 kHz. Bass 80–250. Leads above 250. Duck music with the kick. Clip the kick bus. Limiter last. If it is loud but small, the sidechain is too slow, the kick has no click, or the lead etch is sitting on the same band as the tok."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 font-display text-3xl uppercase tracking-wide",
				children: "Per kit"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Open a genre for the kit knobs (Serum and Spire) and the kick stack."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
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
							SOUND[g.id].lead.name,
							" · ",
							SOUND[g.id].chords.name
						]
					})]
				}) }, g.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/studio",
					children: "Open the studio"
				})
			})
		]
	});
}
function Section({ title, n, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10 border-t border-border pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] text-subtle",
				children: n
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl uppercase tracking-wide",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children
			})
		]
	});
}
var SplitComponent = SoundPage;
//#endregion
export { SplitComponent as component };
