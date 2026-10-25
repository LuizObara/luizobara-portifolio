"use server";

import { sendEmail } from "../lib/sendgrid";

export const sendContactEmailAction = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return { errorMessage: "Missing fields" };
    }

    await sendEmail({
      to: "luizobara@gmail.com",
      templateName: "ContactSubmission",
      dynamicTemplateData: {
        name,
        email,
        message,
      },
      replyToEmail: email
    });

    return { errorMessage: null };
  } catch (error) {
    console.error(error);
    return { errorMessage: "Something went wrong" };
  }
};