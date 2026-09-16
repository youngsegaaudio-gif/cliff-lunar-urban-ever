import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as SiteShell, h as PageKicker, x as Button } from "./router-D9gwthdb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/method-BPALOXIJ.js
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		n: "01",
		title: "Think in phrases",
		body: "A hardstyle record starts like a DAW session: 4 bars of FX or 8 of a filtered kick, then 16s and 32s. Most Phraseform maps nick that order from a real one — mix-in, drop, identity, mix-out — not the notes."
	},
	{
		n: "02",
		title: "Lock kick and reverse bass",
		body: "Eight bars. Kick on the downbeats, reverse bass on the offbeats. If that groove is wrong, the rest of the map does not matter. Generate a kit, then copy that 8 into your DAW first."
	},
	{
		n: "03",
		title: "Fix the lengths",
		body: "Intros are 4 or 8. Builds 16. Drops 16 or 32. Festival maps land around 200–300 bars. Use the energy preset, then stretch a phrase if a DJ mix-in needs another 16."
	},
	{
		n: "04",
		title: "Write Drop A before the intro",
		body: "The drop is the record. Intro, tease, and build exist to deliver it. Open the drop phrase, read the lane recipes, and program kick / reverse bass / lead there first."
	},
	{
		n: "05",
		title: "Ask for the next phrase",
		body: "When the first drop is in, use the suggestions. Drop B, breakdown, or mix-out — each one explains why that move is in this genre."
	},
	{
		n: "06",
		title: "Export the sheet, finish the music",
		body: "Copy the studio sheet. It is bar numbers and instrument notes, not audio. You still write the riff, the kick, and the vocal. Phraseform is the map."
	}
];
function MethodPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		active: "method",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageKicker, { children: "How to use it" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide",
				children: "A session, not a template dump"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-base text-pretty text-muted",
				children: "Same order you'd actually write: groove, drop, identity, then the DJ edges. Works in any DAW. Phrase lengths match how sets get mixed. Roughly 70% of generates follow a real track's skeleton."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-10 space-y-8",
				children: STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-t border-border pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: s.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl uppercase tracking-wide",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-pretty text-muted",
							children: s.body
						})
					]
				}, s.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						children: "Open the studio"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/sound",
						children: "Kick, Serum, mix"
					})
				})]
			})
		]
	});
}
var SplitComponent = MethodPage;
//#endregion
export { SplitComponent as component };
