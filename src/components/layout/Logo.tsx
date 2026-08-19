import { Flower2 } from "lucide-react";
import { site } from "@/data/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron/15 ring-1 ring-saffron/40">
        <Flower2 className="h-5 w-5 text-saffron" />
      </span>
      <span className="min-w-0">
        <span
          className={`block truncate font-display text-lg leading-tight font-bold ${
            light ? "text-maroon-foreground" : "text-maroon"
          }`}
        >
          {site.name}
        </span>
        <span
          className={`block truncate text-[10px] tracking-wide ${
            light ? "text-maroon-foreground/70" : "text-muted-foreground"
          }`}
        >
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
