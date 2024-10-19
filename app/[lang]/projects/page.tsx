import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export default async function PageProjects({
    params: { lang },
}: {
    params: { 
        lang: Locale
    }
}) {
    const dictionary = await getDictionary(lang);
    return (
        <>
            <p>{dictionary.projects.title}</p>
        </>
    )
}