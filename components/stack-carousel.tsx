'use client';

import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function StackCarousel ({ stacks }: { 
    stacks: {
        name: string, 
        icon: string
    }[]
}) {
    return (
        <Carousel className="w-full">
            <CarouselContent>
                {stacks.map((stack, index) => (
                    <CarouselItem key={index} className="basis-1/6 md:basis-1/9 lg:basis-1/12">
                        <div className="relative h-40">
                            <Image
                                priority
                                src={stack.icon}
                                alt={stack.name}
                                fill  
                                style={{ objectFit: 'contain' }} 
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}