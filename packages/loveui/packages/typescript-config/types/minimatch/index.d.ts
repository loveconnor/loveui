declare module "minimatch" {
  interface MinimatchOptions {
    debug?: boolean
    nobrace?: boolean
    noglobstar?: boolean
    dot?: boolean
    noext?: boolean
    nocase?: boolean
    matchBase?: boolean
    nocomment?: boolean
    nonegate?: boolean
    flipNegate?: boolean
  }

  export class Minimatch {
    constructor(pattern: string, options?: MinimatchOptions)
    makeRe(): RegExp | null
    match(path: string): boolean
    set: string[][]
    pattern: string
    options: MinimatchOptions
  }

  export function minimatch(path: string, pattern: string, options?: MinimatchOptions): boolean
  export default minimatch
}
