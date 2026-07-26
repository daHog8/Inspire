import type { ReactNode } from "react";

export function LuxuryBadge({
  children,
  tone = "ivory",
}: {
  children: ReactNode;
  tone?: "ivory" | "gold" | "dark" | "sage";
}) {
  return <span className={`luxury-badge luxury-badge--${tone}`}>{children}</span>;
}
