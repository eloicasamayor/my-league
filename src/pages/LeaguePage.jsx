// Dependencies
import { useParams } from "react-router-dom";
import {
  useGetTeamsQuery,
  useGetPlayersQuery,
  useGetMatchesQuery,
  useGetLeaguesQuery,
} from "../redux";

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
  const { data: leaguesData, isLoading: leaguesIsLoading } =
    useGetLeaguesQuery();

  let { data: teamsData, isLoading: teamsIsLoading } = useGetTeamsQuery();

  let { data: playersData, isLoading: playersIsLoading } = useGetPlayersQuery();

  let { data: matchesData, isLoading: matchesIsLoading } = useGetMatchesQuery();

  if (teamsIsLoading || matchesIsLoading || playersIsLoading) {
    return "loading...";
  }
  const currentLeague = leaguesData.find(
    (league) => league.urlname === leagueUrlName
  );
  if (!currentLeague) {
    return <h2>Not found league "{leagueUrlName}"</h2>;
  }
  teamsData = teamsData.filter((team) => team.league === currentLeague.id);
  matchesData = matchesData.filter(
    (match) => match.league === currentLeague.id
  );
  playersData = playersData.filter((player) =>
    teamsData.find((team) => team.id === player.team)
  );

  return (
    <div>
      <h1>{leagueUrlName}</h1>
      <Classification data={teamsData} isLoading={teamsIsLoading} />
      <NewTeamForm currentLeague={currentLeague} />
      <hr />
      <h2>Matches List</h2>
      <MatchesList
        teams={teamsData}
        matchesData={matchesData}
        matchesIsLoading={matchesIsLoading}
        playersData={playersData}
        teamsData={teamsData}
      />
      <NewMatchForm teams={teamsData} currentLeague={currentLeague} />
      <hr />
      <h2>Players</h2>
      <PlayersList
        teamsData={teamsData}
        teamsIsLoading={teamsIsLoading}
        playersData={playersData}
        playersIsLoading={playersIsLoading}
      />
      <NewPlayerForm teamsData={teamsData} teamsIsLoading={teamsIsLoading} />
    </div>
  );
}
