import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function CardProject({
    project,
}: {
    project: {
        image: string,
        altImage: string,
        title: string,
        description: string,
        urlRepository: string,
        seeRepository: string
    }
}) {
    return(
        <div className="p-3 min-h-full border-solid border-2 rounded-md" >
            <div className="relative h-80">
                <Image
                    src={project.image}
                    alt={project.altImage}
                    fill 
                    priority
                    sizes="(min-width: 100%)"
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
    );
}