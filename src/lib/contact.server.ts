/**
 * Backend layer (server-only).
 * Yahan business logic rehta hai — routes/components isse seedha import nahi karte.
 * Baad me isse database (Lovable Cloud / Mongo-style collection) se jodna aasan hai.
 */

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  post: string;
  state?: string;
  message?: string;
  createdAt: string;
};

const leads: Lead[] = [];

export async function createLead(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  leads.push(lead);
  console.log("[lead] new enquiry", { id: lead.id, post: lead.post });
  return lead;
}

export async function listLeads(): Promise<Lead[]> {
  return [...leads].reverse();
}
