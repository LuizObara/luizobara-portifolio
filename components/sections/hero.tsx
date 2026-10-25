import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import avatar from "@/assets/images/avatar.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";

import type { Dictionary } from "@/lib/get-dictionary";
import { sectionIds, site } from "@/lib/site";

export function HeroSection({ lang, hero }: { lang: string; hero: Dictionary["hero"] }) {
  return (
    <section className="relative overflow-hidden border-b border-foreground/[0.05]">
      <div aria-hidden="true" className="grid-bg mask-radial absolute inset-0" />
      <div
        aria-hidden="true"
        className="glow-brand absolute -right-44 -top-36 size-[420px] blur-[10px] md:-right-20 md:-top-[120px] md:size-[640px]"
      />

      <div className="page-container relative flex flex-wrap items-center gap-x-16 gap-y-10 pb-16 pt-14 md:pb-28 md:pt-[120px]">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-6 md:gap-7">
          <Reveal className="self-start">
            <Badge variant="status">
              <span className="relative inline-flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-75" />
                <span className="relative size-2 rounded-full bg-success" />
              </span>
              {hero.status}
            </Badge>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-[48px] font-semibold leading-none tracking-[-0.045em] md:text-[64px] lg:text-[80px] lg:leading-[0.98]">
              {hero.name}
              <br />
              <span className="text-muted-foreground/80">{hero.role}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="max-w-[560px] text-[17px] leading-[1.6] text-muted-foreground md:text-[19px]">
              {hero.lead}
            </p>
          </Reveal>

          <Reveal delay={240} className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
            <Button asChild>
              <Link href={`/${lang}#${sectionIds.contact}`}>
                {hero.contactCta}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <a href={site.resumePath} download={site.resumeFileName}>
                {hero.resumeCta}
                <Download />
              </a>
            </Button>
          </Reveal>

          <Reveal delay={320} className="flex flex-wrap items-center gap-2">
            <SocialLinks />
            <span className="ml-2 hidden font-mono text-[13px] text-muted-foreground sm:inline">
              {hero.location}
            </span>
          </Reveal>
        </div>

        <Reveal delay={160} className="relative w-full min-w-0 flex-[0_1_440px]">
          <div className="relative aspect-square overflow-hidden rounded-[20px] border border-foreground/[0.08] bg-gradient-to-b from-card to-surface shadow-[0_40px_80px_-48px_rgba(16,16,20,.35)] md:aspect-[1/1.08] dark:shadow-[0_40px_80px_-40px_rgba(0,0,0,.9),0_0_0_1px_hsl(var(--primary)/0.06)]">
            <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-70" />
            <div
              aria-hidden="true"
              className="glow-brand absolute left-1/2 top-[46%] size-[280px] -translate-x-1/2 -translate-y-1/2 opacity-90 md:size-[320px]"
            />
            <Image
              src={avatar}
              alt={hero.avatarAlt}
              priority
              sizes="(min-width: 1024px) 440px, 90vw"
              // O PNG é recortado no contorno: a base reta do busto encosta no fundo
              // do card, e o -translate-x-[57%] centraliza pelo rosto (que fica à
              // direita do centro da imagem)
              className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-[57%] drop-shadow-[0_24px_40px_rgba(0,0,0,.35)]"
            />
            <div className="absolute inset-x-4 top-4 flex justify-between font-mono text-[11px] text-muted-foreground">
              <span>~/luiz-obara</span>
              <span>v2026</span>
            </div>
          </div>

          <div className="absolute -bottom-14 -left-12 hidden w-[300px] overflow-hidden rounded-xl border border-foreground/[0.09] bg-card/95 shadow-[0_24px_50px_-24px_rgba(16,16,20,.35)] backdrop-blur-sm lg:block dark:shadow-[0_24px_50px_-20px_rgba(0,0,0,.9)]">
            <div className="flex items-center gap-1.5 border-b border-foreground/[0.06] px-3 py-2.5">
              <span className="size-2 rounded-full bg-input" />
              <span className="size-2 rounded-full bg-input" />
              <span className="size-2 rounded-full bg-input" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">luiz.ts</span>
            </div>
            <pre className="whitespace-pre px-4 py-3.5 font-mono text-[12.5px] leading-[1.7] text-foreground/75">
              <span className="text-muted-foreground">const</span> luiz = {"{"}
              {"\n  "}role: <span className="text-brand">&quot;Full-Stack&quot;</span>,
              {"\n  "}base: <span className="text-brand">&quot;Sorocaba, SP&quot;</span>,
              {"\n  "}front: [<span className="text-brand">&quot;Next.js&quot;</span>, <span className="text-brand">&quot;Angular&quot;</span>],
              {"\n  "}back: [<span className="text-brand">&quot;Python&quot;</span>, <span className="text-brand">&quot;Spring&quot;</span>],
              {"\n  "}now: [<span className="text-brand">&quot;RPA&quot;</span>, <span className="text-brand">&quot;Data&quot;</span>],
              {"\n"}{"};"}
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
