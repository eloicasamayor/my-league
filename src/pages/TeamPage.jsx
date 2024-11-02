// Dependencies
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetTeamsQuery,
  useGetMatchesQuery,
  useGetPlayersQuery,
  useGetLeaguesQuery,
} from "../redux";
import { useSelector } from "react-redux";

// Components
import { PlayersList, MatchesCalendar } from "../components";

/**
 * @returns {JSX.Element}
 */
export function TeamPage() {
  const { teamName } = useParams();

  let { data: teamsData, isLoading: teamsIsLoading } = useGetTeamsQuery({});
  let { data: playersData, isLoading: playersIsLoading } = useGetPlayersQuery(
    {}
  );
  let { data: matchesData, isLoading: matchesIsLoading } = useGetMatchesQuery(
    {}
  );
  const { data: leaguesData, isLoading: leaguesIsLoading } = useGetLeaguesQuery(
    {}
  );

  const [isOwner, setIsOwner] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const authData = useSelector((state) => state.auth);

  useEffect(() => {
    const leagueOwner =
      leaguesData?.length && selectedTeam?.league
        ? leaguesData.find((league) => league.id === selectedTeam.league).owner
        : null;
    setIsOwner(!!(authData.user && authData.user.id === leagueOwner));
  }, [JSON.stringify(leaguesData)]);

  useEffect(() => {
    setSelectedTeam(
      teamsData?.length
        ? teamsData.find((team) => team.urlname === teamName)
        : null
    );
  }, [JSON.stringify(teamsData)]);

  if (!teamName) {
    return <p>{"no selected team"}</p>;
  }

  if (
    teamsIsLoading ||
    matchesIsLoading ||
    playersIsLoading ||
    leaguesIsLoading
  ) {
    return <p>{"loading..."}</p>;
  }

  if (
    !teamsData ||
    !teamsData.length ||
    !playersData ||
    !playersData.length ||
    !matchesData ||
    !matchesData.length ||
    !leaguesData ||
    !leaguesData.length
  ) {
    return <p>"no data......"</p>;
  }

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
        isOwner={isOwner}
      />
      <h2>Matches</h2>
      <MatchesCalendar
        isOwner={isOwner}
        teams={teamsData}
        matchesData={matchesData}
        matchesIsLoading={matchesIsLoading}
        selectedTeam={selectedTeam}
        teamsData={teamsData}
      />
    </>
  );
}
