"use client"

import Image from 'next/image';
import icon from '@/assets/images/icon.png';
import ButtonRow from './button-row';

export default function HeroBanner({ dictionary }: 
{ 
    dictionary: {
        welcomeMessage: string,
        name: string,
        title: string,
        buttonRow: {
            lang: string,
            contactButton: string,
            downloadButton: string
        }
    }
}) {
    return (
        <div className="flex min-w-full justify-around items-center grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2  gap-4">
            <div className="text-center xl:text-justify uppercase mx-3">
                <h4 className="block text-2xl xl:text-3xl">{dictionary.welcomeMessage}</h4>
                <h2 className="text-3xl font-semibold xl:text-4xl">{dictionary.name}</h2>
                <h3 className="text-4xl xl:text-7xl font-extrabold">{dictionary.title}</h3>
                <ButtonRow buttonRow={dictionary.buttonRow}/>
            </div>
            <div className="flex w-full justify-center">
                <Image 
                    priority
                    src={icon}
                    alt="Icone Luiz Obara"
                    className='flex justify-center items-center h-72 w-72 md:w-96 md:h-96 xl:w-full lg:h-full'
                />
            </div>
        </div>
    );
}