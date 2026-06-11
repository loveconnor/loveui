import type { BuilderElementOverride } from "@/lib/builder/types"

/** Computed styles reported for the selected element inside a preview. */
export type BuilderElementComputedStyles = {
  color?: string
  backgroundColor?: string
  fontSize?: number
  fontWeight?: string
  borderRadius?: number
  opacity?: number
}

export type BuilderSelectedElement = {
  elementId: string
  tag: string
  /** Bounding rect in iframe-local px. */
  rect: { x: number; y: number; w: number; h: number }
  computed: BuilderElementComputedStyles
  override?: BuilderElementOverride
}

/** Messages sent from the studio (parent window) to a preview iframe. */
export type BuilderPreviewParentMessage =
  | {
      type: "builder-preview:apply-overrides"
      shapeId: string
      textOverrides?: Record<string, string>
      textStyles?: Record<string, { fontSize?: number }>
      elementOverrides?: Record<string, BuilderElementOverride>
    }
  | { type: "builder-preview:set-editing"; shapeId: string; editing: boolean }

/** Messages sent from a preview iframe up to the studio. */
export type BuilderPreviewChildMessage =
  | { type: "builder-preview:ready"; shapeId: string }
  | {
      type: "builder-preview:text-overrides"
      shapeId: string
      textOverrides: Record<string, string>
      textStyles: Record<string, { fontSize?: number }>
    }
  | {
      type: "builder-preview:element-overrides"
      shapeId: string
      elementOverrides: Record<string, BuilderElementOverride>
    }
  | {
      type: "builder-preview:element-selected"
      shapeId: string
      element: BuilderSelectedElement | null
    }
  | { type: "builder-preview:request-exit"; shapeId: string }
