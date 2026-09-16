import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as cn, E as Button, S as formatMoney, b as useCommerce, g as SiteShell, h as PageKicker, v as Input } from "./router-DDApkDmv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sell-D4gzGUwK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SellDesk() {
	const shop = useCommerce();
	const money = formatMoney(shop.price, shop.currency);
	const [note, setNote] = (0, import_react.useState)("");
	const listing = (0, import_react.useMemo)(() => listingCopy(shop.price, shop.currency, shop.paymentUrl), [
		shop.price,
		shop.currency,
		shop.paymentUrl
	]);
	const mint = (n) => {
		const batch = shop.mint(n, note);
		toast.success(`Minted ${batch.length} key${batch.length === 1 ? "" : "s"}`);
	};
	const copy = async (text, label) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success(`Copied ${label}`);
		} catch {
			toast.error("Could not copy");
		}
	};
	const downloadKeys = () => {
		const rows = ["key,created,note,sent", ...shop.issued.map((k) => [
			k.key,
			k.createdAt,
			csv(k.note),
			k.sent ? "yes" : "no"
		].join(","))];
		const blob = new Blob([rows.join("\n")], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "phraseform-keys.csv";
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		active: "sell",
		width: "wide",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageKicker, { children: "Vendor" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl uppercase tracking-wide",
				children: "Sell Phraseform"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-pretty text-muted",
				children: "This is your desk. Paste a checkout link, mint license keys, send a key after someone pays. Buyers unlock Pro on their device. No accounts."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-3 rounded-xl bg-surface p-4 ring-1 ring-border md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-wider text-muted",
									children: "Price"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									step: 1,
									value: shop.price,
									onChange: (e) => shop.setShop({ price: Number(e.target.value) || 0 })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-wider text-muted",
									children: "Currency"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1",
									children: [
										"AUD",
										"USD",
										"EUR",
										"GBP"
									].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => shop.setShop({ currency: c }),
										className: cn("h-11 rounded-md px-3 font-mono text-sm ring-1", shop.currency === c ? "bg-accent text-accent-fg ring-accent" : "text-muted ring-border hover:text-fg"),
										children: c
									}, c))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-1.5 md:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-wider text-muted",
										children: "Checkout link"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "url",
										placeholder: "https://paypal.me/you/29 or your Gumroad / Stripe payment link",
										value: shop.paymentUrl,
										onChange: (e) => shop.setShop({ paymentUrl: e.target.value.trim() })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-pretty text-muted",
										children: "Buyers hit this when they click Pay. Use PayPal.me, Gumroad, Stripe Payment Link, or whatever you already collect money with."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-1.5 md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] uppercase tracking-wider text-muted",
									children: "Note on the pay dialog"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Pay, then message me on IG / Discord for the key.",
									value: shop.supportNote,
									onChange: (e) => shop.setShop({ supportNote: e.target.value })
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl bg-surface p-4 ring-1 ring-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl uppercase tracking-wide",
								children: "Fulfill an order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-pretty text-muted",
								children: [
									"Payment lands → mint a key → send it → mark sent. ",
									money,
									" per license."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-col gap-2 sm:flex-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Buyer name or order note",
										value: note,
										onChange: (e) => setNote(e.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => mint(1),
										children: "Mint 1 key"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										onClick: () => mint(5),
										children: "Mint 5"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: downloadKeys,
									disabled: !shop.issued.length,
									children: "Download CSV"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "self-center font-mono text-[11px] text-muted tabular-nums",
									children: [
										shop.issued.length,
										" minted · ",
										shop.issued.filter((k) => k.sent).length,
										" sent"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 divide-y divide-border",
								children: shop.issued.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "py-6 text-sm text-muted",
									children: "No keys yet."
								}) : shop.issued.slice(0, 30).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex flex-wrap items-center gap-2 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "font-mono text-xs text-fg",
											children: k.key
										}),
										k.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted",
											children: k.note
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-auto flex gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													onClick: () => copy(k.key, "key"),
													children: "Copy"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													onClick: () => {
														if (shop.unlock(k.key, k.note)) toast.success("This device is now Pro");
													},
													children: "Use here"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: k.sent ? "secondary" : "outline",
													size: "sm",
													onClick: () => shop.markSent(k.key),
													children: k.sent ? "Sent" : "Mark sent"
												})
											]
										})
									]
								}, k.key))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl bg-surface p-4 ring-1 ring-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl uppercase tracking-wide",
								children: "Listing copy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "sm",
								onClick: () => copy(listing, "listing"),
								children: "Copy listing"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg bg-surface-2 p-3 font-mono text-xs text-muted",
							children: listing
						})]
					})
				]
			})
		]
	});
}
function csv(s) {
	if (/[",\n]/.test(s)) return `"${s.replaceAll("\"", "\"\"")}"`;
	return s;
}
function listingCopy(price, currency, paymentUrl) {
	return `PHRASEFORM Studio — one-time license (${formatMoney(price, currency)})

Hardstyle arrangement generator. Seven genre kits (early, nu-style, euphoric, rawstyle, rawphoric, xtra raw, uptempo). Builds a phrase map in 8 / 16 / 32-bar DJ blocks with what to put on kick, reverse bass, leads, vocals, and FX.

Free: full studio, watermarked sheet.
Pro: clean export, JSON project, saved library.

After payment you get a PF- license key. Paste it in Phraseform → Unlock.

${paymentUrl ? `Pay here: ${paymentUrl}` : "Add your PayPal / Gumroad / Stripe link in Phraseform → Sell."}`;
}
var SplitComponent = SellDesk;
//#endregion
export { SplitComponent as component };
