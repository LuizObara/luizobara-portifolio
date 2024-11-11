"use client";

import { sendContactEmailAction } from "../actions";
import { useRef, useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

function ContactForm({
    contact,
  }: {
    contact: {
      title: string,
      urlWhatsapp: string,
      form: {
        heading: string,
        namePlaceholder: string,
        emailPlaceholder: string,
        messagePlaceholder: string,
        submitButton: string,
        whatsappButton: string
      }
    };
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();

  const handleSubmitContactForm = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await sendContactEmailAction(formData);
      if (!errorMessage) {
        toast.success("Message sent!");
        formRef.current?.reset();
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <form ref={formRef} action={handleSubmitContactForm} className="rounded-[14px] p-4 w-full">
    <h3 className="mb-8 text-center text-2xl font-semibold">{contact.form.heading}</h3>

    <div className="flex flex-col gap-6">
        <input
            name="name"
            type="text"
            placeholder={contact.form.namePlaceholder}
            className="rounded-md p-2 border border-2 focus:ring-0"
            disabled={isPending}
        />
        <input
            name="email"
            type="email"
            placeholder={contact.form.emailPlaceholder}
            className="rounded-md p-2 border border-2"
            disabled={isPending}
        />
        <textarea
            name="message"
            placeholder={contact.form.messagePlaceholder}
            className="rounded-md p-2 min-h-40 border border-2"
            disabled={isPending}
            style={{resize: 'none'}}
        />
        <div className="flex">        
            <Button
                type="submit"
                className="w-48 rounded-lg bg-red-600 py-2 ml-auto font-semibold text-white"
                disabled={isPending}
                variant={"outline"}
            >
                {contact.form.submitButton}
            </Button>
        </div>
    </div>
    </form>
  );
}

export default ContactForm;