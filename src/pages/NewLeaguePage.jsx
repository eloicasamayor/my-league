import { useRef } from "react";
import { PlusIcon } from "../components/icons/PlusIcon";
import { useState } from "react";

export function NewLeaguePage() {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [selectedTab, setSelectedTab] = useState(0);
  const [teams, setTeams] = useState([]);
  const [matchings, setMatchings] = useState([]);

  function generateMatchings() {
    const matches = [];
    teams.forEach((team) => {
      let matchingsJornada1 = [];
      teams.forEach(
        (team, i) =>
          i % 2 === 0 &&
          matchingsJornada1.push({
            local: team,
            visitor: teams[i + 1] ?? "",
          })
      );
      matches.push(matchingsJornada1);
      matchingsJornada1 = [];
      teams.push(teams.shift());
    });
    console.log(matches);
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
                  <label>{"Team " + (i + 1)}</label>
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
                varTeams.push("team " + (teams.length + 1));
                setTeams(varTeams);
              }}
            >
              <PlusIcon />
            </button>
          </form>
        </section>
      )}
      {selectedTab === 2 && (
        <section style={{ maxWidth: "1hv" }}>
          <h2>Generate matchings</h2>
          <button onClick={() => generateMatchings()}>Generate</button>
          <pre style={{ maxWidth: "100%" }}>{JSON.stringify(matchings)}</pre>
        </section>
      )}
    </>
  );
}
