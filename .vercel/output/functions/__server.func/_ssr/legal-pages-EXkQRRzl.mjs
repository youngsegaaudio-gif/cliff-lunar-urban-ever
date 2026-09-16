import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as SiteShell, h as PageKicker } from "./router-D9gwthdb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-pages-EXkQRRzl.js
var import_jsx_runtime = require_jsx_runtime();
var LICENSE_TERMS = [
	"Phraseform is a public studio. Use it for original tracks, client work, and ghost production.",
	"Maps, titles, and notes you generate are yours. Phraseform does not claim the music you write from a sheet.",
	"Do not republish this generator as your own product or wrap the site as paid SaaS.",
	"Reference-track names in the kits are for study. They are not included audio."
];
function LicensePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		active: "legal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageKicker, { children: "Use" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide",
				children: "Public studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Last updated 16 September 2026."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6 text-sm text-pretty text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Phraseform is free. No account, no key, no paywall. The studio, kits, exports, and library in this browser are all open." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: LICENSE_TERMS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t }, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl uppercase tracking-wide text-fg",
						children: "What you own"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Maps, titles, and notes you generate are yours to use in original music, client work, and ghost production. Phraseform does not claim the tracks you write from a sheet." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl uppercase tracking-wide text-fg",
						children: "What you do not get"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You do not get the right to republish the generator or wrap this site as your own product. Reference-track names in the kits are for study — they are not included audio." })
				]
			})
		]
	});
}
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		active: "legal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageKicker, { children: "Legal" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide",
				children: "Privacy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Last updated 16 September 2026."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6 text-sm text-pretty text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Phraseform does not require an account. Arrangements you save live in this browser’s local storage. They are not uploaded to a Phraseform server." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We do not run ads or payment checkout. The host may collect ordinary server logs (page, time, technical errors) to keep the site up." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Clear this site’s data in your browser to delete maps on this device." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Site terms:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/license",
							className: "text-fg underline underline-offset-2",
							children: "public use"
						}),
						"."
					] })
				]
			})
		]
	});
}
//#endregion
export { PrivacyPage as n, LicensePage as t };
