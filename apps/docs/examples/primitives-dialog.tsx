"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "loveui";
import { useState } from "react";

const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Button color="violet" onClick={() => setOpen(true)}>
        Launch dialog
      </Button>

      <Dialog open={open} onClose={setOpen}>
        <DialogTitle>Save workspace settings</DialogTitle>
        <DialogDescription>
          Dialog primitives ship with focus management, keyboard support, and
          theming baked in.
        </DialogDescription>
        <DialogBody className="space-y-3 text-muted-foreground">
          <p>
            Override tokens or wrap the component to match your product brand
            while keeping accessibility guarantees.
          </p>
          <p>
            Use the LoveUI CLI to install the dialog into your project, then
            customise the content like any other component.
          </p>
        </DialogBody>
        <DialogActions>
          <Button onClick={() => setOpen(false)} plain>
            Cancel
          </Button>
          <Button color="dark/zinc" onClick={() => setOpen(false)}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Example;
