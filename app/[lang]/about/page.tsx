import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";
import StackCarousel from "@/components/stack-carousel";

export default async function AboutPage({
    params: {lang},
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);
    return (
        <div>
            <h3 className="text-center font-bold text-3xl">
                {dictionary.about.title}
            </h3>
            <div className="grid grid-cols-1 gap-4 mt-3">
                <div className="flex justify-center">
                    <div className="w-full max-w-3xl p-3 font-bold text-justify">
                        <p className="mb-3">
                            {dictionary.about.text.background}
                        </p>
                        <p className="mb-3">
                            {dictionary.about.text.experience}
                        </p>
                        <p>
                            {dictionary.about.text.present}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center mt-3">
                    <div className="max-w-3xl w-full">
                        <StackCarousel stacks={dictionary.about.stacks}/>
                    </div>
                </div>
            </div>
        </div>
    );
}