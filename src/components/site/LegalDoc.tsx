import type { ReactNode } from "react";
import { PageHero, Section } from "@/components/site/Section";

function formatInline(text: string): ReactNode[] {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter((segment) => segment !== "")
    .map((segment, index) => {
      if (segment.length > 2 && segment.startsWith("*") && segment.endsWith("*")) {
        return (
          <strong key={index} className="font-bold text-maroon">
            {segment.slice(1, -1)}
          </strong>
        );
      }
      return <span key={index}>{segment}</span>;
    });
}

type LegalDocProps = {
  title: string;
  summary: string;
  lastUpdated: string;
  content: string;
};

export function LegalBody({ content }: { content: string }): ReactNode {
  const lines = content.replace(/\r\n/g, "\n").trim().split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const lineBuffer = [...paragraph];
    blocks.push(
      <p
        key={`p-${blocks.length}`}
        className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        {lineBuffer.map((line, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {formatInline(line)}
          </span>
        ))}
      </p>,
    );
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    const itemBuffer = [...listItems];
    blocks.push(
      <ul
        key={`ul-${blocks.length}`}
        className="mt-4 list-disc space-y-1.5 pl-6 text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        {itemBuffer.map((item, index) => (
          <li key={index}>{formatInline(item)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (line === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h3
          key={`h3-${blocks.length}`}
          className="mt-8 rounded-md border-l-4 border-saffron bg-cream px-4 py-3 font-display text-base font-bold text-maroon sm:text-lg"
        >
          {formatInline(line.slice(4))}
        </h3>,
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(
        <h2
          key={`h2-${blocks.length}`}
          className="mt-10 font-display text-xl font-bold text-maroon sm:text-2xl"
        >
          {formatInline(line.slice(3))}
        </h2>,
      );
      continue;
    }

    if (line.startsWith("* ") || line.startsWith("- ")) {
      flushParagraph();
      listItems.push(line.slice(2));
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return <>{blocks}</>;
}

export function LegalDoc({ title, summary, lastUpdated, content }: LegalDocProps) {
  return (
    <>
      <PageHero title={title} sub={summary} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold tracking-[0.16em] text-saffron uppercase">
            {lastUpdated}
          </p>
          <div className="mt-1">
            <LegalBody content={content} />
          </div>
        </div>
      </Section>
    </>
  );
}
