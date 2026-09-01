import { insertLocalRow, mergeRows, readLocalRows, updateLocalRow } from "@/lib/local-store.server";
import { supabaseInsert, supabaseSelect, supabaseUpdate } from "@/lib/supabase.server";

export type PlanQuery = {
  id: string;
  packageName: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  createdAt: string;
};

type PlanQueryRow = {
  id: string;
  package_name: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  created_at: string;
};

function toPlanQuery(row: PlanQueryRow): PlanQuery {
  return {
    id: row.id,
    packageName: row.package_name,
    name: row.name,
    phone: row.phone,
    email: row.email,
    city: row.city,
    state: row.state,
    pincode: row.pincode,
    createdAt: row.created_at,
  };
}

export async function createPlanQuery(
  input: Omit<PlanQuery, "id" | "createdAt">,
): Promise<PlanQuery> {
  try {
    const row = await supabaseInsert<PlanQueryRow>("plan_queries", {
      package_name: input.packageName,
      name: input.name,
      phone: input.phone,
      email: input.email,
      city: input.city,
      state: input.state,
      pincode: input.pincode,
    });
    return toPlanQuery(row);
  } catch (error) {
    console.warn("[plan-query] Supabase insert failed, using local fallback", error);
    return insertLocalRow<PlanQuery>("plan-queries", input);
  }
}

export async function listPlanQueries(): Promise<PlanQuery[]> {
  const localRows = await readLocalRows<PlanQuery>("plan-queries");
  try {
    const rows = await supabaseSelect<PlanQueryRow>("plan_queries", {
      select: "*",
      order: "created_at.desc",
    });
    return mergeRows(rows.map(toPlanQuery), localRows);
  } catch (error) {
    console.warn("[plan-query] Supabase list failed, using local fallback", error);
    return localRows;
  }
}

export async function updatePlanQuery(
  id: string,
  input: {
    packageName?: string | undefined;
    name?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    pincode?: string | undefined;
  },
) {
  try {
    const row = await supabaseUpdate<PlanQueryRow>("plan_queries", id, {
      ...(input.packageName !== undefined ? { package_name: input.packageName } : {}),
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.phone !== undefined ? { phone: input.phone } : {}),
      ...(input.email !== undefined ? { email: input.email } : {}),
      ...(input.city !== undefined ? { city: input.city } : {}),
      ...(input.state !== undefined ? { state: input.state } : {}),
      ...(input.pincode !== undefined ? { pincode: input.pincode } : {}),
    });
    return toPlanQuery(row);
  } catch (error) {
    console.warn("[plan-query] Supabase update failed, using local fallback", error);
    return updateLocalRow<PlanQuery>("plan-queries", id, input);
  }
}
