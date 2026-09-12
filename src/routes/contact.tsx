"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Globe, Send, Loader2, CheckCircle2 } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { LegalBody } from "@/components/site/LegalDoc";
import { site } from "@/data/site";

const posts = [
  { label: "सरपंच", value: "Sarpanch" },
  { label: "पंचायत समिति सदस्य", value: "Panchayat Samiti Member" },
  { label: "जिला परिषद सदस्य", value: "Zila Parishad Member" },
  { label: "अन्य स्थानीय चुनाव उम्मीदवार", value: "Other Local Election Candidate" },
  { label: "अन्य", value: "Other" },
];

const grievanceContent = `
*BHARATPAHCHAN.COM — CONTACT US & GRIEVANCE REDRESSAL*

BharatPahchan.com is a venture of *CITILINE TECHNOLOGIES PRIVATE LIMITED*.

*Corporate Office:* 301, Dreampoint, PN 1156, Khandela House, Nirwan Marg, Jaipur - 302016, Rajasthan, India.
*Registered Office:* 715, Mastermind V, Royal Palm Estate, Goregaon (East), Mumbai - 400065, Maharashtra, India.
*Official Contact / Support / Grievance Email:* bharatpahchan.helpline@gmail.com
*Phone:* +91 7891-131-132

## 1. About BharatPahchan

BharatPahchan.com is a venture of CITILINE TECHNOLOGIES PRIVATE LIMITED. The Platform provides private digital identity, profile, discovery, information, verification, visibility and related digital services. BharatPahchan is not a government website or official government identity registry.

## 2. General Contact

For general enquiries, support, account assistance, profile questions, business enquiries and other communications, use the official email: bharatpahchan.helpline@gmail.com. Phone: +91 7891-131-132.

## 3. Corporate Office

CITILINE TECHNOLOGIES PRIVATE LIMITED, 301, Dreampoint, PN 1156, Khandela House, Nirwan Marg, Jaipur - 302016, Rajasthan, India.

## 4. Registered Office

CITILINE TECHNOLOGIES PRIVATE LIMITED, 715, Mastermind V, Royal Palm Estate, Goregaon (East), Mumbai - 400065, Maharashtra, India.

## 5. Grievance Officer / Privacy Contact

Designation: Grievance Officer / Privacy Contact, BharatPahchan.com, CITILINE TECHNOLOGIES PRIVATE LIMITED. Email: bharatpahchan.helpline@gmail.com.

Until a named individual is formally designated and published by the Company, communications addressed to this designation at the official email will be routed internally to the authorised person responsible for handling the matter.

## 6. Matters You May Report

You may contact us regarding account access; profile creation or claiming; correction, updating, de-indexing or removal requests; impersonation or fake profiles; privacy or personal-data requests; copyright or trademark complaints; unlawful, defamatory, threatening or objectionable content; advertising concerns; payment, billing, cancellation or refund issues; security concerns; suspected fraud; legal notices; and law-enforcement or court communications.

## 7. Information to Include in a Complaint

Please provide your name and reliable contact details; the exact profile/page URL or order/transaction reference; a clear description of the issue; the specific action requested; and supporting material reasonably necessary to assess the request. If acting for another person or organisation, provide evidence of authority where appropriate.

Do not send passwords, OTPs, PINs, full card credentials or unnecessary sensitive personal information.

## 8. Profile Correction / Update Request

For correction of a profile, identify each disputed field and provide the proposed correction and a reliable source or supporting evidence where appropriate. CTPL may distinguish between objective factual corrections and subjective disputes, opinions or contested historical claims.

## 9. Profile Claim / Impersonation Complaint

If you are the person represented in a profile and wish to claim it, or believe another person is impersonating you, provide the exact profile URL and sufficient proportionate evidence to verify identity. CTPL may temporarily restrict sensitive edits while competing claims are investigated.

## 10. Privacy / Personal Data Request

For access-related information, correction, updating, erasure, consent withdrawal or another privacy request recognised by applicable law, identify the relevant account/profile and the requested action. CTPL may verify identity before acting and may retain information where law permits or requires retention.

## 11. Copyright / Trademark Complaint

A rights holder should identify the copyrighted work or trademark, the exact allegedly infringing URL/material, the basis of ownership/authority, the nature of infringement and contact information. CTPL may request further evidence, restrict material during review or communicate with the uploader where legally appropriate.

## 12. Unlawful Content / Threat / Fraud Complaint

For alleged fraud, forged identity, threats, harassment, cyber abuse or other potentially unlawful content, preserve your own evidence and identify the exact material. Where immediate physical danger or an ongoing crime exists, contact the appropriate police/emergency authority in addition to notifying BharatPahchan.

## 13. Payment / Refund Complaint

For billing or refund matters, provide the order/invoice number, transaction ID, date, amount, payment method, service purchased, reason for dispute and requested resolution. Never send card PINs or OTPs.

## 14. Security Vulnerability Reports

If you discover a suspected security vulnerability, report it privately to bharatpahchan.helpline@gmail.com with sufficient technical detail to reproduce and assess the issue. Do not exploit the vulnerability, access data beyond what is necessary to demonstrate it, disrupt services, demand payment through threats, or publicly disclose sensitive details before CTPL has had a reasonable opportunity to investigate.

## 15. Law-Enforcement / Court / Regulatory Requests

Official requests should identify the issuing authority, officer/contact details, legal basis, case/reference number, scope of information or action sought, relevant account/profile identifiers and any legally applicable deadline. CTPL may verify authenticity, jurisdiction and legal validity before acting unless law requires otherwise.

## 16. Complaint Handling Process

After receipt, CTPL may acknowledge the complaint, assign an internal reference, verify identity/authority where necessary, preserve relevant records, review the disputed material, seek additional information, contact another affected party where appropriate, and take action required by law or Platform policy.

The exact process depends on the nature and urgency of the complaint. CTPL will process grievances within timelines required by the law applicable to the particular matter.

## 17. Possible Outcomes

Depending on the facts and law, CTPL may correct information, request further evidence, label disputed information, restrict sensitive fields, suspend a profile, remove content, restore content, reject an unsupported request, process a refund, preserve evidence, suspend an account, or refer the matter for legal/compliance review.

## 18. Emergency and Safety Matters

BharatPahchan email support is not an emergency service. For immediate threats to life, physical safety, ongoing violence, missing persons or other emergencies, contact the appropriate police/emergency authority first. You may separately notify us if Platform content is relevant.

## 19. Response Communications

Responses may be sent to the email or contact details supplied by the complainant. Users should monitor spam/junk folders and provide a functioning address. CTPL is not responsible for delay caused by incorrect or inaccessible contact information supplied by the complainant.

## 20. Abuse of Grievance Process

Do not submit knowingly false notices, forged authority letters, fabricated infringement claims, threats or repetitive malicious complaints intended to harass another person or manipulate the Platform. CTPL may restrict abuse and preserve relevant records, without discouraging genuine good-faith complaints.

## 21. Statutory Remedies

Use of the BharatPahchan grievance mechanism does not prevent a person from approaching a consumer forum, Data Protection Board, court, law-enforcement agency or other authority where applicable law gives that person such a right.

## 22. Official Communication Channel

For the present website launch, bharatpahchan.helpline@gmail.com is the official consolidated contact for support, privacy, grievances, legal complaints, refunds and profile matters. If CTPL later introduces dedicated departmental addresses, the website will be updated accordingly.

## 23. Governing Law

The handling of complaints and communications is subject to applicable laws of India and any mandatory statutory process governing the particular matter.
`;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("loading");
    setError("");
    const state = String(fd.get("state") ?? "").trim();
    const post = String(fd.get("post") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") ?? "").trim(),
          phone: String(fd.get("phone") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          post,
          source: "Contact Us Page",
          state,
          city: state,
          pageUrl: window.location.href,
          utmSource: new URLSearchParams(window.location.search).get("utm_source") || "",
          utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || "",
          utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
          message: message
            ? `Contact Us Form\nSelected Post: ${post}\n\n${message}`
            : `Contact Us Form\nSelected Post: ${post}`,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }
      setStatus("done");
      setError("");
      form.reset();
    } catch {
      setStatus("error");
      setError("कुछ गड़बड़ हो गई। कृपया दोबारा प्रयास करें या सीधे कॉल करें।");
    }
  }

  const field =
    "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/25";

  return (
    <>
      <PageHero
        title="संपर्क करें"
        sub="डेमो, पैकेज या डिजिटल अभियान जानकारी के लिए फ़ॉर्म भरें — हमारी टीम आपसे संपर्क करेगी।"
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            {[
              { icon: MapPin, label: "पता", value: site.address, href: undefined },
              { icon: Phone, label: "फ़ोन", value: site.phone, href: `tel:${site.phone}` },
              { icon: Mail, label: "ईमेल", value: site.email, href: `mailto:${site.email}` },
              { icon: Globe, label: "वेबसाइट", value: site.website, href: undefined },
            ].map((c) => (
              <div key={c.label} className="card-warm flex items-start gap-3 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-saffron/12 ring-1 ring-saffron/30">
                  <c.icon className="h-4.5 w-4.5 text-saffron" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-sm font-semibold break-all text-maroon">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-maroon">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="card-warm p-6">
            <h2 className="text-lg text-maroon">Enquiry Form</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold" htmlFor="name">
                  नाम *
                </label>
                <input id="name" name="name" required className={field} placeholder="आपका नाम" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold" htmlFor="phone">
                  मोबाइल नंबर *
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  inputMode="tel"
                  className={field}
                  placeholder="+91"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold" htmlFor="email">
                  ईमेल
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={field}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold" htmlFor="post">
                  किस पद के लिए? *
                </label>
                <select id="post" name="post" required className={field} defaultValue="">
                  <option value="" disabled>
                    चुनें
                  </option>
                  {posts.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold" htmlFor="state">
                  राज्य / जिला
                </label>
                <input
                  id="state"
                  name="state"
                  className={field}
                  placeholder="जैसे: राजस्थान, जयपुर"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold" htmlFor="message">
                  आपका संदेश
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={field}
                  placeholder="अपनी ज़रूरत बताएँ..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-saffron px-6 py-3 text-sm font-semibold text-saffron-foreground disabled:opacity-70 sm:w-auto"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              फ़ॉर्म भेजें
            </button>

            {status === "done" && (
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-saffron">
                <CheckCircle2 className="h-4 w-4" /> धन्यवाद! हमारी टीम जल्द ही आपसे संपर्क करेगी।
              </p>
            )}
            {status === "done" && (
              <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                Thank you! Form submit ho gaya. Hamari team jald hi aapse contact karegi.
              </div>
            )}
            {status === "error" && <p className="mt-4 text-sm text-destructive">{error}</p>}
          </form>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold tracking-[0.16em] text-saffron uppercase">
            Last Updated: September 2026
          </p>
          <div className="mt-1">
            <LegalBody content={grievanceContent} />
          </div>
        </div>
      </Section>
    </>
  );
}
