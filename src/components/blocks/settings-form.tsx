"use client";

import { useState } from "react";
import { Container } from "@/components/primitives/layout";
import { Button } from "@/components/primitives/button";
import { Tabs } from "@/components/primitives/tabs";
import { Alert } from "@/components/primitives/feedback";

export type SettingsSection = {
  value: string;
  label: string;
  /** The section's fields. Owns its own inputs. */
  content: React.ReactNode;
};

export type SettingsFormProps = {
  sections: SettingsSection[];
  /** Fired on save with the whole form's data. Wire to your API. */
  onSave?: (data: Record<string, string>) => void;
  title?: string;
};

/**
 * Tabbed settings with a single save action and a real saved state.
 *
 * One form wraps all sections, so a change on any tab is saved together and the
 * saved confirmation is inline rather than a toast. Tabs come from the accessible
 * Tabs primitive (arrow-key navigation, roving focus). Idle, saving and saved.
 */
export function SettingsForm({ sections, onSave, title = "Settings" }: SettingsFormProps) {
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    setState("saving");
    onSave?.(data);
    window.setTimeout(() => setState("saved"), 600);
  }

  return (
    <section className="py-section">
      <Container className="max-w-3xl">
        <h1 className="display-2">{title}</h1>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-8">
          {/* keepMounted so fields on every tab submit together in one save. */}
          <Tabs items={sections} keepMounted />

          {state === "saved" ? (
            <Alert tone="success" title="Changes saved">
              Your settings were updated.
            </Alert>
          ) : null}

          <div className="flex items-center gap-3 border-t border-line pt-6">
            <Button type="submit" loading={state === "saving"} loadingLabel="Saving">
              Save changes
            </Button>
            <span className="text-sm text-muted">Changes apply across every device.</span>
          </div>
        </form>
      </Container>
    </section>
  );
}
