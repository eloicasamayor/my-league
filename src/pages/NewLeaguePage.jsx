// Dependencies
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import {
  useInsertLeagueMutation,
  useInsertTeamMutation,
  useInsertMatchMutation,
  useInsertPlayerMutation,
  matches,
  useUpdateLeagueMutation,
} from "../redux";
import { useState, useEffect, useRef } from "react";

// Components
import {
  PlusIcon,
  ArrowBackIcon,
  TrashIcon,
  UpdateIcon,
  TeamIcon,
  UserIcon,
  UploadIcon,
} from "../components/icons";
import {
  StepsNavigation,
  LeagueDayMatchings,
  LeagueDayDate,
  WeekDaySelect,
  Alert,
} from "../components";
import { TextInput, Button } from "flowbite-react";

// Helpers
import {
  saveNewLeague,
  getFirstMatchDay,
  shuffle,
  getMatchings,
  addDatesToMatchings,
  useWindowDimensions,
  shuffleMatchings,
} from "../helpers";
import { addDays, format } from "date-fns";

// Constants
import { WEEK_DAYS } from "../components/constants/dates";

export function NewLeaguePage() {
  const [insertLeague, newLeagueReqResult] = useInsertLeagueMutation();
  const [updateLeague, updateLeagueReqResult] = useUpdateLeagueMutation();
  const [insertTeam, newTeamReqResult] = useInsertTeamMutation();
  const [insertMatch, newMatchReqResult] = useInsertMatchMutation();
  const [insertPlayer, newPlayerReqResult] = useInsertPlayerMutation();

  const authData = useSelector((state) => state.auth);

  const [leagueName, setLeagueName] = useState("");
  const [leagueDescription, setLeagueDescription] = useState("");
  const imgRef = useRef();

  const [selectedTab, setSelectedTab] = useState(0);
  const [startingDateValue, setStartingDateValue] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [weekDayValue, setWeekDayValue] = useState("6");
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  // objecte jornadas [{date: <>, matches: [<>, <>]}]
  const [matchings, setMatchings] = useState([]);

  const [alertMessage, setAlertMessage] = useState({
    message: "",
    isError: false,
  });

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (selectedTab === 3) {
      onSelectMatchings();
    }
  }, [selectedTab]);

  function onSelectMatchings() {
    setMatchings(
      addDatesToMatchings({
        matchings: getMatchings(teams),
        weekDayValue,
        startingDateValue,
      })
    );
  }

  function resetMatchingsDates() {
    let firstDay = getFirstMatchDay({
      dayOfTheWeek: weekDayValue,
      startingDay: startingDateValue,
    });
    let day = firstDay;

    const matchingsWithDates = matchings.map((match, i) => {
      if (i !== 0) {
        day = addDays(day, 7);
      }
      return {
        ...match,
        date: day,
      };
    });
    return matchingsWithDates;
  }

  function reordenarPartidos(result) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let index1, index2, sum;
    if (destination.index < source.index) {
      index1 = destination.index;
      index2 = source.index;
      sum = -1;
    } else {
      index1 = source.index;
      index2 = destination.index;
      sum = 1;
    }

    const matchDaysCopy = matchings.map((matchDay, i) => {
      if (i < index1 || i > index2) {
        return matchDay;
      }
      if (i === destination.index) {
        return { ...matchings[i], matches: matchings[source.index].matches };
      }
      return { ...matchings[i], matches: matchings[i + sum].matches };
    });

    /* const matchesSource = matchings[source.index].matches;
    const matchesDestination = matchings[destination.index].matches;
    const newMatchings = [...matchings];
    newMatchings[source.index].matches = matchesDestination;
    newMatchings[destination.index].matches = matchesSource; */

    setMatchings([...matchDaysCopy]);
    // TODO: replantear un poco el drag-n-drop:
    // en realitat el que vull no és reordenar la llista, sino canviar els partits d'una jornada a una altra.
    // jo crec que la lògica hauria de ser aquí, però no sé si s'hauria de crear un id de cada jornada...
  }

  function skipThisWeek(indexJornada) {
    const restDay = {
      matches: [],
      date: matchings[indexJornada].date,
    };
    let matchingsCopy = [...matchings];
    matchingsCopy.splice(indexJornada, 0, restDay);
    matchingsCopy = matchingsCopy.map((m, i) => {
      if (i <= indexJornada) {
        return m;
      }
      return { ...m, date: addDays(m.date, 7) };
    });
    // matchingsCopy.splice(indexJornada, 0, {});

    setMatchings(matchingsCopy);
  }

  function playThisWeek(indexJornada) {
    let matchingsCopy = [...matchings];
    matchingsCopy.splice(indexJornada, 1);
    setMatchings(() => matchingsCopy);
  }

  const sectionsClassName = " px-2 py-4 md:mx-8 lg:mx-10 xl:mx-44 2xl:mx-96";

  const totalDivs = Math.ceil(teams.length / 2);
  const numColumnas = width < 768 ? 1 : 2;
  const totalFilas = Math.ceil(totalDivs / numColumnas);
  const heightJornada = totalFilas * 32 + 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const alert = await saveNewLeague({
      leagueName,
      leagueDescription,
      image: imgRef,
      ownerId: authData?.user?.id,
      teams,
      matchings,
      players,
      insertLeague,
      updateLeague,
      insertTeam,
      insertMatch,
      insertPlayer,
    });
    setAlertMessage(alert);
  };

  function reverseTeamsInMatch({ indexJornada, matchIndex }) {
    // Obtén el partido actual
    const data = [...matchings];
    const currentMatch = data[indexJornada].matches[matchIndex];
    const [teamA, teamB] = currentMatch;

    // Invierte el orden de los equipos en el partido actual
    const reversedMatch = [teamB, teamA];
    data[indexJornada].matches[matchIndex] = reversedMatch;

    // Busca y actualiza los otros partidos que involucran a los mismos equipos
    data.forEach((matchDay, dayIndex) => {
      if (dayIndex !== indexJornada) {
        matchDay.matches.forEach((match, matchIndex) => {
          if (match.includes(teamA) && match.includes(teamB)) {
            match.push(match.shift());
          }
        });
      }
    });

    setMatchings(data);
  }

  return (
    <div className="pt-2">
      {alertMessage.message && (
        <Alert
          onCloseAlert={() => setAlertMessage({ message: "", isError: false })}
          isError={alertMessage.isError}
        >
          {alertMessage.message}
        </Alert>
      )}

      <StepsNavigation
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        onSelectMatchings={onSelectMatchings}
        steps={["Info", "Teams", "Players", "Dates", "Matchings"]}
      />
      {/* ---- Teams ---- */}
      {selectedTab === 0 && (
        <div className="mx-2 mb-4 p-0.5 md:p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 md:mx-8 lg:mx-10 xl:mx-44 2xl:mx-96">
          <form
            className="flex flex-col sm:flex-row"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="relative w-full p-1 md:p-2">
              <input
                type="text"
                required
                minLength={3}
                className="w-full rounded-lg border-none focus:border-cyan-500"
                id={"name"}
                name={"name"}
                placeholder={"League Name"}
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
              />
            </div>
            <div className="relative w-full p-1 md:p-2 flex gap-2">
              <input
                type="text"
                required
                className="w-full rounded-lg border-none focus:border-cyan-500"
                id={"description"}
                placeholder={"League Description"}
                name={"description"}
                value={leagueDescription}
                onChange={(e) => setLeagueDescription(e.target.value)}
              />
            </div>
            <div className="relative w-full p-1 md:p-2 flex gap-2">
              <input type="file" ref={imgRef} />
            </div>
            <div className="relative w-full p-1 md:p-2 flex gap-2">
              <button
                type="submit"
                className="group flex h-min items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2"
              >
                <span className="flex items-stretch transition-all duration-200 rounded-md text-sm px-2 py-1 align-middle">
                  <UploadIcon />
                  Save
                </span>
              </button>
            </div>
          </form>
        </div>
      )}
      {selectedTab === 1 && (
        <section className={sectionsClassName}>
          <form className="flex flex-col gap-2">
            {teams.map((team, i) => {
              return (
                <div className="flex w-full" key={"parent" + i}>
                  <div className="relative w-full" key={"div" + i}>
                    <input
                      type="text"
                      className="text-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-14 pr-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      key={"-" + i}
                      value={team}
                      onChange={(e) => {
                        e.preventDefault();
                        let varTeams = [...teams];
                        varTeams[i] = e.target.value;
                        setTeams(varTeams);
                        setMatchings([]);
                      }}
                      autoFocus
                      onFocus={(event) => event.target.select()}
                    />
                    <div className="absolute left-0.5 top-0.5 flex items-center justify-center h-10 w-10 rounded-lg ring-0 ring-white bg-violet-100 p-1">
                      {team.img ? (
                        <img src={team.img} className={"w-4"} />
                      ) : (
                        <TeamIcon pathClassName={"stroke-violet-400"} />
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="absolute right-0.5 top-0.5"
                      onClick={(e) => {
                        e.preventDefault();
                        const teamsCopy = [...teams];
                        teamsCopy.splice(i, 1);
                        setTeams(teamsCopy);
                        const playersCopy = [...players];
                        playersCopy.splice(i, 1);
                        setPlayers(playersCopy);
                      }}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </div>
              );
            })}
            <div>
              <Button
                pill={true}
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  let varTeams = [...teams];
                  varTeams.push(`Team ${teams.length + 1}`);
                  setTeams(varTeams);
                  let varPlayers = [...players];
                  varPlayers.push([]);
                  setPlayers(varPlayers);
                  setMatchings([]);
                }}
              >
                <PlusIcon /> Add team
              </Button>
            </div>
          </form>
        </section>
      )}
      {/* ---- PLAYERS ---- */}
      {selectedTab === 2 && (
        <section className={sectionsClassName}>
          {teams.length === 0 && (
            <p className="text-sm text-center">
              {"You have to add teams before adding players"}
            </p>
          )}
          {teams.map((team, teamIndex) => (
            <div className="w-full flex flex-col gap-1 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h2 className="w-full">{team}</h2>
              {players[teamIndex].map((player, i) => (
                <div className="relative w-full p-0">
                  <input
                    type="text"
                    className="text-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-14 pr-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    id={`team${teamIndex}_player${player}`}
                    value={player}
                    onChange={(e) => {
                      e.preventDefault();
                      const playersCopy = [...players];
                      const thisTeamCopy = [...playersCopy[teamIndex]];
                      thisTeamCopy[i] = e.target.value;
                      playersCopy[teamIndex] = thisTeamCopy;
                      setPlayers(playersCopy);
                    }}
                    autoFocus
                    onFocus={(event) => event.target.select()}
                  ></input>
                  <div className="absolute left-0.5 top-0.5 flex items-center justify-center h-10 w-10 rounded-lg ring-0 ring-white bg-violet-100 p-1">
                    {team.img ? (
                      <img src={team.img} className={"w-4"} />
                    ) : (
                      <UserIcon pathClassName={"stroke-violet-400"} />
                    )}
                  </div>
                  <Button
                    size={"sm"}
                    className="absolute right-0.5 top-0.5"
                    onClick={(e) => {
                      e.preventDefault();
                      const playersCopy = [...players];
                      const thisTeamCopy = [...playersCopy[teamIndex]];
                      thisTeamCopy.splice(i, 1);
                      playersCopy[teamIndex] = thisTeamCopy;
                      setPlayers(playersCopy);
                    }}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ))}
              <Button
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  const varPlayers = [...players];
                  let playersThisTeam = [...(players?.[teamIndex] ?? [])];
                  playersThisTeam.push(
                    `${team} Player ${playersThisTeam.length + 1}`
                  );
                  varPlayers[teamIndex] = playersThisTeam;
                  setPlayers(varPlayers);
                }}
              >
                <PlusIcon /> Add player
              </Button>
            </div>
          ))}
        </section>
      )}
      {/* ---- DATES ---- */}
      {selectedTab === 3 && (
        <section className={sectionsClassName}>
          <form className="flex flex-col">
            <label className="text-sm" htmlFor="starting-day">
              The league will start
            </label>
            <input
              value={startingDateValue}
              type={"date"}
              name="starting day"
              id="starting-day"
              onChange={(e) => setStartingDateValue(e.target.value)}
            ></input>

            <WeekDaySelect
              value={weekDayValue}
              options={WEEK_DAYS.map((day, i) => ({ value: i, label: day }))}
              onChange={(e) => setWeekDayValue(e)}
            />
          </form>
        </section>
      )}
      {/* ---- MATCHINGS ---- */}
      {selectedTab === 4 && (
        <section className={sectionsClassName}>
          {matchings.length === 0 ? (
            <p className="text-sm text-center">
              {"You have to add teams so matchings can be generated"}
            </p>
          ) : (
            <>
              <div className="flex gap-2 pb-2">
                <Button
                  onClick={() => {
                    const teamsCopy = [...teams];
                    shuffle(teamsCopy);
                    setMatchings(
                      shuffleMatchings(matchings, getMatchings(teamsCopy))
                    );
                  }}
                  className={"flex items-center justify-center"}
                >
                  <UpdateIcon />
                  Shulffle
                </Button>
              </div>

              <div className="flex">
                <div className="w-[80px] flex flex-col gap-1">
                  {matchings.map((jornada, indexJornada) => {
                    return (
                      <LeagueDayDate
                        jornada={jornada}
                        indexJornada={indexJornada}
                        skipThisWeek={skipThisWeek}
                        heightJornada={heightJornada}
                        playThisWeek={playThisWeek}
                        teams={teams}
                      />
                    );
                  })}
                </div>
                <DragDropContext onDragEnd={reordenarPartidos}>
                  <Droppable droppableId={`matchings-${leagueName}`}>
                    {(provided, snapshot) => {
                      return (
                        <ul
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="flex flex-col gap-2 w-full my-[2px] pr-2"
                        >
                          {matchings.map((jornada, indexJornada) => {
                            return (
                              <LeagueDayMatchings
                                key={jornada.date.toString()}
                                indexJornada={indexJornada}
                                teams={teams}
                                jornada={jornada}
                                reverseTeamsInMatch={reverseTeamsInMatch}
                              />
                            );
                          })}
                          {provided.placeholder}
                        </ul>
                      );
                    }}
                  </Droppable>
                </DragDropContext>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
