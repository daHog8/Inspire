import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function TruckIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M3 6h11v11H3z"/><path d="M14 10h4l3 3v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>;
}
export function ShieldIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6z"/><path d="m9 12 2 2 4-5"/></svg>;
}
export function SparklesIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2z"/><path d="m18.5 13 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z"/><path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8z"/></svg>;
}
export function GlobeIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg>;
}
export function BagIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M5 8h14l-1 13H6z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
}
export function UserIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>;
}
export function MenuIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
}
