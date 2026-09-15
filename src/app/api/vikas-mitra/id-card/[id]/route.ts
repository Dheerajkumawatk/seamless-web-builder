import { NextResponse } from "next/server";
import { getVikasMitraProfileById } from "@/lib/vikas-mitra.server";
import { generateVikasMitraCardPdf } from "@/lib/vikas-mitra-card.server";
import { formatVikasMitraId } from "@/lib/profile-id";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const profile = await getVikasMitraProfileById((await params).id);
  if (!profile || profile.status !== "approved") {
    return NextResponse.json({ error: "ID card नहीं मिला" }, { status: 404 });
  }

  const pdf = await generateVikasMitraCardPdf(profile);
  const filename = `Vikas-Mitra-${formatVikasMitraId(profile.id, profile.createdAt)}.pdf`;
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
