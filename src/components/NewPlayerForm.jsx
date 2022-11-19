// Dependencies
import { useInsertPlayerMutation } from "../api/players";
import { useRef } from "react";
import { useGetTeamsQuery } from "../api/teams";

export function NewPlayerForm() {
  const [insertPlayer, requestResult] = useInsertPlayerMutation();
  const nameRef = useRef();
  const teamRef = useRef();
  const teams = useGetTeamsQuery();

  if (teams.isLoading) {
    return "holoi";
  }
  return (
    <>
      <h2>Create new player</h2>
      <form>
        <label htmlFor={"name"}>Name:</label>
        <input type={"text"} id={"name"} name={"name"} ref={nameRef} required />
        <br />
        <label htmlFor={"team"}>Team:</label>
        <select name="team" id="team" ref={teamRef} required>
          {teams.data &&
            teams.data.map((team) => (
              <option value={team.id}>{team.name}</option>
            ))}
        </select>
        <button
          onClick={(e) => {
            e.preventDefault();
            insertPlayer({
              name: nameRef.current.value,
              team: teamRef.current.value,
            });
          }}
        >
          submit
        </button>
      </form>
    </>
  );
}
