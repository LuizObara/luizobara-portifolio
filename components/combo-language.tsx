"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { localeNames } from "@/i18n-config";

import { usePathname } from "next/navigation";
import { i18n } from "@/i18n-config";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function ComboLanguage({
    dictionary,
}: {
    dictionary: {
        title: string,
        search: string,
        select: string,
        notFound: string
  };
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex items-center">
        <p className="text-lg font-bold mx-3">{dictionary.title}</p>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
                >
                {value
                    ? i18n.locales.find((locale) => locale === value)
                    : dictionary.select}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    {/* <CommandInput placeholder={dictionary.search} /> */}
                    <CommandList>
                        <CommandEmpty>{dictionary.notFound}</CommandEmpty>
                        <CommandGroup>
                            {i18n.locales.map((locale) => (
                                <CommandItem
                                    key={locale}
                                    value={locale}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                        window.location.href = redirectedPathName(currentValue);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === locale 
                                            ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {localeNames[locale]}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    </div>
  );
}