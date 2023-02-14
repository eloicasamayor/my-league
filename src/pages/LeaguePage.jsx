// Dependencies
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetTeamsQuery,
  useGetPlayersQuery,
  useGetMatchesQuery,
  useGetLeaguesQuery,
} from "../redux";
import { useSelector } from "react-redux";

// Components
import {
  MatchesCalendar,
  Classification,
  PlayersList,
  NewTeamForm,
  NewPlayerForm,
  NewMatchForm,
  Modal,
  EditLeagueForm,
} from "../components";
import { PencilIcon } from "../components/icons/PencilIcon";
import { PlusIcon } from "../components/icons/PlusIcon";
import { Tabs } from "flowbite-react";

export function LeaguePage() {
  const { leagueUrlName } = useParams();
  const { data: leaguesData, isLoading: leaguesIsLoading } =
    useGetLeaguesQuery();

  let { data: teamsData, isLoading: teamsIsLoading } = useGetTeamsQuery();
  let { data: playersData, isLoading: playersIsLoading } = useGetPlayersQuery();
  let { data: matchesData, isLoading: matchesIsLoading } = useGetMatchesQuery();

  const authData = useSelector((state) => state.auth);

  const [showEditLeagueModal, setShowEditLeagueModal] = useState(false);
  const [showNewTeamModal, setShowNewTeamModal] = useState(false);
  const [showNewMatchModal, setShowNewMatchModal] = useState(false);
  const [showNewPlayerModal, setShowNewPlayerModal] = useState(false);

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
      <header className="flex gap-0 lg:gap-2">
        <img src={currentLeague.img} className={"w-20 aspect-square"} />
        <div className="grow">
          <h1>{currentLeague.name}</h1>
          <h2>{currentLeague.description}</h2>
        </div>

        {isOwner && (
          <>
            <button
              onClick={() => setShowEditLeagueModal(true)}
              name={"Edit league info"}
            >
              <PencilIcon />
              {"Edit info"}
            </button>
            <button
              onClick={() => setShowNewTeamModal(true)}
              name={"Add new team"}
            >
              <PlusIcon />
              {"New Team"}
            </button>
            <button
              onClick={() => setShowNewMatchModal(true)}
              name={"Add new match"}
            >
              <PlusIcon />
              {"New Match"}
            </button>
            <button
              onClick={() => setShowNewPlayerModal(true)}
              name={"Add new Player"}
            >
              <PlusIcon />
              {"New Player"}
            </button>
          </>
        )}
      </header>
      <Tabs.Group aria-label="Tabs with underline" style="underline">
        <Tabs.Item title="Classification" active={true}>
          <Classification
            data={teamsData}
            isLoading={teamsIsLoading}
            isOwner={isOwner}
          />
        </Tabs.Item>
        <Tabs.Item title="Matches">
          <h2>Matches List</h2>
          <MatchesCalendar
            teams={teamsData}
            matchesData={matchesData}
            matchesIsLoading={matchesIsLoading}
            playersData={playersData}
            teamsData={teamsData}
            isOwner={isOwner}
          />
        </Tabs.Item>
        <Tabs.Item title="Players">
          <h2>Players</h2>
          <PlayersList
            teamsData={teamsData}
            teamsIsLoading={teamsIsLoading}
            playersData={playersData}
            playersIsLoading={playersIsLoading}
            isOwner={isOwner}
          />
        </Tabs.Item>
      </Tabs.Group>

      {showEditLeagueModal && (
        <Modal onCloseModal={() => setShowEditLeagueModal(false)}>
          <EditLeagueForm leagueToEdit={currentLeague} />
        </Modal>
      )}

      {isOwner && showNewTeamModal && (
        <Modal onCloseModal={() => setShowNewTeamModal(false)}>
          <NewTeamForm
            currentLeague={currentLeague}
            closeModal={() => setShowNewTeamModal(false)}
          />
        </Modal>
      )}
      {isOwner && showNewMatchModal && (
        <Modal onCloseModal={() => setShowNewMatchModal(false)}>
          <NewMatchForm
            teams={teamsData}
            currentLeague={currentLeague}
            closeModal={() => setShowNewMatchModal(false)}
          />
        </Modal>
      )}
      {isOwner && showNewPlayerModal && (
        <Modal onCloseModal={() => setShowNewPlayerModal(false)}>
          <NewPlayerForm
            teamsData={teamsData}
            teamsIsLoading={teamsIsLoading}
          />
        </Modal>
      )}
    </div>
  );
}
