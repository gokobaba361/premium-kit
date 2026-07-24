"use client";

import { CaretLeft, CaretRight, PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";
import { EmptyState } from "@/components/primitives/feedback";
import { cn } from "@/lib/cn";

export type ResourceColumn = { key: string; header: string; numeric?: boolean };

export type ResourceRow = Record<string, string> & { id: string };

export type StatusTone = "neutral" | "positive" | "warning" | "danger";

export type ResourceTableProps = {
  columns: ResourceColumn[];
  rows: ResourceRow[];
  caption?: string;
  /** Which column renders as a status pill rather than plain text. */
  statusKey?: string;
  /** Maps a status value to a tone. Unlisted values render neutral. */
  statusTones?: Record<string, StatusTone>;
  /** The column whose value names the row in action labels, e.g. "name". */
  labelKey?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  /** Client pagination. Omit to render every row. */
  page?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  empty?: { title: string; body: string; action?: React.ReactNode };
};

const toneClass: Record<StatusTone, string> = {
  neutral: "border-line bg-subtle text-muted",
  positive: "border-accent/40 bg-accent-soft text-fg",
  warning: "border-strong bg-elevated text-fg",
  danger: "border-accent bg-accent-soft text-accent",
};

/**
 * An admin resource list: a table with a status pill, per-row edit and delete
 * actions and optional client pagination, with a real empty state.
 *
 * Presentational: it owns no data. Edits and deletes are handed up through
 * onEdit and onDelete so the parent (or a real backend) performs them. The
 * delete button only opens the parent's confirmation; it never deletes on its
 * own, so a destructive action always has a confirm step.
 */
export function ResourceTable({
  columns,
  rows,
  caption,
  statusKey,
  statusTones = {},
  labelKey,
  onEdit,
  onDelete,
  page,
  pageCount,
  onPageChange,
  empty,
}: ResourceTableProps) {
  const hasActions = Boolean(onEdit || onDelete);

  if (rows.length === 0 && empty) {
    return <EmptyState title={empty.title} body={empty.body} action={empty.action} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-left">
          {caption ? (
            <caption className="pb-4 text-left text-sm text-muted">{caption}</caption>
          ) : null}
          <thead>
            <tr className="border-b border-strong">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "pb-3 text-sm font-medium text-muted",
                    column.numeric && "text-right",
                  )}
                >
                  {column.header}
                </th>
              ))}
              {hasActions ? (
                <th scope="col" className="pb-3 text-right text-sm font-medium text-muted">
                  <span className="sr-only">Actions</span>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const label = labelKey ? row[labelKey] : row.id;
              return (
                <tr key={row.id} className="border-b border-line last:border-0">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "py-3.5 text-[0.9375rem]",
                        column.numeric && "text-right font-mono tabular-nums",
                      )}
                    >
                      {statusKey === column.key ? (
                        <span
                          className={cn(
                            "inline-flex items-center rounded-pk-pill border px-2.5 py-0.5 text-xs",
                            toneClass[statusTones[row[column.key]] ?? "neutral"],
                          )}
                        >
                          {row[column.key]}
                        </span>
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}
                  {hasActions ? (
                    <td className="py-3.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        {onEdit ? (
                          <button
                            type="button"
                            onClick={() => onEdit(row.id)}
                            aria-label={`Edit ${label}`}
                            className="flex size-9 items-center justify-center rounded-pk-sm text-muted transition-colors hover:bg-subtle hover:text-fg"
                          >
                            <PencilSimple size={16} weight="bold" />
                          </button>
                        ) : null}
                        {onDelete ? (
                          <button
                            type="button"
                            onClick={() => onDelete(row.id)}
                            aria-label={`Delete ${label}`}
                            className="flex size-9 items-center justify-center rounded-pk-sm text-muted transition-colors hover:bg-accent-soft hover:text-accent"
                          >
                            <Trash size={16} weight="bold" />
                          </button>
                        ) : null}
                      </div>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {page && pageCount && pageCount > 1 && onPageChange ? (
        <nav aria-label="Pagination" className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            className="flex h-9 min-w-9 items-center justify-center rounded-pk-sm border border-line px-2.5 text-muted transition-colors hover:text-fg disabled:cursor-not-allowed disabled:opacity-45"
          >
            <CaretLeft size={14} weight="bold" />
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onPageChange(n)}
              aria-current={n === page ? "page" : undefined}
              className={cn(
                "flex h-9 min-w-9 items-center justify-center rounded-pk-sm border px-2.5 font-mono text-sm tabular-nums transition-colors",
                n === page
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-line text-muted hover:text-fg",
              )}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onPageChange(Math.min(pageCount, page + 1))}
            disabled={page === pageCount}
            aria-label="Next page"
            className="flex h-9 min-w-9 items-center justify-center rounded-pk-sm border border-line px-2.5 text-muted transition-colors hover:text-fg disabled:cursor-not-allowed disabled:opacity-45"
          >
            <CaretRight size={14} weight="bold" />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
