import Link from "next/link";
import {
  BookOpen,
  Check,
  CheckCircle,
  Clock,
  LockSimple,
  PencilSimple,
  Play,
  Question,
} from "@phosphor-icons/react/dist/ssr";
import { Container, Section } from "@/components/primitives/layout";
import { cn } from "@/lib/cn";

export type CountLabel = string | ((count: number) => string);

function countLabel(label: CountLabel, count: number) {
  return typeof label === "function" ? label(count) : label;
}

export type LessonKind = "video" | "reading" | "exercise" | "quiz";

/**
 * A lesson's state for the person looking at it.
 *
 * "locked" is about access, the other three are about progress, and keeping
 * them in one field is deliberate: a lesson is never both locked and half
 * finished, and two fields would let a caller describe that.
 */
export type LessonStatus = "locked" | "not-started" | "in-progress" | "complete";

export type CurriculumLesson = {
  id: string;
  title: string;
  /** Whole minutes. A learner is not told a lesson is 7.5 minutes long. */
  durationMin: number;
  kind?: LessonKind;
  href?: string;
  status?: LessonStatus;
  /** Playable before enrolling. Ignored once `enrolled` is true. */
  preview?: boolean;
};

export type CurriculumModule = {
  id: string;
  title: string;
  summary?: string;
  lessons: CurriculumLesson[];
};

export type CurriculumListProps = {
  title?: string;
  body?: string;
  modules: CurriculumModule[];
  /**
   * false is the course sales page: locked lessons carry a lock, free previews
   * are advertised and no progress is claimed. true is the signed-in page:
   * completion is shown and the progress bar appears.
   */
  enrolled?: boolean;
  /** Which modules start expanded. Anything already in progress opens anyway. */
  defaultOpen?: "first" | "all" | "none";
  lessonCountLabel?: CountLabel;
  moduleCountLabel?: CountLabel;
  /** Override for a locale where "2h 15m" is not how a duration reads. */
  formatDuration?: (minutes: number) => string;
  progressLabel?: (completed: number, total: number) => string;
  previewLabel?: string;
  lockedLabel?: string;
  tone?: "base" | "subtle";
};

function defaultDuration(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}

const kindIcon: Record<LessonKind, typeof Play> = {
  video: Play,
  reading: BookOpen,
  exercise: PencilSimple,
  quiz: Question,
};

/**
 * A course curriculum: modules that expand to their lessons.
 *
 * Not steps-flow. A curriculum is hierarchical and stateful — modules contain
 * lessons, and each lesson carries a duration and a completion state — while a
 * steps flow is a flat, stateless explanation of a process.
 *
 * Server-rendered on native details and summary, so it expands without any
 * JavaScript, is keyboard operable for free, and stays findable by find-in-page
 * while collapsed. Progress is passed in from the learner's record; the block
 * never derives or stores it.
 */
