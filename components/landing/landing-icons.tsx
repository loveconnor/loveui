import type { ComponentProps } from 'react';

type IconProps = ComponentProps<'svg'>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

export function BlocksIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect height="7" rx="1" width="7" x="3" y="13" />
      <rect height="7" rx="1" width="7" x="13" y="3" />
      <rect height="7" rx="1" width="7" x="13" y="13" />
    </IconBase>
  );
}

export function BookOpenIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 7v14" />
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 0 4 23.5z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5A2.5 2.5 0 0 1 20 23.5z" />
    </IconBase>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m8 9-4 3 4 3" />
      <path d="m16 9 4 3-4 3" />
    </IconBase>
  );
}

export function ComponentIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect height="7" rx="1" width="7" x="4" y="4" />
      <rect height="7" rx="1" width="7" x="13" y="13" />
      <path d="M13 4h3a1 1 0 0 1 1 1v3" />
      <path d="M11 20H8a1 1 0 0 1-1-1v-3" />
    </IconBase>
  );
}

export function PaletteIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 22a10 10 0 1 1 10-10 3 3 0 0 1-3 3h-2.5a2 2 0 0 0-1.4 3.4l.3.3A2 2 0 0 1 14 22z" />
      <circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="10.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="14.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    </IconBase>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" />
      <path d="m5 15 .8 1.7L7.5 18l-1.7.8L5 21l-.8-2.2L2.5 18l1.7-1.3z" />
      <path d="m19 14 .7 1.3L21 16l-1.3.7L19 18l-.7-1.3L17 16l1.3-.7z" />
    </IconBase>
  );
}
