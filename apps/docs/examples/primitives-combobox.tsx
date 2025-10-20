"use client";

import { Button } from "@repo/shadcn-ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/shadcn-ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/shadcn-ui/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@repo/shadcn-ui/lib/utils";

const people = [
  { id: "1", name: "Wade Cooper" },
  { id: "2", name: "Arlene Mccoy" },
  { id: "3", name: "Devon Webb" },
  { id: "4", name: "Tom Cook" },
  { id: "5", name: "Tanya Fox" },
  { id: "6", name: "Hellen Schmidt" },
];

const Example = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="grid gap-4">
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className="w-full justify-between"
            role="combobox"
            variant="outline"
          >
            {selected
              ? people.find((person) => person.id === selected)?.name
              : "Search people..."}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search people..." />
            <CommandList>
              <CommandEmpty>No person found.</CommandEmpty>
              <CommandGroup>
                {people.map((person) => (
                  <CommandItem
                    key={person.id}
                    onSelect={() => {
                      setSelected(person.id === selected ? "" : person.id);
                      setOpen(false);
                    }}
                    value={person.name}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        selected === person.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {person.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selected && (
        <p className="text-sm text-muted-foreground">
          Selected: {people.find((p) => p.id === selected)?.name}
        </p>
      )}
    </div>
  );
};

export default Example;

