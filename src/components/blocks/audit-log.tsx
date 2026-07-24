import { Avatar } from "@/components/primitives/data";

export type AuditEntry = {
  id: string;
  actor: string;
  /** A short verb phrase, e.g. "deleted", "changed the role of". */
  action: string;
  /** What the action was performed on, if any. */
  target?: string;
  /** Machine-readable ISO timestamp. */
  timestamp: string;
  /** Optional one-line context, e.g. "from Editor to Admin". */
  detail?: string;
};

export type AuditLogProps = {
  title?: string;
  body?: string;
  entries: AuditEntry[];
  locale?: string;
};

/**
 * An audit trail: who did what, to what, and when.
 *
 * A read-only record rendered from real events. Timestamps are machine-readable
 * ISO strings rendered in the page locale; the rail carries the sequence, so no
 * numbered badges. Server component.
 */
export function AuditLog({ title = "Activity", body, entries, locale = "en-US" }: AuditLogProps) {
  const formatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-muted">{title}</h2>
        {body ? <p className="text-sm leading-relaxed text-muted">{body}</p> : null}
      </div>

      <ol className="flex flex-col">
        {entries.map((entry, index) => (
          <li key={entry.id} className="flex gap-3.5">
            {/* Rail */}
            <div className="flex flex-col items-center">
              <Avatar name={entry.actor} size={32} />
              {index < entries.length - 1 ? (
                <span aria-hidden className="mt-1 w-px flex-1 bg-line" />
              ) : null}
            </div>

            <div className="min-w-0 pb-6">
              <p className="text-[0.9375rem] leading-relaxed">
                <span className="font-medium">{entry.actor}</span>{" "}
                <span className="text-muted">{entry.action}</span>
                {entry.target ? <span className="font-medium"> {entry.target}</span> : null}
                {entry.detail ? <span className="text-muted"> {entry.detail}</span> : null}
              </p>
              <time
                dateTime={entry.timestamp}
                className="mt-1 block font-mono text-xs text-faint"
              >
                {formatter.format(new Date(entry.timestamp))}
              </time>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
