import { PrismGlow } from "@aios-alpha/ui";

export const BehindHero = () => (
  <div
    className="relative isolate overflow-hidden rounded-lg border border-border"
    style={{ height: 256, maxWidth: 640 }}
  >
    <PrismGlow
      className="absolute left-1/2 -translate-x-1/2"
      style={{ top: 16, height: 224, width: 480 }}
    />
    <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
      <p className="font-display text-[length:var(--aios-text-h2)] font-normal tracking-[-0.02em] text-foreground">
        Ambient prism glow
      </p>
      <p className="text-[length:var(--aios-text-small)] text-muted-foreground">
        Decorative only — sits behind hero content.
      </p>
    </div>
  </div>
);
