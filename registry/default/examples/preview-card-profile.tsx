import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar"
import { Button } from "@/registry/default/ui/button"
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "@/registry/default/ui/preview-card"

export default function PreviewCardProfile() {
  return (
    <PreviewCard>
      <PreviewCardTrigger render={<Button variant="ghost" />}>Morgan Chen</PreviewCardTrigger>
      <PreviewCardPopup>
        <div className="flex gap-3">
          <Avatar><AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop" alt="Morgan" /><AvatarFallback>MC</AvatarFallback></Avatar>
          <div><div className="font-medium">Morgan Chen</div><p className="text-sm text-muted-foreground">Design systems engineer</p></div>
        </div>
      </PreviewCardPopup>
    </PreviewCard>
  )
}
