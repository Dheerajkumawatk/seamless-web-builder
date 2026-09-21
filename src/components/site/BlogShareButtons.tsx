"use client";

import { useState } from "react";
import { Check, Facebook, Link2, MessageCircle, Share2 } from "lucide-react";

export function BlogShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function nativeShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (
          navigator as Navigator & { share: (d: { title: string; url: string }) => Promise<void> }
        ).share({
          title,
          url,
        });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    copyLink();
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const btn =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-maroon shadow-sm transition hover:-translate-y-0.5 hover:border-saffron hover:text-saffron";

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="व्हाट्सएप पर शेयर करें"
        title="व्हाट्सएप पर शेयर करें"
        className={btn}
      >
        <MessageCircle className="h-4 w-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="फेसबुक पर शेयर करें"
        title="फेसबुक पर शेयर करें"
        className={btn}
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X पर शेयर करें"
        title="X पर शेयर करें"
        className={btn}
      >
        <Share2 className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label="लिंक कॉपी करें"
        title="लिंक कॉपी करें"
        className={btn}
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
      </button>
      <button
        type="button"
        onClick={nativeShare}
        className="ml-1 hidden rounded-full bg-maroon px-4 py-2 text-xs font-extrabold text-white transition hover:bg-saffron sm:inline-flex"
      >
        शेयर करें
      </button>
      {copied && <span className="text-xs font-bold text-green-700">लिंक कॉपी हो गया!</span>}
    </div>
  );
}
