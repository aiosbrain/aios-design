import { Button } from "@aios-alpha/ui";

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-4">
    <Button>Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
    <Button variant="destructive">Destructive</Button>
  </div>
);

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-4">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const Disabled = () => (
  <div className="flex flex-wrap items-center gap-4">
    <Button disabled>Disabled</Button>
    <Button variant="secondary" disabled>
      Disabled secondary
    </Button>
  </div>
);
