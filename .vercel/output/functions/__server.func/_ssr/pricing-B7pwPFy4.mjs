import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Button, S as formatMoney, b as useCommerce, g as SiteShell, h as PageKicker, x as LICENSE_TERMS } from "./router-DDApkDmv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-B7pwPFy4.js
var import_jsx_runtime = require_jsx_runtime();
function PricingPage() {
	const price = useCommerce((s) => s.price);
	const currency = useCommerce((s) => s.currency);
	const pro = useCommerce((s) => Boolean(s.licenseKey));
	const setUnlockOpen = useCommerce((s) => s.setUnlockOpen);
	const money = formatMoney(price, currency);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		active: "pricing",
		width: "wide",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageKicker, { children: "License" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide",
				children: "Free studio. Pro sheet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-base text-pretty text-muted",
				children: "Use the arranger without paying. Buy once if you want clean exports, JSON backups, and a saved library."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-6 ring-1 ring-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-wider text-muted",
							children: "Free"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-4xl uppercase tracking-wide",
							children: "Studio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-2 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Kits pulled from a pile of real records — most maps steal a track's form" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Random generator and next-phrase moves" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Full customisation of bars, BPM, key, vocals" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Watermarked sheet copy" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							className: "mt-8 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/studio",
								children: "Open free"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-6 ring-1 ring-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] uppercase tracking-wider text-muted",
							children: "One-time"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-1 font-display text-4xl uppercase tracking-wide",
							children: ["Pro · ", money]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-2 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Clean studio-sheet download" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "JSON project file" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Named library of arrangements" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "License stamped with your name" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-8 w-full",
							onClick: () => setUnlockOpen(true),
							children: pro ? "Already unlocked" : `Buy / unlock · ${money}`
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl uppercase tracking-wide",
					children: "How a purchase works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 grid gap-3 md:grid-cols-3",
					children: [
						{
							n: "01",
							t: "Pay",
							d: "Checkout opens the seller’s PayPal, Gumroad, or Stripe link."
						},
						{
							n: "02",
							t: "Key",
							d: "They send a PF- license key after the payment lands."
						},
						{
							n: "03",
							t: "Unlock",
							d: "Paste it once. Pro stays on this browser."
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-surface p-4 ring-1 ring-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-subtle",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-xl uppercase tracking-wide",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-pretty text-muted",
								children: s.d
							})
						]
					}, s.n))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl uppercase tracking-wide",
					children: "FAQ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-6 space-y-6",
					children: FAQ.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-display text-lg uppercase tracking-wide",
							children: q.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-2 text-sm text-pretty text-muted",
							children: q.a
						})]
					}, q.q))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 border-t border-border pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl uppercase tracking-wide",
						children: "In short"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1.5 text-sm text-pretty text-muted",
						children: LICENSE_TERMS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t }, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/license",
						className: "mt-4 inline-block text-sm text-muted underline underline-offset-2 hover:text-fg",
						children: "Full license"
					})
				]
			})
		]
	});
}
var FAQ = [
	{
		q: "Does this make audio?",
		a: "No. It writes arrangement maps and instrument placement. You still produce the track."
	},
	{
		q: "Which DAW?",
		a: "Any. Phrase lengths are 8 / 16 / 32 bars so they drop onto a 4/4 grid."
	},
	{
		q: "Is Pro a subscription?",
		a: "No. One payment, one producer license, as many of your own machines as you need."
	},
	{
		q: "Can I use it on client work?",
		a: "Yes. Ghost production too. You cannot resell the generator or share the key."
	}
];
var SplitComponent = PricingPage;
//#endregion
export { SplitComponent as component };
