# @loveui/gradiant-blinds

Animated gradient blinds background rendered with the OGL WebGL library. Exports a ready-to-use client component that manages canvas setup, uniforms, and resize handling.

## Installation

```bash
npm install @loveui/gradiant-blinds react react-dom
```

OGL ships as a direct dependency, so you do not need to install it yourself.

## Usage

```tsx
import GradientBlinds from "@loveui/gradiant-blinds";

export default function Accent() {
  return (
    <div style={{ position: "relative", width: "100%", height: "480px" }}>
      <GradientBlinds
        gradientColors={["#FF9FFC", "#5227FF", "#0C1A4B"]}
        blindCount={18}
        mixBlendMode="screen"
      />
    </div>
  );
}
```

Render the component inside a container with explicit width and height so the canvas can size itself correctly. Refer to the TypeScript definitions for the full prop surface.

## Scripts

```bash
npm run build
```

`npm publish` triggers `prepublishOnly`, which cleans and rebuilds the `dist` directory just before packaging.
