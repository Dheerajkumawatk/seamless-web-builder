import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MapPin, Phone, Mail, Globe, Send, Loader2, CheckCircle2 } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { site } from "@/data/site";
import { submitEnquiry } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "संपर्क करें — फ्री कंसल्टेशन बुक करें | भारत पहचान" },
      {
        name: "description",
        content:
          "अपने चुनाव अभियान के लिए फ्री कंसल्टेशन बुक करें। कॉल, ईमेल या फ़ॉर्म भरकर हमसे जुड़ें।",
      },
      { property: "og:title", content: "संपर्क करें — भारत पहचान" },
      { property: "og:description", content: "फ्री कंसल्टेशन बुक करें और अभियान शुरू करें।" },
    ],
  }),
  component: Contact,
});

const posts = [
  "सरपंच",
  "पंचायत समिति सदस्य",
  "जिला परिषद सदस्य",
  "स्वतंत्र उम्मीदवार",
  "अन्य",
];

function Contact() {
  const send = useServerFn(submitEnquiry);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("loading");
    setError("");
    try {
      await send({
        data: {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          email: String(fd.get("email") ?? ""),
          post: String(fd.get("post") ?? ""),
          state: String(fd.get("state") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      setStatus("done");
      e.currentTarget.reset();
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
        sub="फ्री कंसल्टेशन के लिए फ़ॉर्म भरें — हमारी टीम 24 घंटे के भीतर संपर्क करेगी।"
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
            <h2 className="text-lg text-maroon">फ्री कंसल्टेशन फ़ॉर्म</h2>
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
                    <option key={p} value={p}>
                      {p}
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
            {status === "error" && <p className="mt-4 text-sm text-destructive">{error}</p>}
          </form>
        </div>
      </Section>
    </>
  );
}
