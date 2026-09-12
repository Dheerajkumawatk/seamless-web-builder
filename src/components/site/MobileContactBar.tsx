import { MessageCircle, MonitorSmartphone, Phone } from "lucide-react";
import { site } from "@/data/site";

export function MobileContactBar({ message }: { message: string }) {
  const whatsappHref = `${site.whatsappUrl}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/20 bg-[#0a1526] px-3 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(0,0,0,.22)] md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a
          href={`tel:${site.phone}`}
          className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-lg bg-white px-2 text-xs font-black text-[#0e2f5e]"
        >
          <Phone className="h-4 w-4" />
          कॉल करें
        </a>
        <a
          href="/#demo-form"
          className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-lg bg-[#0e2f5e] px-2 text-xs font-black text-white ring-1 ring-white/15"
        >
          <MonitorSmartphone className="h-4 w-4" />
          डेमो
        </a>
        <a
          href={whatsappHref}
          className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-lg bg-[#159a56] px-2 text-xs font-black text-white"
        >
          <MessageCircle className="h-4 w-4" />
          पूछताछ
        </a>
      </div>
    </div>
  );
}
