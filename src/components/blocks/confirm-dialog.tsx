"use client";

import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Warning } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/primitives/button";
import { Field, Input } from "@/components/primitives/form";
import { cn } from "@/lib/cn";

export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** "danger" gives the confirm button and icon the accent-as-warning styling. */
  tone?: "default" | "danger";
  /** When set, the confirm stays disabled until the user types this exact text.
   *  Use it for high-stakes, hard-to-undo actions. */
  confirmPhrase?: string;
  onConfirm: () => void;
};

/**
 * A controlled confirmation for a destructive or irreversible action.
 *
 * A real confirm step, not a bare button: the action only runs when the user
 * confirms here. For the highest-stakes actions, pass confirmPhrase to require
 * the user to type the resource's name first, which prevents a reflexive click.
 * Radix handles the focus trap, escape and scroll lock.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  confirmPhrase,
  onConfirm,
}: ConfirmDialogProps) {
  const [typed, setTyped] = useState("");

  /* Reset the typed phrase as the dialog closes, in the change handler rather
     than an effect (the React Compiler forbids setState synchronously in an
     effect). */
  function handleOpenChange(next: boolean) {
    if (!next) setTyped("");
    onOpenChange(next);
  }

  const phraseSatisfied = !confirmPhrase || typed.trim() === confirmPhrase;
  const danger = tone === "danger";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[color-mix(in_srgb,var(--pk-fg)_45%,transparent)] backdrop-blur-[2px]" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[min(30rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2",
            "rounded-pk border border-line bg-elevated p-7 shadow-pk-lift",
          )}
        >
          <div className="flex items-start gap-3">
            {danger ? (
              <span
                aria-hidden
                className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-pk-sm bg-accent-soft text-accent"
              >
                <Warning size={18} weight="bold" />
              </span>
            ) : null}
            <div className="min-w-0">
              <DialogPrimitive.Title className="display-3">{title}</DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {description}
              </DialogPrimitive.Description>
            </div>
          </div>

          {confirmPhrase ? (
            <form
              className="mt-6"
              onSubmit={(event) => {
                event.preventDefault();
                if (phraseSatisfied) onConfirm();
              }}
            >
              <Field
                label={`Type ${confirmPhrase} to confirm`}
                helper="This cannot be undone."
              >
                <Input
                  value={typed}
                  onChange={(event) => setTyped(event.target.value)}
                  autoComplete="off"
                  aria-label={`Type ${confirmPhrase} to confirm`}
                />
              </Field>
            </form>
          ) : null}

          <div className="mt-8 flex justify-end gap-3">
            <DialogPrimitive.Close asChild>
              <Button variant="secondary">{cancelLabel}</Button>
            </DialogPrimitive.Close>
            <Button disabled={!phraseSatisfied} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
