// @aios/ui — React component library for the AIOS design system.

// utils
export { cn } from "./lib/utils.js";

// shadcn-style primitives
export { Button, buttonVariants } from "./components/ui/button.js";
export type { ButtonProps } from "./components/ui/button.js";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/ui/card.js";
export { Input } from "./components/ui/input.js";
export { Badge, badgeVariants } from "./components/ui/badge.js";
export type { BadgeProps } from "./components/ui/badge.js";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs.js";
export { Separator } from "./components/ui/separator.js";
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
} from "./components/ui/dialog.js";

// AIOS-specific components
export { EyebrowLabel } from "./components/aios/EyebrowLabel.js";
export type { EyebrowLabelProps } from "./components/aios/EyebrowLabel.js";
export { StatCluster } from "./components/aios/StatCluster.js";
export type { Stat, StatClusterProps } from "./components/aios/StatCluster.js";
export { TierBadge } from "./components/aios/TierBadge.js";
export type { Tier, TierBadgeProps } from "./components/aios/TierBadge.js";
export { KindBadge } from "./components/aios/KindBadge.js";
export type { Kind, KindBadgeProps } from "./components/aios/KindBadge.js";
export {
  TerminalFrame,
  CodeBlock,
} from "./components/aios/TerminalFrame.js";
export type { TerminalFrameProps } from "./components/aios/TerminalFrame.js";
export { PrismGlow } from "./components/aios/PrismGlow.js";
export type { PrismGlowProps } from "./components/aios/PrismGlow.js";
export { GlassNav } from "./components/aios/GlassNav.js";
export type { GlassNavProps } from "./components/aios/GlassNav.js";
export { AiosLogo } from "./components/aios/AiosLogo.js";
export type { AiosLogoProps, AiosLogoVariant } from "./components/aios/AiosLogo.js";
export { AiosMark } from "./components/aios/AiosMark.js";
export type { AiosMarkProps } from "./components/aios/AiosMark.js";
export { KpiStat } from "./components/aios/KpiStat.js";
export type { KpiStatProps } from "./components/aios/KpiStat.js";
