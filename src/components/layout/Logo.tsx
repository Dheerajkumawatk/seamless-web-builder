import logoImage from "@/assets/bharat-pahchan-logo.png";

export function Logo({
  light = false,
  size = "nav",
}: {
  light?: boolean;
  size?: "nav" | "compact" | "footer";
}) {
  void light;

  const dimensions = {
    compact: "h-11 max-w-[160px]",
    footer: "h-[72px] max-w-[360px]",
    nav: "h-[74px] max-w-[340px]",
  }[size];

  return (
    <img
      src={logoImage.src}
      width={2200}
      height={650}
      alt="भारत पहचान"
      className={`block w-auto shrink-0 object-contain object-left ${dimensions}`}
    />
  );
}
