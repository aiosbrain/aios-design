import { Button, Input } from "@aios-alpha/ui";

export const Basic = () => (
  <div className="max-w-md">
    <Input placeholder="aios push --tier team" />
  </div>
);

export const Disabled = () => (
  <div className="max-w-md">
    <Input placeholder="Disabled input" disabled />
  </div>
);

export const WithButton = () => (
  <div className="flex max-w-md gap-3">
    <Input placeholder="Query the brain…" />
    <Button>Search</Button>
  </div>
);
