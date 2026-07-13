import { AiosMark, Button, GlassNav } from "@aios-alpha/ui";

export const Basic = () => (
  <GlassNav
    logo={
      <span className="flex items-center gap-2">
        <AiosMark className="size-5" />
        <span className="font-display text-xl font-normal tracking-tight text-foreground">
          AIOS
        </span>
      </span>
    }
    links={
      <>
        <a href="#" className="cursor-pointer hover:text-foreground">
          Docs
        </a>
        <a href="#" className="cursor-pointer hover:text-foreground">
          Brain
        </a>
        <a href="#" className="cursor-pointer hover:text-foreground">
          Workspace
        </a>
      </>
    }
    cta={<Button size="sm">Get started</Button>}
  />
);
