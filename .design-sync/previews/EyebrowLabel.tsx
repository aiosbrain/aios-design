import { EyebrowLabel } from "@aios-alpha/ui";

export const AboveHeading = () => (
  <div className="flex max-w-lg flex-col gap-2">
    <EyebrowLabel>Foundations</EyebrowLabel>
    <p className="font-display text-[length:var(--aios-text-h2)] font-normal leading-tight tracking-[-0.02em] text-foreground">
      Eyebrows sit above headings
    </p>
  </div>
);

export const Standalone = () => (
  <div className="flex flex-col gap-3">
    <EyebrowLabel>Open-source AI transformation toolkit</EyebrowLabel>
    <EyebrowLabel>Sync contract · v1</EyebrowLabel>
  </div>
);
