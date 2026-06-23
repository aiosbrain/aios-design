// @aios/ui — React component library for the AIOS design system.

// utils
export { cn } from "./lib/utils";

// shadcn-style primitives
export { Button, buttonVariants } from "./components/ui/button";
export type { ButtonProps } from "./components/ui/button";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/ui/card";
export { Input } from "./components/ui/input";
export { Badge, badgeVariants } from "./components/ui/badge";
export type { BadgeProps } from "./components/ui/badge";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
export { Separator } from "./components/ui/separator";
export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./components/ui/dialog";

// AIOS-specific components
export { EyebrowLabel } from "./components/aios/EyebrowLabel";
export type { EyebrowLabelProps } from "./components/aios/EyebrowLabel";
export { StatCluster } from "./components/aios/StatCluster";
export type { Stat, StatClusterProps } from "./components/aios/StatCluster";
export { TierBadge } from "./components/aios/TierBadge";
export type { Tier, TierBadgeProps } from "./components/aios/TierBadge";
export { KindBadge } from "./components/aios/KindBadge";
export type { Kind, KindBadgeProps } from "./components/aios/KindBadge";
export {
  TerminalFrame,
  CodeBlock,
} from "./components/aios/TerminalFrame";
export type { TerminalFrameProps } from "./components/aios/TerminalFrame";
export { PrismGlow } from "./components/aios/PrismGlow";
export type { PrismGlowProps } from "./components/aios/PrismGlow";
export { GlassNav } from "./components/aios/GlassNav";
export type { GlassNavProps } from "./components/aios/GlassNav";
export { AiosMark } from "./components/aios/AiosMark";
export type { AiosMarkProps } from "./components/aios/AiosMark";
export { KpiStat } from "./components/aios/KpiStat";
export type { KpiStatProps } from "./components/aios/KpiStat";
