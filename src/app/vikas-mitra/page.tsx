import Image from "next/image";
import { MapPin, Phone, UserRound } from "lucide-react";
import { listVikasMitraProfiles } from "@/lib/vikas-mitra.server";
import type { VikasMitraProfile } from "@/lib/vikas-mitra.server";
import { formatVikasMitraId } from "@/lib/profile-id";

export const dynamic = "force-dynamic";

function demoPhoto(seed: string, kurta: string, bg: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
      <defs>
        <linearGradient id="bg-${seed}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${bg}"/>
          <stop offset="1" stop-color="#fff1df"/>
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#bg-${seed})"/>
      <circle cx="320" cy="190" r="82" fill="#f4c7a2"/>
      <path d="M246 178c14-70 132-83 154-8 4 15 2 34-4 50-28-42-114-45-150-8-5-10-5-22 0-34z" fill="#2d2622"/>
      <path d="M214 440c10-94 67-142 106-142s96 48 106 142H214z" fill="${kurta}"/>
      <path d="M264 310c18 28 94 28 112 0 16 24 25 73 26 130H238c1-57 10-106 26-130z" fill="#fff8ef" opacity=".72"/>
      <circle cx="290" cy="196" r="7" fill="#2d2622"/>
      <circle cx="350" cy="196" r="7" fill="#2d2622"/>
      <path d="M294 236c18 16 43 16 58 0" fill="none" stroke="#8d4a36" stroke-width="8" stroke-linecap="round"/>
      <path d="M0 407c118-43 185-32 261 13 74 43 190 43 379-25v85H0z" fill="#6d070b" opacity=".12"/>
    </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const demoProfiles: VikasMitraProfile[] = [];

export default async function VikasMitraPage() {
  const profiles = await listVikasMitraProfiles("approved");
  const allProfiles = [...profiles, ...demoProfiles];

  return (
    <main className="bg-[#fff8ef]">
      <section className="bg-[linear-gradient(135deg,#6d070b_0%,#8d1619_55%,#f3630b_100%)] px-4 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold tracking-[0.18em] text-white/70 uppercase">
            Bharat Pehchan Network
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-black text-white sm:text-5xl">
            Vikas Mitra Profiles
          </h1>
          <p className="mt-4 max-w-3xl text-base font-semibold text-white/84 sm:text-lg">
            Yahan Vikas Mitra join karne wale members ki profile details dikhengi.
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allProfiles.map((profile) => (
              <article
                key={profile.id}
                className="overflow-hidden rounded-lg border border-orange-200 bg-white shadow-soft"
              >
                <div className="relative h-64 bg-orange-50">
                  {profile.photo ? (
                    <Image
                      src={profile.photo}
                      alt={profile.name}
                      fill
                      unoptimized
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center bg-[linear-gradient(135deg,#fff0df_0%,#ffe1bd_100%)] text-center">
                      <div>
                        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-white text-4xl font-black text-saffron shadow-soft">
                          {profile.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <UserRound className="mx-auto mt-4 h-8 w-8 text-maroon/50" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-black tracking-[0.16em] text-saffron uppercase">
                    {formatVikasMitraId(profile.id, profile.createdAt)}
                  </p>
                  <h2 className="font-display text-2xl font-black text-maroon">{profile.name}</h2>
                  <div className="mt-3 space-y-2 text-sm font-semibold text-[#4b302b]">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-saffron" />
                      {profile.village}, {profile.tehsil}, {profile.district}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-saffron" />
                      {profile.phone}
                    </p>
                  </div>
                  {(profile.occupation || profile.experience) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profile.occupation && (
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-extrabold text-maroon">
                          {profile.occupation}
                        </span>
                      )}
                      {profile.experience && (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-extrabold text-[#17633f]">
                          {profile.experience}
                        </span>
                      )}
                    </div>
                  )}
                  {profile.message && (
                    <p className="mt-4 text-sm leading-relaxed font-semibold text-muted-foreground">
                      {profile.message}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
