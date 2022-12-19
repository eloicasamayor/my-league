// Dependencies
import { useParams } from "react-router-dom";
import {
  useGetTeamsQuery,
  useGetMatchesQuery,
  useGetPlayersQuery,
} from "../redux";

// Components
import {
  EditPlayerForm,
  MatchesList,
  NewPlayerForm,
  PlayersList,
} from "../components";

export function TeamPage() {
  const { teamName } = useParams();

  let { data: teamsData, isLoading: teamsIsLoading } = useGetTeamsQuery();

  let { data: playersData, isLoading: playersIsLoading } = useGetPlayersQuery();

  let { data: matchesData, isLoading: matchesIsLoading } = useGetMatchesQuery();

  if (teamsIsLoading || matchesIsLoading || playersIsLoading) {
    return "loading...";
  }
  const selectedTeam = teamsData.find((team) => team.urlname === teamName);

  return (
    <>
      <h1>{teamName}</h1>
      <h2>Players</h2>
      <PlayersList
        teamsData={teamsData}
        teamsIsLoading={teamsIsLoading}
        playersData={playersData}
        playersIsLoading={playersIsLoading}
        selectedTeam={selectedTeam}
      />
      <EditPlayerForm />
      <NewPlayerForm teamsData={teamsData} teamsIsLoading={teamsIsLoading} />
      <hr />
      <h2>Matches</h2>
      <MatchesList
        teams={teamsData}
        matchesData={matchesData}
        matchesIsLoading={matchesIsLoading}
        selectedTeam={selectedTeam}
      />
    </>
  );
}
