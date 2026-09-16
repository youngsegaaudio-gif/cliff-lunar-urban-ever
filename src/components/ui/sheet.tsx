import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({
  className,
  children,
  side = "right",
  title,
}: {
  className?: string;
  children: ReactNode;
  side?: "right" | "bottom";
  title: string;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out" />
      <Dialog.Content
        className={cn(
          "fixed z-50 flex flex-col bg-surface text-fg shadow-xl outline-none",
          side === "right" &&
            "inset-y-0 right-0 h-full w-full max-w-md border-l border-border",
          side === "bottom" &&
            "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl border-t border-border",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <Dialog.Title className="font-display text-lg tracking-wide uppercase">{title}</Dialog.Title>
          <Dialog.Close className="inline-flex size-11 items-center justify-center text-muted hover:text-fg">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
