import { useRef } from "react";
import { PlusIcon } from "../components/icons/PlusIcon";
import { useState } from "react";

// Components
import { StepsNavigation } from "../components/StepsNavigation";
import { LeagueDay } from "../components/LeagueDay";

// Helpers
import { getMatchings } from "../helpers/getMatchings";
import { shuffle } from "../helpers/shuffle";
import { UpdateIcon } from "../components/icons/UpdateIcon";
import { addDays, endOfToday, nextSunday } from "date-fns";

export function NewLeaguePage() {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [selectedTab, setSelectedTab] = useState(0);
  const [teams, setTeams] = useState([]);
  const [matchings, setMatchings] = useState([]);

  function addDatesToMatchings(matchings) {
    const date = endOfToday();
    let firstDay = nextSunday(date);
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

  function onSelectMatchings() {
    setMatchings(addDatesToMatchings(getMatchings(teams)));
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
              );
            })}
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
          </form>
        </section>
      )}
      {selectedTab === 2 && (
        <section>
          <h2>Dates</h2>
          <form>
            <label for="day-of-the-week">day of the week:</label>

            <select
              name="day-of-the-week"
              id="day-of-the-week"
              defaultValue={"sunday"}
            >
              <option value="monday">monday</option>
              <option value="tuesday">tuesday</option>
              <option value="wednesday">wednesday</option>
              <option value="thursday">thursday</option>
              <option value="friday">friday</option>
              <option value="saturday">saturday</option>
              <option value="sunday">sunday</option>
            </select>
          </form>

          <label>period</label>
          <select name="day-of-the-week" id="day-of-the-week">
            <option value="every week">every week</option>
            <option value="every 2 weeks">every 2 weeks</option>
            <option value="every 3 weeks">every 3 weeks</option>
            <option value="every 4 weeks">every 4 weeks</option>
          </select>
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
                setMatchings(addDatesToMatchings(getMatchings(teamsCopy)));
              }}
              className={"flex items-center justify-center"}
            >
              <UpdateIcon />
              Shulffle
            </button>
            <div>
              <p>Dates</p>
            </div>
          </div>
          <div>
            <ul className="flex flex-col gap-2">
              {matchings.map((jornada, indexJornada) => (
                <LeagueDay
                  indexJornada={indexJornada}
                  teams={teams}
                  jornada={jornada}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
