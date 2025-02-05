import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";
import CardProject from "@/components/card-project";

export default async function PageProjects(
    props: {
        params: Promise<{ 
            lang: Locale
        }>
    }
) {
    const params = await props.params;
    const { lang } = params;

    const dictionary = await getDictionary(lang);
    return (
        <div className="p-3">
            <h3 className="text-center font-bold text-3xl">
                {dictionary.projects.title}
            </h3>

            <div className="grid h-full grid-cols-1 lg:grid-cols-3 gap-4 mt-3">
                {dictionary.projects.projectsCollection.map((project, index) => (
                    <CardProject project={project} key={index}/>
                ))}             
            </div>
        </div>
    )
}