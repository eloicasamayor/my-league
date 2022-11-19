// Dependencies
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

// Api
import { useUpdateLeagueMutation, useGetLeaguesQuery } from "../api/leagues";
import { useGetPlayersQuery } from "../api/players";
import { useGetTeamsQuery } from "../api/teams";
import { useUpdateMatchMutation } from "../api/matches";

export function EditMatchForm({
  id,
  localTeam,
  visitorTeam,
  played,
  localGoals,
  visitorGoals,
  localScorers,
  visitorScorers,
}) {
  const [updateMatch, requestResult] = useUpdateMatchMutation();
  const [playedValue, setPlayedValue] = useState();
  const [localGoalsValue, setLocalGoalsValue] = useState();
  const [visitorGoalsValue, setVisitorGoalsValue] = useState();

  const players = useGetPlayersQuery();
  const teams = useGetTeamsQuery();

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
    const teamPlayers = players.data.filter((player) => player.team === team);
    for (let i = 0; i < goals; i++) {
      elements.push(
        <>
          <select
            key={i + "_"}
            ref={(el) => (refList.current[i] = el)}
            value={scorersList.length && scorersList[i]}
          >
            {teamPlayers.map((player) => (
              <option value={player.id}>{player.name}</option>
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
                teams.data.find((team) => team.id === localTeam).name}
            </label>
            <input
              type={"number"}
              id={"localGoals"}
              name={"localGoals"}
              placeholder={"local goals"}
              onChange={(e) => {
                setLocalGoalsValue(parseInt(e.target.value));
              }}
              value={localGoalsValue}
            />

            {localGoalsValue && (
              <div>
                <label>{"local scorers:"}</label>
                {renderScorersInputs(
                  localTeam,
                  localGoalsValue,
                  localScorers,
                  localScorersRef
                )}
              </div>
            )}

            <label htmlFor={"description"}>
              {"Visitor team: " +
                teams.data.find((team) => team.id === visitorTeam).name}
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
                {renderScorersInputs(
                  visitorTeam,
                  visitorGoalsValue,
                  visitorScorers,
                  visitorScorersRef
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
            updateMatch({
              id,
              played: playedValue,
              local_goals: localGoalsValue,
              visitor_goals: visitorGoalsValue,
              local_scorers: localScorersRef.current.map((ref) => ref.value),
              visitor_scorers: visitorScorersRef.current.map(
                (ref) => ref.value
              ),
            });
          }}
        >
          submit
        </button>
      </form>
    </>
  );
}
