"use client";

import Link from "next/link";

const Example = () => (
  <div className="flex flex-col gap-3">
    <Link className="text-primary underline-offset-4 hover:underline" href="/docs">
      View documentation
    </Link>
    <a
      className="text-primary underline-offset-4 hover:underline"
      href="https://github.com"
      rel="noopener noreferrer"
      target="_blank"
    >
      Visit GitHub
    </a>
    <Link className="text-blue-600 underline-offset-4 hover:underline dark:text-blue-400" href="/components">
      Browse components
    </Link>
  </div>
);

export default Example;

