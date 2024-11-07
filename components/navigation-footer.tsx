"use client";

import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu";

export default function NavigationFooter({
    dictionary,
}: {
  dictionary: {
    lang: string
    aboutMe: string;
    aboutMeDescription: string;
    academicBackground: string;
    degree: string;
    email: string;
    contact: string;
    whatsappContact: string;
    hobbiesServices: string;
    projects: string;
    services: {
      title: string;
      href: string;
      description: string;
    }[];
  };
}) {
    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href={`/${dictionary.lang}/about`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {dictionary.aboutMe}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href={`/${dictionary.lang}/hobbies`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {dictionary.hobbiesServices}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href={`/${dictionary.lang}/contact`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {dictionary.contact}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href={`/${dictionary.lang}/projects`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {dictionary.projects}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}