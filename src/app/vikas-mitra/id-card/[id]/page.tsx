import { notFound } from "next/navigation";
import { VikasMitraIdCardPrint } from "@/components/site/VikasMitraIdCardPrint";
import { formatVikasMitraId } from "@/lib/profile-id";
import { getVikasMitraProfileById } from "@/lib/vikas-mitra.server";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function VikasMitraIdCardPage({ params }: PageProps) {
  const { id } = await params;
  const profile = await getVikasMitraProfileById(id);

  if (!profile || profile.status !== "approved") {
    notFound();
  }

  const createdAt = new Date(profile.createdAt);
  const validUntil = new Date(createdAt);
  validUntil.setFullYear(validUntil.getFullYear() + 1);

  return (
    <VikasMitraIdCardPrint
      profile={{
        idNumber: formatVikasMitraId(profile.id, profile.createdAt),
        name: profile.name,
        phone: profile.phone,
        district: profile.district,
        tehsil: profile.tehsil,
        photo: profile.photo,
        issueDate: formatCardDate(createdAt),
        validUntil: formatCardDate(validUntil),
      }}
    />
  );
}

function formatCardDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
