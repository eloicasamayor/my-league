// Dependencies
import { useRef } from "react";

// Components
import { Button } from "flowbite-react";

// Api
import { useUpdateTeamMutation, useDeleteTeamMutation } from "../../redux";
import { EditPhotoForm } from "./EditPhotoForm";
import { TrashIcon } from "../icons";
import { nameToUrlName } from "../../helpers";

export function EditTeamForm({ team, setAlertMessage, closeModal }) {
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
        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={async (e) => {
            if (!nameRef.current) {
              setAlertMessage({
                isError: true,
                message: `There was an error with the form. please try again`,
              });
              return;
            }
            e.preventDefault();
            const editTeamReq = await editTeam({
              id: team.id,
              name: nameRef.current.value,
              urlname: nameToUrlName(nameRef.current.value),
            });
            setAlertMessage({
              isError: "error" in editTeamReq,
              message:
                "error" in editTeamReq
                  ? `There was an error updating the team: ${editTeamReq.error.message}`
                  : "Team updated correctly",
            });
            !("error" in editTeamReq) && closeModal();
          }}
        >
          <label htmlFor={"name"}>Name:</label>
          <input
            type={"text"}
            id={"name"}
            name={"name"}
            ref={nameRef}
            defaultValue={team.name}
            required
          />
          <Button type="submit">submit</Button>
        </form>
      </div>

      <Button
        color={"failure"}
        onClick={async () => {
          if (window.confirm("Are you shure to delete the team?")) {
            const deleteTeamRes = await deleteTeam({ id: team.id });
            if ("error" in deleteTeamRes) {
              setAlertMessage({
                isError: true,
                message:
                  "The team couldn't be deleted: " +
                  deleteTeamRes.error.message,
              });
            } else {
              setAlertMessage({
                isError: false,
                message: "Team deleted correctly",
              });
              closeModal();
            }
          }
        }}
      >
        <TrashIcon />
        {"delete team"}
      </Button>
    </>
  );
}
