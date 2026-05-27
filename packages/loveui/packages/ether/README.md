# @loveui/ether

Liquid Ether background powered by Three.js. Ships a declarative React component that orchestrates a WebGL fluid simulation with optional cursor handoff and autoplay.

## Installation

```bash
npm install @loveui/ether three react react-dom
```

The package relies on Three.js and React as peer dependencies, so ensure they exist in your project.

## Usage

```tsx
import LiquidEther from "@loveui/ether";

export default function Section() {
  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        autoDemo
        mouseForce={18}
      />
    </div>
  );
}
```

Mount the component inside a container with explicit dimensions. Props are fully typed so you can explore them via editor IntelliSense.

## Scripts

```bash
npm run build
```

Running `npm publish` (or `npm pack`) executes the same build via `prepublishOnly`, guaranteeing the `dist` output is fresh.
