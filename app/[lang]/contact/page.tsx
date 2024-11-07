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
        <div>
            <div className="mt-3">                
                <h3 className="text-center font-bold text-3xl">
                    {dictionary.contact.title}
                </h3>

                {/* TODO dividir em componente */}  
                <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="border-2 rounded-[16px] h-20">
                        
                    </div>

                    <div className="border-2 rounded-[16px] h-20">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}