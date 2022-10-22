// Dependencies
import { useRef } from "react";

// Api
import { useUpdateLeagueMutation, useGetLeaguesQuery } from "../api/leagues";

export function EditLeagueForm({ id, name, urlname, description }) {
  const { refetch } = useGetLeaguesQuery();
  const [updateLeague, requestResult] = useUpdateLeagueMutation();

  const idRef = useRef();
  const nameRef = useRef();
  const urlRef = useRef();
  const descriptionRef = useRef();
  return (
    <>
      <form>
        <label htmlFor={"id"}>Id:</label>
        <input type={"text"} id={"id"} name={"id"} value={id} />
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
        <label htmlFor={"urlname"}>Url:</label>
        <input
          type={"text"}
          id={"urlname"}
          name={"urlname"}
          ref={urlRef}
          placeholder={urlname}
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
              urlname: urlRef.current.value,
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
