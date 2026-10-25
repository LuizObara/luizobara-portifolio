import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({ href, className }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-lg text-[17px] font-semibold tracking-[-0.02em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="inline-flex size-[26px] items-center justify-center rounded-[7px] bg-primary font-mono text-xs font-medium text-primary-foreground"
      >
        LO
      </span>
      <span>
        Luiz <span className="text-brand">Obara</span>
      </span>
    </Link>
  );
}
