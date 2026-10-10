"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { submitEnquiry } from "@/app/actions/enquiry";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { whatsappLink } from "@/data/site";
import {
  emptyEnquiry as empty,
  enquirySummary,
  serviceOptions,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryFields as Fields,
} from "@/lib/enquiry";

const inputCls =
  "peer w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-stone focus:border-saffron focus:ring-4 focus:ring-saffron/10 aria-[invalid=true]:border-red-400";

type FormProps = { compact?: boolean };

export function EnquiryForm(props: FormProps) {
  return (
    <Suspense fallback={<FormBody {...props} initialService="" />}>
      <FormWithPreset {...props} />
    </Suspense>
  );
}

/** Pre-selects a service when arriving from a service card (?service=slug). */
function FormWithPreset(props: FormProps) {
  const param = useSearchParams().get("service") ?? "";
  const initialService = serviceOptions.some((o) => o.value === param) ? param : "";
  return <FormBody key={initialService} {...props} initialService={initialService} />;
}

function FormBody({ compact = false, initialService }: FormProps & { initialService: string }) {
  const [fields, setFields] = useState<Fields>({ ...empty, service: initialService });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [company, setCompany] = useState(""); // honeypot

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateEnquiry(fields);
    setErrors(errs);
    setFormError(null);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    try {
      const res = await submitEnquiry({ ...fields, company });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      setErrors(res.fieldErrors ?? {});
      setFormError(res.error);
    } catch {
      setFormError("Something went wrong — please try again or reach us on WhatsApp.");
    }
    setStatus("idle");
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-full bg-saffron text-white shadow-[0_0_0_10px_rgba(226,88,43,0.12)]"
            >
              <Check className="size-8" strokeWidth={2.5} />
            </motion.span>
            <h3 className="mt-6 font-serif text-2xl text-ink">Pranam, {fields.name.split(" ")[0]}! 🙏</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Your enquiry has reached us. Our team will call you on {fields.phone} within a few hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setFields(empty);
                setStatus("idle");
              }}
              className="mt-6 text-sm font-semibold text-saffron underline-offset-4 hover:underline"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, y: -10 }} className="grid gap-4 sm:grid-cols-2">
            {/* Honeypot — hidden from people, tempting to bots */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="absolute -left-[9999px] size-px opacity-0"
            />
            <Field error={errors.name}>
              <input className={inputCls} placeholder="Full Name" autoComplete="name" value={fields.name} onChange={set("name")} aria-invalid={!!errors.name} aria-label="Full name" />
            </Field>
            <Field error={errors.phone}>
              <input
                className={inputCls}
                placeholder="Phone Number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={set("phone")}
                aria-invalid={!!errors.phone}
                aria-label="Phone number"
              />
            </Field>
            <Field>
              <div className="relative">
                <select
                  className={`${inputCls} appearance-none pr-10 ${fields.service ? "" : "text-stone"}`}
                  value={fields.service}
                  onChange={set("service")}
                  aria-label="Select service"
                >
                  <option value="">Select Service</option>
                  {serviceOptions.map((o) => (
                    <option key={o.value} value={o.value} className="text-ink">
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" />
              </div>
            </Field>
            <Field>
              <input
                className={`${inputCls} ${fields.date ? "" : "text-stone"}`}
                type={fields.date ? "date" : "text"}
                placeholder="Event Date"
                onFocus={(e) => (e.currentTarget.type = "date")}
                onBlur={(e) => !e.currentTarget.value && (e.currentTarget.type = "text")}
                value={fields.date}
                onChange={set("date")}
                aria-label="Event date"
              />
            </Field>
            <Field className="sm:col-span-2" error={errors.message}>
              <textarea
                className={`${inputCls} resize-none`}
                rows={compact ? 3 : 4}
                placeholder="Message (Optional)"
                value={fields.message}
                onChange={set("message")}
                aria-label="Message"
              />
            </Field>
            <button
              type="submit"
              disabled={status === "sending"}
              className="group flex items-center justify-center gap-2.5 rounded-xl bg-saffron px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_28px_-14px_rgba(226,88,43,0.9)] transition hover:-translate-y-0.5 hover:bg-saffron-600 disabled:opacity-70"
            >
              {status === "sending" ? (
                <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : (
                <Send className="size-4 transition group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              )}
              {status === "sending" ? "Sending…" : "Send Enquiry"}
            </button>
            <a
              href={whatsappLink(enquirySummary(fields))}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-xl bg-whatsapp px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_28px_-14px_rgba(31,166,74,0.9)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              <WhatsappIcon className="size-[18px]" />
              Chat on WhatsApp
            </a>
            <AnimatePresence>
              {formError && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2"
                >
                  {formError}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ children, error, className = "" }: { children: React.ReactNode; error?: string; className?: string }) {
  return (
    <div className={className}>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 pl-1 text-xs text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
