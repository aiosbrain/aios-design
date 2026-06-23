import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../../lib/utils";

export interface TerminalFrameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Filename / title shown in the header bar (mono). */
  filename?: string;
  /** lime dot when live/active; gray when static. */
  status?: "live" | "static";
  /** The code/command body to render and copy. */
  code: string;
}

/** code-bg frame, radius-lg, header bar w/ mono filename + lime status dot,
 *  copy-on-hover button, JetBrains Mono body. */
export function TerminalFrame({
  filename = "terminal",
  status = "live",
  code,
  className,
  ...props
}: TerminalFrameProps) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = React.useCallback(() => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [code]);

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-lg border border-border bg-[var(--aios-code-bg)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "size-2 rounded-full",
              status === "live"
                ? "bg-lime shadow-[0_0_8px_rgba(132,204,22,0.6)]"
                : "bg-muted-foreground/50",
            )}
          />
          <span className="font-mono text-[length:var(--aios-text-small)] text-muted-foreground">
            {filename}
          </span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy"
          className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100"
        >
          {copied ? (
            <Check className="size-4 text-lime" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4">
        <code className="font-mono text-[length:var(--aios-text-small)] leading-[var(--aios-leading-code)] text-foreground">
          {code}
        </code>
      </pre>
    </div>
  );
}

/** Alias — CodeBlock is the same frame; semantic name for non-terminal code. */
export const CodeBlock = TerminalFrame;
