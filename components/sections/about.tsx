import { Code, GraduationCap, MapPin, Server, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

import type { Dictionary } from "@/lib/get-dictionary";
import { sectionIds } from "@/lib/site";

const highlightIcons: Record<string, LucideIcon> = {
  education: GraduationCap,
  experience: Server,
  location: MapPin,
  focus: Code,
};

export function AboutSection({ about }: { about: Dictionary["about"] }) {
  return (
    <section id={sectionIds.about} className="scroll-mt-16">
      <div className="page-container flex flex-wrap gap-x-16 gap-y-6 py-[72px] md:py-28">
        <Reveal className="min-w-0 flex-[1_1_380px]">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
        </Reveal>

        <div className="flex min-w-0 flex-[1.4_1_560px] flex-col gap-8">
          <Reveal delay={80} className="flex max-w-[640px] flex-col gap-[18px]">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "text-[17px] leading-[1.65] text-foreground/75"
                    : "text-[17px] leading-[1.65] text-muted-foreground"
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {about.highlights.map((highlight, index) => {
              const Icon = highlightIcons[highlight.icon] ?? Code;
              return (
                <Reveal key={highlight.label} delay={index * 80}>
                  <Card className="flex h-full items-start gap-3.5 p-5">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs text-muted-foreground">{highlight.label}</span>
                      <span className="text-[15px] font-medium">{highlight.value}</span>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
