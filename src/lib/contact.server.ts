import { getContactLeadModel, type ContactLead } from "@/lib/models/contact-lead.server";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string | undefined;
  post: string;
  source?: string | undefined;
  state?: string | undefined;
  city?: string | undefined;
  message?: string | undefined;
  createdAt: string;
};

function toLead(row: ContactLead): Lead {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    post: row.post,
    source: row.source ?? undefined,
    state: row.state ?? undefined,
    city: row.city ?? undefined,
    message: row.message ?? undefined,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function createLead(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const Model = await getContactLeadModel();
  const row = await Model.create({
    name: input.name,
    phone: input.phone,
    email: input.email || null,
    post: input.post,
    source: input.source || null,
    state: input.state || null,
    city: input.city || null,
    message: input.message || null,
  });
  return toLead(row);
}

export async function listLeads(): Promise<Lead[]> {
  const Model = await getContactLeadModel();
  const rows = await Model.findAll({ order: [["created_at", "DESC"]] });
  return rows.map(toLead);
}

export async function updateLead(
  id: string,
  input: {
    name?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    post?: string | undefined;
    source?: string | undefined;
    state?: string | undefined;
    city?: string | undefined;
    message?: string | undefined;
  },
): Promise<Lead> {
  const Model = await getContactLeadModel();
  const row = await Model.findByPk(id);
  if (!row) {
    throw new Error(`Lead ${id} not found`);
  }

  row.set({
    ...(input.name !== undefined ? { name: input.name } : {}),
    ...(input.phone !== undefined ? { phone: input.phone } : {}),
    ...(input.email !== undefined ? { email: input.email || null } : {}),
    ...(input.post !== undefined ? { post: input.post } : {}),
    ...(input.source !== undefined ? { source: input.source || null } : {}),
    ...(input.state !== undefined ? { state: input.state || null } : {}),
    ...(input.city !== undefined ? { city: input.city || null } : {}),
    ...(input.message !== undefined ? { message: input.message || null } : {}),
  });
  await row.save();

  return toLead(row);
}

export async function deleteLead(id: string): Promise<void> {
  const Model = await getContactLeadModel();
  const deleted = await Model.destroy({ where: { id } });
  if (!deleted) {
    throw new Error(`Lead ${id} not found`);
  }
}
