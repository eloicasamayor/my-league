// Dependencies
import { useParams } from "react-router-dom";
import {
  useGetTeamsQuery,
  useGetPlayersQuery,
  useGetMatchesQuery,
  useGetLeaguesQuery,
} from "../redux";
import { useSelector } from "react-redux";

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

  const authData = useSelector((state) => state.auth);

  if (
    teamsIsLoading ||
    matchesIsLoading ||
    playersIsLoading ||
    leaguesIsLoading
  ) {
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
  const isOwner = authData?.user?.id === currentLeague.owner;

  return (
    <div>
      <h1>{currentLeague.name}</h1>
      <h2>{currentLeague.description}</h2>
      <Classification
        data={teamsData}
        isLoading={teamsIsLoading}
        isOwner={isOwner}
      />
      {isOwner && <NewTeamForm currentLeague={currentLeague} />}
      <hr />
      <h2>Matches List</h2>
      <MatchesList
        teams={teamsData}
        matchesData={matchesData}
        matchesIsLoading={matchesIsLoading}
        playersData={playersData}
        teamsData={teamsData}
        isOwner={isOwner}
      />
      {isOwner && (
        <NewMatchForm teams={teamsData} currentLeague={currentLeague} />
      )}
      <hr />
      <h2>Players</h2>
      <PlayersList
        teamsData={teamsData}
        teamsIsLoading={teamsIsLoading}
        playersData={playersData}
        playersIsLoading={playersIsLoading}
        isOwner={isOwner}
      />
      {isOwner && (
        <NewPlayerForm teamsData={teamsData} teamsIsLoading={teamsIsLoading} />
      )}
    </div>
  );
}
