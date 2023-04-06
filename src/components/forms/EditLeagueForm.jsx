// Dependencies
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Api
import { useUpdateLeagueMutation } from "../../redux";
import { useDeleteLeagueMutation } from "../../redux";
import {
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
import { Alert } from "../Alert";

export function EditLeagueForm({ leagueToEdit, setLeagueToEdit }) {
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

  const [alertMessage, setAlertMessage] = useState("");

  if (!leagueToEdit.id) {
    return "";
  }

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row items-center">
        {alertMessage.message && (
          <Alert
            onCloseAlert={() => setAlertMessage("")}
            isError={alertMessage.isError}
          >
            {alertMessage.message}
          </Alert>
        )}
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
              if (updateLeagueReqRes.error) {
                setAlertMessage(updateLeagueReqRes.error.message);
                nameRef.current.value = leagueToEdit.name;
                descriptionRef.current.value = leagueToEdit.description;
              } else {
                navigate(nameToUrlName("../" + nameRef.current.value));
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
              const deletePlayersReqRes = await deleteAllLeaguePlayers(
                leagueToEdit
              );
              const deleteTeamsReqRes = await deleteAllLeagueTeams(
                leagueToEdit
              );
              const deleteMatchesReqRes = await deleteAllLeagueMatches(
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
            }}
          >
            <TrashIcon />
            {"Delete league (including its TEAMS, MATCHES and PLAYERS)"}
          </Button>
        </div>
      </div>
    </>
  );
}
