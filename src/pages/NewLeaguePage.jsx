import { useRef } from "react";
import { PlusIcon } from "../components/icons/PlusIcon";
import { useState } from "react";
import { arrayMoveImmutable } from "array-move";

// Helpers
import { getCombinations } from "../helpers/getCombinations";

export function NewLeaguePage() {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [selectedTab, setSelectedTab] = useState(0);
  const [teams, setTeams] = useState([]);
  const [matchings, setMatchings] = useState([]);

  function generateMatchings() {
    let teamsCopy = [...teams];
    let totsElsPartits = getCombinations(teams, 2);
    const numJornades = teams.length - 1;
    const jornades = [];
    let ultimEquipQueHaDescansat = "";

    function crearArrayJornada(numJornada) {
      const jornada = [];
      if (ultimEquipQueHaDescansat) {
        teamsCopy = [
          ultimEquipQueHaDescansat,
          ...teams.filter((t) => t !== ultimEquipQueHaDescansat),
        ];
      }
      // iterar els equips

      // iterar els equips: per a cada equip he d'afegir un partit on aquest participi a la jornada. Si l'equip ja té un partit doncs el salto.
      teamsCopy.forEach((team) => {
        // per a cada equip, primer comprobo que no tingui un partit en la jornada
        if (
          totsElsPartits.length &&
          !jornada.find((partit) => partit[0] === team || partit[1] === team)
        ) {
          // si no té un partit en la jornada, buscaré en la llista totsElsPartits un partit on jugui aquest equip,
          // ---> l'altre equip no ha de tenir partit en la jordada!

          let partit = totsElsPartits.find((partit) => {
            return (
              (partit[0] === team &&
                !jornada.find(
                  (p) => p[0] === partit[1] || p[1] === partit[1]
                )) ||
              (partit[1] === team &&
                !jornada.find((p) => {
                  const ret = p[0] === partit[0] || p[1] === partit[0];
                  return ret;
                }))
            );
          });
          if (partit) {
            // el treuré de la llista de totsElsPartits
            totsElsPartits = totsElsPartits.filter(
              (p) => !(p[0] === partit[0] && p[1] === partit[1])
            );
            ultimEquipQueHaDescansat = "";
          } else {
            partit = [team, ""];
            ultimEquipQueHaDescansat = team;
          }

          // i l'afegeixo a la llista de la jornada
          jornada.push(partit);
        }
      });
      return jornada;
    }
    let numJornada = 0;
    while (totsElsPartits.length) {
      numJornada = numJornada + 1;
      jornades.push(crearArrayJornada(numJornada));
      debugger;
    }

    setMatchings(jornades);
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
