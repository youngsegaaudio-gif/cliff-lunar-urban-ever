import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Plus, c as FileDown, d as ChevronRight, f as ChevronLeft, i as Sparkles, l as Dices, r as Trash2, s as FolderOpen, u as Copy } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Sheet, D as cn, E as Button, T as SheetTrigger, _ as UnlockDialog, a as KEYS_ALL, b as useCommerce, c as barsToTime, d as LANE_IDS, f as LANE_STATES, i as GENRE_LIST, l as pickKey, o as KIND_META, p as PHRASE_KINDS, r as GENRES, s as LANE_META, u as shortKey, w as SheetContent, y as SiteNav } from "./router-DDApkDmv.mjs";
import { a as SPIRE_FROM_SCRATCH, i as SOUND, n as EQ_ETCH, o as SPIRE_KNOBS, r as SERUM_FROM_SCRATCH, s as phraseSoundTips } from "./init-synth-CXvZTryU.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
import { i as Viewport, n as Scrollbar, r as Thumb, t as Root$1 } from "../_libs/radix-ui__react-scroll-area.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-D9zjmThv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function barOffset(track, id) {
	let n = 1;
	for (const p of track.phrases) {
		if (p.id === id) return n;
		n += p.bars;
	}
	return n;
}
var DEFAULT_BARS = {
	intro: 8,
	tease: 8,
	break: 16,
	build: 16,
	drop: 32,
	dropB: 32,
	breakdown: 32,
	bridge: 16,
	outro: 8
};
var ENERGY_BARS = {
	radio: 144,
	festival: 224,
	extended: 288
};
function uid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `ph_${Math.random().toString(36).slice(2, 10)}`;
}
function pick(arr, rng) {
	return arr[Math.floor(rng() * arr.length)];
}
function mulberry32(seed) {
	return () => {
		seed |= 0;
		seed = seed + 1831565813 | 0;
		let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function snap(bars, grid) {
	const g = Math.min(grid, 4);
	return Math.max(g, Math.round(bars / g) * g);
}
function unitFor(kind) {
	return kind === "intro" || kind === "tease" || kind === "outro" ? 4 : 8;
}
function lanesFromRecipe(genre, kind, vocals) {
	const recipe = GENRES[genre].recipes[kind];
	const lanes = {};
	for (const id of LANE_IDS) {
		const state = recipe.lanes[id]?.state ?? "off";
		if (id === "vox" && !vocals) lanes[id] = "off";
		else lanes[id] = state;
	}
	return lanes;
}
function notesFromRecipe(genre, kind, vocals, steal) {
	const notes = [...GENRES[genre].recipes[kind].notes];
	if (steal && (kind === "intro" || kind === "drop" || kind === "breakdown")) notes.unshift(steal);
	if (!vocals) return notes.filter((n) => !/vocal|hook|sung|mc/i.test(n) || /optional|whisper/i.test(n));
	return notes;
}
function makePhrase(genre, kind, bars, vocals, steal) {
	const recipe = GENRES[genre].recipes[kind];
	return {
		id: uid(),
		kind,
		bars,
		lanes: lanesFromRecipe(genre, kind, vocals),
		notes: notesFromRecipe(genre, kind, vocals, steal),
		energy: recipe.energy
	};
}
function defaultBarsFor(genre, kind) {
	return GENRES[genre].recipes[kind].defaultBars || DEFAULT_BARS[kind];
}
function scaleKinds(kinds, genre, targetBars, grid, rng) {
	let parts = kinds.map((kind) => {
		let bars = snap(defaultBarsFor(genre, kind), unitFor(kind));
		if (kind === "intro" && rng() < .45) bars = 4;
		return {
			kind,
			bars
		};
	});
	const sum = () => parts.reduce((a, p) => a + p.bars, 0);
	const capFor = (kind) => {
		if (kind === "intro" || kind === "tease" || kind === "outro") return 16;
		if (kind === "build" || kind === "bridge") return 32;
		return 32;
	};
	const minFor = (kind) => unitFor(kind);
	let guard = 0;
	while (sum() < targetBars - 8 && guard++ < 24) {
		const growable = parts.filter((p) => p.bars < capFor(p.kind) && p.kind !== "intro" && p.kind !== "tease");
		if (!growable.length) break;
		const prefer = growable.filter((p) => p.kind === "drop" || p.kind === "dropB" || p.kind === "outro");
		const p = pick(prefer.length ? prefer : growable, rng);
		p.bars = snap(p.bars + unitFor(p.kind), unitFor(p.kind));
	}
	guard = 0;
	while (sum() > targetBars && guard++ < 40) {
		const shrinkable = [...parts].reverse().filter((p) => p.bars > minFor(p.kind));
		if (!shrinkable.length) break;
		const p = shrinkable.filter((p) => [
			"outro",
			"intro",
			"tease",
			"bridge",
			"breakdown"
		].includes(p.kind))[0] ?? shrinkable[0];
		p.bars = snap(p.bars - unitFor(p.kind), unitFor(p.kind));
	}
	if (grid === 32) {
		parts = parts.map((p) => {
			if (p.kind === "intro" || p.kind === "tease" || p.kind === "outro") return p;
			if (p.kind === "build" || p.kind === "bridge") return {
				...p,
				bars: p.bars >= 24 ? 32 : 16
			};
			return {
				...p,
				bars: Math.max(16, snap(p.bars, 16))
			};
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
function generateTrack(opts = {}) {
	const rng = mulberry32(opts.seed ?? Math.floor(Math.random() * 1e9));
	const genreIds = Object.keys(GENRES);
	const genre = opts.genre ?? pick(genreIds, rng);
	const def = GENRES[genre];
	const energyPreset = opts.energyPreset ?? pick([
		"radio",
		"festival",
		"extended"
	], rng);
	const targetBars = opts.targetBars ?? ENERGY_BARS[energyPreset];
	const phraseGrid = opts.phraseGrid ?? 8;
	const vocals = opts.vocals ?? rng() > .35;
	const inspired = opts.inspired !== false && rng() < .7 ? pick(def.references, rng) : void 0;
	const scaled = scaleKinds(inspired?.form ?? pick(def.templates, rng), genre, targetBars, phraseGrid, rng);
	const key = opts.key ?? pickKey(rng);
	const bpm = opts.bpm ?? snapBpm(def.bpm + Math.round((rng() - .5) * 4), def.bpmRange);
	const steal = inspired ? `Nicking the bones from ${inspired.artist} — ${inspired.title}. ${inspired.steal}` : void 0;
	const phrases = scaled.map((p) => makePhrase(genre, p.kind, p.bars, vocals, steal));
	return {
		title: titleFor(genre, inspired?.title, rng),
		genre,
		bpm,
		key,
		phraseGrid,
		targetBars,
		vocals,
		energyPreset,
		inspiredBy: inspired ? `${inspired.artist} — ${inspired.title}` : void 0,
		phrases
	};
}
function snapBpm(n, range) {
	return Math.min(range[1], Math.max(range[0], Math.round(n)));
}
function titleFor(genre, inspired, rng) {
	const a = [
		"No Mercy",
		"Headroom",
		"Afterlife",
		"Voltage",
		"Ritual",
		"Last Light",
		"Breaker",
		"False Idol",
		"Night Raid",
		"Overdrive"
	];
	const b = [
		"Protocol",
		"Anthem",
		"Edit",
		"Weapon",
		"Hymn",
		"Reload",
		"Machine",
		"Gospel"
	];
	const stamp = pick(a, rng);
	const tag = pick(b, rng);
	if (inspired && rng() > .5) return `${stamp}`;
	return `${stamp} ${tag}`;
}
function retargetGenre(track, genre) {
	const def = GENRES[genre];
	return {
		...track,
		genre,
		bpm: def.bpm,
		key: KEYS_ALL.includes(track.key) ? track.key : def.keys[0],
		inspiredBy: void 0,
		phrases: track.phrases.map((p) => ({
			...makePhrase(genre, p.kind, p.bars, track.vocals),
			id: p.id,
			bars: p.bars
		}))
	};
}
function totalBars(track) {
	return track.phrases.reduce((a, p) => a + p.bars, 0);
}
var ENERGY_DEFAULTS = ENERGY_BARS;
function suggestNext(track) {
	const last = track.phrases[track.phrases.length - 1];
	const bars = totalBars(track);
	const remaining = track.targetBars - bars;
	const g = GENRES[track.genre];
	const grid = track.phraseGrid <= 8 ? 8 : track.phraseGrid;
	const moves = [];
	const add = (kind, barsN, title, why) => {
		moves.push({
			id: `${kind}-${barsN}-${title}`,
			kind,
			title,
			why,
			bars: barsN
		});
	};
	if (!last) {
		add("intro", 8, "4–8 bar intro", "Start like the records: FX pickup or filtered kick, then grow it.");
		add("intro", 4, "4-bar FX pickup", "Bars 1–4 empty-ish. Kick from 5.");
		add("build", 16, "Skip the intro — cold build", "Xtra-raw and uptempo often just hit.");
		return moves.slice(0, 4);
	}
	if (remaining <= 24 && last.kind !== "outro") add("outro", 8, "Write the outro", "Strip to kick + reverse bass so the next DJ can actually mix.");
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
		case "outro": add("outro", 16, "Extend the mix-out", "Another 16 of kick + reverse bass for long blends.");
	}
	if (track.genre === "xtraraw" || track.genre === "uptempo") {
		if (last.kind === "drop" || last.kind === "dropB") add("dropB", 16, "Another 16 of kick pressure", "Short phrases. Change the kick pattern — don't write a ballad.");
	}
	if (track.genre === "euphoric" || track.genre === "rawphoric") {
		if (last.kind === "intro") add("breakdown", 32, "Sing first", "Put the vocal up front, then punish them.");
	}
	const seen = /* @__PURE__ */ new Set();
	return moves.filter((m) => {
		if (seen.has(m.id)) return false;
		seen.add(m.id);
		return true;
	}).slice(0, 4);
}
function applyMove(track, move) {
	return makePhrase(track.genre, move.kind, move.bars, track.vocals);
}
function howToBuildTrack(track) {
	const g = GENRES[track.genre];
	return [
		track.inspiredBy ? `You're nicking the skeleton from ${track.inspiredBy} — not the notes. Kick first.` : `Freehand in ${g.name}. No one record to chase. Kick first.`,
		`Session: ${track.bpm} BPM, 4/4, ${track.key}. 4-bar grid. Intros 4 or 8; drops 16–32.`,
		`Groove: ${g.groove}`,
		`8-bar kick + reverse-bass (or kick-only) loop. Don't write the lead yet.`,
		`Map the phrases on this timeline. Lock lengths before you disappear into sound design.`,
		`Serum or Spire from Init. ${SOUND[track.genre].lead.name}. High-pass ~250 Hz, duck it to the kick.`,
		`EQ / etch: ${SOUND[track.genre].lead.eq}`,
		`If there's a breakdown, write it as a song: chords + melody${track.vocals ? " + vocal" : ""}.`,
		`Sidechain leads, bass and pads to the kick. Clap sits after the kick, not on it.`,
		`Last: intro/outro as DJ tools. ${g.mixTip}`
	];
}
function withSelect(track, preferId) {
	return {
		track,
		selectedId: (preferId && track.phrases.some((p) => p.id === preferId) ? preferId : track.phrases[0]?.id) ?? null
	};
}
var first = generateTrack({
	genre: "euphoric",
	energyPreset: "festival",
	vocals: true,
	seed: 150
});
var useArranger = create()(persist((set, get) => ({
	...withSelect(first),
	library: [],
	generate: (partial) => {
		const cur = get().track;
		set(withSelect(generateTrack({
			genre: partial?.genre ?? cur.genre,
			energyPreset: partial?.energyPreset ?? cur.energyPreset,
			targetBars: partial?.targetBars ?? cur.targetBars,
			phraseGrid: partial?.phraseGrid ?? cur.phraseGrid,
			vocals: partial?.vocals ?? cur.vocals,
			bpm: partial?.bpm,
			key: partial?.key
		})));
	},
	random: () => set(withSelect(generateTrack({}))),
	setGenre: (genre) => {
		set({ track: retargetGenre(get().track, genre) });
	},
	patchTrack: (patch) => set({ track: {
		...get().track,
		...patch
	} }),
	select: (id) => set({ selectedId: id }),
	updatePhrase: (id, patch) => {
		const track = get().track;
		set({ track: {
			...track,
			phrases: track.phrases.map((p) => p.id === id ? {
				...p,
				...patch
			} : p)
		} });
	},
	setLane: (id, lane, state) => {
		const track = get().track;
		set({ track: {
			...track,
			phrases: track.phrases.map((p) => p.id === id ? {
				...p,
				lanes: {
					...p.lanes,
					[lane]: state
				}
			} : p)
		} });
	},
	setKind: (id, kind) => {
		const { track } = get();
		const existing = track.phrases.find((p) => p.id === id);
		if (!existing) return;
		const fresh = makePhrase(track.genre, kind, existing.bars, track.vocals);
		set({ track: {
			...track,
			phrases: track.phrases.map((p) => p.id === id ? {
				...fresh,
				id,
				bars: existing.bars
			} : p)
		} });
	},
	setBars: (id, bars) => {
		const track = get().track;
		set({ track: {
			...track,
			phrases: track.phrases.map((p) => p.id === id ? {
				...p,
				bars
			} : p)
		} });
	},
	removePhrase: (id) => {
		const track = get().track;
		const phrases = track.phrases.filter((p) => p.id !== id);
		set({
			track: {
				...track,
				phrases
			},
			selectedId: get().selectedId === id ? phrases[phrases.length - 1]?.id ?? null : get().selectedId
		});
	},
	duplicatePhrase: (id) => {
		const track = get().track;
		const idx = track.phrases.findIndex((p) => p.id === id);
		if (idx < 0) return;
		const src = track.phrases[idx];
		const copy = {
			...src,
			id: crypto.randomUUID(),
			lanes: { ...src.lanes },
			notes: [...src.notes]
		};
		const phrases = [...track.phrases];
		phrases.splice(idx + 1, 0, copy);
		set({
			track: {
				...track,
				phrases
			},
			selectedId: copy.id
		});
	},
	movePhrase: (id, dir) => {
		const track = get().track;
		const idx = track.phrases.findIndex((p) => p.id === id);
		const next = idx + dir;
		if (idx < 0 || next < 0 || next >= track.phrases.length) return;
		const phrases = [...track.phrases];
		const [item] = phrases.splice(idx, 1);
		phrases.splice(next, 0, item);
		set({ track: {
			...track,
			phrases
		} });
	},
	appendMove: (move) => {
		const track = get().track;
		if (totalBars(track) >= 320) return;
		const phrase = applyMove(track, move);
		set({
			track: {
				...track,
				phrases: [...track.phrases, phrase]
			},
			selectedId: phrase.id
		});
	},
	insertPhrase: (kind, afterId) => {
		const track = get().track;
		const phrase = makePhrase(track.genre, kind, track.phraseGrid, track.vocals);
		const idx = afterId ? track.phrases.findIndex((p) => p.id === afterId) : track.phrases.length - 1;
		const phrases = [...track.phrases];
		phrases.splice(idx + 1, 0, phrase);
		set({
			track: {
				...track,
				phrases
			},
			selectedId: phrase.id
		});
	},
	saveLibrary: () => {
		const track = get().track;
		set({ library: [{
			id: crypto.randomUUID(),
			savedAt: (/* @__PURE__ */ new Date()).toISOString(),
			track: JSON.parse(JSON.stringify(track))
		}, ...get().library].slice(0, 40) });
	},
	loadLibrary: (id) => {
		const entry = get().library.find((x) => x.id === id);
		if (!entry) return;
		set(withSelect(JSON.parse(JSON.stringify(entry.track))));
	},
	removeLibrary: (id) => set({ library: get().library.filter((x) => x.id !== id) })
}), {
	name: "phraseform-arranger",
	skipHydration: true
}));
function PhraseDetail() {
	const track = useArranger((s) => s.track);
	const selectedId = useArranger((s) => s.selectedId);
	const setKind = useArranger((s) => s.setKind);
	const setBars = useArranger((s) => s.setBars);
	const setLane = useArranger((s) => s.setLane);
	const removePhrase = useArranger((s) => s.removePhrase);
	const duplicatePhrase = useArranger((s) => s.duplicatePhrase);
	const movePhrase = useArranger((s) => s.movePhrase);
	const insertPhrase = useArranger((s) => s.insertPhrase);
	const phrase = track.phrases.find((p) => p.id === selectedId);
	if (!phrase) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl bg-surface p-5 ring-1 ring-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Select a phrase on the timeline."
		})
	});
	const recipe = GENRES[track.genre].recipes[phrase.kind];
	const start = barOffset(track, phrase.id);
	const end = start + phrase.bars - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 rounded-xl bg-surface p-4 ring-1 ring-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[10px] uppercase tracking-wider text-muted tabular-nums",
						children: [
							"Bars ",
							start,
							"–",
							end
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl uppercase tracking-wide text-fg",
						children: KIND_META[phrase.kind].name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-pretty text-muted",
						children: recipe.intent
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => movePhrase(phrase.id, -1),
						"aria-label": "Move earlier",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => movePhrase(phrase.id, 1),
						"aria-label": "Move later",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: PHRASE_KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setKind(phrase.id, k),
					className: cn("h-8 rounded-md px-2.5 font-display text-xs uppercase tracking-wide ring-1 ring-border", phrase.kind === k ? "bg-accent text-accent-fg" : "text-muted hover:text-fg hover:bg-surface-2"),
					children: KIND_META[k].name
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 font-mono text-[10px] uppercase tracking-wider text-muted",
				children: "Length"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: [
					4,
					8,
					16,
					24,
					32,
					48
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setBars(phrase.id, n),
					className: cn("h-9 min-w-11 rounded-md px-2 font-mono text-xs tabular-nums ring-1 ring-border", phrase.bars === n ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
					children: n
				}, n))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 font-mono text-[10px] uppercase tracking-wider text-muted",
				children: "What to put here"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: LANE_IDS.map((lane) => {
					const rec = recipe.lanes[lane];
					const state = phrase.lanes[lane];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg bg-surface-2 p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm uppercase tracking-wide text-fg",
								children: LANE_META[lane].name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LaneToggle, {
								value: state,
								onChange: (s) => setLane(phrase.id, lane, s)
							})]
						}), state !== "off" && rec?.put ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs leading-relaxed text-pretty text-muted",
							children: rec.put
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs text-subtle",
							children: "Muted in this phrase."
						})]
					}, lane);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 font-mono text-[10px] uppercase tracking-wider text-muted",
					children: "How to build it"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "list-decimal space-y-1.5 pl-4 text-sm text-pretty text-muted",
					children: recipe.howToBuild.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: step }, step))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1",
					children: phrase.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-xs text-pretty text-muted",
						children: n
					}, n))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhraseSound, {
				genre: track.genre,
				kind: phrase.kind
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						size: "sm",
						onClick: () => duplicatePhrase(phrase.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), " Duplicate"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						size: "sm",
						onClick: () => insertPhrase("build", phrase.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Insert after"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => removePhrase(phrase.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), " Remove"]
					})
				]
			})
		]
	});
}
function PhraseSound({ genre, kind }) {
	const blocks = phraseSoundTips(genre, kind);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 font-mono text-[10px] uppercase tracking-wider text-muted",
		children: "Serum / Spire / EQ"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: blocks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs uppercase tracking-wide text-fg",
			children: b.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-1 space-y-1",
			children: b.steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-xs leading-relaxed text-pretty text-muted",
				children: s
			}, s))
		})] }, b.title))
	})] });
}
function LaneToggle({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex rounded-md ring-1 ring-border",
		children: LANE_STATES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(s),
			className: cn("h-8 px-1.5 font-mono text-[9px] uppercase", value === s ? "bg-accent text-accent-fg" : "text-subtle hover:text-fg"),
			children: s === "filter" ? "filt" : s.slice(0, 4)
		}, s))
	});
}
function Separator({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		orientation,
		className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
function SoundPanel() {
	const genre = useArranger((s) => s.track.genre);
	const key = useArranger((s) => s.track.key);
	const [tab, setTab] = (0, import_react.useState)("kit");
	const [synth, setSynth] = (0, import_react.useState)("init");
	const g = GENRES[genre];
	const s = SOUND[genre];
	const spire = SPIRE_KNOBS[genre];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-4 ring-1 ring-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg uppercase tracking-wide",
				children: "Sound"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-1",
				children: [
					["kit", "Kit"],
					["kick", "Kick / drums"],
					["synths", "Serum / Spire"],
					["mix", "Mix"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(id),
					className: cn("h-9 rounded-md px-2.5 font-display text-xs uppercase tracking-wide ring-1 ring-border", tab === id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
					children: label
				}, id))
			}),
			tab === "kit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 space-y-2 text-sm",
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
			}) : null,
			tab === "kick" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
						title: "Kick",
						items: s.kick
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
						title: "Drums",
						items: s.drums
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
						title: "Reverse bass",
						items: s.bass
					})
				]
			}) : null,
			tab === "synths" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: [
							["init", "From Init"],
							["serum", "Serum knobs"],
							["spire", "Spire knobs"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSynth(id),
							className: cn("h-8 rounded-md px-2 font-mono text-[10px] uppercase ring-1 ring-border", synth === id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
							children: label
						}, id))
					}),
					synth === "init" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
								title: "Serum — lead from Init",
								items: SERUM_FROM_SCRATCH.lead
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
								title: "Serum — chords from Init",
								items: SERUM_FROM_SCRATCH.chords
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
								title: "Spire — lead from Init",
								items: SPIRE_FROM_SCRATCH.lead
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
								title: "Spire — chords from Init",
								items: SPIRE_FROM_SCRATCH.chords
							})
						]
					}) : null,
					synth === "serum" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Patch, {
								title: `Lead — ${s.lead.name}`,
								patch: s.lead,
								sessionKey: key
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Patch, {
								title: `Chords — ${s.chords.name}`,
								patch: s.chords,
								sessionKey: key
							})
						]
					}) : null,
					synth === "spire" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "Same MIDI and EQ as Serum. Init first, then these knobs."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Lead",
								value: spire.lead
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Chords",
								value: spire.chords
							}),
							spire.screech ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Screech",
								value: spire.screech
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "MIDI",
								value: s.lead.midi
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-subtle",
								children: [
									"Written in Fm. Transpose the riff to ",
									shortKey(key),
									" (",
									key,
									")."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "EQ / etch",
								value: s.lead.eq
							})
						]
					}) : null
				]
			}) : null,
			tab === "mix" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					title: "This kit",
					items: s.mix
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					title: "EQ / etch",
					items: EQ_ETCH
				})]
			}) : null,
			tab === "kit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-wider text-muted",
					children: "Listen like this"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2",
					children: g.references.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-fg",
						children: [
							r.artist,
							" — ",
							r.title
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-pretty text-muted",
						children: r.why
					})] }, r.title))
				})
			] }) : null
		]
	});
}
function Patch({ title, patch, sessionKey }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-display text-sm uppercase tracking-wide",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
		className: "mt-2 space-y-1.5 text-xs text-pretty text-muted",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Osc",
				value: patch.osc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Filter",
				value: patch.filter
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "Env",
				value: patch.env
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "LFO",
				value: patch.lfo
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "FX",
				value: patch.fx
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "MIDI",
				value: patch.midi
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] text-subtle",
				children: [
					"Written in Fm. Move it to ",
					shortKey(sessionKey),
					" (",
					sessionKey,
					")."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				label: "EQ / etch",
				value: patch.eq
			})
		]
	})] });
}
function List({ title, items, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] uppercase tracking-wider text-subtle",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-1.5 list-decimal space-y-1.5 pl-4",
			children: items.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-sm text-pretty text-muted",
				children: x
			}, x))
		})]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "font-mono text-[10px] uppercase tracking-wider text-subtle",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "text-pretty text-muted",
		children: value
	})] });
}
var KIND_TONE = {
	intro: "bg-intro",
	tease: "bg-break/60",
	break: "bg-break",
	build: "bg-build",
	drop: "bg-drop",
	dropB: "bg-drop/80",
	breakdown: "bg-break/90",
	bridge: "bg-build/50",
	outro: "bg-intro/80"
};
var LANE_COLOR = {
	kick: "#c45c4a",
	bass: "#8a4540",
	perc: "#8a8680",
	fx: "#6e6a64",
	atm: "#7d8b82",
	lead: "#a8b0bc",
	chords: "#8b93a0",
	vox: "#c4b8a8"
};
var STATE_OPACITY = {
	off: 0,
	sparse: .42,
	filter: .58,
	full: .88,
	climax: 1
};
var PX = 14;
var HEAD = 124;
var LANE_H = 48;
var ARR_H = 32;
var RULER_H = 28;
function Timeline() {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[22rem] min-w-0 flex-1 flex-col overflow-hidden rounded-lg bg-[#101012] ring-1 ring-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transport, {
				bpm: track.bpm,
				keySig: track.key,
				bars,
				pos: selStart,
				loopEnd: selEnd,
				time: barsToTime(bars, track.bpm),
				onStart: () => {
					const first = track.phrases[0];
					if (first) select(first.id);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 min-w-0 flex-1 overflow-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-max",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky left-0 z-30 shrink-0 border-r border-border bg-[#161618]",
						style: { width: HEAD },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-b border-border bg-[#1a1a1c]",
								style: { height: RULER_H }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-b border-border px-2",
								style: { height: ARR_H },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-0.5 rounded-sm bg-fg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[9px] uppercase tracking-wider text-muted",
									children: "WT / Arr"
								})]
							}),
							LANE_IDS.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackHeader, {
								id,
								index: i
							}, id))
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative bg-[#0d0d0f]",
						style: { width },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { bars }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute z-10 bg-fg/10",
								style: {
									left: loopLeft,
									width: loopW,
									top: 0,
									bottom: 0
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute top-0 z-20 h-1.5 bg-fg/45",
								style: {
									left: loopLeft,
									width: loopW
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locator, { x: loopLeft }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locator, { x: loopLeft + loopW }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-0 top-0 z-[5]",
								children: Array.from({ length: bars + 1 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("absolute top-0 bottom-0", i % 16 === 0 ? "w-px bg-border" : i % 4 === 0 ? "w-px bg-border/70" : "w-px bg-border/25"),
									style: { left: i * PX }
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute top-0 bottom-0 z-20 w-px bg-fg",
								style: { left: playhead }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative border-b border-border/80",
								style: { height: ARR_H },
								children: track.phrases.map((p) => {
									const start = barOffset(track, p.id);
									const on = p.id === selectedId;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => select(p.id),
										className: cn("absolute top-1 overflow-hidden rounded-sm text-left ring-1", KIND_TONE[p.kind], on ? "z-10 ring-fg" : "ring-black/50 hover:ring-fg/40"),
										style: {
											left: (start - 1) * PX + 1,
											width: Math.max(p.bars * PX - 2, 8),
											height: 24
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block truncate px-1.5 font-display text-[10px] uppercase leading-[24px] tracking-wide text-fg",
											children: [KIND_META[p.kind].name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-1 font-mono text-[9px] text-fg/70",
												children: p.bars
											})]
										})
									}, p.id);
								})
							}),
							LANE_IDS.map((lane) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative border-b border-border/60",
								style: {
									height: LANE_H,
									background: "rgba(255,255,255,0.015)"
								},
								children: track.phrases.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LaneClip, {
									phrase: p,
									lane,
									start: barOffset(track, p.id),
									selected: p.id === selectedId,
									onSelect: () => select(p.id)
								}, p.id + lane))
							}, lane))
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-8 shrink-0 items-center gap-3 border-t border-border bg-[#161618] px-3 font-mono text-[10px] uppercase tracking-wider text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wavetable" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-border",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Osc 256" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-border",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Snap 4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-border",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grid 1/4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto tabular-nums text-muted",
						children: selected ? `${fmtPos(selStart)} – ${fmtPos(selEnd)} · ${selected.bars} bars` : `${bars} bars`
					})
				]
			})
		]
	});
}
function Transport({ bpm, keySig, bars, pos, loopEnd, time, onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-12 shrink-0 items-center gap-3 border-b border-border bg-[#161618] px-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm uppercase tracking-wide",
				children: "Arrange"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center overflow-hidden rounded-md ring-1 ring-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onStart,
					className: "h-8 px-2.5 font-mono text-[10px] uppercase text-muted hover:bg-surface-2 hover:text-fg",
					children: "Start"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-8 px-2.5 font-mono text-[10px] uppercase leading-8 text-subtle ring-1 ring-border",
					children: "Cycle"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[13px] tabular-nums text-fg",
				children: fmtPos(pos)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[11px] text-muted tabular-nums",
				children: [
					bpm,
					" BPM · 4/4 · ",
					shortKey(keySig)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ml-auto font-mono text-[11px] text-muted tabular-nums",
				children: [
					"Loop ",
					fmtPos(pos),
					"–",
					fmtPos(loopEnd),
					" · ",
					bars,
					" bars · ",
					time
				]
			})
		]
	});
}
function TrackHeader({ id, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 border-b border-border/80 px-2",
		style: { height: LANE_H },
		title: LANE_META[id].hint,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-3 shrink-0 font-mono text-[9px] tabular-nums text-subtle",
				children: index + 1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-8 w-1 shrink-0 rounded-sm",
				style: { background: LANE_COLOR[id] }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-mono text-[10px] uppercase tracking-wide text-fg",
					children: LANE_META[id].name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniOsc, {
					lane: id,
					color: LANE_COLOR[id]
				})]
			})
		]
	});
}
function MiniOsc({ lane, color }) {
	const w = 56;
	const h = 14;
	const d = polyline(w, h, Array.from({ length: 28 }, (_, i) => sampleLane(lane, i / 27, 4, "full", "drop", 3)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: w,
		height: h,
		viewBox: `0 0 ${w} ${h}`,
		className: "mt-0.5 block",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: "none",
			stroke: color,
			strokeWidth: "1",
			vectorEffect: "non-scaling-stroke"
		})
	});
}
function LaneClip({ phrase, lane, start, selected, onSelect }) {
	const state = phrase.lanes[lane];
	if (state === "off") return null;
	const w = Math.max(phrase.bars * PX - 3, 6);
	const color = LANE_COLOR[lane];
	const frames = state === "climax" ? 5 : state === "sparse" ? 2 : 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onSelect,
		className: cn("absolute overflow-hidden rounded-sm text-left ring-1", selected ? "z-10 ring-fg" : "ring-black/50 hover:ring-fg/35"),
		style: {
			left: (start - 1) * PX + 1,
			width: w,
			top: 3,
			height: 42,
			opacity: STATE_OPACITY[state],
			background: "#0e0e10",
			boxShadow: `inset 3px 0 0 ${color}`
		},
		title: `${LANE_META[lane].name}: ${state}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex h-3 items-center justify-between gap-1 px-1.5 font-mono text-[8px] uppercase leading-none tracking-wide",
			style: {
				color,
				background: "rgba(255,255,255,0.04)"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "truncate",
				children: [LANE_META[lane].short, state === "filter" ? " · lp" : state === "climax" ? " · wt+" : ""]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-[7px] opacity-70",
				children: wtIndex(start, lane)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WavetableScope, {
			lane,
			bars: phrase.bars,
			start,
			kind: phrase.kind,
			state,
			width: w,
			height: 30,
			color,
			frames
		})]
	});
}
function WavetableScope({ lane, bars, start, kind, width, height, state, color, frames }) {
	const n = Math.min(120, Math.max(32, Math.floor(width)));
	const mid = height / 2;
	const seed = start * 17 + LANE_IDS.indexOf(lane) * 3;
	const layers = Array.from({ length: frames }, (_, f) => {
		const morphBias = (f / Math.max(frames - 1, 1) - .5) * .28;
		return {
			d: polyline(width, height, Array.from({ length: n }, (_, i) => sampleLane(lane, i / (n - 1), bars, state, kind, seed, morphBias)), f * 1.4),
			f
		};
	});
	const fillD = area(width, height, Array.from({ length: n }, (_, i) => sampleLane(lane, i / (n - 1), bars, state, kind, seed, 0)));
	const gid = `wtg-${lane}-${start}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width,
		height,
		viewBox: `0 0 ${width} ${height}`,
		className: "block",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: gid,
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: color,
					stopOpacity: "0.22"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: color,
					stopOpacity: "0"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "0",
				y1: mid,
				x2: width,
				y2: mid,
				stroke: color,
				strokeOpacity: "0.18",
				strokeWidth: "1"
			}),
			Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: width * (i + 1) / 5,
				y1: "0",
				x2: width * (i + 1) / 5,
				y2: height,
				stroke: color,
				strokeOpacity: "0.08"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: fillD,
				fill: `url(#${gid})`
			}),
			layers.map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: layer.d,
				fill: "none",
				stroke: color,
				strokeWidth: layer.f === Math.floor(frames / 2) ? 1.4 : .9,
				strokeOpacity: layer.f === Math.floor(frames / 2) ? .95 : .28,
				vectorEffect: "non-scaling-stroke"
			}, layer.f))
		]
	});
}
function polyline(width, height, ys, yShift = 0) {
	const mid = height / 2 + yShift;
	const amp = height * .4;
	return ys.map((y, i) => {
		const x = i / Math.max(ys.length - 1, 1) * width;
		return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${(mid - y * amp).toFixed(2)}`;
	}).join(" ");
}
function area(width, height, ys) {
	const line = polyline(width, height, ys);
	const mid = height / 2;
	return `${line} L${width.toFixed(2)} ${mid.toFixed(2)} L0 ${mid.toFixed(2)} Z`;
}
function wtIndex(start, lane) {
	const n = (start * 7 + LANE_IDS.indexOf(lane) * 13) % 256;
	return String(n).padStart(3, "0");
}
function frac(n) {
	return n - Math.floor(n);
}
function sine(p) {
	return Math.sin(p * Math.PI * 2);
}
function saw(p) {
	return frac(p) * 2 - 1;
}
function square(p) {
	return frac(p) < .5 ? 1 : -1;
}
function noise(i, seed) {
	const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
	return (x - Math.floor(x)) * 2 - 1;
}
function sampleLane(lane, t, bars, state, kind, seed, morphBias = 0) {
	const bar = t * bars;
	const inBeat = frac(frac(bar) * 4);
	const amp = state === "sparse" ? .42 : state === "climax" ? 1 : .78;
	const filt = state === "filter" ? .72 : 0;
	const morph = Math.min(1, Math.max(0, (kind === "build" || kind === "tease" ? t : kind === "dropB" ? .65 : .4) + morphBias));
	let y = 0;
	if (lane === "kick") {
		const env = Math.exp(-inBeat * 8.5);
		const body = sine(inBeat * 3.2) * env;
		const click = Math.exp(-inBeat * 36) * noise(Math.floor(bar * 4), seed) * .35;
		y = body * (1 - filt * .4) + sine(inBeat * 2) * env * filt * .4 + click * (1 - filt);
	} else if (lane === "bass") {
		const off = inBeat > .5 ? (inBeat - .5) / .5 : 0;
		if (off <= 0) y = 0;
		else {
			const env = Math.pow(off, .5);
			y = (saw(off * 2.4) * (1 - filt) + sine(off * 2.4) * filt) * env;
		}
	} else if (lane === "perc") y = inBeat < .12 || inBeat > .48 && inBeat < .58 ? noise(t * 80 + seed, seed) * Math.exp(-frac(inBeat * 2) * 10) : 0;
	else if (lane === "fx") {
		const nse = noise(t * 40 + seed, seed);
		const tone = sine(t * bars * .7);
		y = (nse * morph + tone * (1 - morph)) * (.35 + t * .65);
	} else if (lane === "atm") y = sine(t * 1.6) * .55 + sine(t * 3.1 + .4) * .25;
	else if (lane === "lead") {
		const p = t * bars * 2.2;
		y = (saw(p) * (1 - morph) + square(p) * morph + saw(p * 1.012) * .32 + saw(p * .988) * .26) * (1 - filt) + sine(p) * filt;
	} else if (lane === "chords") {
		const p = t * bars * 1.4;
		y = sine(p) * .55 + sine(p * 1.5) * .28 + sine(p * 2) * .18 * (1 - filt);
	} else {
		const p = t * bars * 1.8;
		y = sine(p) * (.6 + .25 * sine(p * .33)) * (.5 + .5 * Math.abs(sine(t * 2)));
	}
	return Math.max(-1, Math.min(1, y * amp));
}
function Ruler({ bars }) {
	const marks = [];
	for (let b = 1; b <= bars; b += 4) marks.push(b);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative border-b border-border bg-[#1a1a1c]",
		style: { height: RULER_H },
		children: [Array.from({ length: bars }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("absolute bottom-0 w-px bg-border", i % 4 === 0 ? "h-2.5" : "h-1.5 opacity-50"),
			style: { left: i * PX }
		}, i)), marks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("absolute top-0.5 font-mono tabular-nums", (b - 1) % 16 === 0 ? "text-[10px] text-fg" : "text-[9px] text-muted"),
			style: { left: (b - 1) * PX + 3 },
			children: b
		}, b))]
	});
}
function Locator({ x }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute top-0 z-20 h-0 w-0 border-x-4 border-t-[6px] border-x-transparent border-t-fg",
		style: {
			left: x,
			transform: "translateX(-4px)"
		}
	});
}
function fmtPos(bar) {
	return `${bar}.1.1`;
}
function ScrollArea({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root$1, {
		className: cn("relative overflow-hidden", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
				className: "h-full w-full rounded-[inherit]",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar, {
				orientation: "vertical",
				className: "flex w-2 touch-none p-px select-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { className: "relative flex-1 rounded-full bg-border" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar, {
				orientation: "horizontal",
				className: "flex h-2 touch-none p-px select-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { className: "relative flex-1 rounded-full bg-border" })
			})
		]
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-surface-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-fg/70" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-accent shadow-sm ring-2 ring-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg" })]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors data-[state=checked]:bg-accent data-[state=unchecked]:bg-surface-2", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-fg transition-transform data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-accent-fg" })
	});
}
function studioSheet(track, opts) {
	const g = GENRES[track.genre];
	const bars = totalBars(track);
	const lines = [];
	lines.push(`${track.title.toUpperCase()}`);
	lines.push(`${g.name}  ·  ${track.bpm} BPM  ·  ${track.key}  ·  ${bars} bars  ·  ${barsToTime(bars, track.bpm)}`);
	if (track.inspiredBy) lines.push(`Bones stolen from ${track.inspiredBy} (form only — write your own notes)`);
	else lines.push(`Freehand — not chasing one record`);
	if (opts?.pro) lines.push(`PHRASEFORM Pro${opts.licensee ? `  ·  licensed to ${opts.licensee}` : ""}`);
	else lines.push("PHRASEFORM Free  ·  buy Pro for a clean studio sheet");
	lines.push("");
	lines.push(`Kick: ${g.kick}`);
	lines.push(`Groove: ${g.groove}`);
	lines.push(`Lead: ${g.lead}`);
	lines.push("");
	let cursor = 1;
	track.phrases.forEach((p, i) => {
		const end = cursor + p.bars - 1;
		const on = LANE_IDS.filter((l) => p.lanes[l] !== "off").map((l) => `${LANE_META[l].short} ${p.lanes[l]}`).join(" · ");
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
function jsonSheet(track) {
	return JSON.stringify(track, null, 2);
}
function StudioApp() {
	const track = useArranger((s) => s.track);
	const generate = useArranger((s) => s.generate);
	const random = useArranger((s) => s.random);
	const bars = totalBars(track);
	const g = GENRES[track.genre];
	const search = useSearch({ from: "/studio" });
	(0, import_react.useEffect)(() => {
		Promise.resolve(useArranger.persist.rehydrate()).then(() => {
			if (search.genre) useArranger.getState().setGenre(search.genre);
		});
		useCommerce.persist.rehydrate();
	}, [search.genre]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col overflow-x-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { active: "studio" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnlockDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "content",
				className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border px-4 py-2 md:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-[1440px] flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								size: "sm",
								onClick: () => generate(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), " Generate"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => random(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, {}), " Random track"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibraryMenu, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-3 p-3 md:p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenreRail, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsRow, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "rounded-xl bg-surface px-4 py-3 ring-1 ring-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Track title",
									className: "w-full max-w-md bg-transparent font-display text-3xl uppercase tracking-wide text-fg outline-none md:text-4xl",
									value: track.title,
									onChange: (e) => useArranger.getState().patchTrack({ title: e.target.value })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted",
									children: [
										g.name,
										" · ",
										track.bpm,
										" BPM · ",
										track.key,
										" · ",
										bars,
										" bars ·",
										" ",
										barsToTime(bars, track.bpm),
										track.inspiredBy ? ` · after ${track.inspiredBy}` : " · freehand"
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-md text-xs text-pretty text-muted",
									children: g.vibe
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid min-h-0 min-w-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1fr)_360px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-h-[22rem] min-w-0 flex-col gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowToStrip, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "lg:hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundPanel, {})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-h-0 flex-col gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lg:hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "w-full",
											children: "Edit selected phrase"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
										side: "bottom",
										title: "Phrase",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhraseDetail, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextMoves, {})
										})]
									})] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden min-h-0 flex-col gap-3 lg:flex",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
										className: "max-h-[calc(100dvh-14rem)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-3 pr-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhraseDetail, {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextMoves, {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundPanel, {})
											]
										})
									})
								})]
							})]
						})
					]
				})]
			})
		]
	});
}
function GenreRail() {
	const genre = useArranger((s) => s.track.genre);
	const setGenre = useArranger((s) => s.setGenre);
	const generate = useArranger((s) => s.generate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-1 flex gap-2 overflow-x-auto px-1 pb-1",
		children: GENRE_LIST.map((g) => {
			const on = g.id === genre;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					setGenre(g.id);
				},
				onDoubleClick: () => generate({ genre: g.id }),
				className: cn("min-w-[9.5rem] shrink-0 rounded-lg px-3 py-2.5 text-left ring-1 transition-[background-color,color] duration-150", on ? "bg-accent text-accent-fg ring-accent" : "bg-surface text-fg ring-border hover:ring-fg/30"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-display text-sm uppercase tracking-wide",
					children: g.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("mt-0.5 block text-[11px] leading-snug", on ? "text-accent-fg/70" : "text-muted"),
					children: [
						g.bpm,
						" BPM · ",
						g.short
					]
				})]
			}, g.id);
		})
	});
}
function SettingsRow() {
	const track = useArranger((s) => s.track);
	const patch = useArranger((s) => s.patchTrack);
	const generate = useArranger((s) => s.generate);
	const g = GENRES[track.genre];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 rounded-xl bg-surface p-3 ring-1 ring-border md:grid-cols-2 xl:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-wider text-muted",
					children: "BPM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: g.bpmRange[0],
						max: g.bpmRange[1],
						step: 1,
						value: [track.bpm],
						onValueChange: ([v]) => patch({ bpm: v ?? track.bpm })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-8 font-mono text-sm tabular-nums",
						children: track.bpm
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-wider text-muted",
					children: "Target length"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 64,
						max: 320,
						step: 8,
						value: [track.targetBars],
						onValueChange: ([v]) => patch({ targetBars: v ?? track.targetBars })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-10 font-mono text-sm tabular-nums",
						children: track.targetBars
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-wider text-muted",
					children: "Phrase grid"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: [
						4,
						8,
						16,
						32
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => patch({ phraseGrid: n }),
						className: cn("h-11 flex-1 rounded-md font-mono text-sm ring-1 ring-border", track.phraseGrid === n ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
						children: n
					}, n))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] uppercase tracking-wider text-muted",
					children: "Form"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1",
						children: [
							"radio",
							"festival",
							"extended"
						].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								patch({
									energyPreset: e,
									targetBars: ENERGY_DEFAULTS[e]
								});
								generate({
									energyPreset: e,
									targetBars: ENERGY_DEFAULTS[e]
								});
							},
							className: cn("h-11 rounded-md px-2 font-display text-xs uppercase tracking-wide ring-1 ring-border", track.energyPreset === e ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
							children: e
						}, e))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-xs text-muted",
						children: ["Vox", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: track.vocals,
							onCheckedChange: (v) => {
								patch({ vocals: v });
								generate({ vocals: v });
							}
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 md:col-span-2 xl:col-span-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] uppercase tracking-wider text-muted",
						children: "Key"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: KEYS_ALL.filter((k) => k.endsWith("minor")).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyChip, {
							name: k,
							active: track.key === k,
							onPick: () => patch({ key: k })
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: KEYS_ALL.filter((k) => k.endsWith("major")).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyChip, {
							name: k,
							active: track.key === k,
							onPick: () => patch({ key: k })
						}, k))
					})
				]
			})
		]
	});
}
function KeyChip({ name, active, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: onPick,
		title: name,
		className: cn("h-8 min-w-9 rounded-md px-1.5 font-mono text-[11px] ring-1 ring-border", active ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
		children: shortKey(name)
	});
}
function NextMoves() {
	const track = useArranger((s) => s.track);
	const appendMove = useArranger((s) => s.appendMove);
	const moves = (0, import_react.useMemo)(() => suggestNext(track), [track]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-4 ring-1 ring-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg uppercase tracking-wide",
				children: "Next phrase"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "Suggestions from this genre’s reference records."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-2",
				children: moves.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => appendMove(m),
					className: "w-full rounded-lg bg-surface-2 px-3 py-2.5 text-left ring-1 ring-border hover:ring-fg/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-sm uppercase tracking-wide text-fg",
							children: m.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] text-muted tabular-nums",
							children: [
								KIND_META[m.kind].name,
								" · ",
								m.bars
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-xs text-pretty text-muted",
						children: m.why
					})]
				}) }, m.id))
			})
		]
	});
}
function HowToStrip() {
	const steps = howToBuildTrack(useArranger((s) => s.track));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-4 ring-1 ring-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-lg uppercase tracking-wide",
			children: "Build this track"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-2 grid gap-2 text-sm text-muted md:grid-cols-2",
			children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-2 text-pretty",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px] text-subtle tabular-nums",
					children: String(i + 1).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s })]
			}, s))
		})]
	});
}
function LibraryMenu() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const library = useArranger((s) => s.library);
	const saveLibrary = useArranger((s) => s.saveLibrary);
	const loadLibrary = useArranger((s) => s.loadLibrary);
	const removeLibrary = useArranger((s) => s.removeLibrary);
	const pro = useCommerce((s) => s.isPro());
	const setUnlockOpen = useCommerce((s) => s.setUnlockOpen);
	const save = () => {
		if (!pro) {
			setUnlockOpen(true);
			setOpen(false);
			return;
		}
		saveLibrary();
		toast.success("Saved to library");
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			size: "sm",
			onClick: () => setOpen((v) => !v),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {}), " Library"]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute left-0 z-30 mt-1 w-72 rounded-lg bg-surface-2 p-1 ring-1 ring-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-surface",
				onClick: save,
				children: "Save this arrangement"
			}), library.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 py-2 text-xs text-muted",
				children: "Empty. Pro keeps a named shelf of maps."
			}) : library.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "min-w-0 flex-1 rounded-md px-2 py-2 text-left text-sm hover:bg-surface",
					onClick: () => {
						loadLibrary(item.id);
						setOpen(false);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate",
						children: item.track.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block font-mono text-[10px] text-muted",
						children: [
							item.track.genre,
							" · ",
							item.track.bpm
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "px-2 text-xs text-muted hover:text-fg",
					onClick: () => removeLibrary(item.id),
					children: "Del"
				})]
			}, item.id))]
		}) : null]
	});
}
function ExportMenu() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const track = useArranger((s) => s.track);
	const pro = useCommerce((s) => s.isPro());
	const licensee = useCommerce((s) => s.licensee);
	const setUnlockOpen = useCommerce((s) => s.setUnlockOpen);
	const sheet = () => studioSheet(track, {
		pro,
		licensee
	});
	const copy = async (text, label) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success(`Copied ${label}`);
		} catch {
			toast.error("Could not copy");
		}
		setOpen(false);
	};
	const download = (text, name, mime) => {
		const blob = new Blob([text], { type: mime });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = name;
		a.click();
		URL.revokeObjectURL(url);
		setOpen(false);
	};
	const needPro = (fn) => {
		if (!pro) {
			setUnlockOpen(true);
			setOpen(false);
			return;
		}
		fn();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			size: "sm",
			onClick: () => setOpen((v) => !v),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, {}), " Export"]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-0 z-30 mt-1 w-56 rounded-lg bg-surface-2 p-1 ring-1 ring-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-surface",
					onClick: () => copy(sheet(), pro ? "studio sheet" : "watermarked sheet"),
					children: "Copy studio sheet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-surface",
					onClick: () => needPro(() => download(sheet(), `${slug(track.title)}.txt`, "text/plain")),
					children: ["Download .txt", pro ? "" : " · Pro"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-surface",
					onClick: () => needPro(() => download(jsonSheet(track), `${slug(track.title)}.json`, "application/json")),
					children: ["Download JSON", pro ? "" : " · Pro"]
				})
			]
		}) : null]
	});
}
function slug(s) {
	return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "phraseform";
}
var SplitComponent = StudioApp;
//#endregion
export { SplitComponent as component };
