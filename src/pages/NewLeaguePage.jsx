// Dependencies
import { useSelector } from "react-redux";
import {
  useInsertLeagueMutation,
  useInsertTeamMutation,
  useInsertMatchMutation,
} from "../redux";
import { PlusIcon } from "../components/icons/PlusIcon";
import { useRef, useState, useEffect } from "react";

// Components
import { StepsNavigation } from "../components/StepsNavigation";
import { LeagueDay } from "../components/LeagueDay";
import { WeekDaySelect } from "../components/WeekDaySelect";
import { ArrowBackIcon } from "../components/icons/ArrowBackIcon";
import { TrashIcon } from "../components/icons/TrashIcon";
import { UpdateIcon } from "../components/icons/UpdateIcon";
import { Alert } from "../components/Alert";
import { UploadIcon } from "../components/icons/UploadIcon";
import { CircleCheckIcon } from "../components/icons/CircleCheckIcon";

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

  const [alertMessage, setAlertMessage] = useState("");

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
    if (
      newLeagueReqResult.isSuccess &&
      newTeamReqResult.isSuccess &&
      newMatchReqResult.isSuccess
    )
      return (
        <>
          <p>
            <CircleCheckIcon svgClassName={"inline"} /> League created
          </p>
          <p>
            <CircleCheckIcon svgClassName={"inline"} /> Teams created
          </p>
          <p>
            <CircleCheckIcon svgClassName={"inline"} /> Matches created
          </p>
          <hr />
          <Link to={nameToUrlName(`../${leagueName}`)}>
            {"Go to the league page"}
          </Link>
        </>
      );
  }
  useEffect(() => {
    setAlertMessage(setMessage());
  }, [
    JSON.stringify(newLeagueReqResult),
    JSON.stringify(newTeamReqResult),
    JSON.stringify(newMatchReqResult),
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
      {alertMessage && (
        <Alert onCloseAlert={setAlertMessage}>{alertMessage}</Alert>
      )}
      <form className="flex flex-col sm:flex-row">
        <div className="relative w-full">
          <label className="special-label" htmlFor={"name"}>
            League name
          </label>
          <input
            className="text-xl special-input leading-9"
            type={"text"}
            id={"name"}
            name={"name"}
            placeholder={"League Name"}
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />
        </div>
        <div className="relative w-full">
          <label className="special-label" htmlFor={"description"}>
            Description
          </label>
          <input
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
      />
      {selectedTab === 0 && (
        <section className="bg-zinc-900 px-2 py-4">
          <form className="flex flex-col gap-2">
            {teams.map((team, i) => {
              return (
                <div className="flex w-full" key={"parent" + i}>
                  <div className="relative w-full" key={"div" + i}>
                    <input
                      className="special-input text-xl p-2 text-center"
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
                    <button
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
                    </button>
                  </div>
                </div>
              );
            })}
            <div>
              <button
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
              </button>
            </div>
          </form>
        </section>
      )}
      {selectedTab === 1 && (
        <section className="bg-zinc-900 px-2 py-4">
          {teams.map((team, teamIndex) => (
            <div className="flex flex-col gap-1 pb-5">
              <h2 className="w-full">{team}</h2>
              {players[teamIndex].map((player, i) => (
                <div className="relative w-full">
                  <input
                    type={"text"}
                    value={player}
                    className="special-input text-xl p-2 text-center w-full"
                    onChange={(e) => {
                      e.preventDefault();
                      const playersCopy = [...players];
                      const thisTeamCopy = [...playersCopy[teamIndex]];
                      thisTeamCopy[i] = e.target.value;
                      playersCopy[teamIndex] = thisTeamCopy;
                      setPlayers(playersCopy);
                    }}
                  />
                  <button
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
                  </button>
                </div>
              ))}
              <button
                className="w-full"
                onClick={(e) => {
                  debugger;
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
              </button>
            </div>
          ))}
        </section>
      )}
      {selectedTab === 2 && (
        <section className="bg-zinc-900 px-2 py-4">
          <form className="flex flex-col">
            <label htmlFor="starting-day">The league will start</label>
            <input
              value={startingDateValue}
              type={"date"}
              name="starting day"
              id="starting-day"
              onChange={(e) => setStartingDateValue(e.target.value)}
            ></input>

            <label htmlFor="day-of-the-week">There will be matches on </label>

            <WeekDaySelect
              value={weekDayValue}
              options={WEEK_DAYS.map((day, i) => ({ value: i, label: day }))}
              onChange={(e) => setWeekDayValue(e)}
            />
          </form>
        </section>
      )}
      {selectedTab === 3 && (
        <section className="flex flex-col bg-zinc-900 px-2 py-4">
          <div className="flex gap-2 pb-2">
            <button
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
            </button>
            <button
              onClick={() => setMatchings(resetMatchingsDates(matchings))}
            >
              <ArrowBackIcon />
              Reset dates
            </button>
            <div className="grow"></div>
            <button
              onClick={() => {
                saveNewLeague({
                  leagueName,
                  leagueDescription,
                  ownerId: authData?.user?.id,
                  teams,
                  matchings,
                  insertLeague,
                  insertTeam,
                  insertMatch,
                  setAlertMessage,
                });
              }}
            >
              <UploadIcon />
              Save
            </button>
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
        </section>
      )}
    </div>
  );
}
