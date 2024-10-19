import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function AboutPage({
    params: {lang},
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);
    return (
        <>
            <p>{dictionary.about.title}</p>
        </>
    );
}