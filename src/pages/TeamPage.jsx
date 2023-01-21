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

  const [showNewPlayerModal, setShowNewPlayerModal] = useState(false);
  const [showEditPlayerModal, setShowEditPlayerModal] = useState(false);

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
      {/*       {isOwner && showEditPlayerModal && (
        <Modal onCloseModal={() => setShowEditPlayerModal(false)}>
          <EditPlayerForm />
        </Modal>
      )}
      {isOwner && showNewPlayerModal && (
        <Modal onCloseModal={() => setShowNewPlayerForm(false)}>
          <NewPlayerForm
            teamsData={teamsData}
            teamsIsLoading={teamsIsLoading}
          />
        </Modal>
      )} */}
      <h2>Matches</h2>
      <MatchesList
        isOwner={isOwner}
        teams={teamsData}
        matchesData={matchesData}
        matchesIsLoading={matchesIsLoading}
        selectedTeam={selectedTeam}
      />
    </>
  );
}
