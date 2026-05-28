import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar"
import { Badge } from "@/registry/default/ui/badge"
import {
  Card,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card"

export default function CardTeamMember() {
  return (
    <Card className="w-full max-w-xs" variant="mixed">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop" alt="Riley" />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Riley Scott</CardTitle>
            <p className="text-sm text-muted-foreground">Product lead</p>
          </div>
        </div>
      </CardHeader>
      <CardPanel>
        <Badge variant="success">Available</Badge>
      </CardPanel>
    </Card>
  )
}
