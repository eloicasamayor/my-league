// Dependencies
import { useInsertLeagueMutation } from "../api/leagues";
import { useRef } from "react";

// helpers
import { nameToUrlName } from "../helpers/nameToUrlName";

export function NewLeagueForm({ refetch }) {
  const [insertLeague, requestResult] = useInsertLeagueMutation();
  const nameRef = useRef();
  const descriptionRef = useRef();
  return (
    <>
      <h2>Create new league</h2>
      <form>
        <label htmlFor={"name"}>League name:</label>
        <input type={"text"} id={"name"} name={"name"} ref={nameRef} />
        <br />
        <label htmlFor={"description"}>Description:</label>
        <input
          type={"text"}
          id={"description"}
          name={"description"}
          ref={descriptionRef}
        />
        <br />
        <button
          type={"button"}
          onClick={async (e) => {
            e.preventDefault();
            await insertLeague({
              name: nameRef.current.value,
              urlname: nameToUrlName(nameRef.current.value),
              name: descriptionRef.current.value,
            });
            refetch();
          }}
        >
          submit
        </button>
      </form>
    </>
  );
}
