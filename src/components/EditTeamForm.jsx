// Dependencies
import { useRef } from "react";

// Api
import { useUpdateTeamMutation, useDeleteTeamMutation } from "../redux";

export function EditTeamForm({ team = {} }) {
  const { id, name } = team;
  const [editTeam, requestResult] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const nameRef = useRef();

  return (
    <>
      <h2>{team.name ? `Editing "${team.name}"` : "Edit team"}</h2>
      <form className="flex flex-col gap-2">
        <label htmlFor={"name"}>Name:</label>
        <input
          type={"text"}
          id={"name"}
          name={"name"}
          ref={nameRef}
          defaultValue={team.name}
          required
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            editTeam({
              id,
              name: nameRef.current.value,
            });
          }}
        >
          submit
        </button>
      </form>
      <button onClick={() => deleteTeam({ id: team.id })}>delete</button>
    </>
  );
}
