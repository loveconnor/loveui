"use client";

import { ChevronDownIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export const title = "Item in Dropdown";

const people = [
  {
    username: "loveconnor",
    avatar: "https://github.com/loveconnor.png",
    email: "connor@example.com",
  },
  {
    username: "thomasraklovits",
    avatar: "https://github.com/monster0506.png",
    email: "thomas@example.com",
  },
  {
    username: "charliecambell",
    avatar: "https://github.com/loveconnor.png",
    email: "charlie@example.com",
  },
];

const Example = () => (
  <div className="flex min-h-64 w-full max-w-md flex-col items-center gap-6">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-fit" size="sm" variant="outline">
          Select <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 [--radius:0.65rem]">
        {people.map((person) => (
          <DropdownMenuItem className="p-0" key={person.username}>
            <Item className="w-full p-2" size="sm">
              <ItemMedia>
                <Avatar className="size-8">
                  <AvatarImage src={person.avatar} />
                  <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-0.5">
                <ItemTitle>{person.username}</ItemTitle>
                <ItemDescription>{person.email}</ItemDescription>
              </ItemContent>
            </Item>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default Example;
