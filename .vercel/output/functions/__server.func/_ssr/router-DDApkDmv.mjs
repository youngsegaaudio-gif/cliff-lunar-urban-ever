import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { R as notFound, _ as Link, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert, o as Menu, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent$1, s as DialogTrigger, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DDApkDmv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-auto border-t border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl uppercase tracking-[0.14em]",
					children: "Phraseform"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xs text-sm text-pretty text-muted",
					children: "Phrase maps for hardstyle, taken from hundreds of records. Kick, reverse bass, leads, and vocals — written on a 4-bar DAW grid."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Product",
					links: [
						{
							to: "/studio",
							label: "Studio"
						},
						{
							to: "/pricing",
							label: "Pricing"
						},
						{
							to: "/genres",
							label: "Genre kits"
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Learn",
					links: [
						{
							to: "/method",
							label: "Method"
						},
						{
							to: "/sound",
							label: "Kick / Serum / mix"
						},
						{
							to: "/license",
							label: "License"
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
					title: "Site",
					links: [{
						to: "/privacy",
						label: "Privacy"
					}, {
						to: "/sell",
						label: "Seller desk"
					}]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-subtle md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 Phraseform. Arrangements are ideas. The track is yours." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "One producer, one license." })]
			})
		})]
	});
}
function FooterCol({ title, links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-[10px] uppercase tracking-wider text-subtle",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-3 space-y-2",
		children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: l.to,
			className: "text-sm text-muted hover:text-fg",
			children: l.label
		}) }, l.to))
	})] });
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-surface-2 text-fg hover:bg-surface-2/80 ring-1 ring-border",
			outline: "bg-transparent text-fg ring-1 ring-border hover:bg-surface-2",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-surface-2",
			drop: "bg-drop text-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Sheet = Dialog$1;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "right", title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed z-50 flex flex-col bg-surface text-fg shadow-xl outline-none", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md border-l border-border", side === "bottom" && "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl border-t border-border", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-lg tracking-wide uppercase",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: "inline-flex size-11 items-center justify-center text-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto p-4",
			children
		})]
	})] });
}
var ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
var SALT = "PHRASEFORM-STUDIO-PRO";
function fnv(text) {
	let h = 2166136261;
	for (let i = 0; i < text.length; i++) {
		h ^= text.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function encode4(n) {
	let x = n;
	let out = "";
	for (let i = 0; i < 4; i++) {
		out = ALPHABET[x % 32] + out;
		x = Math.floor(x / 32);
	}
	return out;
}
function random4() {
	const bytes = /* @__PURE__ */ new Uint8Array(4);
	crypto.getRandomValues(bytes);
	return encode4(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3]);
}
function mintLicenseKey() {
	const a = random4();
	const b = random4();
	return `PF-${a}-${b}-${encode4(fnv(`${a}${b}${SALT}`))}`;
}
function normalizeKey(raw) {
	return raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function isValidLicenseKey(raw) {
	const compact = normalizeKey(raw);
	if (!compact.startsWith("PF") || compact.length !== 14) return false;
	const body = compact.slice(2, 10);
	const check = compact.slice(10);
	return encode4(fnv(`${body.slice(0, 4)}${body.slice(4)}${SALT}`)) === check;
}
function formatKey(raw) {
	const compact = normalizeKey(raw);
	if (compact.length !== 14) return raw.trim().toUpperCase();
	return `${compact.slice(0, 2)}-${compact.slice(2, 6)}-${compact.slice(6, 10)}-${compact.slice(10)}`;
}
function formatMoney(amount, currency) {
	try {
		return new Intl.NumberFormat("en-AU", {
			style: "currency",
			currency,
			maximumFractionDigits: amount % 1 === 0 ? 0 : 2
		}).format(amount);
	} catch {
		return `${currency} ${amount}`;
	}
}
var LICENSE_TERMS = [
	"One producer, one license. Use it on as many of your own machines as you need.",
	"You may use PHRASEFORM on original tracks, client work, and ghost production.",
	"Do not share, resell, or publish the license key. Do not wrap the generator as your own product.",
	"The arrangements are ideas — the music you write from them is yours."
];
var useCommerce = create()(persist((set, get) => ({
	price: 29,
	currency: "AUD",
	paymentUrl: "",
	supportNote: "",
	licensee: "",
	licenseKey: null,
	issued: [],
	unlockOpen: false,
	isPro: () => Boolean(get().licenseKey && isValidLicenseKey(get().licenseKey)),
	setShop: (patch) => set(patch),
	unlock: (key, licensee) => {
		if (!isValidLicenseKey(key)) return false;
		set({
			licenseKey: formatKey(key),
			licensee: (licensee ?? get().licensee).trim(),
			unlockOpen: false
		});
		return true;
	},
	lock: () => set({ licenseKey: null }),
	mint: (count, note) => {
		const batch = Array.from({ length: Math.min(20, Math.max(1, count)) }, () => ({
			key: mintLicenseKey(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			note: note?.trim() || "",
			sent: false
		}));
		set({ issued: [...batch, ...get().issued].slice(0, 200) });
		return batch;
	},
	markSent: (key) => set({ issued: get().issued.map((k) => k.key === key ? {
		...k,
		sent: true
	} : k) }),
	setUnlockOpen: (open) => set({ unlockOpen: open }),
	setLicensee: (name) => set({ licensee: name })
}), {
	name: "phraseform-shop",
	skipHydration: true
}));
var LINKS = [
	{
		to: "/",
		id: "home",
		label: "Home"
	},
	{
		to: "/method",
		id: "method",
		label: "Method"
	},
	{
		to: "/sound",
		id: "sound",
		label: "Sound"
	},
	{
		to: "/genres",
		id: "genres",
		label: "Genres"
	},
	{
		to: "/pricing",
		id: "pricing",
		label: "Pricing"
	},
	{
		to: "/studio",
		id: "studio",
		label: "Studio"
	}
];
function SiteNav({ active }) {
	const pro = useCommerce((s) => Boolean(s.licenseKey));
	const price = useCommerce((s) => s.price);
	const currency = useCommerce((s) => s.currency);
	const setUnlockOpen = useCommerce((s) => s.setUnlockOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/95",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#content",
			className: "absolute left-4 top-3 z-50 -translate-y-16 rounded-md bg-accent px-3 py-2 text-sm text-accent-fg focus:translate-y-0",
			children: "Skip to content"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mr-auto py-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl uppercase leading-none tracking-[0.14em] text-fg",
						children: "Phraseform"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted",
						children: "Hardstyle arrangement studio"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Primary",
					className: "hidden items-center md:flex",
					children: LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
						...l,
						on: active === l.id
					}, l.to))
				}),
				pro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-md bg-accent px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-fg",
					children: "Pro"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setUnlockOpen(true),
					children: ["Buy ", formatMoney(price, currency)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						className: "md:hidden",
						"aria-label": "Open menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					title: "Phraseform",
					side: "right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-col",
						children: LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
							...l,
							on: active === l.id,
							block: true
						}, l.to))
					})
				})] })
			]
		})]
	});
}
function NavItem({ to, label, on, block }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: cn("font-display text-sm uppercase tracking-wide", block ? "flex h-12 items-center" : "inline-flex h-11 items-center px-3", on ? "text-fg" : "text-muted hover:text-fg"),
		children: label
	});
}
var Dialog = Dialog$1;
function DialogContent({ title, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface p-4 text-fg shadow-xl outline-none ring-1 ring-border", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-lg uppercase tracking-wide",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: "inline-flex size-11 items-center justify-center text-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		}), children]
	})] });
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md bg-surface-2 px-3 text-sm text-fg outline-none ring-1 ring-border placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-fg/40", className),
		...props
	});
}
function UnlockDialog() {
	const open = useCommerce((s) => s.unlockOpen);
	const setUnlockOpen = useCommerce((s) => s.setUnlockOpen);
	const unlock = useCommerce((s) => s.unlock);
	const price = useCommerce((s) => s.price);
	const currency = useCommerce((s) => s.currency);
	const paymentUrl = useCommerce((s) => s.paymentUrl);
	const supportNote = useCommerce((s) => s.supportNote);
	const savedName = useCommerce((s) => s.licensee);
	const [key, setKey] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)(savedName);
	(0, import_react.useEffect)(() => {
		useCommerce.persist.rehydrate();
	}, []);
	const pay = () => {
		if (!paymentUrl) {
			toast.error("Payment link is not set yet. Open Sell and paste your PayPal or Gumroad URL.");
			return;
		}
		window.open(paymentUrl, "_blank", "noopener,noreferrer");
	};
	const submit = () => {
		if (unlock(key, name)) {
			toast.success("Pro unlocked on this device");
			setKey("");
		} else toast.error("That key is not valid");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setUnlockOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			title: "Phraseform Pro",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-pretty text-muted",
					children: [
						"One-time license. ",
						formatMoney(price, currency),
						". Clean studio-sheet export, JSON project files, and a saved arrangement library."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: pay,
							disabled: !paymentUrl,
							children: ["Pay ", formatMoney(price, currency)]
						}),
						!paymentUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-pretty text-muted",
							children: "The seller has not pasted a checkout link yet. They can do that on the Sell page."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-pretty text-muted",
							children: "Pay, then paste the license key they send you."
						}),
						supportNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-pretty text-muted",
							children: supportNote
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "font-mono text-[10px] uppercase tracking-wider text-muted",
							children: ["Licensed to", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1",
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Your name or alias"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "font-mono text-[10px] uppercase tracking-wider text-muted",
							children: ["License key", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1 font-mono uppercase",
								value: key,
								onChange: (e) => setKey(e.target.value),
								placeholder: "PF-XXXX-XXXX-XXXX",
								autoCapitalize: "characters"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: submit,
							children: "Unlock this device"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-1 text-[11px] text-pretty text-subtle",
					children: LICENSE_TERMS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t }, t))
				})
			]
		})
	});
}
function SiteShell({ active, children, width = "prose" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, { active }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnlockDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "content",
				className: cn("mx-auto w-full flex-1 px-4 py-10 md:px-6 md:py-14", width === "wide" ? "max-w-6xl" : "max-w-3xl"),
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function PageKicker({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted",
		children
	});
}
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		active: "home",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] uppercase tracking-[0.2em] text-muted",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl uppercase tracking-wide",
				children: "Phrase not on this map"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-pretty text-muted",
				children: "That page is not here. The studio and the genre kits still are."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Home"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						children: "Studio"
					})
				})]
			})
		]
	});
}
var FALLBACK_MESSAGE = "Something broke. Reload, or go back to the studio.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				className: "size-8 text-drop",
				strokeWidth: 2,
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl uppercase tracking-wide",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-pretty text-muted",
				children: errorMessage(error)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-2 text-sm text-muted underline underline-offset-2 hover:text-fg",
				children: "Home"
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-CkCchcGG.css";
var APP_NAME = "PHRASEFORM";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Hardstyle arrangement studio — phrase maps, genre kits, and a one-time Pro license."
			},
			{
				name: "theme-color",
				content: "#0b0b0c"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "bottom-center",
					toastOptions: { className: "bg-surface-2 text-fg ring-1 ring-border" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
function pageHead(title, description) {
	return { meta: [{ title }, {
		name: "description",
		content: description
	}] };
}
var $$splitComponentImporter$10 = () => import("./routes-Dw3947tx.mjs");
var Route$10 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => pageHead("PHRASEFORM — Hardstyle arrangement studio", "Phrase maps from real hardstyle records. DAW-style arrange: 4–8 bar intros, then 16s and 32s.")
});
var $$splitComponentImporter$9 = () => import("./genres-P3cCqMpW.mjs");
var Route$9 = createFileRoute("/genres")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./license-C5O0AB8_.mjs");
var Route$8 = createFileRoute("/license")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => pageHead("License · PHRASEFORM", "Single-producer license for Phraseform Pro. Arrangements are ideas — the music you write is yours.")
});
var $$splitComponentImporter$7 = () => import("./method-DbelZtp4.mjs");
var Route$7 = createFileRoute("/method")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => pageHead("Method · PHRASEFORM", "How to write a hardstyle track from a phrase map: kick and reverse bass, drop first, then DJ edges.")
});
var $$splitComponentImporter$6 = () => import("./pricing-B7pwPFy4.mjs");
var Route$6 = createFileRoute("/pricing")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => pageHead("Pricing · PHRASEFORM", "Free studio with watermarked sheets. Pro is a one-time license for clean export, JSON, and a saved library.")
});
var $$splitComponentImporter$5 = () => import("./privacy-C7X_LtM8.mjs");
var Route$5 = createFileRoute("/privacy")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => pageHead("Privacy · PHRASEFORM", "No accounts. Maps and license keys stay in this browser. Payments are handled by the seller’s checkout.")
});
var $$splitComponentImporter$4 = () => import("./sell-D4gzGUwK.mjs");
var Route$4 = createFileRoute("/sell")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => pageHead("Seller desk · PHRASEFORM", "Set price, paste a checkout link, mint license keys, and fulfill Phraseform Pro orders.")
});
var $$splitComponentImporter$3 = () => import("./sound-Du8oKmat.mjs");
var Route$3 = createFileRoute("/sound")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => pageHead("Sound · PHRASEFORM", "Kick, drums, reverse bass, Serum and Spire from Init, and mixing — written for any DAW.")
});
var GENRE_IDS = [
	"early",
	"nustyle",
	"euphoric",
	"rawstyle",
	"rawphoric",
	"xtraraw",
	"uptempo"
];
function isGenreId(value) {
	return typeof value === "string" && GENRE_IDS.includes(value);
}
var PHRASE_KINDS = [
	"intro",
	"tease",
	"break",
	"build",
	"drop",
	"dropB",
	"breakdown",
	"bridge",
	"outro"
];
var LANE_IDS = [
	"kick",
	"bass",
	"perc",
	"fx",
	"atm",
	"lead",
	"chords",
	"vox"
];
var LANE_STATES = [
	"off",
	"sparse",
	"filter",
	"full",
	"climax"
];
var $$splitComponentImporter$2 = () => import("./studio-D9zjmThv.mjs");
var Route$2 = createFileRoute("/studio")({
	validateSearch: (search) => ({ genre: isGenreId(search.genre) ? search.genre : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => pageHead("Studio · PHRASEFORM", "Generate and edit hardstyle phrase maps. Kick, reverse bass, leads, vocals — by the bar.")
});
var $$splitComponentImporter$1 = () => import("./genres.index-CkbvCkrA.mjs");
var Route$1 = createFileRoute("/genres/")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => pageHead("Genres · PHRASEFORM", "Seven hardstyle genre kits: early, nu-style, euphoric, rawstyle, rawphoric, xtra raw, and uptempo.")
});
var LANE_META = {
	kick: {
		name: "Kick",
		short: "KICK",
		hint: "Downbeat weapon. Tok, pitch, distortion, kickrolls."
	},
	bass: {
		name: "Reverse bass",
		short: "RB",
		hint: "Offbeat after every kick. The hardstyle groove."
	},
	perc: {
		name: "Perc / claps",
		short: "PERC",
		hint: "Clap after kick, hats, rides, snare rolls in builds."
	},
	fx: {
		name: "FX",
		short: "FX",
		hint: "Risers, impacts, crashes, downlifters, white noise."
	},
	atm: {
		name: "Atmosphere",
		short: "ATM",
		hint: "Pads, noise beds, cinematic drones, filtered world."
	},
	lead: {
		name: "Leads",
		short: "LEAD",
		hint: "Supersaw, screech, hoover, zaag. Sidechain to kick."
	},
	chords: {
		name: "Chords / stabs",
		short: "CHD",
		hint: "Minor stabs, supersaw chords, piano in breaks."
	},
	vox: {
		name: "Vocals",
		short: "VOX",
		hint: "Hook, MC, chops, spoken. Sit above the kick, not in it."
	}
};
var KIND_META = {
	intro: {
		name: "Intro",
		dj: "4 or 8 to get in. Grow it later if the mix needs a longer runway."
	},
	tease: {
		name: "Tease",
		dj: "Flash the identity, then take it away."
	},
	break: {
		name: "Break",
		dj: "Groove without dumping the whole lead."
	},
	build: {
		name: "Build",
		dj: "Tighten it. Last 4–8 is the lift."
	},
	drop: {
		name: "Drop A",
		dj: "First hit. Think in 16s or 32s."
	},
	dropB: {
		name: "Drop B",
		dj: "Change something — kick, layer, or the riff. Don't clone A."
	},
	breakdown: {
		name: "Breakdown",
		dj: "Hands up or go dark. Kick usually sits out."
	},
	bridge: {
		name: "Bridge",
		dj: "A reset between two hits, not a second song."
	},
	outro: {
		name: "Outro",
		dj: "Strip it so the next DJ can actually mix."
	}
};
var KEYS_MINOR = [
	"C minor",
	"C# minor",
	"D minor",
	"Eb minor",
	"E minor",
	"F minor",
	"F# minor",
	"G minor",
	"Ab minor",
	"A minor",
	"Bb minor",
	"B minor"
];
var KEYS_MAJOR = [
	"C major",
	"Db major",
	"D major",
	"Eb major",
	"E major",
	"F major",
	"F# major",
	"G major",
	"Ab major",
	"A major",
	"Bb major",
	"B major"
];
var KEYS_ALL = [...KEYS_MINOR, ...KEYS_MAJOR];
function shortKey(k) {
	return k.replace(" minor", "m").replace(" major", "");
}
function pickKey(rng) {
	const pool = rng() < .85 ? KEYS_MINOR : KEYS_MAJOR;
	return pool[Math.floor(rng() * pool.length)];
}
function ref(title, artist, why, form, steal) {
	return {
		title,
		artist,
		why,
		form,
		steal
	};
}
function R(partial) {
	return partial;
}
function baseRecipes(overrides) {
	return {
		intro: R({
			intent: "Kick the session off. 4 bars of FX or 8 of a filtered kick — that's how most of these actually start.",
			energy: 2,
			defaultBars: 8,
			lanes: {
				kick: {
					state: "filter",
					put: "Filtered or half-open on every downbeat. First 4 can be FX only."
				},
				bass: {
					state: "sparse",
					put: "Reverse bass on the offbeat from bar 5, quieter than the drop."
				},
				perc: {
					state: "sparse",
					put: "Hats only. No snare roll yet."
				},
				fx: {
					state: "sparse",
					put: "Crash or reverse hit at bar 1. Keep the first 4 almost empty."
				},
				atm: {
					state: "full",
					put: "A room, not a loop. Dark or airy bed."
				},
				lead: {
					state: "off",
					put: "Leave the lead out. Save the surprise."
				},
				chords: {
					state: "off",
					put: "Not yet."
				},
				vox: {
					state: "off",
					put: "A whisper if you must. Not the hook."
				}
			},
			notes: ["4-bar FX pickup or 8-bar kick intro. You can duplicate later if a DJ mix needs 16."],
			howToBuild: ["Bars 1–4: FX / atmosphere. 5–8: filtered kick on 1-2-3-4.", "Program kick + reverse bass as an 8-bar loop after that. Don't open the full kick until the build or drop."]
		}),
		tease: R({
			intent: "Flash one bar of the identity, then snatch it back.",
			energy: 2,
			defaultBars: 8,
			lanes: {
				kick: {
					state: "filter",
					put: "Kick stays filtered or dry."
				},
				bass: {
					state: "sparse",
					put: "Reverse bass keeps walking."
				},
				perc: {
					state: "sparse",
					put: "Light clap."
				},
				fx: {
					state: "sparse",
					put: "Reverse cymbal into the next phrase."
				},
				atm: {
					state: "full",
					put: "Pads open a little."
				},
				lead: {
					state: "sparse",
					put: "One motif, 2–4 notes, then shut up."
				},
				chords: {
					state: "sparse",
					put: "Soft stab on the 1 of each 8."
				},
				vox: {
					state: "sparse",
					put: "The title word, once."
				}
			},
			notes: ["If you dump the whole riff here, Drop A feels cheap."],
			howToBuild: ["Copy 8 bars of the drop lead, mute everything except the first phrase.", "Low-pass the lead around 1 kHz."]
		}),
		break: R({
			intent: "A groove DJs can ride. Don't spend the hook yet.",
			energy: 3,
			defaultBars: 16,
			lanes: {
				kick: {
					state: "full",
					put: "Kick in, not climax distortion."
				},
				bass: {
					state: "full",
					put: "Reverse bass at drop level."
				},
				perc: {
					state: "full",
					put: "Clap after the kick."
				},
				fx: {
					state: "sparse",
					put: "Crashes on 8s."
				},
				atm: {
					state: "sparse",
					put: "Thin the pad so the kick has air."
				},
				lead: {
					state: "sparse",
					put: "A counter-riff or a muted saw. Not the main line."
				},
				chords: {
					state: "sparse",
					put: "Offbeat stabs if it needs glue."
				},
				vox: {
					state: "off",
					put: "Save the sung hook for the breakdown."
				}
			},
			notes: ["Treat it like a tool loop — 16 that can repeat in a set."],
			howToBuild: ["Lock kick + reverse bass + clap first. Add one extra layer, then stop."]
		}),
		build: R({
			intent: "Tighten the screws. Last 4 bars do the lift.",
			energy: 4,
			defaultBars: 16,
			lanes: {
				kick: {
					state: "sparse",
					put: "Kick often drops out, or pitches up the last 4."
				},
				bass: {
					state: "off",
					put: "Mute reverse bass so the drop slam actually slams."
				},
				perc: {
					state: "climax",
					put: "Snare roll: 8ths → 16ths → 32nds last bar."
				},
				fx: {
					state: "climax",
					put: "Riser, white noise, reverse crash, impact on the 1."
				},
				atm: {
					state: "filter",
					put: "Filter-open the pad with the riser."
				},
				lead: {
					state: "sparse",
					put: "Stabs or a rising motif. Not the full riff."
				},
				chords: {
					state: "sparse",
					put: "Hold a tension chord."
				},
				vox: {
					state: "sparse",
					put: "A chop or a count-in on the last 4."
				}
			},
			notes: ["Empty the low end in the last 2–4. First kick of the drop has to be the new event."],
			howToBuild: ["Draw a 16-bar snare, automate density.", "Riser + pad filter. Cut kick and reverse bass from bar 13–16."]
		}),
		drop: R({
			intent: "This is the hit. Full groove + the main idea, usually 32.",
			energy: 5,
			defaultBars: 32,
			lanes: {
				kick: {
					state: "full",
					put: "Open kick, full body, clap after it."
				},
				bass: {
					state: "full",
					put: "Reverse bass every offbeat, ducked under the kick."
				},
				perc: {
					state: "full",
					put: "Hats + clap. Don't let a snare roll fight the kick."
				},
				fx: {
					state: "sparse",
					put: "Crash on 1 and 17. Impacts on fills."
				},
				atm: {
					state: "off",
					put: "Mute pads — they smear the kick."
				},
				lead: {
					state: "full",
					put: "Main riff, sidechained to kick."
				},
				chords: {
					state: "sparse",
					put: "Stabs on 8-bar turns if the lead has space."
				},
				vox: {
					state: "sparse",
					put: "Hook in the gaps, not on the kick click."
				}
			},
			notes: ["32 = two 16s. Put a little fill at 16 so DJs can phrase-mix.", "Lead busy? Chords out."],
			howToBuild: [
				"8 bars of kick + reverse bass + clap first.",
				"Add the lead. Sidechain lead and bass to the kick.",
				"Duplicate to 32. Change the last 8 a bit — extra screech, fill, chop."
			]
		}),
		dropB: R({
			intent: "Same energy, new information — kick switch, extra screech, or a second riff.",
			energy: 5,
			defaultBars: 32,
			lanes: {
				kick: {
					state: "climax",
					put: "Harder kick, a pitch move, or kickroll fills."
				},
				bass: {
					state: "full",
					put: "Reverse bass stays. Don't reinvent the groove."
				},
				perc: {
					state: "full",
					put: "Same grid. Ride cymbal if you want."
				},
				fx: {
					state: "sparse",
					put: "Fresh crash on 1 so it reads as a new phrase."
				},
				atm: {
					state: "off",
					put: "Still out."
				},
				lead: {
					state: "climax",
					put: "Octave, extra screech, or an answer riff."
				},
				chords: {
					state: "sparse",
					put: "A wider chord on the 1 of each 16 if it needs glue."
				},
				vox: {
					state: "full",
					put: "Hook again, or a shout."
				}
			},
			notes: ["This is why festival tracks feel like they climb instead of looping."],
			howToBuild: ["Duplicate Drop A.", "Change one of: kick, lead layer, vocal. Not all three."]
		}),
		breakdown: R({
			intent: "The bit people film. Kick usually sits out.",
			energy: 2,
			defaultBars: 32,
			lanes: {
				kick: {
					state: "off",
					put: "Mute. A heartbeat pulse under the last 8 is fine."
				},
				bass: {
					state: "off",
					put: "Mute reverse bass."
				},
				perc: {
					state: "off",
					put: "Soft ticks only if it needs a clock."
				},
				fx: {
					state: "sparse",
					put: "Reverse whoosh into the build."
				},
				atm: {
					state: "full",
					put: "Wide pads, piano, strings — or an industrial drone if it's raw."
				},
				lead: {
					state: "full",
					put: "A melody you can actually sing. Clean, not distorted."
				},
				chords: {
					state: "full",
					put: "Full minor progression. This is the song."
				},
				vox: {
					state: "full",
					put: "Verse / hook. Make it singable."
				}
			},
			notes: ["Give it a melody, not just atmosphere.", "Last 8 should already lean into the next build."],
			howToBuild: [
				"Write 8 bars of chords, loop to 32.",
				"Vocal first, then a lead that follows it.",
				"Slow filter open toward the build."
			]
		}),
		bridge: R({
			intent: "A short reset between two hits. Not a second breakdown.",
			energy: 3,
			defaultBars: 16,
			lanes: {
				kick: {
					state: "filter",
					put: "Kick comes back half-open."
				},
				bass: {
					state: "sparse",
					put: "Reverse bass ghosted."
				},
				perc: {
					state: "sparse",
					put: "Hats only."
				},
				fx: {
					state: "sparse",
					put: "Downlifter off the previous drop."
				},
				atm: {
					state: "full",
					put: "Hold whatever atmosphere you had."
				},
				lead: {
					state: "sparse",
					put: "A motif, not the riff."
				},
				chords: {
					state: "sparse",
					put: "One stab pattern."
				},
				vox: {
					state: "sparse",
					put: "Ad-lib."
				}
			},
			notes: ["Use a bridge when another breakdown would stall the floor."],
			howToBuild: ["16 max. If it wants to be 32, it's a breakdown."]
		}),
		outro: R({
			intent: "Mix-out. Leave tools a DJ can actually beatmatch.",
			energy: 2,
			defaultBars: 16,
			lanes: {
				kick: {
					state: "full",
					put: "Open kick, stable. No pitch tricks."
				},
				bass: {
					state: "full",
					put: "Reverse bass at mix-out level."
				},
				perc: {
					state: "sparse",
					put: "Hats. Lose the busy fills."
				},
				fx: {
					state: "sparse",
					put: "One crash, then dry."
				},
				atm: {
					state: "off",
					put: "Mute pads."
				},
				lead: {
					state: "off",
					put: "Kill the lead so the next intro can speak."
				},
				chords: {
					state: "off",
					put: "Off."
				},
				vox: {
					state: "off",
					put: "Off."
				}
			},
			notes: ["Last 16 should mix as easily as the first 16."],
			howToBuild: ["Copy the intro groove, open the kick, strip the identity."]
		}),
		...overrides
	};
}
var GENRES = {
	early: {
		id: "early",
		name: "Early / Classic",
		short: "Reverse bass era. Simple phrases, long mix-ins.",
		bpm: 148,
		bpmRange: [142, 150],
		keys: KEYS_ALL,
		kick: "Long-tail reverse-bass kick. Less tok, more body. Keep it simple.",
		groove: "Kick on 1-2-3-4, reverse bass on the offbeats. That is the genre.",
		lead: "Hoovers, early screeches, analog stabs. One riff is enough.",
		vibe: "Warehouse, Scantraxx, Qlimax 2003–2008. Nostalgic and direct.",
		mixTip: "Don't stack six layers. If the reverse bass is right, leave it.",
		references: [
			ref("The Prophecy", "Deepack", "Anthem intro, then the reverse bass does the talking.", [
				"intro",
				"tease",
				"build",
				"drop",
				"dropB",
				"break",
				"build",
				"drop",
				"outro"
			], "Steal the long mix-in and the simple riff. Groove carries it, lead stays short."),
			ref("FTS", "Showtek", "Spoken intro, one riff, you still remember the drop.", [
				"intro",
				"tease",
				"build",
				"drop",
				"break",
				"build",
				"dropB",
				"outro"
			], "One spoken line, one riff. Don't write a second song in Drop B — just hit harder."),
			ref("The Sacrifice", "Headhunterz", "Melody on a classic kick/bass bed.", [
				"intro",
				"build",
				"drop",
				"breakdown",
				"build",
				"dropB",
				"outro"
			], "Melody in the break, same contour in the drop. Kick/bass never get fancy."),
			ref("Ti Sento", "Technoboy", "Italian reverse bass, long phrases.", [
				"intro",
				"break",
				"build",
				"drop",
				"dropB",
				"outro"
			], "Long 32s. Reverse bass is the star. Don't rush the outro."),
			ref("Life Beyond Earth", "Project One", "Golden-age discipline — identity, then lift.", [
				"intro",
				"tease",
				"build",
				"drop",
				"breakdown",
				"build",
				"dropB",
				"outro"
			], "Tease the motif, spend it in Drop A, sing it in the break, bigger in B.")
		],
		templates: [[
			"intro",
			"tease",
			"build",
			"drop",
			"break",
			"build",
			"dropB",
			"outro"
		], [
			"intro",
			"build",
			"drop",
			"dropB",
			"breakdown",
			"build",
			"drop",
			"outro"
		]],
		recipes: baseRecipes({ drop: R({
			intent: "Classic drop: reverse bass is the star, lead is a hook not a wall.",
			energy: 5,
			defaultBars: 32,
			lanes: {
				kick: {
					state: "full",
					put: "Classic reverse-bass kick, long tail, not a modern tok."
				},
				bass: {
					state: "full",
					put: "Loud offbeat reverse bass. This is 80% of the drop."
				},
				perc: {
					state: "sparse",
					put: "Minimal. Maybe a clap, no modern 16th hats."
				},
				fx: {
					state: "sparse",
					put: "Crash on 1. Tape-style noise if any."
				},
				atm: {
					state: "off",
					put: "Off."
				},
				lead: {
					state: "full",
					put: "Hoover: F–C–F–C | Ab–C–F–C quarters. Gaps for reverse bass. Etch 2.5 kHz."
				},
				chords: {
					state: "off",
					put: "Usually off — early records are riff-led."
				},
				vox: {
					state: "sparse",
					put: "MC line or sample, not a sung chorus."
				}
			},
			notes: ["Think FTS / Ti Sento: the groove carries, the riff is short."],
			howToBuild: ["Program 8 bars of kick + reverse bass only. Bounce it. If it does not move you, fix this before any lead.", "Add a 1–2 bar hoover motif and loop it."]
		}) })
	},
	nustyle: {
		id: "nustyle",
		name: "Nu-Style",
		short: "Golden age toks, bigger songs, 2008–2012.",
		bpm: 150,
		bpmRange: [148, 152],
		keys: KEYS_ALL,
		kick: "Layered tok: click + body + tail. Punchier than early.",
		groove: "Reverse bass still rules. Clap sits just after the kick.",
		lead: "More melodic, psy-tinged, festival-ready riffs.",
		vibe: "Headhunterz, Wildstylez, Noisecontrollers, Project One.",
		mixTip: "Sidechain the leads and reverse bass to the tok. Leave a hole for the click.",
		references: [
			ref("Scrap Attack", "Headhunterz", "Defqon anthem shape: identity, then the lift.", [
				"intro",
				"tease",
				"build",
				"drop",
				"dropB",
				"breakdown",
				"build",
				"drop",
				"outro"
			], "Two drops before the big vocal break. Second drop after the break is the one people remember."),
			ref("Tonight", "Headhunterz, Wildstylez, Noisecontrollers", "Long build, reverse bass payoff.", [
				"intro",
				"breakdown",
				"build",
				"drop",
				"dropB",
				"outro"
			], "Sing first. The drop is the payoff, not the intro. Keep the outro usable."),
			ref("Timeless", "Wildstylez", "Melody-first nu-style drop.", [
				"intro",
				"tease",
				"build",
				"drop",
				"breakdown",
				"build",
				"dropB",
				"outro"
			], "Write the melody before the tok. Drop B is the same line, bigger."),
			ref("Music Made Addict", "D-Block & S-te-Fan", "Actual song structure inside hardstyle.", [
				"intro",
				"break",
				"build",
				"drop",
				"breakdown",
				"build",
				"dropB",
				"outro"
			], "Groove break like a tool, then a proper song in the middle."),
			ref("So High", "Noisecontrollers", "Psy lead over a clean tok.", [
				"intro",
				"tease",
				"build",
				"drop",
				"dropB",
				"breakdown",
				"build",
				"drop",
				"outro"
			], "Lead has gaps. Don't wallpaper the tok with saws.")
		],
		templates: [[
			"intro",
			"tease",
			"build",
			"drop",
			"dropB",
			"breakdown",
			"build",
			"drop",
			"outro"
		], [
			"intro",
			"break",
			"build",
			"drop",
			"breakdown",
			"build",
			"dropB",
			"outro"
		]],
		recipes: baseRecipes({ drop: R({
			intent: "Tok kick, reverse bass, a proper melody. Festival mainstage 2009.",
			energy: 5,
			defaultBars: 32,
			lanes: {
				kick: {
					state: "full",
					put: "Tok kick. Clap 1/16 after the transient."
				},
				bass: {
					state: "full",
					put: "Reverse bass sidechained hard to the tok."
				},
				perc: {
					state: "full",
					put: "Hats that do not steal the click."
				},
				fx: {
					state: "sparse",
					put: "Crash on 1 and 17."
				},
				atm: {
					state: "off",
					put: "Off in the drop."
				},
				lead: {
					state: "full",
					put: "8-bar call/answer in Fm: F G Ab C hold, then Eb C Ab F. Etch 2.8 kHz, HP 250."
				},
				chords: {
					state: "sparse",
					put: "Stabs on the turnarounds."
				},
				vox: {
					state: "sparse",
					put: "Catchphrase, not a full verse."
				}
			},
			notes: ["Drop A = melody A. Save a second motif for Drop B or the second drop."],
			howToBuild: ["Lock tok + reverse bass + clap as an 8-bar loop.", "Write an 8-bar lead. Duplicate to 32 with a fill at 16."]
		}) })
	},
	euphoric: {
		id: "euphoric",
		name: "Euphoric",
		short: "Pitched kicks, supersaws, sing-along breakdowns.",
		bpm: 150,
		bpmRange: [148, 155],
		keys: KEYS_ALL,
		kick: "Pitched, musical, punchy — not fully distorted. Tune it to the key.",
		groove: "Reverse bass + pitched kick. Leads duck on every kick.",
		lead: "Supersaw (JP-8080 / Serum). Emotional, major-colour over minor chords.",
		vibe: "Hands in the air. Brennan Heart, Wildstylez, Da Tweekaz, Sound Rush.",
		mixTip: "Tune the kick. Duck the supersaws. Vocals live in the break, chops in the drop.",
		references: [
			ref("Imaginary", "Brennan Heart", "The vocal break is the song. Drop is the payoff.", [
				"intro",
				"tease",
				"build",
				"drop",
				"breakdown",
				"build",
				"dropB",
				"outro"
			], "Don't front-load the vocal. Hit first, then sing, then hit harder. Same melody both times."),
			ref("Year of Summer", "Wildstylez", "Sung hook + pitched kick. The template.", [
				"intro",
				"breakdown",
				"build",
				"drop",
				"dropB",
				"outro"
			], "Sing before you drop. Pitched kick, not a brick. Drop B is the hook chopped, not a new tune."),
			ref("Release", "Atmozfears", "Clean modern 32s.", [
				"intro",
				"tease",
				"build",
				"drop",
				"dropB",
				"breakdown",
				"build",
				"drop",
				"outro"
			], "Two drops, then the break, then the one that actually ends the set."),
			ref("Stay With Me", "Sound Rush & Sogma", "Festival vocal into a supersaw wall.", [
				"intro",
				"breakdown",
				"build",
				"drop",
				"bridge",
				"build",
				"dropB",
				"outro"
			], "Vocal identity up front. Bridge instead of a second ballad. Drop B goes wider, not darker."),
			ref("Live Forever", "Headhunterz", "Anthem break into a musical kick.", [
				"intro",
				"tease",
				"build",
				"drop",
				"breakdown",
				"build",
				"dropB",
				"outro"
			], "Keep the kick musical. If it turns into a wall, you wrote the wrong record.")
		],
		templates: [[
			"intro",
			"tease",
			"build",
			"drop",
			"dropB",
			"breakdown",
			"build",
			"drop",
			"dropB",
			"outro"
		], [
			"intro",
			"breakdown",
			"build",
			"drop",
			"bridge",
			"build",
			"dropB",
			"outro"
		]],
		recipes: baseRecipes({
			breakdown: R({
				intent: "This is the song. Melody, vocal, chords. Kick out.",
				energy: 2,
				defaultBars: 32,
				lanes: {
					kick: {
						state: "off",
						put: "Out. A soft pulse in the last 8 is fine."
					},
					bass: {
						state: "off",
						put: "Out."
					},
					perc: {
						state: "off",
						put: "Out, or a quiet clock."
					},
					fx: {
						state: "sparse",
						put: "Reverse into the build."
					},
					atm: {
						state: "full",
						put: "Wide pads, piano, air."
					},
					lead: {
						state: "full",
						put: "Sing-along 8: in Fm, C–Eb–F hold then Ab–F. Same contour as the drop."
					},
					chords: {
						state: "full",
						put: "Fm–Db–Ab–Eb, 2 bars each. Open voicing, C on top if you can."
					},
					vox: {
						state: "full",
						put: "Full hook. Stack a double. Keep lyrics short."
					}
				},
				notes: ["If this part is weak, the euphoric track has nothing to say."],
				howToBuild: [
					"Chords: i–bVI–III–bVII (Fm–Db–Ab–Eb). 2 bars each, C on top.",
					"Lead: minor pentatonic 8-bar, same contour you will drop.",
					"EQ: HP 200 on chords, 280 on lead. Etch lead 2.4 kHz. Open filter across 32."
				]
			}),
			drop: R({
				intent: "Pitched kick + reverse bass + supersaw. Musical, not brutal.",
				energy: 5,
				defaultBars: 32,
				lanes: {
					kick: {
						state: "full",
						put: "Pitched kick in key. Clap after the kick."
					},
					bass: {
						state: "full",
						put: "Reverse bass, sidechained, slightly quieter than rawstyle."
					},
					perc: {
						state: "full",
						put: "Hats that sparkle, not gabber rides."
					},
					fx: {
						state: "sparse",
						put: "Crash on 1 / 17."
					},
					atm: {
						state: "off",
						put: "Off — supersaw already fills the air."
					},
					lead: {
						state: "full",
						put: "Same 8-bar MIDI as the break, 8ths, rest on kick hits. Unison 7, HP 280, etch 2.4 kHz."
					},
					chords: {
						state: "sparse",
						put: "Same four chords, 3-note offbeat 8ths (drop the bass note)."
					},
					vox: {
						state: "sparse",
						put: "Hook chops on the offbeats or last 8."
					}
				},
				notes: ["Keep distortion musical. If the kick is a wall, you left euphoric."],
				howToBuild: [
					"Tune kick to the root or fifth.",
					"8-bar supersaw: pentatonic call/answer. Copy the break. Etch 2.4 kHz, kick click at 4 kHz.",
					"Sidechain lead + bass to kick. Clap a 16th after the kick."
				]
			})
		})
	},
	rawstyle: {
		id: "rawstyle",
		name: "Rawstyle",
		short: "Distorted kicks, screeches, darker 32s.",
		bpm: 155,
		bpmRange: [150, 160],
		keys: KEYS_ALL,
		kick: "Distorted, punchy, often slightly sharp. Kickrolls as fills.",
		groove: "Reverse bass still there, darker. Groove is aggressive, not bouncy.",
		lead: "Screeches, dissonant stabs. Melody is optional.",
		vibe: "Radical Redemption, Rebelion, D-Sturb, Warface, Crypsis.",
		mixTip: "Carve the screech around the kick click. Kickrolls live in the last 4 of a 16.",
		references: [
			ref("Brutal 3.0", "Radical Redemption", "The kick is the lead.", [
				"intro",
				"build",
				"drop",
				"dropB",
				"bridge",
				"build",
				"drop",
				"outro"
			], "Short intro. Kickrolls as language, not decoration. Skip the pretty break."),
			ref("Zombie", "Ran-D", "Dark hook, still a song.", [
				"intro",
				"tease",
				"build",
				"drop",
				"breakdown",
				"build",
				"dropB",
				"outro"
			], "Keep a hook so the raw drop has somewhere to come back to. Spoken, not a pop chorus."),
			ref("The Project", "Sub Zero Project", "Cinematic intro, then identity.", [
				"intro",
				"tease",
				"build",
				"drop",
				"dropB",
				"breakdown",
				"build",
				"drop",
				"outro"
			], "Let the intro feel like a trailer. Don't play the screech until Drop A."),
			ref("Legacy", "D-Sturb", "Modern raw phrasing.", [
				"intro",
				"build",
				"drop",
				"dropB",
				"breakdown",
				"build",
				"drop",
				"outro"
			], "Two full drops, short dark break, then the one with the extra kick layer."),
			ref("Hardest MF", "Rebelion", "Screech + kickroll as the whole language.", [
				"intro",
				"build",
				"drop",
				"dropB",
				"bridge",
				"build",
				"dropB",
				"outro"
			], "16s not 64s. Bridge, not a ballad. Change the kick pattern, not the key.")
		],
		templates: [[
			"intro",
			"build",
			"drop",
			"dropB",
			"breakdown",
			"build",
			"drop",
			"outro"
		], [
			"intro",
			"tease",
			"build",
			"drop",
			"bridge",
			"build",
			"dropB",
			"outro"
		]],
		recipes: baseRecipes({
			breakdown: R({
				intent: "Ominous, cinematic. Not a pop vocal — a threat.",
				energy: 2,
				defaultBars: 32,
				lanes: {
					kick: {
						state: "off",
						put: "Out, or a distant gated pulse."
					},
					bass: {
						state: "off",
						put: "Out."
					},
					perc: {
						state: "off",
						put: "Industrial ticks optional."
					},
					fx: {
						state: "sparse",
						put: "Impacts, reverse hits."
					},
					atm: {
						state: "full",
						put: "Drones, risers in the last 8, foundry air."
					},
					lead: {
						state: "sparse",
						put: "A dark motif, not a supersaw chorus."
					},
					chords: {
						state: "sparse",
						put: "Minor clusters, dissonance ok."
					},
					vox: {
						state: "full",
						put: "Spoken / shouted. Keep it short and mean."
					}
				},
				notes: ["Raw breakdowns fail when they copy euphoric piano. Stay dark."],
				howToBuild: ["One drone, one spoken line, one motif. Then filter into the build."]
			}),
			drop: R({
				intent: "Kick + screech. Melody takes a back seat.",
				energy: 5,
				defaultBars: 32,
				lanes: {
					kick: {
						state: "climax",
						put: "Distorted kick. Kickroll fill at bar 16 and 32."
					},
					bass: {
						state: "full",
						put: "Reverse bass, darker, still on the offbeat."
					},
					perc: {
						state: "sparse",
						put: "Clap after kick. Hats optional."
					},
					fx: {
						state: "sparse",
						put: "Impacts on fills, crash on 1."
					},
					atm: {
						state: "off",
						put: "Off."
					},
					lead: {
						state: "full",
						put: "Screech: F–B–C 16th offbeats. HP 400, etch 3.2 kHz, cut 8 kHz+."
					},
					chords: {
						state: "off",
						put: "Usually off."
					},
					vox: {
						state: "sparse",
						put: "Shout on the 1 of a 16, then out."
					}
				},
				notes: ["If you cannot hum a screech, make the kick pattern the hook."],
				howToBuild: ["Design the kick before anything else.", "8-bar screech. Duplicate. Kickroll the last bar of each 16."]
			})
		})
	},
	rawphoric: {
		id: "rawphoric",
		name: "Rawphoric",
		short: "Euphoric breakdown, raw drop. The 2020s hybrid.",
		bpm: 152,
		bpmRange: [150, 157],
		keys: KEYS_ALL,
		kick: "Raw / distorted in the drop. Musical in the break if it peeks in.",
		groove: "Same reverse-bass grid. Contrast is the arrangement, not the BPM.",
		lead: "Sing-able melody in the break; chopped or screech-layered in the drop.",
		vibe: "Sub Zero Project, Dual Damage, Vertile, D-Block collabs.",
		mixTip: "Contrast is the whole trick. Don't raw-ify the break or sweeten the drop too much.",
		references: [
			ref("It Will Be OK", "Sub Zero Project & Dual Damage", "Vocal break, then a wall.", [
				"intro",
				"breakdown",
				"build",
				"drop",
				"dropB",
				"outro"
			], "Sing the whole identity first. Drop is the same melody, uglier. Don't write a second chorus."),
			ref("Before I Wake", "Headhunterz & Vertile", "Melody identity, harder drop.", [
				"intro",
				"tease",
				"build",
				"drop",
				"breakdown",
				"build",
				"dropB",
				"outro"
			], "Pretty in the break, nasty in B. Same MIDI. The switch is the record."),
			ref("Burning Down", "Dual Damage", "Modern festival rawphoric.", [
				"intro",
				"tease",
				"build",
				"drop",
				"dropB",
				"breakdown",
				"build",
				"drop",
				"outro"
			], "Hit twice, then the vocal, then the one that ends it. Break doesn't need 48 bars."),
			ref("The Upside Down", "Project One", "Anthem break, heavier payoff.", [
				"intro",
				"breakdown",
				"build",
				"drop",
				"dropB",
				"bridge",
				"build",
				"drop",
				"outro"
			], "Anthem up front. Bridge instead of looping the ballad. Last drop is the rawest."),
			ref("Shivers", "D-Block & S-te-Fan & Ran-D", "Songwriting plus a raw kick.", [
				"intro",
				"breakdown",
				"build",
				"drop",
				"dropB",
				"outro"
			], "Write the song, then put a raw kick under the chorus chops. Keep the outro mixable.")
		],
		templates: [[
			"intro",
			"tease",
			"build",
			"drop",
			"dropB",
			"breakdown",
			"build",
			"drop",
			"dropB",
			"outro"
		], [
			"intro",
			"breakdown",
			"build",
			"drop",
			"dropB",
			"bridge",
			"build",
			"drop",
			"outro"
		]],
		recipes: baseRecipes({
			breakdown: R({
				intent: "Write an actual song here. The drop only punches because this bit is human.",
				energy: 2,
				defaultBars: 32,
				lanes: {
					kick: {
						state: "off",
						put: "Out."
					},
					bass: {
						state: "off",
						put: "Out."
					},
					perc: {
						state: "off",
						put: "Out."
					},
					fx: {
						state: "sparse",
						put: "Air into the last 8."
					},
					atm: {
						state: "full",
						put: "Lush pads / piano."
					},
					lead: {
						state: "full",
						put: "Memorable melody. Same notes you will later distort."
					},
					chords: {
						state: "full",
						put: "Clear minor progression."
					},
					vox: {
						state: "full",
						put: "Sung hook. This is the title."
					}
				},
				notes: ["Reuse this melody as chops or a distorted layer in Drop B."],
				howToBuild: ["Finish the vocal + chords before designing the raw kick.", "Export a dry melody stem to resample into the drop."]
			}),
			drop: R({
				intent: "Raw kick, but the melody (or a chop of it) still exists.",
				energy: 5,
				defaultBars: 32,
				lanes: {
					kick: {
						state: "climax",
						put: "Raw / distorted kick. Kickrolls as 16-bar punctuation."
					},
					bass: {
						state: "full",
						put: "Reverse bass at raw level."
					},
					perc: {
						state: "sparse",
						put: "Clap after kick."
					},
					fx: {
						state: "sparse",
						put: "Crash on 1."
					},
					atm: {
						state: "off",
						put: "Off."
					},
					lead: {
						state: "full",
						put: "Melody chopped, or screech answering the vocal hook."
					},
					chords: {
						state: "off",
						put: "Off — kick + lead only."
					},
					vox: {
						state: "sparse",
						put: "One-shot of the hook on bar 1 and 17."
					}
				},
				notes: ["If you mute the kick and still hear the song, the hybrid is working."],
				howToBuild: ["Design a raw kick that can sit under a melodic chop.", "Place 1-bar vocal chops on 8s, screech in the gaps."]
			})
		})
	},
	xtraraw: {
		id: "xtraraw",
		name: "Xtra Raw",
		short: "Zaag kicks, short phrases, almost no break.",
		bpm: 158,
		bpmRange: [154, 165],
		keys: KEYS_ALL,
		kick: "Reese / zaag, short tail, aggressive top. Kick is the lead.",
		groove: "Less bounce, more pressure. Reverse bass optional or distorted with the kick.",
		lead: "Screech, zaag tails, atonal. Melody is a luxury.",
		vibe: "Sickmode, Rooler, Adjuzt, Dual Damage club edits, The Straikerz.",
		mixTip: "Shorter phrases. 16-bar drops. Don't write a 48-bar breakdown — nobody asked.",
		references: [
			ref("TOO COLD", "Sickmode & Rooler", "Attitude + kick. Not a ballad.", [
				"intro",
				"build",
				"drop",
				"dropB",
				"bridge",
				"build",
				"drop",
				"outro"
			], "Get in fast. 16s. One arrogant line. Change the kick pattern, don't write a chorus."),
			ref("SAVE ME", "Sickmode, Rooler & Krowdexx", "Festival xtra-raw with a title hook.", [
				"intro",
				"tease",
				"build",
				"drop",
				"dropB",
				"breakdown",
				"build",
				"drop",
				"outro"
			], "A title you can shout, then kick language. Break is 16 of sneer, not a piano."),
			ref("ANNOYING MUSIC", "Rooler", "Kick language as personality.", [
				"intro",
				"build",
				"drop",
				"dropB",
				"build",
				"drop",
				"outro"
			], "No breakdown. Intro is 4. The kick pattern is the hook."),
			ref("CPU", "DEEZL", "Industrial, tight 16s.", [
				"intro",
				"build",
				"drop",
				"dropB",
				"bridge",
				"drop",
				"outro"
			], "Industrial ticks, not hats. Bridge is a breath, then straight back in."),
			ref("V4MOS", "The Straikerz & Sickmode", "Kickroll-forward phrasing.", [
				"intro",
				"build",
				"drop",
				"dropB",
				"build",
				"drop",
				"outro"
			], "Kickrolls inside the phrase, not just at the end. 16 + 16, then a bigger last hit.")
		],
		templates: [[
			"intro",
			"build",
			"drop",
			"dropB",
			"bridge",
			"build",
			"drop",
			"outro"
		], [
			"intro",
			"build",
			"drop",
			"dropB",
			"build",
			"drop",
			"outro"
		]],
		recipes: baseRecipes({
			intro: R({
				intent: "Get to the kick fast. 4–8 bars, then hit.",
				energy: 3,
				defaultBars: 8,
				lanes: {
					kick: {
						state: "filter",
						put: "Gated or high-passed zaag already teasing the drop kick."
					},
					bass: {
						state: "off",
						put: "Often skip classic reverse bass."
					},
					perc: {
						state: "sparse",
						put: "Hats, industrial ticks."
					},
					fx: {
						state: "sparse",
						put: "Impacts."
					},
					atm: {
						state: "sparse",
						put: "Noise bed, not a pad bed."
					},
					lead: {
						state: "off",
						put: "Off."
					},
					chords: {
						state: "off",
						put: "Off."
					},
					vox: {
						state: "sparse",
						put: "One arrogant line."
					}
				},
				notes: ["If the intro is 64 bars, you wrote the wrong genre."],
				howToBuild: ["16 of attitude, then build. If the intro is 64, wrong genre."]
			}),
			breakdown: R({
				intent: "Keep it short. A 16-bar sneer, not a ballad.",
				energy: 2,
				defaultBars: 16,
				lanes: {
					kick: {
						state: "off",
						put: "Out."
					},
					bass: {
						state: "off",
						put: "Out."
					},
					perc: {
						state: "off",
						put: "Out."
					},
					fx: {
						state: "sparse",
						put: "Reverse into the build."
					},
					atm: {
						state: "full",
						put: "Ugly drone."
					},
					lead: {
						state: "sparse",
						put: "A nasty motif."
					},
					chords: {
						state: "off",
						put: "Off."
					},
					vox: {
						state: "full",
						put: "Spoken hook."
					}
				},
				notes: ["Cap at 16 unless the vocal actually needs 32."],
				howToBuild: ["One line, one drone, out."]
			}),
			drop: R({
				intent: "Kick is the lead. 16s, not 64s.",
				energy: 5,
				defaultBars: 16,
				lanes: {
					kick: {
						state: "climax",
						put: "Zaag / reese kick. Kickrolls inside the phrase, not only at the end."
					},
					bass: {
						state: "sparse",
						put: "Optional. Many xtra-raw kicks carry their own bass."
					},
					perc: {
						state: "sparse",
						put: "Clap after kick if it needs a tick."
					},
					fx: {
						state: "sparse",
						put: "Impact on 1."
					},
					atm: {
						state: "off",
						put: "Off."
					},
					lead: {
						state: "sparse",
						put: "Screech answers, not a 32-bar melody."
					},
					chords: {
						state: "off",
						put: "Off."
					},
					vox: {
						state: "sparse",
						put: "Chant on the 1."
					}
				},
				notes: ["Prefer 16 + 16 Drop B over one 32 that does not change."],
				howToBuild: ["Design the kick as if it were a bassline.", "Write kickroll patterns as MIDI, not as afterthoughts."]
			})
		})
	},
	uptempo: {
		id: "uptempo",
		name: "Uptempo",
		short: "180–200 BPM. Kick-on-kick. Relentless 16s and 32s.",
		bpm: 190,
		bpmRange: [175, 205],
		keys: KEYS_ALL,
		kick: "Tight, compressed, often the entire low-mid. Kick is the track.",
		groove: "Four-on-the-floor at speed. Reverse bass is optional / gabber-like.",
		lead: "Screeches, stamped motifs, sometimes a happy-hardcore quote.",
		vibe: "Angerfist-adjacent energy, Sefa/Peacock when it goes euphoric-fast, Deadly Guns darkness.",
		mixTip: "Everything shorter. A 32 at 190 is already a long time on the floor.",
		references: [
			ref("Penitentiary", "Angerfist", "Hook plus relentless kick.", [
				"intro",
				"build",
				"drop",
				"dropB",
				"bridge",
				"build",
				"drop",
				"outro"
			], "Identity sample, then kick pressure. Don't pause for a ballad unless the sample needs it."),
			ref("Obey", "Sefa", "Faster, still phrased in clean 16s.", [
				"intro",
				"drop",
				"build",
				"dropB",
				"breakdown",
				"build",
				"drop",
				"outro"
			], "Hit early. A short sung/shouted break, then back. 16s stay 16s even at 190."),
			ref("Street Fighter", "Angerfist", "Sample identity, then the kick.", [
				"intro",
				"tease",
				"build",
				"drop",
				"dropB",
				"outro"
			], "Tease the sample, dump it in the drop, mix out. No mid-track TED talk."),
			ref("Trip to Ireland", "Dr. Peacock", "Melodic uptempo, still in phrases.", [
				"intro",
				"breakdown",
				"build",
				"drop",
				"dropB",
				"outro"
			], "Melody in the break, kicks at speed after. Don't hold pads across a 190 drop."),
			ref("This Is Dedicated", "Partyraiser", "Classic hardcore phrase discipline, just faster.", [
				"intro",
				"build",
				"drop",
				"dropB",
				"bridge",
				"drop",
				"outro"
			], "Two drops, a breath, last hit. Outro is kick-only so the next record can come in.")
		],
		templates: [[
			"intro",
			"build",
			"drop",
			"dropB",
			"bridge",
			"build",
			"drop",
			"outro"
		], [
			"intro",
			"drop",
			"build",
			"dropB",
			"breakdown",
			"build",
			"drop",
			"outro"
		]],
		recipes: baseRecipes({
			intro: R({
				intent: "Fast mix-in. 4–8 of usable kick.",
				energy: 3,
				defaultBars: 8,
				lanes: {
					kick: {
						state: "full",
						put: "Kick already mostly open — DJs mix at this speed."
					},
					bass: {
						state: "sparse",
						put: "Optional gabber offbeat."
					},
					perc: {
						state: "sparse",
						put: "Hats."
					},
					fx: {
						state: "sparse",
						put: "Impacts."
					},
					atm: {
						state: "sparse",
						put: "Noise / siren bed."
					},
					lead: {
						state: "off",
						put: "Off."
					},
					chords: {
						state: "off",
						put: "Off."
					},
					vox: {
						state: "sparse",
						put: "Stamp a sample."
					}
				},
				notes: ["Don't write a 64-bar ambient intro at 190."],
				howToBuild: ["16 bars of kick + sample. Build. Drop."]
			}),
			drop: R({
				intent: "Kick pressure. Motif stamped every 8.",
				energy: 5,
				defaultBars: 32,
				lanes: {
					kick: {
						state: "climax",
						put: "Full kick, variations every 8, fills every 16."
					},
					bass: {
						state: "sparse",
						put: "Only if the kick does not already own 80 Hz–200 Hz."
					},
					perc: {
						state: "sparse",
						put: "Claps if they read at this BPM."
					},
					fx: {
						state: "sparse",
						put: "Crash on 1."
					},
					atm: {
						state: "off",
						put: "Off."
					},
					lead: {
						state: "full",
						put: "Short screech or stamped riff every 8 bars."
					},
					chords: {
						state: "off",
						put: "Off unless it is euphoric-uptempo."
					},
					vox: {
						state: "full",
						put: "Shouts, chops, gang vocals on 8s."
					}
				},
				notes: ["At 190, 32 bars is ~40 seconds. That is a full thought. Change something at 16."],
				howToBuild: ["Write 8 bars of kick + vocal stamp.", "Duplicate to 32. Mutate bars 17–32 (pitch, extra screech, extra kick layer)."]
			}),
			breakdown: R({
				intent: "Brief. A hook or a threat, then back.",
				energy: 2,
				defaultBars: 16,
				lanes: {
					kick: {
						state: "off",
						put: "Out."
					},
					bass: {
						state: "off",
						put: "Out."
					},
					perc: {
						state: "off",
						put: "Out."
					},
					fx: {
						state: "sparse",
						put: "Reverse into build."
					},
					atm: {
						state: "full",
						put: "Pad or organ if happy; drone if dark."
					},
					lead: {
						state: "full",
						put: "The melody, if this is the euphoric-fast cousin."
					},
					chords: {
						state: "sparse",
						put: "Optional."
					},
					vox: {
						state: "full",
						put: "Hook. Keep it 8–16 bars."
					}
				},
				notes: ["Cap it. Uptempo crowds punish long silence."],
				howToBuild: ["16 bars of hook, 8-bar build, drop."]
			})
		})
	}
};
var GENRE_LIST = GENRE_IDS.map((id) => GENRES[id]);
function barsToTime(bars, bpm) {
	const seconds = bars * 4 / bpm * 60;
	return `${Math.floor(seconds / 60)}:${Math.round(seconds % 60).toString().padStart(2, "0")}`;
}
var $$splitComponentImporter = () => import("./genres._id-BfNqt5yQ.mjs");
var Route = createFileRoute("/genres/$id")({
	beforeLoad: ({ params }) => {
		if (!isGenreId(params.id)) throw notFound();
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: ({ params }) => {
		if (!isGenreId(params.id)) return pageHead("Genre · PHRASEFORM", "Hardstyle genre kit.");
		const g = GENRES[params.id];
		return pageHead(`${g.name} · PHRASEFORM`, g.vibe);
	}
});
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var GenresRoute = Route$9.update({
	id: "/genres",
	path: "/genres",
	getParentRoute: () => Route$11
});
var LicenseRoute = Route$8.update({
	id: "/license",
	path: "/license",
	getParentRoute: () => Route$11
});
var MethodRoute = Route$7.update({
	id: "/method",
	path: "/method",
	getParentRoute: () => Route$11
});
var PricingRoute = Route$6.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$11
});
var PrivacyRoute = Route$5.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$11
});
var SellRoute = Route$4.update({
	id: "/sell",
	path: "/sell",
	getParentRoute: () => Route$11
});
var SoundRoute = Route$3.update({
	id: "/sound",
	path: "/sound",
	getParentRoute: () => Route$11
});
var StudioRoute = Route$2.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$11
});
var GenresIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => GenresRoute
});
var GenresRouteChildren = {
	GenresIdRoute: Route.update({
		id: "/$id",
		path: "/$id",
		getParentRoute: () => GenresRoute
	}),
	GenresIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	GenresRoute: GenresRoute._addFileChildren(GenresRouteChildren),
	LicenseRoute,
	MethodRoute,
	PricingRoute,
	PrivacyRoute,
	SellRoute,
	SoundRoute,
	StudioRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFoundPage
	});
}
//#endregion
export { Sheet as C, cn as D, Button as E, formatMoney as S, SheetTrigger as T, UnlockDialog as _, KEYS_ALL as a, useCommerce as b, barsToTime as c, LANE_IDS as d, LANE_STATES as f, SiteShell as g, PageKicker as h, GENRE_LIST as i, pickKey as l, isGenreId as m, Route as n, KIND_META as o, PHRASE_KINDS as p, GENRES as r, LANE_META as s, router_exports as t, shortKey as u, Input as v, SheetContent as w, LICENSE_TERMS as x, SiteNav as y };
