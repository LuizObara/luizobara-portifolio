import { getDictionary } from "@/lib/get-dictionary";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import Image from "next/image";

export default async function PageProjects({
    params: { lang },
}: {
    params: { 
        lang: Locale
    }
}) {
    const dictionary = await getDictionary(lang);
    return (
        <div className="p-3">
            <h3 className="text-center font-bold text-3xl">
                {dictionary.projects.title}
            </h3>

            <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                {/* TODO separar em client-component */}
                {dictionary.projects.projectsCollection.map((project, index) => (
                    <div className="p-3 min-h-full border-solid border-2 rounded-md" key={index}>
                        <div className="relative h-80">
                            <Image
                                src={project.image}
                                alt={project.altImage}
                                fill  
                                sizes="(min-width: 100%)"
                                loading = 'lazy'
                                style={{ objectFit: 'contain' }} 
                            />                      
                        </div>

                        <div className=" border-b-2 ">
                            <h4 className="font-semibold mb-3">{project.title}</h4>
                        </div>
                        
                        <div className="h-24">
                            <p className="text-sm leading-tight text-muted-foreground">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <Link href={project.urlRepository} target="blank">
                                <Button variant={"outline"}>
                                    {project.seeRepository}
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}             
            </div>
        </div>
    )
}