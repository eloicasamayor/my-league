import { useRef } from "react";
import { PlusIcon } from "../components/icons/PlusIcon";
import { useState } from "react";
import { arrayMoveImmutable } from "array-move";

export function NewLeaguePage() {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [selectedTab, setSelectedTab] = useState(0);
  const [teams, setTeams] = useState([]);
  const [matchings, setMatchings] = useState([]);

  function generateMatchings() {
    const matches = [];
    if (teams.length % 2 !== 0) {
      teams.push("--");
    }
    const teamsLenght = teams.length;
    let teamsCopy = [...teams];

    [...Array(teamsLenght * 2)].forEach((team, jornada) => {
      let matchingsJornada1 = [];
      teamsCopy.forEach((team, i) => {
        i % 2 === 0 &&
          matchingsJornada1.push({
            local: team,
            visitor: teamsCopy[i + 1],
          });
      });
      matches.push(matchingsJornada1);
      matchingsJornada1 = [];
      teams.forEach((_, index) => {
        if (index % 2 === 0) {
          const from = jornada % 2 === 0 ? index : index + 1;
          const to = from + 1;
          teamsCopy = arrayMoveImmutable(teamsCopy, from, to);
        }
      });
    });
    setMatchings(matches);
  }

  return (
    <>
      <h1>New league</h1>
      <ol className="h-8 flex gap-2 m-2">
        <li className=" p-2 btn " onClick={() => setSelectedTab(0)}>
          1. League info
        </li>
        <li className=" p-2 btn" onClick={() => setSelectedTab(1)}>
          2. Teams
        </li>

        <li className=" p-2 btn" onClick={() => setSelectedTab(2)}>
          3. Matchings
        </li>
      </ol>
      {selectedTab === 0 && (
        <section>
          <h2>League info</h2>
          <div>
            <label>{"Name"}</label>
            <input type={"text"} ref={nameRef} />
          </div>
          <div>
            <label>{"Description"}</label>
            <input type={"text"} ref={descriptionRef} />
          </div>
          <div>
            <label>{"Logo"}</label>
            <input type={"file"} />
          </div>
        </section>
      )}
      {selectedTab === 1 && (
        <section>
          <h2>Teams</h2>
          <form>
            {teams.map((team, i) => {
              debugger;
              return (
                <div key={"-" + i}>
                  <label>{i + 1}</label>
                  <input
                    type={"text"}
                    value={team}
                    onChange={(e) => {
                      e.preventDefault();
                      let varTeams = [...teams];
                      varTeams[i] = e.target.value;
                      debugger;
                      setTeams(varTeams);
                    }}
                  />
                </div>
              );
            })}
            <button
              onClick={(e) => {
                e.preventDefault();
                let varTeams = [...teams];
                varTeams.push(teams.length + 1);
                setTeams(varTeams);
              }}
            >
              <PlusIcon />
            </button>
          </form>
        </section>
      )}
      {selectedTab === 2 && (
        <section className="flex flex-col">
          <h2>Generate matchings</h2>
          <button onClick={() => generateMatchings()}>Generate</button>
          <div>
            <ul>
              {matchings.map((jornada, i) => (
                <li>
                  --- Jornada {i} {JSON.stringify(jornada)}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
