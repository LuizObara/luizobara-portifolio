import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default async function PageHobbies({
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
                {dictionary.hobbies.title}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                {/* TODO Dividir em client-component */}
                {dictionary.hobbies.services.map((service, index) => (
                    <div className="p-3 min-h-40 h-full border-solid border-2  flex flex-col justify-between" key={index}>
                        <div className="flex">
                            <div className="w-1/4 relative p-2">
                                <Image 
                                    priority
                                    src={service?.image || ""} 
                                    alt="Descrição da Imagem" 
                                    fill  
                                    sizes="(max-width: 100%)"
                                    style={{ objectFit: 'contain' }} 
                                />
                            </div>
                            <div className="w-3/4 p-3">
                                <h4 className="font-semibold">{service.title}</h4>                       
                                <p>{service.description}</p>

                                <div className="flex justify-end mt-auto">
                                    <Link href={service.href} target="blank">
                                        <Button variant={"secondary"}>
                                            {service.button}
                                        </Button>
                                    </Link>             
                                </div>
                            </div>                            
                        </div>  
                    </div>
                ))}
            </div>
        </div>
    )
}