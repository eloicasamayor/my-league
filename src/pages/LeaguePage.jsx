// Dependencies
import { useParams } from "react-router-dom";
import {
  useGetTeamsQuery,
  useGetPlayersQuery,
  useGetMatchesQuery,
  useGetLeaguesQuery,
} from "../api";

// Components
import {
  MatchesList,
  Classification,
  PlayersList,
  NewTeamForm,
  NewPlayerForm,
  NewMatchForm,
} from "../components";

export function LeaguePage() {
  const { leagueUrlName } = useParams();
  const {
    data: leaguesData,
    isLoading: leaguesIsLoading,
    refetch: leaguesRefetch,
  } = useGetLeaguesQuery();

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
  const currentLeague = leaguesData.find(
    (league) => league.urlname === leagueUrlName
  );
  if (!currentLeague) {
    return <h2>Not found league :/</h2>;
  }
  teamsData = teamsData.filter((team) => team.league === currentLeague.id);
  matchesData = matchesData.filter(
    (match) => match.league === currentLeague.id
  );
  playersData = playersData.filter(
    (player) => player.league === currentLeague.id
  );

  return (
    <div>
      <h1>{leagueUrlName}</h1>
      <Classification
        data={teamsData}
        isLoading={teamsIsLoading}
        refetch={teamsRefetch}
      />
      <NewTeamForm teamsRefetch={teamsRefetch} currentLeague={currentLeague} />
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
