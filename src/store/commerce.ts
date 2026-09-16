import { create } from "zustand";
import { persist } from "zustand/middleware";
import { formatKey, isValidLicenseKey, mintLicenseKey } from "@/lib/license";

export interface IssuedKey {
  key: string;
  createdAt: string;
  note: string;
  sent: boolean;
}

interface CommerceState {
  price: number;
  currency: string;
  paymentUrl: string;
  supportNote: string;
  licensee: string;
  licenseKey: string | null;
  issued: IssuedKey[];
  unlockOpen: boolean;
  isPro: () => boolean;
  setShop: (patch: Partial<Pick<CommerceState, "price" | "currency" | "paymentUrl" | "supportNote">>) => void;
  unlock: (key: string, licensee?: string) => boolean;
  lock: () => void;
  mint: (count: number, note?: string) => IssuedKey[];
  markSent: (key: string) => void;
  setUnlockOpen: (open: boolean) => void;
  setLicensee: (name: string) => void;
}

export const useCommerce = create<CommerceState>()(
  persist(
    (set, get) => ({
      price: 29,
      currency: "AUD",
      paymentUrl: "",
      supportNote: "",
      licensee: "",
      licenseKey: null,
      issued: [],
      unlockOpen: false,
      isPro: () => Boolean(get().licenseKey && isValidLicenseKey(get().licenseKey!)),
      setShop: (patch) => set(patch),
      unlock: (key, licensee) => {
        if (!isValidLicenseKey(key)) return false;
        set({
          licenseKey: formatKey(key),
          licensee: (licensee ?? get().licensee).trim(),
          unlockOpen: false,
        });
        return true;
      },
      lock: () => set({ licenseKey: null }),
      mint: (count, note) => {
        const batch: IssuedKey[] = Array.from({ length: Math.min(20, Math.max(1, count)) }, () => ({
          key: mintLicenseKey(),
          createdAt: new Date().toISOString(),
          note: note?.trim() || "",
          sent: false,
        }));
        set({ issued: [...batch, ...get().issued].slice(0, 200) });
        return batch;
      },
      markSent: (key) =>
        set({
          issued: get().issued.map((k) => (k.key === key ? { ...k, sent: true } : k)),
        }),
      setUnlockOpen: (open) => set({ unlockOpen: open }),
      setLicensee: (name) => set({ licensee: name }),
    }),
    { name: "phraseform-shop", skipHydration: true },
  ),
);
