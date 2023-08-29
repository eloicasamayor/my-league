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
  StepsNavigation,
} from "../components";
import { PencilIcon, PlusIcon, PhotoIcon } from "../components/icons";
import { Alert } from "../components";
import { Dropdown } from "flowbite-react";

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
  const [selectedTab, setSelectedTab] = useState(0);
  const [alertMessage, setAlertMessage] = useState({
    isError: false,
    message: "",
  });
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
      {!!alertMessage.message && (
        <Alert
          isError={alertMessage.isError}
          onCloseAlert={() => setAlertMessage({ message: "" })}
        >
          {alertMessage.message}
        </Alert>
      )}
      <header className="flex items-end gap-1 md:p-5 md:gap-3">
        <div className="ring-white   bg-violet-100 rounded-xl">
          {currentLeague.img ? (
            <img
              src={currentLeague.img}
              className={"w-16 md:w-20 aspect-square p-1 rounded-xl"}
            />
          ) : (
            <PhotoIcon
              pathClassName={"stroke-violet-400"}
              svgClassName={"w-16 md:w-20 aspect-square p-1 rounded-xl"}
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row grow items-baseline gap-0 md:gap-3">
          <h1 className="p-0">{currentLeague.name}</h1>
          <h2 className="text-lg md:text-2xl">{currentLeague.description}</h2>
        </div>
        {isOwner && (
          <Dropdown label="Edit" dismissOnClick={true}>
            <Dropdown.Item
              size="sm"
              color={"light"}
              onClick={() => setShowEditLeagueModal(true)}
              name={"Edit league info"}
            >
              <PencilIcon svgClassName={"w-6 h-6"} />
              {"Edit info"}
            </Dropdown.Item>
            <Dropdown.Item
              size="sm"
              color={"light"}
              onClick={() => setShowNewTeamModal(true)}
              name={"Add new team"}
            >
              <PlusIcon />
              {"New Team"}
            </Dropdown.Item>
            <Dropdown.Item
              size="sm"
              color={"light"}
              onClick={() => setShowNewMatchModal(true)}
              name={"Add new match"}
            >
              <PlusIcon />
              {"New Match"}
            </Dropdown.Item>
            <Dropdown.Item
              size="sm"
              color={"light"}
              onClick={() => setShowNewPlayerModal(true)}
              name={"Add new Player"}
            >
              <PlusIcon />
              {"New Player"}
            </Dropdown.Item>
          </Dropdown>
        )}
      </header>

      <StepsNavigation
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        steps={["Classification", "Matches", "Players"]}
      />
      {selectedTab === 0 && (
        <Classification
          data={teamsData}
          isLoading={teamsIsLoading}
          isOwner={isOwner}
        />
      )}
      {selectedTab === 1 && (
        <MatchesCalendar
          teams={teamsData}
          matchesData={matchesData}
          matchesIsLoading={matchesIsLoading}
          playersData={playersData}
          teamsData={teamsData}
          isOwner={isOwner}
        />
      )}
      {selectedTab === 2 && (
        <PlayersList
          teamsData={teamsData}
          teamsIsLoading={teamsIsLoading}
          playersData={playersData}
          playersIsLoading={playersIsLoading}
          isOwner={isOwner}
        />
      )}

      {showEditLeagueModal && (
        <Modal
          onCloseModal={() => setShowEditLeagueModal(false)}
          title={"Edit League"}
        >
          <EditLeagueForm
            leagueToEdit={currentLeague}
            onCloseModal={() => setShowEditLeagueModal(false)}
            setAlertMessage={setAlertMessage}
          />
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
            setAlertMessage={setAlertMessage}
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
            closeModal={() => setShowNewPlayerModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
