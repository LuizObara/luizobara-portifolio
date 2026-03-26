"use client"

import { cn } from "@/lib/utils";
import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function NavigationBar({
  dictionary,
}: {
  dictionary: {
    lang: string;
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
    <NavigationMenu>
      <NavigationMenuList>

        {/* ABOUT */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {dictionary.aboutMe}
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid gap-3 p-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                    href="https://www.linkedin.com/in/luizobara/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="flex items-center justify-between">
                      <Avatar>
                        <AvatarImage src="https://github.com/luizobara.png" alt="@luizobara" />
                        <AvatarFallback>LO</AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-medium">
                        Luiz Obara
                      </h3>
                    </div>

                    <div className="flex h-full justify-end">
                      <p className="text-sm leading-tight content-end text-muted-foreground">
                        {dictionary.aboutMeDescription}
                      </p>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>

              <ListItem href="/" title={dictionary.academicBackground}>
                {dictionary.degree}
              </ListItem>

              <ListItem href="mailto:luizobara@gmail.com" title={dictionary.email}>
                luizobara@gmail.com
              </ListItem>

              <ListItem
                href="https://wa.me/15988038900"
                title={dictionary.contact}
                target="_blank"
                rel="noreferrer"
              >
                {dictionary.whatsappContact}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* HOBBIES / SERVICES */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {dictionary.hobbiesServices}
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {dictionary.services.map((service) => (
                <ListItem
                  key={service.title}
                  title={service.title}
                  href={service.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {service.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* CONTACT */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={`/${dictionary.lang}/contact`}>
              {dictionary.contact}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* PROJECTS */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={`/${dictionary.lang}/projects`}>
              {dictionary.projects}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";