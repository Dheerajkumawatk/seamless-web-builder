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
  createdAt: string;
};

const profiles: VikasMitraProfile[] = [];

export async function createVikasMitraProfile(
  input: Omit<VikasMitraProfile, "id" | "createdAt">,
): Promise<VikasMitraProfile> {
  const profile: VikasMitraProfile = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  profiles.unshift(profile);
  console.log("[vikas-mitra] new profile", { id: profile.id, district: profile.district });
  return profile;
}

export async function listVikasMitraProfiles(): Promise<VikasMitraProfile[]> {
  return profiles;
}
