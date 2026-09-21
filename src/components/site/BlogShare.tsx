"use client";

import { useEffect, useState } from "react";
import { Check, Facebook, Link2, MessageCircle, Share2, Twitter } from "lucide-react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, Math.max(0, (el.scrollTop / total) * 100)) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#e55c24] via-[#ff8a3d] to-[#168454] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function BlogShare({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(path);

  useEffect(() => {
    setUrl(new URL(path, window.location.origin).href);
  }, [path]);

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        copyWithTextarea(url);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        copyWithTextarea(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    }
  }

  async function shareNative() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: title, url });
        return;
      } catch {
        return;
      }
    }

    await copy();
  }

  const text = encodeURIComponent(title);
  const link = encodeURIComponent(url);

  const buttons = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${text}%20${link}`,
      icon: MessageCircle,
      cls: "hover:border-[#25d366] hover:text-[#15803d]",
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${text}&url=${link}`,
      icon: Twitter,
      cls: "hover:border-maroon hover:text-maroon",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      icon: Facebook,
      cls: "hover:border-[#1877f2] hover:text-[#1877f2]",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={shareNative}
        className="mr-1 inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest text-muted-foreground uppercase transition hover:text-maroon"
      >
        <Share2 className="h-3.5 w-3.5" /> साझा करें
      </button>
      {buttons.map((b) => (
        <a
          key={b.label}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} ${b.label} पर साझा करें`}
          className={`grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-muted-foreground shadow-sm transition hover:-translate-y-0.5 ${b.cls}`}
        >
          <b.icon className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-extrabold shadow-sm transition hover:-translate-y-0.5 ${
          copied
            ? "border-[#168454] bg-[#168454] text-white"
            : "border-border bg-white text-maroon hover:border-saffron hover:text-saffron"
        }`}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? "कॉपी हुआ!" : "लिंक कॉपी करें"}
      </button>
    </div>
  );
}

function copyWithTextarea(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
