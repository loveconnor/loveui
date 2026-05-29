export const Logo = (props: React.ComponentProps<"svg">) => (
  <svg
  width="220"
  height="48"
  viewBox="0 0 220 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="loveui-blue" x1="0" y1="0" x2="48" y2="48">
      <stop stopColor="#38A3FF" />
      <stop offset="0.55" stopColor="#1266F1" />
      <stop offset="1" stopColor="#0B3FD8" />
    </linearGradient>

    <linearGradient id="loveui-shine" x1="0" y1="0" x2="1" y2="1">
      <stop stopColor="#FFFFFF" stopOpacity="0.9" />
      <stop offset="1" stopColor="#BBD8FF" stopOpacity="0.4" />
    </linearGradient>
  </defs>

  <g transform="translate(0 0)">
    <rect
      x="0"
      y="0"
      width="48"
      height="48"
      rx="12"
      fill="url(#loveui-blue)"
    />

    <path
      d="
        M12 10
        C12 8.3 13.3 7 15 7
        H18
        C19.7 7 21 8.3 21 10
        V25
        C21 27.2 22.8 29 25 29
        H35
        C36.7 29 38 30.3 38 32
        V34
        C38 35.7 36.7 37 35 37
        H15
        C13.3 37 12 35.7 12 34
        Z"
      fill="white"
    />

    <rect
      x="28"
      y="14"
      width="9"
      height="9"
      rx="3"
      fill="white"
    />

    <path
      d="
        M21 25
        C21 27.2 22.8 29 25 29
        H27
        V34
        C27 35.7 25.7 37 24 37
        H15
        C13.3 37 12 35.7 12 34
        V29
        H18
        C19.7 29 21 27.7 21 25
        Z"
      fill="url(#loveui-shine)"
      opacity="0.5"
    />
  </g>
  <text
    x="62"
    y="31"
    fontFamily="Inter, Geist, sans-serif"
    fontSize="24"
    fontWeight="700"
    letterSpacing="-0.04em"
    fill="currentColor"
  >
    LoveUI
  </text>
</svg>
);