export function CurriculumList({
  title = "Curriculum",
  body,
  modules,
  enrolled = false,
  defaultOpen = "first",
  lessonCountLabel = (count) => (count === 1 ? "lesson" : "lessons"),
  moduleCountLabel = (count) => (count === 1 ? "module" : "modules"),
  formatDuration = defaultDuration,
  progressLabel = (completed, total) => `${completed} of ${total} lessons complete`,
  previewLabel = "Free preview",
  lockedLabel = "Locked",
  tone = "base",
}: CurriculumListProps) {
  const lessons = modules.flatMap((module) => module.lessons);
  const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0);
  const completed = lessons.filter((lesson) => lesson.status === "complete").length;
  const percent = lessons.length === 0 ? 0 : Math.round((completed / lessons.length) * 100);

  return (
    <Section tone={tone}>
      <Container>
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="display-3">{title}</h2>
          {body ? <p className="text-[0.9375rem] leading-relaxed text-muted">{body}</p> : null}
          <p className="text-sm text-faint">
            {modules.length} {countLabel(moduleCountLabel, modules.length)} ·{" "}
            {lessons.length} {countLabel(lessonCountLabel, lessons.length)} ·{" "}
            {formatDuration(totalMinutes)}
          </p>
        </div>

        {enrolled ? (
          <div className="mt-8 max-w-2xl">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-medium">{progressLabel(completed, lessons.length)}</p>
              <p className="text-sm tabular-nums text-faint">{percent}%</p>
            </div>
            <div
              role="progressbar"
              aria-valuenow={completed}
              aria-valuemin={0}
              aria-valuemax={lessons.length}
              aria-valuetext={progressLabel(completed, lessons.length)}
              className="mt-2 h-1.5 w-full overflow-hidden rounded-pk-pill bg-subtle"
            >
              <div className="h-full rounded-pk-pill bg-accent" style={{ width: `${percent}%` }} />
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col">
          {modules.map((module, index) => {
            const moduleMinutes = module.lessons.reduce((sum, l) => sum + l.durationMin, 0);
            const moduleDone = module.lessons.filter((l) => l.status === "complete").length;
            const inProgress = module.lessons.some((l) => l.status === "in-progress");
            const open =
              defaultOpen === "all" || (defaultOpen === "first" && index === 0) || inProgress;

            return (
              <details
                key={module.id}
                open={open}
                className="group border-b border-line first:border-t"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 marker:hidden">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-[1.0625rem] font-medium">
                      <span className="text-faint">{index + 1}.</span> {module.title}
                    </span>
                    {module.summary ? (
                      <span className="measure text-sm leading-relaxed text-muted">
                        {module.summary}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 items-center gap-3 pt-0.5">
                    <span className="text-sm tabular-nums text-faint">
                      {enrolled ? `${moduleDone}/${module.lessons.length}` : module.lessons.length}{" "}
                      · {formatDuration(moduleMinutes)}
                    </span>
                    <span
                      aria-hidden
                      className="mt-px inline-block size-4 shrink-0 border-b-2 border-r-2 border-accent transition-transform duration-[var(--pk-dur-fast)] [transform:rotate(45deg)] group-open:[transform:rotate(-135deg)]"
                    />
                  </div>
                </summary>

                <ul className="flex flex-col pb-4">
                  {module.lessons.map((lesson) => {
                    const locked = enrolled
                      ? lesson.status === "locked"
                      : lesson.status === "locked" || (!lesson.preview && lesson.href === undefined);
                    const Icon = kindIcon[lesson.kind ?? "video"];
                    const done = enrolled && lesson.status === "complete";
                    const running = enrolled && lesson.status === "in-progress";

                    const inner = (
                      <>
                        <span className="flex min-w-0 items-center gap-3">
                          {done ? (
                            <CheckCircle
                              size={18}
                              weight="fill"
                              aria-hidden
                              className="shrink-0 text-accent"
                            />
                          ) : locked ? (
                            <LockSimple size={18} aria-hidden className="shrink-0 text-faint" />
                          ) : (
                            <Icon size={18} aria-hidden className="shrink-0 text-muted" />
                          )}
                          <span className={cn("truncate", done && "text-muted")}>
                            {lesson.title}
                          </span>
                          {running ? (
                            <span className="shrink-0 rounded-pk-pill border border-accent px-2 py-0.5 text-xs text-accent">
                              In progress
                            </span>
                          ) : null}
                          {!enrolled && lesson.preview ? (
                            <span className="shrink-0 rounded-pk-pill border border-accent px-2 py-0.5 text-xs text-accent">
                              {previewLabel}
                            </span>
                          ) : null}
                        </span>

                        <span className="flex shrink-0 items-center gap-1.5 text-sm tabular-nums text-faint">
                          <Clock size={14} aria-hidden />
                          {formatDuration(lesson.durationMin)}
                        </span>
                      </>
                    );

                    const rowClass =
                      "flex items-center justify-between gap-4 rounded-pk-sm px-3 py-2.5 text-[0.9375rem]";

                    return (
                      <li key={lesson.id}>
                        {locked || !lesson.href ? (
                          <span
                            aria-disabled={locked ? true : undefined}
                            className={cn(rowClass, locked && "text-faint")}
                          >
                            {inner}
                            {locked ? <span className="sr-only">{lockedLabel}</span> : null}
                          </span>
                        ) : (
                          <Link
                            href={lesson.href}
                            className={cn(
                              rowClass,
                              "transition-colors duration-[var(--pk-dur-fast)] hover:bg-subtle",
                            )}
                          >
                            {inner}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {enrolled && moduleDone === module.lessons.length && module.lessons.length > 0 ? (
                  <p className="flex items-center gap-2 px-3 pb-5 text-sm text-accent">
                    <Check size={15} weight="bold" aria-hidden />
                    Module complete
                  </p>
                ) : null}
              </details>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
