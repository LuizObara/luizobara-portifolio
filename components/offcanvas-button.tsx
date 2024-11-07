'use client';

import { ThemeSwitcher } from "@/components/theme-switcher";
import ComboLanguage from "@/components/combo-language";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Route = {
  name: string;
  path: string;
};

export default function ButtonOffcanvas({
  dictionary,
  switcher,
}: {
  dictionary: {
    lang: string;
    aboutMe: string;
    contact: string;
    whatsappContact: string;
    hobbiesServices: string;
    projects: string;
  };
  switcher: {
    title: string;
    select: string;
    search: string;
    notFound: string;
  };
}) {

  const routes: Route[] = [
    { name: dictionary.aboutMe        , path: "about"    },
    { name: dictionary.contact        , path: "contact"  },
    { name: dictionary.projects       , path: "projects" },
    { name: dictionary.hobbiesServices, path: "hobbies"  },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="hidden">Navegação</SheetTitle>
          <SheetDescription className="hidden">
            Escolha uma seção para navegar.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow gap-4 mt-5">
          {routes.map((route: Route, index: number) => (
            <div key={index} className="grid grid-cols-1 items-center mb-5">
              <Link href={`/${dictionary.lang}/${route.path}`}>
                <Button variant="outline" className="w-full" type="button">
                  <div className="hover:underline">
                    {route.name}
                  </div>
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <SheetFooter>
          <ComboLanguage dictionary={switcher}/>
          <SheetClose asChild>
              <ThemeSwitcher />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}