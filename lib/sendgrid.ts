import sgMail, { MailDataRequired } from "@sendgrid/mail";

type Props = {
  to: string;
  templateName: "ContactSubmission";
  dynamicTemplateData?: Record<string, string>;
  replyToEmail?: string; 
};

export const sendEmail = async ({
  to,
  templateName,
  dynamicTemplateData,
  replyToEmail,
}: Props) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const msg: MailDataRequired = {
    to,
    from: {
      email: "luizobara@gmail.com",
      name: "Luiz Obara",
    },
    replyTo: replyToEmail ? { email: replyToEmail } : undefined,
    templateId: templates[templateName],
    dynamicTemplateData,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};

const templates = {
  ContactSubmission: "d-03f027889202488ab459e2fb927dae56",
};
