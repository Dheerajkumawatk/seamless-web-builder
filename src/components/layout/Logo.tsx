import logoImage from "@/assets/bharat-pahchan-logo.jpg";

export function Logo({
  light = false,
  size = "nav",
}: {
  light?: boolean;
  size?: "nav" | "compact" | "footer";
}) {
  void light;

  const dimensions = {
    compact: "h-12 w-12",
    footer: "h-24 w-24",
    nav: "h-16 w-16 sm:h-20 sm:w-20",
  }[size];

  return (
    <img
      src={logoImage.src}
      width={1254}
      height={1254}
      alt="भारत पहचान"
      className={`block shrink-0 rounded-lg object-contain ${dimensions}`}
    />
  );
}
