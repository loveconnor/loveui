export function formatDisplaySourceCode(code: string) {
  return code
    .replaceAll("@/registry/default/ui/", "@/components/ui/")
    .replaceAll("@/registry/default/hooks/", "@/hooks/")
    .replaceAll("@/registry/default/lib/", "@/lib/")
}
