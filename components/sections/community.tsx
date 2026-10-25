import { ArrowUpRight, Heart, Instagram, Twitch, Users, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

import type { Dictionary } from "@/lib/get-dictionary";
import { sectionIds } from "@/lib/site";

const communityIcons: Record<string, LucideIcon> = {
  twitch: Twitch,
  instagram: Instagram,
  heart: Heart,
  users: Users,
};

export function CommunitySection({
  community,
  as = "h2",
}: {
  community: Dictionary["community"];
  as?: "h1" | "h2";
}) {
  return (
    <section id={sectionIds.community} className="scroll-mt-16">
      <div className="page-container flex flex-col gap-10 py-[72px] md:gap-12 md:py-28">
        <Reveal>
          <SectionHeading
            as={as}
            eyebrow={community.eyebrow}
            title={community.title}
            lead={community.lead}
            className="max-w-[640px]"
          />
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {community.items.map((item, index) => {
            const Icon = communityIcons[item.icon] ?? Heart;
            return (
              <Reveal key={item.title} delay={index * 80}>
                <Card asChild className="group flex h-full flex-col gap-3.5 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <span className="inline-flex size-10 items-center justify-center rounded-[10px] border border-border bg-secondary text-foreground/80">
                      <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <span className="text-[17px] font-semibold">{item.title}</span>
                      <span className="text-sm leading-[1.55] text-muted-foreground">{item.description}</span>
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1 font-mono text-xs text-brand">
                      {item.cta}
                      <ArrowUpRight
                        className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
