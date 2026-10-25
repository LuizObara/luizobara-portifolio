import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

import type { Dictionary } from "@/lib/get-dictionary";
import { sectionIds } from "@/lib/site";
import { cn } from "@/lib/utils";

type Experience = Dictionary["experience"];

function TimelineDot({ current, last }: { current: boolean; last: boolean }) {
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <span
        className={cn(
          "mt-[26px] size-[11px] shrink-0 rounded-full md:mt-[30px]",
          current
            ? "bg-brand shadow-[0_0_0_4px_hsl(var(--brand)/0.15),0_0_16px_hsl(var(--brand)/0.6)]"
            : "border-2 border-muted-foreground/50 bg-background"
        )}
      />
      {!last && <span className="mt-2 w-px flex-1 bg-gradient-to-b from-input to-border" />}
    </div>
  );
}

function RoleHeader({
  role,
  company,
  details,
  period,
}: {
  role: string;
  company: string;
  details: string;
  period: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold leading-snug tracking-[-0.015em] md:text-xl">{role}</h3>
        <span className="text-[15px] font-medium text-brand">
          {company}
          <span className="font-normal text-muted-foreground"> · {details}</span>
        </span>
      </div>
      <span className="font-mono text-[13px] text-muted-foreground">{period}</span>
    </div>
  );
}

export function ExperienceSection({ experience }: { experience: Experience }) {
  const { items, education } = experience;

  return (
    <section
      id={sectionIds.experience}
      className="scroll-mt-16 border-t border-foreground/[0.05] bg-surface"
    >
      <div className="page-container flex flex-wrap gap-x-16 gap-y-10 py-[72px] md:py-28">
        <Reveal className="min-w-0 flex-[1_1_380px] self-start md:sticky md:top-28">
          <SectionHeading eyebrow={experience.eyebrow} title={experience.title} lead={experience.lead} />
        </Reveal>

        <ol className="flex min-w-0 flex-[1.4_1_560px] flex-col">
          {items.map((item) => (
            <li
              key={`${item.company}-${item.period}`}
              className="grid grid-cols-[20px_minmax(0,1fr)] gap-x-4 md:gap-x-6"
            >
              <TimelineDot current={item.current} last={false} />
              <Reveal>
                <Card className="mb-4 flex flex-col gap-4 p-5 md:mb-5 md:px-7 md:py-6">
                  <RoleHeader
                    role={item.role}
                    company={item.company}
                    details={item.details}
                    period={item.period}
                  />
                  <ul className="flex flex-col gap-1.5">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-[15px] leading-[1.6] text-foreground/70 before:mt-3 before:h-px before:w-1.5 before:flex-none before:bg-brand"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="tag">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}

          <li className="grid grid-cols-[20px_minmax(0,1fr)] gap-x-4 md:gap-x-6">
            <TimelineDot current={false} last />
            <Reveal>
              <Card className="p-5 md:px-7 md:py-6">
                <RoleHeader
                  role={education.role}
                  company={education.company}
                  details={education.details}
                  period={education.period}
                />
              </Card>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  );
}
