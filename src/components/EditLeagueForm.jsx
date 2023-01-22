// Dependencies
import { useRef } from "react";

// Api
import { useUpdateLeagueMutation } from "../redux";
import { useDeleteLeagueMutation } from "../redux";

// Helpers
import { nameToUrlName } from "../helpers/nameToUrlName";

// Components
import { TrashIcon } from "./icons/TrashIcon";
import { EditPhotoForm } from "./EditPhotoForm";

export function EditLeagueForm({ leagueToEdit, setLeagueToEdit }) {
  const [updateLeague, requestResult] = useUpdateLeagueMutation();
  const [deleteLeague] = useDeleteLeagueMutation();

  const nameRef = useRef();
  const descriptionRef = useRef();

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
          <button onClick={deleteLeague}>
            <TrashIcon />
            Delete league
          </button>
        </div>
      </div>
    </>
  );
}
