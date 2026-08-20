import { site } from "@/data/site";

export function Logo({
  light = false,
  size = "nav",
}: {
  light?: boolean;
  size?: "nav" | "compact" | "footer";
}) {
  const isCompact = size === "compact";
  const isFooter = size === "footer";
  const markSize = isCompact ? "h-10 w-10" : isFooter ? "h-[50px] w-[50px]" : "h-[58px] w-[58px]";
  const lotusSize = isCompact ? "h-9 w-9" : isFooter ? "h-11 w-11" : "h-13 w-13";
  const titleSize = isCompact ? "text-lg" : isFooter ? "text-[30px]" : "text-[34px]";
  const taglineSize = isCompact ? "text-[10px]" : isFooter ? "text-[12px]" : "text-[13px]";

  return (
    <span className="flex min-w-0 items-center gap-3">
      <span className={`grid shrink-0 place-items-center ${markSize}`}>
        <svg
          viewBox="0 0 64 64"
          aria-hidden="true"
          className={`${lotusSize} shrink-0`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 7c4.6 6.8 6.3 12.4 5.3 18-1 5.4-3.2 9.2-5.3 11-2.1-1.8-4.4-5.6-5.3-11-1-5.6.7-11.2 5.3-18z"
            fill="#f36b12"
          />
          <path
            d="M18.5 14.5c7 3.8 11.1 8.2 12.2 13.8 1.1 5.3-.3 9.5-2 11.8-3-1-6.3-3.7-8.3-8.9-2-5.3-2.2-10.8-1.9-16.7z"
            fill="#f36b12"
            opacity=".86"
          />
          <path
            d="M45.5 14.5c-7 3.8-11.1 8.2-12.2 13.8-1.1 5.3.3 9.5 2 11.8 3-1 6.3-3.7 8.3-8.9 2-5.3 2.2-10.8 1.9-16.7z"
            fill="#f36b12"
            opacity=".86"
          />
          <path
            d="M7.5 28.5c8.1 1.2 13.7 4 16.7 8.8 2.9 4.5 3.4 8.9 2.5 11.5-3.2.3-7.5-1-11.7-4.8-4.1-3.8-6.3-8.8-7.5-15.5z"
            fill="#f36b12"
            opacity=".72"
          />
          <path
            d="M56.5 28.5c-8.1 1.2-13.7 4-16.7 8.8-2.9 4.5-3.4 8.9-2.5 11.5 3.2.3 7.5-1 11.7-4.8 4.1-3.8 6.3-8.8 7.5-15.5z"
            fill="#f36b12"
            opacity=".72"
          />
          <path
            d="M32 58c-8.4-1.1-14.5-4.7-18.3-10.9 8.3-.7 14.4 1.6 18.3 6.7 3.9-5.1 10-7.4 18.3-6.7C46.5 53.3 40.4 56.9 32 58z"
            fill="#138244"
          />
          <path d="M32 57.5V37" stroke="#138244" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="min-w-0">
        <span className={`block truncate font-display leading-[0.95] font-black ${titleSize}`}>
          <span className="text-[#f36b12]">भारत</span>{" "}
          <span className={light ? "text-maroon-foreground" : "text-[#252525]"}>पहचान</span>
        </span>
        <span
          className={`mt-1 block truncate font-bold tracking-normal ${taglineSize} ${
            light ? "text-maroon-foreground/70" : "text-[#66524a]"
          }`}
        >
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
