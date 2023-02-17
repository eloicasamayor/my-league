// Dependencies
import { useInsertPlayerMutation } from "../redux";
import { useRef } from "react";

import { Button } from "flowbite-react";

export function NewPlayerForm({ teamsData, teamsIsLoading }) {
  const [insertPlayer, requestResult] = useInsertPlayerMutation();
  const nameRef = useRef();
  const teamRef = useRef();

  if (teamsIsLoading) {
    return "loading...";
  }
  return (
    <>
      <form className="flex flex-col gap-2">
        <label htmlFor={"name"}>Name:</label>
        <input type={"text"} id={"name"} name={"name"} ref={nameRef} required />
        <label htmlFor={"team"}>Team:</label>
        <select name="team" id="team" ref={teamRef} required>
          {teamsData &&
            teamsData.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
        </select>
        <Button
          onClick={(e) => {
            e.preventDefault();
            insertPlayer({
              name: nameRef.current.value,
              team: teamRef.current.value,
            });
          }}
        >
          submit
        </Button>
        <span>{requestResult.error?.data?.message || ""}</span>
      </form>
    </>
  );
}
