"use client"

import { Button } from "./ui/button";
import { Download, Send } from "lucide-react";

export default function ButtonRow({ 
    buttonRow
}: {
    buttonRow: {
        lang: string
        contactButton: string,
        downloadButton: string
    }
}) {
    return (
        <div className="flex mx-3 mt-5 justify-start">
            <a href={`/${buttonRow.lang}/contact`}
               className="flex w-full justify-center gap-3"
            >
                <Button className="rounded-[15px] mr-3 w-full font-bold">
                    {buttonRow.contactButton}
                    <Send/>
                </Button>
            </a>

            <a className="flex w-full justify-center gap-3" 
                href="files/curriculo.pdf"
                rel="noopener noreferrer"
                download>
                <Button variant={"outline"} className="rounded-[15px] ml-3 w-full font-bold">
                    {buttonRow.downloadButton}
                    <Download/>
                </Button>
            </a>
        </div>
    );
}