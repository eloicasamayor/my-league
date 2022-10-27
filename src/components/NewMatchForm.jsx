// Dependencies
import { useInsertMatchMutation } from "../api/matches";
import { useRef } from "react";
export function NewMatchForm({refetch}) {
    const [insertMatch, requestResult] = useInsertMatchMutation();
    const dateRef = useRef();
    const playedRef = useRef();
    const localTeamRef = useRef();
    const visitorTeamRef = useRef();
    return (<>
    <h2>Create new match</h2>
    <form>
    <label htmlFor={"date"}>Local team:</label>
      <input type={"date"} id={"date"} name={"date"} ref={dateRef} />
      <br />
      <label htmlFor={"played"}>Played:</label>
      <input type={"checkbox"} id={"played"} name={"played"} ref={playedRef} />
      <br />
      <label htmlFor={"local_team"}>Local team:</label>
      <input type={"number"} id={"local_team"} name={"local_team"} ref={localTeamRef} />
      <br />
      <label htmlFor={"visitor_team"}>Visitor team:</label>
      <input type={"number"} id={"visitor_team"} name={"visitor_team"} ref={visitorTeamRef} />
      <br />
      <button
        type={"button"}
        onClick={(e) => {
          e.preventDefault();
          insertMatch({
            date: dateRef.current.value,
            played: playedRef.current.checked, /// true???
            local_team: localTeamRef.current.value,
            visitor_team: visitorTeamRef.current.value,
          });
        }}
      >
        submit
      </button>
    </form></>)
}