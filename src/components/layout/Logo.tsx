import { site } from "@/data/site";

<<<<<<< Updated upstream
export function Logo({ light = false }: { light?: boolean }) {
  const [first, ...rest] = site.name.split(" ");
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="h-10 w-10 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* lotus petals */}
        <path d="M24 6c3 5 4 9 4 13s-1 6-4 8c-3-2-4-4-4-8s1-8 4-13z" fill="var(--saffron)" />
        <path
          d="M13 12c4 3 6 6 7 10s0 6-2 8c-3-1-5-3-6-7s0-7 1-11z"
          fill="var(--saffron)"
          opacity=".85"
        />
        <path
          d="M35 12c-4 3-6 6-7 10s0 6 2 8c3-1 5-3 6-7s0-7-1-11z"
          fill="var(--saffron)"
          opacity=".85"
        />
        <path d="M6 21c5 1 8 3 10 6s2 6 1 8c-4 0-7-2-9-6s-2-6-2-8z" fill="var(--saffron)" opacity=".7" />
        <path
          d="M42 21c-5 1-8 3-10 6s-2 6-1 8c4 0 7-2 9-6s2-6 2-8z"
          fill="var(--saffron)"
          opacity=".7"
        />
        {/* leaves */}
        <path d="M24 44c-6-1-10-4-12-8 6-1 10 1 12 4 2-3 6-5 12-4-2 4-6 7-12 8z" fill="oklch(0.5 0.13 150)" />
      </svg>
      <span className="min-w-0 leading-none">
        <span className="block truncate font-display text-xl font-bold sm:text-2xl">
          <span className="text-saffron">{first}</span>{" "}
          <span className={light ? "text-maroon-foreground" : "text-maroon"}>{rest.join(" ")}</span>
        </span>
        <span
          className={`mt-1 block truncate text-[10px] tracking-wide ${
            light ? "text-maroon-foreground/70" : "text-muted-foreground"
          }`}
=======
export function Logo({
  light = false,
  size = "nav",
}: {
  light?: boolean;
  size?: "nav" | "compact" | "footer";
}) {
  const isCompact = size === "compact";
  const isFooter = size === "footer";

  return (
    <span className="flex min-w-0 items-center gap-3">
      <span
        className={`grid shrink-0 place-items-center ${
          isCompact ? "h-10 w-10" : isFooter ? "h-[50px] w-[50px]" : "h-[58px] w-[58px]"
        }`}
      >
        <Flower2
          className={`${
            isCompact ? "h-8 w-8" : isFooter ? "h-11 w-11" : "h-12 w-12"
          } fill-[#f36b12]/20 text-[#f36b12] stroke-[2.2]`}
        />
      </span>
      <span className="min-w-0">
        <span
          className={`block truncate font-display leading-[0.95] font-black ${
            isCompact ? "text-lg" : isFooter ? "text-[30px]" : "text-[34px]"
          } ${light ? "text-maroon-foreground" : "text-maroon"}`}
        >
          <span className="text-[#f36b12]">भारत</span>{" "}
          <span className={light ? "text-maroon-foreground" : "text-[#252525]"}>पहचान</span>
        </span>
        <span
          className={`mt-1 block truncate font-bold tracking-normal ${
            isCompact ? "text-[10px]" : isFooter ? "text-[12px]" : "text-[13px]"
          } ${light ? "text-maroon-foreground/70" : "text-[#66524a]"}`}
>>>>>>> Stashed changes
        >
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
