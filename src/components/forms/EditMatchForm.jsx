// Dependencies
import { useState, useEffect, useRef } from "react";

// Api
import { useUpdateMatchMutation, useDeleteMatchMutation } from "../../redux";
import { TrashIcon } from "../icons";

// Components
import { Button, Checkbox, TextInput, Select } from "flowbite-react";

export function EditMatchForm({
  matchToEdit,
  playersData,
  teamsData,
  setAlertMessage,
  closeModal,
}) {
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
  const [deleteMatch] = useDeleteMatchMutation();

  /** @type {[boolean | undefined, Function]} */
  const [playedValue, setPlayedValue] = useState();
  /** @type {[number | undefined, Function]} */
  const [localGoalsValue, setLocalGoalsValue] = useState();
  /** @type {[number | undefined, Function]} */
  const [visitorGoalsValue, setVisitorGoalsValue] = useState();

  useEffect(() => {
    setLocalGoalsValue(localGoals);
    setVisitorGoalsValue(visitorGoals);
    setPlayedValue(played);
  }, [id]);

  /** @type {import("react").MutableRefObject} */
  const idRef = useRef();
  const localScorersRef = useRef([]);
  const visitorScorersRef = useRef([]);

  function renderScorersInputs(team, goals, scorersList, refList) {
    var elements = [];

    const teamPlayers = playersData.filter((player) => player.team === team);
    for (let i = 0; i < goals; i++) {
      elements.push(
        <>
          <Select
            key={i + "_" + team}
            ref={(el) => (refList.current[i] = el)}
            defaultValue={scorersList?.[i] ?? 0}
          >
            {teamPlayers.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </Select>
        </>
      );
    }
    return elements;
  }

  return (
    <>
      <form className="flex flex-col gap-2">
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
        <div className="flex justify-center items-center gap-2">
          <Checkbox
            id={"played"}
            name={"played"}
            checked={playedValue}
            onChange={(e) => {
              setPlayedValue(e.target.checked);
            }}
          />
          <label htmlFor={"played"}>Played match</label>
        </div>
        {
          <div className="flex justify-evenly">
            <div className="w-full">
              <div>
                <p className="text-sm text-right">Local team</p>
                <h3 className="text-2xl text-right">
                  {teamsData.find((team) => team.id === localTeam).name}
                </h3>
              </div>
              {playedValue && (
                <div className="flex flex-col">
                  <label className="text-sm">Scored goals</label>
                  <TextInput
                    type={"number"}
                    id={"localGoals"}
                    name={"localGoals"}
                    placeholder={"local goals"}
                    min={0}
                    max={99}
                    onChange={(e) => {
                      if (parseInt(e.target.value) <= 20) {
                        setLocalGoalsValue(parseInt(e.target.value));
                      }
                    }}
                    value={localGoalsValue}
                  />
                </div>
              )}
              {playedValue && !!localGoalsValue && (
                <div className="mt-2">
                  <label className="text-sm">{"Local scorers:"}</label>
                  {renderScorersInputs(
                    localTeam,
                    localGoalsValue,
                    localScorers,
                    localScorersRef
                  )}
                </div>
              )}
            </div>
            <div className="p-6">vs</div>
            <div className="w-full">
              <p className="text-sm">Visitor team</p>
              <h3 className="text-2xl" htmlFor={"description"}>
                {teamsData.find((team) => team.id === visitorTeam).name}
              </h3>

              {playedValue && (
                <>
                  <label className="text-sm">Scored goals</label>

                  <TextInput
                    min={0}
                    type={"number"}
                    id={"visitorGoals"}
                    name={"visitorGoals"}
                    value={visitorGoalsValue}
                    onChange={(e) => {
                      if (parseInt(e.target.value) <= 20) {
                        setVisitorGoalsValue(parseInt(e.target.value));
                      }
                    }}
                    placeholder={"Visitor scorers"}
                  />
                </>
              )}
              {playedValue && !!visitorGoalsValue && (
                <div className="mt-2">
                  <label className="text-sm">{"Visitor scorers:"}</label>
                  {renderScorersInputs(
                    visitorTeam,
                    visitorGoalsValue,
                    visitorScorers,
                    visitorScorersRef
                  )}
                </div>
              )}
            </div>
          </div>
        }
        <br />
        <Button
          onClick={async (e) => {
            e.preventDefault();
            localScorersRef.current = localScorersRef.current.slice(
              0,
              localGoalsValue
            );
            visitorScorersRef.current = visitorScorersRef.current.slice(
              0,
              visitorGoalsValue
            );

            const updateMatchReqRes = await updateMatch({
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
            if ("error" in updateMatchReqRes) {
              setAlertMessage({
                message:
                  "There was an error updating the match: " +
                  updateMatchReqRes.error.message,
                isError: true,
              });
            } else {
              setAlertMessage({
                message: "Match updated correctly",
                isError: false,
              });
              closeModal();
            }
          }}
        >
          submit
        </Button>
        <span>{requestResult.error?.data?.message || ""}</span>
      </form>
      <Button
        color={"failure"}
        onClick={() => {
          deleteMatch({ id: id });
          closeModal();
        }}
      >
        <TrashIcon /> {"Delete match"}
      </Button>
    </>
  );
}
