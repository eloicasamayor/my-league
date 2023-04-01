// Dependencies
import { useRef } from "react";

// Components
import { Button } from "flowbite-react";

// Api
import { useUpdateTeamMutation, useDeleteTeamMutation } from "../../redux";
import { EditPhotoForm } from "./EditPhotoForm";
import { TrashIcon } from "../icons";

export function EditTeamForm({ team = {}, setAlertMessage }) {
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
            onClick={async (e) => {
              e.preventDefault();
              const editTeamReq = await editTeam({
                id: team.id,
                name: nameRef.current.value,
              });
              if (editTeamReq.error) {
                setAlertMessage({
                  isError: true,
                  message: "There was an error updating the team",
                });
              } else {
                setAlertMessage({
                  isError: false,
                  message: "Team updated correctly",
                });
                closeModal();
              }
            }}
          >
            submit
          </Button>
        </form>
      </div>

      <Button
        color={"failure"}
        onClick={async () => {
          const deleteTeamRes = await deleteTeam({ id: team.id });
          if (deleteTeamRes.error) {
            setAlertMessage({
              isError: true,
              message:
                "The team couldn't be deleted: " + deleteTeamRes.error.message,
            });
          } else {
            setAlertMessage({
              isError: false,
              message: "Team deleted correctly",
            });
            closeModal();
          }
        }}
      >
        <TrashIcon />
        {"delete team"}
      </Button>
    </>
  );
}
