"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, BarChart3, ExternalLink, ListFilter, Search, Table2 } from "lucide-react";
import {
  rajasthanElectionResults,
  rajasthanElectionSummary,
  type ElectionResultRow,
} from "@/data/election-results";

type ResultsTab = "summary" | "district" | "type" | "source";

const tabs: Array<{ id: ResultsTab; label: string }> = [
  { id: "summary", label: "सारांश" },
  { id: "district", label: "जिला / शहर" },
  { id: "type", label: "निकाय प्रकार" },
  { id: "source", label: "स्रोत" },
];

const statusLabels: Record<ElectionResultRow["status"], string> = {
  declared: "घोषित",
  counting: "गिनती जारी",
  tie: "बराबरी",
};

const categoryLabels: Record<ElectionResultRow["category"], string> = {
  "Nagar Nigam": "नगर निगम",
  "Nagar Parishad": "नगर परिषद",
  "Nagar Palika": "नगर पालिका",
};

function getPartyTone(party: string) {
  if (party === "BJP") return "border-orange-200 bg-orange-50 text-orange-700";
  if (party === "INC") return "border-blue-200 bg-blue-50 text-blue-700";
  if (party === "IND") return "border-slate-200 bg-slate-50 text-slate-700";
  if (party === "AAP") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (party === "Counting underway") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-violet-200 bg-violet-50 text-violet-700";
}

function countByParty(rows: ElectionResultRow[], party: string) {
  return rows.filter((row) => row.leadingParty === party).length;
}

