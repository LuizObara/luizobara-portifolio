import { ArrowUpRight, Linkedin, Mail, MessageCircle, type LucideIcon } from "lucide-react";

import ContactForm from "@/components/contact-form";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

import type { Dictionary } from "@/lib/get-dictionary";
import { sectionIds, site } from "@/lib/site";

function ChannelCard({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  const external = !href.startsWith("mailto:");

  return (
    <Card asChild className="flex items-center gap-4 px-5 py-[18px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-brand/10 text-brand">
          <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[13px] text-muted-foreground">{label}</span>
          <span className="truncate text-[15px] font-medium">{value}</span>
        </span>
        <ArrowUpRight className="size-[18px] text-muted-foreground" aria-hidden="true" />
      </a>
    </Card>
  );
}

export function ContactSection({ contact }: { contact: Dictionary["contact"] }) {
  return (
    <section id={sectionIds.contact} className="scroll-mt-20">
      <div className="page-container pb-[72px] pt-2 md:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[20px] border border-foreground/[0.08] bg-card">
            <div aria-hidden="true" className="grid-bg mask-fade-down absolute inset-0" />
            <div aria-hidden="true" className="glow-brand absolute -left-[120px] -top-[200px] size-[560px]" />

            <div className="relative flex flex-wrap gap-14 p-6 py-10 md:p-16">
              <div className="flex min-w-0 flex-[1.3_1_520px] flex-col gap-8">
                <SectionHeading
                  eyebrow={contact.eyebrow}
                  title={contact.title}
                  lead={contact.lead}
                  className="[&_h2]:md:text-[52px] [&_p]:max-w-[520px]"
                />
                <ContactForm copy={contact.form} />
              </div>

              <div className="flex min-w-0 flex-[1_1_340px] flex-col justify-end gap-3">
                <span className="mb-1 font-mono text-xs text-muted-foreground">{contact.direct}</span>
                <ChannelCard href={site.social.email} icon={Mail} label={contact.emailLabel} value={contact.email} />
                <ChannelCard
                  href={contact.urlWhatsapp}
                  icon={MessageCircle}
                  label={contact.whatsappLabel}
                  value={contact.whatsappValue}
                />
                <ChannelCard
                  href={site.social.linkedin}
                  icon={Linkedin}
                  label={contact.linkedinLabel}
                  value={contact.linkedinValue}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
