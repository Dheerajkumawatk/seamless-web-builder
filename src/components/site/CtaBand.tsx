import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="bg-maroon">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-center md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:text-left">
        <div className="min-w-0">
          <h2 className="font-display text-xl text-maroon-foreground sm:text-2xl">
            अपने अभियान को डिजिटल सफलता दें
          </h2>
          <p className="mt-2 text-sm text-maroon-foreground/75">
            आज ही फ्री कंसल्टेशन बुक करें और अपने चुनाव अभियान को नई पहचान दें।
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 justify-self-center rounded-md bg-saffron px-6 py-3 text-sm font-semibold text-saffron-foreground shadow-soft transition-transform hover:scale-[1.03] md:justify-self-end"
        >
          फ्री कंसल्टेशन बुक करें <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
