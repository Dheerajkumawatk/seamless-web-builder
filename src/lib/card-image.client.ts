import { toCanvas } from "html-to-image";

const fontStyles = new Map<string, Promise<string>>();

async function embedFontStyles(css: string, baseUrl: string): Promise<string> {
  const faces = css.match(/@font-face\s*\{[^}]*\}/g) ?? [];
  return (
    await Promise.all(
      faces.map(async (face) => {
        for (const match of face.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
          const url = new URL(match[1]!.trim(), baseUrl).href;
          if (url.startsWith("data:")) continue;
          const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
          if (!response.ok) throw new Error("Card font could not be loaded");
          const blob = await response.blob();
          const data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(new Error("Card font could not be read"));
            reader.readAsDataURL(blob);
          });
          face = face.replace(match[0], `url("${data}")`);
        }
        return face;
      }),
    )
  ).join("\n");
}

async function cardFontCss(): Promise<string> {
  const styles = await Promise.all(
    Array.from(document.styleSheets).map(async (sheet) => {
      const baseUrl = sheet.href || document.baseURI;
      if (sheet.href && new URL(sheet.href).origin !== window.location.origin) {
        // Cross-origin CSSOM access is forbidden, even when fetch is allowed by CORS.
        // Read the stylesheet as text and embed its font files ourselves.
        let pending = fontStyles.get(sheet.href);
        if (!pending) {
          pending = (async () => {
            const response = await fetch(baseUrl, { signal: AbortSignal.timeout(15_000) });
            if (!response.ok) throw new Error("Card font stylesheet could not be loaded");
            return embedFontStyles(await response.text(), baseUrl);
          })();
          fontStyles.set(sheet.href, pending);
          pending.catch(() => fontStyles.delete(baseUrl));
        }
        return pending;
      }
      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch (e) {
        console.error("Could not read cssRules from stylesheet", sheet.href, e);
        return "";
      }
      const css = Array.from(rules)
        .map((rule) => rule.cssText)
        .join("\n");
      return embedFontStyles(css, baseUrl);
    }),
  );
  return styles.filter(Boolean).join("\n");
}

async function cardCanvas(card: HTMLElement): Promise<HTMLCanvasElement> {
  await document.fonts.ready;
  const layout = card.cloneNode(true) as HTMLElement;
  // Keep the visible desktop dimensions; use that same layout on small screens.
  const width =
    getComputedStyle(card).flexDirection === "row" ? card.getBoundingClientRect().width : 976;
  Object.assign(layout.style, {
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: `${width}px`,
    maxWidth: "none",
    flexDirection: "row",
    boxShadow: "none",
    pointerEvents: "none",
  });
  layout.setAttribute("aria-hidden", "true");
  card.parentElement!.appendChild(layout);
  try {
    await Promise.all(Array.from(layout.querySelectorAll("img")).map((img) => img.decode()));
    return await toCanvas(layout, {
      // Bypass html-to-image's stylesheet scanner without dropping the fonts.
      fontEmbedCSS: await cardFontCss(),
      skipFonts: true,
      backgroundColor: "#ffffff",
      pixelRatio: 2,
      style: { position: "static", left: "auto", top: "auto", margin: "0" },
    });
  } finally {
    layout.remove();
  }
}

export async function cardImageBlob(card: HTMLElement): Promise<Blob> {
  const canvas = await cardCanvas(card);
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("PNG export failed"))),
      "image/png",
    );
  });
}

export async function cardPdfBlob(card: HTMLElement): Promise<Blob> {
  const [canvas, { jsPDF }] = await Promise.all([cardCanvas(card), import("jspdf")]);
  const width = canvas.width / 2;
  const height = canvas.height / 2;
  const pdf = new jsPDF({
    orientation: width >= height ? "landscape" : "portrait",
    unit: "px",
    format: [width, height],
    hotfixes: ["px_scaling"],
    compress: true,
  });
  // Embed the actual preview, so Hindi/English fonts, photos and spacing match.
  pdf.addImage(canvas, "PNG", 0, 0, width, height);
  return pdf.output("blob");
}
