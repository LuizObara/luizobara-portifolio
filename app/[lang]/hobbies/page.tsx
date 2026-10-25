import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import { CommunitySection } from "@/components/sections/community";

export default async function PageHobbies(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const { community } = await getDictionary(lang);

  return <CommunitySection community={community} as="h1" />;
}
