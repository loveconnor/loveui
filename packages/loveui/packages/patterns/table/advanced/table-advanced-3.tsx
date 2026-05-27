import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const title = "Vertical Table";

const userInfo = [
  { label: "Full Name", value: "Connor Love" },
  { label: "Email", value: "connor@example.com" },
  { label: "Phone", value: "+1 (555) 123-4567" },
  { label: "Location", value: "Columbus, OH" },
  { label: "Joined", value: "September 13, 2025" },
  { label: "Role", value: "Developer" },
];

const Example = () => (
  <div className="w-full max-w-md rounded-md border bg-background">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">Field</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userInfo.map((info) => (
          <TableRow key={info.label}>
            <TableCell className="font-medium">{info.label}</TableCell>
            <TableCell>{info.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default Example;
