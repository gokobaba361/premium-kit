"use client";

import { Container } from "@/components/primitives/layout";
import { Avatar } from "@/components/primitives/data";
import { cn } from "@/lib/cn";

export type StaffMember = {
  id: string;
  name: string;
  role?: string;
  photo?: { src: string; alt: string };
};

export type StaffPickerProps = {
  title?: string;
  body?: string;
  staff: StaffMember[];
  selectedId?: string | null;
  onSelect?: (member: StaffMember) => void;
  tone?: "base" | "subtle";
};

/**
 * The second step of a booking flow: choose who (or where).
 *
 * A radiogroup of practitioners or locations, each with an avatar, name and
 * role. Include an "Any available" option in the passed list when the business
 * lets the system assign. Presentational: the parent owns the selection.
 */
export function StaffPicker({
  title = "Choose a practitioner",
  body,
  staff,
  selectedId = null,
  onSelect,
  tone = "base",
}: StaffPickerProps) {
  return (
    <section className={tone === "subtle" ? "bg-subtle py-section" : "py-section"}>
      <Container className="max-w-2xl">
        <div className="flex flex-col gap-3">
          <h2 className="display-3">{title}</h2>
          {body ? (
            <p className="text-[0.9375rem] leading-relaxed text-muted">{body}</p>
          ) : null}
        </div>

        <div
          role="radiogroup"
          aria-label={title}
          className="mt-8 grid gap-3 sm:grid-cols-2"
        >
          {staff.map((member) => {
            const selected = member.id === selectedId;
            return (
              <button
                key={member.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onSelect?.(member)}
                className={cn(
                  "flex items-center gap-3 rounded-pk border p-4 text-left transition-colors",
                  selected
                    ? "border-accent bg-accent-soft"
                    : "border-line hover:border-strong",
                )}
              >
                <Avatar name={member.name} src={member.photo?.src} size={44} />
                <span className="min-w-0">
                  <span className="block truncate text-[0.9375rem] font-medium">
                    {member.name}
                  </span>
                  {member.role ? (
                    <span className="block truncate text-sm text-muted">{member.role}</span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
