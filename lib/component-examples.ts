import { Index } from "@/registry/__index__"

const examplePrefixes: Record<string, string[]> = {
  alert: ["alert", "alert-dialog", "dialog-close-confirmation"],
  checkbox: ["checkbox", "checkbox-group"],
  form: ["form"],
  label: [
    "autocomplete-with-label",
    "checkbox-demo",
    "combobox-with-label",
    "input-with-label",
    "number-field-with-label",
    "textarea-with-label",
  ],
  toast: ["toast", "gooey-toast"],
  toggle: ["toggle", "toggle-group", "toggle-icon-group", "tooltip-grouped"],
}

const preferredFirstExamples: Record<string, string> = {
  accordion: "accordion-demo",
  alert: "alert-demo",
  autocomplete: "autocomplete-demo",
  avatar: "avatar-demo",
  badge: "badge-demo",
  breadcrumb: "breadcrumb-demo",
  button: "button-demo",
  card: "card-demo",
  checkbox: "checkbox-demo",
  collapsible: "collapsible-demo",
  combobox: "combobox-demo",
  dialog: "dialog-demo",
  empty: "empty-demo",
  field: "field-demo",
  fieldset: "fieldset-demo",
  form: "form-demo",
  frame: "frame-demo",
  group: "group-demo",
  input: "input-demo",
  menu: "menu-demo",
  meter: "meter-demo",
  "number-field": "number-field-demo",
  pagination: "pagination-demo",
  popover: "popover-demo",
  "preview-card": "preview-card-demo",
  progress: "progress-demo",
  "radio-group": "radio-group-demo",
  "scroll-area": "scroll-area-demo",
  select: "select-demo",
  separator: "separator-demo",
  sheet: "sheet-demo",
  skeleton: "skeleton-demo",
  slider: "slider-demo",
  switch: "switch-demo",
  table: "table-demo",
  tabs: "tabs-demo",
  textarea: "textarea-demo",
  toast: "toast-demo",
  toggle: "toggle-demo",
  toolbar: "toolbar-demo",
  tooltip: "tooltip-demo",
}

const titleOverrides: Record<string, string> = {
  "accordion-demo": "Basic accordion",
  "accordion-single": "Single expand accordion",
  "accordion-multiple": "Multiple expanded panels",
  "accordion-controlled": "Controlled state accordion",
  "alert-demo": "Basic alert",
  "button-demo": "Default button",
  "checkbox-demo": "Basic checkbox",
  "collapsible-demo": "Basic collapsible",
  "combobox-demo": "Basic combobox",
  "dialog-demo": "Basic dialog",
  "empty-demo": "Empty state",
  "form-demo": "Basic form",
  "input-demo": "Default input",
  "menu-demo": "Basic menu",
  "pagination-demo": "Basic pagination",
  "popover-demo": "Basic popover",
  "preview-card-demo": "Hover preview card",
  "separator-demo": "Basic separator",
  "sheet-demo": "Basic sheet",
  "skeleton-demo": "Skeleton loading group",
  "tabs-demo": "Basic tabs",
  "textarea-demo": "Default textarea",
  "toast-demo": "Basic toast",
  "toggle-demo": "Basic toggle",
  "toolbar-demo": "Editor toolbar",
  "tooltip-demo": "Basic tooltip",
}

function matchesExamplePrefix(exampleName: string, prefix: string) {
  return exampleName === prefix || exampleName.startsWith(`${prefix}-`)
}

function orderExamples(componentSlug: string, examples: string[]) {
  const first = preferredFirstExamples[componentSlug]

  return [...examples].sort((a, b) => {
    if (a === first) return -1
    if (b === first) return 1
    return a.localeCompare(b)
  })
}

export function getComponentExampleNames(componentSlug: string) {
  const prefixes = examplePrefixes[componentSlug] ?? [componentSlug]
  const examples = Object.keys(Index).filter((exampleName) =>
    prefixes.some((prefix) => matchesExamplePrefix(exampleName, prefix))
  )

  return orderExamples(componentSlug, examples)
}

export function getComponentExampleCount(componentSlug: string) {
  return getComponentExampleNames(componentSlug).length
}

export function formatExampleTitle(exampleName: string, componentSlug?: string) {
  if (titleOverrides[exampleName]) {
    return titleOverrides[exampleName]
  }

  const prefixes = componentSlug
    ? examplePrefixes[componentSlug] ?? [componentSlug]
    : []
  const matchingPrefix = prefixes.find((prefix) =>
    matchesExamplePrefix(exampleName, prefix)
  )
  const withoutPrefix = matchingPrefix
    ? exampleName.replace(new RegExp(`^${matchingPrefix}-?`), "")
    : exampleName
  const normalized = withoutPrefix || exampleName

  return normalized
    .split("-")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ")
}
