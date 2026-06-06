export const Logo = (props: React.ComponentProps<"svg">) => (
  <svg
  width="140"
  height="48"
  viewBox="0 0 140 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  

  <g transform="translate(0 0)">
    <rect
      x="0"
      y="0"
      width="48"
      height="48"
      rx="12"
      fill="#1266F1"
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
      fill="#BBD8FF"
      opacity="0.5"
    />
  </g>
  <text
    x="58"
    y="30"
    fontFamily="Inter, Geist, sans-serif"
    fontSize="22"
    fontWeight="700"
    fill="currentColor"
  >
    LoveUI
  </text>
</svg>
);
