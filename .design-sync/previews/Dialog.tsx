import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@aios-alpha/ui";

export const Open = () => (
  <Dialog defaultOpen>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Push to Team Brain?</DialogTitle>
        <DialogDescription>
          This will sync all team-tagged items in 2-work/ to the shared hub.
          Admin-tier content is never sent.
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
        <Button size="sm">Confirm push</Button>
      </div>
    </DialogContent>
  </Dialog>
);
