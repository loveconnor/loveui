"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn-ui/components/ui/table";

const Example = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Connor Love</TableCell>
        <TableCell>connor@example.com</TableCell>
        <TableCell>Admin</TableCell>
        <TableCell>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100">
            Active
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Thomas Raklovits</TableCell>
        <TableCell>thomas@example.com</TableCell>
        <TableCell>Editor</TableCell>
        <TableCell>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100">
            Active
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Charlie Cambell</TableCell>
        <TableCell>charlie@example.com</TableCell>
        <TableCell>Viewer</TableCell>
        <TableCell>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-100">
            Inactive
          </span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default Example;

