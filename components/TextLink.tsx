import Link from "next/link";

import { ArrowIcon } from "@/components/ArrowIcon";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "down";
};

export function TextLink({ href, children, className = "", direction = "right" }: TextLinkProps) {
  return (
    <Link className={`text-link ${className}`.trim()} href={href}>
      <span>{children}</span>
      <ArrowIcon direction={direction} />
    </Link>
  );
}
