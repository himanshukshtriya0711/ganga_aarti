"use server";

import { site } from "@/data/site";
import { enquirySummary, serviceLabel, validateEnquiry, type EnquiryErrors, type EnquiryFields } from "@/lib/enquiry";

export type EnquiryResult = { ok: true } | { ok: false; error: string; fieldErrors?: EnquiryErrors };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Emails a new enquiry to the team through Resend's HTTP API.
 * Env: RESEND_API_KEY (required in production), ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL.
 */
export async function submitEnquiry(raw: EnquiryFields & { company?: string }): Promise<EnquiryResult> {
  // Honeypot: real visitors never see the "company" field, bots fill it.
  if (raw.company) return { ok: true };

  const fields: EnquiryFields = {
    name: String(raw.name ?? "").trim().slice(0, 80),
    phone: String(raw.phone ?? "").trim().slice(0, 20),
    service: String(raw.service ?? "").slice(0, 40),
    date: String(raw.date ?? "").slice(0, 20),
    message: String(raw.message ?? "").trim(),
  };
  const fieldErrors = validateEnquiry(fields);
  if (Object.keys(fieldErrors).length) return { ok: false, error: "Please check the highlighted fields.", fieldErrors };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] RESEND_API_KEY not set — logging instead of emailing:\n" + enquirySummary(fields));
      return { ok: true };
    }
    console.error("[enquiry] RESEND_API_KEY is not configured; enquiry was not delivered.");
    return { ok: false, error: "Online enquiries are temporarily unavailable — please reach us on WhatsApp." };
  }

  const rows = [
    ["Name", fields.name],
    ["Phone", fields.phone],
    ["Service", serviceLabel(fields.service) ?? "—"],
    ["Event date", fields.date || "—"],
    ["Message", fields.message || "—"],
  ];
  const html = `<h2 style="font-family:Georgia,serif;color:#e2582b">New enquiry — ${escapeHtml(site.name)}</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5f6b70;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL ?? "Ganga Aarti Website <onboarding@resend.dev>",
        to: [process.env.ENQUIRY_TO_EMAIL ?? site.email],
        subject: `New enquiry: ${serviceLabel(fields.service) ?? "General"} — ${fields.name}`,
        html,
        text: enquirySummary(fields),
      }),
    });
    if (!res.ok) {
      console.error("[enquiry] Resend responded", res.status, await res.text());
      return { ok: false, error: "We couldn't send your enquiry right now — please try WhatsApp." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[enquiry] Failed to reach Resend", err);
    return { ok: false, error: "We couldn't send your enquiry right now — please try WhatsApp." };
  }
}
