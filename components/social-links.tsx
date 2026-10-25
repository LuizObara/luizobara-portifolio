import { Github, Instagram, Linkedin, Mail, Twitch, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site, type SocialKey } from "@/lib/site";
import { cn } from "@/lib/utils";

const socialMeta: Record<SocialKey, { label: string; icon: LucideIcon }> = {
  github: { label: "GitHub", icon: Github },
  linkedin: { label: "LinkedIn", icon: Linkedin },
  email: { label: "E-mail", icon: Mail },
  twitch: { label: "Twitch", icon: Twitch },
  instagram: { label: "Instagram", icon: Instagram },
};

export function SocialLinks({
  items = ["github", "linkedin", "email"],
  className,
}: {
  items?: SocialKey[];
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map((key) => {
        const { label, icon: Icon } = socialMeta[key];
        const external = key !== "email";

        return (
          <Button key={key} variant="outline" size="icon" asChild>
            <a
              href={site.social[key]}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <Icon strokeWidth={1.75} />
            </a>
          </Button>
        );
      })}
    </div>
  );
}
