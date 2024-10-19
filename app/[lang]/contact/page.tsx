import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export default async function PageContact({
    params: { lang },
}: {
    params: { 
        lang: Locale
    }
}) {
    const dictionary = await getDictionary(lang);
    return (
        <>
            <p>{dictionary.contact.title}</p>
        </>
    )
}