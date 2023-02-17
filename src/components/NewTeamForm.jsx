// Dependencies
import { useInsertTeamMutation } from "../redux";
import { useRef } from "react";

import { Button, TextInput } from "flowbite-react";

// Helpers
import { nameToUrlName } from "../helpers/nameToUrlName";

export function NewTeamForm({ currentLeague, closeModal }) {
  const [insertTeam, requestResult] = useInsertTeamMutation();
  const nameRef = useRef();
  const { id } = currentLeague;

  // const isError = requestResult.status === "rejected";
  return (
    <>
      <form className="flex flex-col gap-2">
        <label htmlFor={"name"}>Name:</label>
        <TextInput
          type={"text"}
          id={"name"}
          name={"name"}
          ref={nameRef}
          required
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            insertTeam({
              name: nameRef.current.value,
              urlname: nameToUrlName(nameRef.current.value),
              league: id,
            });
            closeModal();
          }}
        >
          submit
        </Button>
        <span>{requestResult.error?.data?.message || ""}</span>
      </form>
    </>
  );
}
