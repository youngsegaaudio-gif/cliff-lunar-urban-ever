import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as SiteShell, h as PageKicker, x as LICENSE_TERMS } from "./router-DDApkDmv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-pages-DPhb_Yj2.js
var import_jsx_runtime = require_jsx_runtime();
function LicensePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		active: "legal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageKicker, { children: "Legal" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide",
				children: "License"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Last updated 16 September 2026."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6 text-sm text-pretty text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Phraseform Pro is a single-producer license. Free Phraseform may be used without a key, with watermarks on exported sheets." }),
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You do not get the right to republish the generator, mint keys for other people, or wrap this site as your own SaaS. Reference-track names in the kits are for study — they are not included audio." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl uppercase tracking-wide text-fg",
						children: "Keys"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A Pro key unlocks this browser. Keep it private. If you lose it, ask the seller you paid — they can mint another for the same purchase." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl uppercase tracking-wide text-fg",
						children: "Refunds"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Digital license. If a key was never issued, the seller handles the payment. Once a key is delivered and used, it is spent." })
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Phraseform does not require an account. Arrangements, license keys, and seller-desk notes live in this browser’s local storage. They are not uploaded to a Phraseform server." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If you pay the seller, that payment is handled by their checkout (PayPal, Gumroad, Stripe, or similar). Their privacy policy covers that transaction — not this page." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We do not run third-party advertising pixels. The host may collect ordinary server logs (page, time, technical errors) to keep the site up." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Clear this site’s data in your browser to delete maps and unlocks on this device." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Questions about a purchase go to the person you paid. Site terms:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/license",
							className: "text-fg underline underline-offset-2",
							children: "license"
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
