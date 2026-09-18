"use client";

import { useMemo, useState } from "react";
import { BarChart3, Search, Table2 } from "lucide-react";
import type { ElectionResultRecord } from "@/lib/election-results.server";

type Summary = {
  bjp: number;
  inc: number;
  ind: number;
  others: number;
  winners: number;
  bodies: number;
  wards: number;
};

export function ElectionResultsExplorer({
  results,
  summary,
}: {
  results: ElectionResultRecord[];
  summary: Summary;
}) {
  const [district, setDistrict] = useState("all");
  const [ulb, setUlb] = useState("all");
  const [party, setParty] = useState("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(50);
  const districts = useMemo(
    () => [...new Set(results.map((r) => r.districtName))].sort(),
    [results],
  );
  const ulbs = useMemo(
    () =>
      [
        ...new Set(
          results
            .filter((r) => district === "all" || r.districtName === district)
            .map((r) => r.ulbName),
        ),
      ].sort(),
    [district, results],
  );
  const parties = useMemo(
    () => [...new Set(results.map((r) => r.partyName))].filter(Boolean).sort(),
    [results],
  );
  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return results.filter(
      (r) =>
        (district === "all" || r.districtName === district) &&
        (ulb === "all" || r.ulbName === ulb) &&
        (party === "all" || r.partyName === party) &&
        (!text ||
          [r.name, r.districtName, r.ulbName, r.wardNo, r.partyName].some((v) =>
            v.toLowerCase().includes(text),
          )),
    );
  }, [district, party, query, results, ulb]);

  const cards = [
    {
      label: "भाजपा विजेता",
      value: summary.bjp,
      tone: "border-orange-200 bg-orange-50 text-orange-700",
    },
    {
      label: "कांग्रेस विजेता",
      value: summary.inc,
      tone: "border-blue-200 bg-blue-50 text-blue-700",
    },
    {
      label: "निर्दलीय विजेता",
      value: summary.ind,
      tone: "border-slate-200 bg-slate-50 text-slate-700",
    },
    {
      label: "अन्य दल विजेता",
      value: summary.others,
      tone: "border-violet-200 bg-violet-50 text-violet-700",
    },
  ];

  return (
    <section className="bg-[#f5f8fc] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] rounded-xl border border-[#dbe5ee] bg-white p-4 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-black text-emerald-700">
              <BarChart3 className="h-4 w-4" /> Database से लाइव परिणाम
            </div>
            <h1 className="mt-3 font-display text-3xl font-black text-[#0e2f5e] sm:text-4xl">
              राजस्थान निकाय चुनाव परिणाम
            </h1>
            <p className="mt-2 font-bold text-[#69748a]">
              जिला, निकाय और वार्डवार विजेता उम्मीदवार
            </p>
          </div>
          <div className="text-sm font-bold text-[#5c6880] lg:text-right">
            <p>
              {summary.bodies} निकाय · {summary.wards} वार्ड
            </p>
            <p className="mt-1">
              {summary.winners.toLocaleString("en-IN")} विजेता
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article key={card.label} className={`rounded-lg border p-5 ${card.tone}`}>
              <p className="font-black">{card.label}</p>
              <p className="mt-2 text-3xl font-black text-[#0e2f5e]">{card.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 rounded-lg bg-[#f8fbff] p-4 md:grid-cols-2 xl:grid-cols-4">
          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setUlb("all");
              setLimit(50);
            }}
            className="h-12 rounded-lg border border-[#cfd9e6] bg-white px-3 font-bold"
          >
            <option value="all">सभी जिले</option>
            {districts.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <select
            value={ulb}
            onChange={(e) => {
              setUlb(e.target.value);
              setLimit(50);
            }}
            className="h-12 rounded-lg border border-[#cfd9e6] bg-white px-3 font-bold"
          >
            <option value="all">सभी निकाय</option>
            {ulbs.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <select
            value={party}
            onChange={(e) => {
              setParty(e.target.value);
              setLimit(50);
            }}
            className="h-12 rounded-lg border border-[#cfd9e6] bg-white px-3 font-bold"
          >
            <option value="all">सभी पार्टियां</option>
            {parties.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <label className="relative">
            <Search className="absolute left-3 top-4 h-4 w-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(50);
              }}
              placeholder="नाम, वार्ड, निकाय खोजें"
              className="h-12 w-full rounded-lg border border-[#cfd9e6] bg-white pl-10 pr-3 font-bold"
            />
          </label>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-[#dbe5ee]">
          <div className="flex items-center gap-2 bg-[#eef3f8] px-4 py-3 text-sm font-black text-[#0e2f5e]">
            <Table2 className="h-4 w-4" /> {filtered.length.toLocaleString("en-IN")} परिणाम मिले
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] text-left text-sm">
              <thead className="bg-[#123a72] text-white">
                <tr>
                  {[
                    "जिला",
                    "निकाय",
                    "वार्ड",
                    "आरक्षण",
                    "परिणाम",
                    "उम्मीदवार",
                    "लिंग",
                    "आयु",
                    "श्रेणी",
                    "पार्टी",
                    "प्राप्त वोट",
                  ].map((h) => (
                    <th key={h} className="px-3 py-3 font-black">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5edf5]">
                {filtered.slice(0, limit).map((r) => (
                  <tr key={r.id} className="odd:bg-white even:bg-slate-50">
                    <td className="px-3 py-3 font-bold">{r.districtName}</td>
                    <td className="px-3 py-3 font-bold">{r.ulbName}</td>
                    <td className="px-3 py-3">{r.wardNo}</td>
                    <td className="px-3 py-3">{r.wardReservation}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-black ${r.result.toLowerCase() === "winner" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`}
                      >
                        {r.result}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-black text-[#0e2f5e]">{r.name}</td>
                    <td className="px-3 py-3">{r.gender}</td>
                    <td className="px-3 py-3">{r.age ?? "—"}</td>
                    <td className="px-3 py-3">{r.candidateCategory}</td>
                    <td className="px-3 py-3 font-black">{r.partyName}</td>
                    <td className="px-3 py-3 font-black">
                      {r.votesSecured.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {limit < filtered.length && (
            <div className="p-4 text-center">
              <button
                onClick={() => setLimit((v) => v + 100)}
                className="rounded-lg bg-[#123a72] px-6 py-3 font-black text-white"
              >
                अगले 100 परिणाम दिखाएं
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
