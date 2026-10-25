import Link from "next/link";

import { Wordmark } from "@/components/wordmark";
import { SocialLinks } from "@/components/social-links";
import { LanguageSwitcher } from "@/components/language-switcher";

import type { Dictionary } from "@/lib/get-dictionary";
import { sectionIds, site, type SectionKey } from "@/lib/site";

const footerSections: SectionKey[] = ["about", "experience", "projects", "contact"];

const linkClass =
  "text-sm font-medium text-foreground/75 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded";

export function SiteFooter({ lang, dictionary }: { lang: string; dictionary: Dictionary }) {
  const { nav, footer } = dictionary;

  return (
    <footer className="border-t border-foreground/[0.06]">
      <div className="page-container flex flex-col gap-12 pb-8 pt-14">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-[360px] flex-[1_1_320px] flex-col gap-4">
            <Wordmark href={`/${lang}`} className="self-start" />
            <p className="text-sm leading-relaxed text-muted-foreground">{footer.tagline}</p>
            <SocialLinks items={["github", "linkedin", "twitch", "instagram"]} />
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-10">
            <nav aria-label={footer.navigation} className="flex flex-col gap-3">
              <span className="font-mono text-xs text-muted-foreground">{footer.navigation}</span>
              {footerSections.map((key) => (
                <Link key={key} href={`/${lang}#${sectionIds[key]}`} className={linkClass}>
                  {nav[key]}
                </Link>
              ))}
            </nav>

            <nav aria-label={footer.pages} className="flex flex-col gap-3">
              <span className="font-mono text-xs text-muted-foreground">{footer.pages}</span>
              <Link href={`/${lang}/projects`} className={linkClass}>
                {footer.allProjects}
              </Link>
              <Link href={`/${lang}/hobbies`} className={linkClass}>
                {footer.hobbies}
              </Link>
              <a href={site.resumePath} download={site.resumeFileName} className={linkClass}>
                {footer.resume}
              </a>
            </nav>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-muted-foreground">{footer.language}</span>
              <LanguageSwitcher label={footer.language} className="self-start" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-foreground/[0.06] pt-6">
          <span className="text-[13px] text-muted-foreground">© {new Date().getFullYear()} Luiz Obara</span>
          <span className="font-mono text-xs text-muted-foreground">{footer.builtWith}</span>
        </div>
      </div>
    </footer>
  );
}
