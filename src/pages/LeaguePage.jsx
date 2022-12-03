// Dependencies
import { useParams } from "react-router-dom";
import { useGetTeamsQuery } from "../api/teams";
import { useGetPlayersQuery } from "../api/players";
import { useGetMatchesQuery } from "../api/matches";

// Components
import { MatchesList } from "../components/MatchesList";
import { Classification } from "../components/Classification";
import { PlayersList } from "../components/PlayersList";
import { NewTeamForm } from "../components/NewTeamForm";
import { NewPlayerForm } from "../components/NewPlayerForm";
import { NewMatchForm } from "../components/NewMatchForm";
export function LeaguePage() {
  const { leagueUrlName } = useParams();
  const {
    data: teamsData,
    isLoading: teamsIsLoading,
    refetch: teamsRefetch,
  } = useGetTeamsQuery();

  const {
    data: playersData,
    isLoading: playersIsLoading,
    refetch: playersRefetch,
  } = useGetPlayersQuery();

  const {
    data: matchesData,
    isLoading: matchesIsLoading,
    refetch: matchesRefetch,
  } = useGetMatchesQuery();

  if (teamsIsLoading) {
    return "loading...";
  }
  return (
    <div>
      <h1>{leagueUrlName}</h1>
      <Classification
        data={teamsData}
        isLoading={teamsIsLoading}
        refetch={teamsRefetch}
      />
      <NewTeamForm refetch={teamsRefetch} />
      <hr />
      <h2>Matches List</h2>
      <MatchesList
        teams={teamsData}
        matchesData={matchesData}
        matchesIsLoading={matchesIsLoading}
        matchesRefetch={matchesRefetch}
      />
      <NewMatchForm teams={teamsData} refetch={matchesRefetch} />
      <hr />
      <h2>Players</h2>
      <PlayersList
        teamsData={teamsData}
        teamsIsLoading={teamsIsLoading}
        playersData={playersData}
        playersIsLoading={playersIsLoading}
        playersRefetch={playersRefetch}
      />
      <NewPlayerForm
        teamsData={teamsData}
        teamsIsLoading={teamsIsLoading}
        playersRefetch={playersRefetch}
      />
    </div>
  );
}
