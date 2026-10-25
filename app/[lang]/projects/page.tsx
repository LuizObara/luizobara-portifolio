import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";
import { site } from "@/lib/site";

import CardProject from "@/components/card-project";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export default async function PageProjects(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const { projects } = await getDictionary(lang);

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-bg mask-radial absolute inset-x-0 top-0 h-[480px]" />
      <div className="page-container relative flex flex-col gap-10 pb-[72px] pt-14 md:gap-12 md:pb-28 md:pt-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            as="h1"
            eyebrow={projects.pageEyebrow}
            title={projects.pageTitle}
            lead={projects.pageLead}
            className="max-w-[640px]"
          />
          <Link
            href={site.social.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 rounded text-sm font-medium text-foreground/75 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {projects.github}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 3) * 80}>
              <CardProject project={project} labels={projects} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
