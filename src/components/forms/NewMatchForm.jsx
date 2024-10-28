// Dependencies
import { useInsertMatchMutation } from "../../redux";
import { useRef } from "react";

import { Button } from "flowbite-react";

export function NewMatchForm({
  teams,
  currentLeague,
  closeModal,
  setAlertMessage,
}) {
  const [insertMatch, insertMatchReqResult] = useInsertMatchMutation();
  /** @type {import("react").MutableRefObject} */
  const dateRef = useRef();
  /** @type {import("react").MutableRefObject} */
  const localTeamRef = useRef();
  /** @type {import("react").MutableRefObject} */
  const visitorTeamRef = useRef();
  /** @type {import("react").MutableRefObject} */
  const matchDayRef = useRef();
  return (
    <>
      <form
        className="flex flex-col gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          const insertMatchReqResult = await insertMatch({
            date: dateRef.current.value,
            local_team: localTeamRef.current.value,
            visitor_team: visitorTeamRef.current.value,
            match_day: matchDayRef.current.value,
            league: currentLeague.id,
          });
          setAlertMessage({
            message:
              "error" in insertMatchReqResult
                ? "There was an error creating the new match: " +
                  insertMatchReqResult.error.message
                : "Match updated correctly",
            isError: insertMatchReqResult.error,
          });
        }}
      >
        <label htmlFor={"date"}>Date:</label>
        <input
          type={"datetime-local"}
          id={"date"}
          name={"date"}
          ref={dateRef}
          required
        />
        <br />
        <label htmlFor={"local_team"}>Local team:</label>
        <select name="local_team" id="local_team" ref={localTeamRef} required>
          {teams &&
            teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
        </select>
        <br />
        <label htmlFor={"visitor_team"}>Visitor team:</label>
        <select
          id={"visitor_team"}
          name={"visitor_team"}
          ref={visitorTeamRef}
          required
        >
          {teams &&
            teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
        </select>
        <br />
        <label htmlFor={"match day"}>Date:</label>
        <input
          type={"number"}
          id={"match_day"}
          name={"match_day"}
          ref={matchDayRef}
          defaultValue={1}
          min={1}
          max={99}
          required
        />
        <br />
        <Button type={"submit"}>submit</Button>
        <span>{NewMatchForm.error?.data?.message || ""}</span>
      </form>
    </>
  );
}
