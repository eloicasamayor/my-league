// Dependencies
import { useRef } from "react";

// Components
import { Button } from "flowbite-react";

// Api
import { useUpdateTeamMutation, useDeleteTeamMutation } from "../../redux";
import { EditPhotoForm } from "./EditPhotoForm";

export function EditTeamForm({ team = {} }) {
  const [editTeam, requestResult] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const nameRef = useRef();

  return (
    <>
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
          <Button
            onClick={(e) => {
              e.preventDefault();
              editTeam({
                id: team.id,
                name: nameRef.current.value,
              });
            }}
          >
            submit
          </Button>
        </form>
      </div>

      <Button color={"failure"} onClick={() => deleteTeam({ id: team.id })}>
        delete
      </Button>
    </>
  );
}
