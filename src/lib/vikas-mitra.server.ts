import { insertLocalRow, mergeRows, readLocalRows, updateLocalRow } from "@/lib/local-store.server";
import { supabaseInsert, supabaseSelect, supabaseUpdate } from "@/lib/supabase.server";

export type VikasMitraProfile = {
  id: string;
  name: string;
  phone: string;
  email?: string | undefined;
  district: string;
  tehsil: string;
  village: string;
  occupation?: string | undefined;
  experience?: string | undefined;
  message?: string | undefined;
  photo?: string | undefined;
  status: "pending" | "approved" | "rejected";
  rejectionMessage?: string | undefined;
  createdAt: string;
};

type VikasMitraRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  district: string;
  tehsil: string;
  village: string;
  occupation: string | null;
  experience: string | null;
  message: string | null;
  photo: string | null;
  status: "pending" | "approved" | "rejected";
  rejection_message: string | null;
  created_at: string;
};

function toProfile(row: VikasMitraRow): VikasMitraProfile {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    district: row.district,
    tehsil: row.tehsil,
    village: row.village,
    occupation: row.occupation ?? undefined,
    experience: row.experience ?? undefined,
    message: row.message ?? undefined,
    photo: row.photo ?? undefined,
    status: row.status,
    rejectionMessage: row.rejection_message ?? undefined,
    createdAt: row.created_at,
  };
}

export async function createVikasMitraProfile(
  input: Omit<VikasMitraProfile, "id" | "createdAt" | "status" | "rejectionMessage">,
): Promise<VikasMitraProfile> {
  try {
    const row = await supabaseInsert<VikasMitraRow>("vikas_mitra_profiles", {
      name: input.name,
      phone: input.phone,
      email: input.email || null,
      district: input.district,
      tehsil: input.tehsil,
      village: input.village,
      occupation: input.occupation || null,
      experience: input.experience || null,
      message: input.message || null,
      photo: input.photo || null,
      status: "pending",
    });

    return toProfile(row);
  } catch (error) {
    console.warn("[vikas-mitra] Supabase insert failed, using local fallback", error);
    return insertLocalRow<VikasMitraProfile>("vikas-mitra", {
      ...input,
      status: "pending",
      rejectionMessage: undefined,
    });
  }
}

export async function listVikasMitraProfiles(
  status?: VikasMitraProfile["status"],
): Promise<VikasMitraProfile[]> {
  const localRows = await readLocalRows<VikasMitraProfile>("vikas-mitra");
  const filteredLocalRows = status ? localRows.filter((row) => row.status === status) : localRows;

  try {
    const rows = await supabaseSelect<VikasMitraRow>("vikas_mitra_profiles", {
      select: "*",
      order: "created_at.desc",
      status: status ? `eq.${status}` : undefined,
    });
    return mergeRows(rows.map(toProfile), filteredLocalRows);
  } catch (error) {
    console.warn("[vikas-mitra] Supabase list failed, using local fallback", error);
    return filteredLocalRows;
  }
}

export async function updateVikasMitraProfile(
  id: string,
  input: {
    name?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    district?: string | undefined;
    tehsil?: string | undefined;
    village?: string | undefined;
    occupation?: string | undefined;
    experience?: string | undefined;
    message?: string | undefined;
    photo?: string | undefined;
    status?: VikasMitraProfile["status"] | undefined;
    rejectionMessage?: string | undefined;
  },
): Promise<VikasMitraProfile> {
  try {
    const row = await supabaseUpdate<VikasMitraRow>("vikas_mitra_profiles", id, {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.phone !== undefined ? { phone: input.phone } : {}),
      ...(input.email !== undefined ? { email: input.email || null } : {}),
      ...(input.district !== undefined ? { district: input.district } : {}),
      ...(input.tehsil !== undefined ? { tehsil: input.tehsil } : {}),
      ...(input.village !== undefined ? { village: input.village } : {}),
      ...(input.occupation !== undefined ? { occupation: input.occupation || null } : {}),
      ...(input.experience !== undefined ? { experience: input.experience || null } : {}),
      ...(input.message !== undefined ? { message: input.message || null } : {}),
      ...(input.photo !== undefined ? { photo: input.photo || null } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.rejectionMessage !== undefined
        ? { rejection_message: input.rejectionMessage || "Your Vikas Mitra profile has been rejected." }
        : {}),
    });
    return toProfile(row);
  } catch (error) {
    console.warn("[vikas-mitra] Supabase update failed, using local fallback", error);
    return updateLocalRow<VikasMitraProfile>("vikas-mitra", id, input);
  }
}
