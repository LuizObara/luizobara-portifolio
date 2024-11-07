import HeroBanner from "@/components/hero-banner";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function IndexPage(
  props: {
    params: Promise<{ lang: Locale }>;
  }
) {
  const params = await props.params;
  const { lang } = params;

  const dictionary = await getDictionary(lang);
  return (
    <div className="w-full h-full">
        <div className="flex items-center py-5">
            <HeroBanner dictionary={dictionary.banner}/>
        </div>
    </div>
  );
}