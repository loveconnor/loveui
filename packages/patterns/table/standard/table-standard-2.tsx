import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const title = "Table with Avatar";

const users = [
  {
    name: "Connor Love",
    email: "connor@example.com",
    role: "Product Designer",
    avatar: "https://github.com/loveconnor.png",
    initials: "CL",
  },
  {
    name: "Thomas Raklovits",
    email: "thomas@example.com",
    role: "Developer",
    avatar: "https://github.com/loveconnor.png",
    initials: "TR",
  },
  {
    name: "Charlie Cambell",
    email: "charlie@example.com",
    role: "Developer",
    avatar: "https://github.com/loveconnor.png",
    initials: "CC",
  },
  {
    name: "Tyler PennyPacker",
    email: "tyler@example.com",
    role: "Developer",
    avatar: "https://github.com/loveconnor.png",
    initials: "TPP",
  },
];

const Example = () => (
  <div className="w-full max-w-4xl rounded-md border bg-background">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.email}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage alt={user.name} src={user.avatar} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{user.name}</span>
              </div>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default Example;
