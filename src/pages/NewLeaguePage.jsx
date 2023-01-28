import { useRef } from "react";
import { PlusIcon } from "../components/icons/PlusIcon";
import { useState } from "react";
import { arrayMoveImmutable } from "array-move";

// Helpers
import { getMatchings } from "../helpers/getMatchings";

export function NewLeaguePage() {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [selectedTab, setSelectedTab] = useState(0);
  const [teams, setTeams] = useState([]);
  const [matchings, setMatchings] = useState([]);

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
          <button onClick={() => setMatchings(getMatchings(teams))}>
            Generate
          </button>
          <div>
            <ul>
              {matchings.map((jornada, i) => {
                const equiposQueJuegan = [];
                jornada.forEach((e) => equiposQueJuegan.push(...e));
                debugger;
                const equiposQueDescansan = teams.filter((t) => {
                  const ret = !equiposQueJuegan.find((e) => e === t);
                  debugger;
                  return ret;
                });
                return (
                  <>
                    {i === matchings.length / 2 && <p>-------</p>}
                    <li>
                      - Jornada {i} {JSON.stringify(jornada)}
                      {!!equiposQueDescansan.length &&
                        `descansan ${equiposQueDescansan}`}
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
