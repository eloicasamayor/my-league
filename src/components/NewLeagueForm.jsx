// Dependencies
import { useInsertLeagueMutation } from "../redux";
import { useRef } from "react";
import { useSelector } from "react-redux";

// helpers
import { nameToUrlName } from "../helpers/nameToUrlName";

export function NewLeagueForm() {
  const [insertLeague, requestResult] = useInsertLeagueMutation();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const authData = useSelector((state) => state.auth);

  return (
    <>
      <h2>Create new league</h2>
      {authData?.user?.id ? (
        <form className="flex flex-col gap-2">
          <label htmlFor={"name"}>League name:</label>
          <input type={"text"} id={"name"} name={"name"} ref={nameRef} />
          <label htmlFor={"description"}>Description:</label>
          <input
            type={"text"}
            id={"description"}
            name={"description"}
            ref={descriptionRef}
          />
          <button
            type={"button"}
            onClick={(e) => {
              e.preventDefault();
              insertLeague({
                name: nameRef.current.value,
                urlname: nameToUrlName(nameRef.current.value),
                description: descriptionRef.current.value,
                owner: authData?.user?.id,
              });
            }}
          >
            submit
          </button>
        </form>
      ) : (
        <p>Login to create a league</p>
      )}
    </>
  );
}
