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

// Helpers
import { getMatchings } from "../helpers/getMatchings";
import { getFirstMatchDay } from "../helpers/getFirstMatchDay";
import { shuffle } from "../helpers/shuffle";
import { nameToUrlName } from "../helpers/nameToUrlName";
import { saveNewLeague } from "../helpers/saveNewLeague";
import { addDays, format, endOfDay } from "date-fns";

// Constants
import { WEEK_DAYS } from "../components/constants/dates";
import { UploadIcon } from "../components/icons/ArrowBackIcon copy";

export function NewLeaguePage() {
  const [insertLeague, newLeagueReqResult] = useInsertLeagueMutation();
  const [insertTeam, newTeamReqResult] = useInsertTeamMutation();
  const [insertMatch, newMatchreqResult] = useInsertMatchMutation();

  const authData = useSelector((state) => state.auth);

  const [leagueName, setLeagueName] = useState(() => nowDate());
  const [leagueDescription, setLeagueDescription] = useState(
    "New league description"
  );

  const [selectedTab, setSelectedTab] = useState(0);
  const [startingDateValue, setStartingDateValue] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [weekDayValue, setWeekDayValue] = useState("6");
  const [teams, setTeams] = useState([]);

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

  useEffect(() => {
    if (newLeagueReqResult.isError) {
      setAlertMessage(JSON.stringify(newLeagueReqResult.error));
    }
    if (newLeagueReqResult.isSuccess) {
      setAlertMessage("league created successfully");
    }
  }, [JSON.stringify(newLeagueReqResult)]);

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
        <Alert onCloseAlert={setAlertMessage}>
          <p>{alertMessage}</p>
        </Alert>
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
                <div className="flex">
                  <div className="relative w-full">
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

          {/* <button>
            <PlusIcon />
          </button> */}
        </section>
      )}
      {selectedTab === 2 && (
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
