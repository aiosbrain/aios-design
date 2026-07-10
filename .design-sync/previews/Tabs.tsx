import { Tabs, TabsContent, TabsList, TabsTrigger } from "@aios-alpha/ui";

export const Basic = () => (
  <Tabs defaultValue="overview" className="max-w-xl">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="tiers">Tiers</TabsTrigger>
      <TabsTrigger value="spine">Spine</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      Three parts: Workspace, Team Brain, Website. A context monorepo, not a
      build monorepo.
    </TabsContent>
    <TabsContent value="tiers">
      Every piece of content carries a tier: team, external, admin.
    </TabsContent>
    <TabsContent value="spine">
      A six-folder pipeline: context, inbox, work, log, shared, personal.
    </TabsContent>
  </Tabs>
);
