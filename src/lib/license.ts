const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const SALT = "PHRASEFORM-STUDIO-PRO";

function fnv(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function encode4(n: number): string {
  let x = n;
  let out = "";
  for (let i = 0; i < 4; i++) {
    out = ALPHABET[x % ALPHABET.length] + out;
    x = Math.floor(x / ALPHABET.length);
  }
  return out;
}

function random4(): string {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return encode4((bytes[0]! << 24) | (bytes[1]! << 16) | (bytes[2]! << 8) | bytes[3]!);
}

export function mintLicenseKey(): string {
  const a = random4();
  const b = random4();
  const check = encode4(fnv(`${a}${b}${SALT}`));
  return `PF-${a}-${b}-${check}`;
}

export function normalizeKey(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function isValidLicenseKey(raw: string): boolean {
  const compact = normalizeKey(raw);
  if (!compact.startsWith("PF") || compact.length !== 14) return false;
  const body = compact.slice(2, 10);
  const check = compact.slice(10);
  return encode4(fnv(`${body.slice(0, 4)}${body.slice(4)}${SALT}`)) === check;
}

export function formatKey(raw: string): string {
  const compact = normalizeKey(raw);
  if (compact.length !== 14) return raw.trim().toUpperCase();
  return `${compact.slice(0, 2)}-${compact.slice(2, 6)}-${compact.slice(6, 10)}-${compact.slice(10)}`;
}

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

export const LICENSE_TERMS = [
  "One producer, one license. Use it on as many of your own machines as you need.",
  "You may use PHRASEFORM on original tracks, client work, and ghost production.",
  "Do not share, resell, or publish the license key. Do not wrap the generator as your own product.",
  "The arrangements are ideas — the music you write from them is yours.",
];
