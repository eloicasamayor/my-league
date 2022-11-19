// Dependencies
import { useRef } from "react";
import { useUpdatePlayerMutation } from "../api/players";
import { useGetTeamsQuery } from "../api/teams";

export function EditMatchForm({ player }) {
  const { id, name, team } = player;
  const [editPlayer, requestResult] = useUpdatePlayerMutation();
  const nameRef = useRef();
  const teamRef = useRef();
  const teams = useGetTeamsQuery();
  console.log(player);

  if (teams.isLoading) {
    return "holoi";
  }
  return (
    <>
      <h2>Edit Player {player.name}</h2>
      <form>
        <label htmlFor={"name"}>Name:</label>
        <input
          type={"text"}
          id={"name"}
          name={"name"}
          // ref={nameRef}
          value={player.name}
          required
        />
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
            editPlayer({
              id,
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
