"use client";

import { useRef, useState, useTransition } from "react";
import { CircleAlert, Send } from "lucide-react";
import { toast } from "sonner";

import { sendContactEmailAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { Dictionary } from "@/lib/get-dictionary";

type FormCopy = Dictionary["contact"]["form"];
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field: Field, value: string, copy: FormCopy) {
  if (!value.trim()) return copy.emptyField;
  if (field === "email" && !emailPattern.test(value.trim())) return copy.invalidEmail;
  return undefined;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-center gap-1.5 text-[13px] text-destructive">
      <CircleAlert className="size-3.5" aria-hidden="true" />
      {message}
    </p>
  );
}

export default function ContactForm({ copy }: { copy: FormCopy }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Errors>({});

  // Erro aparece ao sair do campo; enquanto digita, só some quando o valor fica válido
  const handleBlur = (field: Field) => (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrors((current) => ({ ...current, [field]: validateField(field, event.target.value, copy) }));
  };

  const handleChange = (field: Field) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (errors[field] && !validateField(field, event.target.value, copy)) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmitContactForm = (formData: FormData) => {
    const nextErrors: Errors = {};
    (["name", "email", "message"] as Field[]).forEach((field) => {
      nextErrors[field] = validateField(field, String(formData.get(field) ?? ""), copy);
    });
    setErrors(nextErrors);

    const firstInvalid = (["name", "email", "message"] as Field[]).find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    startTransition(async () => {
      const { errorMessage } = await sendContactEmailAction(formData);
      if (!errorMessage) {
        toast.success(copy.successTitle, { description: copy.successDescription });
        formRef.current?.reset();
      } else {
        toast.error(copy.errorTitle, { description: copy.errorDescription });
      }
    });
  };

  const fieldProps = (field: Field) => ({
    id: `contact-${field}`,
    name: field,
    required: true,
    disabled: isPending,
    onBlur: handleBlur(field),
    onChange: handleChange(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
  });

  return (
    <form ref={formRef} action={handleSubmitContactForm} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">{copy.nameLabel}</Label>
          <Input type="text" autoComplete="name" placeholder={copy.namePlaceholder} {...fieldProps("name")} />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email">{copy.emailLabel}</Label>
          <Input type="email" autoComplete="email" placeholder={copy.emailPlaceholder} {...fieldProps("email")} />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">{copy.messageLabel}</Label>
        <Textarea placeholder={copy.messagePlaceholder} {...fieldProps("message")} />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] text-muted-foreground">{copy.required}</span>
        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? copy.sending : copy.submit}
          <Send />
        </Button>
      </div>
    </form>
  );
}
