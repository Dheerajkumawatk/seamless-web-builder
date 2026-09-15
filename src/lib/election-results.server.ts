import { QueryTypes } from "sequelize";
import { getSequelize } from "@/lib/sequelize.server";

export type ElectionResultRecord = {
  id: number;
  districtName: string;
  ulbName: string;
  wardNo: string;
  wardReservation: string;
  result: string;
  name: string;
  gender: string;
  age: number | null;
  candidateCategory: string;
  partyName: string;
  votesSecured: number;
};

type DatabaseRow = {
  id: number;
  district_name: string;
  ulb_name: string;
  ward_no: string | number;
  ward_reservations: string;
  result: string;
  name: string;
  gender: string;
  age: number | null;
  candidate_category: string;
  party_name: string;
  votes_secured: number;
};

export async function listElectionResults(): Promise<ElectionResultRecord[]> {
  const rows = await getSequelize().query<DatabaseRow>(
    `SELECT id, district_name, ulb_name, ward_no, ward_reservations, result, name,
            gender, age, candidate_category, party_name, votes_secured
       FROM election_results
      ORDER BY district_name, ulb_name, CAST(ward_no AS UNSIGNED),
               CASE WHEN result = 'Winner' THEN 0 ELSE 1 END, votes_secured DESC`,
    { type: QueryTypes.SELECT },
  );
  return rows.map((row) => ({
    id: row.id,
    districtName: row.district_name,
    ulbName: row.ulb_name,
    wardNo: String(row.ward_no),
    wardReservation: row.ward_reservations,
    result: row.result,
    name: row.name,
    gender: row.gender,
    age: row.age === null ? null : Number(row.age),
    candidateCategory: row.candidate_category,
    partyName: row.party_name,
    votesSecured: Number(row.votes_secured) || 0,
  }));
}

export function electionSummary(rows: ElectionResultRecord[]) {
  const winners = rows.filter((row) => row.result.toLowerCase() === "winner");
  const count = (party: string, source = rows) =>
    source.filter((row) => row.partyName === party).length;
  return {
    bjp: count("BJP"),
    inc: count("INC"),
    ind: count("IND"),
    others: winners.length - count("BJP") - count("INC") - count("IND"),
    bjpRunners: count(
      "BJP",
      rows.filter((row) => row.result.toLowerCase() !== "winner"),
    ),
    incRunners: count(
      "INC",
      rows.filter((row) => row.result.toLowerCase() !== "winner"),
    ),
    indRunners: count(
      "IND",
      rows.filter((row) => row.result.toLowerCase() !== "winner"),
    ),
    otherRunners:
      rows.filter((row) => row.result.toLowerCase() !== "winner").length -
      count(
        "BJP",
        rows.filter((row) => row.result.toLowerCase() !== "winner"),
      ) -
      count(
        "INC",
        rows.filter((row) => row.result.toLowerCase() !== "winner"),
      ) -
      count(
        "IND",
        rows.filter((row) => row.result.toLowerCase() !== "winner"),
      ),
    winners: winners.length,
    bodies: new Set(rows.map((row) => `${row.districtName}|${row.ulbName}`)).size,
    wards: new Set(rows.map((row) => `${row.districtName}|${row.ulbName}|${row.wardNo}`)).size,
  };
}
