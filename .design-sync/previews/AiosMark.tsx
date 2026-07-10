import { AiosMark } from "@aios-alpha/ui";

export const Prism = () => (
  <span className="flex items-center gap-3">
    <AiosMark className="size-10" />
    <span className="font-display text-[length:var(--aios-text-h2)] font-normal tracking-tight text-foreground">
      AIOS
    </span>
  </span>
);

export const Mono = () => (
  <span className="flex items-center gap-3 text-muted-foreground">
    <AiosMark className="size-10" mono />
    <span className="font-mono text-[length:var(--aios-text-small)] uppercase tracking-[0.1em]">
      mono — currentColor
    </span>
  </span>
);

export const Sizes = () => (
  <span className="flex items-end gap-4 text-foreground">
    <AiosMark style={{ width: 20, height: 20 }} />
    <AiosMark style={{ width: 32, height: 32 }} />
    <AiosMark style={{ width: 48, height: 48 }} />
  </span>
);
