import { Card, CardContent, StatCluster } from "@aios-alpha/ui";

export const Basic = () => (
  <StatCluster
    stats={[
      { value: "3", label: "repos, one system" },
      { value: "2", label: "modes · light + dark" },
      { value: "v1", label: "pinned sync contract" },
    ]}
  />
);

export const InCard = () => (
  <Card className="max-w-2xl">
    <CardContent className="p-8">
      <StatCluster
        stats={[
          { value: "1,284", label: "items synced" },
          { value: "237", label: "brain queries" },
          { value: "48", label: "decisions logged" },
        ]}
      />
    </CardContent>
  </Card>
);
