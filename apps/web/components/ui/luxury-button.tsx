import Link from "next/link";
import type { ReactNode } from "react";

type LuxuryButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "dark" | "light" | "outline" | "gold";
  className?: string;
};

const variants = {
  dark: "luxury-button luxury-button--dark",
  light: "luxury-button luxury-button--light",
  outline: "luxury-button luxury-button--outline",
  gold: "luxury-button luxury-button--gold",
};

export function LuxuryButton({
  children,
  href,
  variant = "dark",
  className = "",
}: LuxuryButtonProps) {
  const classes = `${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        <span>{children}</span>
        <span aria-hidden="true" className="luxury-button__arrow">→</span>
      </Link>
    );
  }

  return (
    <button type="button" className={classes}>
      <span>{children}</span>
      <span aria-hidden="true" className="luxury-button__arrow">→</span>
    </button>
  );
}
