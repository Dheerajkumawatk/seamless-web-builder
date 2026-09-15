import { ElectionResultsExplorer } from "@/components/site/ElectionResultsExplorer";
import { electionSummary, listElectionResults } from "@/lib/election-results.server";

export default async function ElectionResultsPage() {
  const results = await listElectionResults();
  return (
    <main className="bg-[#f5f8fc]">
      <ElectionResultsExplorer results={results} summary={electionSummary(results)} />
    </main>
  );
}
