import { redirect } from "next/navigation";
import { Locale } from "@/i18n-config";
import { sectionIds } from "@/lib/site";

// O conteúdo de "Sobre" agora vive na home
export default async function AboutPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  redirect(`/${lang}#${sectionIds.about}`);
}
