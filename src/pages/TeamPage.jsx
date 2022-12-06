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

  let {
    data: teamsData,
    isLoading: teamsIsLoading,
    refetch: teamsRefetch,
  } = useGetTeamsQuery();

  let {
    data: playersData,
    isLoading: playersIsLoading,
    refetch: playersRefetch,
  } = useGetPlayersQuery();

  let {
    data: matchesData,
    isLoading: matchesIsLoading,
    refetch: matchesRefetch,
  } = useGetMatchesQuery();

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
        playersRefetch={playersRefetch}
        selectedTeam={selectedTeam}
      />
      <EditPlayerForm />
      <NewPlayerForm />
      <hr />
      <h2>Matches</h2>
      <MatchesList
        teams={teamsData}
        matchesData={matchesData}
        matchesIsLoading={matchesIsLoading}
        matchesRefetch={matchesRefetch}
        selectedTeam={selectedTeam}
      />
    </>
  );
}
