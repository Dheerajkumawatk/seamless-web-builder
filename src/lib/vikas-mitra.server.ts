import {
  getVikasMitraProfileModel,
  type VikasMitraProfileModel,
} from "@/lib/models/vikas-mitra-profile.server";

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
  panCard?: string | undefined;
  aadhaarCard?: string | undefined;
  status: "pending" | "approved" | "rejected";
  rejectionMessage?: string | undefined;
  createdAt: string;
};

function toProfile(row: VikasMitraProfileModel): VikasMitraProfile {
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
    panCard: row.panCard ?? undefined,
    aadhaarCard: row.aadhaarCard ?? undefined,
    status: row.status,
    rejectionMessage: row.rejectionMessage ?? undefined,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function createVikasMitraProfile(
  input: Omit<VikasMitraProfile, "id" | "createdAt" | "status" | "rejectionMessage">,
): Promise<VikasMitraProfile> {
  const Model = await getVikasMitraProfileModel();
  const row = await Model.create({
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
    panCard: input.panCard || null,
    aadhaarCard: input.aadhaarCard || null,
    status: "pending",
    rejectionMessage: null,
  });

  return toProfile(row);
}

export async function listVikasMitraProfiles(
  status?: VikasMitraProfile["status"],
): Promise<VikasMitraProfile[]> {
  const Model = await getVikasMitraProfileModel();
  const rows = await Model.findAll(
    status
      ? { where: { status }, order: [["created_at", "DESC"]] }
      : { order: [["created_at", "DESC"]] },
  );
  return rows.map(toProfile);
}

export async function getVikasMitraProfileById(id: string): Promise<VikasMitraProfile | null> {
  const Model = await getVikasMitraProfileModel();
  const row = await Model.findByPk(id);
  return row ? toProfile(row) : null;
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
    panCard?: string | undefined;
    aadhaarCard?: string | undefined;
    status?: VikasMitraProfile["status"] | undefined;
    rejectionMessage?: string | undefined;
  },
): Promise<VikasMitraProfile> {
  const Model = await getVikasMitraProfileModel();
  const row = await Model.findByPk(id);
  if (!row) {
    throw new Error(`Vikas Mitra profile ${id} not found`);
  }

  row.set({
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
    ...(input.panCard !== undefined ? { panCard: input.panCard || null } : {}),
    ...(input.aadhaarCard !== undefined ? { aadhaarCard: input.aadhaarCard || null } : {}),
    ...(input.status !== undefined ? { status: input.status } : {}),
    ...(input.rejectionMessage !== undefined
      ? {
          rejectionMessage: input.rejectionMessage || "Your Vikas Mitra profile has been rejected.",
        }
      : {}),
  });
  await row.save();
  return toProfile(row);
}

export async function deleteVikasMitraProfile(id: string): Promise<void> {
  const Model = await getVikasMitraProfileModel();
  const deleted = await Model.destroy({ where: { id } });
  if (!deleted) {
    throw new Error(`Vikas Mitra profile ${id} not found`);
  }
}
