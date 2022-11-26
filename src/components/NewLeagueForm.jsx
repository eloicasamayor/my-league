// Dependencies
import { useInsertLeagueMutation } from "../api/leagues";
import { useRef } from "react";
export function NewLeagueForm({ refetch }) {
  const [insertLeague, requestResult] = useInsertLeagueMutation();
  const nameRef = useRef();
  const urlNameRef = useRef();
  return (
    <>
      <h2>Create new league</h2>
      <form>
        <label htmlFor={"name"}>League name:</label>
        <input type={"text"} id={"name"} name={"name"} ref={nameRef} />
        <br />
        <label htmlFor={"urlname"}>Url name:</label>
        <input type={"text"} id={"urlname"} name={"urlname"} ref={urlNameRef} />
        <br />
        <button
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            insertLeague({
              name: nameRef.current.value,
              urlname: nameRef.current.value
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")
                .replace(/["']/g, "-")
                .replace(/["·^]/g, "-"),
            });
          }}
        >
          submit
        </button>
      </form>
    </>
  );
}
