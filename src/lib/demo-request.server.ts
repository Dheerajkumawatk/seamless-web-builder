import { getDemoRequestModel, type DemoRequest } from "@/lib/models/demo-request.server";

export type DemoLead = {
  id: string;
  name: string;
  phone: string;
  village?: string | undefined;
  district?: string | undefined;
  post?: string | undefined;
  source?: string | undefined;
  pageUrl?: string | undefined;
  utmSource?: string | undefined;
  utmMedium?: string | undefined;
  utmCampaign?: string | undefined;
  status: string;
  notes?: string | undefined;
  createdAt: string;
};

type DemoLeadUpdate = {
  name?: string | undefined;
  phone?: string | undefined;
  village?: string | undefined;
  district?: string | undefined;
  post?: string | undefined;
  source?: string | undefined;
  pageUrl?: string | undefined;
  utmSource?: string | undefined;
  utmMedium?: string | undefined;
  utmCampaign?: string | undefined;
  status?: string | undefined;
  notes?: string | undefined;
};

function toDemoLead(row: DemoRequest): DemoLead {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    village: row.village ?? undefined,
    district: row.district ?? undefined,
    post: row.post ?? undefined,
    source: row.source ?? undefined,
    pageUrl: row.pageUrl ?? undefined,
    utmSource: row.utmSource ?? undefined,
    utmMedium: row.utmMedium ?? undefined,
    utmCampaign: row.utmCampaign ?? undefined,
    status: row.status,
    notes: row.notes ?? undefined,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function createDemoLead(
  input: Omit<DemoLead, "id" | "createdAt" | "status"> & { status?: string },
): Promise<DemoLead> {
  const Model = await getDemoRequestModel();
  const row = await Model.create({
    name: input.name,
    phone: input.phone,
    village: input.village || null,
    district: input.district || null,
    post: input.post || null,
    source: input.source || "BharatPahchan Website",
    pageUrl: input.pageUrl || null,
    utmSource: input.utmSource || null,
    utmMedium: input.utmMedium || null,
    utmCampaign: input.utmCampaign || null,
    status: input.status || "NEW",
    notes: input.notes || null,
  });

  return toDemoLead(row);
}

export async function listDemoLeads(): Promise<DemoLead[]> {
  const Model = await getDemoRequestModel();
  const rows = await Model.findAll({ order: [["created_at", "DESC"]] });
  return rows.map(toDemoLead);
}

export async function getDemoLead(id: string): Promise<DemoLead | null> {
  const Model = await getDemoRequestModel();
  const row = await Model.findByPk(id);
  return row ? toDemoLead(row) : null;
}

export async function updateDemoLead(id: string, input: DemoLeadUpdate): Promise<DemoLead> {
  const Model = await getDemoRequestModel();
  const row = await Model.findByPk(id);
  if (!row) {
    throw new Error(`Demo request ${id} not found`);
  }

  row.set({
    ...(input.name !== undefined ? { name: input.name } : {}),
    ...(input.phone !== undefined ? { phone: input.phone } : {}),
    ...(input.village !== undefined ? { village: input.village || null } : {}),
    ...(input.district !== undefined ? { district: input.district || null } : {}),
    ...(input.post !== undefined ? { post: input.post || null } : {}),
    ...(input.source !== undefined ? { source: input.source || null } : {}),
    ...(input.pageUrl !== undefined ? { pageUrl: input.pageUrl || null } : {}),
    ...(input.utmSource !== undefined ? { utmSource: input.utmSource || null } : {}),
    ...(input.utmMedium !== undefined ? { utmMedium: input.utmMedium || null } : {}),
    ...(input.utmCampaign !== undefined ? { utmCampaign: input.utmCampaign || null } : {}),
    ...(input.status !== undefined ? { status: input.status || "NEW" } : {}),
    ...(input.notes !== undefined ? { notes: input.notes || null } : {}),
  });
  await row.save();

  return toDemoLead(row);
}

export async function deleteDemoLead(id: string): Promise<void> {
  const Model = await getDemoRequestModel();
  const deleted = await Model.destroy({ where: { id } });
  if (!deleted) {
    throw new Error(`Demo request ${id} not found`);
  }
}
