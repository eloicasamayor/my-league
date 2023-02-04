import { useRef } from "react";
import { PlusIcon } from "../components/icons/PlusIcon";
import { useState } from "react";

// Components
import { StepsNavigation } from "../components/StepsNavigation";
import { LeagueDay } from "../components/LeagueDay";
import { WeekDaySelect } from "../components/WeekDaySelect";
import { ArrowBackIcon } from "../components/icons/ArrowBackIcon";
import { TrashIcon } from "../components/icons/TrashIcon";

// Helpers
import { getMatchings } from "../helpers/getMatchings";
import { getFirstMatchDay } from "../helpers/getFirstMatchDay";
import { shuffle } from "../helpers/shuffle";
import { UpdateIcon } from "../components/icons/UpdateIcon";
import { addDays, format } from "date-fns";

// Constants
import { WEEK_DAYS } from "../components/constants/dates";

export function NewLeaguePage() {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [selectedTab, setSelectedTab] = useState(0);
  const [startingDateValue, setStartingDateValue] = useState();
  const [weekDayValue, setWeekDayValue] = useState();
  const [teams, setTeams] = useState([]);

  // objecte jornadas [{date: <>, matches: [<>, <>]}]
  const [matchings, setMatchings] = useState([]);

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
    <>
      <h1>New league</h1>
      <StepsNavigation
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        onSelectMatchings={onSelectMatchings}
      />
      {selectedTab === 0 && (
        <section>
          <h2>League info</h2>
          <form className="flex flex-col gap-2">
            <label htmlFor={"name"}>League name:</label>
            <input type={"text"} id={"name"} name={"name"} ref={nameRef} />
            <label htmlFor={"description"}>Description:</label>
            <input
              type={"text"}
              id={"description"}
              name={"description"}
              ref={descriptionRef}
            />
          </form>
        </section>
      )}
      {selectedTab === 1 && (
        <section>
          <h2>Teams</h2>
          <form className="flex flex-col gap-2">
            {teams.map((team, i) => {
              return (
                <div>
                  <input
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
                  <button>
                    <TrashIcon />
                  </button>
                </div>
              );
            })}
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  let varTeams = [...teams];
                  varTeams.push(teams.length + 1);
                  setTeams(varTeams);
                  setMatchings([]);
                }}
              >
                <PlusIcon />
              </button>
            </div>
          </form>
        </section>
      )}
      {selectedTab === 2 && (
        <section>
          <h2>Dates</h2>
          <form className="flex flex-col">
            <label htmlFor="starting-day">The league will start</label>
            <input
              value={startingDateValue}
              type={"date"}
              name="starting day"
              id="starting-day"
              onChange={(e) => setStartingDateValue(e.target.value)}
              defaultValue={new Date().toLocaleDateString("es-ES")}
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
      {selectedTab === 3 && (
        <section className="flex flex-col">
          <h2>Matchings</h2>
          <div className="flex">
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
    </>
  );
}
