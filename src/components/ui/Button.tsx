import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";

type CommonProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: never } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

const variantClasses: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary:
    "bg-primary text-white border border-primary hover:bg-primary-dark hover:border-primary-dark",
  secondary:
    "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
};

const sizeClasses: Record<NonNullable<CommonProps["size"]>, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-all duration-300 hover:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
