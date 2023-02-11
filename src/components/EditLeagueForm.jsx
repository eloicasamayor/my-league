// Dependencies
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// Api
import { useUpdateLeagueMutation } from "../redux";
import { useDeleteLeagueMutation } from "../redux";
import {
  useDeleteAllLeagueMatchesMutation,
  useDeleteAllLeaguePlayersMutation,
  useDeleteAllLeagueTeamsMutation,
} from "../redux";

// Helpers
import { nameToUrlName } from "../helpers/nameToUrlName";

// Components
import { TrashIcon } from "./icons/TrashIcon";
import { EditPhotoForm } from "./EditPhotoForm";
import { Navigate } from "react-router-dom";

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
  debugger;
  if (!leagueToEdit.id) {
    return "";
  }

  return (
    <>
      <h2>Edit League</h2>
      <div className="flex flex-col gap-4 lg:flex-row items-center">
        <EditPhotoForm
          itemToEdit={leagueToEdit}
          bucketName={"leagues-img"}
          updateItem={updateLeague}
        />
        <form
          className="flex flex-col w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            updateLeague({
              id,
              name: nameRef.current.value,
              description: descriptionRef.current.value,
              urlname: nameToUrlName(nameRef.current.value),
            });
          }}
        >
          <input
            className="hidden"
            type={"text"}
            id={"id"}
            name={"id"}
            value={leagueToEdit.id}
            disabled
          />

          <label htmlFor={"name"}>Name:</label>
          <input
            type={"text"}
            id={"name"}
            name={"name"}
            ref={nameRef}
            defaultValue={leagueToEdit.name}
          />

          <label htmlFor={"description"}>description:</label>
          <input
            type={"text"}
            id={"description"}
            name={"description"}
            ref={descriptionRef}
            defaultValue={leagueToEdit.description}
          />

          <input type={"submit"}></input>
        </form>
        <div>
          <button
            className="bg-rose-700 hover:bg-rose-800"
            onClick={() => {
              deleteAllLeagueMatches(leagueToEdit);
              deleteAllLeagueTeams(leagueToEdit);
              deleteAllLeaguePlayers(leagueToEdit);
              deleteLeague(leagueToEdit);
              navigate("/");
            }}
          >
            <TrashIcon />
            {"Delete league (including its TEAMS, MATCHES and PLAYERS)"}
          </button>
        </div>
      </div>
    </>
  );
}
