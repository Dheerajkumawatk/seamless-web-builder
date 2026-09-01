const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] ?? "https://jphtwtafkoowwjkuobqa.supabase.co";
const serviceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
const publishableKey =
  process.env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"] ??
  "sb_publishable_v-fxvSmoojPPTHIlXPhYqQ_BAeHkPl0";
const supabaseKey =
  serviceRoleKey && serviceRoleKey !== "paste-your-service-role-key-here"
    ? serviceRoleKey
    : publishableKey;

type QueryValue = string | number | boolean;

function endpoint(table: string, query?: Record<string, QueryValue | undefined>) {
  const url = new URL(`/rest/v1/${table}`, supabaseUrl);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });
  return url;
}

async function request<T>(table: string, init: RequestInit, query?: Record<string, QueryValue | undefined>) {
  const response = await fetch(endpoint(table, query), {
    ...init,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...((init.headers ?? {}) as Record<string, string>),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase ${table} error: ${response.status} ${message}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function supabaseSelect<T>(
  table: string,
  query?: Record<string, QueryValue | undefined>,
): Promise<T[]> {
  return request<T[]>(table, { method: "GET" }, query);
}

export async function supabaseInsert<T>(table: string, input: Record<string, unknown>): Promise<T> {
  const rows = await request<T[]>(table, { method: "POST", body: JSON.stringify(input) });
  const row = rows[0];
  if (!row) {
    throw new Error(`Supabase ${table} insert returned no row`);
  }
  return row;
}

export async function supabaseUpdate<T>(
  table: string,
  id: string,
  input: Record<string, unknown>,
): Promise<T> {
  const rows = await request<T[]>(
    table,
    { method: "PATCH", body: JSON.stringify(input) },
    { id: `eq.${id}` },
  );
  const row = rows[0];
  if (!row) {
    throw new Error(`Supabase ${table} update returned no row`);
  }
  return row;
}
