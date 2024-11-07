'use client';

import { Button } from "@/components/ui/button";
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
import { Menu } from "lucide-react";
import Link from "next/link";

type Route = {
  name: string;
  path: string;
};

const routes: Route[]= [
  { name: "About"   , path: "about"    },
  { name: "Contact" , path: "contact"  },
  { name: "Projects", path: "projects" },
  { name: "Hobbies" , path: "hobbies"  },
];

export default function ButtonOffcanvas({ lang }: { lang: string }) {
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
              <Link href={`/${lang}/${route.path}`}>
                <Button variant="outline" className="w-full" type="button">
                  <div className="hover:underline">
                    {route.name}
                  </div>
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <SheetFooter className="mt-auto">
          <SheetClose asChild>
            <Button type="button">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}