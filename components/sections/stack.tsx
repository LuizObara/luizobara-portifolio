import {
  Bot,
  Braces,
  ChartColumn,
  Cloud,
  Code,
  Database,
  Monitor,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

import type { Dictionary } from "@/lib/get-dictionary";
import { sectionIds } from "@/lib/site";

const groupIcons: Record<string, LucideIcon> = {
  languages: Braces,
  automation: Bot,
  data: ChartColumn,
  backend: Code,
  frontend: Monitor,
  database: Database,
  devops: Cloud,
};

export function StackSection({ stack }: { stack: Dictionary["stack"] }) {
  const total = stack.groups.reduce((sum, group) => sum + group.items.length, 0);
  const summary = stack.summary
    .replace("{count}", String(total))
    .replace("{groups}", String(stack.groups.length));

  return (
    <section id={sectionIds.stack} className="scroll-mt-16">
      <div className="page-container flex flex-col gap-10 py-[72px] md:gap-12 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={stack.eyebrow} title={stack.title} className="max-w-[640px]" />
          <p className="font-mono text-[13px] text-muted-foreground">{summary}</p>
        </Reveal>

        <div className="flex flex-wrap gap-4">
          {stack.groups.map((group, index) => {
            const Icon = groupIcons[group.icon] ?? Code;
            return (
              <Reveal
                key={group.title}
                delay={(index % 3) * 80}
                className={index < 2 ? "min-w-0 flex-[1_1_520px]" : "min-w-0 flex-[1_1_340px]"}
              >
                <Card className="flex h-full flex-col gap-5 p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="size-[18px] text-brand" strokeWidth={1.75} aria-hidden="true" />
                      <h3 className="text-lg font-semibold">{group.title}</h3>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item} variant="chip">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
