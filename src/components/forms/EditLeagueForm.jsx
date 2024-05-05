// Dependencies
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Api
import {
  useUpdateLeagueMutation,
  useDeleteLeagueMutation,
  useDeleteAllLeagueMatchesMutation,
  useDeleteAllLeaguePlayersMutation,
  useDeleteAllLeagueTeamsMutation,
} from "../../redux";

// Helpers
import { nameToUrlName } from "../../helpers";

// Components
import { TrashIcon } from "../icons";
import { EditPhotoForm } from "./EditPhotoForm";
import { Button, TextInput } from "flowbite-react";

export function EditLeagueForm({
  leagueToEdit,
  onCloseModal,
  setAlertMessage,
}) {
  const [updateLeague, updateLeagueReqResult] = useUpdateLeagueMutation();
  const [deleteLeague, deleteLeagueReqResult] = useDeleteLeagueMutation();
  const [deleteAllLeagueMatches, deleteAllLeagueMatchesReqResult] =
    useDeleteAllLeagueMatchesMutation();
  const [deleteAllLeagueTeams, deleteAllLeagueTeamsReqResult] =
    useDeleteAllLeagueTeamsMutation();
  const [deleteAllLeaguePlayers, deleteAllLeaguePlayersReqResult] =
    useDeleteAllLeaguePlayersMutation();

  const navigate = useNavigate();

  const nameRef = useRef();
  const descriptionRef = useRef();

  if (!leagueToEdit.id) {
    return <p>somethng went wrong :/</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row items-center">
        <EditPhotoForm
          itemToEdit={leagueToEdit}
          bucketName={"leagues-img"}
          updateItem={updateLeague}
        />
        <form className="flex flex-col w-full gap-2">
          <TextInput
            className="hidden"
            type={"text"}
            id={"id"}
            name={"id"}
            value={leagueToEdit.id}
            disabled
          />

          <label htmlFor={"name"}>Name:</label>
          <TextInput
            type={"text"}
            id={"name"}
            name={"name"}
            ref={nameRef}
            defaultValue={leagueToEdit.name}
          />

          <label htmlFor={"description"}>description:</label>
          <TextInput
            type={"text"}
            id={"description"}
            name={"description"}
            ref={descriptionRef}
            defaultValue={leagueToEdit.description}
          />

          <Button
            onClick={async (e) => {
              e.preventDefault();
              const patch = {
                id: leagueToEdit.id,
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                urlname: nameToUrlName(nameRef.current.value),
              };
              const updateLeagueReqRes = await updateLeague(patch);
              setAlertMessage({
                message: updateLeagueReqRes.error
                  ? updateLeagueReqRes.error.message
                  : "league updated correctly",
                isError: !!updateLeagueReqRes.error,
              });
              if (updateLeagueReqRes.error) {
                nameRef.current.value = leagueToEdit.name;
                descriptionRef.current.value = leagueToEdit.description;
              } else {
                nameRef.current.value !== leagueToEdit.name
                  ? navigate(nameToUrlName("../" + nameRef.current.value))
                  : onCloseModal();
              }
            }}
          >
            {"enviar"}
          </Button>
        </form>
        <div>
          <Button
            color={"failure"}
            className="bg-rose-700 hover:bg-rose-800"
            onClick={async () => {
              if (
                window.confirm(
                  "Are you shure to delete the league? This action will delete all the league data, including all teams, players and matches. And you cannot undo this action."
                )
              ) {
                const deletePlayersReqRes = await deleteAllLeaguePlayers(
                  leagueToEdit
                );
                const deleteMatchesReqRes = await deleteAllLeagueMatches(
                  leagueToEdit
                );
                const deleteTeamsReqRes = await deleteAllLeagueTeams(
                  leagueToEdit
                );
                const deleteLeagueReqRes = await deleteLeague(leagueToEdit);

                if (
                  !deleteMatchesReqRes.error &&
                  !deleteTeamsReqRes.error &&
                  !deletePlayersReqRes.error &&
                  !deleteLeagueReqRes.error
                ) {
                  console.log({
                    isError: false,
                    message: "League deleted correctly",
                  });
                  navigate("/");
                } else {
                  setAlertMessage({
                    isError: true,
                    message:
                      "There was an error and the league could't be deleted",
                  });
                }
              }
            }}
          >
            <TrashIcon />
            {"Delete ALL league data"}
          </Button>
        </div>
      </div>
    </>
  );
}
