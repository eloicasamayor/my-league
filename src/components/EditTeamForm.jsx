// Dependencies
import { useRef } from "react";

// Api
import { useUpdateTeamMutation, useDeleteTeamMutation } from "../redux";
import { EditPhotoForm } from "./EditPhotoForm";

export function EditTeamForm({ team = {} }) {
  const [editTeam, requestResult] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const nameRef = useRef();

  return (
    <>
      <h2>{team.name ? `Editing "${team.name}"` : "Edit team"}</h2>
      <div className="flex flex-col gap-4 lg:flex-row items-center">
        <EditPhotoForm
          itemToEdit={team}
          bucketName={"teams-img"}
          updateItem={editTeam}
        />
        <form className="flex flex-col gap-2 w-full">
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
                id: team.id,
                name: nameRef.current.value,
              });
            }}
          >
            submit
          </button>
        </form>
      </div>

      <button onClick={() => deleteTeam({ id: team.id })}>delete</button>
    </>
  );
}
