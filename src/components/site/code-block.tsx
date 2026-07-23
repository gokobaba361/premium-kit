"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

/**
 * Source viewer with a copy button.
 *
 * Highlighting happens on the server (see src/lib/highlight.ts), so this
 * component receives ready markup and ships no highlighter to the browser.
 * `code` is still required: it is what the copy button writes to the clipboard,
 * and it is the fallback when no highlighted markup is passed.
 */
export function CodeBlock({
  code,
  html,
  filename,
  collapsible = false,
  className,
  language = "en",
}: {
  /** Plain source. Always the thing copied to the clipboard. */
  code: string;
  /** Pre-highlighted markup from the server. Falls back to plain text without it. */
  html?: string;
  filename?: string;
  /** Long files start folded to a fixed height with an expand control. */
  collapsible?: boolean;
  className?: string;
  language?: "en" | "tr";
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(!collapsible);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <figure className={cn("overflow-hidden rounded-pk border border-line bg-subtle", className)}>
      <figcaption className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
        <span className="truncate font-mono text-xs text-muted">{filename ?? "code"}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-pk-sm px-2 py-1 text-xs text-muted transition-colors hover:bg-elevated hover:text-fg"
        >
          {copied ? (
            <>
              <Check size={13} weight="bold" aria-hidden />
              {language === "tr" ? "Kopyalandı" : "Copied"}
            </>
          ) : (
            <>
              <Copy size={13} weight="bold" aria-hidden />
              {language === "tr" ? "Kopyala" : "Copy"}
            </>
          )}
        </button>
      </figcaption>

      <div className={cn("relative", !expanded && "max-h-80 overflow-hidden")}>
        {html ? (
          /* Markup comes from Shiki, which runs on the server over source files
             in this repository. No user input reaches it. */
          <div className="pk-code" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed">
            <code>{code}</code>
          </pre>
        )}

        {!expanded ? (
          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-subtle via-subtle/85 to-transparent pt-12 pb-3">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="rounded-pk-pill border border-line bg-elevated px-3.5 py-1.5 text-xs text-fg"
            >
              {language === "tr"
                ? `${code.split("\n").length} satırın tümünü göster`
                : `Show all ${code.split("\n").length} lines`}
            </button>
          </div>
        ) : null}
      </div>
    </figure>
  );
}
