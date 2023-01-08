// Dependencies
import { useInsertTeamMutation } from "../redux";
import { useRef } from "react";

// Helpers
import { nameToUrlName } from "../helpers/nameToUrlName";

export function NewTeamForm({ teamsRefetch, currentLeague }) {
  const [insertTeam, requestResult] = useInsertTeamMutation();
  const nameRef = useRef();
  const { id } = currentLeague;

  // const isError = requestResult.status === "rejected";
  return (
    <>
      <h2>Create new team</h2>
      <form>
        <label htmlFor={"name"}>Name:</label>
        <input type={"text"} id={"name"} name={"name"} ref={nameRef} required />
        <button
          onClick={async (e) => {
            e.preventDefault();
            await insertTeam({
              name: nameRef.current.value,
              urlname: nameToUrlName(nameRef.current.value),
              league: id,
            });
            teamsRefetch();
          }}
        >
          submit
        </button>
        <span>{requestResult.error?.data?.message || ""}</span>
      </form>
    </>
  );
}
