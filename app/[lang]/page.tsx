import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { StackSection } from "@/components/sections/stack";
import { ProjectsSection } from "@/components/sections/projects";
import { CommunitySection } from "@/components/sections/community";
import { ContactSection } from "@/components/sections/contact";

export default async function IndexPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <HeroSection lang={lang} hero={dictionary.hero} />
      <AboutSection about={dictionary.about} />
      <ExperienceSection experience={dictionary.experience} />
      <StackSection stack={dictionary.stack} />
      <ProjectsSection lang={lang} projects={dictionary.projects} />
      <CommunitySection community={dictionary.community} />
      <ContactSection contact={dictionary.contact} />
    </>
  );
}
