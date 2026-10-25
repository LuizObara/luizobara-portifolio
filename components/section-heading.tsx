import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <span className="font-mono text-[13px] font-medium text-brand">{eyebrow}</span>
      <Heading className="text-balance text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] md:text-[44px]">
        {title}
      </Heading>
      {lead && (
        <p className="max-w-[440px] text-[17px] leading-[1.65] text-muted-foreground">
          {lead}
        </p>
      )}
    </div>
  );
}
