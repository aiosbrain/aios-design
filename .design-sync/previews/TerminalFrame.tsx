import { TerminalFrame } from "@aios-alpha/ui";

export const Live = () => (
  <TerminalFrame
    className="max-w-lg"
    filename="~/workspace"
    status="live"
    code={`$ aios push --tier team
→ scanning 2-work/ for team-tagged deliverables
→ 4 items staged
✓ pushed to team-brain (v1 contract)`}
  />
);

export const Static = () => (
  <TerminalFrame
    className="max-w-lg"
    filename="brain-api.md"
    status="static"
    code={`POST /v1/ingest
{ "tier": "team", "kind": "deliverable" }
# admin-tier content rejected at boundary (422)`}
  />
);
