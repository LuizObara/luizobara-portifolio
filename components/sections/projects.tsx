import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import CardProject from "@/components/card-project";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

import type { Dictionary } from "@/lib/get-dictionary";
import { sectionIds } from "@/lib/site";

export function ProjectsSection({ lang, projects }: { lang: string; projects: Dictionary["projects"] }) {
  const [featured, ...rest] = projects.items;

  return (
    <section
      id={sectionIds.projects}
      className="scroll-mt-16 border-t border-foreground/[0.05] bg-surface"
    >
      <div className="page-container flex flex-col gap-10 py-[72px] md:gap-12 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={projects.eyebrow} title={projects.title} className="max-w-[640px]" />
          <Link
            href={`/${lang}/projects`}
            className="group inline-flex items-center gap-1.5 rounded text-sm font-medium text-foreground/75 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {projects.seeAll}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <Reveal>
          <CardProject project={featured} labels={projects} featured />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 3).map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <CardProject project={project} labels={projects} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
