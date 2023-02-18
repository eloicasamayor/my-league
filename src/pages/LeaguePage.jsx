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
import { SettingsIcon } from "../components/icons/SettingsIcon";
import { Tabs, Button } from "flowbite-react";

export function LeaguePage() {
  const { leagueUrlName } = useParams();
  const { data: leaguesData, isLoading: leaguesIsLoading } =
    useGetLeaguesQuery();

  let { data: teamsData, isLoading: teamsIsLoading } = useGetTeamsQuery();
  let { data: playersData, isLoading: playersIsLoading } = useGetPlayersQuery();
  let { data: matchesData, isLoading: matchesIsLoading } = useGetMatchesQuery();

  const authData = useSelector((state) => state.auth);

  const [showEditLeagueModal, setShowEditLeagueModal] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
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
      {isOwner && (
        <button
          className="absolute rounded-full right-0 flex justify-center items-center w-12 h-12 md:w-16 md:h-16 bg-transparent hover:bg-violet-400"
          onClick={() => setShowSettingsMenu(!showSettingsMenu)}
        >
          <SettingsIcon svgClassName={"w-6 h-6 md:w-8 md:h-8"} />
        </button>
      )}

      <header className="flex items-center md:items-end gap-1">
        {isOwner && showSettingsMenu && (
          <Button.Group className="mt-2">
            <Button
              size="sm"
              color={"light"}
              onClick={() => setShowEditLeagueModal(true)}
              name={"Edit league info"}
            >
              <PencilIcon svgClassName={"w-6 h-6"} />
              {"Edit info"}
            </Button>
            <Button
              size="sm"
              color={"light"}
              onClick={() => setShowNewTeamModal(true)}
              name={"Add new team"}
            >
              <PlusIcon />
              {"New Team"}
            </Button>
            <Button
              size="sm"
              color={"light"}
              onClick={() => setShowNewMatchModal(true)}
              name={"Add new match"}
            >
              <PlusIcon />
              {"New Match"}
            </Button>
            <Button
              size="sm"
              color={"light"}
              onClick={() => setShowNewPlayerModal(true)}
              name={"Add new Player"}
            >
              <PlusIcon />
              {"New Player"}
            </Button>
          </Button.Group>
        )}
        <img src={currentLeague.img} className={"w-20 aspect-square"} />
        <div className="flex flex-col md:flex-row grow items-baseline gap-0 md:gap-3">
          <h1 className="p-0">{currentLeague.name}</h1>
          <h2>{currentLeague.description}</h2>
        </div>
      </header>

      <Tabs.Group style="underline" className="justify-center">
        <Tabs.Item title="Classification" active={true}>
          <Classification
            data={teamsData}
            isLoading={teamsIsLoading}
            isOwner={isOwner}
          />
        </Tabs.Item>
        <Tabs.Item title="Matches">
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
        <Modal
          onCloseModal={() => setShowEditLeagueModal(false)}
          title={"Edit League"}
        >
          <EditLeagueForm leagueToEdit={currentLeague} />
        </Modal>
      )}

      {isOwner && showNewTeamModal && (
        <Modal
          onCloseModal={() => setShowNewTeamModal(false)}
          title={"New Team"}
        >
          <NewTeamForm
            currentLeague={currentLeague}
            closeModal={() => setShowNewTeamModal(false)}
          />
        </Modal>
      )}
      {isOwner && showNewMatchModal && (
        <Modal
          onCloseModal={() => setShowNewMatchModal(false)}
          title={"New Match"}
        >
          <NewMatchForm
            teams={teamsData}
            currentLeague={currentLeague}
            closeModal={() => setShowNewMatchModal(false)}
          />
        </Modal>
      )}
      {isOwner && showNewPlayerModal && (
        <Modal
          onCloseModal={() => setShowNewPlayerModal(false)}
          title={"New Player"}
        >
          <NewPlayerForm
            teamsData={teamsData}
            teamsIsLoading={teamsIsLoading}
          />
        </Modal>
      )}
    </div>
  );
}
