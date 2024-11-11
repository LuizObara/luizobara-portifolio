import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import ContactForm from "@/components/contact-form";

export default async function PageContact(
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
        <div>
            <div className="mt-3 p-3">                
                <h3 className="text-center font-bold text-3xl">
                    {dictionary.contact.title}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mt-5">
                    <div className="border-2 rounded-[16px] flex justify-center w-full">
                        <ContactForm contact={dictionary.contact}/>
                    </div>
                    {/* TODO Realizar um meio de agendar ou marcar horários para reuniões ou entrevistas em DataPicker*/}
                    {/* <div className="border-2 rounded-[16px] h-20">
                    
                    </div> */}
                </div>
            </div>
        </div>
    )
}