import { useParams } from "react-router-dom";
import { MatchesList } from "../components/MatchesList";
import { PlayersList } from "../components/PlayersList";

import { useGetTeamsQuery } from "../api/teams";
export function TeamPage() {
  const { data, isLoading, refetch } = useGetTeamsQuery();

  const { teamName } = useParams();
  if (isLoading) {
    return "loading...";
  } else {
    const team = data.find((team) => team.urlname === teamName);
    return (
      <>
        <h1>{teamName}</h1>
        <PlayersList team={team.id} />
        <MatchesList team={team.id} />
      </>
    );
  }
}
