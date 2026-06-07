import type { ComponentProps } from 'react';

export function LogoMark(props: ComponentProps<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect fill="#0877F2" height="384" rx="96" width="384" x="64" y="64" />
      <path
        d="M186 132C167.222 132 152 147.222 152 166V334C152 359.405 172.595 380 198 380H326C344.778 380 360 364.778 360 346V338C360 319.222 344.778 304 326 304H228V166C228 147.222 212.778 132 194 132H186Z"
        fill="white"
      />
      <rect fill="white" height="70" rx="16" width="70" x="282" y="180" />
    </svg>
  );
}
