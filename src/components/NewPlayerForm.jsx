// Dependencies
import { useInsertPlayerMutation } from "../redux";
import { useRef } from "react";

export function NewPlayerForm({ teamsData, teamsIsLoading }) {
  const [insertPlayer, requestResult] = useInsertPlayerMutation();
  const nameRef = useRef();
  const teamRef = useRef();

  if (teamsIsLoading) {
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
          {teamsData &&
            teamsData.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
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
        <span>{requestResult.error?.data?.message || ""}</span>
      </form>
    </>
  );
}
