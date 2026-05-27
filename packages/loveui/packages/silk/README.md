# @loveui/silk

Animated silk background built with React Three Fiber and Three.js. Ships a ready-to-mount client component that renders a responsive procedural fabric effect.

## Installation

```bash
npm install @loveui/silk @react-three/fiber three react react-dom
```

Peer dependencies are declared in the package manifest; make sure they exist in your application bundle.

## Usage

```tsx
import SilkBackground from "@loveui/silk";

export default function Hero() {
  return (
    <div style={{ position: "relative", width: "100%", height: "480px" }}>
      <SilkBackground
        baseColor="#5227FF"
        accentColor="#FF9FFC"
        noiseIntensity={0.4}
        rotation={0.35}
      />
    </div>
  );
}
```

The component renders a full-bleed `<Canvas>` element and should live inside a container with explicit dimensions. Props mirror the exported TypeScript definitions so you get editor autocomplete out of the box.

## Local Development

```bash
npm run build
```

Publishing runs the same build automatically through the `prepublishOnly` script to ensure the `dist` folder stays fresh.
