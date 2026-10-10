import { services } from "@/data/site";

/** Shared by the client form and the server action so both validate identically. */

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "boat", label: "Private Boat Ride" },
  { value: "special", label: "Special Events" },
];

export type EnquiryFields = { name: string; phone: string; service: string; date: string; message: string };
export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;

export const emptyEnquiry: EnquiryFields = { name: "", phone: "", service: "", date: "", message: "" };

const PHONE = /^(\+?91[\s-]?)?[6-9]\d{9}$/;

export function validateEnquiry(f: EnquiryFields): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (f.name.trim().length < 2) errors.name = "Please enter your name";
  if (!PHONE.test(f.phone.replace(/[\s-]/g, ""))) errors.phone = "Enter a valid 10-digit mobile number";
  if (f.message.length > 2000) errors.message = "Please keep the message under 2000 characters";
  return errors;
}

export const serviceLabel = (value: string) => serviceOptions.find((o) => o.value === value)?.label;

/** Plain-text summary, used for the WhatsApp message and the email body. */
export function enquirySummary(f: EnquiryFields) {
  const service = serviceLabel(f.service);
  return [
    "Namaste! I'd like to plan an experience in Kashi.",
    f.name && `Name: ${f.name}`,
    f.phone && `Phone: ${f.phone}`,
    service && `Service: ${service}`,
    f.date && `Date: ${f.date}`,
    f.message && `Message: ${f.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}
