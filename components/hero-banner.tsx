import Image from 'next/image';
import icon from '@/assets/icon.png';

export default function HeroBanner({ 
    dictionary 
}: { dictionary: {
    welcomeMessage: string,
    name: string,
    title: string
}
}) {
    return (
        <div className="flex min-w-full justify-around items-center grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="text-center lg:text-justify uppercase mx-3">
                <h4 className="block text-2xl">{dictionary.welcomeMessage}</h4>
                <h2 className="text-3xl">{dictionary.name}</h2>
                <h3 className="text-4xl font-bold">{dictionary.title}</h3>
            </div>
            <div className="flex w-full justify-center h-48 md:h-80 lg:h-full">
                <Image 
                    src={icon}
                    alt="Icone Luiz Obara"
                />
            </div>
        </div>
    );
}