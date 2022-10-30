// Dependencies
import { useRef } from "react";

// Api
import { useUpdateLeagueMutation, useGetLeaguesQuery } from "../api/leagues";
import { useUpdateMatchMutation } from "../api/matches";

export function EditMatchForm({ id, localTeam, visitorTeam, played, localGoals, visitorGoals }) {
  const [updateMatch, requestResult] = useUpdateMatchMutation();

  const idRef = useRef();
  const localGoalsRef = useRef();
  const playedRef = useRef();
  const visitorGoalsRef = useRef();
  return (
    <><h2>Edit Match</h2>
      <form>
        <label htmlFor={"id"}>Id:</label>
        <input type={"text"} id={"id"} name={"id"} defaultValue={id} ref={idRef} disabled/>
        <br />
        <label htmlFor={"played"}>Played:</label>
        <input type={"checkbox"} id={"played"} name={"played"} ref={playedRef} placeholder={played}/>
        <br />
        <label htmlFor={"localGoals"}>{localTeam}</label>
        <input
          type={"number"}
          id={"localGoals"}
          name={"localGoals"}
          ref={localGoalsRef}
          placeholder={'local goals'}
          defaultValue={localGoals}
        />
        <br />
        <label htmlFor={"description"}>{visitorTeam}</label>
        <input
          type={"number"}
          id={"visitorGoals"}
          name={"visitorGoals"}
          ref={visitorGoalsRef}
          defaultValue={visitorGoals}
          placeholder={'visitor goals'}
        />
        <br />
        <button
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            updateMatch({
              id,
              played: playedRef.current.checked,
              local_goals: localGoalsRef.current.value,
              visitor_goals: visitorGoalsRef.current.value,
            });
          }}
        >
          submit
        </button>
      </form>
    </>
  );
}
