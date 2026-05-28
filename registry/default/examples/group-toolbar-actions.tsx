import { DownloadIcon, ShareIcon } from "lucide-react"

import { Button } from "@/registry/default/ui/button"
import { Group, GroupItem, GroupSeparator } from "@/registry/default/ui/group"

export default function GroupToolbarActions() {
  return (
    <Group>
      <GroupItem render={<Button variant="outline" size="icon" />} aria-label="Share"><ShareIcon /></GroupItem>
      <GroupSeparator />
      <GroupItem render={<Button variant="outline" size="icon" />} aria-label="Download"><DownloadIcon /></GroupItem>
    </Group>
  )
}
