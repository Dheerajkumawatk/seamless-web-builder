import { insertLocalRow, mergeRows, readLocalRows, updateLocalRow } from "@/lib/local-store.server";
import { supabaseInsert, supabaseSelect, supabaseUpdate } from "@/lib/supabase.server";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string | undefined;
  post: string;
  state?: string | undefined;
  message?: string | undefined;
  createdAt: string;
};

type LeadRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  post: string;
  state: string | null;
  message: string | null;
  created_at: string;
};

function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    post: row.post,
    state: row.state ?? undefined,
    message: row.message ?? undefined,
    createdAt: row.created_at,
  };
}

export async function createLead(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  try {
    const row = await supabaseInsert<LeadRow>("contact_leads", {
      name: input.name,
      phone: input.phone,
      email: input.email || null,
      post: input.post,
      state: input.state || null,
      message: input.message || null,
    });
    return toLead(row);
  } catch (error) {
    console.warn("[contact] Supabase insert failed, using local fallback", error);
    return insertLocalRow<Lead>("contact-leads", input);
  }
}

export async function listLeads(): Promise<Lead[]> {
  const localRows = await readLocalRows<Lead>("contact-leads");
  try {
    const rows = await supabaseSelect<LeadRow>("contact_leads", {
      select: "*",
      order: "created_at.desc",
    });
    return mergeRows(rows.map(toLead), localRows);
  } catch (error) {
    console.warn("[contact] Supabase list failed, using local fallback", error);
    return localRows;
  }
}

export async function updateLead(
  id: string,
  input: {
    name?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    post?: string | undefined;
    state?: string | undefined;
    message?: string | undefined;
  },
) {
  try {
    const row = await supabaseUpdate<LeadRow>("contact_leads", id, {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.phone !== undefined ? { phone: input.phone } : {}),
      ...(input.email !== undefined ? { email: input.email || null } : {}),
      ...(input.post !== undefined ? { post: input.post } : {}),
      ...(input.state !== undefined ? { state: input.state || null } : {}),
      ...(input.message !== undefined ? { message: input.message || null } : {}),
    });
    return toLead(row);
  } catch (error) {
    console.warn("[contact] Supabase update failed, using local fallback", error);
    return updateLocalRow<Lead>("contact-leads", id, input);
  }
}
