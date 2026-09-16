import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatMoney, LICENSE_TERMS } from "@/lib/license";
import { useCommerce } from "@/store/commerce";

export function UnlockDialog() {
  const open = useCommerce((s) => s.unlockOpen);
  const setUnlockOpen = useCommerce((s) => s.setUnlockOpen);
  const unlock = useCommerce((s) => s.unlock);
  const price = useCommerce((s) => s.price);
  const currency = useCommerce((s) => s.currency);
  const paymentUrl = useCommerce((s) => s.paymentUrl);
  const supportNote = useCommerce((s) => s.supportNote);
  const savedName = useCommerce((s) => s.licensee);
  const [key, setKey] = useState("");
  const [name, setName] = useState(savedName);

  useEffect(() => {
    void useCommerce.persist.rehydrate();
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
    } else {
      toast.error("That key is not valid");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setUnlockOpen}>
      <DialogContent title="Phraseform Pro">
        <p className="text-sm text-pretty text-muted">
          One-time license. {formatMoney(price, currency)}. Clean studio-sheet export, JSON project
          files, and a saved arrangement library.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <Button onClick={pay} disabled={!paymentUrl}>
            Pay {formatMoney(price, currency)}
          </Button>
          {!paymentUrl ? (
            <p className="text-xs text-pretty text-muted">
              The seller has not pasted a checkout link yet. They can do that on the Sell page.
            </p>
          ) : (
            <p className="text-xs text-pretty text-muted">
              Pay, then paste the license key they send you.
            </p>
          )}
          {supportNote ? <p className="text-xs text-pretty text-muted">{supportNote}</p> : null}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Licensed to
            <Input
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or alias"
            />
          </label>
          <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
            License key
            <Input
              className="mt-1 font-mono uppercase"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="PF-XXXX-XXXX-XXXX"
              autoCapitalize="characters"
            />
          </label>
          <Button variant="secondary" onClick={submit}>
            Unlock this device
          </Button>
        </div>
        <ul className="mt-4 space-y-1 text-[11px] text-pretty text-subtle">
          {LICENSE_TERMS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
