// Dependencies
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

// Api
import { useUpdateLeagueMutation, useGetLeaguesQuery } from "../api/leagues";
import { useUpdateMatchMutation } from "../api/matches";

export function EditMatchForm({ id, localTeam, visitorTeam, played, localGoals, visitorGoals }) {
  const [updateMatch, requestResult] = useUpdateMatchMutation();
  const [playedValue, setPlayedValue] = useState()
  const [localGoalsValue, setLocalGoalsValue] = useState()
  const [visitorGoalsValue, setVisitorGoalsValue] = useState()
console.log('...')
  useEffect(() => {
    setLocalGoalsValue(localGoals);
    setVisitorGoalsValue(visitorGoals);
    setPlayedValue(played);
    console.log(localGoals, visitorGoals, played)
  }, []);
  const idRef = useRef();
  return (
    <><h2>Edit Match</h2>
      <form>
        <label htmlFor={"id"}>Id:</label>
        <input type={"text"} id={"id"} name={"id"} defaultValue={id} ref={idRef} disabled/>
        <br />
        <label htmlFor={"played"}>Played:</label>
        <input type={"checkbox"} id={"played"} name={"played"} value={playedValue} onChange={(e)=>{setPlayedValue((v)=>!v)}}/>
        <br />
        {playedValue &&
        <>
        <label htmlFor={"localGoals"}>{localTeam}</label>
        <input
          type={"number"}
          id={"localGoals"}
          name={"localGoals"}
          placeholder={'local goals'}
          onChange={(e)=>{setLocalGoalsValue(e.target.value)}}
          value={localGoalsValue}
        />
        <br />
        {localGoalsValue && [...Array(localGoalsValue)].map((e, i) =><input key={i} type={'text'}></input>)}
        <label htmlFor={"description"}>{visitorTeam}</label>
        <input
          type={"number"}
          id={"visitorGoals"}
          name={"visitorGoals"}
          value={visitorGoalsValue}
          onChange={(e)=>{setVisitorGoalsValue(e.target.value)}}
          placeholder={'visitor goals'}
        />
        
      
        
        </>}<br />
        <button
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            updateMatch({
              id,
              played: playedValue,
              local_goals: localGoalsValue,
              visitor_goals: visitorGoalsValue,
            });
          }}
        >
          submit
        </button></form>
        
    </>
  );
}
