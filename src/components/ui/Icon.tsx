import type { ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  paw: (
    <>
      <circle cx="5" cy="9" r="2.2" />
      <circle cx="12" cy="5.5" r="2.2" />
      <circle cx="19" cy="9" r="2.2" />
      <path d="M12 12.5c-2.5 0-4.7 1.6-5.5 3.8-.4 1.1.4 2.2 1.6 2.2h7.8c1.2 0 2-1.1 1.6-2.2-.8-2.2-3-3.8-5.5-3.8Z" />
    </>
  ),
  heart: (
    <path d="M12 21s-7.5-4.6-10-9C.5 8.6 2 5 5.5 5c2 0 3.4 1.1 4.5 2.7C11.1 6.1 12.5 5 14.5 5 18 5 19.5 8.6 22 12c-2.5 4.4-10 9-10 9Z" />
  ),
  cross: (
    <path d="M14.5 3h-5v6.5H3v5h6.5V21h5v-6.5H21v-5h-6.5Z" />
  ),
  stethoscope: (
    <>
      <path d="M4 4v7a7 7 0 0 0 7 7h1a7 7 0 0 0 7-7V4" />
      <path d="M4 4h3M18 4h3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M18 20v1.5a2.5 2.5 0 0 1-5 0V17" />
    </>
  ),
  flask: (
    <path d="M9 3h6M10 3v6l-4.6 8a3 3 0 0 0 2.6 4.5h8a3 3 0 0 0 2.6-4.5L14 9V3M7.5 14.5h9" />
  ),
  home: (
    <path d="M4 11 12 4l8 7M6 9.5V20h12V9.5" />
  ),
  map: (
    <>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  xray: (
    <>
      <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z" />
      <path d="M8 12h8M8 15.5h5M8 8.5h8" />
    </>
  ),
};

export type IconName = keyof typeof paths;

type IconProps = {
  name?: string | null;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const content = name ? paths[name] : paths.paw;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {content}
    </svg>
  );
}
