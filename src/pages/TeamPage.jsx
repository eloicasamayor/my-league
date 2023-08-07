// Dependencies
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetTeamsQuery,
  useGetMatchesQuery,
  useGetPlayersQuery,
  useGetLeaguesQuery,
} from "../redux";
import { useSelector } from "react-redux";

// Components
import {
  EditPlayerForm,
  MatchesList,
  NewPlayerForm,
  PlayersList,
  Modal,
  MatchesCalendar,
} from "../components";

export function TeamPage() {
  const { teamName } = useParams();

  let { data: teamsData, isLoading: teamsIsLoading } = useGetTeamsQuery();
  let { data: playersData, isLoading: playersIsLoading } = useGetPlayersQuery();
  let { data: matchesData, isLoading: matchesIsLoading } = useGetMatchesQuery();
  const { data: leaguesData, isLoading: leaguesIsLoading } =
    useGetLeaguesQuery();

  if (
    teamsIsLoading ||
    matchesIsLoading ||
    playersIsLoading ||
    leaguesIsLoading
  ) {
    return "loading...";
  }
  const selectedTeam = teamsData.find((team) => team.urlname === teamName);

  const authData = useSelector((state) => state.auth);

  const leagueOwner = leaguesData.find(
    (league) => league.id === selectedTeam.league
  ).owner;

  const isOwner = !!(authData.user && authData.user.id === leagueOwner);

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
