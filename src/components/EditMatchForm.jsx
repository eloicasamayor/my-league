// Dependencies
import { useRef } from "react";

// Api
import { useUpdateLeagueMutation, useGetLeaguesQuery } from "../api/leagues";

export function EditMatchForm({ id, localTeam, visitorTeam }) {
  const { refetch } = useGetLeaguesQuery();
  // const [updateLeague, requestResult] = useUpdateLeagueMutation();

  const idRef = useRef();
  const localGoalsRef = useRef();
  const urlRef = useRef();
  const visitorGoalsRef = useRef();
  return (
    <><h2>Edit Match</h2>
      <form>
        <label htmlFor={"id"}>Id:</label>
        <input type={"text"} id={"id"} name={"id"} value={id} disabled/>
        <br />
        <label htmlFor={"localGoals"}>{localTeam}</label>
        <input
          type={"number"}
          id={"localGoals"}
          name={"localGoals"}
          ref={localGoalsRef}
          placeholder={'local goals'}
        />
        <br />
        <label htmlFor={"description"}>{visitorTeam}</label>
        <input
          type={"number"}
          id={"visitorGoals"}
          name={"visitorGoals"}
          ref={visitorGoalsRef}
          placeholder={'visitor goals'}
        />
        <br />
        {/* <button
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            updateLeague({
              id,
              name: localGoalsRef.current.value,
              description: visitorGoalsRef.current.value,
              urlname: urlRef.current.value,
            });
            refetch();
          }}
        >
          submit
        </button> */}
      </form>
    </>
  );
}
