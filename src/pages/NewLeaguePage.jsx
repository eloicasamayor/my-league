// Dependencies
import { useSelector } from "react-redux";
import {
  useInsertLeagueMutation,
  useInsertTeamMutation,
  useInsertMatchMutation,
  useInsertPlayerMutation,
} from "../redux";
import { PlusIcon } from "../components/icons/PlusIcon";
import { useRef, useState, useEffect } from "react";

// Components
import { StepsNavigation } from "../components";
import { LeagueDay } from "../components";
import { WeekDaySelect } from "../components";
import { ArrowBackIcon } from "../components/icons";
import { TrashIcon } from "../components/icons";
import { UpdateIcon } from "../components/icons";
import { Alert } from "../components";
import { UploadIcon } from "../components/icons";
import { CircleCheckIcon } from "../components/icons";
import { TextInput, Button, Card } from "flowbite-react";

// Helpers
import { getMatchings } from "../helpers/getMatchings";
import { getFirstMatchDay } from "../helpers/getFirstMatchDay";
import { shuffle } from "../helpers/shuffle";
import { saveNewLeague } from "../helpers/saveNewLeague";
import { addDays, format, endOfDay } from "date-fns";
import { nameToUrlName } from "../helpers/nameToUrlName";

// Constants
import { WEEK_DAYS } from "../components/constants/dates";
import { Link } from "react-router-dom";

