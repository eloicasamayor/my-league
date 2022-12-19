// Dependencies
import { useInsertLeagueMutation } from "../redux";
import { useRef } from "react";

// helpers
import { nameToUrlName } from "../helpers/nameToUrlName";

export function NewLeagueForm() {
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
              description: descriptionRef.current.value,
            });
          }}
        >
          submit
        </button>
      </form>
    </>
  );
}
