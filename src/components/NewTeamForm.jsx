// Dependencies
import { useInsertTeamMutation } from "../api/teams";
import { useRef } from "react";

export function NewTeamForm() {
  const [insertTeam, requestResult] = useInsertTeamMutation();
  const nameRef = useRef();

  // const isError = requestResult.status === "rejected";
  return (
    <>
      <h2>Create new team</h2>
      <form>
        <label htmlFor={"name"}>Name:</label>
        <input type={"text"} id={"name"} name={"name"} ref={nameRef} required />
        <button
          onClick={(e) => {
            e.preventDefault();
            insertTeam({
              name: nameRef.current.value,
              league: 1,
            });
          }}
        >
          submit
        </button>
        <span>{requestResult.error?.data?.message || ""}</span>
      </form>
    </>
  );
}