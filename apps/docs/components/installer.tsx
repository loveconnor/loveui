"use client";

import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@repo/snippet";
import { track } from "@vercel/analytics/react";
import { useState } from "react";
import { toast } from "sonner";
import { HeartIcon } from "lucide-react";

type InstallerProps = {
  packageName: string;
};

export const Installer = ({ packageName }: InstallerProps) => {
  const [value, setValue] = useState("loveui");

  const commands = {
    loveui: {
      label: "LoveUI CLI",
      icon: HeartIcon,
      code: `npx loveui add ${packageName}`,
    },
  } as const;

  return (
    <Snippet
      className="not-prose shiki shiki-themes github-light github-dark"
      onValueChange={setValue}
      value={value}
    >
      <SnippetHeader>
        <SnippetTabsList>
          {Object.entries(commands).map(([key, command]) => {
            const Icon = command.icon;
            return (
              <SnippetTabsTrigger className="basis-auto" key={key} value={key}>
                <Icon className="size-3.5" />
                {command.label}
              </SnippetTabsTrigger>
            );
          })}
        </SnippetTabsList>
        <SnippetCopyButton
          onCopy={() => {
            toast.success("Copied to clipboard");
            track("Copy installer code", {
              cli: value,
              package: packageName,
            });
          }}
          onError={() => toast.error("Failed to copy to clipboard")}
          value={commands[value as keyof typeof commands].code}
        />
      </SnippetHeader>
      {Object.entries(commands).map(([key, command]) => (
        <SnippetTabsContent key={key} value={key}>
          {command.code}
        </SnippetTabsContent>
      ))}
    </Snippet>
  );
};
