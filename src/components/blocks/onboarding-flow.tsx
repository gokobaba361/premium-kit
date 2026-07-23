"use client";

import { useState } from "react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { cn } from "@/lib/cn";

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  /** The step body: form fields, choices, anything. */
  content: React.ReactNode;
  /** Optional gate. Return false to keep the user on this step. */
  canContinue?: () => boolean;
};

export type OnboardingFlowProps = {
  steps: OnboardingStep[];
  /** Fired once the last step is completed. */
  onComplete?: () => void;
  /** Shown on the completion screen unless onComplete navigates away. */
  completionTitle?: string;
  completionBody?: string;
};

/**
 * Multi-step onboarding with a real progress rail, back and continue controls,
 * and a completion state. Steps are numbered by position; the rail is the
 * progression, so no "Step 1 of 3" label clutter inside each panel.
 *
 * It owns only navigation. Each step's content owns its own inputs, so the
 * block stays composable and unopinionated about what is being collected.
 */
export function OnboardingFlow({
  steps,
  onComplete,
  completionTitle = "You are all set",
  completionBody = "Your workspace is ready. You can change any of this later in settings.",
}: OnboardingFlowProps) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  const step = steps[index];
  const isLast = index === steps.length - 1;

  function next() {
    if (step.canContinue && !step.canContinue()) return;
    if (isLast) {
      setDone(true);
      onComplete?.();
    } else {
      setIndex((i) => Math.min(steps.length - 1, i + 1));
    }
  }

  if (done) {
    return (
      <section className="py-section">
        <Container className="max-w-xl">
          <div className="flex flex-col items-start gap-4">
            <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-fg">
              <Check size={24} weight="bold" aria-hidden />
            </span>
            <h1 className="display-2 max-w-[16ch] text-balance">{completionTitle}</h1>
            <p className="measure text-lg leading-relaxed text-muted">{completionBody}</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-section">
      <Container className="max-w-2xl">
        {/* Progress rail */}
        <ol className="flex items-center gap-2" aria-label="Onboarding progress">
          {steps.map((s, i) => {
            const complete = i < index;
            const current = i === index;
            return (
              <li key={s.id} className="flex flex-1 items-center gap-2">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                    complete && "border-accent bg-accent text-accent-fg",
                    current && "border-accent text-accent",
                    !complete && !current && "border-strong text-faint",
                  )}
                  aria-current={current ? "step" : undefined}
                >
                  {complete ? <Check size={13} weight="bold" aria-hidden /> : i + 1}
                </span>
                {i < steps.length - 1 ? (
                  <span
                    className={cn("h-px flex-1", i < index ? "bg-accent" : "bg-line")}
                    aria-hidden
                  />
                ) : null}
              </li>
            );
          })}
        </ol>

        {/* Step */}
        <div className="mt-10 flex flex-col gap-2">
          <h1 className="display-3">{step.title}</h1>
          <p className="measure text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
        </div>

        <div className="mt-8">{step.content}</div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            Back
          </Button>
          <Button onClick={next}>{isLast ? "Finish" : "Continue"}</Button>
        </div>
      </Container>
    </section>
  );
}