export function ElectionResultsExplorer() {
  const [activeTab, setActiveTab] = useState<ResultsTab>("summary");
  const [selectedState, setSelectedState] = useState("Rajasthan");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedParty, setSelectedParty] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllRows, setShowAllRows] = useState(false);

  const districts = useMemo(
    () => Array.from(new Set(rajasthanElectionResults.map((row) => row.district))).sort(),
    [],
  );

  const cities = useMemo(() => {
    return rajasthanElectionResults
      .filter((row) => selectedDistrict === "all" || row.district === selectedDistrict)
      .map((row) => row.localBody)
      .sort();
  }, [selectedDistrict]);

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return rajasthanElectionResults.filter((row) => {
      const stateMatches = selectedState === "all" || row.state === selectedState;
      const districtMatches = selectedDistrict === "all" || row.district === selectedDistrict;
      const categoryMatches = selectedCategory === "all" || row.category === selectedCategory;
      const partyMatches =
        selectedParty === "all" ||
        row.leadingParty === selectedParty ||
        (selectedParty === "tie" && row.status === "tie") ||
        (selectedParty === "counting" && row.status === "counting");
      const queryMatches =
        query.length === 0 ||
        row.district.toLowerCase().includes(query) ||
        row.localBody.toLowerCase().includes(query) ||
        row.leadingParty.toLowerCase().includes(query);

      return stateMatches && districtMatches && categoryMatches && partyMatches && queryMatches;
    });
  }, [searchTerm, selectedCategory, selectedDistrict, selectedParty, selectedState]);

  const rowsToShow = showAllRows ? filteredRows : filteredRows.slice(0, 8);
  const declaredCount = filteredRows.filter((row) => row.status === "declared").length;
  const countingCount = filteredRows.filter((row) => row.status === "counting").length;
  const tieCount = filteredRows.filter((row) => row.status === "tie").length;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveTab("district");
    setShowAllRows(true);
    document.getElementById("all-election-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openAllResults() {
    setActiveTab("district");
    setShowAllRows(true);
    document.getElementById("all-election-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="election-results" className="bg-[#f5f8fc] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-lg border border-[#dbe5ee] bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1.5 text-sm font-black text-red-700">
              <BarChart3 className="h-4 w-4" />
              वास्तविक परिणाम डेटा
            </div>
            <h2 className="mt-3 font-display text-3xl font-black leading-tight text-[#0e2f5e] sm:text-4xl">
              {rajasthanElectionSummary.displayTitle}
            </h2>
            <p className="mt-2 text-lg font-bold text-[#69748a]">{rajasthanElectionSummary.subtitle}</p>
          </div>
          <div className="text-sm font-bold text-[#5c6880] lg:text-right">
            <p>अंतिम अपडेट: {rajasthanElectionSummary.lastUpdated}</p>
            <p className="mt-1">
              {rajasthanElectionSummary.totalUrbanBodies} निकाय, {rajasthanElectionSummary.councillorSeats.toLocaleString("en-IN")} वार्ड
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-lg border border-orange-200 bg-orange-50 p-5">
            <p className="text-xl font-black text-orange-700">भाजपा</p>
            <p className="mt-4 text-3xl font-black text-[#0e2f5e]">{rajasthanElectionSummary.largestPartyBodies.bjp}</p>
            <p className="mt-2 text-sm font-bold text-[#526079]">निकायों में सबसे बड़ी पार्टी</p>
          </article>
          <article className="rounded-lg border border-blue-200 bg-blue-50 p-5">
            <p className="text-xl font-black text-blue-700">कांग्रेस</p>
            <p className="mt-4 text-3xl font-black text-[#0e2f5e]">{rajasthanElectionSummary.largestPartyBodies.congress}</p>
            <p className="mt-2 text-sm font-bold text-[#526079]">निकायों में सबसे बड़ी पार्टी</p>
          </article>
          <article className="rounded-lg border border-violet-200 bg-violet-50 p-5">
            <p className="text-xl font-black text-violet-700">बराबरी</p>
            <p className="mt-4 text-3xl font-black text-[#0e2f5e]">{rajasthanElectionSummary.largestPartyBodies.ties}</p>
            <p className="mt-2 text-sm font-bold text-[#526079]">निकायों में टाई स्थिति</p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <p className="text-xl font-black text-slate-700">कुल निकाय</p>
            <p className="mt-4 text-3xl font-black text-[#0e2f5e]">{rajasthanElectionSummary.totalUrbanBodies}</p>
            <p className="mt-2 text-sm font-bold text-[#526079]">निगम, परिषद और पालिका</p>
          </article>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 rounded-lg border border-[#dbe5ee] bg-[#f8fbff] p-4 lg:grid-cols-[0.85fr_1fr_1fr_1.15fr_auto]">
          <label className="block text-sm font-black text-[#0e2f5e]">
            राज्य चुनें
            <select
              value={selectedState}
              onChange={(event) => setSelectedState(event.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-[#cfd9e6] bg-white px-3 text-sm font-bold text-[#17233a] outline-none focus:border-[#0e2f5e]"
            >
              <option value="Rajasthan">राजस्थान</option>
            </select>
          </label>
          <label className="block text-sm font-black text-[#0e2f5e]">
            जिला चुनें
            <select
              value={selectedDistrict}
              onChange={(event) => {
                setSelectedDistrict(event.target.value);
                setShowAllRows(false);
              }}
              className="mt-2 h-11 w-full rounded-lg border border-[#cfd9e6] bg-white px-3 text-sm font-bold text-[#17233a] outline-none focus:border-[#0e2f5e]"
            >
              <option value="all">सभी जिले</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-black text-[#0e2f5e]">
            निकाय प्रकार
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-[#cfd9e6] bg-white px-3 text-sm font-bold text-[#17233a] outline-none focus:border-[#0e2f5e]"
            >
              <option value="all">सभी निकाय</option>
              <option value="Nagar Nigam">नगर निगम</option>
              <option value="Nagar Parishad">नगर परिषद</option>
              <option value="Nagar Palika">नगर पालिका</option>
            </select>
          </label>
          <label className="block text-sm font-black text-[#0e2f5e]">
            वार्ड / शहर खोजें
            <span className="relative mt-2 block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5c6880]" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                list="election-cities"
                placeholder="जिला, निकाय या पार्टी लिखें..."
                className="h-11 w-full rounded-lg border border-[#cfd9e6] bg-white pl-10 pr-3 text-sm font-bold text-[#17233a] outline-none focus:border-[#0e2f5e]"
              />
              <datalist id="election-cities">
                {cities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </span>
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#df1414] px-5 text-sm font-black text-white shadow-sm lg:mt-auto"
          >
            <ListFilter className="h-4 w-4" />
            परिणाम देखें
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center gap-2" id="all-election-results">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg border px-4 py-2 text-sm font-black transition ${
                activeTab === tab.id
                  ? "border-[#0e2f5e] bg-[#0e2f5e] text-white"
                  : "border-[#dbe5ee] bg-white text-[#0e2f5e] hover:border-[#0e2f5e]"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <select
            value={selectedParty}
            onChange={(event) => setSelectedParty(event.target.value)}
            className="ml-0 h-10 rounded-lg border border-[#dbe5ee] bg-white px-3 text-sm font-black text-[#0e2f5e] outline-none sm:ml-auto"
          >
            <option value="all">सभी पार्टी / स्थिति</option>
            <option value="BJP">BJP</option>
            <option value="INC">Congress</option>
            <option value="IND">Independent</option>
            <option value="AAP">AAP</option>
            <option value="tie">बराबरी</option>
            <option value="counting">गिनती जारी</option>
          </select>
        </div>

        {activeTab === "summary" && (
          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-lg border border-[#dbe5ee] p-5">
              <h3 className="text-xl font-black text-[#0e2f5e]">मुख्य परिणाम</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-[#f5f8fc] p-4">
                  <p className="text-sm font-bold text-[#5c6880]">घोषित</p>
                  <p className="mt-2 text-2xl font-black text-[#0e2f5e]">{declaredCount}</p>
                </div>
                <div className="rounded-lg bg-[#f5f8fc] p-4">
                  <p className="text-sm font-bold text-[#5c6880]">गिनती जारी</p>
                  <p className="mt-2 text-2xl font-black text-[#0e2f5e]">{countingCount}</p>
                </div>
                <div className="rounded-lg bg-[#f5f8fc] p-4">
                  <p className="text-sm font-bold text-[#5c6880]">बराबरी</p>
                  <p className="mt-2 text-2xl font-black text-[#0e2f5e]">{tieCount}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={openAllResults}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#df1414] bg-white px-5 py-3 text-sm font-black text-[#df1414]"
              >
                सभी परिणाम देखें <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-lg border border-[#dbe5ee] p-5">
              <h3 className="text-xl font-black text-[#0e2f5e]">चुनाव अपडेट</h3>
              <div className="mt-4 space-y-3 text-sm font-bold text-[#526079]">
                <p>नगर निगम: {rajasthanElectionSummary.corporations}</p>
                <p>नगर परिषद: {rajasthanElectionSummary.councils}</p>
                <p>नगर पालिका: {rajasthanElectionSummary.municipalities}</p>
                <p>पहला चरण मतदान: {rajasthanElectionSummary.phaseOneTurnout}</p>
                <p>दूसरा चरण मतदान: {rajasthanElectionSummary.phaseTwoTurnout}</p>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "district" || activeTab === "type") && (
          <div className="mt-5 overflow-hidden rounded-lg border border-[#dbe5ee]">
            <div className="flex items-center gap-2 border-b border-[#dbe5ee] bg-[#f5f8fc] px-4 py-3 text-sm font-black text-[#0e2f5e]">
              <Table2 className="h-4 w-4" />
              {filteredRows.length} परिणाम मिले
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-[#eef3f8] text-[#0e2f5e]">
                  <tr>
                    <th className="px-4 py-3 font-black">जिला</th>
                    <th className="px-4 py-3 font-black">निकाय / शहर</th>
                    <th className="px-4 py-3 font-black">प्रकार</th>
                    <th className="px-4 py-3 font-black">पार्टी</th>
                    <th className="px-4 py-3 font-black">स्थिति</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5edf5]">
                  {rowsToShow.map((row) => (
                    <tr key={`${row.district}-${row.localBody}`} className="bg-white">
                      <td className="px-4 py-3 font-bold text-[#17233a]">{row.district}</td>
                      <td className="px-4 py-3 font-bold text-[#17233a]">{row.localBody}</td>
                      <td className="px-4 py-3 font-bold text-[#526079]">{categoryLabels[row.category]}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-black ${getPartyTone(row.leadingParty)}`}>
                          {row.leadingParty}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-[#526079]">{statusLabels[row.status]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredRows.length > rowsToShow.length && (
              <div className="border-t border-[#dbe5ee] bg-white p-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllRows(true)}
                  className="rounded-lg border border-[#df1414] px-5 py-2.5 text-sm font-black text-[#df1414]"
                >
                  सभी परिणाम दिखाएं
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "source" && (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <a
              href={rajasthanElectionSummary.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-[#dbe5ee] p-5 text-[#0e2f5e] hover:border-[#0e2f5e]"
            >
              <p className="text-lg font-black">{rajasthanElectionSummary.sourceName}</p>
              <p className="mt-2 text-sm font-bold text-[#526079]">जिला और निकायवार विजेता सूची</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#df1414]">
                स्रोत खोलें <ExternalLink className="h-4 w-4" />
              </span>
            </a>
            <a
              href={rajasthanElectionSummary.officialStatsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-[#dbe5ee] p-5 text-[#0e2f5e] hover:border-[#0e2f5e]"
            >
              <p className="text-lg font-black">{rajasthanElectionSummary.officialStatsName}</p>
              <p className="mt-2 text-sm font-bold text-[#526079]">राजस्थान ULB और वार्ड संख्या का आधिकारिक संदर्भ</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#df1414]">
                स्रोत खोलें <ExternalLink className="h-4 w-4" />
              </span>
            </a>
          </div>
        )}

        <p className="mt-5 text-right text-xs font-bold text-[#69748a]">
          स्रोत: परिणाम के साथ आधिकारिक लिंक
        </p>
      </div>
    </section>
  );
}
