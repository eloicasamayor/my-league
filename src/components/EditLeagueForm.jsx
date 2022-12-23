// Dependencies
import { useRef } from "react";

// Api
import { useUpdateLeagueMutation, useGetLeaguesQuery } from "../redux";
import { nameToUrlName } from "../helpers/nameToUrlName";

export function EditLeagueForm({ leagueToEdit }) {
  let { id, name, urlname, description } = leagueToEdit;
  const { refetch } = useGetLeaguesQuery();
  const [updateLeague, requestResult] = useUpdateLeagueMutation();

  const nameRef = useRef();
  const descriptionRef = useRef();

  if (!id) {
    return "";
  }
  return (
    <>
      <h2>Edit League</h2>
      <form>
        <label htmlFor={"id"}>Id:</label>
        <input type={"text"} id={"id"} name={"id"} value={id} disabled />
        <br />
        <label htmlFor={"name"}>Name:</label>
        <input
          type={"text"}
          id={"name"}
          name={"name"}
          ref={nameRef}
          placeholder={name}
        />
        <br />
        <label htmlFor={"description"}>description:</label>
        <input
          type={"text"}
          id={"description"}
          name={"description"}
          ref={descriptionRef}
          placeholder={description}
        />
        <br />
        <button
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            updateLeague({
              id,
              name: nameRef.current.value,
              description: descriptionRef.current.value,
              urlname: nameToUrlName(nameRef.current.value),
            });
          }}
        >
          submit
        </button>
      </form>
    </>
  );
}
