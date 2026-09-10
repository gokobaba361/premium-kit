"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CaretLeft,
  CaretRight,
  CheckCircle,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/primitives/button";
import { Tabs } from "@/components/primitives/tabs";
import { Container } from "@/components/primitives/layout";
import { cn } from "@/lib/cn";

export type LessonResource = {
  label: string;
  href: string;
  /** "PDF, 240 KB", "GitHub repository" — say what it is before it is opened. */
  meta?: string;
};

export type LessonShellProps = {
  courseTitle: string;
  courseHref: string;
  moduleTitle?: string;
  title: string;
  /** Whole minutes, matching curriculum-list. */
  durationMin?: number;
  /** "Lesson 4 of 24". Position in the course, not in the module. */
  position?: { index: number; total: number };
  /** The player, embed or reader. Kept as a slot so the block owns no vendor. */
  media?: React.ReactNode;
  /** The lesson body. Wrap prose in .pk-prose in the caller. */
  children?: React.ReactNode;
  transcript?: React.ReactNode;
  resources?: LessonResource[];
  /** A curriculum-list, usually. Rendered as the rail beside the lesson. */
  aside?: React.ReactNode;
  completed?: boolean;
  /** Controlled, like every other selection block here: the page persists it. */
  onComplete?: () => void;
  prevHref?: string;
  nextHref?: string;
  labels?: {
    overview?: string;
    transcript?: string;
    resources?: string;
    complete?: string;
    completed?: string;
    previous?: string;
    next?: string;
    backToCourse?: string;
    noTranscript?: string;
    noResources?: string;
  };
};

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}

/**
 * The frame around a single lesson: where you are, the player, the body, the
 * supporting material and the way out to the next lesson.
 *
 * It owns no video vendor and no progress store. The player arrives through
 * `media`, the curriculum arrives through `aside`, and completion is controlled
 * the way every other selection block here is controlled — the page holds the
 * state and persists it, so a refresh does not lose a finished lesson.
 *
 * Transcript and resources are tabs rather than an accordion because a learner
 * moves between them repeatedly during one lesson, and because a transcript is
 * long enough that keeping it open pushes everything else off the screen. Both
 * panels state their empty case instead of disappearing: a missing transcript
 * is information, and a silently absent tab reads like a bug.
 */
export function LessonShell({
  courseTitle,
  courseHref,
  moduleTitle,
  title,
  durationMin,
  position,
  media,
  children,
  transcript,
  resources = [],
  aside,
  completed = false,
  onComplete,
  prevHref,
  nextHref,
  labels,
}: LessonShellProps) {
  const text = {
    overview: "Overview",
    transcript: "Transcript",
    resources: "Resources",
    complete: "Mark complete",
    completed: "Completed",
    previous: "Previous",
    next: "Next lesson",
    backToCourse: "Back to the course",
    noTranscript: "No transcript for this lesson yet.",
    noResources: "This lesson has no downloads.",
    ...labels,
  };

  const tabs = [
    ...(children ? [{ value: "overview", label: text.overview, content: children }] : []),
    {
      value: "transcript",
      label: text.transcript,
      content: transcript ?? (
        <p className="measure text-[0.9375rem] leading-relaxed text-muted">{text.noTranscript}</p>
      ),
    },
    {
      value: "resources",
      label: text.resources,
      content:
        resources.length > 0 ? (
          <ul className="flex flex-col">
            {resources.map((resource) => (
              <li key={resource.href} className="border-b border-line last:border-0">
                <a
                  href={resource.href}
                  className="flex items-center justify-between gap-4 py-3.5 text-[0.9375rem] transition-colors duration-[var(--pk-dur-fast)] hover:text-accent"
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate font-medium">{resource.label}</span>
                    {resource.meta ? (
                      <span className="text-sm text-faint">{resource.meta}</span>
                    ) : null}
                  </span>
                  <ArrowUpRight size={16} weight="bold" aria-hidden className="shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="measure text-[0.9375rem] leading-relaxed text-muted">{text.noResources}</p>
        ),
    },
  ];

  return (
    <section className="py-section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-faint">
              <Link
                href={courseHref}
                className="transition-colors duration-[var(--pk-dur-fast)] hover:text-fg"
              >
                {courseTitle}
              </Link>
              {moduleTitle ? (
                <>
                  <span aria-hidden>/</span>
                  <span>{moduleTitle}</span>
                </>
              ) : null}
              {position ? (
                <>
                  <span aria-hidden>·</span>
                  <span className="tabular-nums">
                    {position.index} / {position.total}
                  </span>
                </>
              ) : null}
              {durationMin ? (
                <>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1.5 tabular-nums">
                    <Clock size={14} aria-hidden />
                    {formatDuration(durationMin)}
                  </span>
                </>
              ) : null}
            </div>

            <h1 className="display-2 mt-3">{title}</h1>

            {media ? (
              <div className="mt-8 overflow-hidden rounded-pk border border-line bg-subtle">
                {media}
              </div>
            ) : null}

            <div className="mt-10">
              <Tabs items={tabs} />
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                {prevHref ? (
                  <Link
                    href={prevHref}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-pk-sm border border-line px-4 text-sm font-medium transition-colors duration-[var(--pk-dur-fast)] hover:border-strong"
                  >
                    <CaretLeft size={15} weight="bold" aria-hidden />
                    {text.previous}
                  </Link>
                ) : null}
                {nextHref ? (
                  <Link
                    href={nextHref}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-pk-sm border border-line px-4 text-sm font-medium transition-colors duration-[var(--pk-dur-fast)] hover:border-strong"
                  >
                    {text.next}
                    <CaretRight size={15} weight="bold" aria-hidden />
                  </Link>
                ) : null}
              </div>

              {completed ? (
                <p
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent",
                  )}
                >
                  <CheckCircle size={18} weight="fill" aria-hidden />
                  {text.completed}
                </p>
              ) : (
                <Button type="button" onClick={onComplete}>
                  {text.complete}
                </Button>
              )}
            </div>
          </div>

          {aside ? (
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">{aside}</div>
            </aside>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
