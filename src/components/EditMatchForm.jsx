// Dependencies
import { useState, useEffect, useRef } from "react";

// Api
import { useUpdateMatchMutation } from "../redux";

export function EditMatchForm({ matchToEdit, playersData, teamsData }) {
  const {
    id,
    localTeam,
    visitorTeam,
    played,
    localGoals,
    visitorGoals,
    localScorers,
    visitorScorers,
  } = matchToEdit;
  const [updateMatch, requestResult] = useUpdateMatchMutation();
  const [playedValue, setPlayedValue] = useState();
  const [localGoalsValue, setLocalGoalsValue] = useState();
  const [visitorGoalsValue, setVisitorGoalsValue] = useState();

  useEffect(() => {
    setLocalGoalsValue(localGoals);
    setVisitorGoalsValue(visitorGoals);
    setPlayedValue(played);
  }, [id]);

  const idRef = useRef();
  const localScorersRef = useRef([]);
  const visitorScorersRef = useRef([]);

  function renderScorersInputs(team, goals, scorersList, refList) {
    var elements = [];

    const teamPlayers = playersData.filter((player) => player.team === team);
    for (let i = 0; i < goals; i++) {
      elements.push(
        <>
          <select key={i + "_" + team} ref={(el) => (refList.current[i] = el)}>
            {teamPlayers.map((player) => (
              <option
                key={player.id}
                value={player.id}
                {...(player.id === scorersList[i])}
              >
                {player.name}
              </option>
            ))}
          </select>
        </>
      );
    }
    return elements;
  }
  return (
    <>
      <h2>Edit Match</h2>
      <form>
        <label style={{ display: "none" }} htmlFor={"id"}>
          Id:
        </label>
        <input
          style={{ display: "none" }}
          type={"text"}
          id={"id"}
          name={"id"}
          defaultValue={id}
          ref={idRef}
          disabled
        />
        <div>
          <label htmlFor={"played"}>Played:</label>
          <input
            type={"checkbox"}
            id={"played"}
            name={"played"}
            checked={playedValue}
            onChange={(e) => {
              setPlayedValue(e.target.checked);
            }}
          />
        </div>
        {playedValue && (
          <>
            <label htmlFor={"localGoals"}>
              {"Local team: " +
                teamsData.find((team) => team.id === localTeam).name}
            </label>
            <input
              type={"number"}
              id={"localGoals"}
              name={"localGoals"}
              placeholder={"local goals"}
              min={0}
              max={999}
              onChange={(e) => {
                setLocalGoalsValue(parseInt(e.target.value));
              }}
              value={localGoalsValue}
            />

            {localGoalsValue && (
              <div>
                <label>{"local scorers:"}</label>
                {localScorers ? (
                  renderScorersInputs(
                    localTeam,
                    localGoalsValue,
                    localScorers,
                    localScorersRef
                  )
                ) : (
                  <span>{"no players found in the team :("}</span>
                )}
              </div>
            )}

            <label htmlFor={"description"}>
              {"Visitor team: " +
                teamsData.find((team) => team.id === visitorTeam).name}
            </label>
            <input
              type={"number"}
              id={"visitorGoals"}
              name={"visitorGoals"}
              value={visitorGoalsValue}
              onChange={(e) => {
                setVisitorGoalsValue(parseInt(e.target.value));
              }}
              placeholder={"visitor scorers"}
            />
            {visitorGoalsValue && (
              <div>
                <label>{"visitor scorers:"}</label>
                {visitorScorers ? (
                  renderScorersInputs(
                    visitorTeam,
                    visitorGoalsValue,
                    visitorScorers,
                    visitorScorersRef
                  )
                ) : (
                  <span>{"no players found in this team :("}</span>
                )}
              </div>
            )}
          </>
        )}
        <br />
        <button
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            localScorersRef.current = localScorersRef.current.slice(
              0,
              localGoalsValue
            );
            visitorScorersRef.current = visitorScorersRef.current.slice(
              0,
              visitorGoalsValue
            );
            updateMatch({
              id,
              played: playedValue,
              local_goals: localGoalsValue,
              visitor_goals: visitorGoalsValue,
              local_scorers:
                localScorersRef.current.map((ref) => ref?.value) || "",
              visitor_scorers: visitorScorersRef.current.map(
                (ref) => ref?.value
              ),
            });
          }}
        >
          submit
        </button>
        <span>{requestResult.error?.data?.message || ""}</span>
      </form>
    </>
  );
}
