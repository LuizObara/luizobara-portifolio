import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight, Code, Cpu, Github, ImageIcon, Workflow, type LucideIcon } from "lucide-react";

import baglink from "@/assets/images/projects/baglink.png";
import linkpreview from "@/assets/images/projects/linkpreview.png";
import spotifyweb from "@/assets/images/projects/spotifyweb.png";
import spotifyandroid from "@/assets/images/projects/spotifyandroid.jpeg";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { Dictionary } from "@/lib/get-dictionary";
import { cn } from "@/lib/utils";

type Projects = Dictionary["projects"];
type Project = Projects["items"][number];

const projectImages: Record<string, StaticImageData> = {
  baglink,
  linkpreview,
  spotifyweb,
  spotifyandroid,
};

const placeholderIcons: Record<string, LucideIcon> = {
  workflow: Workflow,
  cpu: Cpu,
};

const textLink =
  "inline-flex items-center gap-1.5 rounded text-sm font-medium text-foreground/75 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4 [&_svg]:transition-transform";

function ProjectMedia({ project, featured }: { project: Project; featured?: boolean }) {
  const image = projectImages[project.image];
  const Icon = placeholderIcons[project.icon] ?? ImageIcon;

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-lg border border-foreground/[0.06] bg-secondary",
        featured && "min-w-0 flex-[1.3_1_520px]"
      )}
    >
      {featured && (
        <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center gap-1.5 border-b border-foreground/[0.06] bg-background/60 px-3 backdrop-blur-sm">
          <span className="size-2 rounded-full bg-input" />
          <span className="size-2 rounded-full bg-input" />
          <span className="size-2 rounded-full bg-input" />
        </div>
      )}

      {image ? (
        <Image
          src={image}
          alt={project.imageAlt}
          fill
          sizes={featured ? "(min-width: 1024px) 680px, 100vw" : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"}
          className={cn(
            "object-cover object-top transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100",
            featured && "top-8 h-[calc(100%-2rem)]"
          )}
        />
      ) : (
        <>
          <div aria-hidden="true" className="grid-bg absolute inset-0 transition-transform duration-300 group-hover:scale-[1.04]" />
          <div
            aria-hidden="true"
            className="glow-brand absolute bottom-[-40%] left-1/2 h-[80%] w-[70%] -translate-x-1/2"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-14 items-center justify-center rounded-xl border border-border bg-card/80 text-brand">
              <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default function CardProject({
  project,
  labels,
  featured = false,
}: {
  project: Project;
  labels: Pick<Projects, "code" | "live" | "featuredLabel" | "viewProject" | "repository">;
  featured?: boolean;
}) {
  const tags = (
    <div className="flex flex-wrap gap-1.5">
      {project.tags.map((tag) => (
        <Badge key={tag} variant="tag">
          {tag}
        </Badge>
      ))}
    </div>
  );

  if (featured) {
    return (
      <Card asChild className="group flex flex-wrap gap-2 overflow-hidden p-3">
        <article>
          <ProjectMedia project={project} featured />
          <div className="flex min-w-0 flex-[1_1_380px] flex-col justify-center gap-[18px] px-4 pb-4 pt-5 md:px-7 md:pb-6 md:pt-7">
            <span className="font-mono text-xs text-brand">{labels.featuredLabel}</span>
            <h3 className="text-[26px] font-semibold tracking-[-0.025em] md:text-[32px]">{project.title}</h3>
            <p className="text-base leading-[1.65] text-muted-foreground">{project.description}</p>
            {tags}
            <div className="mt-1.5 flex flex-wrap gap-2.5">
              {project.urlProduction && (
                <Button asChild size="sm">
                  <a href={project.urlProduction} target="_blank" rel="noreferrer">
                    {labels.viewProject}
                    <ArrowUpRight />
                  </a>
                </Button>
              )}
              {project.urlRepository && (
                <Button asChild size="sm" variant={project.urlProduction ? "secondary" : "default"}>
                  <a href={project.urlRepository} target="_blank" rel="noreferrer">
                    <Github />
                    {labels.repository}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </article>
      </Card>
    );
  }

  const hasLinks = Boolean(project.urlRepository || project.urlProduction);

  return (
    <Card asChild className="group flex h-full flex-col p-3">
      <article>
        <ProjectMedia project={project} />
        <div className="flex flex-1 flex-col gap-3 px-3 pb-2 pt-5">
          <span className="font-mono text-xs text-muted-foreground">{project.context}</span>
          <h3 className="text-[19px] font-semibold tracking-[-0.015em] transition-colors group-hover:text-brand">
            {project.title}
          </h3>
          <p className="text-[15px] leading-[1.6] text-muted-foreground">{project.description}</p>
          {tags}
          {hasLinks && (
            <div className="mt-auto flex gap-5 border-t border-border pt-3">
              {project.urlRepository && (
                <a href={project.urlRepository} target="_blank" rel="noreferrer" className={textLink}>
                  <Code />
                  {labels.code}
                </a>
              )}
              {project.urlProduction && (
                <a href={project.urlProduction} target="_blank" rel="noreferrer" className={textLink}>
                  <ArrowUpRight />
                  {labels.live}
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Card>
  );
}
