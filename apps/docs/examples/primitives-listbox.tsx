"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn-ui/components/ui/select";
import { useState } from "react";

const people = [
  { id: "1", name: "Wade Cooper" },
  { id: "2", name: "Arlene Mccoy" },
  { id: "3", name: "Devon Webb" },
  { id: "4", name: "Tom Cook" },
  { id: "5", name: "Tanya Fox" },
];

const Example = () => {
  const [selected, setSelected] = useState(people[0].id);

  return (
    <div className="grid gap-4">
      <Select onValueChange={setSelected} value={selected}>
        <SelectTrigger>
          <SelectValue placeholder="Select a person" />
        </SelectTrigger>
        <SelectContent>
          {people.map((person) => (
            <SelectItem key={person.id} value={person.id}>
              {person.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        Selected: {people.find((p) => p.id === selected)?.name}
      </p>
    </div>
  );
};

export default Example;