export function NewLeaguePage() {
  const [insertLeague, newLeagueReqResult] = useInsertLeagueMutation();
  const [insertTeam, newTeamReqResult] = useInsertTeamMutation();
  const [insertMatch, newMatchReqResult] = useInsertMatchMutation();
  const [insertPlayer, newPlayerReqResult] = useInsertPlayerMutation();

  const authData = useSelector((state) => state.auth);

  const [leagueName, setLeagueName] = useState("");
  const [leagueDescription, setLeagueDescription] = useState("");

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

  function nowDate() {
    const now = new Date();
    return `New league ${format(now, "yyyy-MM-dd hh-mm")}`;
  }

  function addDatesToMatchings(matchings) {
    let firstDay = getFirstMatchDay({
      dayOfTheWeek: weekDayValue,
      startingDay: startingDateValue,
    });
    let day = firstDay;

    const matchingsWithDates = matchings.map((matchs, i) => {
      if (i !== 0) {
        day = addDays(day, 7);
      }
      return {
        matches: matchs,
        date: day,
      };
    });
    return matchingsWithDates;
  }
  function shuffleMatchings(matchings, teamsCopy) {
    return matchings.map((m, i) => ({ ...m, matches: teamsCopy[i] }));
  }

  function setMessage() {
    if (newLeagueReqResult.isError) {
      return (
        <>
          <h2>{`Error creating the league`}</h2>
          <p>{`Error code: ${newLeagueReqResult.error.code}`}</p>
          <p>{`${newLeagueReqResult.error.message}`}</p>
        </>
      );
    }
    if (newTeamReqResult.isError) {
      return (
        <>
          <h2>{`Error creating the teams ${newTeamReqResult.error.code}`}</h2>
          <p>{`${newTeamReqResult.error.message}`}</p>
        </>
      );
    }
    if (newMatchReqResult.isError) {
      return (
        <>
          <h2>{`Error creating the teams ${newMatchReqResult.error.code}`}</h2>
          <p>{`${newMatchReqResult.error.message}`}</p>
        </>
      );
    }
    if (newPlayerReqResult.isError) {
      return (
        <>
          <h2>{`Error creating the players ${newPlayerReqResult.error.code}`}</h2>
          <p>{`${newPlayerReqResult.error.message}`}</p>
        </>
      );
    }
    if (
      !newLeagueReqResult.isError &&
      !newTeamReqResult.isError &&
      !newMatchReqResult.isError &&
      !newPlayerReqResult.isError
    )
      return (
        <>
          <h2>{`Created league ${leagueName}`}</h2>
          <p>
            <CircleCheckIcon svgClassName={"inline"} /> Teams
          </p>
          <p>
            <CircleCheckIcon svgClassName={"inline"} /> Matches
          </p>
          <p className="mb-5">
            <CircleCheckIcon svgClassName={"inline"} /> Players
          </p>

          <Link to={nameToUrlName(`../${leagueName}`)}>
            <Button>{"Go to the league page"}</Button>
          </Link>
        </>
      );
  }
  useEffect(() => {
    setAlertMessage({
      message: setMessage(),
      isError:
        newLeagueReqResult.isError ||
        newTeamReqResult.isError ||
        newMatchReqResult.isError ||
        newPlayerReqResult.isError,
    });
  }, [
    JSON.stringify(newLeagueReqResult),
    JSON.stringify(newTeamReqResult),
    JSON.stringify(newMatchReqResult),
    JSON.stringify(newPlayerReqResult),
  ]);

  function onSelectMatchings() {
    setMatchings(addDatesToMatchings(getMatchings(teams)));
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

  return (
    <div className="pt-2">
      {alertMessage.message && (
        <Alert onCloseAlert={setAlertMessage} isError={alertMessage.isError}>
          {alertMessage.message}
        </Alert>
      )}
      <form className="flex flex-col sm:flex-row">
        <div className="relative w-full">
          <label htmlFor={"name"}>League name</label>
          <TextInput
            // className="text-xl special-input leading-9"
            // type={"text"}
            id={"name"}
            name={"name"}
            placeholder={"League Name"}
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />
        </div>
        <div className="relative w-full">
          <label htmlFor={"description"}>Description</label>
          <TextInput
            className="text-lg special-input leading-9"
            type={"text"}
            id={"description"}
            placeholder={"League Description"}
            name={"description"}
            value={leagueDescription}
            onChange={(e) => setLeagueDescription(e.target.value)}
          />
        </div>
      </form>
      <StepsNavigation
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        onSelectMatchings={onSelectMatchings}
        steps={["Teams", "Players", "Dates", "Matchings"]}
      />
      {/* ---- Teams ---- */}
      {selectedTab === 0 && (
        <section className=" px-2 py-4">
          <form className="flex flex-col gap-2">
            {teams.map((team, i) => {
              return (
                <div className="flex w-full" key={"parent" + i}>
                  <div className="relative w-full" key={"div" + i}>
                    <TextInput
                      key={"-" + i}
                      type={"text"}
                      value={team}
                      onChange={(e) => {
                        e.preventDefault();
                        let varTeams = [...teams];
                        varTeams[i] = e.target.value;
                        setTeams(varTeams);
                        setMatchings([]);
                      }}
                    />
                    <Button
                      size="sm"
                      className="absolute right-0 top-0"
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
                  varTeams.push(`New team ${teams.length + 1}`);
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
      {selectedTab === 1 && (
        <section className=" px-2 py-4">
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
                  <TextInput
                    id={`team${teamIndex}_player${player}`}
                    value={player}
                    className=" text-xl p-0 text-center w-full"
                    onChange={(e) => {
                      e.preventDefault();
                      const playersCopy = [...players];
                      const thisTeamCopy = [...playersCopy[teamIndex]];
                      thisTeamCopy[i] = e.target.value;
                      playersCopy[teamIndex] = thisTeamCopy;
                      setPlayers(playersCopy);
                    }}
                  />
                  <Button
                    size={"sm"}
                    className="absolute right-0 top-0"
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
                    `New player ${playersThisTeam.length + 1}`
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
      {selectedTab === 2 && (
        <section className=" px-2 py-4">
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
      {selectedTab === 3 && (
        <section className="flex flex-col  px-2 py-4">
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
                <Button
                  onClick={() => setMatchings(resetMatchingsDates(matchings))}
                >
                  <ArrowBackIcon />
                  Reset dates
                </Button>
                <div className="grow"></div>
                <Button
                  onClick={() => {
                    saveNewLeague({
                      leagueName,
                      leagueDescription,
                      ownerId: authData?.user?.id,
                      teams,
                      matchings,
                      players,
                      insertLeague,
                      insertTeam,
                      insertMatch,
                      insertPlayer,
                      setAlertMessage,
                    });
                  }}
                >
                  <UploadIcon />
                  Save
                </Button>
              </div>

              <div>
                <ul className="flex flex-col gap-2">
                  {matchings.map((jornada, indexJornada) => {
                    return (
                      <LeagueDay
                        key={indexJornada}
                        indexJornada={indexJornada}
                        teams={teams}
                        jornada={jornada}
                        matchings={matchings}
                        setMatchings={setMatchings}
                      />
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
